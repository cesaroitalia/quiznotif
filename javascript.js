(function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} Risposte corrette su ${myQuestions.length}`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "In quale momento avviene il perfezionamento della notifica per la Pubblica Amministrazione?",
        answers: {
          a: "Quando l'AAR viene letta dal destinatario",
          b: "Quando il Portale delle Notifiche genera l'AAR e il suo IUN",
          c: "Quando il contribuente apre il pdf dell'Atto sul Portale delle Notifiche"
        },
        correctAnswer: "b"
      },
      {
        question: "In che modo viene inviato l'Avviso di Cortesia al destinatario?",
        answers: {
          a: "Viene inviato in modo analogico tramite AR o AG",
          b: "Viene inviato alla PEC (Domicilio Digitale) comunicato dal contribuente",
          c: "Viene inviato tramite sms, mail non PEC o App IO, nel caso il contribuente abbia dato il consenso"
        },
        correctAnswer: "c"
      },
      {
        question: "Dopo quanti giorni dall'Avviso di Mancato Recapito (AMR) si perfeziona la notifica per il destinatario?",
        answers: {
          a: "Il quindicesimo giorno dalla data di deposito dell'Avviso di Mancato Recapito",
          b: "Il settimo giorno dalla data di deposito dell'Avviso di Mancato Recapito",
          c: "Il decimo giorno dalla data di deposito dell'Avviso di Mancato Recapito"
        },
        correctAnswer: "a"
      },
      {
        question: "Il link di accesso rapido presente nell'AAR, quante volte puo' essere riutilizzato?",
        answers: {
          a: "Il link di accesso rapido presente nell'AAR, e' riutilizzabile infinite volte",
          b: "Il link di accesso rapido presente nell'AAR, e' riutilizzabile per tre volte",
          c: "Il link di accesso rapido presente nell'AAR, e' riutilizzabile per cinque volte"
        },
        correctAnswer: "b"
      },
      {
        question: "Quale modello di pagamento puo' essere caricato con l'atto dalla Pubblica Amministrazione?",
        answers: {
          a: "Unicamente il modello 3 di PagoPA",
          b: "Possono essere caricati a scelta della Pubblica Amministrazione i modelli di pagamento: PagoPA, F24, 896",
          c: "Deve essere caricato il modello 3 di PagoPA e se la Pubblica Amministrazione vuole anche il modello F24"
        },
        correctAnswer: "c"
      },      {
        question: "Nel caso di invio analogico, cosa viene inviato al destinatario?",
        answers: {
          a: "Solo l'atto e il modello di pagamento caricati dalla Pubblica Amministrazione sul Portale delle Notifiche",
          b: "L'AAR (Avviso di Avvenuta Ricezione), in modo che il contribuente possa accedere sul Portale delle Notifiche per visualizzare l'atto",
          c: "Viene inviato un Avviso di Cortesia"
        },
        correctAnswer: "b"
      },
      {
        question: "L'Attestato opponibile a Terzi quando viene prodotto?",
        answers: {
          a: "Viene prodotto nei vari stati attraversati dalla notifica e possono essere scaricati dal Portale delle Notifiche",
          b: "Viene prodotto al momento del Perfezionamento della notifica per il destinatario",
          c: "Viene prodotto al momento del Perfezionamento della notifica per il mittente"
        },
        correctAnswer: "a"
      },
      {
        question: "L'AMR viene creato dopo quanti tentativi di invio digitale (PEC)?",
        answers: {
          a: "L'AMR viene creato dopo tre tentativi di invio digitale",
          b: "L'AMR viene creato dopo quattro tentativi di invio digitale",
          c: "Nessuna delle precedenti"
        },
        correctAnswer: "c"
      },
      {
        question: "Nel caso di Destinatari multipli (coobbligati) il PagoPA (dell'intero atto non ripartito) puo' essere pagato in che modo?",
        answers: {
          a: "Il pagamento del PagoPA verra' disabilitato non appena verra' effettuato il pagamento da un destinatario",
          b: "Il pagamento del PagoPA potra' essere pagato piu' volte da tutti i destinatari",
          c: "Il pagamento del PagoPA verra' disattivato dopo due giorni dal primo pagamento"
        },
        correctAnswer: "a"
      },
      {
        question: "In presenza di piu' domicili digitali, in quale ordine verrano utilizzati?",
        answers: {
          a: "1)Domicilio Digitale di Piattaforma, 2)Domicilio Digitale Speciale, 3) Domicilio Digitale Generale ",
          b: "1)Domicilio Digitale Speciale, 2)Domicilio Digitale di Piattaforma, 3) Domicilio Digitale Generale",
          c: "1)Domicilio Digitale Generale, 2)Domicilio Digitale Speciale, 3) Domicilio Digitale di Piattaforma",
        },
        correctAnswer: "a"
      }
    ];
  
    // Kick things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  