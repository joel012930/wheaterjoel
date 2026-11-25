import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import usePronosticoClima from './hooks/usePronosticoClima';
import DatosAdicionalesDelClima from './componentes/contenidos/DatosAdicionalesDelClima';

export default function WeatherScreen() {
  const { climaActual, cargando, irSiguiente, irAnterior } = usePronosticoClima();

  if (cargando || !climaActual) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // Íconos minimalistas abstractos (lo más parecido a tus imágenes)
  const getIconoClima = (desc: string) => {
    if (desc.includes('rain') || desc.includes('patchy')) return 'weather-pouring';
    if (desc.includes('cloud') || desc.includes('overcast')) return 'weather-cloudy';
    return 'checkbox-blank-circle-outline'; // Un círculo limpio para "soleado"
  };

  return (
    <View testID="screen-weather" style={styles.container}>
      
      {/* 1. TOP BAR: Flechas traslúcidas y fecha central */}
      <View style={styles.topBar}>
        <TouchableOpacity testID="button-prev-day" onPress={irAnterior}>
          <Ionicons name="chevron-back" size={24} color="#C0C0C0" />
        </TouchableOpacity>
        
        <Text testID="navigation-current-day" style={styles.dateText}>
          {climaActual.fecha}
        </Text>
        
        <TouchableOpacity testID="button-next-day" onPress={irSiguiente}>
          <Ionicons name="chevron-forward" size={24} color="#C0C0C0" />
        </TouchableOpacity>
      </View>

      {/* 2. CIUDAD */}
      <Text testID="header-city" style={styles.cityText}>
        {climaActual.ciudad.toUpperCase()}
      </Text>

      {/* 3. ÍCONO GIGANTE CENTRAL */}
      <MaterialCommunityIcons 
        testID={`icon-weather-${climaActual.condicion}`}
        name={getIconoClima(climaActual.condicion)} 
        size={220} 
        color="#000" 
        style={styles.mainIcon}
      />

      {/* 4. MÉTRICAS (Alineadas a la izquierda) */}
      <DatosAdicionalesDelClima 
        humedad={climaActual.humedad} 
        presion={climaActual.presion} 
        viento={climaActual.viento} 
      />

      {/* 5. LÍNEA DE TEMPERATURAS INFERIOR (Simula el Timeline de tu imagen) */}
      <View style={styles.bottomSection}>
        
        {/* Fila de números de temperatura */}
        <View style={styles.timelineTemps}>
          <Text testID="temp-min" style={styles.sideTemp}>{climaActual.tempMin}°</Text>
          <Text testID="temp-current" style={styles.mainTemp}>{climaActual.tempActual}°</Text>
          <Text testID="temp-max" style={styles.sideTemp}>{climaActual.tempMax}°</Text>
        </View>

        {/* Fila de la línea y textos (MIN --- NOW --- MAX) */}
        <View style={styles.timelineLineContainer}>
          <Text style={styles.timelineLabel}>MIN</Text>
          <View style={styles.line} />
          <Text style={styles.nowLabel}>NOW</Text>
          <View style={styles.line} />
          <Text style={styles.timelineLabel}>MAX</Text>
        </View>

      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF', 
    paddingTop: 50, 
    paddingBottom: 30,
    justifyContent: 'space-between' // Distribuye los elementos en toda la pantalla
  },
  
  // Top Bar
  topBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 30 
  },
  dateText: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  
  // Header Ciudad
  cityText: { 
    textAlign: 'center', 
    fontSize: 28, 
    fontWeight: '900', 
    letterSpacing: 4, 
    marginTop: 20 
  },
  
  // Ícono Central
  mainIcon: { 
    alignSelf: 'center', 
    marginVertical: 20 
  },

  // Sección Inferior (Timeline)
  bottomSection: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20
  },
  timelineTemps: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
    marginBottom: 10
  },
  mainTemp: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal: 30,
    lineHeight: 65 // Evita que se desalinee con los números chicos
  },
  sideTemp: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10
  },
  timelineLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between'
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D3D3D3', // Línea gris clarito
    marginHorizontal: 10
  },
  timelineLabel: {
    fontSize: 10,
    color: '#A0A0A0', // Gris traslúcido
    fontWeight: 'bold'
  },
  nowLabel: {
    fontSize: 12,
    color: '#000',
    fontWeight: '900'
  }
});
