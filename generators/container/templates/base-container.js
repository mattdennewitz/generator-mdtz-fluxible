import React from 'react';
import Helmet from 'react-helmet';

class <%= name %> extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="<%= name %>" />
        <h1><%= name %></h1>
      </div>
    );
  }
}

export default <%= name %>;
