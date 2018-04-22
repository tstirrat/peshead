// Type definitions for observable-fetch 1.0
// Project: https://github.com/robinvdvleuten/observable-fetch
// Definitions by: Tim Stirrat <https://github.com/tstirrat>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

declare module 'observable-fetch' {
  import { Observable } from 'rxjs/Observable';
  export default function fetch<T>(
    url: RequestInfo,
    options?: RequestInit
  ): Observable<T>;
}
