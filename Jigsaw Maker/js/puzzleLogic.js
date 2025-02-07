export function splitImage(image, difficulty, callback) {
  const imgWidth = image.naturalWidth;
  const imgHeight = image.naturalHeight;

  const canvasSize = 600;

  //Attempting to scale image to size of canvas (Not working yet)
  const scale = Math.min(canvasSize / imgWidth, canvasSize / imgHeight);
  const scaledWidth = imgWidth * scale;
  const scaledHeight = imgHeight * scale;

  //Piece size depends on difficulty
  const piecesPerRow = difficulty === 1 ? 4 : difficulty === 2 ? 6 : 8;
  const pieceWidth = Math.floor(scaledWidth / piecesPerRow);
  const pieceHeight = Math.floor(scaledHeight / piecesPerRow);

  const canvasArray = [];

  //Splitting image into pieces
  for (let r = 0; r < piecesPerRow; r++) {
    for (let c = 0; c < piecesPerRow; c++) {
      const canvas = document.createElement("canvas");
      canvas.width = pieceWidth;
      canvas.height = pieceHeight;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        c * (pieceWidth / scale),
        r * (pieceHeight / scale),
        pieceWidth / scale,
        pieceHeight / scale,
        0,
        0,
        pieceWidth,
        pieceHeight
      );

      canvasArray.push(canvas.toDataURL());
    }
  }

  callback(canvasArray);
}
