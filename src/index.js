import SeamlessRedux from 'Classes/EasyRedux.class';
import selectors from './selectors';
import * as reducers from './reducers';

export { reducers, selectors, SeamlessRedux };

export default (dispatch) => {
  const seamless = new SeamlessRedux(dispatch);
  return seamless;
};
