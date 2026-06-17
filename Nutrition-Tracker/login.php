<?php

$usersFile = "users.txt";

if (isset($_GET["logout"])) {
    header("Location: login.html");
    exit();
}

if (isset($_POST["register"])) {
    $email = $_POST["email"];
    $password = $_POST["password"];
    $exists = false;

    if (file_exists($usersFile)) {
        $lines = file($usersFile, FILE_IGNORE_NEW_LINES);
        foreach ($lines as $line) {
            list($existingEmail) = explode(":", $line, 2);
            if ($existingEmail === $email) {
                $exists = true;
                break;
            }
        }
    }

    if ($exists) {
        header("Location: login.html?error=exists");
    } else {
        file_put_contents($usersFile, "$email:$password\n", FILE_APPEND);
        $_SESSION["user"] = $email;
        header("Location: diet.html");
    }
    exit();
}

if (isset($_POST["login"])) {
    $email = $_POST["email"];
    $password = $_POST["password"];

    if (file_exists($usersFile)) {
        $lines = file($usersFile, FILE_IGNORE_NEW_LINES);
        foreach ($lines as $line) {
            list($existingEmail, $existingPassword) = explode(":", $line, 2);
            if ($existingEmail === $email && $existingPassword === $password) {
                $_SESSION["user"] = $email;
                header("Location: diet.html");
                exit();
            }
        }
    }

    header("Location: login.html?error=invalid");
    exit();
}
?>
