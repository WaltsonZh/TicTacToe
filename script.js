/*
Author: WaltsonZh
File: script.js
Description:
    This script implements a simple Tic-Tac-Toe game with a basically impossible-to-beat AI opponent.
    The game also provides buttons to reset the game and to choose between "X" and "O".
    If the player choose "X", they go first, if they choose "O", the AI goes first.
*/

// Get references to HTML elements
const board = document.querySelectorAll('td')
const crossbtn = document.getElementById('crossbtn')
const circlebtn = document.getElementById('circlebtn')
const resetbtn = document.getElementById('resetbtn')
const cross = document.querySelectorAll('.cross')
const circle = document.querySelectorAll('.circle')

// Define winning combinations as a 2d array
const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

// Initialize game variables
let playerX = true
let enabled = true
let rounds = 0
let game = new Array(9).fill(0) // 0: empty, 1: cross, -1: circle
let finished = false

// Draw the "cross" shape on the canvas elements
cross.forEach((cro) => {
    const centerX = cro.width / 2
    const centerY = cro.height / 2
    const cav = cro.getContext('2d')
    cav.clearRect(0, 0, cro.width, cro.height)

    cav.translate(centerX, centerY)
    cav.rotate(Math.PI / 4)

    cav.strokeStyle = 'hsl(210, 30%, 60%)'
    cav.lineWidth = 10

    cav.beginPath()
    cav.moveTo(-40, 0)
    cav.lineTo(40, 0)
    cav.stroke()

    cav.beginPath()
    cav.moveTo(0, -40)
    cav.lineTo(0, 40)
    cav.stroke()
})

// Draw the "circle" shape on the canvas elements
circle.forEach((cir) => {
    const centerX = cir.width / 2
    const centerY = cir.height / 2
    const cav = cir.getContext('2d')
    cav.clearRect(0, 0, cir.width, cir.height)

    cav.beginPath()
    cav.arc(centerX, centerY, 35, 0, Math.PI * 2)
    cav.arc(centerX, centerY, 32, 0, Math.PI * 2, true)
    cav.closePath()

    cav.strokeStyle = 'hsl(210, 40%, 25%)'
    cav.fillStyle = 'hsl(210, 40%, 25%)'
    cav.lineWidth = 10

    cav.stroke()
    cav.fill()
})

// Event listener for the "cross" button
crossbtn.addEventListener('click', () => {
    crossbtn.disabled = true
    circlebtn.disabled = true
    document.getElementById('hint').innerHTML = 'Turn of &times;'
})

// Event listener for the "circle" button
circlebtn.addEventListener('click', () => {
    crossbtn.disabled = true
    circlebtn.disabled = true
    document.getElementById('hint').innerHTML = 'Turn of &times;'

    // Delayed AI move for showing the first "O" symbol
    setTimeout(() => {
        enabled = false
        show(board[1], 1)
    }, 600)
})

// Event listeners for the game board blocks
board.forEach((block, index) => {
    block.addEventListener('click', () => {
        crossbtn.disabled = true
        circlebtn.disabled = true
        if (game[index] == 0 && enabled) {
            show(block, index)

            // Delayed AI move after showing player's symbol
            setTimeout(() => {
                position = algorithm()
                if (position != -1) {
                    show(board[position], position)
                }
                if (rounds == 9) {
                    showResult()
                }
            }, 600)
        }
    })

    block.addEventListener('mouseover', () => {
        if (game[index] == 0) {
            blockMouseover(block)
        }
    })

    block.addEventListener('mouseleave', () => {
        blockMouseleave(block)
    })
})


// Event listener for the "reset" button
resetbtn.addEventListener('click', () => {
    board.forEach((block) => {
        block.querySelectorAll('canvas').forEach((cav) => {
            cav.style.display = 'none'
        })
    })

    // Enable the buttons and reset game variables
    crossbtn.disabled = false
    circlebtn.disabled = false
    resetbtn.style.display = 'none'
    playerX = true
    rounds = 0
    enabled = true
    game.fill(0)
    finished = false

    document.getElementById('hint').innerHTML = 'Chose your turn &uparrow;'
})

// Function to handle player's move and update game state
function show(block, index) {
    if (playerX) {
        block.querySelector('.cross').style.display = 'inline'
        document.getElementById('hint').innerHTML = 'Turn of' + `<span style="margin-top: -5px; margin-left: 18px">o</span>`
        game[index] = 1
    } else {
        block.querySelector('.circle').style.display = 'inline'
        document.getElementById('hint').innerHTML = 'Turn of &times;'
        game[index] = -1
    }
    block.style.backgroundColor = 'hsl(210, 40%, 40%)'
    rounds += 1
    enabled = !enabled
    playerX = !playerX
    showResult()

    // Show the "reset" button if the game is finished or it's a draw
    if (finished || rounds == 9) {
        resetbtn.style.display = 'inline'
    }
}

