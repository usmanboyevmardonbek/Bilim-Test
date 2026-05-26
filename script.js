const landingScreen = document.getElementById("landing-screen");
const freeQuizButton = document.getElementById("free-quiz-btn");
const startScreen = document.getElementById("start-screen");
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

const quizQuestions = [
  {
    "number": 1,
    "question": "O'zbek tilida nechta unli tovush mavjud?",
    "answers": [
      {
        "label": "A",
        "text": "5",
        "correct": false
      },
      {
        "label": "B",
        "text": "6",
        "correct": true
      },
      {
        "label": "C",
        "text": "7",
        "correct": false
      },
      {
        "label": "D",
        "text": "8",
        "correct": false
      }
    ]
  },
  {
    "number": 2,
    "question": "Quyidagi so'zlardan qaysi birida so'z oxirida undosh tovush jaranglashishi kuzatiladi?",
    "answers": [
      {
        "label": "A",
        "text": "kitob",
        "correct": false
      },
      {
        "label": "B",
        "text": "maktab",
        "correct": false
      },
      {
        "label": "C",
        "text": "ko'z",
        "correct": false
      },
      {
        "label": "D",
        "text": "barcha javoblar to'g'ri",
        "correct": true
      }
    ]
  },
  {
    "number": 3,
    "question": "\"Assimиляция\" (o'xshashlanish) hodisasiga misol bo'lgan so'zni toping.",
    "answers": [
      {
        "label": "A",
        "text": "gapirmoq",
        "correct": false
      },
      {
        "label": "B",
        "text": "katta",
        "correct": true
      },
      {
        "label": "C",
        "text": "sariq",
        "correct": false
      },
      {
        "label": "D",
        "text": "deraza",
        "correct": false
      }
    ]
  },
  {
    "number": 4,
    "question": "O'zbek tilida bo'g'in nima asosida tashkil topadi?",
    "answers": [
      {
        "label": "A",
        "text": "Undosh tovush",
        "correct": false
      },
      {
        "label": "B",
        "text": "Unli tovush",
        "correct": true
      },
      {
        "label": "C",
        "text": "Jarangli undosh",
        "correct": false
      },
      {
        "label": "D",
        "text": "Jarangsiz undosh",
        "correct": false
      }
    ]
  },
  {
    "number": 5,
    "question": "\"Transkriptsiya\" deganda nimani tushunamiz?",
    "answers": [
      {
        "label": "A",
        "text": "So'zni ma'nosini izohlash",
        "correct": false
      },
      {
        "label": "B",
        "text": "So'zni tovush tarkibini maxsus belgilar bilan yozib ko'rsatish",
        "correct": true
      },
      {
        "label": "C",
        "text": "So'zni qismlarga bo'lish",
        "correct": false
      },
      {
        "label": "D",
        "text": "So'zni boshqa tilda tarjima qilish",
        "correct": false
      }
    ]
  },
  {
    "number": 6,
    "question": "Quyidagi so'zlardan qaysi biri 3 bo'g'inli?",
    "answers": [
      {
        "label": "A",
        "text": "baxt",
        "correct": false
      },
      {
        "label": "B",
        "text": "maktab",
        "correct": false
      },
      {
        "label": "C",
        "text": "o'quvchi",
        "correct": true
      },
      {
        "label": "D",
        "text": "non",
        "correct": false
      }
    ]
  },
  {
    "number": 7,
    "question": "O'zbek tilida 'ng' tovushi qanday tovush hisoblanadi?",
    "answers": [
      {
        "label": "A",
        "text": "Lab-lab undoshi",
        "correct": false
      },
      {
        "label": "B",
        "text": "Til orqa burun undoshi",
        "correct": true
      },
      {
        "label": "C",
        "text": "Til oldi undoshi",
        "correct": false
      },
      {
        "label": "D",
        "text": "Bo'g'iz undoshi",
        "correct": false
      }
    ]
  },
  {
    "number": 8,
    "question": "\"Urg'u\" nima?",
    "answers": [
      {
        "label": "A",
        "text": "So'zdagi harflarning tartibli joylashuvi",
        "correct": false
      },
      {
        "label": "B",
        "text": "So'zdagi biror bo'g'inga kuchli aytilish",
        "correct": true
      },
      {
        "label": "C",
        "text": "Gapning ohang bilan tugashi",
        "correct": false
      },
      {
        "label": "D",
        "text": "So'zning grafik ko'rinishi",
        "correct": false
      }
    ]
  },
  {
    "number": 9,
    "question": "Qaysi so'zda orfoepik me'yor buzilgan?",
    "answers": [
      {
        "label": "A",
        "text": "[kitob]",
        "correct": false
      },
      {
        "label": "B",
        "text": "[do'kon]",
        "correct": false
      },
      {
        "label": "C",
        "text": "[kompyuter]",
        "correct": false
      },
      {
        "label": "D",
        "text": "[restoron] o'rniga [restoran] deyish",
        "correct": true
      }
    ]
  },
  {
    "number": 10,
    "question": "O'zbek alifbosida nechta harf mavjud (lotin asosidagi)?",
    "answers": [
      {
        "label": "A",
        "text": "29",
        "correct": true
      },
      {
        "label": "B",
        "text": "30",
        "correct": false
      },
      {
        "label": "C",
        "text": "32",
        "correct": false
      },
      {
        "label": "D",
        "text": "26",
        "correct": false
      }
    ]
  },
  {
    "number": 11,
    "question": "\"Sinоnim\" deganda nimani tushunamiz?",
    "answers": [
      {
        "label": "A",
        "text": "Bir xil yozilib, turli ma'noni anglatuvchi so'zlar",
        "correct": false
      },
      {
        "label": "B",
        "text": "Ma'nosi bir-biriga yaqin yoki bir xil bo'lgan so'zlar",
        "correct": true
      },
      {
        "label": "C",
        "text": "Ma'nosi bir-biriga zid bo'lgan so'zlar",
        "correct": false
      },
      {
        "label": "D",
        "text": "Ko'p ma'noli so'zlar",
        "correct": false
      }
    ]
  },
  {
    "number": 12,
    "question": "\"Baland\" so'zining antonimi qaysi?",
    "answers": [
      {
        "label": "A",
        "text": "uzun",
        "correct": false
      },
      {
        "label": "B",
        "text": "katta",
        "correct": false
      },
      {
        "label": "C",
        "text": "past",
        "correct": true
      },
      {
        "label": "D",
        "text": "qisqa",
        "correct": false
      }
    ]
  },
  {
    "number": 13,
    "question": "Quyidagi juftliklardan qaysi biri omonim hisoblanadi?",
    "answers": [
      {
        "label": "A",
        "text": "ot (hayvon) – ot (ism)",
        "correct": true
      },
      {
        "label": "B",
        "text": "katta – ulkan",
        "correct": false
      },
      {
        "label": "C",
        "text": "chiroyli – go'zal",
        "correct": false
      },
      {
        "label": "D",
        "text": "issiq – sovuq",
        "correct": false
      }
    ]
  },
  {
    "number": 14,
    "question": "\"Arxaizm\" nima?",
    "answers": [
      {
        "label": "A",
        "text": "Yangi kirib kelgan so'z",
        "correct": false
      },
      {
        "label": "B",
        "text": "Eskirib qo'llanishdan chiqqan so'z",
        "correct": true
      },
      {
        "label": "C",
        "text": "Chet tildan o'zlashtirilgan so'z",
        "correct": false
      },
      {
        "label": "D",
        "text": "Shevaga xos so'z",
        "correct": false
      }
    ]
  },
  {
    "number": 15,
    "question": "Frazeologik birlikning xususiyati qaysi qatorda to'g'ri ko'rsatilgan?",
    "answers": [
      {
        "label": "A",
        "text": "Ma'nosi tarkibidagi so'zlar ma'nosining yig'indisiga teng",
        "correct": false
      },
      {
        "label": "B",
        "text": "Har doim uch va undan ortiq so'zdan tashkil topadi",
        "correct": false
      },
      {
        "label": "C",
        "text": "Yaxlit holda ko'chma ma'no anglatadi",
        "correct": true
      },
      {
        "label": "D",
        "text": "Faqat fe'ldan iborat bo'ladi",
        "correct": false
      }
    ]
  },
  {
    "number": 16,
    "question": "\"Kompyuter\" so'zi o'zbek tiliga qaysi tildan kirib kelgan?",
    "answers": [
      {
        "label": "A",
        "text": "Fransuz",
        "correct": false
      },
      {
        "label": "B",
        "text": "Nemis",
        "correct": false
      },
      {
        "label": "C",
        "text": "Ingliz",
        "correct": true
      },
      {
        "label": "D",
        "text": "Arab",
        "correct": false
      }
    ]
  },
  {
    "number": 17,
    "question": "\"Ko'p ma'noli so'z\" deyilganda nimani tushunamiz?",
    "answers": [
      {
        "label": "A",
        "text": "Ko'p qo'llaniladigan so'z",
        "correct": false
      },
      {
        "label": "B",
        "text": "Bitta so'z shaklida bir necha bog'liq ma'noni anglatuvchi so'z",
        "correct": true
      },
      {
        "label": "C",
        "text": "Sinonimlar qatori",
        "correct": false
      },
      {
        "label": "D",
        "text": "Murakkab tuzilishdagi so'z",
        "correct": false
      }
    ]
  },
  {
    "number": 18,
    "question": "Quyidagilardan qaysi biri terminologik so'z?",
    "answers": [
      {
        "label": "A",
        "text": "uy",
        "correct": false
      },
      {
        "label": "B",
        "text": "morfema",
        "correct": true
      },
      {
        "label": "C",
        "text": "yugurib",
        "correct": false
      },
      {
        "label": "D",
        "text": "chiroyli",
        "correct": false
      }
    ]
  },
  {
    "number": 19,
    "question": "\"Neologizm\" deganda nimani tushunamiz?",
    "answers": [
      {
        "label": "A",
        "text": "Eskirgan so'z",
        "correct": false
      },
      {
        "label": "B",
        "text": "Shevaga xos so'z",
        "correct": false
      },
      {
        "label": "C",
        "text": "Muallif tomonidan yangi yasalgan yoki kirib kelgan so'z",
        "correct": true
      },
      {
        "label": "D",
        "text": "Ko'chma ma'nodagi so'z",
        "correct": false
      }
    ]
  },
  {
    "number": 20,
    "question": "\"Qo'l bermoq\" iborasining ma'nosi qaysi?",
    "answers": [
      {
        "label": "A",
        "text": "Qo'lini uzatmoq",
        "correct": false
      },
      {
        "label": "B",
        "text": "Yordam bermoq",
        "correct": true
      },
      {
        "label": "C",
        "text": "Salom bermoq",
        "correct": false
      },
      {
        "label": "D",
        "text": "Topshirmoq",
        "correct": false
      }
    ]
  },
  {
    "number": 21,
    "question": "\"O'quvchilar\" so'zidagi \"-lar\" qo'shimchasi qanday qo'shimcha?",
    "answers": [
      {
        "label": "A",
        "text": "So'z yasovchi",
        "correct": false
      },
      {
        "label": "B",
        "text": "Shakl yasovchi (ko'plik)",
        "correct": true
      },
      {
        "label": "C",
        "text": "Lug'aviy",
        "correct": false
      },
      {
        "label": "D",
        "text": "Bog'lovchi",
        "correct": false
      }
    ]
  },
  {
    "number": 22,
    "question": "O'zbek tilida ot so'z turkumining qanday grammatik kategoriyalari bor?",
    "answers": [
      {
        "label": "A",
        "text": "Zamon, shaxs, son",
        "correct": false
      },
      {
        "label": "B",
        "text": "Son, kelishik, egalik",
        "correct": true
      },
      {
        "label": "C",
        "text": "Daraja, son, shaxs",
        "correct": false
      },
      {
        "label": "D",
        "text": "Kelishik, daraja, zamon",
        "correct": false
      }
    ]
  },
  {
    "number": 23,
    "question": "\"Yaxshilik\" so'zi qanday yo'l bilan yasalgan?",
    "answers": [
      {
        "label": "A",
        "text": "Qo'shma usulda",
        "correct": false
      },
      {
        "label": "B",
        "text": "Qo'shimcha usulda (affиксация)",
        "correct": true
      },
      {
        "label": "C",
        "text": "Juftlash usulida",
        "correct": false
      },
      {
        "label": "D",
        "text": "Qisqartma usulida",
        "correct": false
      }
    ]
  },
  {
    "number": 24,
    "question": "Fe'lning qaysi shakli harakat nomi deyiladi?",
    "answers": [
      {
        "label": "A",
        "text": "\"-gan\" qo'shimchali shakl",
        "correct": false
      },
      {
        "label": "B",
        "text": "\"-moq\" qo'shimchali shakl (masdар)",
        "correct": true
      },
      {
        "label": "C",
        "text": "\"-yapti\" qo'shimchali shakl",
        "correct": false
      },
      {
        "label": "D",
        "text": "\"-adi\" qo'shimchali shakl",
        "correct": false
      }
    ]
  },
  {
    "number": 25,
    "question": "Quyidagi so'zlardan qaysi biri olmosh?",
    "answers": [
      {
        "label": "A",
        "text": "baland",
        "correct": false
      },
      {
        "label": "B",
        "text": "u",
        "correct": true
      },
      {
        "label": "C",
        "text": "yugurdi",
        "correct": false
      },
      {
        "label": "D",
        "text": "kitob",
        "correct": false
      }
    ]
  },
  {
    "number": 26,
    "question": "\"Sеvimli\" so'zi qanday so'z turkumiga kiradi?",
    "answers": [
      {
        "label": "A",
        "text": "Ot",
        "correct": false
      },
      {
        "label": "B",
        "text": "Fe'l",
        "correct": false
      },
      {
        "label": "C",
        "text": "Sifat",
        "correct": true
      },
      {
        "label": "D",
        "text": "Ravish",
        "correct": false
      }
    ]
  },
  {
    "number": 27,
    "question": "O'zbek tilida kelishiklarning umumiy soni nechta?",
    "answers": [
      {
        "label": "A",
        "text": "4",
        "correct": false
      },
      {
        "label": "B",
        "text": "5",
        "correct": false
      },
      {
        "label": "C",
        "text": "6",
        "correct": true
      },
      {
        "label": "D",
        "text": "7",
        "correct": false
      }
    ]
  },
  {
    "number": 28,
    "question": "\"Tez-tez\" so'zi qaysi so'z turkumiga kiradi?",
    "answers": [
      {
        "label": "A",
        "text": "Sifat",
        "correct": false
      },
      {
        "label": "B",
        "text": "Ravish",
        "correct": true
      },
      {
        "label": "C",
        "text": "Ot",
        "correct": false
      },
      {
        "label": "D",
        "text": "Olmosh",
        "correct": false
      }
    ]
  },
  {
    "number": 29,
    "question": "Fe'lning nisbat kategoriyasi nechta turga bo'linadi?",
    "answers": [
      {
        "label": "A",
        "text": "3",
        "correct": false
      },
      {
        "label": "B",
        "text": "4",
        "correct": false
      },
      {
        "label": "C",
        "text": "5",
        "correct": true
      },
      {
        "label": "D",
        "text": "6",
        "correct": false
      }
    ]
  },
  {
    "number": 30,
    "question": "Quyidagi so'zlardan qaysi biri son so'z turkumiga kiradi?",
    "answers": [
      {
        "label": "A",
        "text": "birinchi",
        "correct": true
      },
      {
        "label": "B",
        "text": "birdan",
        "correct": false
      },
      {
        "label": "C",
        "text": "birlik",
        "correct": false
      },
      {
        "label": "D",
        "text": "birga",
        "correct": false
      }
    ]
  },
  {
    "number": 31,
    "question": "\"Ko'rindi\" fe'lining nisbati qaysi?",
    "answers": [
      {
        "label": "A",
        "text": "Majhul nisbat",
        "correct": true
      },
      {
        "label": "B",
        "text": "O'zlik nisbat",
        "correct": false
      },
      {
        "label": "C",
        "text": "Orttirma nisbat",
        "correct": false
      },
      {
        "label": "D",
        "text": "Birgalik nisbat",
        "correct": false
      }
    ]
  },
  {
    "number": 32,
    "question": "\"Agar\" so'zi qaysi so'z turkumiga kiradi?",
    "answers": [
      {
        "label": "A",
        "text": "Bog'lovchi",
        "correct": true
      },
      {
        "label": "B",
        "text": "Yukama",
        "correct": false
      },
      {
        "label": "C",
        "text": "Undov",
        "correct": false
      },
      {
        "label": "D",
        "text": "Modal so'z",
        "correct": false
      }
    ]
  },
  {
    "number": 33,
    "question": "Qaysi qo'shimcha egalik qo'shimchasi hisoblanadi?",
    "answers": [
      {
        "label": "A",
        "text": "-lar",
        "correct": false
      },
      {
        "label": "B",
        "text": "-ning",
        "correct": false
      },
      {
        "label": "C",
        "text": "-im",
        "correct": true
      },
      {
        "label": "D",
        "text": "-da",
        "correct": false
      }
    ]
  },
  {
    "number": 34,
    "question": "\"Kitobxon\" so'zidagi \"-xon\" qo'shimchasi qanday ma'no beradi?",
    "answers": [
      {
        "label": "A",
        "text": "Kichraytirish ma'nosi",
        "correct": false
      },
      {
        "label": "B",
        "text": "Kasbni bildiradi",
        "correct": true
      },
      {
        "label": "C",
        "text": "Ko'plik ma'nosi",
        "correct": false
      },
      {
        "label": "D",
        "text": "Belgini bildiradi",
        "correct": false
      }
    ]
  },
  {
    "number": 35,
    "question": "Fe'lning buyruq mayli qanday shakllanadi?",
    "answers": [
      {
        "label": "A",
        "text": "-di qo'shimchasi bilan",
        "correct": false
      },
      {
        "label": "B",
        "text": "-sa qo'shimchasi bilan",
        "correct": false
      },
      {
        "label": "C",
        "text": "Fe'l o'zagiga shaxs-son qo'shimchalari qo'shilishi bilan",
        "correct": true
      },
      {
        "label": "D",
        "text": "-moqchi qo'shimchasi bilan",
        "correct": false
      }
    ]
  },
  {
    "number": 36,
    "question": "Gap bo'laklarining asosiy turi qaysi?",
    "answers": [
      {
        "label": "A",
        "text": "Ega va kesim",
        "correct": true
      },
      {
        "label": "B",
        "text": "To'ldiruvchi va aniqlovchi",
        "correct": false
      },
      {
        "label": "C",
        "text": "Hol va kesim",
        "correct": false
      },
      {
        "label": "D",
        "text": "Undalma va kirish so'z",
        "correct": false
      }
    ]
  },
  {
    "number": 37,
    "question": "\"Bolalar bahçada o'ynashyapti\" gapida qaysi bo'lak yo'q?",
    "answers": [
      {
        "label": "A",
        "text": "Ega",
        "correct": false
      },
      {
        "label": "B",
        "text": "Kesim",
        "correct": false
      },
      {
        "label": "C",
        "text": "To'ldiruvchi",
        "correct": true
      },
      {
        "label": "D",
        "text": "Hol",
        "correct": false
      }
    ]
  },
  {
    "number": 38,
    "question": "Qaysi gap qo'shma gapning turi hisoblanadi?",
    "answers": [
      {
        "label": "A",
        "text": "Sodda yoyiq gap",
        "correct": false
      },
      {
        "label": "B",
        "text": "Bog'langan qo'shma gap",
        "correct": true
      },
      {
        "label": "C",
        "text": "Sodda yassi gap",
        "correct": false
      },
      {
        "label": "D",
        "text": "To'liqsiz gap",
        "correct": false
      }
    ]
  },
  {
    "number": 39,
    "question": "\"Men kitob o'qidim\" gapida \"kitob\" qanday bo'lak?",
    "answers": [
      {
        "label": "A",
        "text": "Ega",
        "correct": false
      },
      {
        "label": "B",
        "text": "Kesim",
        "correct": false
      },
      {
        "label": "C",
        "text": "To'ldiruvchi",
        "correct": true
      },
      {
        "label": "D",
        "text": "Aniqlovchi",
        "correct": false
      }
    ]
  },
  {
    "number": 40,
    "question": "Uyushiq bo'laklar qanday bog'lanadi?",
    "answers": [
      {
        "label": "A",
        "text": "Faqat bog'lovchilar yordamida",
        "correct": false
      },
      {
        "label": "B",
        "text": "Faqat intonatsiya yordamida",
        "correct": false
      },
      {
        "label": "C",
        "text": "Bog'lovchilar yoki intonatsiya yordamida",
        "correct": true
      },
      {
        "label": "D",
        "text": "Kelishik qo'shimchalari yordamida",
        "correct": false
      }
    ]
  },
  {
    "number": 41,
    "question": "\"Ajratilgan bo'lak\" nima?",
    "answers": [
      {
        "label": "A",
        "text": "Gapda ikki marta qo'llangan bo'lak",
        "correct": false
      },
      {
        "label": "B",
        "text": "Intonatsiya bilan ajratilib, qo'shimcha ma'no ifodalovchi bo'lak",
        "correct": true
      },
      {
        "label": "C",
        "text": "Gapning bosh bo'lagi",
        "correct": false
      },
      {
        "label": "D",
        "text": "Ikkilamchi bo'lak",
        "correct": false
      }
    ]
  },
  {
    "number": 42,
    "question": "\"Undalma\" gapning qaysi bo'lagiga kiradi?",
    "answers": [
      {
        "label": "A",
        "text": "Bosh bo'laklar",
        "correct": false
      },
      {
        "label": "B",
        "text": "Ikkinchi darajali bo'laklar",
        "correct": false
      },
      {
        "label": "C",
        "text": "Gapning bo'lagi emas",
        "correct": true
      },
      {
        "label": "D",
        "text": "Ega vazifasini bajaradi",
        "correct": false
      }
    ]
  },
  {
    "number": 43,
    "question": "Ergash gapning asosiy turlaridan biri qaysi?",
    "answers": [
      {
        "label": "A",
        "text": "Bog'langan gap",
        "correct": false
      },
      {
        "label": "B",
        "text": "Shart ergash gapi",
        "correct": true
      },
      {
        "label": "C",
        "text": "Uyushiq bo'lakli gap",
        "correct": false
      },
      {
        "label": "D",
        "text": "To'liqsiz gap",
        "correct": false
      }
    ]
  },
  {
    "number": 44,
    "question": "\"Kecha men kitob o'qidim\" gapida \"kecha\" so'zi qanday bo'lak?",
    "answers": [
      {
        "label": "A",
        "text": "Ega",
        "correct": false
      },
      {
        "label": "B",
        "text": "To'ldiruvchi",
        "correct": false
      },
      {
        "label": "C",
        "text": "Payt holi",
        "correct": true
      },
      {
        "label": "D",
        "text": "Aniqlovchi",
        "correct": false
      }
    ]
  },
  {
    "number": 45,
    "question": "Gapning grammatik asosi nima?",
    "answers": [
      {
        "label": "A",
        "text": "Ega + to'ldiruvchi",
        "correct": false
      },
      {
        "label": "B",
        "text": "Ega + kesim",
        "correct": true
      },
      {
        "label": "C",
        "text": "Kesim + hol",
        "correct": false
      },
      {
        "label": "D",
        "text": "Aniqlovchi + ega",
        "correct": false
      }
    ]
  },
  {
    "number": 46,
    "question": "Quyidagi gaplardan qaysi biri nominativ gap?",
    "answers": [
      {
        "label": "A",
        "text": "Men boraman.",
        "correct": false
      },
      {
        "label": "B",
        "text": "Bahor!",
        "correct": true
      },
      {
        "label": "C",
        "text": "U ketdi.",
        "correct": false
      },
      {
        "label": "D",
        "text": "Ular o'qishadi.",
        "correct": false
      }
    ]
  },
  {
    "number": 47,
    "question": "\"Bog'langan qo'shma gap\" qanday gap?",
    "answers": [
      {
        "label": "A",
        "text": "Ergash va bosh gapdan iborat",
        "correct": false
      },
      {
        "label": "B",
        "text": "Teng bog'lovchilar yordamida birlashgan sodda gaplar yig'indisi",
        "correct": true
      },
      {
        "label": "C",
        "text": "Faqat intonatsiya bilan birlashgan gaplar",
        "correct": false
      },
      {
        "label": "D",
        "text": "Shart ma'noli gaplar",
        "correct": false
      }
    ]
  },
  {
    "number": 48,
    "question": "Quyidagi qaysi so'z gapda aniqlovchi bo'la oladi?",
    "answers": [
      {
        "label": "A",
        "text": "Tez",
        "correct": false
      },
      {
        "label": "B",
        "text": "Chiroyli",
        "correct": true
      },
      {
        "label": "C",
        "text": "Ketdi",
        "correct": false
      },
      {
        "label": "D",
        "text": "U yerda",
        "correct": false
      }
    ]
  },
  {
    "number": 49,
    "question": "\"Kirish so'z\"ning vazifasi nima?",
    "answers": [
      {
        "label": "A",
        "text": "Gapning bosh bo'lagi sifatida xizmat qiladi",
        "correct": false
      },
      {
        "label": "B",
        "text": "Gapdagi voqeaga munosabatni ifodalaydi, bo'lak vazifasini bajarmaydi",
        "correct": true
      },
      {
        "label": "C",
        "text": "Ega bilan kelishikda birikadi",
        "correct": false
      },
      {
        "label": "D",
        "text": "Kesimni aniqlab keladi",
        "correct": false
      }
    ]
  },
  {
    "number": 50,
    "question": "\"Men ham, sen ham ketamiz\" gapidagi \"ham\" qanday bog'lovchi?",
    "answers": [
      {
        "label": "A",
        "text": "Zidlov bog'lovchi",
        "correct": false
      },
      {
        "label": "B",
        "text": "Ayiruv bog'lovchi",
        "correct": false
      },
      {
        "label": "C",
        "text": "Inkor bog'lovchi",
        "correct": false
      },
      {
        "label": "D",
        "text": "Biriktiruv bog'lovchi",
        "correct": true
      }
    ]
  },
  {
    "number": 51,
    "question": "Alisher Navoiyning to'liq ismi nima?",
    "answers": [
      {
        "label": "A",
        "text": "Nizomiddin Mir Alisher",
        "correct": true
      },
      {
        "label": "B",
        "text": "G'iyosiddin Muhammad",
        "correct": false
      },
      {
        "label": "C",
        "text": "Jalolliddin Rumiy",
        "correct": false
      },
      {
        "label": "D",
        "text": "Sharafiddin Ali Yazdiy",
        "correct": false
      }
    ]
  },
  {
    "number": 52,
    "question": "Alisher Navoiyning asosiy she'riy devonlaridan biri \"Xamsa\" nechta dostondan iborat?",
    "answers": [
      {
        "label": "A",
        "text": "3",
        "correct": false
      },
      {
        "label": "B",
        "text": "4",
        "correct": false
      },
      {
        "label": "C",
        "text": "5",
        "correct": true
      },
      {
        "label": "D",
        "text": "6",
        "correct": false
      }
    ]
  },
  {
    "number": 53,
    "question": "\"Hayrat ul-abror\" dostonida qaysi mavzu asosiy o'rin tutadi?",
    "answers": [
      {
        "label": "A",
        "text": "Sevgi va ishq",
        "correct": false
      },
      {
        "label": "B",
        "text": "Axloq va insonparvarlik",
        "correct": true
      },
      {
        "label": "C",
        "text": "Vatanparvarlik",
        "correct": false
      },
      {
        "label": "D",
        "text": "Tabiatshunoslik",
        "correct": false
      }
    ]
  },
  {
    "number": 54,
    "question": "Navoiy qaysi shahrda tug'ilgan?",
    "answers": [
      {
        "label": "A",
        "text": "Samarqand",
        "correct": false
      },
      {
        "label": "B",
        "text": "Buxoro",
        "correct": false
      },
      {
        "label": "C",
        "text": "Hirot",
        "correct": true
      },
      {
        "label": "D",
        "text": "Toshkent",
        "correct": false
      }
    ]
  },
  {
    "number": 55,
    "question": "\"Muhokamat ul-lug'atayn\" asarida Navoiy qaysi masalani ko'taradi?",
    "answers": [
      {
        "label": "A",
        "text": "Fors va arab tillarini taqqoslash",
        "correct": false
      },
      {
        "label": "B",
        "text": "Turkiy tilning fors tiliga nisbatan boyligini isbotlash",
        "correct": true
      },
      {
        "label": "C",
        "text": "Arab tilining ustunligini ko'rsatish",
        "correct": false
      },
      {
        "label": "D",
        "text": "O'zbek va tojik xalqlari do'stligini ulug'lash",
        "correct": false
      }
    ]
  },
  {
    "number": 56,
    "question": "Bobur qaysi asarida o'z hayotini va zamonini tasvirlagan?",
    "answers": [
      {
        "label": "A",
        "text": "\"Muxtasar\"",
        "correct": false
      },
      {
        "label": "B",
        "text": "\"Mubayyin\"",
        "correct": false
      },
      {
        "label": "C",
        "text": "\"Boburnoma\"",
        "correct": true
      },
      {
        "label": "D",
        "text": "\"Devoni Bobur\"",
        "correct": false
      }
    ]
  },
  {
    "number": 57,
    "question": "Abdulla Qodiriyning \"O'tkan kunlar\" romani qachon yozilgan?",
    "answers": [
      {
        "label": "A",
        "text": "1919-1920",
        "correct": false
      },
      {
        "label": "B",
        "text": "1922-1924",
        "correct": true
      },
      {
        "label": "C",
        "text": "1926-1928",
        "correct": false
      },
      {
        "label": "D",
        "text": "1930-1932",
        "correct": false
      }
    ]
  },
  {
    "number": 58,
    "question": "\"O'tkan kunlar\" romanining bosh qahramoni kim?",
    "answers": [
      {
        "label": "A",
        "text": "Yusufbek hoji",
        "correct": false
      },
      {
        "label": "B",
        "text": "Otabek",
        "correct": true
      },
      {
        "label": "C",
        "text": "Kumush",
        "correct": false
      },
      {
        "label": "D",
        "text": "Hamid",
        "correct": false
      }
    ]
  },
  {
    "number": 59,
    "question": "Cho'lpon kimning taxallusi?",
    "answers": [
      {
        "label": "A",
        "text": "Abdulhamid Sulaymon o'g'li",
        "correct": true
      },
      {
        "label": "B",
        "text": "Abdulla Qodiriy",
        "correct": false
      },
      {
        "label": "C",
        "text": "Hamza Hakimzoda",
        "correct": false
      },
      {
        "label": "D",
        "text": "G'ayratiy",
        "correct": false
      }
    ]
  },
  {
    "number": 60,
    "question": "Hamza Hakimzoda Niyoziyning birinchi dramasi qaysi?",
    "answers": [
      {
        "label": "A",
        "text": "\"Boy ila xizmatchi\"",
        "correct": true
      },
      {
        "label": "B",
        "text": "\"Zaharli hayot\"",
        "correct": false
      },
      {
        "label": "C",
        "text": "\"Maysaraning ishi\"",
        "correct": false
      },
      {
        "label": "D",
        "text": "\"Ona va bola\"",
        "correct": false
      }
    ]
  },
  {
    "number": 61,
    "question": "Oybek o'zbek adabiyotidagi qaysi roman bilan mashhur bo'lgan?",
    "answers": [
      {
        "label": "A",
        "text": "\"Qutlug' qon\"",
        "correct": false
      },
      {
        "label": "B",
        "text": "\"Sarob\"",
        "correct": false
      },
      {
        "label": "C",
        "text": "\"Navoi\"",
        "correct": true
      },
      {
        "label": "D",
        "text": "\"Ulug' yo'l\"",
        "correct": false
      }
    ]
  },
  {
    "number": 62,
    "question": "G'afur G'ulomning \"Shum bola\" asari qaysi janrda yozilgan?",
    "answers": [
      {
        "label": "A",
        "text": "Roman",
        "correct": false
      },
      {
        "label": "B",
        "text": "Qissa",
        "correct": true
      },
      {
        "label": "C",
        "text": "Hikoya",
        "correct": false
      },
      {
        "label": "D",
        "text": "Pyesa",
        "correct": false
      }
    ]
  },
  {
    "number": 63,
    "question": "Abdulla Oripov qaysi she'riy to'plami uchun Davlat mukofotiga sazovor bo'lgan?",
    "answers": [
      {
        "label": "A",
        "text": "\"Istiqlol\"",
        "correct": false
      },
      {
        "label": "B",
        "text": "\"Mehrob\"",
        "correct": true
      },
      {
        "label": "C",
        "text": "\"Oq bulutlar\"",
        "correct": false
      },
      {
        "label": "D",
        "text": "\"Jahon manzarasi\"",
        "correct": false
      }
    ]
  },
  {
    "number": 64,
    "question": "Erkin Vohidov qaysi asari bilan mashhur?",
    "answers": [
      {
        "label": "A",
        "text": "\"Ruboiylar\"",
        "correct": false
      },
      {
        "label": "B",
        "text": "\"Nur borki, soya bor\"",
        "correct": true
      },
      {
        "label": "C",
        "text": "\"O'zbekiston\"",
        "correct": false
      },
      {
        "label": "D",
        "text": "\"Munojot\"",
        "correct": false
      }
    ]
  },
  {
    "number": 65,
    "question": "Navoiyning \"Farhod va Shirin\" dostonidagi bosh qahramon Farhod qaysi kasbning vakili?",
    "answers": [
      {
        "label": "A",
        "text": "Shoir",
        "correct": false
      },
      {
        "label": "B",
        "text": "Jangchi",
        "correct": false
      },
      {
        "label": "C",
        "text": "Toshchi va muhandis",
        "correct": true
      },
      {
        "label": "D",
        "text": "Savdogar",
        "correct": false
      }
    ]
  },
  {
    "number": 66,
    "question": "\"Alpomish\" dostoni qaysi xalqqa tegishli?",
    "answers": [
      {
        "label": "A",
        "text": "Faqat o'zbek xalqiga",
        "correct": false
      },
      {
        "label": "B",
        "text": "Faqat qozoq xalqiga",
        "correct": false
      },
      {
        "label": "C",
        "text": "O'zbek, qozoq va boshqa turkiy xalqlarga",
        "correct": true
      },
      {
        "label": "D",
        "text": "Tojik xalqiga",
        "correct": false
      }
    ]
  },
  {
    "number": 67,
    "question": "Lutfiyning to'liq ismi nima?",
    "answers": [
      {
        "label": "A",
        "text": "Mahmud Shayboniy",
        "correct": false
      },
      {
        "label": "B",
        "text": "Mahmud ibn Ahmad",
        "correct": false
      },
      {
        "label": "C",
        "text": "Xo'ja Mahmud Lutfiy",
        "correct": true
      },
      {
        "label": "D",
        "text": "Yusuf Amiriy",
        "correct": false
      }
    ]
  },
  {
    "number": 68,
    "question": "Said Ahmad \"Ufq\" romanini qaysi yillarda yozgan?",
    "answers": [
      {
        "label": "A",
        "text": "1950-1955",
        "correct": false
      },
      {
        "label": "B",
        "text": "1959-1969",
        "correct": true
      },
      {
        "label": "C",
        "text": "1970-1975",
        "correct": false
      },
      {
        "label": "D",
        "text": "1980-1985",
        "correct": false
      }
    ]
  },
  {
    "number": 69,
    "question": "Pirimqul Qodirovning tarixiy romanlari asosan qaysi davr bilan bog'liq?",
    "answers": [
      {
        "label": "A",
        "text": "Amir Temur davri",
        "correct": false
      },
      {
        "label": "B",
        "text": "Navoiy va Husayn Boyqaro davri",
        "correct": false
      },
      {
        "label": "C",
        "text": "Bobur davri",
        "correct": false
      },
      {
        "label": "D",
        "text": "Barcha javoblar to'g'ri",
        "correct": true
      }
    ]
  },
  {
    "number": 70,
    "question": "Muqimiyning haqiqiy ismi nima?",
    "answers": [
      {
        "label": "A",
        "text": "Muhammad Aminxo'ja",
        "correct": true
      },
      {
        "label": "B",
        "text": "Muhammadali Hasanov",
        "correct": false
      },
      {
        "label": "C",
        "text": "Xolmurod Niyozov",
        "correct": false
      },
      {
        "label": "D",
        "text": "Yunusxo'ja Muqimiy",
        "correct": false
      }
    ]
  },
  {
    "number": 71,
    "question": "Furqatning haqiqiy ismi qaysi?",
    "answers": [
      {
        "label": "A",
        "text": "Abdulaziz Mirzo",
        "correct": false
      },
      {
        "label": "B",
        "text": "Zokirjon Xolmuhammad o'g'li",
        "correct": true
      },
      {
        "label": "C",
        "text": "Abdullaxon Madaminov",
        "correct": false
      },
      {
        "label": "D",
        "text": "Usmon Nosir",
        "correct": false
      }
    ]
  },
  {
    "number": 72,
    "question": "\"Devoni Hikmat\" asari kimga tegishli?",
    "answers": [
      {
        "label": "A",
        "text": "Alisher Navoiy",
        "correct": false
      },
      {
        "label": "B",
        "text": "Ahmad Yassaviy",
        "correct": true
      },
      {
        "label": "C",
        "text": "Mavlono Lutfiy",
        "correct": false
      },
      {
        "label": "D",
        "text": "Rabg'uziy",
        "correct": false
      }
    ]
  },
  {
    "number": 73,
    "question": "Abdulla Qahhorning \"Sarob\" asari qaysi janrda?",
    "answers": [
      {
        "label": "A",
        "text": "Hikoya",
        "correct": false
      },
      {
        "label": "B",
        "text": "Qissa",
        "correct": false
      },
      {
        "label": "C",
        "text": "Roman",
        "correct": true
      },
      {
        "label": "D",
        "text": "Pyesa",
        "correct": false
      }
    ]
  },
  {
    "number": 74,
    "question": "Nодir devonbegining haqiqiy ismi kim?",
    "answers": [
      {
        "label": "A",
        "text": "Muhammadrizo",
        "correct": true
      },
      {
        "label": "B",
        "text": "Xonmurod",
        "correct": false
      },
      {
        "label": "C",
        "text": "Abdullaxon",
        "correct": false
      },
      {
        "label": "D",
        "text": "Hayot Xonov",
        "correct": false
      }
    ]
  },
  {
    "number": 75,
    "question": "Cho'lponning \"Kecha va kunduz\" romani qachon yozilgan?",
    "answers": [
      {
        "label": "A",
        "text": "1930",
        "correct": false
      },
      {
        "label": "B",
        "text": "1933",
        "correct": true
      },
      {
        "label": "C",
        "text": "1936",
        "correct": false
      },
      {
        "label": "D",
        "text": "1940",
        "correct": false
      }
    ]
  },
  {
    "number": 76,
    "question": "Uilyam Shekspirning \"Romeo va Julyetta\" asari qaysi janrga kiradi?",
    "answers": [
      {
        "label": "A",
        "text": "Komediya",
        "correct": false
      },
      {
        "label": "B",
        "text": "Tragediya",
        "correct": true
      },
      {
        "label": "C",
        "text": "Dastан",
        "correct": false
      },
      {
        "label": "D",
        "text": "Ballada",
        "correct": false
      }
    ]
  },
  {
    "number": 77,
    "question": "\"Ilohiy komediya\" asarining muallifi kim?",
    "answers": [
      {
        "label": "A",
        "text": "Fransisko Petrarka",
        "correct": false
      },
      {
        "label": "B",
        "text": "Jovanni Bokkachcho",
        "correct": false
      },
      {
        "label": "C",
        "text": "Dante Aligeri",
        "correct": true
      },
      {
        "label": "D",
        "text": "Chosser",
        "correct": false
      }
    ]
  },
  {
    "number": 78,
    "question": "Lev Tolstoyning \"Urush va tinchlik\" romanidagi asosiy voqealar qaysi davr bilan bog'liq?",
    "answers": [
      {
        "label": "A",
        "text": "1789–1793-yillar Fransuz inqilobi",
        "correct": false
      },
      {
        "label": "B",
        "text": "1812-yil Napoleonning Rossiyaga yurishi",
        "correct": true
      },
      {
        "label": "C",
        "text": "Qrim urushi (1853–1856)",
        "correct": false
      },
      {
        "label": "D",
        "text": "Birinchi jahon urushi",
        "correct": false
      }
    ]
  },
  {
    "number": 79,
    "question": "Fyodor Dostoyevskiyning \"Jinoyat va jazo\" romanidagi bosh qahramon kim?",
    "answers": [
      {
        "label": "A",
        "text": "Myshkin",
        "correct": false
      },
      {
        "label": "B",
        "text": "Raskolnikov",
        "correct": true
      },
      {
        "label": "C",
        "text": "Alyosha",
        "correct": false
      },
      {
        "label": "D",
        "text": "Karamazov",
        "correct": false
      }
    ]
  },
  {
    "number": 80,
    "question": "\"Don Kixot\" asarini kim yozgan?",
    "answers": [
      {
        "label": "A",
        "text": "Lope de Vega",
        "correct": false
      },
      {
        "label": "B",
        "text": "Fransisko Kеvedo",
        "correct": false
      },
      {
        "label": "C",
        "text": "Migel de Servantes",
        "correct": true
      },
      {
        "label": "D",
        "text": "Pedro Kalderon",
        "correct": false
      }
    ]
  },
  {
    "number": 81,
    "question": "Garsiуa Lorka qaysi mamlakat adabiyotining vakili?",
    "answers": [
      {
        "label": "A",
        "text": "Argentina",
        "correct": false
      },
      {
        "label": "B",
        "text": "Italiya",
        "correct": false
      },
      {
        "label": "C",
        "text": "Ispaniya",
        "correct": true
      },
      {
        "label": "D",
        "text": "Meksika",
        "correct": false
      }
    ]
  },
  {
    "number": 82,
    "question": "Ernest Xemingueyning qaysi asari 1954-yil Nobel mukofotiga sabab bo'ldi?",
    "answers": [
      {
        "label": "A",
        "text": "\"Alvido, qurol!\"",
        "correct": false
      },
      {
        "label": "B",
        "text": "\"Qo'ng'iroq kim uchun jiringlaydi\"",
        "correct": false
      },
      {
        "label": "C",
        "text": "\"Chol va dengiz\"",
        "correct": true
      },
      {
        "label": "D",
        "text": "\"Moviy tepaliklarning oq fillari\"",
        "correct": false
      }
    ]
  },
  {
    "number": 83,
    "question": "\"Gamlet\" asarida Gamletning otasini kim o'ldirgan?",
    "answers": [
      {
        "label": "A",
        "text": "Laert",
        "correct": false
      },
      {
        "label": "B",
        "text": "Poloniy",
        "correct": false
      },
      {
        "label": "C",
        "text": "Klavdiy (amakisi)",
        "correct": true
      },
      {
        "label": "D",
        "text": "Gildenstern",
        "correct": false
      }
    ]
  },
  {
    "number": 84,
    "question": "Anton Chexovning \"Olcha bog'i\" pyesasida asosiy muammo nima?",
    "answers": [
      {
        "label": "A",
        "text": "Sevgi dramasi",
        "correct": false
      },
      {
        "label": "B",
        "text": "Ijtimoiy o'zgarish va eski dvoryan hayotining barham topishi",
        "correct": true
      },
      {
        "label": "C",
        "text": "Urush va tinchlik",
        "correct": false
      },
      {
        "label": "D",
        "text": "Axloqiy tanazzul",
        "correct": false
      }
    ]
  },
  {
    "number": 85,
    "question": "\"Madam Bovari\" romanining muallifi kim?",
    "answers": [
      {
        "label": "A",
        "text": "Onoré de Balzak",
        "correct": false
      },
      {
        "label": "B",
        "text": "Gyustav Flober",
        "correct": true
      },
      {
        "label": "C",
        "text": "Stendal",
        "correct": false
      },
      {
        "label": "D",
        "text": "Emil Zolya",
        "correct": false
      }
    ]
  },
  {
    "number": 86,
    "question": "Jorj Gordon Bayron qaysi adabiy oqimning yirik vakili?",
    "answers": [
      {
        "label": "A",
        "text": "Klassitsizm",
        "correct": false
      },
      {
        "label": "B",
        "text": "Realizm",
        "correct": false
      },
      {
        "label": "C",
        "text": "Romantizm",
        "correct": true
      },
      {
        "label": "D",
        "text": "Naturalizm",
        "correct": false
      }
    ]
  },
  {
    "number": 87,
    "question": "\"Oliver Tvistning sarguzashtlari\" asarining muallifi kim?",
    "answers": [
      {
        "label": "A",
        "text": "Uilyam Tekkerei",
        "correct": false
      },
      {
        "label": "B",
        "text": "Charlz Dikkens",
        "correct": true
      },
      {
        "label": "C",
        "text": "Tomas Garди",
        "correct": false
      },
      {
        "label": "D",
        "text": "Entoni Trollop",
        "correct": false
      }
    ]
  },
  {
    "number": 88,
    "question": "Iogann Volfgang Gyotening \"Faust\" asarida Faust qaysi narsa uchun shayton bilan bitim tuzadi?",
    "answers": [
      {
        "label": "A",
        "text": "Boylik uchun",
        "correct": false
      },
      {
        "label": "B",
        "text": "Shuhrat uchun",
        "correct": false
      },
      {
        "label": "C",
        "text": "Cheksiz bilim va to'la huzur uchun",
        "correct": true
      },
      {
        "label": "D",
        "text": "Abadiy hayot uchun",
        "correct": false
      }
    ]
  },
  {
    "number": 89,
    "question": "\"Anna Karenina\" romanining muallifi kim?",
    "answers": [
      {
        "label": "A",
        "text": "Ivan Turgenev",
        "correct": false
      },
      {
        "label": "B",
        "text": "Fyodor Dostoyevskiy",
        "correct": false
      },
      {
        "label": "C",
        "text": "Lev Tolstoy",
        "correct": true
      },
      {
        "label": "D",
        "text": "Nikolay Gogol",
        "correct": false
      }
    ]
  },
  {
    "number": 90,
    "question": "\"Tomas Bekket\" pyesasining muallifi kim va u qaysi adabiy oqimga mansub?",
    "answers": [
      {
        "label": "A",
        "text": "Bryext – epik teatr",
        "correct": false
      },
      {
        "label": "B",
        "text": "Jan Anuy – neoklassitsizm",
        "correct": true
      },
      {
        "label": "C",
        "text": "Bekkel – absurd teatri",
        "correct": false
      },
      {
        "label": "D",
        "text": "Ionеsko – ekspressіonizm",
        "correct": false
      }
    ]
  },
  {
    "number": 91,
    "question": "Fransua Rable qaysi asari bilan mashhur?",
    "answers": [
      {
        "label": "A",
        "text": "\"Pantagryuel va Gargantyua\"",
        "correct": true
      },
      {
        "label": "B",
        "text": "\"Dekameron\"",
        "correct": false
      },
      {
        "label": "C",
        "text": "\"Kanterberі hikoyalari\"",
        "correct": false
      },
      {
        "label": "D",
        "text": "\"Utopiya\"",
        "correct": false
      }
    ]
  },
  {
    "number": 92,
    "question": "\"Dengiz ostida sayohat\" va \"Yer ostida sayohat\" kabi asarlar kimga tegishli?",
    "answers": [
      {
        "label": "A",
        "text": "Gyerbert Uells",
        "correct": false
      },
      {
        "label": "B",
        "text": "Zhyul Vern",
        "correct": true
      },
      {
        "label": "C",
        "text": "Artur Konan Doyl",
        "correct": false
      },
      {
        "label": "D",
        "text": "Robert Luis Stivenson",
        "correct": false
      }
    ]
  },
  {
    "number": 93,
    "question": "\"Inson komediyasi\" turkumi qaysi muallif qalamiga mansub?",
    "answers": [
      {
        "label": "A",
        "text": "Victor Hugo",
        "correct": false
      },
      {
        "label": "B",
        "text": "Onoré de Balzak",
        "correct": true
      },
      {
        "label": "C",
        "text": "Gyustav Flober",
        "correct": false
      },
      {
        "label": "D",
        "text": "Stendal",
        "correct": false
      }
    ]
  },
  {
    "number": 94,
    "question": "\"1984\" antiutopik romanining muallifi kim?",
    "answers": [
      {
        "label": "A",
        "text": "Aldous Huxli",
        "correct": false
      },
      {
        "label": "B",
        "text": "Jorj Orуell",
        "correct": true
      },
      {
        "label": "C",
        "text": "Rэй Bredberi",
        "correct": false
      },
      {
        "label": "D",
        "text": "Uilyam Golding",
        "correct": false
      }
    ]
  },
  {
    "number": 95,
    "question": "Magik realizm adabiy oqimining asosiy vakili kimdir?",
    "answers": [
      {
        "label": "A",
        "text": "Pablo Neruda",
        "correct": false
      },
      {
        "label": "B",
        "text": "Garsiуa Markes",
        "correct": true
      },
      {
        "label": "C",
        "text": "Xorxe Luis Borxes",
        "correct": false
      },
      {
        "label": "D",
        "text": "Oktyavio Pas",
        "correct": false
      }
    ]
  },
  {
    "number": 96,
    "question": "\"Yuz yillik yolg'izlik\" romanida qaysi oila tarixi tasvirlangan?",
    "answers": [
      {
        "label": "A",
        "text": "Buendia oilasi",
        "correct": true
      },
      {
        "label": "B",
        "text": "Karamazov oilasi",
        "correct": false
      },
      {
        "label": "C",
        "text": "Bennet oilasi",
        "correct": false
      },
      {
        "label": "D",
        "text": "Bovari oilasi",
        "correct": false
      }
    ]
  },
  {
    "number": 97,
    "question": "\"Jinlar\" romanini kim yozgan?",
    "answers": [
      {
        "label": "A",
        "text": "Lev Tolstoy",
        "correct": false
      },
      {
        "label": "B",
        "text": "Ivan Turgenev",
        "correct": false
      },
      {
        "label": "C",
        "text": "Fyodor Dostoyevskiy",
        "correct": true
      },
      {
        "label": "D",
        "text": "Maksim Gorkiy",
        "correct": false
      }
    ]
  },
  {
    "number": 98,
    "question": "Antik yunon dramaturgiyasidagi \"katarsis\" tushunchasi nimani anglatadi?",
    "answers": [
      {
        "label": "A",
        "text": "Sahnada vaqtning birligiga rioya qilish",
        "correct": false
      },
      {
        "label": "B",
        "text": "Tomoshabin ruhiyatining zavq va rahm-shafqat orqali tozalanishi",
        "correct": true
      },
      {
        "label": "C",
        "text": "Asardagi bosh konflikt",
        "correct": false
      },
      {
        "label": "D",
        "text": "Qahramonning fojiaviy xatosi",
        "correct": false
      }
    ]
  },
  {
    "number": 99,
    "question": "Gomer kimning asarlari hisoblanadi?",
    "answers": [
      {
        "label": "A",
        "text": "\"Odisseya\" va \"Iliada\"",
        "correct": true
      },
      {
        "label": "B",
        "text": "\"Teogoniya\" va \"Theogoniya\"",
        "correct": false
      },
      {
        "label": "C",
        "text": "\"Metаmorfozy\" va \"Enеida\"",
        "correct": false
      },
      {
        "label": "D",
        "text": "\"Antologiya\" va \"Epoda\"",
        "correct": false
      }
    ]
  },
  {
    "number": 100,
    "question": "\"Egzistentsializm\" adabiy-falsafiy oqimining asosiy vakili hisoblangan frantsuz yozuvchi kim?",
    "answers": [
      {
        "label": "A",
        "text": "Albert Kamyu",
        "correct": true
      },
      {
        "label": "B",
        "text": "Emil Zolya",
        "correct": false
      },
      {
        "label": "C",
        "text": "Mopassan",
        "correct": false
      },
      {
        "label": "D",
        "text": "Anatol Frans",
        "correct": false
      }
    ]
  }
];

