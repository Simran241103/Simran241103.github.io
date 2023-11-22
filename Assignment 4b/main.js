const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

const imagesfilename = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

const alttext = {
  'pic1.jpg': 'Closeup of a human eye',
  'pic2.jpg': 'Rock that looks like a wave',
  'pic3.jpg': 'Purple and white pansies',
  'pic4.jpg': "Section of wall from a pharaoh's tomb",
  'pic5.jpg': 'Large moth on a leaf'
};

function createImageElement(imageSrc, altText) {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `images/${imageSrc}`);
  newImage.setAttribute('alt', altText);

  newImage.addEventListener('click', e => {
    displayedImage.src = e.target.src;
    displayedImage.alt = e.target.alt;
  });

  return newImage;
}

function changeOverlay() {
  const btnClass = btn.getAttribute('class');
  if (btnClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
}

for (const image of imagesfilename) {
  const alt = alttext[image];
  const newImage = createImageElement(image, alt);
  thumbBar.appendChild(newImage);
}

btn.addEventListener('click', changeOverlay);
