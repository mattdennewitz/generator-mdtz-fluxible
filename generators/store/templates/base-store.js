import BaseStore from 'fluxible/addons/BaseStore';

class <%= name %>Store extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
  }

  dehydrate() {

  }

  rehydrate(payload) {

  }
}

<%= name %>Store.storeName = '<%= name %>Store';
<%= name %>Store.handlers = {

}

export default <%= name %>Store;
