import _ from "lodash";
import createStore from "./helpers/reduxStore";
import {
  selectEntity,
  selectEntityData,
  selectEntityIsLoading,
  selectItemFromEntityData
} from "../src/Selector";
import { isTrue, isFalse } from "./helpers/testHelpers";
import EasyRedux from "../src/classes/EasyRedux.class";

const someEntity = "someEntity";
const key = "key";
const value = "value";
const defaultState = {
  [key]: value
};

describe("Selector", () => {
  let store;
  let easy;

  before(() => {
    store = createStore();
    const { dispatch } = store;
    easy = new EasyRedux(dispatch);
    easy.createEntity(someEntity, defaultState);
  });

  it("should select default state", () => {
    const state = store.getState();
    const entity = selectEntity(state, someEntity);
    const { data, isLoading } = entity;
    isTrue(_.isEqual(data, defaultState));
		isTrue(isLoading);
  });

  it("should select default data", () => {
    const state = store.getState();
    const data = selectEntityData(state, someEntity);
    isTrue(_.isEqual(data, defaultState));
  });

  it("should select default isLoading", () => {
    const state = store.getState();
    const isLoading = selectEntityIsLoading(state, someEntity);
		isTrue(isLoading);
  });

  it("should select data ny key", () => {
    const state = store.getState();
    const data = selectItemFromEntityData(state, someEntity, key);
    isTrue(data === value);
  });
});
