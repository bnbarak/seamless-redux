import SeamlessRedux from 'Classes/SeamlessRedux.class';
import selectors from './selectors';
import * as reducers from './reducers';

export { reducers, selectors, SeamlessRedux };

export default store => new SeamlessRedux(store);
