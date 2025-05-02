const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const keepRatio = document.getElementById('keepRatio');
const download = document.getElementById('download');

let originalImage = new Image();
let imgDataURL = "";

// 画像アップロード時の処理
upload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    imgDataURL = event.target.result;
    originalImage = new Image();
    originalImage.onload = () => {
      updateCanvas();
    };
    originalImage.src = imgDataURL;
  };
  reader.readAsDataURL(file);
});

// キャンバス更新処理
function updateCanvas() {
  let width = parseInt(widthInput.value);
  let height = parseInt(heightInput.value);

  if (keepRatio.checked) {
    const ratio = originalImage.width / originalImage.height;
    height = Math.round(width / ratio);
    heightInput.value = height;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(originalImage, 0, 0, width, height);
}

// 幅変更時のリアルタイム比率更新
widthInput.addEventListener('input', () => {
  if (keepRatio.checked && originalImage.complete && originalImage.src) {
    const ratio = originalImage.width / originalImage.height;
    const newHeight = Math.round(widthInput.value / ratio);
    heightInput.value = newHeight;
  }
  if (originalImage.src) updateCanvas();
});

heightInput.addEventListener('input', () => {
  if (originalImage.src) updateCanvas();
});

// ダウンロードボタン
download.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'resized-image.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
