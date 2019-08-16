'use strict';

const STORE = [
  {question: 'Where was Disneyland originally planned to be built?',
  answers: ['Burbank', 'Hollywood', 'Buena Park', 'Valencia'],
  correctAnswer: 'Burbank',
  funFact: 'Disneyland was originally planned to be built across the street from Disney Studios in Burbank.'},

  {question: 'Which ride is not one of the attractions from opening day?',
  answers: ['Jungle Cruise', 'Dumbo the Flying Elephant', 'Peter Pan\'s Flight', 'Autopia'],
  correctAnswer: 'Dumbo the Flying Elephant',
  funFact: 'Dumbo the Flying Elephant opened 14 days later on July 31, 1955.'},

  {question: 'What is the fastest ride at Disneyland?',
  answers: ['Splash Mountain', 'Space Mountain', 'Big Thunder Mountain Railroad', 'Matterhorn Bobsleds'],
  correctAnswer: 'Splash Mountain',
  funFact: 'It may only be five seconds but Splash Mountain reaches up to 40mph on the last big drop!'},

  {question: 'Where is there a hidden basketball court?',
  answers: ['Tom Sawyer\'s Island', 'Pirates of the Caribbean', 'Matterhorn Bobsleds', 'The Haunted Mansion'],
  correctAnswer: 'Matterhorn Bobsleds',
  funFact: 'Used as a rest and preparation area for costumed climbers, the small “court” is complete with a hoop, backboard, and floor markings.'},

  {question: 'The plants in Tomorrowland are all:',
  answers: ['Fake', 'Pollen Free', 'Edible', 'Brightly colored'],
  correctAnswer: 'Edible',
  funFact: 'The landscaping in Tomorrowland doubles as a potential farm, made up of fruits, veggies, and spices.'},

  {question: 'What is the one of the things a cast member is not allowed to do?',
  answers: ['Wear simple jewelry', 'Joke with the guests', 'Date another cast member', 'Use one finger gestures'],
  correctAnswer: 'Use one finger gestures',
  funFact: 'In order not to offend any cultures, Disney cast members are trained to point using two fingers or their whole hand.'},

  {question: 'As of 2019, what is the price of an adult ticket during peak season?',
  answers: ['$129', '$141', '$149', '$199'],
  correctAnswer: '$149',
  funFact: 'Price for an adult admission to one park, one day is $149 during peak season. Compare that to the $1 admission cost on opening day!'},

  {question: 'What are the names of the hitchhiking ghosts at the Haunted Mansion?',
  answers: ['Ezra, Phineas, and Gus', 'Eddie, Frank, and Philip', 'Huey, Dewey, and Louie', 'Barry, Robin, and Maurice'],
  correctAnswer: 'Ezra, Phineas, and Gus',
  funFact: 'Ezra, Phineas, and Gus are only 3 of the 999 ghosts in the Haunted Mansion.'},

  {question: 'Where can you purchase alcohol at Disneyland?',
  answers: ['Blue Bayou', 'Oga\'s Cantina', 'Red Rose Taverne', 'All of them'],
  correctAnswer: 'Oga\'s Cantina',
  funFact: 'Before Oga’s Cantina in Stars Wars: Galaxy’s Edge opened, the only place you could purchase alcohol in Disneyland was the private Club 33.'},

  {question: 'What is the shortest lived Disneyland attraction?',
  answers: ['Rocket Rods', 'Phantom Boats', 'Viewliner', 'Mickey Mouse Club Circus'],
  correctAnswer: 'Mickey Mouse Club Circus',
  funFact: 'The Mickey Mouse Club Circus ran from November 1955 to January 1956.'}
];

let questionNum = 0;
let score = 0;


function generateQuizForm() {
  for(let i=0; i<STORE.length; i++) {
  if (questionNum < STORE.length) {
    $('.quizMain').html(`<h2>${STORE[questionNum].question}</h2>
      <form>
        <fieldset>
          <label><input type="radio" value="${STORE[questionNum].answers[0]}" name="answer" required><span>${STORE[questionNum].answers[0]}</span></label>
          <label><input type="radio" value="${STORE[questionNum].answers[1]}" name="answer" required><span>${STORE[questionNum].answers[1]}</span></label>
          <label><input type="radio" value="${STORE[questionNum].answers[2]}" name="answer" required><span>${STORE[questionNum].answers[2]}</span></label>
          <label><input type="radio" value="${STORE[questionNum].answers[3]}" name="answer" required><span>${STORE[questionNum].answers[3]}</span></label>
          <button type="submit">Submit</button>
        </fieldset>
      </form>`)}
  else {
    renderFinalResult();
    retakeQuiz();
    $('.questionNumber').text(10)
  };
  }
};
//create quizMain in html