// Function to change block background color when the mouse is over it
function blockMouseover(block) {
    block.style.backgroundColor = 'hsl(210, 40%, 45%)'
}

// Function to reset block background color when the mouse leaves it
function blockMouseleave(block) {
    block.style.backgroundColor = 'hsl(210, 40%, 40%)'
}

// Function to determine AI's move using a impossible-to-beat algorithm
function algorithm() {
    if (rounds == 9 || finished) {
        return -1
    }

    let index, tmp

    switch (rounds) {
        case 1: // player: X, AI: O
            if (game[4] == 1) {
                index = 0
            } else {
                index = 4
            }
            break
        case 2: // player: O, AI: X
            tmp = game.indexOf(-1)
            if (tmp == 0 || tmp == 2) {
                index = tmp + 6
            } else if (tmp == 3 || tmp == 5) {
                index = 4
            } else if (tmp == 4) {
                index = 0
            } else if (tmp == 6 || tmp == 8) {
                index = tmp - 6
            } else {
                // tmp == 7
                index = 6
            }
            break
        case 3:
            index = checkline(1)
            if (index == -1) {
                tmp = game.indexOf(1)
                if (tmp == 0 || tmp == 2) {
                    if (game[4] == 0) {
                        index = 8 - tmp
                    } else {
                        index = game[7] == 0 ? 7 : 5 - tmp
                    }
                } else if (tmp == 1) {
                    tmp = game.indexOf(1, 2)
                    if (tmp == 7) {
                        index = 0
                    } else {
                        index = tmp > 5 ? tmp - 6 : tmp + 3
                    }
                } else if (tmp == 3 || tmp == 5) {
                    index = game[7] == 1 ? tmp - 3 : tmp + 3
                } else {
                    index = 2
                }
            }
            break
        case 4:
            index = checkline(1)
            if (index == -1) {
                index = checkline(-1)
            }
            if (index == -1) {
                tmp = game.indexOf(-1)
                if (tmp == 0 || tmp == 2) {
                    if (game[7] == 0) {
                        index = 7
                    } else {
                        index = game[6] == 0 ? 6 : 8
                    }
                } else if (tmp == 3 || tmp == 5 || tmp == 7) {
                    index = 0
                }
            }
            break
        case 5:
            index = checkline(-1)
            if (index == -1) {
                index = checkline(1)
            }
            if (index == -1) {
                if (game[4] == -1) {
                    index = game[1] == 0 ? 1 : 3
                } else {
                    index = game[1] == 1 ? 6 : 2
                }
            }
            break
        case 6:
            index = checkline(1)
            if (index == -1) {
                index = checkline(-1)
            }
            if (index == -1) {
                tmp = game.indexOf(-1)
                if (tmp == 0 || tmp == 2) {
                    if (game[0] == -1 && game[2] == -1) {
                        index = 4
                    } else {
                        index = tmp == 0 ? 2 : 0
                    }
                }
            }
            break
        case 7:
            index = checkline(-1)
            if (index == -1) {
                index = checkline(1)
            }
            if (index == -1) {
                index = game.indexOf(0)
            }
            break
        case 8:
            index = game.indexOf(0)
            break
    }

    return index
}

// Function to check and display the game result after each move
function showResult() {
    let tmp
    for (const line of lines) {
        tmp = 0
        for (let l = 0; l < 3; l++) {
            tmp += game[line[l]]
        }
        if (tmp == 3 || tmp == -3) {
            document.getElementById('hint').innerHTML = tmp > 0 ? '&times; win!' : `<span style="margin-top: -5px; margin-right: 18px;">o</span>` + ' win!'
            finished = true
            break
        }
    }

    if (rounds == 9 && finished != true) {
        document.getElementById('hint').innerHTML = 'Draw!'
    }
}

// Function to check if a winning move is possible in the current game state
function checkline(s) {
    let index = -1
    for (const line of lines) {
        tmp = 0
        for (const l of line) {
            tmp += game[l]
        }
        if (tmp == 2 * s) {
            do {
                index = game.indexOf(0, index + 1)
            } while (!line.includes(index))

            return index
        }
    }

    return index
}
