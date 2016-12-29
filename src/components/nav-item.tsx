import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Colors } from '../style';

const styles = StyleSheet.create({
  item: {
    fontSize: 12,
    lineHeight: '18px',
    color: Colors.lightGrey,
    cursor: 'pointer',
    margin: '0px 14px',
    ':hover': {
      color: Colors.middleGrey
    }
  },
  active: {
    fontWeight: 500,
    color: Colors.blue
  }
});

interface Props {
  active: boolean;
  onClick: any;
  children?: JSX.Element;
}

const NavItem: React.StatelessComponent<Props> = ({ active, onClick, children }) => (
  <div
    className={css(styles.item, active && styles.active)}
    onClick={onClick}>
    { children }
  </div>
);

export default NavItem;
