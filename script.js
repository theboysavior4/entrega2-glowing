const form = document.getElementById("simulador-form");
const resultado = document.getElementById("resultado");

const precios = {
  camiseta: { pequeno: 1500, mediano: 2500, grande: 4000 },
  buzo: { pequeno: 2000, mediano: 3000, grande: 4500 },
  campera: { pequeno: 2500, mediano: 3500, grande: 5000 }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const prenda = document.getElementById("prenda").value;
  const tamano = document.getElementById("tamano").value;

  if (!prenda || !tamano) {
    resultado.textContent = "Por favor seleccioná todas las opciones.";
    return;
  }

  const precio = precios[prenda][tamano];
  resultado.innerHTML = `
    <p>Elegiste <strong>${prenda}</strong> con bordado <strong>${tamano}</strong>.</p>
    <p>El precio estimado es <strong>$${precio}</strong>.</p>
  `;

  // Guardamos en localStorage
  const proyecto = { prenda, tamano, precio };
  localStorage.setItem("ultimoProyecto", JSON.stringify(proyecto));
});
