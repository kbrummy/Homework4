//Variables:
var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("results");
var sec = 60;
var time;
var questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: {
      a: "&lt;scripting&gt;",
      b: "&lt;script&gt;",
      c: "&lt;js&gt;",
    },
    correctAnswer: "b",
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    answers: {
      a: "The &lt;body&gt; section",
      b: "The &lt;head&gt; section",
      c:
        "Both the &lt;head&gt; section and the &lt;body&gt; section are correct",
    },
    correctAnswer: "c",
  },
  {
    question:
      "The external JavaScript file must contain the &lt;script&gt; tag.",
    answers: {
      a: "False",
      b: "True",
      c: "Maybe",
    },
    correctAnswer: "a",
  },
  {
    question: "How do you call a function named 'myFunction'?",
    answers: {
      a: "myFunction()",
      b: "call myFunction()",
      c: "call function myFunction()",
    },
    correctAnswer: "a",
  },
  {
    question: "JavaScript is the same as Java.",
    answers: {
      a: "False",
      b: "True",
      c: "Maybe",
    },
    correctAnswer: "a",
  },
];
var state = {
  activeQuestion: null,
  activeQuestionAnswer: null,
  answeredCorrectly: 0,
  answeredIncorrectly: 0,
  totalQuestions: questions.length - 1,
  finalScore: 0,
};
var scoreboard = [
  {
    Name: "BH",
    Score: 51,
  },
  {
    Name: "KB",
    Score: 32,
  },
];

//Function to start quiz:
function startQuiz() {
  state.activeQuestion = 0;
  state.activeQuestionAnswer = null;
  state.answeredCorrectly = 0;
  state.answeredIncorrectly = 0;
  updateQuestion(state.activeQuestion);
  document.getElementById("quiz").style.display = "block";
  document.getElementById("intro").className = "container hide";
  document.getElementById("results").className = "container hide";
}

//Function that will start the quiz at the start/restart of the quiz:
function startTimer() {
  sec = 60;
  time = setInterval(myTimer, 1000);

  function myTimer() {
    document.getElementById("timer").innerHTML = sec + "sec left";
    sec--;
    if (sec <= 0) {
      clearInterval(time);
      alert("Time's up!");
      endOfQuiz();
    }
  }
}

//function that will stop the timer where it's at when the quiz finishes.
function timerStop() {
  clearInterval(time);
}

//Click event listeners:

document.getElementById("countdown").addEventListener("click", function () {
  startTimer();
  startQuiz();
});

document.getElementById("ans1").addEventListener("click", function () {
  checkAnswer("a");
});

document.getElementById("ans2").addEventListener("click", function () {
  checkAnswer("b");
});

document.getElementById("ans3").addEventListener("click", function () {
  checkAnswer("c");
});

document.getElementById("submit-score").addEventListener("click", function () {
  var finalScoreObj = {
    Name: document.getElementById("initials").value,
    Score: state.finalScore,
  };

  scoreboard.push(finalScoreObj);
  console.log(scoreboard);
  document.getElementById("inputResults").className = "container hide";
  updateScoreTable();
});

document.getElementById("restart").addEventListener("click", function () {
  startTimer();
  startQuiz();
});

document.getElementById("scoreBtn").addEventListener("click", function () {
  endOfQuiz();
  document.getElementById("inputResults").className = "container hide";
});

function checkAnswer(answer) {
  //check if the answer is correct or incorrect.
  //if answer is correct, advance to next question.
  //if answer is incorrect, decrement time and display message.
  if (state.activeQuestionAnswer === answer) {
    state.activeQuestion++;
    if (state.activeQuestion > state.totalQuestions) {
      endOfQuiz();
    }
    state.answeredCorrectly++;
    updateQuestion(state.activeQuestion);
  } else {
    sec = sec - 10;
    alert("Wrong!");
    state.activeQuestion++;
    if (state.activeQuestion > state.totalQuestions) {
      endOfQuiz();
    }
    state.answeredIncorrectly++;
    updateQuestion(state.activeQuestion);
  }
}

//Function to push the next question through:
function updateQuestion(questionIndex) {
  var currentQuestion = questions[questionIndex];
  document.getElementById("quizQuestion").innerHTML = currentQuestion.question;
  document.getElementById("ans1").innerHTML = currentQuestion.answers.a;
  document.getElementById("ans2").innerHTML = currentQuestion.answers.b;
  document.getElementById("ans3").innerHTML = currentQuestion.answers.c;
  state.activeQuestionAnswer = currentQuestion.correctAnswer;
}

//Function for when the quiz is done:
function endOfQuiz() {
  state.finalScore = sec;
  document.getElementById("quiz").style.display = "none";
  document.getElementById("results").className = "container";
  document.getElementById("inputResults").className = "container";
  document.getElementById("score").innerHTML = state.finalScore;
  timerStop();

  //capture the sec and store in a variable to stop the timer--to be able to display it as score
  //display the score--update span with score value
  //display input for initials---then take value of initials and finalScore push to scoreboard
  //clear state
  //display "restart" button to restart quiz
  //stop timer
}

//Function to update the high score list:
function updateScoreTable() {
  document.getElementById("otherScores").innerHTML = "";
  var tablearea = document.getElementById("otherScores"),
    table = document.createElement("table");

  scoreboard.forEach(function (highScore) {
    var tr = document.createElement("tr");

    tr.appendChild(document.createElement("td"));
    tr.appendChild(document.createElement("td"));

    tr.cells[0].appendChild(document.createTextNode(highScore.Name));
    tr.cells[1].appendChild(document.createTextNode(highScore.Score));

    table.appendChild(tr);
  });

  tablearea.appendChild(table);
}
