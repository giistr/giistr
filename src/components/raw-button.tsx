import * as React from 'react';
import { MouseEventHandler } from 'react';
import { Colors } from '../style';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  container: {
    fontSize: 12,
    lineHeight: '18px',
    color: Colors.blue,
    textDecoration: 'underline',
    cursor: 'pointer',
    ':hover': {
      color: Colors.darkBlue,
      textDecoration: 'none'
    }
  }
});

export function RawButton({
  onClick,
  style,
  children
}: {
  onClick: MouseEventHandler;
  style?: any;
  children?: any;
}) {

  return (
    <div
      onClick={onClick}
      className={css(styles.container)}
      style={style}>
      {
        children
      }
    </div>
  );
}
