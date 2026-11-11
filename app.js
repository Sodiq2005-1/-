document.addEventListener("DOMContentLoaded", () => {
    console.log("Платформаи «Академияи Рақамӣ» бо генератори саволҳои беохир оғоз шуд!");

    const welcomeModal = document.getElementById("welcomeModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const registrationForm = document.getElementById("registration-form");
    const mathContainer = document.getElementById("math-container");

    if (closeModalBtn && welcomeModal) {
        closeModalBtn.addEventListener("click", () => {
            welcomeModal.style.opacity = "0";
            setTimeout(() => {
                welcomeModal.style.display = "none";
            }, 400);
        });
    }

    const savedUser = localStorage.getItem("current_user");
    if (savedUser) {
        const userData = JSON.parse(savedUser);
        if (welcomeModal) welcomeModal.style.display = "none";
        if (registrationForm) registrationForm.style.display = "none";
        if (mathContainer) {
            mathContainer.style.display = "block";
            loadInfiniteQuestion(userData.subject || "math", userData.grade, userData.fullname);
        }
    }

    if (registrationForm) {
        registrationForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const language = document.getElementById("language-select") ? document.getElementById("language-select").value : "tg";
            const fullname = document.getElementById("fullname") ? document.getElementById("fullname").value.trim() : "";
            const grade = document.getElementById("grade-select") ? document.getElementById("grade-select").value : "";
            const subjectSelect = document.getElementById("subject-select");
            const subject = subjectSelect ? subjectSelect.value : "math";
            const school = document.getElementById("school") ? document.getElementById("school").value.trim() : "";
            const region = document.getElementById("region") ? document.getElementById("region").value.trim() : "";

            if (fullname && grade) {
                const userData = { language, fullname, grade, subject, school, region };
                localStorage.setItem("current_user", JSON.stringify(userData));

                alert(`Хуш омадед, ${fullname}! Бақайдгирӣ бо муваффақият гузашт! 🎉`);
                
                registrationForm.style.display = "none";
                if (welcomeModal) welcomeModal.style.display = "none";

                if (mathContainer) {
                    mathContainer.style.display = "block";
                    loadInfiniteQuestion(subject, grade, fullname);
                }
            } else {
                alert("Лутфан ному насаб ва синфи худро пур кунед!");
            }
        });
    }
});

