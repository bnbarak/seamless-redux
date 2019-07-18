import { createSelector } from 'reselect';
import { get } from 'lodash';

const getEntities = state => state.entities;

export const selectEntity = (state, entityName) =>
  createSelector(
    [getEntities],
    entities => get(entities, entityName),
  )(state);

export const selectEntityData = (state, entityName) =>
  createSelector(
    [selectEntity],
    entities => get(entities, 'data'),
  )(state, entityName);

export const selectEntityIsLoading = (state, entityName) =>
  createSelector(
    [selectEntity],
    entities => get(entities, 'isLoading'),
  )(state, entityName);

export const selectItemFromEntityData = (state, entityName, key) =>
  createSelector(
    [selectEntityData],
    entities => get(entities, key),
  )(state, entityName);
