import React from 'react';
import Helmet from 'react-helmet';
import { handleHistory } from 'fluxible-router';
import { provideContext } from 'fluxible-addons-react';

class Application extends React.Component {
  render() {
    if(!this.props.currentRoute) {
      // 404 time
      return <div>404</div>;
    }

    const Handler = this.props.currentRoute.handler;

    return (
      <div>
        <Helmet title="<%= name %>" />
        <Handler />
      </div>
    );
  }
}

Application.contextTypes = {
  executeAction: React.PropTypes.func.isRequired
}

Application.propTypes = {
  context: React.PropTypes.object.isRequired,
  err: React.PropTypes.object,
}

export default provideContext(handleHistory(Application));
