(function () {
  var width = 320;
  var height = 0;

  var streaming = false;

  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;

  function startup() {
    video = document.getElementById("video");
    canvas = document.getElementById("canvas");
    photo = document.getElementById("photo");
    startbutton = document.getElementById("startbutton");

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function (stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function (err) {
        console.log("An error occurred: " + err);
      });

    video.addEventListener(
      "canplay",
      function (ev) {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);

          if (isNaN(height)) {
            height = width / (4 / 3);
          }

          video.setAttribute("width", width);
          video.setAttribute("height", height);
          canvas.setAttribute("width", width);
          canvas.setAttribute("height", height);
          streaming = true;
        }
      },
      false
    );

    startbutton.addEventListener(
      "click",
      function (ev) {
        takepicture();
        ev.preventDefault();
      },
      false
    );

    clearphoto();
  }

  function clearphoto() {
    var context = canvas.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  }

  function takepicture() {
    var context = canvas.getContext("2d");
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data);
    } else {
      clearphoto();
    }
  }

  window.addEventListener("load", startup, false);
})();

document
  .getElementById("btn-brightness+")
  .addEventListener("click", increaseBrightness);
document
  .getElementById("btn-brightness-")
  .addEventListener("click", decreaseBrightness);
document
  .getElementById("btn-contrast+")
  .addEventListener("click", increaseContrast);
document
  .getElementById("btn-contrast-")
  .addEventListener("click", decreaseContrast);
document
  .getElementById("btn-saturation+")
  .addEventListener("click", increaseSaturation);
document
  .getElementById("btn-saturation-")
  .addEventListener("click", decreaseSaturation);
document.getElementById("btn-gamma+").addEventListener("click", increaseGamma);
document.getElementById("btn-gamma-").addEventListener("click", decreaseGamma);
document.getElementById("btn-sepia+").addEventListener("click", increaseSepia);
document.getElementById("btn-sepia-").addEventListener("click", decreaseSepia);

function increaseBrightness() {
  Caman("#canvas", function () {
    this.brightness(5).render();
  });
}

function decreaseBrightness() {
  Caman("#canvas", function () {
    this.brightness(-10);
    this.render();
  });
}

function increaseContrast() {
  Caman("#canvas", function () {
    this.contrast(10);
    this.render();
  });
}

function decreaseContrast() {
  Caman("#canvas", function () {
    this.contrast(-10);
    this.render();
  });
}

function increaseSaturation() {
  Caman("#canvas", function () {
    this.saturation(10);
    this.render();
  });
}

function decreaseSaturation() {
  Caman("#canvas", function () {
    this.saturation(-10);
    this.render();
  });
}

function increaseGamma() {
  Caman("#canvas", function () {
    this.gamma(10);
    this.render();
  });
}

function decreaseGamma() {
  Caman("#canvas", function () {
    this.gamma(-1);
    this.render();
  });
}

function increaseSepia() {
  Caman("#canvas", function () {
    this.sepia(10);
    this.render();
  });
}

function decreaseSepia() {
  Caman("#canvas", function () {
    this.sepia(-10);
    this.render();
  });
}

/*if (document.querySelector('canvas') !== null) {
  document.querySelector('#photo').removeAttribute('data-caman-id');
  const switch_img = imgUrl
  renderCanvas('#photo', switch_img);
}*/

function registrateServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("../sw.js")
      .then((registration) => console.log("Registered service worker"))
      .catch((error) => console.log("Error with register service worker"));
  }
}

registrateServiceWorker();
