import { setupImageUpload } from "./imageUpload.js";
import { splitImage } from "./puzzleLogic.js";
import { enableDragAndDrop } from "./dragDrop.js";
//Make sure HTML is fully loaded and parsed
document.addEventListener("DOMContentLoaded", function () {
  //Allows user to send in images
  setupImageUpload();

  //Different HTML elements
  const uploadedImage = document.getElementById("uploadedImage");
  const slider = document.getElementById("myRange");
  const label = document.getElementById("difficultyLabel");
  const goButton = document.getElementById("game-starter");
  const gameArea = document.getElementById("game-area");

  //Defining piecesPerRow
  let piecesPerRow = 6;

  //Difficulty label updater
  function updateLabel(value) {
    piecesPerRow = parseInt(value) === 1 ? 4 : parseInt(value) === 2 ? 6 : 8;
    label.textContent =
      parseInt(value) == 1 ? "Easy" : parseInt(value) == 2 ? "Medium" : "Hard";
  }

  updateLabel(slider.value);

  //Difficulty slider
  slider.addEventListener("input", function () {
    updateLabel(this.value);
    if (uploadedImage.src && uploadedImage.src !== "") {
      goButton.hidden = false;
    }
  });

  //Gamer starting button
  goButton.addEventListener("click", function () {
    //Calls split image which cuts up user input
    splitImage(uploadedImage, parseInt(slider.value), (images) => {
      //Clears game area for any images
      gameArea.innerHTML = "";
      //Loops through each "puzzle piece", creating an img and stylizing
      images.forEach((src, index) => {
        let imgElement = document.createElement("img");
        imgElement.src = src;
        imgElement.style.position = "absolute";
        imgElement.style.cursor = "grab";
        imgElement.draggable = true;
        imgElement.style.left = `${Math.random() * 500}px`;
        imgElement.style.top = `${Math.random() * 500}px`;
        imgElement.id = `piece-${index}`;
        gameArea.appendChild(imgElement);
      });
      //Calls function that allows pieces to function in a "puzzle solving" way
      enableDragAndDrop(piecesPerRow);
    });
  });
});
