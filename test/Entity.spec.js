import _ from "lodash";
import Entity from "../src/classes/Entity.class";
import createStore from "./helpers/reduxStore";
import { isTrue, isFalse, isUndefined, isNull } from "./helpers/testHelpers";

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
    const { dataEntities, loadingEntities } = store.getState();
    const data = dataEntities[entityName];
    const isLoading = loadingEntities[entityName];
    isTrue(_.isEqual(data, defaultState));
    isTrue(isLoading);
  });

  it("should start fetching change loading state to true", () => {
    entity.start();
    const { loadingEntities } = store.getState();
    const isLoading = loadingEntities[entityName];
    isTrue(isLoading);
  });

  it("should finish fetching change loading state to false", () => {
    entity.finish();
    const { loadingEntities } = store.getState();
    const isLoading = loadingEntities[entityName];
    isFalse(isLoading);
  });

  it("should replace the data with new data", () => {
    entity.newData(replaceDataObject);
    const { dataEntities } = store.getState();
    const data = dataEntities[entityName];
    isTrue(_.isEqual(data, replaceDataObject));
  });

  describe("method for different types", () => {
    describe("For [Objects]", () => {
      it("should merge new data with old data [objects]", () => {
        entity.mergeData(mergeDataObject);
        const { dataEntities } = store.getState();
        const data = dataEntities[entityName];
        const merge = _.merge(mergeDataObject, replaceDataObject);
        isTrue(_.isEqual(data, merge));
      });

      it("should replace the data with new data by a key", () => {
        const newData = "x";
        entity.updateObjectByKey(newData, key);
        const { dataEntities } = store.getState();
        const data = dataEntities[entityName];
        isTrue(_.isEqual(data[key], newData));
      });
    });

    describe("For [Array]", () => {
      before(() => entity.newData(mergeDataArr));
      it("should merge new data with old data [objects]", () => {
        entity.mergeData(replaceDataArr);
        const { dataEntities } = store.getState();
        const data = dataEntities[entityName];
        const merge = mergeDataArr.concat(replaceDataArr);
        isTrue(_.isEqual(data, merge));
      });

      it("should push new data", () => {
        const newData = "x";
        entity.pushData(newData);
        const { dataEntities } = store.getState();
        const data = dataEntities[entityName];
        const lastElement = data[data.length - 1];
        isTrue(newData === lastElement);
      });
    });

    describe("For [Boolean]", () => {
      before(() => entity.newData(false));
      it("should replace the data with new data by a key", () => {
        entity.toggleBoolean();
        const { dataEntities } = store.getState();
        const data = dataEntities[entityName];
        isTrue(data);
      });
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
      const { dataEntities } = store.getState();
      const data = dataEntities[entityName];
      isTrue(_.isEqual(data, defaultState));
    });

    it("should reset loading");

    it("should reset error");
  });

  describe("entity options", () => {
    const defaultState = {};
    let entity;
    let store;

    describe("defaultIsLoading", () => {
      before(() => {
        store = createStore();
        const { dispatch } = store;
        const options = {
          defaultIsLoading: false
        };
        entity = new Entity(entityName, defaultState, dispatch, options);
      });

      it("should have isLoading set to false by default", () => {
        const { loadingEntities } = store.getState();
        const isLoading = loadingEntities[entityName];
        isFalse(isLoading);
      });
    });

    describe("defaultIsError", () => {
      before(() => {
        store = createStore();
        const { dispatch } = store;
        const options = {
          defaultIsError: false
        };
        entity = new Entity(entityName, defaultState, dispatch, options);
      });

      it("should have isLoading set to false by default", () => {
        const { errorEntities } = store.getState();
        const { isError, data } = errorEntities[entityName];
        isFalse(isError);
        isNull(data);
      });
    });

    describe("enableIsLoading set to false", () => {
      it("should not add loading to Entity object", () => {
        const options = {
          enableIsLoading: false
        };
        const entity = new Entity(entityName, null, fakeDispatch, options);
        isUndefined(entity.isLoading);
      });
    });

    describe("enableError set to false", () => {
      it("should not add loading to Entity object", () => {
        const options = {
          enableError: false
        };
        const entity = new Entity(entityName, null, fakeDispatch, options);
        isUndefined(entity.isError);
        isUndefined(entity.errorData);
      });
    });
  });

  describe("entity error", () => {
    const defaultState = {};
    const someError = { a: 1 };
    let entity;
    let store;

    before(() => {
      store = createStore();
      const { dispatch } = store;
      entity = new Entity(entityName, defaultState, dispatch);
    });

    it("should have isError set to false in the init state", () => {
      const { errorEntities } = store.getState();
      const { isError } = errorEntities[entityName];
      isFalse(isError);
    });

    it("should set some data in error", () => {
      entity.newError(someError);
      const { errorEntities } = store.getState();
      const { isError, data } = errorEntities[entityName];
      isTrue(isError);
      isTrue(_.isEqual(data, someError));
    });

    it("should reset the data in error", () => {
      entity.resetError();
      const { errorEntities } = store.getState();
      const { isError, data } = errorEntities[entityName];
      isFalse(isError);
      isNull(data);
    });
  });

  describe("findInArrayAndUpdate", () => {
    const oldData = 2;
    const newData = 3;
    const defaultState = [1, oldData];
    let entity;
    let store;

    before(() => {
      store = createStore();
      const { dispatch } = store;
      entity = new Entity(entityName, defaultState, dispatch);
      const func = item => item === oldData;
      entity.findInArrayAndUpdate(newData, func);
    });

    it("should update the second elements in the array", () => {
      const { dataEntities } = store.getState();
      const data = dataEntities[entityName];
      const [first, second] = data;
      isTrue(_.isEqual(newData, second));
    });
  });
});
