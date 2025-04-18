<?php
// Include database connection
require_once 'db_connect.php';

// Set headers for JSON response
header('Content-Type: application/json');

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get data from POST request
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate data
    if (isset($data['player_name']) && isset($data['score'])) {
        $player_name = htmlspecialchars($data['player_name']);
        $score = intval($data['score']);
        
        try {
            // Prepare SQL statement
            $stmt = $conn->prepare("INSERT INTO scores (player_name, score, date_created) VALUES (:player_name, :score, NOW())");
            
            // Bind parameters
            $stmt->bindParam(':player_name', $player_name);
            $stmt->bindParam(':score', $score);
            
            // Execute the statement
            $stmt->execute();
            
            // Return success response
            echo json_encode(['status' => 'success', 'message' => 'Score saved successfully']);
        } catch(PDOException $e) {
            // Return error response
            echo json_encode(['status' => 'error', 'message' => 'Error saving score: ' . $e->getMessage()]);
        }
    } else {
        // Return error if data is missing
        echo json_encode(['status' => 'error', 'message' => 'Missing player name or score']);
    }
} else {
    // Return error for non-POST requests
    echo json_encode(['status' => 'error', 'message' => 'Only POST requests are allowed']);
}
?>