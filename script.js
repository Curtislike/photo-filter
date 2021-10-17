

const canvas = document.getElementById('canvas');
const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
const times = ['day', 'evening', 'morning', 'night'];
let date = new Date();
let hours = date.getHours();
let counter = -1;


const fileInput = document.querySelector('input[type="file"]');
// const imageContainer = document.querySelector('.image-container');
/*-------------------LOAD PICTURE----------------------------*/
fileInput.addEventListener('change', function(e) {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    img.onload = function(){
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    }
  }
  reader.readAsDataURL(file);
});


 /*-------------------PICTURE-------------------*/

function drawImage (event, isDefaultPicture) {
    const image = document.createElement('img');
    image.setAttribute('crossOrigin', 'anonymous');
    let time;
if (hours >= 6 && hours <= 11) {
  time = 2;
} else if (hours >= 12 && hours <= 17) {
  time = 0;
} else if (hours >= 18 && hours <= 23) {
  time = 1;
} else if (hours >= 0 && hours <= 5) {
  time = 3;
}
    let src = `${base}/${times[time]}/${images[counter]}`;
    if(isDefaultPicture) {
      src = "assets/img/img.jpg";
    }
    image.src = src;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);
    };  
    if (counter < images.length-1) {
      counter++;
    } else {
      counter = 0;
    }
  }

 drawImage(null, true);


 /*-------------------NEXT PICTURE-------------------*/
 let next = document.querySelector(".btn-next");
 next.addEventListener('click', drawImage);
 /*---------------------FILTER-------------------*/
 
 const inputs = document.querySelectorAll('.filters input');
 const outputs = document.querySelectorAll('.filters output');

 function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
  this.nextElementSibling.innerHTML = this.value;
}

inputs.forEach(input => input.addEventListener('input', handleUpdate));





/*------------------------RESET---------------------------*/

function removeFilters() {
  document.documentElement.removeAttribute("style");
  for(let input of inputs) {
    input.value = input.defaultValue;
  }
  for(let output of outputs) {
    output.innerHTML = output.previousElementSibling.defaultValue;
  }
}

let reset = document.querySelector(".btn-reset");
reset.addEventListener('click', removeFilters);





/*---------------------FULLSCREEN------------------*/

let screen = document.querySelector('body');
let screenBtn = document.querySelector('.fullscreen');


function openFullScreen() {
    if(screen.requestFullscreen) {
        screen.requestFullscreen();
    } else if(screen.webkitRequestFullscreen) {
        screen.webkitRequestFullscreen();
      }
}
function closeFullScreen() {
    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
}

screenBtn.addEventListener('click', openFullScreen);
screenBtn.addEventListener('click', closeFullScreen);



/*-----------------------DOWNLOAD-------------------*/

let download = document.querySelector('.btn-save');

function saveImage(e) {
  console.log(canvas.toDataURL());
  var link = document.createElement('a');
  link.download = 'download.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
}

download.addEventListener('click', saveImage);
