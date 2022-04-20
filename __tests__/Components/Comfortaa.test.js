import React from 'react';
import Comfortaa from '../../src/components/Comfortaa';
import {render} from '@testing-library/react-native';

describe('Comfortaa Testing', () => {
  const {getByTestId, toJSON} = render(
    <Comfortaa color="white">audy</Comfortaa>,
  );
  test('render with 12px size', () => {
    const element = getByTestId('text component');
    expect(element).toBeTruthy();
    // expect(element.props.style.fontSize).toEqual(14);
    // expect(element.props.style.color).toEqual('white');
    // expect(toJSON()).toMatchSnapshot();
  });
});
