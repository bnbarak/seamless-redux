import { ACTION_TYPES_NAMES } from 'Utils/constants.util';

export default (entityName, data, dispatch) => {
  const action = {
    type: ACTION_TYPES_NAMES.MERGE_DATA,
    entityName,
    data,
  };

  dispatch(action);
};