function startQuiz() {
  $('.startPage').on('click', '#start', function(event) {
    $('.startPage').hide();
    $('.quizMain').show();
    $('.questionNumber').text(1);
    generateQuizForm();
  })
};
// start button click, hide start page and render question page


function handleSubmitAnswer() {
  $(document).on('submit', function(event) {
    event.preventDefault();
    let selectedAnswer = $('input:checked').val();
    let correctAnswer = `${STORE[questionNum].correctAnswer}`;
    if (selectedAnswer === correctAnswer) {
      $('.quizMain').html(`<div class="feedback"><h3><img class="Icon" src="https://i.imgur.com/oyVwjWS.png" alt="thumbs-up">
      You got it!</h3>
      <p class="funFact">${STORE[questionNum].funFact}</p>
      <button type="button" class="next">Next</button></div>`);
      updateScore();
    } 
    else {
      $('.quizMain').html(`<div class="feedback">
      <h3><img class="Icon" src="https://i.imgur.com/1dRHq3d.png" alt="stitch crying">
      Oops!<br><span class="answerFeedback">The correct answer is ${STORE[questionNum].correctAnswer}</span></h3>
      <p class="funFact">${STORE[questionNum].funFact}</p>
      <button type="button" class="next">Next Question</button></div>`);
    }
    updateQuestionNum();
    generateNextQuestion();
  });
};

function updateQuestionNum () {
  questionNum ++;
  $('.questionNumber').text(questionNum+1);
};

function updateScore () {
  score ++;
  $('.score').text(score);
};

function generateNextQuestion() {
  $('.quizMain').on('click', '.next', function(event) {
    generateQuizForm();
  })
};


function renderFinalResult() {
  if (score === 10) {
 $('.quizMain').html(`<div class="finalResultPage">
      <h2 class=results>Your Score: ${score}/10</h2>
      <img class="final" src="https://i.imgur.com/OAyNpIT.png" alt="fireworks">
      <h4>Perfect Score!</h4>
      <button type="button" class="quizButton" id="retake"><img class="logo" src="https://i.imgur.com/IsrYSv6.png"alt="mickey mouse logo"> Try Again</button>
    </div>`);
  } else if (score<10 && score>6) {
    $('.quizMain').html(`<div class="finalResultPage">
      <h2 class=results>Your Score: ${score}/10</h2>
      <img class="final" src="https://i.imgur.com/sjWRpnC.png" alt="joy">
      <h4>You're a pro! Try for a perfect score!</h4>
      <button type="button" class="quizButton" id="retake"><img class="logo" src="https://i.imgur.com/IsrYSv6.png"alt="mickey mouse logo"> Try Again</button>
    </div>`);
  } else if (score<7 && score>3) {
    $('.quizMain').html(`<div class="finalResultPage">
      <h2 class=results>Your Score: ${score}/10</h2>
      <img class="final" src="https://www.disneyclips.com/images/images/fifi.png" alt="fifi">
      <h4>Brush up on the trivia and try again!</h4>
      <button type="button" class="quizButton" id="retake"><img class="logo" src="https://i.imgur.com/IsrYSv6.png"alt="mickey mouse logo"> Try Again</button>
    </div>`);
  } else {
    $('.quizMain').html(`<div class="finalResultPage">
      <h2 class=results>Your Score: ${score}/10</h2>
      <img class="final" src="https://i.imgur.com/Ot6LVcS.png" alt="eeyore">
      <h4>Ohhh-kayyy... let's try again...</h4>
      <button type="button" class="quizButton" id="retake"><img class="logo" src="https://i.imgur.com/IsrYSv6.png"alt="mickey mouse logo"> Try Again</button>
    </div>`);
  }
};

function retakeQuiz() {
  $(document).on('click', '#retake', function(event){
    location.reload();
  })
};


function handleQuiz() {
startQuiz();
handleSubmitAnswer();  
};

$(handleQuiz);
