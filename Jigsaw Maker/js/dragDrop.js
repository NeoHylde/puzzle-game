// dragDrop.js - Handles drag and drop functionality with solution grid
export function enableDragAndDrop(piecesPerRow) {
  const gameArea = document.getElementById("game-area");
  const gridSize = 600 / piecesPerRow; // Size of each grid cell
  console.log(`${piecesPerRow}`); //Debug purposes

  // Creates a solution grid so it is easier for the user
  //to see where to place pieces
  for (let r = 0; r < piecesPerRow; r++) {
    for (let c = 0; c < piecesPerRow; c++) {
      const gridCell = document.createElement("div");
      gridCell.style.position = "absolute";
      gridCell.style.width = `${gridSize}px`;
      gridCell.style.height = `${gridSize}px`;
      gridCell.style.left = `${c * gridSize}px`;
      gridCell.style.top = `${r * gridSize}px`;
      gridCell.style.border = "1px solid rgba(0, 0, 0, 0.3)";
      gridCell.style.boxSizing = "border-box";
      gridCell.style.pointerEvents = "none"; // Prevent grid from blocking mouse events
      gameArea.appendChild(gridCell);
    }
  }

  // Create a solution grid (2D array)
  const solutionGrid = Array.from({ length: piecesPerRow }, () =>
    Array(piecesPerRow).fill(null)
  );
  const correctPositions = {}; // Store correct piece locations for checking solution later

  //For tracking current item being dragged
  let activePiece = null;
  let offsetX, offsetY;

  // Assign each piece a correct grid position in solution grid
  //Make sure each piece is correctly scaled
  document.querySelectorAll("#game-area img").forEach((piece, index) => {
    piece.style.width = `${gridSize}px`; // Ensure piece fits within grid cell
    piece.style.height = `${gridSize}px`;
    const row = Math.floor(index / piecesPerRow);
    const col = index % piecesPerRow;
    correctPositions[piece.id] = { row, col };
  });

  //Drag functions
  function dragStart(event) {
    event.preventDefault();
    activePiece = event.target;
    offsetX = event.clientX - activePiece.getBoundingClientRect().left;
    offsetY = event.clientY - activePiece.getBoundingClientRect().top;
    document.addEventListener("mousemove", dragMove);
    document.addEventListener("mouseup", dragEnd);
  }

  function dragMove(event) {
    if (!activePiece) return;

    const gameAreaRect = gameArea.getBoundingClientRect();
    let newX = event.clientX - gameAreaRect.left - offsetX;
    let newY = event.clientY - gameAreaRect.top - offsetY;

    //Keeps the piece within the game area limits
    newX = Math.max(0, Math.min(gameAreaRect.width - gridSize, newX));
    newY = Math.max(0, Math.min(gameAreaRect.height - gridSize, newY));

    activePiece.style.left = `${newX}px`;
    activePiece.style.top = `${newY}px`;
  }

  function dragEnd() {
    if (!activePiece) return;
    document.removeEventListener("mousemove", dragMove);
    document.removeEventListener("mouseup", dragEnd);

    const gameAreaRect = gameArea.getBoundingClientRect();
    let newX = activePiece.getBoundingClientRect().left - gameAreaRect.left;
    let newY = activePiece.getBoundingClientRect().top - gameAreaRect.top;

    //Snaps piece to nearest grid
    const gridX = Math.round(newX / gridSize);
    const gridY = Math.round(newY / gridSize);

    //Ensure old position is cleared
    for (let row = 0; row < piecesPerRow; row++) {
      for (let col = 0; col < piecesPerRow; col++) {
        if (solutionGrid[row][col] === activePiece.id) {
          solutionGrid[row][col] = null;
        }
      }
    }

    //Check if space is occupied
    if (solutionGrid[gridY][gridX] === null) {
      solutionGrid[gridY][gridX] = activePiece.id;
      activePiece.style.left = `${gridX * gridSize}px`;
      activePiece.style.top = `${gridY * gridSize}px`;
    }

    activePiece = null;
    checkSolution();
  }

  //Check solution function
  function checkSolution() {
    //checks current occupier vs correct occupier by piece id.
    for (let row = 0; row < piecesPerRow; row++) {
      for (let col = 0; col < piecesPerRow; col++) {
        const pieceId = solutionGrid[row][col];
        if (
          !pieceId ||
          correctPositions[pieceId].row !== row ||
          correctPositions[pieceId].col !== col
        ) {
          console.log("Not solved yet");
          return; // Not solved yet
        }
      }
    }
    alert("Puzzle Solved!");
  }

  //Begins the drag functions
  document.querySelectorAll("#game-area img").forEach((piece) => {
    piece.addEventListener("mousedown", dragStart);
  });
}
