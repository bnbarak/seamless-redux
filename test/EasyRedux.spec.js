import _ from 'lodash';
import EasyRedux from 'Classes/SeamlessRedux.class';
import Entity from 'Classes/Entity.class';
import createStore from './helpers/reduxStore';
import { isTrue } from './helpers/testHelpers';

const initialState = 'test';
const entityName = 'entity';
let seamless;
let store;

describe('EasyRedux class', () => {
  before(() => {
    store = createStore();
    seamless = new EasyRedux(store);
  });

  it('should create an instance', () => isTrue(seamless instanceof EasyRedux));

  it('should test createEntity', () => {
    seamless.createEntity(entityName);
    const entity = seamless.getEntity(entityName);
    isTrue(entity instanceof Entity);
  });

  describe('test get state', () => {
    before(() => {
      const entity = seamless.getEntity(entityName);
      entity.newData(initialState);
    });

    it('should get the state', () => {
      const { dataEntities, loadingEntities, errorEntities } = seamless.state;
      isTrue(_.isEqual(dataEntities, { [entityName]: initialState }));
      isTrue(_.isEqual(loadingEntities, { [entityName]: true }));
      isTrue(
        _.isEqual(errorEntities, {
          [entityName]: { isError: false, data: null },
        }),
      );
    });
  });
});

