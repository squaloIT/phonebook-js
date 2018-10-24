window.onload = function() {
  document.querySelector("#btnSave").addEventListener("click", provera );
}

function provera() {
  var imeElement = document.querySelector("#tbFirstName");
  const regExpIme = /^[A-Z][a-z]{2,15}$/;

  if(!regExpIme.test(imeElement.value)){
    imeElement.classList.add("");
  }

  var prezimeElement = document.querySelector("#tbLastName");
  //! TODO ZAVRSITI VALIDACIJU
}