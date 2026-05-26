import json
import re
from pathlib import Path

import docx


WORKSPACE = Path(r"C:\Users\Acer\Documents\Codex\2026-05-26\files-mentioned-by-the-user-testlar")
DOC_PATH = Path(r"C:\Users\Acer\Downloads\Testlar 100ta.docx")


def load_questions():
    document = docx.Document(str(DOC_PATH))
    lines = [paragraph.text.strip() for paragraph in document.paragraphs if paragraph.text.strip()]

    answer_key = {}
    for line in lines:
        for number, letter in re.findall(r"(\d{1,3})\s*[-–]\s*([ABCD])", line):
            index = int(number)
            if 1 <= index <= 100:
                answer_key[index] = letter

    questions = []
    current = None
    for line in lines:
        if line.startswith("JAVOBLAR KALITI"):
            break

        question_match = re.match(r"^(\d{1,3})\.\s+(.+)", line)
        answer_match = re.match(r"^([ABCD])\)\s+(.+)", line)

        if question_match:
            if current:
                questions.append(current)
            current = {
                "number": int(question_match.group(1)),
                "question": question_match.group(2),
                "answers": [],
            }
        elif answer_match and current:
            current["answers"].append(
                {
                    "label": answer_match.group(1),
                    "text": answer_match.group(2),
                }
            )

    if current:
        questions.append(current)

    for question in questions:
        correct_letter = answer_key.get(question["number"])
        for answer in question["answers"]:
            answer["correct"] = answer["label"] == correct_letter

    if len(questions) != 100:
        raise RuntimeError(f"100 ta savol kutilgandi, topildi: {len(questions)}")
    if len(answer_key) != 100:
        raise RuntimeError(f"100 ta javob kaliti kutilgandi, topildi: {len(answer_key)}")

    invalid = [question["number"] for question in questions if len(question["answers"]) != 4]
    if invalid:
        raise RuntimeError(f"4 ta variantga ega bo'lmagan savollar: {invalid}")

    return questions


