function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "c-app__nav") {
    x.className += " responsive";
  } else {
    x.className = "c-app__nav";
  }
}

var mybutton = document.getElementById("myBtn");

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

document.addEventListener("DOMContentLoaded", () => {
  let overlay = document.getElementsByClassName("c-app")[0];
  let loading = document.getElementsByClassName("preloader")[0];

  setTimeout(() => {
    loading.remove();
    overlay.classList.add("loaded");
  }, 1800);
});
