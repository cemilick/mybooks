import React from 'react';
import Comfortaa from '../../src/components/Comfortaa';
import {render} from '@testing-library/react-native';

describe('Comfortaa Testing', () => {
  it('render with 14px size', () => {
    const {getByTestId} = render(<Comfortaa>audy</Comfortaa>);
    expect(getByTestId('text component').props.style[0].fontSize).toEqual(14);
  });

  it('render with white color', () => {
    const {getByTestId} = render(<Comfortaa>audy</Comfortaa>);
    expect(getByTestId('text component').props.style[0].color).toEqual('#FFF');
  });

  it('render with children value', () => {
    const {getByTestId} = render(<Comfortaa>cemilick</Comfortaa>);
    expect(getByTestId('text component').props.children).toEqual('cemilick');
  });

  it('equals with snapshot', () => {
    const {getByTestId, toJSON} = render(<Comfortaa>cemilick</Comfortaa>);
    expect(toJSON()).toMatchSnapshot();
  });
});