// Генератори саволҳои беохир ва тасодуфӣ барои ҳамаи 10 фан
function loadInfiniteQuestion(subject, grade, fullname) {
    const mathContainer = document.getElementById("math-container");
    if (!mathContainer) return;

    let subjectName = "";
    let qData = {}; // Объект барои нигоҳ доштани савол ва ҷавоби дуруст

    switch(subject) {
        case "math":
            subjectName = "Математика";
            qData = generateMathRandom(grade);
            break;
        case "physics":
            subjectName = "Физика";
            qData = generatePhysicsRandom(grade);
            break;
        case "chemistry":
            subjectName = "Химия";
            qData = generateChemistryRandom(grade);
            break;
        case "tajik":
            subjectName = "Забони тоҷикӣ";
            qData = generateTajikRandom(grade);
            break;
        case "history":
            subjectName = "Таърихи тоҷикон";
            qData = generateHistoryRandom(grade);
            break;
        case "geography":
            subjectName = "География";
            qData = generateGeographyRandom(grade);
            break;
        case "biology":
            subjectName = "Биология";
            qData = generateBiologyRandom(grade);
            break;
        case "informatics":
            subjectName = "Информатика";
            qData = generateInformaticsRandom(grade);
            break;
        case "russian":
            subjectName = "Забони русӣ";
            qData = generateRussianRandom(grade);
            break;
        case "english":
            subjectName = "Забони англисӣ";
            qData = generateEnglishRandom(grade);
            break;
        default:
            subjectName = "Математика";
            qData = generateMathRandom(grade);
    }

    // Дар глобалӣ нигоҳ доштани ҷавоби дуруст барои санҷиш
    window.currentCorrectAnswer = qData.answer;

    mathContainer.innerHTML = `
        <div style="padding: 25px; font-family: sans-serif; background: #ffffff; border: 2px solid #007bff; border-radius: 10px; max-width: 550px; margin: 20px auto; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h3 style="color: #007bff; margin: 0;">📚 ${subjectName} (Синфи ${grade})</h3>
                <button id="change-subject" style="padding: 5px 10px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">Ивази фан</button>
            </div>
            <p style="color: #555; font-size: 13px; margin-top: 5px;">Хонанда: <b>${fullname}</b> | Реҷа: <i>Саволҳои беохир ♾️</i></p>
            <hr style="margin: 15px 0; border: 0; border-top: 1px solid #eee;">
            
            <p style="font-size: 16px; font-weight: bold; color: #333;">${qData.question}</p>
            <input type="text" id="user-answer" placeholder="Ҷавоби худро нависед..." style="padding: 10px; font-size: 16px; width: 200px; border: 1px solid #ccc; border-radius: 4px;">
            <button id="check-btn" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; margin-left: 5px;">Санҷидан</button>
            
            <div id="result-message" style="margin-top: 15px; font-weight: bold; font-size: 16px;"></div>
            <button id="next-btn" style="margin-top: 15px; padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; display: none; font-size: 15px;">Саволи баъдӣ (Беохир) ➡️</button>
        </div>
    `;

    document.getElementById("change-subject").addEventListener("click", () => {
        localStorage.removeItem("current_user");
        location.reload();
    });

    // Мантиқи санҷиши ҷавоб
    const checkBtn = document.getElementById("check-btn");
    const userAnswer = document.getElementById("user-answer");
    const resultMessage = document.getElementById("result-message");
    const nextBtn = document.getElementById("next-btn");

    checkBtn.addEventListener("click", () => {
        const userVal = userAnswer.value.trim().toLowerCase();
        const correctVal = String(window.currentCorrectAnswer).trim().toLowerCase();

        if (userVal === correctVal || userVal.includes(correctVal)) {
            resultMessage.style.color = "green";
            resultMessage.textContent = `Дуруст аст, ${fullname}! Офарин! 🌟`;
            checkBtn.style.display = "none";
            nextBtn.style.display = "inline-block";
        } else {
            resultMessage.style.color = "red";
            resultMessage.textContent = `Хато аст. Ҷавоби дуруст: "${window.currentCorrectAnswer}". Боз кӯшиш кунед!`;
        }
    });

    // Гузаштан ба саволи нави тасодуфӣ
    nextBtn.addEventListener("click", () => {
        loadInfiniteQuestion(subject, grade, fullname);
    });
}

// --- ФУНКСИЯҲОИ ТАВЛИДИ МИССОЛ ВА САВОЛҲОИ ТАСОДУФӢ БАРОИ ҲАР 10 ФАН ---

function generateMathRandom(grade) {
    let a = Math.floor(Math.random() * 50) + 2;
    let b = Math.floor(Math.random() * 20) + 2;
    let ops = ["+", "-", "×"];
    let op = ops[Math.floor(Math.random() * ops.length)];
    let res = 0;
    if (op === "+") res = a + b;
    else if (op === "-") { if(a < b) [a, b] = [b, a]; res = a - b; }
    else res = a * b;

    return { question: `Ин мисолро ҳал кунед: ${a} ${op} ${b} = ?`, answer: res };
}

function generatePhysicsRandom(grade) {
    let questions = [
        { q: "Суръати рӯшноӣ дар вакуум чанд км/с аст?", a: "300000" },
        { q: "Қувва бо кадом воҳид ченак карда мешавад?", a: "нютон" },
        { q: "Шитоби ҷозибаи Замин тақрибан чанд аст? (рақами танҳо)", a: "9.8" },
        { q: "Энергия бо кадом воҳид чен карда мешавад?", a: "жоул" }
    ];
    return questions[Math.floor(Math.random() * questions.length)];
}

