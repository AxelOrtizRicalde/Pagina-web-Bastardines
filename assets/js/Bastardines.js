function App() {}

window.onload = function (event) {
    var app = new App();
    window.app = app;
};

App.prototype.processingButton = function(event) {
    const btn = event.currentTarget;
    const slickList = event.currentTarget.parentNode;
    const track = event.currentTarget.parentNode.querySelector('#track');
    const slick = track.querySelectorAll('.slick');

    const slickWidth = slick[0].offsetWidth;
    
    const trackWidth = track.offsetWidth;
    const listWidth = slickList.offsetWidth;

    track.style.left == ""  ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1);

    btn.dataset.button == "button-prev" ? prevAction(leftPosition,slickWidth,track) : nextAction(leftPosition,trackWidth,listWidth,slickWidth,track)
}

let prevAction = (leftPosition,slickWidth,track) => {
    if(leftPosition > 0) {
        console.log("entro 2")
        track.style.left = `${-1 * (leftPosition - slickWidth)}px`;
    }
}

let nextAction = (leftPosition,trackWidth,listWidth,slickWidth,track) => {
    if(leftPosition < (trackWidth - listWidth)) {
        track.style.left = `${-1 * (leftPosition + slickWidth)}px`;
    }
}

const elementos = [
    { referencia: '/', descuento: 'Descuento -20%', imagen: 'assets/imagenes/40.png'},
    { referencia: '/', descuento: 'Descuento -25%', imagen: 'assets/imagenes/38.png'},
    { referencia: '/', descuento: 'Descuento -10%', imagen: 'assets/imagenes/36.png'},
    { referencia: '/', descuento: 'Descuento -5%', imagen: 'assets/imagenes/34.png'},
    { referencia: '/', descuento: 'Descuento -15%', imagen: 'assets/imagenes/32.png'},
    { referencia: '/', descuento: 'Descuento -35%', imagen: 'assets/imagenes/30.png'},
    { referencia: '/', descuento: 'Descuento -40%', imagen: 'assets/imagenes/12.png'},
    { referencia: '/', descuento: 'Descuento -50%', imagen: 'assets/imagenes/14.png'},
    { referencia: '/', descuento: 'Descuento -25%', imagen: 'assets/imagenes/16.png'},
    { referencia: '/', descuento: 'Descuento -15%', imagen: 'assets/imagenes/18.png'}
     // Agrega más productos aquí con sus respectivos datos
]

// Obtener el contenedor de productos
const elementosContainer = document.getElementById('track');

// Generar y agregar los elementos HTML para cada producto
elementos.forEach(elemento => {
    // Crear un nuevo elemento div con la clase 'slick'
    const item = document.createElement('div');
    item.classList.add('slick');

    const item2 = document.createElement('div');

    const referencia = document.createElement('a');
    referencia.href = elemento.referencia;

    const descuento = document.createElement('h4');
    descuento.classList.add('descuento');
    descuento.textContent = elemento.descuento;

    const picture = document.createElement('picture');
    const img = document.createElement('img');
    img.src = elemento.imagen;
    img.alt = 'Image';

    picture.appendChild(img);
    referencia.appendChild(descuento);
    referencia.appendChild(picture);
    item2.appendChild(referencia);
    item.appendChild(item2);

    elementosContainer.appendChild(item);
});

// URL del archivo PHP que genera el JSON
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
    
    // Por ejemplo, puedes iterar sobre los productos y crear elementos HTML
    const productosContainer = document.getElementById('Seccion3-Productos');
    data.forEach(producto => {
        const item = document.createElement('div');
        item.classList.add('item');
    
        // Crear el elemento figure con la imagen
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = producto.imagen;
        img.alt = 'producto';
        figure.appendChild(img);
    
        // Crear el elemento div con la clase 'info-producto' y agregar título, precio y botones
        const infoProducto = document.createElement('div');
        infoProducto.classList.add('info-producto');
        const titulo = document.createElement('h2');
        titulo.textContent = producto.titulo;
        const precio = document.createElement('p');
        precio.classList.add('precio');
        precio.textContent = producto.precio;
        const botones = document.createElement('div');
        botones.classList.add('botones');
        const botonCarrito = document.createElement('button');
        botonCarrito.textContent = 'Añadir al carrito';
        botonCarrito.setAttribute('imagen_id', producto.id);
        botonCarrito.addEventListener('click', function() {
            // Obtener el ID de la imagen del producto del atributo imagen_id
            const idImagen = this.getAttribute('imagen_id');
            // Llamar a la función agregarAlCarrito con el ID de la imagen del producto
            agregarAlCarrito(idImagen);
        });
        const botonFavoritos = document.createElement('button');
        botonFavoritos.setAttribute('imagen_id', producto.id);
        botonFavoritos.addEventListener('click', function() {
            // Obtener el ID de la imagen del producto del atributo imagen_id
            const idImagen = this.getAttribute('imagen_id');
            // Llamar a la función agregarAFavoritos con el ID de la imagen del producto
            agregarAFavoritos(idImagen);
        });
        botonFavoritos.textContent = 'Añadir a favoritos';
        botones.appendChild(botonCarrito);
        botones.appendChild(botonFavoritos);
    
        // Agregar los elementos creados al elemento 'item'
        infoProducto.appendChild(titulo);
        infoProducto.appendChild(precio);
        infoProducto.appendChild(botones);
        item.appendChild(figure);
        item.appendChild(infoProducto);
    
        // Agregar el elemento 'item' al contenedor de productos
        productosContainer.appendChild(item);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Función para agregar un producto al carrito
function agregarAlCarrito(idImagen) {
    // Obtener la lista de productos del sessionStorage
    let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    
    // Agregar el ID de la imagen al carrito
    carrito.push(idImagen);
    
    // Guardar la lista actualizada en sessionStorage
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Mostrar mensaje de éxito
    alert("¡Producto agregado al carrito!");
}

function agregarAFavoritos(idImagen) {
    // Obtener la lista de productos del sessionStorage
    let favoritos = JSON.parse(sessionStorage.getItem('favoritos')) || [];
    
    // Agregar el ID de la imagen a favoritos
    favoritos.push(idImagen);

    console.log(favoritos);
    
    // Guardar la lista actualizada en sessionStorage
    sessionStorage.setItem('favoritos', JSON.stringify(favoritos));
    
    // Mostrar mensaje de éxito
    alert("¡Producto agregado a favoritos!");
}
