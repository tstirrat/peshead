// tslint:disable:no-use-before-declare
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { Hidden } from 'material-ui';
import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import { Observable, of, Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, debounceTime, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import styled from 'styled-components';

import { Player } from '../../shared/service/api';
import { PlayerPositionRatingBadge } from '../PlayerPositionRatingBadge';
import { Flag, Image, MainInput, Name, SuggestionResult, SuggestionsContainer } from './styles';

type PlayerSuggestion = Pick<
  Player,
  | 'id'
  | 'name'
  | 'nationality'
  | 'age'
  | 'ovr'
  | 'registeredPosition'
  | 'playingStyle'
>;

type SuggestPlayerResponse = SuggestResponse<PlayerSuggestion>;

const KC_ENTER = 13; // TODO: get this from some lib or DOM

export interface Props {
  className?: string;
  placeholder?: string;
  onSelect?: (value: string) => void;
  onSearch?: (value: string) => void;
}

interface State {
  value: string;
  suggestions: PlayerSuggestion[];
  selectedId?: string;
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
    PlayerSuggestion[]
  > = this.querySubject.asObservable().pipe(
    filter(q => q.length > 1),
    debounceTime(250),
    switchMap(query => {
      return ajax
        .getJSON<SuggestPlayerResponse>(
          `${process.env.REACT_APP_API_ROOT}/suggest?query=${query}`
        )
        .pipe(
          map(response =>
            response.suggest.player_suggest[0].options.map(hit => hit._source)
          ),
          catchError((err: Error) => {
            return of<PlayerSuggestion[]>([
              { id: 'error', name: 'Error!' } as PlayerSuggestion
            ]);
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
        focusInputOnSuggestionClick={false}
        // alwaysRenderSuggestions={true}
        theme={{
          container: this.props.className,
          suggestionsList: 'suggestions-list'
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        onSuggestionSelected={this.handleSuggestionSelected}
        onSuggestionHighlighted={this.handleSuggestionHighlighted}
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
    const { selectedId } = this.state;
    if (keyCode === KC_ENTER) {
      if (selectedId && this.props.onSelect) {
        this.props.onSelect(selectedId);
        this.clear();
      } else if (this.props.onSearch) {
        this.props.onSearch(this.state.value);
        this.clear();
      }
    }
  };

  private handleSuggestionSelected: Autosuggest.OnSuggestionSelected<
    PlayerSuggestion
  > = (event, { suggestion }) => {
    if (this.props.onSelect && suggestion.id !== 'error') {
      this.props.onSelect(suggestion.id);
      this.clear();
    }
  };

  /**
   * Store the currently highlighted selection id in case the user presses
   * enter.
   */
  private handleSuggestionHighlighted: Autosuggest.OnSuggestionHighlighted = ({
    suggestion
  }) => {
    if (this.props.onSelect) {
      const id =
        suggestion && suggestion.id !== 'error' ? suggestion.id : undefined;
      this.setState({ selectedId: id });
    }
  };

  private clear() {
    this.setState({ value: '', selectedId: undefined });
  }
}

export const SuggestPlayer = styled(SuggestPlayerBase)`
  position: relative;
`;

const renderInput: Autosuggest.RenderInputComponent<
  PlayerSuggestion
> = inputProps => {
  // tslint:disable-next-line:no-any TODO: not sure of other props here
  const { autoFocus, value, ref, ...other } = inputProps as any;

  return (
    <MainInput
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
const renderSuggestion: Autosuggest.RenderSuggestion<PlayerSuggestion> = (
  suggestion,
  { query, isHighlighted }
) => {
  const playerStub = Player.fromObject(suggestion);

  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);
  return (
    <SuggestionResult selected={isHighlighted}>
      <Hidden xsDown={true}>
        <Image src="/player-avatar.png" alt="player image" />
      </Hidden>
      <Flag countryId={playerStub.nationality} />
      <Name>
        {parts.map((part, index) => {
          return part.highlight ? (
            <strong key={index}>{part.text}</strong>
          ) : (
            <span key={index}>{part.text}</span>
          );
        })}
      </Name>
      <PlayerPositionRatingBadge player={playerStub} showRating={true} />
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
  PlayerSuggestion
> = suggestion => {
  return suggestion.name;
};

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
