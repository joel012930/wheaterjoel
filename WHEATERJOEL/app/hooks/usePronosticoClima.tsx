import { useState, useEffect } from 'react';
import { Pronostico } from '../tipos/clima';

// 🚨 RECORDATORIO: Poné tu API_KEY real aquí
const API_KEY = '73a9321f9b334be1962190623262304'; 
const CIUDAD = 'Buenos Aires';

const usePronosticoClima = () => {
  const [datosClima, setDatosClima] = useState<Pronostico[]>([]);
  const [index, setIndex] = useState(0);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerClima = async () => {
      try {
        const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CIUDAD}&days=3&aqi=no`);
        const data = await res.json();

        if (data.error) {
          console.error("Error de API:", data.error.message);
          setCargando(false);
          return;
        }

        const formateados = data.forecast.forecastday.map((dia: any, i: number) => ({
          id: String(i),
          // Si es el primer día ponemos "NOW", si no la fecha cortita
          fecha: i === 0 ? "NOW" : dia.date.slice(5).replace('-', '/'),
          ciudad: data.location.name,
          condicion: dia.day.condition.text.toLowerCase(),
          tempActual: i === 0 ? Math.round(data.current.temp_c) : Math.round(dia.day.maxtemp_c),
          tempMin: Math.round(dia.day.mintemp_c),
          tempMax: Math.round(dia.day.maxtemp_c),
          humedad: i === 0 ? data.current.humidity : dia.day.avghumidity,
          presion: i === 0 ? data.current.pressure_mb : 1013,
          viento: i === 0 ? Number((data.current.wind_kph / 3.6).toFixed(1)) : Number((dia.day.maxwind_kph / 3.6).toFixed(1))
        }));

        setDatosClima(formateados);
        setCargando(false);
      } catch (e) {
        console.error("Error de red:", e);
        setCargando(false);
      }
    };
    obtenerClima();
  }, []);

  // LÓGICA DE NAVEGACIÓN CORREGIDA
  const irSiguiente = () => {
    setIndex((prevIndex) => {
      if (prevIndex < datosClima.length - 1) {
        return prevIndex + 1; // Avanza exactamente uno
      }
      return prevIndex; // Si es el último, no hace nada
    });
  };

  const irAnterior = () => {
    setIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1; // Retrocede exactamente uno
      }
      return prevIndex; // Si es el primero, no hace nada
    });
  };

  return { 
    climaActual: datosClima.length > 0 ? datosClima[index] : null, 
    cargando, 
    irSiguiente, 
    irAnterior 
  };
};

export default usePronosticoClima;