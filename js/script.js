window.onload = function() {
  document.querySelector("#btnSave").addEventListener("click", provera );
}

function provera() {
  let imeFuncResult = firstNameRegExpCheck();
  if(!imeFuncResult){
    return;
  }
  let prezimeFuncResult = lastNameRegExpCheck();
  if(!prezimeFuncResult){
    return;
  }
  let emailFuncResult = emailRegExpCheck();
  if(!emailFuncResult){
    return;
  }
  let telFuncResult = telRegExpCheck();
  if(!telFuncResult) {
    return;
  }
  // GET - samo za dohvatanje podataka
  // POST - Ubacivanje podataka ili Neko njihovo menjanje
  // PUT - Ubacivanje podataka ili Neko njihovo menjanje
  // DELETE - Za prosledivanje nekog podatka i brisanje.

  let noviKorisnik = {
    firstName: imeFuncResult,
    lastName: prezimeFuncResult,
    email: emailFuncResult,
    phoneNumber: telFuncResult
  };

  $.ajax('storage/contacts.json',{
    type:'POST',
    data: noviKorisnik,
    success: function(podaci, textStatus, jqXHR){
      // console.log(podaci);
      if(jqXHR.status==200){
        alert("USPESNO UPISANI PODACI");
      }
    }, 
    error: function(jqXHR, textStatus, err){ // jqXHR jqXHR, String textStatus, String errorThrown 
      console.error(jqXHR.status); // 200, 404, 500
      console.error(textStatus);
      console.error(err);
    }
  });
}
function firstNameRegExpCheck() {
  let imeElement = document.querySelector("#tbFirstName");
  const regExpIme = /^(\s?[A-Z][a-z]{2,15})+$/;
  let imeParentNodeFormGroup = imeElement.parentNode;
  let imeNextSiblingGlyphicon = imeElement.nextElementSibling;

  if(!regExpIme.test(imeElement.value)){
    imeParentNodeFormGroup.classList.add("has-error");
    imeParentNodeFormGroup.classList.add("has-feedback");
    imeNextSiblingGlyphicon.classList.remove("nevidljiv");
    imeNextSiblingGlyphicon.nextElementSibling.classList.remove("nevidljiv");
    return false;
  } else {
    imeParentNodeFormGroup.classList.remove("has-error");
    imeParentNodeFormGroup.classList.remove("has-feedback");
    imeParentNodeFormGroup.classList.add("has-success");
    imeNextSiblingGlyphicon.classList.add("nevidljiv");
    imeNextSiblingGlyphicon.nextElementSibling.classList.add("nevidljiv");
    return imeElement.value;
  }
}
function lastNameRegExpCheck(){
  let prezimeElement = document.querySelector("#tbLastName");
  const regExpPrezime = /^(\s?[A-Z][a-z]{2,20})+$/;
  let prezimeParentNodeFormGroup = prezimeElement.parentNode;
  let prezimeNextSiblingGlyphicon =  prezimeElement.nextElementSibling;
  let prezimeSpanBlock = prezimeNextSiblingGlyphicon.nextElementSibling;

  if(!regExpPrezime.test(prezimeElement.value)){
    prezimeParentNodeFormGroup.classList.add("has-error");
    prezimeParentNodeFormGroup.classList.add("has-feedback");
    prezimeNextSiblingGlyphicon.classList.remove("nevidljiv");
    prezimeSpanBlock.classList.remove("nevidljiv");
    return false;
  } else {
    prezimeParentNodeFormGroup.classList.remove("has-error"); // has-success
    prezimeParentNodeFormGroup.classList.remove("has-feedback");
    prezimeParentNodeFormGroup.classList.add("has-success");
    prezimeNextSiblingGlyphicon.classList.add("nevidljiv");
    prezimeSpanBlock.classList.add("nevidljiv");
    return prezimeElement.value;
  }
}
function telRegExpCheck(){
  let telElement = document.querySelector("#tbTel");
  const regExpTel = /^(\+\d{12,17})$/;
  let telGlyphicon = telElement.nextElementSibling;
  let telSpanBlock = telGlyphicon.nextElementSibling;
  let telFormGroupElement = telElement.parentNode;

  if(!regExpTel.test(telElement.value)){
    telFormGroupElement.classList.add("has-error");
    telFormGroupElement.classList.add("has-feedback");
    telGlyphicon.classList.remove("nevidljiv");
    telSpanBlock.classList.remove("nevidljiv");
    return false;
  } else {
    telFormGroupElement.classList.remove("has-error");
    telFormGroupElement.classList.remove("has-feedback");
    telFormGroupElement.classList.add("has-success"); 
    telSpanBlock.classList.add("nevidljiv");
    telSpanBlock.classList.add("nevidljiv");
    return telElement.value;
  }
}

function emailRegExpCheck() {
  let emailElement = document.querySelector("#tbEmail");
  const regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let emailFormGroupElement = emailElement.parentNode;
  let emailGlyphicon = emailElement.nextElementSibling;
  let emailSpanBlock = emailElement.nextElementSibling.nextElementSibling;

  if(!regExpEmail.test(emailElement.value)){
    emailFormGroupElement.classList.add("has-error");
    emailFormGroupElement.classList.add("has-feedback");
    emailGlyphicon.classList.remove("nevidljiv");
    emailSpanBlock.classList.remove("nevidljiv");
    return false;
  } else {
    emailFormGroupElement.classList.remove("has-error"); // has-success
    emailFormGroupElement.classList.remove("has-feedback");
    emailFormGroupElement.classList.add("has-success");
    emailGlyphicon.classList.add("nevidljiv");
    emailSpanBlock.classList.add("nevidljiv");
    return emailElement.value;
  }
}
