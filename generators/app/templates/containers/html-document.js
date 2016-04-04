import React from 'react';
import { provideContext } from 'fluxible-addons-react';

import { mountNode } from '../const';

class HtmlDocument extends React.Component {
  render() {
    const { head, state, markup, context } = this.props;

    return (
      <html lang="en-us">
        <head>
          <meta charSet="utf-8" />

          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
        </head>
        <body>
          <div id={mountNode} dangerouslySetInnerHTML={{__html: markup}} />
          <script dangerouslySetInnerHTML={{__html: state}} />
          <script type="text/javascript" src="/assets/build.js"></script>
        </body>
      </html>
    );
  }
}

HtmlDocument.propTypes = {
  head: React.PropTypes.object.isRequired,
  state: React.PropTypes.string.isRequired,
  markup: React.PropTypes.string.isRequired,
  context: React.PropTypes.object.isRequired,
}

HtmlDocument.contextTypes = {
  getStore: React.PropTypes.func.isRequired,
}

export default provideContext(HtmlDocument);
