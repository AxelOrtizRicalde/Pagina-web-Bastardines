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

    const productosFavoritos = JSON.parse(sessionStorage.getItem('favoritos')) || [];
    
    // Por ejemplo, puedes iterar sobre los productos y crear elementos HTML
    const contenedorProductos = document.getElementById('galeria');
    data.forEach(producto => {
        if(!productosFavoritos.includes(producto.id)) {
            return;
        }
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('imagen-favorita');

        // Crear el elemento img para la imagen del producto
        const img = document.createElement('img');
        img.src = producto.imagen;
        img.alt = 'Imagen';
        productoDiv.appendChild(img);

        // Agregar el producto al contenedor de productos
        contenedorProductos.appendChild(productoDiv);
    });

  })
  .catch(error => {
    console.error('Error:', error);
});
