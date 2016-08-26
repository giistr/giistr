declare module 'react-ga' {
  namespace ReactGA {

    interface Options {
      debug?: boolean;
      titleCase?: boolean;
    }

    interface timingArgs {
      category: string;
      variable: string;
      value: number;
      label: string;
    }

    interface eventArgs {
      category?: string;
      action?: string;
      label?: string;
      value?: number;
      nonInteraction?: boolean;
    }

    interface exeptionArgs {
      description?: string;
      fatal?: boolean;
    }

    function initialize(gaTrackingID: string, options?: Options): void;
    function ga(): any;
    function set(fieldsObject: Object): void;
    function send(fieldObject: Object): void;
    function pageview(path: string): void;
    function modalview(modalName: string): void;
    function timing(args: timingArgs): void;
    function event(args: eventArgs): void;
    function exception(args: exeptionArgs): void;

    interface PluginExecutePayload {
      id: string;
      name: string;
    }

    interface plugin {
      require(name: string, options: Object): void;
      execute(pluginName: string, action: string, actionType?: string, payload?: PluginExecutePayload);
      outboundLink(args: string, hitCallback: Function)
    }
  }

  export = ReactGA;
}
