// Type definitions for react-ga
// Project: https://github.com/react-ga/react-ga
// Definitions by: Alexandre Rieux <https://github.com/alex3165>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace ReactGA {

  export interface Options {
    debug?: boolean;
    titleCase?: boolean;
  }

  export interface timingArgs {
    category: string;
    variable: string;
    value: number;
    label: string;
  }

  export interface eventArgs {
    category?: string;
    action?: string;
    label?: string;
    value?: number;
    nonInteraction?: boolean;
  }

  export interface exeptionArgs {
    description?: string;
    fatal?: boolean;
  }

  export function initialize(gaTrackingID: string, options?: Options): void;
  export function ga(): any;
  export function set(fieldsObject: Object): void;
  export function send(fieldObject: Object): void;
  export function pageview(path: string): void;
  export function modalview(modalName: string): void;
  export function timing(args: timingArgs): void;
  export function event(args: eventArgs): void;
  export function exception(args: exeptionArgs): void;

  export interface PluginExecutePayload {
    id: string;
    name: string;
  }

  export interface plugin {
    require(name: string, options: Object): void;
    execute(pluginName: string, action: string, actionType?: string, payload?: PluginExecutePayload);
    outboundLink(args: string, hitCallback: Function)
  }
}

declare module 'react-ga' {
  export = ReactGA;
}
