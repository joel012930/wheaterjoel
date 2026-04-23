import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    ContenedorMain: { 
        flex: 1 
    },
    backgroundImage: { 
        position: 'absolute', 
        height: '100%', 
        width: '100%' 
    },
    loaderContainer: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'white' 
    },
    safeArea: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    ContenedorDatos: { 
        backgroundColor: "white", 
        width: "100%", 
        height: "100%", 
        padding: 30, 
        alignItems: "center", 
        gap: 35 
  
    },
    ContenedorNavegacion: { 
        flexDirection: "row", 
        width: "100%", 
        justifyContent: 'space-between', 
        alignItems: "center" 
    },
    Navegacion: { 
        flexDirection: "row", 
        alignItems: "center", 
        width: 60 
    },
    textoFechaPrincipal: { 
        fontWeight: 'bold', 
        fontSize: 25 
    },
    textoNavChico: { 
        fontSize: 20, 
        fontWeight: '500', 
        opacity: 0.3 
    },
    ContenedorCiudad:{
        padding: 20

    },
    TextoCiudad: { 
        fontSize: 40, 
        fontWeight: '900', 
        letterSpacing: 1 
    },
    mainImage: { 
        width: 300, 
        height: 300 
    },
    ContenedorDatosAdicionales: { 
        alignSelf: "flex-start", 
        gap: 10,  
    },
    ContenedorPrincipalDelPronostico: { width: '100%'},
    ContenedorPronostico: { flexDirection: "row", width: "100%", alignItems: 'baseline' },
    ContenedorDeTextoPronostico: { flexDirection: 'row', width: '100%' },
    ContenedorDeTempLateral: { flex: 1, alignItems: "center" },
    ContenedorDeTempCentral: { flex: 2, alignItems: 'center' },
    ContenedorDeTextoLateral: { flex: 1, alignItems: "center" },
    ContenedorDeTextoCentral: { flex: 2, alignItems: 'center' },
    TextoTempPrincipal: { fontSize: 80, fontWeight: '900'},
    TextoTempSecundaria: { fontSize: 24, fontWeight: 'bold'},
    TextoCentralDeLaTemp: { fontSize: 22, fontWeight: '900', letterSpacing: 2 },
    TextoLateralDeLaTemp: { fontSize: 18, fontWeight: 'bold', opacity: 0.2 }
});