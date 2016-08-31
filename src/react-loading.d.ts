/// <reference path="../typings/globals/react/index.d.ts" />

declare interface LoadingProps {
  color? : string;
  height? : any;
  width? : any;
  type? : string;
}

declare interface LoadingState {
  delayed : boolean;
}

declare class Loading extends React.Component<LoadingProps, LoadingState> {}

declare module 'react-loading' {
  export = Loading;
}
