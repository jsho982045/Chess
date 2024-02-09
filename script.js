function makeDraggable() {
    const squares = document.querySelectorAll('#chessboard .square');

    squares.forEach(square => {
        if (square.textContent) { // Only make squares with pieces inside draggable
            square.setAttribute('draggable', true);

            square.addEventListener('dragstart', function (e) {
                e.dataTransfer.setData('text/plain', e.target.textContent);
                e.dataTransfer.effectAllowed = 'move'; // Specify the drag effect as move
            });
        }
    });

    squares.forEach(square => {
        square.addEventListener('dragover', function (e) {
            e.preventDefault(); // Allow the drop
        });

        square.addEventListener('drop', function (e) {
            e.preventDefault();
            const data = e.dataTransfer.getData('text/plain');
            // Check if the square is empty before dropping a piece into it
            if (!e.target.textContent.trim()) {
                e.target.textContent = data; // Drop the piece into the empty square
                // Clear the textContent from the source square
                squares.forEach(srcSquare => {
                    if (srcSquare.textContent === data) {
                        srcSquare.textContent = '';
                    }
                });
            }
        });
    });
}

// Call makeDraggable after the board is initialized
makeDraggable();
