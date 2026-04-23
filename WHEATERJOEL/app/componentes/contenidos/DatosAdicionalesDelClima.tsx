import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  humedad: number;
  presion: number;
  viento: number;
}

const DatosAdicionalesDelClima = ({ humedad, presion, viento }: Props) => {
  return (
    <View style={styles.container}>
      <View testID="metric-item" style={styles.row}>
        <MaterialCommunityIcons name="water-outline" size={18} color="#000" style={styles.icon} />
        <Text testID="metric-value" style={styles.text}>{humedad}%</Text>
      </View>
      
      <View testID="metric-item" style={styles.row}>
        <MaterialCommunityIcons name="gauge" size={18} color="#000" style={styles.icon} />
        <Text testID="metric-value" style={styles.text}>{presion} hPa</Text>
      </View>

      <View testID="metric-item" style={styles.row}>
        <MaterialCommunityIcons name="flag-outline" size={18} color="#000" style={styles.icon} />
        <Text testID="metric-value" style={styles.text}>{viento} m/s</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start', // Alineado a la izquierda
    paddingLeft: 40,          // Separación del borde de la pantalla
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,          // Separación entre cada métrica
  },
  icon: {
    marginRight: 10,          // Espacio entre el ícono y el número
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  }
});

export default DatosAdicionalesDelClima;