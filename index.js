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

function updateQuestionNum () {
  questionNum ++;
  $('.questionNumber').text(questionNum+1);
};

function updateScore () {
  score ++;
  $('.score').text(score);
};

function generateQuizForm() {
  if (questionNum < STORE.length) {
    $('.quizMain').html(`<h2>${STORE[questionNum].question}</h2>
      <form>
        <fieldset>
          <label class="answer"><input type="radio" value=${STORE[questionNum].answers[0]} name="answer" required><span>${STORE[questionNum].answers[0]}</span></label>
          <label class="answer"><input type="radio" value=${STORE[questionNum].answers[1]} name="answer" required><span>${STORE[questionNum].answers[1]}</span></label>
          <label class="answer"><input type="radio" value=${STORE[questionNum].answers[2]} name="answer" required><span>${STORE[questionNum].answers[2]}</span></label>
          <label class="answer"><input type="radio" value=${STORE[questionNum].answers[3]} name="answer" required><span>${STORE[questionNum].answers[3]}</span></label>
          <button type="submit">Submit</button>
        </fieldset>
      </form>`)}
  else {
    renderFinalResult();
    retakeQuiz();
  };
};


function startQuiz() {
  $('.startPage').on('click', '#start', function(event) {
    $('.startPage').hide();
    $('.quizMain').show();
    $('.questionNumber').text(1);
    generateQuizForm();
  })
};



function handleSubmitAnswer() {
  $(document).on('submit', function(event) {
    event.preventDefault();
    let selectedAnswer = $('input:checked').val();
    let correctAnswer = `${STORE[questionNum].correctAnswer}`;
    if (selectedAnswer == correctAnswer) {
      $('.quizMain').html(`<div class="feedback"><img class="Icon" src="https://cdn.pixabay.com/photo/2016/03/31/14/37/check-mark-1292787__340.png" alt="check mark">
      <h3>You got it!</h3>
      <p class="funFact">${STORE[questionNum].funFact}</p>
      <button type="button" class="next">Next Question</button></div>`);
      updateScore();
    } 
    else {
      $('.quizMain').html(`<div class="feedback"><img class="Icon" src="https://clipartstation.com/wp-content/uploads/2018/10/x-mark-clipart.jpg" alt="x-mark">
      <h3>Oops!</h3><p class="answerFeedback">The correct answer is ${STORE[questionNum].correctAnswer}</p>
      <p class="funFact">${STORE[questionNum].funFact}</p>
      <button type="button" class="next">Next Question</button></div>`);
    }
  });
};

function generateNextQuestion() {
  $(document).on('click', '.next', function(event) {
    updateQuestionNum();
    generateQuizForm();
    handleSubmitAnswer();
  })
};


function renderFinalResult() {
 $('.quizMain').html(`<div class="finalResultPage">
      <h2 class=results>Your Score: ${score}/10</h2>
      <button type="button" class="quizButton" id="retake"><img class="logo" src="https://i.ebayimg.com/images/g/I64AAOSweXFb76U3/s-l300.jpg" alt="mickey mouse logo">Try Again</button>
    </div>`)
};

function retakeQuiz() {
  $(document).on('click', '#retake', function(event){
    location.reload();
  })
};


function handleQuiz() {
startQuiz();
handleSubmitAnswer();  
generateNextQuestion();
};

$(handleQuiz);