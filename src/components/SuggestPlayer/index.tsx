// tslint:disable:no-use-before-declare
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import { Observable, of, Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import styled from 'styled-components';

import { SuggestionResult, SuggestionsContainer, TextBox } from './styles';

export interface Props {
  className?: string;
  placeholder?: string;
  onSelect?: (value: string) => void;
  onSearch?: (value: string) => void;
}

/** Auto-complete text field that allows quick lookup of players by name. */
class SuggestPlayerBase extends React.Component<Props, State> {
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
    return (
      <Autosuggest
        theme={{
          container: this.props.className,
          suggestionsList: 'suggestions-list'
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
          autoFocus: false,
          placeholder: this.props.placeholder || 'Find player',
          value: this.state.value,
          onChange: this.handleChange,
          onKeyDown: this.searchIfEnterKey
        }}
      />
    );
  }

  private handleSuggestionsFetchRequested: Autosuggest.SuggestionsFetchRequested = ({
    value
  }) => {
    this.querySubject.next(value);
  };

  private handleSuggestionsClearRequested: Autosuggest.OnSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  private handleChange = (
    event: React.FormEvent<HTMLInputElement>,
    { newValue }: Autosuggest.ChangeEvent
  ) => {
    this.setState({ value: newValue });
  };

  private searchIfEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = event;
    if (keyCode === KC_ENTER && this.props.onSearch) {
      this.props.onSearch(this.state.value);
      this.setState({ value: '' });
    }
  };

  private handleSuggestionSelected: Autosuggest.OnSuggestionSelected<
    Suggestion
  > = (event, { suggestion }) => {
    if (this.props.onSelect && suggestion.value !== 'error') {
      this.props.onSelect(suggestion.value);
      this.setState({ value: '' });
    }
  };
}

export const SuggestPlayer = styled(SuggestPlayerBase)`
  position: relative;
`;

const renderInput: Autosuggest.RenderInputComponent<
  Suggestion
> = inputProps => {
  // tslint:disable-next-line:no-any TODO: not sure of other props here
  const { autoFocus, value, ref, ...other } = inputProps as any;

  return (
    <TextBox
      autoFocus={autoFocus}
      value={value}
      inputRef={ref}
      InputProps={{
        disableUnderline: true,
        ...other
      }}
    />
  );
};

/** Render a single suggestion item, bolding the matched query. */
const renderSuggestion: Autosuggest.RenderSuggestion<Suggestion> = (
  suggestion,
  { query, isHighlighted }
) => {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <SuggestionResult selected={isHighlighted}>
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <strong key={index}>{part.text}</strong>
          ) : (
            <span key={index}>{part.text}</span>
          );
        })}
      </div>
    </SuggestionResult>
  );
};

const renderSuggestionsContainer: Autosuggest.RenderSuggestionsContainer = options => {
  const { containerProps, children } = options;

  return (
    <SuggestionsContainer {...containerProps} square={true}>
      {children}
    </SuggestionsContainer>
  );
};

const getSuggestionValue: Autosuggest.GetSuggestionValue<
  Suggestion
> = suggestion => {
  return suggestion.label;
};

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

const KC_ENTER = 13; // TODO: get this from some lib or DOM