const QUESTION_TIME_SECONDS = 15;
const TOTAL_TIME_SECONDS = quizQuestions.length * QUESTION_TIME_SECONDS;
const RESULT_MESSAGES = [
  { min: 90, text: "A'lo natija! Siz mavzuni juda yaxshi egallagansiz." },
  { min: 75, text: "Zo'r! Bilimingiz mustahkam, faqat ayrim mavzularni takrorlang." },
  { min: 60, text: "Yaxshi natija. Xatolarni ko'rib chiqsangiz, ball yanada oshadi." },
  { min: 40, text: "O'rtacha natija. Grammatik va adabiyot bo'limlarini qayta ko'rib chiqing." },
  { min: 0, text: "Mashqni davom ettiring. Har bir urinish bilimni kuchaytiradi." },
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

freeQuizButton.addEventListener("click", showStartScreen);
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function showStartScreen() {
  switchScreen(landingScreen, startScreen);
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  answersDisabled = false;
  remainingSeconds = TOTAL_TIME_SECONDS;

  scoreSpan.textContent = score;
  updateTimer();
  switchScreen(startScreen, quizScreen);
  showQuestion();
  startTimer();
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  progressBar.style.width = "0%";
  scoreRing.style.setProperty("--score-angle", "0deg");
  startQuiz();
}

function showQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  answersDisabled = false;

  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  questionText.textContent = currentQuestion.question;
  progressBar.style.width = `${(currentQuestionIndex / quizQuestions.length) * 100}%`;

  answersContainer.innerHTML = "";
  answersContainer.classList.remove("question-enter");
  void answersContainer.offsetWidth;
  answersContainer.classList.add("question-enter");

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.type = "button";
    button.dataset.correct = String(answer.correct);
    button.innerHTML = `
      <span class="answer-label">${answer.label}</span>
      <span class="answer-text">${escapeHtml(answer.text)}</span>
    `;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;

  answersDisabled = true;
  const selectedButton = event.currentTarget;
  const isCorrect = selectedButton.dataset.correct === "true";

  if (isCorrect) {
    score += 1;
    scoreSpan.textContent = score;
  }

  revealAnswers(selectedButton);

  window.setTimeout(() => {
    currentQuestionIndex += 1;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
      return;
    }
    showResults();
  }, 850);
}

function revealAnswers(selectedButton) {
  Array.from(answersContainer.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });
}

function startTimer() {
  clearInterval(timerId);
  timerId = window.setInterval(() => {
    remainingSeconds -= 1;
    updateTimer();

    if (remainingSeconds <= 0) {
      showResults();
    }
  }, 1000);
}

function updateTimer() {
  timerElement.textContent = formatTime(Math.max(remainingSeconds, 0));
  timerCard.classList.toggle("warning", remainingSeconds <= 60);
}

function showResults() {
  clearInterval(timerId);
  answersDisabled = true;
  progressBar.style.width = "100%";
  switchScreen(quizScreen, resultScreen);

  const percentage = Math.round((score / quizQuestions.length) * 100);
  const angle = (percentage / 100) * 360;

  finalScoreSpan.textContent = score;
  resultPercent.textContent = `${percentage}%`;
  scoreRing.style.setProperty("--score-angle", `${angle}deg`);
  resultMessage.textContent = RESULT_MESSAGES.find((message) => percentage >= message.min).text;
}

function switchScreen(currentScreen, nextScreen) {
  currentScreen.classList.remove("active");
  nextScreen.classList.add("active");
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

