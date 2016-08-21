import * as React from 'react';
import * as StyleSheet from 'stilr';

import { convertHex } from '../helpers/color';
import { Colors } from '../style';

const styles = StyleSheet.create({
  base: {
    padding: '0px 5px',
    display: 'inline-block',
    borderRadius: '10px',
    fontSize: 12,
    height: 24,
    lineHeight: '24px',
    margin: 'auto 4px',
    cursor: 'pointer'
  }
});

export function Tag({
  label,
  onSelect,
  inactive,
  style
}: {
  label: any,
  onSelect?: Function,
  inactive?: Boolean,
  style?: Object
}) {
  const tmp = StyleSheet.create({
    container: {
      color: inactive ? Colors.lightGrey : `#${label.get('color')}`,
      backgroundColor: inactive ? Colors.borderGrey : convertHex(label.get('color'), 0.2),
      ':hover': {
        backgroundColor: inactive ? Colors.borderGrey : convertHex(label.get('color'), 0.4)
      }
    }
  });
  const final = [
    styles.base,
    tmp.container
  ].join(' ');

  return (
    <div
      onClick={onSelect}
      className={final}
      style={style}>
      { label.get('name') }
    </div>
  );
}