def main():
    questions = load_questions()

    index_html = """<!DOCTYPE html>
<html lang="uz">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="O'zbek tili, adabiyoti va chet el adabiyoti bo'yicha 100 talik premium quiz game."
    />
    <title>O'zbek tili va adabiyoti quiz</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <main class="app-shell">
      <section class="screen screen--start active" id="start-screen" aria-labelledby="start-title">
        <div class="hero-panel glass-card">
          <span class="eyebrow">100 talik testlar</span>
          <h1 id="start-title">O'zbek ona tili va adabiyoti</h1>
          <p>
            DTM uslubidagi savollar: fonetika, leksikologiya, grammatika,
            o'zbek adabiyoti va chet el adabiyoti.
          </p>

          <div class="stats-grid" aria-label="Quiz ko'rsatkichlari">
            <div>
              <strong id="start-total">100</strong>
              <span>Savol</span>
            </div>
            <div>
              <strong>04</strong>
              <span>Variant</span>
            </div>
            <div>
              <strong id="start-time">25:00</strong>
              <span>Timer</span>
            </div>
          </div>

          <button class="primary-btn" id="start-btn" type="button">
            Testni boshlash
          </button>
        </div>
      </section>

      <section class="screen screen--quiz" id="quiz-screen" aria-live="polite">
        <div class="quiz-layout glass-card">
          <header class="quiz-topbar">
            <div>
              <span class="eyebrow">Bilim sinovi</span>
              <h2 id="question-text">Savol yuklanmoqda...</h2>
            </div>
            <div class="timer-card" aria-label="Qolgan vaqt">
              <span>Vaqt</span>
              <strong id="timer">25:00</strong>
            </div>
          </header>

          <div class="quiz-meta">
            <p>Savol <span id="current-question">1</span>/<span id="total-questions">100</span></p>
            <p>Ball: <span id="score">0</span></p>
          </div>

          <div class="progress-track" aria-hidden="true">
            <div id="progress" class="progress-fill"></div>
          </div>

          <div id="answers-container" class="answers-container"></div>
        </div>
      </section>

      <section class="screen screen--result" id="result-screen" aria-labelledby="result-title">
        <div class="result-panel glass-card">
          <span class="eyebrow">Natija</span>
          <h1 id="result-title">Test yakunlandi</h1>

          <div class="score-ring" aria-label="Yakuniy foiz">
            <span id="result-percent">0%</span>
          </div>

          <p class="result-score">
            Siz <span id="final-score">0</span> ta to'g'ri javob berdingiz.
            Maksimal ball: <span id="max-score">100</span>.
          </p>
          <p id="result-message" class="result-message">Natija tayyor.</p>

          <button class="primary-btn" id="restart-btn" type="button">
            Qayta boshlash
          </button>
        </div>
      </section>
    </main>

    <script src="script.js"></script>
  </body>
</html>
"""

    style_css = """/* Premium Quiz UI */
:root {
  --bg: #070914;
  --card: rgba(255, 255, 255, 0.1);
  --border: rgba(255, 255, 255, 0.18);
  --text: #f7f8ff;
  --muted: #a9b0c7;
  --accent: #f6b756;
  --accent-2: #7c5cff;
  --green: #35d07f;
  --red: #ff5c7a;
  --shadow: 0 24px 80px rgba(0, 0, 0, 0.42);
  --radius: 24px;
  --transition: 180ms ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: var(--text);
  background:
    radial-gradient(circle at 15% 15%, rgba(124, 92, 255, 0.34), transparent 28%),
    radial-gradient(circle at 85% 8%, rgba(246, 183, 86, 0.22), transparent 25%),
    linear-gradient(135deg, #050710 0%, #0d1230 52%, #111019 100%);
  overflow-x: hidden;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 46px 46px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent 78%);
}

button {
  font: inherit;
}

.app-shell {
  width: min(1120px, calc(100% - 32px));
  min-height: 100vh;
  margin: 0 auto;
  display: grid;
  place-items: center;
  padding: 32px 0;
}

.screen {
  display: none;
  width: 100%;
  animation: fadeIn 300ms ease both;
}

.screen.active {
  display: block;
}

.glass-card {
  border: 1px solid var(--border);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.06));
  box-shadow: var(--shadow);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

.hero-panel,
.quiz-layout,
.result-panel {
  width: min(860px, 100%);
  margin: 0 auto;
  border-radius: var(--radius);
  padding: clamp(24px, 5vw, 56px);
}

.hero-panel,
.result-panel {
  text-align: center;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin-bottom: 14px;
  padding: 8px 12px;
  border: 1px solid rgba(246, 183, 86, 0.28);
  border-radius: 999px;
  color: #ffdca0;
  background: rgba(246, 183, 86, 0.1);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1,
h2 {
  letter-spacing: 0;
}

.hero-panel h1,
.result-panel h1 {
  max-width: 780px;
  margin: 0 auto 16px;
  font-size: clamp(2.25rem, 7vw, 5rem);
  line-height: 0.96;
  font-weight: 800;
}

.hero-panel p,
.result-score,
.result-message {
  max-width: 680px;
  margin: 0 auto;
  color: var(--muted);
  font-size: clamp(1rem, 2vw, 1.15rem);
  line-height: 1.7;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 32px auto;
}

.stats-grid div,
.timer-card,
.answer-btn {
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.08);
}

.stats-grid div {
  border-radius: 18px;
  padding: 18px 14px;
}

.stats-grid strong,
.timer-card strong {
  display: block;
  color: var(--text);
  font-size: 1.35rem;
}

.stats-grid span,
.timer-card span,
.quiz-meta {
  color: var(--muted);
  font-size: 0.9rem;
}

.primary-btn {
  border: 0;
  border-radius: 16px;
  padding: 15px 24px;
  color: #15100a;
  background: linear-gradient(135deg, #ffd27a, #f6b756 48%, #ff8f5d);
  box-shadow: 0 14px 34px rgba(246, 183, 86, 0.24);
  font-weight: 800;
  cursor: pointer;
  transition: transform var(--transition), box-shadow var(--transition), filter var(--transition);
}

.primary-btn:hover {
  transform: translateY(-2px);
  filter: saturate(1.08);
  box-shadow: 0 18px 42px rgba(246, 183, 86, 0.32);
}

.quiz-layout {
  display: grid;
  gap: 22px;
}

.quiz-topbar {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  align-items: start;
}

#question-text {
  font-size: clamp(1.35rem, 3vw, 2.25rem);
  line-height: 1.25;
  font-weight: 800;
}

.timer-card {
  min-width: 118px;
  border-radius: 18px;
  padding: 14px 16px;
  text-align: center;
}

.timer-card.warning strong {
  color: var(--red);
}

.quiz-meta {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  font-weight: 700;
}

.quiz-meta span {
  color: var(--text);
}

.progress-track {
  height: 10px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
}

.progress-fill {
  width: 0%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  transition: width 240ms ease;
}

.answers-container {
  display: grid;
  gap: 14px;
}

.answer-btn {
  width: 100%;
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 14px;
  align-items: center;
  min-height: 66px;
  border-radius: 18px;
  padding: 13px 16px;
  color: var(--text);
  text-align: left;
  cursor: pointer;
  transition: transform var(--transition), border-color var(--transition), background var(--transition);
}

.answer-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  border-color: rgba(246, 183, 86, 0.48);
  background: rgba(255, 255, 255, 0.13);
}

.answer-btn:disabled {
  cursor: not-allowed;
}

.answer-label {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  color: #120f08;
  background: linear-gradient(135deg, #fff0bf, #f6b756);
  font-weight: 800;
}

.answer-text {
  font-weight: 700;
  line-height: 1.45;
}

.answer-btn.correct {
  border-color: rgba(53, 208, 127, 0.72);
  background: rgba(53, 208, 127, 0.15);
}

.answer-btn.correct .answer-label {
  color: #06150d;
  background: var(--green);
}

.answer-btn.incorrect {
  border-color: rgba(255, 92, 122, 0.72);
  background: rgba(255, 92, 122, 0.14);
}

.answer-btn.incorrect .answer-label {
  color: #1f050a;
  background: var(--red);
}

.question-enter {
  animation: questionEnter 260ms ease both;
}

.score-ring {
  width: 172px;
  height: 172px;
  display: grid;
  place-items: center;
  margin: 26px auto;
  border-radius: 50%;
  background:
    radial-gradient(circle at center, rgba(7, 9, 20, 0.92) 58%, transparent 60%),
    conic-gradient(var(--accent) var(--score-angle, 0deg), rgba(255, 255, 255, 0.12) 0deg);
  border: 1px solid var(--border);
}

.score-ring span {
  font-size: 2.35rem;
  font-weight: 800;
}

.result-message {
  margin-top: 12px;
  margin-bottom: 28px;
  color: #ffdca0;
  font-weight: 700;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes questionEnter {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 760px) {
  .app-shell {
    width: min(100% - 20px, 1120px);
    padding: 18px 0;
  }

  .hero-panel,
  .quiz-layout,
  .result-panel {
    border-radius: 20px;
    padding: 22px;
  }

  .quiz-topbar {
    grid-template-columns: 1fr;
  }

  .timer-card {
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 430px) {
  .quiz-meta {
    display: grid;
  }

  .answer-btn {
    grid-template-columns: 36px 1fr;
    min-height: 60px;
    padding: 12px;
  }

  .answer-label {
    width: 36px;
    height: 36px;
    border-radius: 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 1ms !important;
    scroll-behavior: auto !important;
    transition-duration: 1ms !important;
  }
}
"""

    questions_json = json.dumps(questions, ensure_ascii=False, indent=2)
    script_js = f"""const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const progressBar = document.getElementById("progress");
const timerElement = document.getElementById("timer");
const timerCard = document.querySelector(".timer-card");
const resultPercent = document.getElementById("result-percent");
const scoreRing = document.querySelector(".score-ring");

const quizQuestions = {questions_json};

const QUESTION_TIME_SECONDS = 15;
const TOTAL_TIME_SECONDS = quizQuestions.length * QUESTION_TIME_SECONDS;
const RESULT_MESSAGES = [
  {{ min: 90, text: "A'lo natija! Siz mavzuni juda yaxshi egallagansiz." }},
  {{ min: 75, text: "Zo'r! Bilimingiz mustahkam, faqat ayrim mavzularni takrorlang." }},
  {{ min: 60, text: "Yaxshi natija. Xatolarni ko'rib chiqsangiz, ball yanada oshadi." }},
  {{ min: 40, text: "O'rtacha natija. Grammatik va adabiyot bo'limlarini qayta ko'rib chiqing." }},
  {{ min: 0, text: "Mashqni davom ettiring. Har bir urinish bilimni kuchaytiradi." }},
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;
let remainingSeconds = TOTAL_TIME_SECONDS;
let timerId = null;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;
document.getElementById("start-total").textContent = quizQuestions.length;
document.getElementById("start-time").textContent = formatTime(TOTAL_TIME_SECONDS);

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {{
  currentQuestionIndex = 0;
  score = 0;
  answersDisabled = false;
  remainingSeconds = TOTAL_TIME_SECONDS;

  scoreSpan.textContent = score;
  updateTimer();
  switchScreen(startScreen, quizScreen);
  showQuestion();
  startTimer();
}}

function restartQuiz() {{
  resultScreen.classList.remove("active");
  progressBar.style.width = "0%";
  scoreRing.style.setProperty("--score-angle", "0deg");
  startQuiz();
}}

function showQuestion() {{
  const currentQuestion = quizQuestions[currentQuestionIndex];
  answersDisabled = false;

  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  questionText.textContent = currentQuestion.question;
  progressBar.style.width = `${{(currentQuestionIndex / quizQuestions.length) * 100}}%`;

  answersContainer.innerHTML = "";
  answersContainer.classList.remove("question-enter");
  void answersContainer.offsetWidth;
  answersContainer.classList.add("question-enter");

  currentQuestion.answers.forEach((answer) => {{
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.type = "button";
    button.dataset.correct = String(answer.correct);
    button.innerHTML = `
      <span class="answer-label">${{answer.label}}</span>
      <span class="answer-text">${{escapeHtml(answer.text)}}</span>
    `;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  }});
}}

function selectAnswer(event) {{
  if (answersDisabled) return;

  answersDisabled = true;
  const selectedButton = event.currentTarget;
  const isCorrect = selectedButton.dataset.correct === "true";

  if (isCorrect) {{
    score += 1;
    scoreSpan.textContent = score;
  }}

  revealAnswers(selectedButton);

  window.setTimeout(() => {{
    currentQuestionIndex += 1;
    if (currentQuestionIndex < quizQuestions.length) {{
      showQuestion();
      return;
    }}
    showResults();
  }}, 850);
}}

function revealAnswers(selectedButton) {{
  Array.from(answersContainer.children).forEach((button) => {{
    button.disabled = true;
    if (button.dataset.correct === "true") {{
      button.classList.add("correct");
    }} else if (button === selectedButton) {{
      button.classList.add("incorrect");
    }}
  }});
}}

function startTimer() {{
  clearInterval(timerId);
  timerId = window.setInterval(() => {{
    remainingSeconds -= 1;
    updateTimer();

    if (remainingSeconds <= 0) {{
      showResults();
    }}
  }}, 1000);
}}

function updateTimer() {{
  timerElement.textContent = formatTime(Math.max(remainingSeconds, 0));
  timerCard.classList.toggle("warning", remainingSeconds <= 60);
}}

function showResults() {{
  clearInterval(timerId);
  answersDisabled = true;
  progressBar.style.width = "100%";
  switchScreen(quizScreen, resultScreen);

  const percentage = Math.round((score / quizQuestions.length) * 100);
  const angle = (percentage / 100) * 360;

  finalScoreSpan.textContent = score;
  resultPercent.textContent = `${{percentage}}%`;
  scoreRing.style.setProperty("--score-angle", `${{angle}}deg`);
  resultMessage.textContent = RESULT_MESSAGES.find((message) => percentage >= message.min).text;
}}

function switchScreen(currentScreen, nextScreen) {{
  currentScreen.classList.remove("active");
  nextScreen.classList.add("active");
}}

function formatTime(totalSeconds) {{
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${{minutes}}:${{seconds}}`;
}}

function escapeHtml(value) {{
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}}
"""

    (WORKSPACE / "index.html").write_text(index_html, encoding="utf-8")
    (WORKSPACE / "style.css").write_text(style_css, encoding="utf-8")
    (WORKSPACE / "script.js").write_text(script_js, encoding="utf-8")
    print(f"{len(questions)} ta savol index.html, style.css, script.js fayllariga joylandi.")


if __name__ == "__main__":
    main()
