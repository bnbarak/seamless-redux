import keymirror from 'keymirror';

export const ACTION_TYPES_NAMES = keymirror({
  INIT_ENTITY: null,
  RESET_ENTITY: null,
  ADD_ENTITY: null,
  START_FETCH: null,
  FINISH_FETCH: null,
  NEW_DATA: null,
  MERGE_DATA: null,
  UPDATE_OBJECT_BY_KEY: null,
  FIND_IN_ARRAY_AND_UPDATE: null,
  TOGGLE_BOOLEAN: null,
  PUSH_DATA: null,
  NEW_ERROR: null,
});
