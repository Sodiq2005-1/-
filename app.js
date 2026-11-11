document.addEventListener("DOMContentLoaded", () => {
    console.log("Платформаи бисёрифтаи «Академияи Рақамӣ» (10 фан) оғоз ёфт!");

    const welcomeModal = document.getElementById("welcomeModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const registrationForm = document.getElementById("registration-form");
    const mathContainer = document.getElementById("math-container");

    // Пӯшидани равзанаи истиқбол бо пахши тугма
    if (closeModalBtn && welcomeModal) {
        closeModalBtn.addEventListener("click", () => {
            welcomeModal.style.opacity = "0";
            setTimeout(() => {
                welcomeModal.style.display = "none";
            }, 400);
        });
    }

    // Санҷидани он ки агар корбар аллакай бақайдгирӣ гузашта бошад
    const savedUser = localStorage.getItem("current_user");
    if (savedUser) {
        const userData = JSON.parse(savedUser);
        if (welcomeModal) welcomeModal.style.display = "none";
        if (registrationForm) registrationForm.style.display = "none";
        if (mathContainer) {
            mathContainer.style.display = "block";
            loadSubjectContent(userData.subject || "math", userData.grade);
        }
    }

    // Қисмати бақайдгирии хонанда ва захира дар LocalStorage
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
                const userData = {
                    language: language,
                    fullname: fullname,
                    grade: grade,
                    subject: subject,
                    school: school,
                    region: region
                };

                localStorage.setItem("current_user", JSON.stringify(userData));

                alert(`Хуш омадед, ${fullname}! Бақайдгирӣ бо муваффақият гузашт! 🎉`);
                
                registrationForm.style.display = "none";
                if (welcomeModal) {
                    welcomeModal.style.display = "none";
                }

                if (mathContainer) {
                    mathContainer.style.display = "block";
                    loadSubjectContent(subject, grade);
                }
            } else {
                alert("Лутфан ному насаб ва синфи худро пур кунед!");
            }
        });
    }
});

// Боргузории мазмуни фанҳои 10-гона вобаста ба синф
function loadSubjectContent(subject, grade) {
    const mathContainer = document.getElementById("math-container");
    if (!mathContainer) return;

    let subjectName = "";
    let contentHTML = "";

    switch(subject) {
        case "math":
            subjectName = "Математика";
            contentHTML = getMathHTML(grade);
            break;
        case "physics":
            subjectName = "Физика";
            contentHTML = getPhysicsHTML(grade);
            break;
        case "chemistry":
            subjectName = "Химия";
            contentHTML = getChemistryHTML(grade);
            break;
        case "tajik":
            subjectName = "Забони тоҷикӣ";
            contentHTML = getTajikHTML(grade);
            break;
        case "history":
            subjectName = "Таърихи тоҷикон";
            contentHTML = getHistoryHTML(grade);
            break;
        case "geography":
            subjectName = "География";
            contentHTML = getGeographyHTML(grade);
            break;
        case "biology":
            subjectName = "Биология";
            contentHTML = getBiologyHTML(grade);
            break;
        case "informatics":
            subjectName = "Информатика";
            contentHTML = getInformaticsHTML(grade);
            break;
        case "russian":
            subjectName = "Забони русӣ";
            contentHTML = getRussianHTML(grade);
            break;
        case "english":
            subjectName = "Забони англисӣ";
            contentHTML = getEnglishHTML(grade);
            break;
        default:
            subjectName = "Математика";
            contentHTML = getMathHTML(grade);
    }

    mathContainer.innerHTML = `
        <div style="padding: 25px; font-family: sans-serif; background: #ffffff; border: 2px solid #007bff; border-radius: 10px; max-width: 520px; margin: 20px auto; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h2 style="color: #007bff; margin: 0;">${subjectName} (Синфи ${grade})</h2>
                <button id="change-subject" style="padding: 5px 10px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">Ивази фан</button>
            </div>
            <hr style="margin: 15px 0; border: 0; border-top: 1px solid #eee;">
            ${contentHTML}
        </div>
    `;

    document.getElementById("change-subject").addEventListener("click", () => {
        localStorage.removeItem("current_user");
        location.reload();
    });

    initSubjectLogic(subject, grade);
}

