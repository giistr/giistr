import * as React from 'react';
import * as StyleSheet from 'stilr';

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
      backgroundColor: inactive ? Colors.backgroundGrey : convertHex(label.get('color'), 0.2),
      ':hover': {
        backgroundColor: inactive ? Colors.backgroundGrey : convertHex(label.get('color'), 0.4)
      }
    }
  });

  const final = [
    styles.base,
    tmp.container
  ].join(' ');

  document.getElementById('stylesheet').textContent = StyleSheet.render();

  return (
    <div
      onClick={onSelect}
      className={final}
      style={style}>
      { label.get('name') }
    </div>
  );
}
