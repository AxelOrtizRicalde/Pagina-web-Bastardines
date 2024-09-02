<?php
// Conexión a la base de datos (reemplaza estos valores con los tuyos)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bastardines";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta SQL para obtener los datos de la tabla de imágenes
$sql = "SELECT id_imagen, ruta, titulo, precio, descuento FROM imagenes";
$result = $conn->query($sql);

// Array para almacenar los datos de las imágenes
$productos = array();

if ($result->num_rows > 0) {
    // Recorre cada fila de resultados
    while($row = $result->fetch_assoc()) {
        // Calcula el precio con descuento
        $precioConDescuento = $row['precio'] * (1 - $row['descuento']);
        $precioFormateado = '$' . number_format($precioConDescuento, 2);

        // Agrega los datos del producto al array
        $producto = array(
            'id' => $row['id_imagen'],
            'imagen' => $row['ruta'],
            'titulo' => $row['titulo'],
            'precio' => $precioFormateado, // Precio con descuento
        );
        array_push($productos, $producto);
    }
}

// Convierte el array en JSON y lo imprime
echo json_encode($productos);

// Cierra la conexión
$conn->close();
?>