// Генераторҳои саволҳо барои ҳар 10 фан
function getMathHTML(grade) {
    let n1 = Math.floor(Math.random() * 30) + 2;
    let n2 = Math.floor(Math.random() * 10) + 2;
    return `
        <p>Мисоли зеринро ҳал кунед:</p>
        <div id="exercise-box" style="font-size: 26px; margin: 15px 0; font-weight: bold;">${n1} × ${n2} = ?</div>
        <input type="number" id="user-answer" placeholder="Ҷавоб" style="padding: 8px; font-size: 16px; width: 150px;">
        <button id="check-btn" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Санҷидан</button>
        <div id="result-message" style="margin-top: 15px; font-weight: bold;"></div>
        <button id="next-btn" style="margin-top: 15px; padding: 6px 12px; background: #007bff; color: white; border: none; border-radius: 4px; display: none;">Саволи нав ➡️</button>
    `;
}

function getPhysicsHTML(grade) {
    return `
        <p><b>Савол:</b> Суръати рӯшноӣ дар холигӣ (вакуум) чанд км/с аст?</p>
        <input type="text" id="user-answer" placeholder="Масалан: 300000" style="padding: 8px; font-size: 14px; width: 180px;">
        <button id="check-btn" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Санҷидан</button>
        <div id="result-message" style="margin-top: 15px; font-weight: bold;"></div>
        <button id="next-btn" style="margin-top: 15px; padding: 6px 12px; background: #007bff; color: white; border: none; border-radius: 4px; display: none;">Саволи нав ➡️</button>
    `;
}

function getChemistryHTML(grade) {
    return `
        <p><b>Савол:</b> Рамзи химиявии элементи «Оксиген» кадом аст?</p>
        <input type="text" id="user-answer" placeholder="Ҳарф бо лотинӣ" style="padding: 8px; font-size: 14px; width: 150px;">
        <button id="check-btn" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Санҷидан</button>
        <div id="result-message" style="margin-top: 15px; font-weight: bold;"></div>
        <button id="next-btn" style="margin-top: 15px; padding: 6px 12px; background: #007bff; color: white; border: none; border-radius: 4px; display: none;">Саволи нав ➡️</button>
    `;
}

function getTajikHTML(grade) {
    return `
        <p><b>Савол:</b> Дар забони тоҷикӣ чанд ҳарф мавҷуд аст?</p>
        <input type="number" id="user-answer" placeholder="Рақам" style="padding: 8px; font-size: 16px; width: 100px;">
        <button id="check-btn" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Санҷидан</button>
        <div id="result-message" style="margin-top: 15px; font-weight: bold;"></div>
        <button id="next-btn" style="margin-top: 15px; padding: 6px 12px; background: #007bff; color: white; border: none; border-radius: 4px; display: none;">Саволи нав ➡️</button>
    `;
}

function getHistoryHTML(grade) {
    return `
        <p><b>Савол:</b> Пойтахти давлати Сомониён кадом шаҳр буд?</p>
        <input type="text" id="user-answer" placeholder="Номи шаҳр" style="padding: 8px; font-size: 14px; width: 180px;">
        <button id="check-btn" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Санҷидан</button>
        <div id="result-message" style="margin-top: 15px; font-weight: bold;"></div>
        <button id="next-btn" style="margin-top: 15px; padding: 6px 12px; background: #007bff; color: white; border: none; border-radius: 4px; display: none;">Саволи нав ➡️</button>
    `;
}

function getGeographyHTML(grade) {
    return `
        <p><b>Савол:</b> Калонтарин қитъаи Замин кадом аст?</p>
        <input type="text" id="user-answer" placeholder="Номи қитъа" style="padding: 8px; font-size: 14px; width: 180px;">
        <button id="check-btn" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Санҷидан</button>
        <div id="result-message" style="margin-top: 15px; font-weight: bold;"></div>
        <button id="next-btn" style="margin-top: 15px; padding: 6px 12px; background: #007bff; color: white; border: none; border-radius: 4px; display: none;">Саволи нав ➡️</button>
    `;
}

