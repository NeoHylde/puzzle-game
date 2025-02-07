import { setupImageUpload } from "./imageUpload.js";
import { splitImage } from "./puzzleLogic.js";
import { enableDragAndDrop } from "./dragDrop.js";
//Make sure HTML is fully loaded and parsed
document.addEventListener("DOMContentLoaded", function () {
  //
  setupImageUpload();

  const uploadedImage = document.getElementById("uploadedImage");
  const slider = document.getElementById("myRange");
  const label = document.getElementById("difficultyLabel");
  const goButton = document.getElementById("game-starter");
  const gameArea = document.getElementById("game-area");

  let difficulty = 2;

  function updateLabel(value) {
    difficulty = parseInt(value);
    label.textContent = value == 1 ? "Easy" : value == 2 ? "Medium" : "Hard";
  }

  updateLabel(slider.value);

  slider.addEventListener("input", function () {
    updateLabel(this.value);
    if (uploadedImage.src && uploadedImage.src !== "") {
      goButton.hidden = false;
    }
  });

  goButton.addEventListener("click", function () {
    splitImage(uploadedImage, difficulty, (images) => {
      gameArea.innerHTML = "";
      images.forEach((src, index) => {
        let imgElement = document.createElement("img");
        imgElement.src = src;
        imgElement.style.width = "50px";
        imgElement.style.height = "50px";
        imgElement.style.position = "absolute";
        imgElement.style.cursor = "grab";
        imgElement.draggable = true;
        imgElement.style.left = `${Math.random() * 500}px`;
        imgElement.style.top = `${Math.random() * 500}px`;
        imgElement.id = `piece-${index}`;
        gameArea.appendChild(imgElement);
      });
      enableDragAndDrop();
    });
  });
});
