<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bastardines";

// Conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Recibir datos del formulario
$correo = $_POST['email'];
$contrasena = $_POST['password'];
$confirm_contrasena = $_POST['confirm_password'];

// Verificar si las contraseñas coinciden
if ($contrasena != $confirm_contrasena) {
    die("Las contraseñas no coinciden. Por favor, inténtelo de nuevo.");
}

// Consulta preparada para insertar datos en la tabla 'usuarios'
$sql = "INSERT INTO usuarios (correo, contraseña) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $correo, $contrasena);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo "Registro exitoso. Redireccionando a la página de inicio...";
    // Redirigir al usuario a la página de inicio (Bastardines.html)
    header("Location: /Proyecto/Bastardines.html");
    exit(); // Asegura que el script PHP se detenga después de la redirección
} else {
    echo "Error al registrar usuario: " . $stmt->error;
}

// Cerrar la conexión y la declaración preparada
$stmt->close();
$conn->close();
?>