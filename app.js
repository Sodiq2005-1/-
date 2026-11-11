document.addEventListener("DOMContentLoaded", () => {
    console.log("Платформаи таълимии математикӣ оғоз ёфт!");

    const welcomeModal = document.getElementById("welcomeModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const registrationForm = document.getElementById("registration-form");

    // Пӯшидани равзанаи истиқбол (Modal) бо пахши тугма
    if (closeModalBtn && welcomeModal) {
        closeModalBtn.addEventListener("click", () => {
            welcomeModal.style.opacity = "0";
            setTimeout(() => {
                welcomeModal.style.display = "none";
            }, 400);
        });
    }

    // Қисмати бақайдгирии хонанда ва захира дар LocalStorage
    if (registrationForm) {
        registrationForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const language = document.getElementById("language-select") ? document.getElementById("language-select").value : "tg";
            const fullname = document.getElementById("fullname") ? document.getElementById("fullname").value.trim() : "";
            const grade = document.getElementById("grade-select") ? document.getElementById("grade-select").value : "";
            const school = document.getElementById("school") ? document.getElementById("school").value.trim() : "";
            const region = document.getElementById("region") ? document.getElementById("region").value.trim() : "";

            if (fullname && grade) {
                const userData = {
                    language: language,
                    fullname: fullname,
                    grade: grade,
                    school: school,
                    region: region
                };

                // Захира кардани маълумот дар хотираи маҳаллӣ
                localStorage.setItem("current_user", JSON.stringify(userData));

                alert(`Хуш омадед, ${fullname}! Бақайдгирӣ бо муваффақият гузашт! 🎉`);
                
                // Пӯшидани формаи бақайдгирӣ ё тиреза пас аз бақайдгирӣ
                registrationForm.style.display = "none";
                if (welcomeModal) {
                    welcomeModal.style.display = "none";
                }

                // Ин ҷо баъдтар метавонед генератори машқҳои математикиро фаъол созед
            } else {
                alert("Лутфан ному насаб ва синфи худро пур кунед!");
            }
        });
    }
});
