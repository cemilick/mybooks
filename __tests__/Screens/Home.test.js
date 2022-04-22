import * as React from 'react';
import {create} from 'react-test-renderer';
import ContainerTesting from '../../src/helpers/reduxTesting';
import Home from '../../src/screens/Home';

jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});

describe('Screen Home Testing', () => {
  it('have access to global reducer', () => {
    const component = create(ContainerTesting(<Home />));
    const root = component.root;
    const {Global} = root.props.store.getState();
    expect(root.props.store).toBeTruthy();
    expect(Global).toBeTruthy();
    expect(typeof Global.token).toEqual('string');
  });

  it('have Home reducer', () => {
    const component = create(ContainerTesting(<Home />));
    const root = component.root;
    const {HomeReducer} = root.props.store.getState();
    expect(HomeReducer).toBeTruthy();
    expect(typeof Home.books).toEqual('array');
  });

  it('equals with snapshot', () => {
    const component = create(ContainerTesting(<Home />));
    expect(component).toMatchSnapshot();
  });
});
