import _ from "lodash";

export default (source, other) => {
  const inputsAreObjects = _.isObject(source) && _.isObject(other);
  const inputsAreArray = Array.isArray(source) && Array.isArray(other);

	if (inputsAreObjects && !inputsAreArray) {
    return _.merge(source, other);
  }

  if (inputsAreArray) {
    return source.concat(other);
  }

  return source;
};
