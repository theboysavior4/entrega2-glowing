// Lista de productos simulados
const productos = [
  {
    id: 1,
    nombre: "Campera Bordada",
    precio: 9000,
    imagen: "imagenes/campera.jpg"
  },
  {
    id: 2,
    nombre: "Chaleco Personalizado",
    precio: 5000,
    imagen: "imagenes/chaleco.jpg"
  },
  {
    id: 3,
    nombre: "Gorra Bordada",
    precio: 3000,
    imagen: "imagenes/gorra.jpg"
  }
];

// Recuperar carrito del localStorage o inicializar vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Elementos del DOM
const contenedorProductos = document.getElementById("productos");
const listaCarrito = document.getElementById("carrito-lista");
const totalElemento = document.getElementById("total");
const finalizarBtn = document.getElementById("finalizar");

// Mostrar productos
productos.forEach(producto => {
  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta";
  tarjeta.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}">
    <h3>${producto.nombre}</h3>
    <p>Precio: $${producto.precio}</p>
    <button data-id="${producto.id}">Agregar al carrito</button>
  `;
  contenedorProductos.appendChild(tarjeta);
});

// Evento para agregar productos al carrito
contenedorProductos.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    const id = parseInt(e.target.dataset.id);
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    actualizarCarrito();
  }
});

// Mostrar carrito
function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach((producto, index) => {
    const item = document.createElement("li");
    item.textContent = `${producto.nombre} - $${producto.precio}`;
    listaCarrito.appendChild(item);
    total += producto.precio;
  });

  totalElemento.textContent = total;
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Finalizar compra
finalizarBtn.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  const confirmacion = confirm("¿Deseás confirmar tu compra?");
  if (confirmacion) {
    alert("¡Gracias por tu compra! En breve nos contactaremos.");
    carrito = [];
    actualizarCarrito();
  }
});

// Mostrar carrito inicial si hay algo guardado
actualizarCarrito();
