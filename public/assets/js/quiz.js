const downloadingUI = document.getElementById("downloading");
const quizUI = document.getElementById("quiz");
const uploadingUI = document.getElementById("uploading");

const questionTitle = document.getElementById("question-title");
const ans1 = document.getElementById("ans1-btn");
const ans2 = document.getElementById("ans2-btn");
const ans3 = document.getElementById("ans3-btn");
const ans4 = document.getElementById("ans4-btn");

let processing = false;
let request = [];
let currentQuestion;

app.subscribeState("quiz", (_, newState) => {
  downloadingUI.style.display = "none";
  quizUI.style.display = "block";
  app.setState("question", newState[0]);
});

app.subscribeState("question", (_, question) => {
  if (!question) {
    return endQuiz();
  } else {
    currentQuestion = question;
  }

  const { title, answers } = question;

  questionTitle.innerText = title;
  ans1.innerText = answers[0];
  ans2.innerText = answers[1];
  ans3.innerText = answers[2];
  ans4.innerText = answers[3];

  quizUI.style.opacity = "1";
});

function endQuiz() {
  uploadingUI.style.display = "block";
}

function submitAns(ansIndex) {
  if (processing) {
    return;
  } else {
    processing = true;
  }

  quizUI.style.opacity = "0";

  setTimeout(() => {
    request.push(currentQuestion.answers[ansIndex]);
    processing = false;
    app.shiftState("quiz");
  }, 500);
}

setTimeout(() => {
  app.setState("quiz", [
    {
      title: "Test",
      answers: ["A", "B", "C", "D"],
    },

    {
      title: "Another Test",
      answers: ["1", "2", "3", "4"],
    },

    {
      title: "Well",
      answers: ["abc", "def", "123", "456"],
    },
  ]);
}, 1000);
