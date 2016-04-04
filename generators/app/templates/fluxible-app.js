import Fluxible from 'fluxible';
import { RouteStore } from 'fluxible-router';

import Application from './components/application';
import routes from './routes';

const routeStore = RouteStore.withStaticRoutes(routes);

const fluxibleApp = new Fluxible({
  component: Application,

  stores: [
    routeStore,
  ],

  componentActionErrorHandler(context, payload, done) {
    if(payload.err) {
      const { status, statusCode } = payload.err;

      if (status && status === 404 || statusCode && statusCode === 404) {
          console.log('404 Error', payload.err);
      } else {
          console.log('Component exception', payload.err);
      }

      return;
    }

    done();
  }
});

export default fluxibleApp;
