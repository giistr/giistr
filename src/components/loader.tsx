import * as React from 'react';

const svg = '<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\">\n  <path transform=\"translate(0 0)\" d=\"M0 12 V20 H4 V12z\">\n    <animateTransform attributeName=\"transform\" type=\"translate\" values=\"0 0; 28 0; 0 0; 0 0\" dur=\"1.5s\" begin=\"0\" repeatCount=\"indefinite\" keytimes=\"0;0.3;0.6;1\" keySplines=\"0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8\" calcMode=\"spline\" />\n  </path>\n  <path opacity=\"0.5\" transform=\"translate(0 0)\" d=\"M0 12 V20 H4 V12z\">\n    <animateTransform attributeName=\"transform\" type=\"translate\" values=\"0 0; 28 0; 0 0; 0 0\" dur=\"1.5s\" begin=\"0.1s\" repeatCount=\"indefinite\" keytimes=\"0;0.3;0.6;1\" keySplines=\"0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8\" calcMode=\"spline\" />\n  </path>\n  <path opacity=\"0.25\" transform=\"translate(0 0)\" d=\"M0 12 V20 H4 V12z\">\n    <animateTransform attributeName=\"transform\" type=\"translate\" values=\"0 0; 28 0; 0 0; 0 0\" dur=\"1.5s\" begin=\"0.2s\" repeatCount=\"indefinite\" keytimes=\"0;0.3;0.6;1\" keySplines=\"0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8\" calcMode=\"spline\" />\n  </path>\n</svg>\n'; // tslint:disable-line

export default class Loader extends React.Component<any, any> {

  public static defaultProps = {
    color: '#fff',
    delay: 1000,
    style: {}
  };

  public state = {
    delayed: false
  };

  private timeout = undefined;

  public componentWillMount() {
    const delayed = this.props.delay > 0;

    if (delayed) {
      this.setState({ delayed: true });
      this.timeout = setTimeout(() => {
        this.setState({ delayed: false });
      }, this.props.delay);
    }
  }

  public componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  public render() {
    const { style, color } = this.props;
    const final = Object.assign({}, style, { fill: color });

    return (
      <div
        style={final}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }
}
