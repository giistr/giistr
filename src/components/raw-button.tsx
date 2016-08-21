import * as React from 'react';
import { Colors } from '../style';
import * as StyleSheet from 'stilr';

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
  onClick: Function;
  style?: any;
  children?: any;
}) {

  return (
    <div
      onClick={onClick}
      className={styles.container}
      style={style}>
      {
        children
      }
    </div>
  );
}
