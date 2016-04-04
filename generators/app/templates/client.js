import React from 'react';
import ReactDOM from 'react-dom';
window.React = React;

import { mountNode } from './const';
import fluxibleApp from './fluxible-app'

fluxibleApp.rehydrate(window.App, (err, context) => {
  if(err) {
    throw err;
  }

  const AppComponent = fluxibleApp.getComponent();

  ReactDOM.render(
    <AppComponent context={context.getComponentContext()} />,
    document.getElementById(mountNode)
  );
});
