declare module 'redux-shortcuts' {
  import { ActionCreator, Action, Dispatch } from 'redux';
  // import * as Mousetrap from 'mousetrap';

  // export const mousetrap: Mousetrap;

  export function bindShortcut(
    keys: KeyBindings,
    actionCreator: ActionCreator<Action>,
    preventDefault?: boolean
  ): (dispatch: Dispatch<Action>) => void;

  export function bindShortcuts(
    ...shortcut: ShortcutDefinition[]
  ): (dispatch: Dispatch<Action>) => void;

  export type KeyBindings = string | string[];
  export type ShortcutDefinition =
    | BasicShortcutDefinition
    | ShortcutDefinitionWithPreventDefault;

  type BasicShortcutDefinition = [KeyBindings, ActionCreator<Action>];

  type ShortcutDefinitionWithPreventDefault = [
    KeyBindings,
    ActionCreator<Action>,
    boolean
  ];
}
