import _ from 'lodash';
import Entity from '../src/classes/Entity.class';
import createStore from './helpers/reduxStore';
import {
  isTrue, isFalse, isUndefined, isNull,
} from './helpers/testHelpers';

const fakeDispatch = () => {};
const entityName = 'SomeEntity';
const key = 'b';
const boolKey = 'bool';
const defaultState = { a: 1, [boolKey]: true };
const replaceDataObject = {
  [key]: 2,
};
const mergeDataObject = {
  c: 1,
};
const replaceDataArr = [1];
const mergeDataArr = [2];

describe('Entity class', () => {
  let entity;
  let store;

  before(() => {
    store = createStore();
    const { dispatch } = store;
    entity = new Entity(entityName, defaultState, dispatch);
  });

  it('should init the entity with default data and loading to true', () => {
    const { entitiesData, entitiesLoading } = store.getState();
    const data = entitiesData[entityName];
    const isLoading = entitiesLoading[entityName];
    isTrue(_.isEqual(data, defaultState));
    isTrue(isLoading);
  });

  it('should start fetching change loading state to true', () => {
    entity.start();
    const { entitiesLoading } = store.getState();
    const isLoading = entitiesLoading[entityName];
    isTrue(isLoading);
  });

  it('should finish fetching change loading state to false', () => {
    entity.finish();
    const { entitiesLoading } = store.getState();
    const isLoading = entitiesLoading[entityName];
    isFalse(isLoading);
  });

  it('should replace the data with new data', () => {
    entity.newData(replaceDataObject);
    const { entitiesData } = store.getState();
    const data = entitiesData[entityName];
    isTrue(_.isEqual(data, replaceDataObject));
  });

  describe('method for different types', () => {
    describe('For [Objects]', () => {
      it('should merge new data with old data [objects]', () => {
        entity.mergeData(mergeDataObject);
        const { entitiesData } = store.getState();
        const data = entitiesData[entityName];
        const merge = _.merge(mergeDataObject, replaceDataObject);
        isTrue(_.isEqual(data, merge));
      });

      it('should replace the data with new data by a key', () => {
        const newData = 'x';
        entity.updateObjectByKey(key, newData);
        const { entitiesData } = store.getState();
        const data = entitiesData[entityName];
        isTrue(_.isEqual(data[key], newData));
      });
    });

    describe('For [Array]', () => {
      before(() => entity.newData(mergeDataArr));
      it('should merge new data with old data [objects]', () => {
        entity.mergeData(replaceDataArr);
        const { entitiesData } = store.getState();
        const data = entitiesData[entityName];
        const merge = mergeDataArr.concat(replaceDataArr);
        isTrue(_.isEqual(data, merge));
      });

      it('should push new data', () => {
        const newData = 'x';
        entity.pushData(newData);
        const { entitiesData } = store.getState();
        const data = entitiesData[entityName];
        const lastElement = data[data.length - 1];
        isTrue(newData === lastElement);
      });
    });

    describe('For [Boolean]', () => {
      before(() => entity.newData(false));
      it('should replace the data with new data by a key', () => {
        entity.toggleBoolean();
        const { entitiesData } = store.getState();
        const data = entitiesData[entityName];
        isTrue(data);
      });
    });
  });

  describe('Entity options', () => {
    it('should not add loading to Entity object', () => {
      const options = {
        isLoading: false,
      };
      const entity = new Entity(entityName, null, fakeDispatch, options);
      isUndefined(entity.isLoading);
    });
  });

  describe('Reset method', () => {
    const defaultState = {};
    let entity;
    let store;

    before(() => {
      store = createStore();
      const { dispatch } = store;
      entity = new Entity(entityName, defaultState, dispatch);
      entity.newData({ a: 1 });
    });

    it('should reset the data', () => {
      entity.reset();
      const { entitiesData } = store.getState();
      const data = entitiesData[entityName];
      isTrue(_.isEqual(data, defaultState));
    });
  });

  describe('entity options', () => {
    const defaultState = {};
    let entity;
    let store;

    before(() => {
      store = createStore();
      const { dispatch } = store;
      const options = {
        defaultIsLoading: false,
      };
      entity = new Entity(entityName, defaultState, dispatch, options);
    });

    it('should have isLoading set to false by default', () => {
      const { entitiesLoading } = store.getState();
      const isLoading = entitiesLoading[entityName];
      isFalse(isLoading);
    });
  });

  describe('entity error', () => {
    const defaultState = {};
    const someError = { a: 1 };
    let entity;
    let store;

    before(() => {
      store = createStore();
      const { dispatch } = store;
      entity = new Entity(entityName, defaultState, dispatch);
    });

    it('should have isError set to false in the init state', () => {
      const { entitiesError } = store.getState();
      const { isError } = entitiesError[entityName];
      isFalse(isError);
    });

    it('should set some data in error', () => {
      entity.newError(someError);
      const { entitiesError } = store.getState();
      const { isError, data } = entitiesError[entityName];
      isTrue(isError);
      isTrue(_.isEqual(data, someError));
    });

    it('should reset the data in error', () => {
      entity.resetError();
      const { entitiesError } = store.getState();
      const { isError, data } = entitiesError[entityName];
      isFalse(isError);
      isNull(data);
    });
  });
});
