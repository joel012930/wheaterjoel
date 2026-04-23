// tipos/clima.ts
export interface Pronostico {
  id: string;
  fecha: string;
  ciudad: string;
  condicion: 'sunny' | 'cloudy' | 'rainy';
  tempActual: number;
  tempMin: number;
  tempMax: number;
  humedad: number;
  presion: number;
  viento: number;
}

// IMPORTANTE: Exportación por defecto para evitar warnings [cite: 167]
const ClimaTypes = {};
export default ClimaTypes;