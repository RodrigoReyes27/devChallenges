<?php
require 'flight/Flight.php';

Flight::register('db', 'PDO', array('mysql:host=localhost;port=3306;dbname=todoapp', 'root', ''));

// Lee los datos y muestras los datos
Flight::route('GET /activities', function () {
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    
    $statement = Flight::db()->prepare("SELECT * FROM activities");
    $statement->execute();
    $data = $statement->fetchAll((PDO::FETCH_ASSOC));
    
    Flight::json($data);
});


// Recibe un dato y lo añade a la base de datos
Flight::route('POST /activities', function () {
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    $activity = (Flight::request()->data->activity);

    $statement = Flight::db()->prepare("INSERT INTO activities (`activity`, `completed`) VALUES(:activity, false)");
    $statement->bindValue(':activity', $activity);
    $statement->execute();

    Flight::json("Activity added");
});


// Borrar un dato de la base de datos
Flight::route('DELETE /activities', function () {
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    $id = (Flight::request()->data->id);

    $statement = Flight::db()->prepare("DELETE FROM activities WHERE id = :id");
    $statement->bindValue(':id', $id);
    $statement->execute();
    
    Flight::json("Activity with id: $id deleted");
});


// Borrar todos los datos con estatus completed dato de la base de datos
Flight::route('DELETE /all', function () {
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');

    $statement = Flight::db()->prepare("DELETE FROM activities WHERE completed = true");
    $statement->execute();
    
    Flight::json("Deleted all completed activities");
});


// Actualizar un dato de la base de datos
Flight::route('PUT /activities', function() {
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');

    $id = (Flight::request()->data->id);
    $completed = (Flight::request()->data->completed);

    $statement = Flight::db()->prepare("UPDATE activities SET completed = :completed WHERE id = :id");
    $statement->bindValue(':id', $id);
    $statement->bindValue(':completed', $completed);
    $statement->execute();

    Flight::json("Activity with id: $id updated to completed: $completed");
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

Flight::route('OPTIONS /all', function () {
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
});


Flight::map('route', function($params) {
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
});


Flight::start();