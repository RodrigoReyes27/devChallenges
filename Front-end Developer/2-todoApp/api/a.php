<?php
require 'flight/Flight.php';

Flight::register('db', 'PDO', array('mysql:host=localhost;port=3306;dbname=todoapp', 'root', ''));

// Lee los datos y muestras los datos
Flight::route('GET /activities', function () {
    $statement = Flight::db()->prepare("SELECT * FROM activities");
    $statement->execute();
    $data = $statement->fetchAll((PDO::FETCH_ASSOC));
    
    Flight::json($data);
});


// Recibe un dato y lo añade a la base de datos
Flight::route('POST /activities', function () {
    $activity = (Flight::request()->data->activity);

    $statement = Flight::db()->prepare("INSERT INTO activities (`activity`, `activity_status`) VALUES(:activity, 'active')");
    $statement->bindValue(':activity', $activity);
    $statement->execute();

    Flight::jsonp("Activity added");
    // Flight::json(Flight::request());
});


// Borrar un dato de la base de datos
Flight::route('DELETE /activities', function () {
    $id = (Flight::request()->data->id);
    $activity = (Flight::request()->data->activity);

    $statement = Flight::db()->prepare("DELETE FROM activities WHERE id = :id");
    $statement->bindValue(':id', $id);
    $statement->execute();
    
    Flight::jsonp("Activity with id: $id deleted");
});


// Actualizar un dato de la base de datos
Flight::route('PUT /activities', function() {
    $id = (Flight::request()->data->id);
    $status = (Flight::request()->data->status);

    $statement = Flight::db()->prepare("UPDATE activities SET activity_status = :status WHERE id = :id");
    $statement->bindValue(':id', $id);
    $statement->bindValue(':status', $status);
    $statement->execute();

    Flight::jsonp("Activity with id: $id updated to status: $status");
});


// Lectura de un registro determinado
Flight::route('GET /activities/@id', function($id) {
    $statement = Flight::db()->prepare("SELECT * FROM activities WHERE id = :id");
    $statement->bindValue(':id', $id);
    $statement->execute();
    $data = $statement->fetchAll((PDO::FETCH_ASSOC));
    
    Flight::json($data);
});


Flight::route('OPTIONS /activities', function () {
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
});


Flight::start();