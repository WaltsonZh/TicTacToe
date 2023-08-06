# Tic-Tac-Toe Game

![Tic-Tac-Toe]

## Description

This is a simple Tic-Tac-Toe game implemented using HTML, CSS, and JavaScript. The game allows two players to take turns and place their symbols ("X" or "O") on a 3x3 grid. The first player to get three of their symbols in a row (horizontally, vertically, or diagonally) wins the game. If all the cells are filled and no player has won, the game ends in a draw.

The game board is represented using HTML table cells, and the player symbols are drawn on canvas elements within each cell.

## How to Play

1. Open the `index.html` file in your web browser.
2. Choose whether you want to play as "X" or "O" by clicking the corresponding button.
3. To make a move, click on an empty cell on the game board.
4. After each move, the AI opponent (controlled by the algorithm) will automatically make its move.
5. The game will continue until one of the players wins or the game ends in a draw.
6. To start a new game, click the "reset" button.

## AI Algorithm

The AI opponent uses a simple algorithm to make its moves. It follows a set of rules to prioritize certain moves based on the current game state:

1. If it's the AI's first move, it will place its symbol in the center cell if it's available. Otherwise, it will place it in any corner cell.
2. If it's the AI's second move, it will block the player if the player has a winning move or place its symbol in an optimal position to create two in a row.
3. On subsequent moves, the AI will try to win the game if it has two in a row or block the player if the player has two in a row.
4. If there are no immediate winning moves or blocking moves, the AI will place its symbol in an empty cell based on a predetermined priority order.

## Requirements

- A modern web browser to play the game (tested on Chrome, Firefox, and Edge).

## Screenshots

![Game Screenshot]

## License

This project is licensed under the MIT License - see the [LICENSE] file for details.
