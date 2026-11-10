document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userData = {
        language: document.getElementById('language-select').value,
        fullname: document.getElementById('fullname').value.trim(),
        grade: document.getElementById('grade-select').value,
        school: document.getElementById('school').value.trim(),
        region: document.getElementById('region').value.trim()
    };
    
    // Захира кардани маълумот дар хотираи маҳаллӣ
    localStorage.setItem('current_user', JSON.stringify(userData));
    
    alert('Бақайдгирӣ бо муваффақият гузашт!');
});
