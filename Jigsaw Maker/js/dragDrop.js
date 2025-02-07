export function enableDragAndDrop() {
  //Game area HTML
  const gameArea = document.getElementById("game-area");
  const pieces = document.querySelectorAll("#game-area img");

  //M1 being pressed on a piece event listener
  pieces.forEach((piece) => {
    piece.addEventListener("mousedown", dragStart);
  });

  //Variables for piece being dragged
  let activePiece = null;
  let offsetX, offsetY;

  function dragStart(event) {
    //Prevents default image dragging
    event.preventDefault();
    activePiece = event.target;
    //For smooth drag when holding M1 down
    offsetX = event.clientX - activePiece.getBoundingClientRect().left;
    offsetY = event.clientY - activePiece.getBoundingClientRect().top;

    //Calling events for piece being dragged and dropped
    document.addEventListener("mousemove", dragMove);
    document.addEventListener("mouseup", dragEnd);
  }

  //Function for piece being dragged
  function dragMove(event) {
    //Tracks if piece is still being dragged
    if (!activePiece) return;

    const gameAreaRect = gameArea.getBoundingClientRect();
    const pieceWidth = activePiece.offsetWidth;
    const pieceHeight = activePiece.offsetHeight;

    //New coordinates for piece
    let newX = event.clientX - gameAreaRect.left - offsetX;
    let newY = event.clientY - gameAreaRect.top - offsetY;

    // Boundary Constraints
    newX = Math.max(0, Math.min(gameAreaRect.width - pieceWidth, newX));
    newY = Math.max(0, Math.min(gameAreaRect.height - pieceHeight, newY));

    // Collision Detection for other pieces
    if (!isOverlapping(newX, newY, activePiece, gameArea)) {
      activePiece.style.left = `${newX}px`;
      activePiece.style.top = `${newY}px`;
    }
  }

  //Function for when piece isnt being dragged
  function dragEnd() {
    document.removeEventListener("mousemove", dragMove);
    document.removeEventListener("mouseup", dragEnd);
    activePiece = null;
  }

  function isOverlapping(newX, newY, currentPiece, gameArea) {
    const gameAreaRect = gameArea.getBoundingClientRect();
    const pieces = document.querySelectorAll("#game-area img");

    for (let piece of pieces) {
      if (piece === currentPiece) continue; // Skip checking against itself

      const rect1 = piece.getBoundingClientRect();
      const rect2 = {
        left: newX + gameAreaRect.left,
        top: newY + gameAreaRect.top,
        right: newX + gameAreaRect.left + currentPiece.offsetWidth,
        bottom: newY + gameAreaRect.top + currentPiece.offsetHeight,
      };

      if (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
      ) {
        return true; // Overlapping detected
      }
    }
    return false;
  }
}
