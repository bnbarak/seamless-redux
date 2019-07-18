import { ACTION_TYPES_NAMES } from "../utils/constants.util";

export default (entityName, data, dispatch) => {
	const action = {
		type: ACTION_TYPES_NAMES.PUSH_DATA,
		entityName,
		data
	};

	dispatch(action);
};
