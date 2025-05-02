const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const keepRatio = document.getElementById('keepRatio');
const download = document.getElementById('download');

let originalImage = new Image();

upload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    originalImage.onload = () => {
      let width = parseInt(widthInput.value);
      let height = parseInt(heightInput.value);

      if (keepRatio.checked) {
        const ratio = originalImage.width / originalImage.height;
        height = Math.round(width / ratio);
        heightInput.value = height;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(originalImage, 0, 0, width, height);
    };
    originalImage.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

widthInput.addEventListener('input', () => {
  if (keepRatio.checked && originalImage.complete) {
    const ratio = originalImage.width / originalImage.height;
    const newHeight = Math.round(widthInput.value / ratio);
    heightInput.value = newHeight;
  }
});

download.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'resized-image.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});