const url = './assets/php/Galeria.php';

// Hacer una solicitud Fetch para obtener el JSON
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Ocurrió un error al obtener los datos.');
    }
    return response.json();
  })
  .then(data => {
    // Aquí puedes trabajar con los datos recibidos
    console.log(data);

    const productosEnCarrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

    // Verificar si el carrito está vacío
    if (productosEnCarrito.length === 0) {
        mostrarMensajeCarritoVacio();
        return;
    }

    // Si el carrito no está vacío, continuar con la creación de elementos del carrito

    let precioTotal = 0;
    
    // Por ejemplo, puedes iterar sobre los productos y crear elementos HTML
    const contenedorProductos = document.getElementById('productos-carrito');
    data.forEach(producto => {
        if(!productosEnCarrito.includes(producto.id)) {
            return;
        }
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');

        // Crear el elemento img para la imagen del producto
        const img = document.createElement('img');
        img.src = producto.imagen;
        img.alt = 'Imagen';
        productoDiv.appendChild(img);

        // Crear el elemento div para la información del producto
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('producto-info');

        // Crear el elemento h3 para el título del producto
        const tituloH3 = document.createElement('h3');
        tituloH3.textContent = producto.titulo;
        infoDiv.appendChild(tituloH3);

        // Crear el elemento p para el precio del producto
        const precioP = document.createElement('p');
        precioP.textContent = 'Precio: ' + producto.precio;
        infoDiv.appendChild(precioP);
        const precio = parseFloat(producto.precio.replace('$', ''));
        precioTotal += precio;

        // Agregar la información del producto al div del producto
        productoDiv.appendChild(infoDiv);

        // Crear el botón de eliminar
        const eliminarBtn = document.createElement('button');
        eliminarBtn.classList.add('eliminar-producto');
        eliminarBtn.textContent = 'Eliminar';
        productoDiv.appendChild(eliminarBtn);

        // Agregar el producto al contenedor de productos
        contenedorProductos.appendChild(productoDiv);
    });

    // Obtener el contenedor de productos del carrito
    const productosCarrito = document.getElementById('productos-carrito');

    // Crear el elemento div para el total y añadirlo al contenedor de productos del carrito
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('total');
    totalDiv.innerHTML = `<h3>Total: $${precioTotal.toFixed(2)}</h3>`;
    productosCarrito.appendChild(totalDiv);

    // Crear el elemento div para las acciones y añadirlo al contenedor de productos del carrito
    const accionesDiv = document.createElement('div');
    accionesDiv.classList.add('acciones');

    // Crear el botón de vaciar carrito
    const vaciarBtn = document.createElement('button');
    vaciarBtn.classList.add('boton-vaciar');
    vaciarBtn.textContent = 'Vaciar Carrito';
    accionesDiv.appendChild(vaciarBtn);

    // Crear el botón de comprar
    const comprarBtn = document.createElement('button');
    comprarBtn.classList.add('boton-comprar');
    comprarBtn.textContent = 'Comprar';
    accionesDiv.appendChild(comprarBtn);

    productosCarrito.appendChild(accionesDiv);

    // Función para vaciar el carrito
    vaciarBtn.addEventListener('click', () => {
        contenedorProductos.innerHTML = '';
        totalDiv.innerHTML = '<h3>Total: $0.00</h3>';
        sessionStorage.removeItem('carrito');
        mostrarMensajeCarritoVacio();
    });

    // Función para comprar los productos
    comprarBtn.addEventListener('click', () => {
        // Aquí puedes agregar la lógica para procesar la compra
        contenedorProductos.innerHTML = '';
        totalDiv.innerHTML = '<h3>Total: $0.00</h3>';
        sessionStorage.removeItem('carrito');
        mostrarMensajeCarritoVacio();
        alert('¡Compra realizada con éxito!');
    });

    // Función para eliminar un producto del carrito
    const botonesEliminar = document.querySelectorAll('.eliminar-producto');
    botonesEliminar.forEach(botonEliminar => {
        botonEliminar.addEventListener('click', () => {
            const producto = botonEliminar.parentElement;
            producto.remove();
            calcularPrecioTotal();
        });
    });

    // Función para calcular el precio total
    function calcularPrecioTotal() {
        const preciosProductos = contenedorProductos.querySelectorAll('.producto-info p');
        let precioTotal = 0;
        preciosProductos.forEach(precioProducto => {
            precioTotal += parseFloat(precioProducto.textContent.replace('Precio: $', ''));
        });
        totalDiv.innerHTML = `<h3>Total: $${precioTotal.toFixed(2)}</h3>`;
    }

  })
  .catch(error => {
    console.error('Error:', error);
});

// Función para mostrar el mensaje de carrito vacío
function mostrarMensajeCarritoVacio() {
    const contenedorProductos = document.getElementById('productos-carrito');
    contenedorProductos.innerHTML = '<h2>Ups, parece que tu carrito está vacío.</h2>';
}
