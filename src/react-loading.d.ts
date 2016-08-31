declare module 'react-loading' {

  interface LoadingProps {
    color?: string;
    delay?: number;
    height?: string | number;
    type?: string;
    width?: string | number;
  }

 export = class Loading extends React.Component<LoadingProps, any> {

 }
}
