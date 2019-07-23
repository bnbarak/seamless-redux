import _ from 'lodash';
import createStore from './helpers/reduxStore';
import {
  selectData,
  selectKeyInData,
} from '../src/selectors/data.selectors';
import { isTrue } from './helpers/testHelpers';
import EasyRedux from '../src/classes/EasyRedux.class';
import { selectLoading } from '../src/selectors/loading.selectors';

const someEntity = 'someEntity';
const key = 'key';
const value = 'value';
const defaultState = {
  [key]: value,
};

describe('Selector', () => {
  let store;
  let easy;

  before(() => {
    store = createStore();
    const { dispatch } = store;
    easy = new EasyRedux(dispatch);
    easy.createEntity(someEntity, defaultState);
  });

  it('should select default state', () => {
    const state = store.getState();
    const data = selectData(state, someEntity);
    const isLoading = selectLoading(state, someEntity);
    isTrue(_.isEqual(data, defaultState));
    isTrue(isLoading);
  });

  it('should select default data', () => {
    const state = store.getState();
    const data = selectData(state, someEntity);
    isTrue(_.isEqual(data, defaultState));
  });

  it('should select default isLoading', () => {
    const state = store.getState();
    const isLoading = selectLoading(state, someEntity);
    isTrue(isLoading);
  });

  it('should select data by key', () => {
    const state = store.getState();
    const data = selectKeyInData(state, someEntity, key);
    isTrue(data === value);
  });
});
