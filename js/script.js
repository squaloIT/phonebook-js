window.onload = function() {
  document.querySelector("#btnSave").addEventListener("click", provera );
  document.querySelector("#contacts-op-discard").addEventListener("click", resetForm );

  $.ajax('https://mfp-phonebook-js.firebaseio.com/contacts.json', {
    type:'GET', // MORA PRILIKOM DOHVATANJA
    dataType:'json', // MORA PRILIKOM DOHVATANJA
    success: function(contacts, textStatus, jqXHR) {
      if(jqXHR.status === 200) {
        console.log(contacts); // Ovde dolaze svi podaci sa servera
        let tabelaZaIspis = document.querySelector("#contacts-table");

        for(let _idContact in contacts){
          console.log(contacts[_idContact].email);
          console.log(contacts[_idContact].firstName);
          console.log(contacts[_idContact].lastName);
          console.log(contacts[_idContact].phoneNumber);
          tabelaZaIspis.innerHTML += `
          <tr>
            <td>${contacts[_idContact].firstName}</td>
            <td>${contacts[_idContact].lastName}</td>
            <td>${contacts[_idContact].email}</td>
            <td>${contacts[_idContact].phoneNumber}</td>
            <td><button onclick="onUpdateContact(${_idContact}, this)" class="btn btn-primary">Update</button></td>
            <td><button onclick="onDeleteContact(${_idContact}, this)" class="btn btn-danger">Delete</button></td>
          </tr>`;
        }
        
      }
    }, 
    error: function(jqXHR, textStatus, status) {
      console.error(jqXHR.status); // 200, 404, 500
      console.error(textStatus);
      console.error(err);
    }
  });
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

  const jsonNoviKorisnik = JSON.stringify(noviKorisnik);

  $.ajax('https://mfp-phonebook-js.firebaseio.com/contacts.json', {
    type:'POST',
    data: jsonNoviKorisnik,
    success: function(podaci, textStatus, jqXHR){
      if(jqXHR.status==200){
        document.querySelector("#ispis-rezultata").textContent = "Uspesno unet kontakt.";
        resetForm();
      }
    }, 
    error: function(jqXHR, textStatus, err){ // jqXHR jqXHR, String textStatus, String errorThrown 
      console.error(jqXHR.status); // 200, 404, 500
      console.error(textStatus);
      console.error(err);
    }
  });
}
function onUpdateContact(button, _id) {
  console.log(button);
  console.log(_id);
  // ! TODO SREDITI DA OVO FUNKCIONISE
}
function onDeleteContact(button, _id) {
  console.log(button);
  console.log(_id);
  // ! TODO SREDITI DA OVO FUNKCIONISE
}
function resetForm() {
  document.querySelector("#tbFirstName").value="";
  document.querySelector("#tbLastName").value="";
  document.querySelector("#tbEmail").value="";
  document.querySelector("#tbTel").value="";
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
