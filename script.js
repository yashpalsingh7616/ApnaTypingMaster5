const adminEnglish = [
    { title: "English Set 01: General", text: "The quick brown fox jumps over the lazy dog..." },
    { title: "English Set 02: Office", text: "Official letters must be typed with high accuracy..." }
];

const adminHindi = [
    { title: "Hindi Set 01: Prashashan", text: "उत्तर प्रदेश सरकार द्वारा जनहित में जारी निर्देश..." },
    { title: "Hindi Set 02: Nyayalaya", text: "न्यायालय की कार्यवाही में शुद्धता का विशेष महत्व है..." }
];

// --- NAVIGATION LOGIC ---
function handleLogin() {
    const name = document.getElementById('user-name').value;
    if(!name) return alert("Naam bhariye");
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('selection-page').style.display = 'flex';
}

function openModule(lang) {
    document.getElementById('selection-page').style.display = 'none';
    if(lang === 'en') {
        document.getElementById('english-page').style.display = 'block';
        renderList('en-list', adminEnglish, 'en');
    } else {
        document.getElementById('hindi-page').style.display = 'block';
        renderList('hi-list', adminHindi, 'hi');
    }
}

function renderList(elementId, data, lang) {
    const list = document.getElementById(elementId);
    list.innerHTML = data.map(p => `
        <div class="p-item" onclick="startTyping('${p.text.replace(/'/g, "\\'")}', '${lang}')">
            ${p.title} <span>Select →</span>
        </div>
    `).join('');
}

function startCustom(lang) {
    const text = document.getElementById(lang + '-custom').value;
    if(text.length < 10) return alert("Text chhota hai");
    startTyping(text, lang);
}

function showHome() {
    location.reload(); // Simple way to reset to home
}

// --- TYPING ENGINE ---
function startTyping(passageText, mode) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById('typing-page').style.display = 'block';
    
    const area = document.getElementById('typing-area');
    if(mode === 'hi') area.classList.add('hindi-font');
    else area.classList.remove('hindi-font');
    
    // Yahan humara core typing logic (timer, wpm, errors) shuru hoga
    console.log("Typing started in " + mode + " mode");
}
