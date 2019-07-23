import { createSelector } from 'reselect';
import { get } from 'lodash';


const getErrorEntities = state => state.errorEntities;

export const selectError = (state, entityName) =>
  createSelector(
    [getErrorEntities],
    entities => get(entities, entityName),
  )(state);

export const selectIsError = (state, entityName) =>
  createSelector(
    [selectError],
    error => get(error, 'isError'),
  )(state, entityName);


export const selectErrorData = (state, entityName) =>
  createSelector(
    [selectError],
    error => get(error, 'data'),
  )(state, entityName);
