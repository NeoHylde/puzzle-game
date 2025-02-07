export function splitImage(image, difficulty, callback) {
  const imgWidth = image.naturalWidth;
  const imgHeight = image.naturalHeight;

  //Piece size depends on difficulty
  const piecesPerRow = difficulty === 1 ? 4 : difficulty === 2 ? 6 : 8;
  const pieceWidth = Math.floor(imgWidth / piecesPerRow);
  const pieceHeight = Math.floor(imgHeight / piecesPerRow);

  //Array for different pieces
  const canvasArray = [];

  //Nested array for going through each piece
  for (let r = 0; r < piecesPerRow; r++) {
    for (let c = 0; c < piecesPerRow; c++) {
      //Creates an empty canvas of size pieceWidth x pieceHeight
      const canvas = document.createElement("canvas");
      canvas.width = pieceWidth;
      canvas.height = pieceHeight;
      const ctx = canvas.getContext("2d");

      //Takes "subImage" information from img, and pastes on the empty canvas
      //Basically creating a mini img from the original img
      ctx.drawImage(
        image,
        c * pieceWidth,
        r * pieceHeight,
        pieceWidth,
        pieceHeight,
        0,
        0,
        pieceWidth,
        pieceHeight
      );
      //Pushes the newly made canvas on to the canvas array
      canvasArray.push(canvas.toDataURL());
    }
  }

  callback(canvasArray);
}
