<?php
// Verificar si se recibió el ID de la imagen
if (isset($_POST['idImagen'])) {
    // Obtener el ID de la imagen del formulario
    $idImagen = $_POST['idImagen'];

    // Aquí puedes agregar el producto al carrito en la base de datos
    // Por ejemplo, ejecutar una consulta SQL para insertar el producto en la tabla de carrito

    // Ejemplo de conexión a la base de datos y consulta SQL (debes adaptarlo a tu entorno)
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "bastardines";

    // Crear conexión
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verificar la conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    // Preparar la consulta SQL
    $sql = "INSERT INTO carrito (id_usuario, id_imagen) VALUES (1, '$idImagen')";

    // Ejecutar la consulta SQL
    if ($conn->query($sql) === TRUE) {
        // Responder al cliente con éxito
        echo json_encode(array('success' => true));
    } else {
        // Responder al cliente con error
        echo json_encode(array('error' => 'Error al agregar el producto al carrito: ' . $conn->error));
    }

    // Cerrar conexión
    $conn->close();
} else {
    // Si no se recibió el ID de la imagen, responder con un error
    http_response_code(400);
    echo json_encode(array('error' => 'ID de imagen no recibido.'));
}
?>
