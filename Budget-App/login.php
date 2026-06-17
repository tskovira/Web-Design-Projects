<?php
session_start();

// Simulated user database (email => password)
$users = [
    "user@example.com" => "password123",
    "travis@fries.com" => "budgetapp"
];

// Handle logout
if (isset($_GET["logout"])) {
    session_destroy();
    header("Location: login.php");
    exit();
}

// Handle login submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"] ?? "";
    $password = $_POST["password"] ?? "";

    if (isset($users[$email]) && $users[$email] === $password) {
        $_SESSION["user"] = $email;
        header("Location: login.php");
        exit();
    } else {
        $error = "Invalid email or password.";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login - Budget App</title>
</head>
<body>

<?php if (isset($_SESSION["user"])): ?>
    <h2>Welcome, <?= htmlspecialchars($_SESSION["user"]) ?>!</h2>
    <p>You are now logged in. This is your dashboard.</p>
    <form method="get" action="login.php">
        <input type="submit" name="logout" value="Logout">
    </form>

<?php else: ?>
    <h2>Login to Budget App</h2>

    <?php if (isset($error)): ?>
        <p style="color:red;"><?= $error ?></p>
    <?php endif; ?>

    <form method="POST" action="login.php">
        <label>Email:</label>
        <input type="email" name="email" required><br><br>

        <label>Password:</label>
        <input type="password" name="password" required><br><br>

        <input type="submit" value="Login">
    </form>
<?php endif; ?>

</body>
</html>