function getBiologyHTML(grade) {
    return `
        <p><b>Савол:</b> Илми омӯзиши растаниҳо чӣ номида мешавад?</p>
        <input type="text" id="user-answer" placeholder="Номи илм" style="padding: 8px; font-size: 14px; width: 180px;">
        <button id="check-btn" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Санҷидан</button>
        <div id="result-message" style="margin-top: 15px; font-weight: bold;"></div>
        <button id="next-btn" style="margin-top: 15px; padding: 6px 12px; background: #007bff; color: white; border: none; border-radius: 4px; display: none;">Саволи нав ➡️</button>
    `;
}

function getInformaticsHTML(grade) {
    return `
        <p><b>Савол:</b> Воҳиди асосии ченкунии ахборот дар компютер чӣ номида мешавад?</p>
        <input type="text" id="user-answer" placeholder="Масалан: байт" style="padding: 8px; font-size: 14px; width: 180px;">
        <button id="check-btn" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Санҷидан</button>
        <div id="result-message" style="margin-top: 15px; font-weight: bold;"></div>
        <button id="next-btn" style="margin-top: 15px; padding: 6px 12px; background: #007bff; color: white; border: none; border-radius: 4px; display: none;">Саволи нав ➡️</button>
    `;
}

function getRussianHTML(grade) {
    return `
        <p><b>Савол (Русский язык):</b> Переведите на русский язык слово «Китоб»:</p>
        <input type="text" id="user-answer" placeholder="Ответ по-русски" style="padding: 8px; font-size: 14px; width: 180px;">
        <button id="check-btn" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Санҷидан</button>
        <div id="result-message" style="margin-top: 15px; font-weight: bold;"></div>
        <button id="next-btn" style="margin-top: 15px; padding: 6px 12px; background: #007bff; color: white; border: none; border-radius: 4px; display: none;">Саволи нав ➡️</button>
    `;
}

function getEnglishHTML(grade) {
    return `
        <p><b>Савол (English):</b> Translate into English: «Мактаб»</p>
        <input type="text" id="user-answer" placeholder="Answer in English" style="padding: 8px; font-size: 14px; width: 180px;">
        <button id="check-btn" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Санҷидан</button>
        <div id="result-message" style="margin-top: 15px; font-weight: bold;"></div>
        <button id="next-btn" style="margin-top: 15px; padding: 6px 12px; background: #007bff; color: white; border: none; border-radius: 4px; display: none;">Саволи нав ➡️</button>
    `;
}

// Санҷиши ҷавобҳо барои ҳамаи 10 фан
function initSubjectLogic(subject, grade) {
    const checkBtn = document.getElementById("check-btn");
    const userAnswer = document.getElementById("user-answer");
    const resultMessage = document.getElementById("result-message");
    const nextBtn = document.getElementById("next-btn");

    checkBtn.addEventListener("click", () => {
        const val = userAnswer.value.trim().toLowerCase();
        let isCorrect = false;

        if (subject === "math") isCorrect = (Number(val) > 0);
        else if (subject === "physics") isCorrect = val.includes("300000") || val.includes("300 000");
        else if (subject === "chemistry") isCorrect = val === "o" || val === "о";
        else if (subject === "tajik") isCorrect = val === "35" || val === "сиву панҷ";
        else if (subject === "history") isCorrect = val.includes("бухоро") || val.includes("бухороӣ");
        else if (subject === "geography") isCorrect = val.includes("осиё") || val.includes("евразия");
        else if (subject === "biology") isCorrect = val.includes("ботаника") || val.includes("наботот");
        else if (subject === "informatics") isCorrect = val.includes("байт") || val.includes("бит");
        else if (subject === "russian") isCorrect = val.includes("книга");
        else if (subject === "english") isCorrect = val.includes("school");

        if (isCorrect) {
            resultMessage.style.color = "green";
            resultMessage.textContent = "Дуруст аст! Офарин! 🌟";
            checkBtn.style.display = "none";
            nextBtn.style.display = "inline-block";
        } else {
            resultMessage.style.color = "red";
            resultMessage.textContent = "Ҷавоб хато аст. Боз кӯшиш кунед!";
        }
    });

    nextBtn.addEventListener("click", () => {
        loadSubjectContent(subject, grade);
    });
}
