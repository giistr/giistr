/// <reference path="stilr.d.ts" />
/// <reference path="react-ga/react-ga.d.ts" />

import React = __React;
import ReactDOM = __React.__DOM;

declare namespace __React {}

declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};
