import _ from "lodash";
import Entity from "../src/classes/Entity.class";
import createStore from "./helpers/reduxStore";
import { isTrue, isFalse, isUndefined } from "./helpers/testHelpers";

const fakeDispatch = () => {};
const entityName = "SomeEntity";
const key = "b";
const boolKey = "bool";
const defaultState = { a: 1, [boolKey]: true };
const replaceDataObject = {
  [key]: 2
};
const mergeDataObject = {
  c: 1
};
const replaceDataArr = [1];
const mergeDataArr = [2];

describe("Entity class", () => {
  let entity;
  let store;

  before(() => {
    store = createStore();
    const { dispatch } = store;
    entity = new Entity(entityName, defaultState, dispatch);
  });

  it("should init the entity with default data and loading to true", () => {
    const { entities } = store.getState();
    const { data, isLoading } = entities[entityName];
    isTrue(_.isEqual(data, defaultState));
    isTrue(isLoading);
  });

  it("should start fetching change loading state to true", () => {
    entity.start();
    const { entities } = store.getState();
    const { isLoading } = entities[entityName];
    isTrue(isLoading);
  });

  it("should finish fetching change loading state to false", () => {
    entity.finish();
    const { entities } = store.getState();
    const { isLoading } = entities[entityName];
    isFalse(isLoading);
  });

  it("should replace the data with new data", () => {
    entity.newData(replaceDataObject);
    const { entities } = store.getState();
    const { data } = entities[entityName];
    isTrue(_.isEqual(data, replaceDataObject));
  });

  describe("method for different types", () => {
    describe("For [Objects]", () => {
      it("should merge new data with old data [objects]", () => {
        entity.mergeData(mergeDataObject);
        const { entities } = store.getState();
        const { data } = entities[entityName];

        const merge = _.merge(mergeDataObject, replaceDataObject);
        isTrue(_.isEqual(data, merge));
      });

      it("should replace the data with new data by a key", () => {
        const newData = "x";
        entity.updateObjectByKey(key, newData);
        const { entities } = store.getState();
        const { data } = entities[entityName];
        isTrue(_.isEqual(data[key], newData));
      });
    });

    describe("For [Array]", () => {
      before(() => entity.newData(mergeDataArr));
      it("should merge new data with old data [objects]", () => {
        entity.mergeData(replaceDataArr);
        const { entities } = store.getState();
        const { data } = entities[entityName];
        const merge = mergeDataArr.concat(replaceDataArr);
        isTrue(_.isEqual(data, merge));
      });

      it("should push new data", () => {
        const newData = "x";
        entity.pushData(newData);
        const { entities } = store.getState();
        const { data } = entities[entityName];
        const lastElement = data[data.length - 1];
        isTrue(newData === lastElement);
      });
    });

    describe("For [Boolean]", () => {
      before(() => entity.newData(false));
      it("should replace the data with new data by a key", () => {
        entity.toggleBoolean();
        const { entities } = store.getState();
        const { data } = entities[entityName];
        isTrue(data);
      });
    });
  });

  describe("Entity options", () => {
    it("should not add isLoading to Entity object", () => {
      const options = {
        isLoading: false
      };
      const entity = new Entity(entityName, null, fakeDispatch, options);
      isUndefined(entity.isLoading);
    });
  });

  describe("Reset method", () => {
    const defaultState = {};
    let entity;
    let store;

    before(() => {
      store = createStore();
      const { dispatch } = store;
      entity = new Entity(entityName, defaultState, dispatch);
      entity.newData({ a: 1 });
    });

    it("should reset the data", () => {
      entity.reset();
      const { entities } = store.getState();
      const { data } = entities[entityName];
      isTrue(_.isEqual(data, defaultState));
    });
  });

  describe("entity options", () => {
    const defaultState = {};
    let entity;
    let store;

    before(() => {
      store = createStore();
      const { dispatch } = store;
      const options = {
        defaultIsLoading: false
      };
      entity = new Entity(entityName, defaultState, dispatch, options);
    });

    it("should have isLoading set to false by default", () => {
      const { entities } = store.getState();
      const { isLoading } = entities[entityName];
      isFalse(isLoading);
    });
  });
});
