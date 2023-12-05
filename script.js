"use strict";

// Funzione per ottenere gli indirizzi email e mostrarli
function getEmails() {
  const emailsContainer = document.getElementById("emailsContainer");
  const emailList = document.getElementById("emailList");

  // Uso un Set per memorizzare gli indirizzi unici per non generare loop
  const uniqueEmails = new Set();
  let attempts = 0;

  //   Numero massim di tentatici sempre per la questione dei loop
  const maxAttempts = 20;

  function genRandomMail() {
    axios
      .get("https://flynn.boolean.careers/exercises/api/random/mail")
      .then(function (response) {
        console.log("Risposta API:", response); // Aggiungiamo un log della risposta

        const email = response.data.response;
        if (email) {
          // Aggiunge l'email uniche al set sempre per evitare loop
          uniqueEmails.add(email);
        }

        if (uniqueEmails.size < 10 && attempts < maxAttempts) {
          attempts++;
          genRandomMail();
        } else {
          if (uniqueEmails.size >= 10) {
            const emails = Array.from(uniqueEmails);

            // Svuoto la lista di prima se c'è
            emailList.innerHTML = "";

            // Aggiungo ogni email alla lista
            emails.forEach(function (email) {
              const listItem = document.createElement("li");
              listItem.textContent = email;
              emailList.appendChild(listItem);
            });

            // Mostro la lista quando sono state generate tutte le email
            emailsContainer.style.display = "block";
          } else {
            // Stampo in console l'errore per le mail
            console.log(
              "Impossibile ottenere 10 email uniche dopo",
              maxAttempts,
              "tentativi."
            );
          }
        }
      });
  }

  // Chiamo la funzione per la mail unica
  genRandomMail();
}

// Chiamata iniziale per generare le email
getEmails();
