<?php
$filePath = 'registros.csv';
$addHeaders = !file_exists($filePath); 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'] ?? '';
    $carrera = $_POST['carrera'] ?? '';
    $email = $_POST['email'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $fecha = date('Y-m-d H:i:s');

    if (empty($nombre) || empty($carrera) || empty($email) || empty($telefono)) {
        echo json_encode(['success' => false, 'message' => 'Faltan datos']);
        exit;
    }

    $file = fopen($filePath, 'a');

    if ($addHeaders) {
        // ✅ Encabezados personalizados
        fputcsv($file, ['Nombre completo', 'Carrera a inscribirse', 'Correo electrónico', 'Teléfono de contacto', 'Fecha de registro']);
    }

    $data = [$nombre, $carrera, $email, $telefono, $fecha];
    fputcsv($file, $data);
    fclose($file);

    echo json_encode(['success' => true, 'message' => 'Registro guardado correctamente']);
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>
