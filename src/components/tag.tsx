import * as React from 'react';
import { MouseEventHandler } from 'react';

import { StyleSheet, css } from 'aphrodite/no-important';

import { convertHex } from '../helpers/color';
import { Colors } from '../style';

const styles = StyleSheet.create({
  base: {
    padding: '2px 20px',
    display: 'inline-block',
    borderRadius: '16px',
    fontSize: 11,
    height: 24,
    lineHeight: '20px',
    margin: 'auto 4px',
    cursor: 'pointer'
  },
  inactiveContainer: {
    color: Colors.lightGrey,
    backgroundColor: Colors.backgroundGrey,
    ':hover': {
      backgroundColor: Colors.backgroundGrey
    }
  }
});

export function Tag({
  label,
  onSelect,
  inactive,
  style
}: {
  label: any,
  onSelect?: MouseEventHandler<any>,
  inactive?: Boolean,
  style?: Object
}) {

  if (!inactive) {
    style = Object.assign({}, style, {
      color: `#${label.get('color')}`,
      backgroundColor: convertHex(label.get('color'), 0.2),
      ':hover': {
        backgroundColor: convertHex(label.get('color'), 0.4)
      }
    });
  }

  return (
    <div
      onClick={onSelect}
      className={css(styles.base, styles.inactiveContainer)}
      style={style}>
      { label.get('name') }
    </div>
  );
}
