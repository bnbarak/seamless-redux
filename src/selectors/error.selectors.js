import { createSelector } from 'reselect';
import { get } from 'lodash';


const getErrorEntities = state => state.entitiesError;

export const selectError = (state, entityName) =>
  createSelector(
    [getErrorEntities],
    entities => get(entities, entityName),
  )(state);

export const selectIsError = state =>
  createSelector(
    [selectError],
    entities => get(entities, 'isError'),
  )(state);

export const selectErrorMessage = state =>
  createSelector(
    [selectError],
    entities => get(entities, 'data'),
  )(state);
