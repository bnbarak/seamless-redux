import Entity from 'Classes/Entity.class';

class EasyRedux {
  constructor(dispatch) {
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
}

export default EasyRedux;
