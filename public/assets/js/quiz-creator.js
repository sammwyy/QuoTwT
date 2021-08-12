const list = document.getElementById("question-list");
const counter = document.getElementById("question-counter");

const addQuestionBtn = document.getElementById("add-question-btn");
const createQuizBtn = document.getElementById("create-quiz-btn");

const modalForm = document.getElementById("modal-form");

app.setState("question-list", []);

createQuizBtn.style.display = "none";

app.subscribeState("question-list", (_oldState, newState) => {
  list.innerHTML = "";
  counter.innerText = newState.length;

  createQuizBtn.style.display = "inline-block";
  if (newState.length >= 10) {
    addQuestionBtn.style.display = "none";
  }

  for (let question of newState) {
    list.innerHTML += `
    <div class="question-item">
      <b>${question.title}</b> <br />
      <small>Respuesta: "${question.answers[0]}"</small>
    </div>
    `;
  }
});

function showCreateModal() {
  let modal = document.getElementById("create-question-modal");
  modal.style.display = "block";
  modal.classList.add("show");
}

function hideModal() {
  let modal = document.getElementById("create-question-modal");
  modal.style.display = "none";
  modal.classList.remove("show");
}

function submitModal() {
  const title = document.getElementById("question-title");
  const ans1 = document.getElementById("ans-1");
  const ans2 = document.getElementById("ans-2");
  const ans3 = document.getElementById("ans-3");
  const ans4 = document.getElementById("ans-4");

  addQuestion(title.value, ans1.value, ans2.value, ans3.value, ans4.value);
  title.value = "";
  ans1.value = "";
  ans2.value = "";
  ans3.value = "";
  ans4.value = "";
  hideModal();
}

function addQuestion(title, ans1, ans2, ans3, ans4) {
  app.pushState("question-list", {
    title,
    answers: [ans1, ans2, ans3, ans4],
  });
}

function createQuiz() {
  const questions = app.getState("question-list");
  alert("Creando quiz con " + questions.length);
}

modalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  submitModal();
});
