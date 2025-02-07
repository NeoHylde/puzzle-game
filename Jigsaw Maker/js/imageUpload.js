//Handles image input and display for user
export function setupImageUpload() {
  const imageUplaod = document.getElementById("imageUplaod");
  const uploadedImage = document.getElementById("uploadedImage");
  const goButton = document.getElementById("game-starter");

  //Handles errors
  if (!imageUpload || !uploadedImage || !goButton) {
    console.error("Missing required elements for image upload.");
    return;
  }

  //Event listener for user input
  imageUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    //reads image
    const reader = new FileReader();
    reader.onload = () => {
      uploadedImage.src = reader.result;
      uploadedImage.style.display = "block";

      uploadedImage.onload = () => {
        goButton.hidden = false;
      };
    };
    reader.readAsDataURL(file);
  });
}
