import { createSelector } from 'reselect';
import { get } from 'lodash';


const getLoadingEntities = state => state.entitiesLoading;

export const selectLoading = (state, entityName) =>
  createSelector(
    [getLoadingEntities],
    entities => get(entities, entityName),
  )(state);
