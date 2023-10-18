const imageUpload = document.getElementById('imageUpload');
const uploadedImage = document.getElementById('uploadedImage');
const overlayImageUpload = document.getElementById('overlayImageUpload');
const removeButton = document.getElementById('removeButton');

let originalImage = null;
let overlayImage = null;

imageUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      originalImage = new Image();
      originalImage.src = e.target.result;
      originalImage.onload = function () {
        uploadedImage.src = originalImage.src;
        removeButton.disabled = false;
      };
    };

    reader.readAsDataURL(file);
  }
});

overlayImageUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      overlayImage = new Image();
      overlayImage.src = e.target.result;
      overlayImage.onload = function () {
        updateImageWithOverlay();
      };
    };

    reader.readAsDataURL(file);
  }
});

function updateImageWithOverlay() {
  const canvas = document.createElement('canvas');
  canvas.width = originalImage.width;
  canvas.height = originalImage.height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(originalImage, 0, 0);

  const x = 10;
  const y = canvas.height - overlayImage.height - 10;
  ctx.drawImage(overlayImage, x, y);

  uploadedImage.src = canvas.toDataURL();
}

function removeImage() {
  uploadedImage.src = '';
  originalImage = null;
  overlayImage = null;
  overlayImageUpload.value = '';
  imageUpload.value = '';
  removeButton.disabled = true;
}

function updateImageWithOverlay() {
    const canvas = document.createElement('canvas');
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;
  
    const ctx = canvas.getContext('2d');
    ctx.drawImage(originalImage, 0, 0);
  
  
    const x = 10;
    const y = canvas.height - overlayImage.height - 10;
    ctx.drawImage(overlayImage, x, y);
  
    uploadedImage.src = canvas.toDataURL();
  
    const downloadButton = document.getElementById('downloadButton');
    downloadButton.disabled = false;
  }
  
  function downloadImage() {
    const link = document.createElement('a');
    link.href = uploadedImage.src;
    link.download = 'image_with_overlay.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


function downloadWatermark() {
    const watermarkImage = new Image();
    watermarkImage.src = 'vtdtWatermark.png';
  
    const link = document.createElement('a');
    link.href = watermarkImage.src;
    link.download = 'watermark.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  