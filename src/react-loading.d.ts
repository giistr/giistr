/// <reference path="../typings/globals/react/index.d.ts" />

declare namespace Loading {
  interface LoadingProps {
    color? : string;
    height? : any;
    width? : any;
    type? : string;
  }

  interface LoadingState {
    delayed : boolean;
  }

  export default class Loading extends __React.Component<LoadingProps, LoadingState> {}
}

declare module 'react-loading' {
  export = Loading;
}
