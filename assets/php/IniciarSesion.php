<?php
session_start(); // Iniciar la sesión

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

// Consulta preparada para seleccionar usuario por correo y contraseña
$sql = "SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $correo, $contrasena);

// Ejecutar la consulta
$stmt->execute();

// Obtener el resultado de la consulta
$result = $stmt->get_result();

// Verificar si se encontró un usuario con las credenciales proporcionadas
if ($result->num_rows == 1) {
    // Usuario autenticado, iniciar sesión
    $_SESSION['correo'] = $correo;
    // Redirigir a la página de inicio de sesión exitosa
    //mensaje de inicio de sesion exitoso
    echo'<script type="text/javascript">
    alert("Bienvenido a Bastardines");
    window.location.href="/Proyecto/Bastardines.html";
    </script>';
    
    exit();
} else {
    // Usuario no encontrado o credenciales incorrectas
    echo'<script type="text/javascript">
    alert("Correo o contraseña incorrectos");
    window.location.href="/Proyecto/IniciarSesion.html";
    </script>';
}

// Cerrar la conexión y la declaración preparada
$stmt->close();
$conn->close();
?>
