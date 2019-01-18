<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Task7</title>
    <style>
        table, td, th {
            border: 1px solid black;
            border-collapse: collapse;
        }
    </style>
</head>
<body>
    <?php
        require_once 'mysql_conn.php';

        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            if (isset($_POST['email']) && isset($_POST['msg'])) {
                if (empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
                    die("Email is invalid");
                } else {
                    // Prevent XSS
                    $email = htmlspecialchars($_POST['email']);
                    $msg = htmlspecialchars($_POST['msg']);

                    echo "$email: $msg" . '<br />' . PHP_EOL;

                    try {
                        $dsn = "mysql:host=$host;dbname=$database";
                        $options = array(
                            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // set the PDO error mode to exception
                        );
                        $conn = new PDO($dsn, $user, $password, $options);
                        echo "Connected successfully" . '<br />' . PHP_EOL;

                        // using prepared statements against SQL injections
                        // prepare query string and bind parameters
                        $sql = "INSERT INTO Feedback (email, message) 
                                VALUES (:email, :message)";
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':email', $email);
                        $stmt->bindParam(':message', $msg);
                        // insert a row
                        $stmt->execute();

                        $lastId = $conn->lastInsertId();
                        echo "New record created successfully. Last ID: $lastId" . '<br />' . PHP_EOL;

                        // select all rows
                        $sql = "SELECT email, message 
                                FROM Feedback";
                        $stmt = $conn->prepare($sql);
                        $stmt->execute();

                        $rows = $stmt->fetchAll(PDO::FETCH_NUM);
                        echo "Count: " . count($rows) . '<br />' . PHP_EOL;
                        
                        // Display the table
                        echo "<table>
                                <tr>
                                    <th>email</th>
                                    <th>message</th>
                                </tr>";
                        foreach ($rows as $row) {
                            echo '<tr>';
                            for ($i = 0; $i < count($row); $i++) {
                                echo "<td>{$row[$i]}</td>";
                            }
                            echo '</tr>'; 
                        }
                        echo '</table>';

                    } catch(PDOException $e) {
                        echo "Error: " . $e->getMessage();
                    } finally {
                        $conn = null;
                    }
                }
            }
        }
    ?>
</body>
</html>