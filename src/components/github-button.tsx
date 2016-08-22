import * as React from 'react';
import Button from './button';

const githubIcon = {
  display: 'inline-block',
  marginRight: 10,
  verticalAlign: 'middle',
  marginBottom: 4
};

const oauthLabel = {
  verticalAlign: 'middle'
};

const button = {
  padding: '0px 60px'
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
