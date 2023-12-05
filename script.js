"use strict";

// Funzione per ottenere gli indirizzi email e mostrarli
function getEmails() {
  const emailsContainer = document.getElementById("emailsContainer");
  const emailList = document.getElementById("emailList");

  axios
    .get("https://flynn.boolean.careers/exercises/api/random/mail")
    .then(function (response) {
      console.log("Risp API:", response);

      const email = response.data.response;
      if (email) {
        // Ripete 10 volte l'indirizzo email
        const emails = Array.from({ length: 10 }, () => email);

        // Svuota la lista di prima se c'è
        emailList.innerHTML = "";

        // Aggiungo ogni email alla lista
        emails.forEach(function (email) {
          const listItem = document.createElement("li");
          listItem.textContent = email;
          emailList.appendChild(listItem);
        });
      } else {
        // Se non c'è un indirizzo email, richiamo getEmails() ancora
        getEmails();
      }
    });
}

// Chiamata iniziale per generare le email
getEmails();
