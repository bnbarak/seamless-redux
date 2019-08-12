import Entity from 'Classes/Entity.class';

class SeamlessRedux {
  constructor(store) {
    const { dispatch } = store;
    this.store = store;
    this.dispatch = dispatch;
    this.entities = {};
  }

  getEntity(entityName) {
    return this.entities[entityName];
  }

  createEntity(entityName, defaultState = {}, userOptions = {}) {
    const { dispatch } = this;
    const entity = new Entity(entityName, defaultState, dispatch, userOptions);
    this.entities[entityName] = entity;
    return entity;
  }

  get state() {
    const { store } = this;
    return store.getState();
  }
}

export default SeamlessRedux;
