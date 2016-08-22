import * as React from 'react';
import { Colors } from '../style';
import { connect } from 'react-redux';
import { User } from '../reducers/user';

import { AboutSidebar } from '../components/about-sidebar';
import NavigationBar from '../components/navigation-bar';

interface MainProps {
  user: User;
  location: any;
};

const styles = {
  main: {
    display: 'flex',
    margin: '0px auto',
    alignItems: 'stretch',
    maxWidth: 1200
  },
  column: {
    flex: 8.5
  },
  title: {
    fontSize: 22,
    fontWeight: 100,
    letterSpacing: "0.3px",
    color: Colors.grey
  },
  secondTitle: {
    color: Colors.grey,
    fontWeight: 100,
    margin: '20px 0px'
  },
  subtitle: {
    color: Colors.grey,
    fontWeight: 100,
    margin: '20px 0px'
  },
  text: {
    fontWeight: 300,
    fontSize: 14,
    lineHeight: "20px",
    color: Colors.middleGrey,
    paddingBottom: 50,
    borderBottom: `1px solid ${Colors.borderGrey}`
  }
};

class About extends React.Component<MainProps, any> {
  public render() {
    const { user, location } = this.props;

    return (
      <div>
        <NavigationBar location={location} user={user}/>
        <div style={styles.main}>
          <div style={styles.column}>
            <h1 style={styles.title}><span>/</span>About</h1>
            <h1 style={styles.subtitle}>An easy way to pick a task from a repository you like and contribute to it</h1>
            <div style={styles.text}>
              Giistr is a tool to help the open-source community to grow faster because today open-source libraries are a very important part of every project.
              Our tool make any contribution easier, every developer can just pick a task he think he have the profile appropriated for.
            </div>
            <div>
              <h1 style={styles.secondTitle}><span>/</span>The principle</h1>
              <ul>
                <li>Filter the issues easily per date, labels or language</li>
                <li>Find an issue that fit your skills</li>
                <li>Contribute to an issue you picked</li>
              </ul>
              <div>
                Built for the developer community with passion, our project is <a href="https://github.com/alex3165/github-issues">open-source itself.</a>
              </div>
              <div>
                Feel free to reach and follow us, we will keep you up to date about Giistr.
              </div>
            </div>
          </div>
          <AboutSidebar/>
        </div>
      </div>
    );
  }
}

export default
connect((state, props) => ({
  user: state.get('user')
}), null)(About);
