import { ACTION_TYPES_NAMES } from 'Utils/constants.util';

export default (entityName, func, data, dispatch) => {
  const action = {
    type: ACTION_TYPES_NAMES.FIND_IN_ARRAY_AND_UPDATE,
    entityName,
    data,
    func,
  };

  dispatch(action);
};
