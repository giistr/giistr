declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

interface ReduxWindow extends Window {
  devToolsExtension(): () => void;
}

/// <reference path="react-ga/react-ga.d.ts" />
