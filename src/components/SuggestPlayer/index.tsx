import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper, { PaperProps } from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles, StyleRulesCallback, WithStyles } from 'material-ui/styles';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { Subject } from 'rxjs/Subject';
import { ajax } from 'rxjs/observable/dom/ajax';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Observable } from 'rxjs/Observable';

export interface Props {
  placeholder?: string;
  onSelect?: (value: string) => void;
}

interface Suggestion {
  value: string;
  label: string;
}

interface State {
  value: string;
  suggestions: Suggestion[];
}

interface SuggestResponse<T> {
  suggest: {
    player_suggest: [SuggestResponseHit<T>];
  };
}

interface SuggestResponseHit<T> {
  text: string;
  offset: number;
  length: number;
  options: Array<SuggestResponseHitOptions<T>>;
}

interface SuggestResponseHitOptions<T> {
  text: string;
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: T;
}

interface PlayerNameOnly {
  name: string;
}

type SuggestPlayerResponse = SuggestResponse<PlayerNameOnly>;

/** Auto-complete text field that allows quick lookup of players by name. */
class SuggestPlayerBase extends React.Component<Props & WithStyles, State> {
  state: State = {
    value: '',
    suggestions: []
  };

  private querySubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  private fetch$: Observable<
    Suggestion[]
  > = this.querySubject.asObservable().pipe(
    debounceTime(250),
    switchMap(query => {
      return ajax
        .getJSON<SuggestPlayerResponse>(
          `${process.env.REACT_APP_API_ROOT}/suggest?query=${query}`
        )
        .pipe(
          map(response =>
            response.suggest.player_suggest[0].options.map(hit => {
              return { label: hit._source.name, value: hit._id };
            })
          ),
          catchError((err: Error) => {
            return of<Suggestion[]>([{ value: 'error', label: 'Error!' }]);
          })
        );
    })
  );

  componentDidMount() {
    this.fetch$
      .pipe(takeUntil(this.destroy$))
      .subscribe(suggestions => this.setState({ suggestions }));
  }

  componentWillUnmount() {
    this.destroy$.next();
  }

  render() {
    const classes = this.props.classes!;

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        onSuggestionSelected={this.handleSuggestionSelected}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          autoFocus: true,
          classes,
          placeholder: this.props.placeholder || 'Find player',
          value: this.state.value,
          onChange: this.handleChange
        }}
      />
    );
  }

  private handleSuggestionsFetchRequested = ({
    value
  }: Autosuggest.SuggestionsFetchRequest) => {
    this.querySubject.next(value);
  };

  private handleSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  private handleChange = (
    event: React.FormEvent<HTMLInputElement>,
    { newValue }: Autosuggest.ChangeEvent
  ) => {
    this.setState({ value: newValue });
  };

  private handleSuggestionSelected = (
    event: React.FormEvent<HTMLInputElement>,
    { suggestion }: Autosuggest.SuggestionSelectedEventData<Suggestion>
  ) => {
    if (this.props.onSelect && suggestion.value !== 'error') {
      this.props.onSelect(suggestion.value);
      this.setState({ value: '' });
    }
  };
}

const styles: StyleRulesCallback = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  textField: {
    width: '100%'
  }
});

// tslint:disable-next-line:variable-name
export const SuggestPlayer = withStyles(styles)(SuggestPlayerBase);

function renderInput(inputProps: Autosuggest.InputProps) {
  // tslint:disable-next-line:no-any TODO: not sure of other props here
  const { classes, autoFocus, value, ref, ...other } = inputProps as any;

  return (
    <TextField
      autoFocus={autoFocus}
      className={classes.textField}
      value={value}
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input
        },
        ...other
      }}
    />
  );
}

const normalStyle: React.CSSProperties = { fontWeight: 300 };
const boldStyle: React.CSSProperties = { fontWeight: 500 };

/** Render a single suggestion item, bolding the matched query. */
function renderSuggestion(
  suggestion: Suggestion,
  { query, isHighlighted }: Autosuggest.RenderSuggestionParams
) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={index} style={boldStyle}>
              {part.text}
            </span>
          ) : (
            <strong key={index} style={normalStyle}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

interface SuggestionsContainerProps {
  containerProps: PaperProps;
  children: React.ReactChildren;
}

function renderSuggestionsContainer(options: SuggestionsContainerProps) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square={true}>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion: Suggestion) {
  return suggestion.label;
}
