import { createSelector } from 'reselect';
import { get } from 'lodash';


const getLoadingEntities = state => state.loadingEntities;

export const selectLoading = (state, entityName) =>
  createSelector(
    [getLoadingEntities],
    entities => get(entities, entityName),
  )(state);
