import * as Mousetrap from 'mousetrap';
import * as React from 'react';

export interface Props {
  keys: string | string[];
  handler: (e: KeyboardEvent) => void;
  event?: 'keydown' | 'keyup' | 'keypress';
  preventDefault?: boolean;
}

export class Shortcut extends React.PureComponent<Props> {
  componentDidMount() {
    const { keys, handler, event, preventDefault = true } = this.props;
    const wrappedHandler = (e: ExtendedKeyboardEvent) => {
      if (preventDefault) {
        e.preventDefault();
      }
      return handler(e);
    };
    Mousetrap.bind(keys, wrappedHandler, event);
  }

  componentWillUnmount() {
    const { keys, event } = this.props;
    Mousetrap.unbind(keys, event);
  }

  render() {
    return null;
  }
}
