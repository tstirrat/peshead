// Type definitions for react-stickynode 1.4.1
// Project: https://github.com/yahoo/react-stickynode
// Definitions by: Tim Stirrat <https://github.com/tstirrat>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

declare module 'react-stickynode' {
  import * as React from 'react';

  export enum StatusCode {
    /** The default status, located at the original position. */
    STATUS_ORIGINAL = 0,
    /** The released status, located at somewhere on document, but not default one. */
    STATUS_RELEASED = 1,
    STATUS_FIXED = 2
  }

  export interface Status {
    status: Status;
  }

  export interface Props {
    /** The switch to enable or disable Sticky(true by default ). */
    enabled?: boolean;

    /** The offset from the top of window where the top of the element will be when sticky state is triggered(0 by default ).If it is a selector to a target(via querySelector()), the offset will be the height of the target. */
    top?: number | string;

    /** The offset from the top of document which release state will be triggered when the bottom of the element reaches at.If it is a selector to a target(via querySelector()), the offset will be the bottom of the target. */
    bottomBoundary?: number | string;

    /** z - index of the sticky */
    innerZ?: number | string;

    /** Enable the use of CSS3 transforms(true by default ). */
    enableTransforms?: Boolean;

    /** Class name to be applied to the element when the sticky state is active(active by default ). */
    activeClass?: string;

    /** Class name to be applied to the element when the sticky state is released(released by default ). */
    releasedClass?: string;

    /** Callback for when the sticky state changes.See below. */
    onStateChange?: (status: Status) => void;

    shouldFreeze?: () => boolean;
  }

  /** A performant and comprehensive React sticky component. */
  export default class Sticky extends React.Component<Props> {}
}
