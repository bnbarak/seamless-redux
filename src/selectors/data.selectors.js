import { createSelector } from 'reselect';
import { get } from 'lodash';

const getDataEntities = state => state.entitiesData;

export const selectData = (state, entityName) =>
  createSelector(
    [getDataEntities],
    entities => get(entities, entityName),
  )(state);

export const selectKeyInData = (state, entityName, key) =>
  createSelector(
    [selectData],
    entities => get(entities, key),
  )(state, entityName);

