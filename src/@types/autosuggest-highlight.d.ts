// Type definitions for autosuggest-highlight
// Project: http://react-autosuggest.js.org/
// Definitions by: Tim Stirrat <https://github.com/tstirrat>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.5

type MatchResult = [number, number];

declare module 'autosuggest-highlight/match' {
  function match(text: string, query: string): MatchResult[];
  export default match;
}

declare module 'autosuggest-highlight/parse' {
  export interface ParsedMatch {
    highlight: boolean;
    text: string;
  }

  function parse(text: string, matches: MatchResult[]): ParsedMatch[];

  export default parse;
}
