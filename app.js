document.addEventListener("DOMContentLoaded", () => {
    console.log("Платформаи таълимии математикӣ бомуваффақият оғоз шуд!");

    const welcomeModal = document.getElementById("welcomeModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const registrationForm = document.getElementById("registrationForm");

    // Кушода ва пӯшида шудани равзанаи зебои истиқбол
    if (closeModalBtn && welcomeModal) {
        closeModalBtn.addEventListener("click", () => {
            welcomeModal.style.opacity = "0";
            setTimeout(() => {
                welcomeModal.style.display = "none";
            }, 400);
        });
    }

    // Қисмати бақайдгирии хонанда (ному насаб, синф, мактаб ва ноҳия)
    if (registrationForm) {
        registrationForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const username = document.getElementById("username").value.trim();
            const grade = document.getElementById("gradeSelect").value;
            const school = document.getElementById("school") ? document.getElementById("school").value.trim() : "";
            const region = document.getElementById("region") ? document.getElementById("region").value.trim() : "";

            if (username && grade) {
                const userData = {
                    username: username,
                    grade: grade,
                    school: school,
                    region: region
                };

                // Захира кардани маълумот дар хотираи браузер
                localStorage.setItem("math_platform_user", JSON.stringify(userData));

                alert(`Хуш омадед, ${username}! Бақайдгирӣ бо муваффақият анҷом ёфт. 🎉`);
                
                // Ин ҷо метавонед баъдтар қисмати мисолҳоро кушоед
                registrationForm.style.display = "none";
            } else {
                alert("Лутфан ному насаб ва синфи худро пур кунед!");
            }
        });
    }
});
