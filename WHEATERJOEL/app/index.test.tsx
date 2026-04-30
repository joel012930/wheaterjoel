import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WeatherScreen from './index';

// 🪄 LA MAGIA: Creamos un "doble" de tu hook. 
// Acá NO va la API KEY, solo devolvemos datos falsos fijos.
jest.mock('./hooks/usePronosticoClima', () => {
  return function () {
    return {
      climaActual: {
        fecha: '04/23',
        ciudad: 'Buenos Aires',
        condicion: 'sunny', 
        tempActual: 21,
        tempMin: 13,
        tempMax: 25,
        humedad: 58,
        presion: 1013,
        viento: 14
      },
      cargando: false,
      irSiguiente: jest.fn(),
      irAnterior: jest.fn()
    };
  };
});

// ... (Acá abajo siguen todos tus describe y test normales) ...
// A partir de acá, los tests son exactamente los mismos
describe('Weather App - Evaluación de Interfaz y testIDs', () => {

  test('renderiza la pantalla principal del clima', () => {
    const { getByTestId } = render(<WeatherScreen />);
    expect(getByTestId('screen-weather')).toBeTruthy();
  });

  test('muestra el nombre de la ciudad', () => {
    const { getByTestId } = render(<WeatherScreen />);
    expect(getByTestId('header-city')).toBeTruthy();
  });

  test('permite navegar al día siguiente', () => {
    const { getByTestId } = render(<WeatherScreen />);
    fireEvent.press(getByTestId('button-next-day'));
    // Como mockeamos la función, no va a cambiar el día real, pero verificamos que el botón exista
    expect(getByTestId('navigation-current-day')).toBeTruthy();
  });

  test('renderiza un ícono climático', () => {
    const { getByTestId } = render(<WeatherScreen />);
    expect(getByTestId(/icon-weather-/)).toBeTruthy();
  });

  test('renderiza al menos tres métricas secundarias', () => {
    const { getAllByTestId } = render(<WeatherScreen />);
    expect(getAllByTestId('metric-item').length).toBeGreaterThanOrEqual(3);
  });

  test('muestra la temperatura actual', () => {
    const { getByTestId } = render(<WeatherScreen />);
    const tempText = getByTestId('temp-current').props.children;
    expect(String(tempText)).toMatch(/°/);
  });

  test('muestra temperatura mínima y máxima', () => {
    const { getByTestId } = render(<WeatherScreen />);
    expect(getByTestId('temp-min')).toBeTruthy();
    expect(getByTestId('temp-max')).toBeTruthy();
  });

  test('la app expone todos los testID obligatorios', () => {
    const requiredTestIds = [
      'screen-weather',
      'header-city',
      'button-prev-day',
      'button-next-day',
      'temp-current',
      'temp-min',
      'temp-max',
    ];

    const { getByTestId } = render(<WeatherScreen />);

    requiredTestIds.forEach(id => {
      expect(getByTestId(id)).toBeTruthy();
    });
  });

});