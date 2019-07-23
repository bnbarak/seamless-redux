import * as dataSelectors from './data.selectors';
import * as errorSelectors from './error.selectors';
import * as loadingSelectors from './loading.selectors';

const exportSelectors = {
  ...dataSelectors,
  ...errorSelectors,
  ...loadingSelectors,
};
export default exportSelectors;
