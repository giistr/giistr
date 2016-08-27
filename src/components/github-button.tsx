import * as React from 'react';
import Button from './button';

const githubIcon = {
  display: 'inline-block',
  marginRight: 10,
  verticalAlign: 'middle'
};

const oauthLabel = {
  verticalAlign: 'middle'
};

const button = {
  marginTop: 0,
  width: 300
};

export function GithubButton({
  href
}: {
  href: string
}) {

  return (
    <a href={href}>
      <Button style={button}>
        <img src="assets/github.svg" style={githubIcon}/>
        <span style={oauthLabel}>Sign Up with Github</span>
      </Button>
    </a>
  );
}
