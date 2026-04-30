import { useState, useEffect } from 'react';
import { Pronostico } from '../tipos/clima';

// 🚨 IMPORTANTE: Leemos la clave desde el archivo .env (¡Nada de jest.mock acá!)
const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
const CIUDAD = 'Buenos Aires';

const usePronosticoClima = () => {
  const [datosClima, setDatosClima] = useState<Pronostico[]>([]);
  const [index, setIndex] = useState(1); 
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerDatosCronologicos = async () => {
      try {
        console.log("1. Iniciando carga de datos...");

        // Ajustamos la forma de calcular la fecha para evitar problemas de zona horaria
        const fechaHoy = new Date();
        const fechaAyer = new Date();
        fechaAyer.setDate(fechaHoy.getDate() - 1);
        
        // Extraemos AAAA-MM-DD de forma segura
        const ayerString = fechaAyer.toISOString().split('T')[0];
        console.log("2. Fecha de ayer calculada:", ayerString);

        // Armamos las URLs
        const urlAyer = `https://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${CIUDAD}&dt=${ayerString}`;
        const urlFuturo = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CIUDAD}&days=2`;
        
        console.log("3. Haciendo fetch a las APIs...");

        const [resAyer, resFuturo] = await Promise.all([
          fetch(urlAyer),
          fetch(urlFuturo)
        ]);

        console.log("4. Respuestas recibidas. Analizando JSON...");

        const dataAyer = await resAyer.json();
        const dataFuturo = await resFuturo.json();

        // 🛡️ ESCUDO: Verificamos si la API mandó un error adentro del JSON
        if (dataAyer.error) {
           console.error("Error en API (Ayer):", dataAyer.error.message);
           setCargando(false);
           return;
        }
        if (dataFuturo.error) {
           console.error("Error en API (Futuro):", dataFuturo.error.message);
           setCargando(false);
           return;
        }

        console.log("5. Datos extraídos correctamente. Formateando...");

        const diasCombinados = [
          dataAyer.forecast.forecastday[0],
          dataFuturo.forecast.forecastday[0],
          dataFuturo.forecast.forecastday[1]
        ];

        const formateados: Pronostico[] = diasCombinados.map((dia, i) => ({
          id: String(i),
          fecha: dia.date.slice(5).replace('-', '/'), 
          ciudad: dataFuturo.location.name,
          condicion: dia.day.condition.text.toLowerCase(),
          tempActual: i === 1 ? Math.round(dataFuturo.current.temp_c) : Math.round(dia.day.avgtemp_c),
          tempMin: Math.round(dia.day.mintemp_c),
          tempMax: Math.round(dia.day.maxtemp_c),
          humedad: i === 1 ? dataFuturo.current.humidity : dia.day.avghumidity,
          presion: i === 1 ? dataFuturo.current.pressure_mb : 1013,
          viento: i === 1 ? Number((dataFuturo.current.wind_kph / 3.6).toFixed(1)) : Number((dia.day.maxwind_kph / 3.6).toFixed(1))
        }));

        setDatosClima(formateados);
        setCargando(false);
        console.log("6. Carga finalizada con éxito.");

      } catch (e) {
        console.error("❌ Error CRÍTICO en la cronología:", e);
        setCargando(false); // Esto asegura que, si hay error, deje de girar la ruedita
      }
    };

    obtenerDatosCronologicos();
  }, []);

  const irSiguiente = () => index < 2 && setIndex(index + 1);
  const irAnterior = () => index > 0 && setIndex(index - 1);

  return { climaActual: datosClima[index], cargando, irSiguiente, irAnterior };
};

export default usePronosticoClima;