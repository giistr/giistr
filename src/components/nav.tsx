import * as React from 'react';
import { Colors } from '../style';

const styles = {
  menu: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 24,
    height: 20,
    borderLeft: `1px solid ${Colors.borderGrey}`
  }
};

interface Props {
  children?: JSX.Element;
}

const NavItem: React.StatelessComponent<Props> = ({ children }) => (
  <div style={styles.menu}>
    { children }
  </div>
);

export default NavItem;
