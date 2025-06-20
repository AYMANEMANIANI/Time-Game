<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "HeureFacile";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST['username'];
    $pass = $_POST['password'];

    // Check if user exists
    $sql = "SELECT * FROM utilisateurs WHERE username=? AND pasword=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $user, $pass);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // User found, redirect to index.html
        $_SESSION['username'] = $user;
        header("Location: index.html");
        exit();
    } else {
        /*echo '<script>alert("Invalid Username Or Password")</script>'*/
        header("Location: connexion.html");
    }
    $stmt->close();
}
$conn->close();
?>
