import { ACTION_TYPES_NAMES } from 'Utils/constants.util';

export default (entityName, key, data, dispatch) => {
  const action = {
    type: ACTION_TYPES_NAMES.UPDATE_OBJECT_BY_KEY,
    entityName,
    data,
    key,
  };

  dispatch(action);
};
