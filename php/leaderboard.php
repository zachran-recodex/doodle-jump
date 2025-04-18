<?php
// Include database connection
require_once 'db_connect.php';

// Set headers for JSON response when accessed via AJAX
if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
    header('Content-Type: application/json');
}

try {
    // Prepare SQL statement to get top 10 scores
    $stmt = $conn->prepare("SELECT player_name, score, date_created FROM scores ORDER BY score DESC LIMIT 10");
    
    // Execute the statement
    $stmt->execute();
    
    // Fetch all results
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // If it's an AJAX request, return JSON
    if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
        echo json_encode(['status' => 'success', 'data' => $results]);
        exit;
    }
} catch(PDOException $e) {
    if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
        echo json_encode(['status' => 'error', 'message' => 'Error fetching leaderboard: ' . $e->getMessage()]);
        exit;
    }
    $error = 'Error fetching leaderboard: ' . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Doodle Jump Leaderboard</title>
    <link rel="stylesheet" href="../css/style.css">
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #87CEEB;
        }
        
        .leaderboard-container {
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            padding: 20px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 20px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        
        th {
            background-color: #5D9C59;
            color: white;
        }
        
        tr:nth-child(even) {
            background-color: rgba(255, 255, 255, 0.5);
        }
        
        tr:hover {
            background-color: rgba(93, 156, 89, 0.1);
        }
        
        .back-btn {
            display: block;
            background-color: #5D9C59;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            margin: 20px auto 0;
            text-align: center;
            text-decoration: none;
            width: fit-content;
        }
    </style>
</head>
<body>
    <div class="leaderboard-container">
        <h1>Leaderboard</h1>
        
        <?php if(isset($error)): ?>
            <p style="color: red;"><?php echo $error; ?></p>
        <?php else: ?>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if(empty($results)): ?>
                        <tr>
                            <td colspan="4" style="text-align: center;">No scores yet. Be the first to play!</td>
                        </tr>
                    <?php else: ?>
                        <?php $rank = 1; ?>
                        <?php foreach($results as $row): ?>
                            <tr>
                                <td><?php echo $rank++; ?></td>
                                <td><?php echo htmlspecialchars($row['player_name']); ?></td>
                                <td><?php echo number_format($row['score']); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        <?php endif; ?>
        
        <a href="../index.html" class="back-btn">Back to Game</a>
    </div>
</body>
</html>