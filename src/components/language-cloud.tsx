import * as React from 'react';
import { Colors } from '../style';

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
    fontFamily: 'Droid Sans Mono'
  },
  javascript: {
    position: 'absolute',
    bottom: '20%',
    right: '30%'
  },
  swift: {
    position: 'absolute',
    bottom: '30%',
    right: '40%',
    color: Colors.lightlightGrey
  },
  python: {
    position: 'absolute',
    bottom: '10%',
    right: '10%',
    color: Colors.lightlightGrey
  },
  go: {
    position: 'absolute',
    left: '50%',
    bottom: '10%',
    color: Colors.borderGrey
  },
  rust: {
    position: 'absolute',
    left: '30%',
    bottom: '5%',
    color: Colors.borderGrey
  }
};

export function LanguageCloud() {
  return (
    <div style={styles.container}>
      <h3 style={styles.javascript}>Javascript</h3>
      <h3 style={styles.swift}>Swift</h3>
      <h3 style={styles.python}>Python</h3>
      <h3 style={styles.go}>Go</h3>
      <h3 style={styles.rust}>Rust</h3>
    </div>
  );
}
