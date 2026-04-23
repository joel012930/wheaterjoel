export const obtenerImagenClima = (codigo: number) => {
    if (codigo === 0) return require("../../assets/images/despejado.png");
    if (codigo >= 1 && codigo <= 3) return require("../../assets/images/nube.png");
    if (codigo >= 4 && codigo <= 48) return require("../../assets/images/niebla.png");
    if (codigo >= 49 && codigo <= 69) return require("../../assets/images/lluvia.png");
    if (codigo >= 70 && codigo <= 79) return require("../../assets/images/nieve.png");
    if (codigo >= 80 && codigo <= 84) return require("../../assets/images/lluvia.png");
    if (codigo >= 85 && codigo <= 94) return require("../../assets/images/nieve.png");
    if (codigo >= 95 && codigo <= 99) return require("../../assets/images/tormenta.png");
    return require("../../assets/images/nube.png");
};