/* tslint:disable */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Route,
  RouteProps,
  Redirect,
  RouteComponentProps,
  RouterChildContext,
  match,
  matchPath
} from 'react-router-dom';
import { Observable } from 'rxjs';

/**
 * Debug logging theme
 */
const SecureRouteLoggerConsoleTheme = {
  normal: '',
  testing: 'color: darkcyan; font-size: 0.7rem; font-style: italic;',
  important:
    'color: green; font-size: 0.7rem; font-style: normal; font-weight: bold',
  error: 'color: red; font-size: 0.7rem; font-style: normal; font-weight: bold'
};

/**
 * Debug loggin
 */
const debugLogger = (
  className: string,
  methodName: string,
  msg: string,
  displayFormat?: string,
  extraData?: any
) => {
  const messageToPrint = displayFormat
    ? `%c[${className} - ${methodName}] ${msg}`
    : `[${className} - ${methodName}] ${msg}`;

  if (displayFormat) {
    if (extraData) {
      console.log(messageToPrint, displayFormat, extraData);
    } else {
      console.log(messageToPrint, displayFormat);
    }
  } else {
    if (extraData) {
      console.log(messageToPrint, extraData);
    } else {
      console.log(messageToPrint);
    }
  }
};

export type RouteGuardResultType =
  | boolean
  | Promise<boolean>
  | Observable<boolean>;

export interface RouteGuard<P = any> {
  shouldRoute: (match: match<P>) => RouteGuardResultType;
}

export interface SecureRouteProps extends RouteProps {
  routeGuard?: RouteGuard;
  redirectToPathWhenFail?: string;
  enableDebug?: boolean;
  componentWhenFail?: React.ComponentType<RouteComponentProps<any> | {}>;
}

export interface SecureRouteState {
  hasRouteGuard: boolean;
  routeGuardFinished: boolean;
  routeGuardResult: JSX.Element | null;
}

export class SecureRoute extends React.Component<
  SecureRouteProps,
  SecureRouteState
> {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object
    })
  };

  context: RouterChildContext<any>;

  constructor(props: SecureRouteProps) {
    super(props);
    this.state = {
      hasRouteGuard: this.props.routeGuard ? true : false,
      routeGuardFinished: false,
      routeGuardResult: null
    };
  }

  async componentDidMount() {
    if (!this.state.hasRouteGuard) {
      return;
    }

    const tempRouteGuardResult = this.props.routeGuard!.shouldRoute(
      this.getRouteMatch()
    );
    if (typeof tempRouteGuardResult === 'boolean') {
      this.setState((prevState: SecureRouteState, props) => ({
        hasRouteGuard: prevState.hasRouteGuard,
        routeGuardFinished: true,
        routeGuardResult: tempRouteGuardResult
      }));
    } else if (tempRouteGuardResult instanceof Promise) {
      tempRouteGuardResult.then(result => {
        this.setState((prevState: SecureRouteState, props) => ({
          hasRouteGuard: prevState.hasRouteGuard,
          routeGuardFinished: true,
          routeGuardResult: result
        }));
      });
    } else if (tempRouteGuardResult instanceof Observable) {
      tempRouteGuardResult.take(1).subscribe(result => {
        this.setState((prevState: SecureRouteState, props) => ({
          hasRouteGuard: prevState.hasRouteGuard,
          routeGuardFinished: true,
          routeGuardResult: result
        }));
      });
    }
  }

  private getRouteMatch() {
    const { route } = this.context.router;
    const pathname = (location || route.location).pathname;
    const { path, strict, exact } = this.props;

    return (matchPath as any)(pathname, { path, strict, exact }, route.match);
  }

  render() {
    const successRoute: JSX.Element = <Route {...this.props} />;

    // If hasn't `routeGuard` props, then just render the real <Route>
    if (!this.state.hasRouteGuard) {
      if (this.props.enableDebug) {
        debugLogger(
          (this as any).constructor.name,
          `render`,
          `no route guard to run, render normal <Route> directly.`,
          SecureRouteLoggerConsoleTheme.testing
        );
      }

      return successRoute;
    }

    const redirectPath = this.props.redirectToPathWhenFail
      ? this.props.redirectToPathWhenFail
      : '/';
    const failRedirect = <Redirect to={redirectPath} />;
    const failComponentRoute = this.props.componentWhenFail ? (
      <Route path={this.props.path} component={this.props.componentWhenFail} />
    ) : null;

    if (this.state.routeGuardFinished) {
      if (this.props.enableDebug) {
        let debugMsg = `route guard passed, render <Route>.`,
          className = (this as any).constructor.name,
          debugTheme = SecureRouteLoggerConsoleTheme.testing;

        if (!this.state.routeGuardResult) {
          debugMsg = `route guard fail, render <Redirect to=${redirectPath} />`;
          debugTheme = SecureRouteLoggerConsoleTheme.error;
        }

        debugLogger(className, `render`, debugMsg, debugTheme);
      }

      if (this.state.routeGuardResult) {
        return successRoute;
      } else {
        // `componentWhenFail` got higher priority than `redirectToPathWhenFail`
        return this.props.componentWhenFail ? failComponentRoute : failRedirect;
      }
    } else {
      return null;
    }
  }
}
