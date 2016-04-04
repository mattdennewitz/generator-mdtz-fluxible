import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { navigateAction } from 'fluxible-router';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

import HtmlDocument from '../containers/html-document';
import fluxibleApp from '../fluxible-app';

export function render(req, res, next) {
  const context = fluxibleApp.createContext({
    req: req
  });

  context.executeAction(navigateAction, {url: req.url}, (err) => {
    if(err) {
      if(err.status === 404 || err.statusCode === 404) {
        res.status(404);
      } else if(err.status === 500 || err.statusCode === 500) {
        console.log(err);
        res.status(500);
      }
    }

    try {
      // create application container, serialized state, and head tag data
      const Application = fluxibleApp.getComponent();
      const markup = ReactDOMServer.renderToString(
        <Application context={context.getComponentContext()} />
      );
      const state = 'window.App=' + serialize(fluxibleApp.dehydrate(context)) + ';';
      const head = Helmet.rewind();

      const html = ReactDOMServer.renderToStaticMarkup(
        <HtmlDocument
          context={context.getComponentContext()}
          markup={markup}
          head={head}
          state={state} />
      );

      res.send('<!doctype html>' + html);
    } catch(e) {
      console.trace();
      res.status(500);
      res.end();
    }
  })
}
