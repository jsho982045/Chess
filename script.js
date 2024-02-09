function updateDraggableSquares() {
    const squares = document.querySelectorAll('#chessboard .square');

    squares.forEach(square => {
        // Remove previous draggable attributes to reset the state
        square.removeAttribute('draggable');
        
        if (square.textContent.trim()) {
            // Set the square as draggable only if it contains a piece
            square.setAttribute('draggable', true);
        }
    });
}

function setupDragAndDrop() {
    const squares = document.querySelectorAll('#chessboard .square');

    squares.forEach(square => {
        square.addEventListener('dragstart', function (e) {
            if (e.target.getAttribute('draggable')) {
                e.dataTransfer.setData('text', e.target.id); // Store the id of the dragged square
            }
        });

        square.addEventListener('dragover', function (e) {
            e.preventDefault(); // Allow the drop
        });

        square.addEventListener('drop', function (e) {
            e.preventDefault();
            const droppedId = e.dataTransfer.getData('text'); // Retrieve the id of the dragged square
            const droppedElement = document.getElementById(droppedId); // Get the dragged square element

            // Only proceed if the drop target is empty and not the same as the dragged element
            if (!e.target.textContent.trim() && e.target !== droppedElement) {
                e.target.textContent = droppedElement.textContent; // Set the text of the target square to the dragged piece
                droppedElement.textContent = ''; // Clear the source square
                updateDraggableSquares(); // Update the draggable status of all squares
            }
        });
    });
}

function makeDraggable() {
    updateDraggableSquares();
    setupDragAndDrop();
}

// Call makeDraggable after the board is initialized
makeDraggable();