function generateChemistryRandom(grade) {
    let questions = [
        { q: "Рамзи химиявии элементи «Оксиген» кадом аст?", a: "о" },
        { q: "Формулаи химиявии об кадом аст?", a: "h2o" },
        { q: "Рамзи химиявии «Водород» кадом аст?", a: "h" },
        { q: "Рамзи химиявии «Оҳан» кадом аст?", a: "fe" }
    ];
    return questions[Math.floor(Math.random() * questions.length)];
}

function generateTajikRandom(grade) {
    let questions = [
        { q: "Дар алифбои забони тоҷикӣ чанд ҳарф мавҷуд аст?", a: "35" },
        { q: "Қисми асосии мустақили нутқ, ки номи предметро ифода мекунад, чӣ номида мешавад?", a: "исм" },
        { q: "Шумора чанд хел мешавад? (бо рақам нависед)", a: "2" },
        { q: "Феъл чиро ифода мекунад?", a: "ҳаракат" }
    ];
    return questions[Math.floor(Math.random() * questions.length)];
}

function generateHistoryRandom(grade) {
    let questions = [
        { q: "Пойтахти давлати Сомониён кадом шаҳр буд?", a: "бухоро" },
        { q: "Бӯнёдгузори давлати Сомониён кист? (ном)", a: "имомӣ" },
        { q: "Шоҳномаи Фирдавсӣ дар асри чанд навишта шудааст? (масалан: X)", a: "x" },
        { q: "Давлати Кушониён дар асри чанд ба оҷил расид? (ё номи асосгузор)", a: "кадфиз" }
    ];
    return questions[Math.floor(Math.random() * questions.length)];
}

function generateGeographyRandom(grade) {
    let questions = [
        { q: "Калонтарин қитъаи Замин кадом аст?", a: "осиё" },
        { q: "Дарёи дарозтарини ҷаҳон кадом аст?", a: "нил" },
        { q: "Уқёнуси бузургтарини ҷаҳон кадом аст?", a: "ором" },
        { q: "Қуллаи баландтарини Тоҷикистон кадом аст?", a: "сомон" }
    ];
    return questions[Math.floor(Math.random() * questions.length)];
}

function generateBiologyRandom(grade) {
    let questions = [
        { q: "Илме, ки наботот ва растаниҳоро меомӯзад, чӣ ном дорад?", a: "ботаника" },
        { q: "Илме, ки ҳайвонотро меомӯзад, чӣ ном дорад?", a: "зоология" },
        { q: "Воҳиди асосии сохтории ҳама гуна организм чӣ номида мешавад?", a: "ҳуҷайра" },
        { q: "Организмҳо бо роҳи кадом ҷараён нафас мегиранд ва оксиген мегиранд?", a: "нафаскашӣ" }
    ];
    return questions[Math.floor(Math.random() * questions.length)];
}

function generateInformaticsRandom(grade) {
    let questions = [
        { q: "Воҳиди хурдтарини ченкунии ахборот дар компютер чӣ ном дорад?", a: "бит" },
        { q: "8 бит ба чанд байт баробар аст?", a: "1" },
        { q: "Қисми асосии коркарди маълумот дар компютер чӣ номида мешавад? (бо забони русӣ ё лотинӣ)", a: "cpu" },
        { q: "Барномае, ки барои кушодани саҳифаҳои интернетӣ хизмат мекунад, чӣ ном дорад?", a: "браузер" }
    ];
    return questions[Math.floor(Math.random() * questions.length)];
}

function generateRussianRandom(grade) {
    let questions = [
        { q: "Переведите на русский язык слово «Китоб»:", a: "книга" },
        { q: "Переведите на русский язык слово «Мактаб»:", a: "школа" },
        { q: "Сколько падежей в русском языке? (цифра)", a: "6" },
        { q: "Как переводится слово «Олам»?", a: "мир" }
    ];
    return questions[Math.floor(Math.random() * questions.length)];
}

function generateEnglishRandom(grade) {
    let questions = [
        { q: "Translate into English: «Мактаб»", a: "school" },
        { q: "Translate into English: «Китоб»", a: "book" },
        { q: "Translate into English: «Об»", a: "water" },
        { q: "Translate into English: «Дӯст»", a: "friend" }
    ];
    return questions[Math.floor(Math.random() * questions.length)];
}
