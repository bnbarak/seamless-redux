import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Seamless, { reducers } from '../../src';
import Form from "./Form";

const rootReducer = combineReducers({ ...reducers });
const store = createStore(rootReducer);

export const seamless = Seamless(store);

const entityName = 'Form';
const defaultData = { input: '' };
export const options = {
  defaultIsError: true,
  defaultErrorData: 'Input should be more than 3 characters',
};

seamless.createEntity(entityName, defaultData, options);

export default props => (
  <Provider store={store}>
    <Form seamless={seamless}/>
  </Provider>
);
