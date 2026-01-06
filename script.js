// --- ADMIN DATA ---
const adminEnglish = [
    { title: "English Set 01: General", text: "The ability to type quickly is very important for government jobs. The ability to type quickly is very important for government jobs. The ability to type quickly is very important for government jobs. The ability to type quickly is very important for government jobs.The ability to type quickly is very important for government jobs.The ability to type quickly is very important for government jobs." },
    { title: "English Set 02: Office", text: "All official documents must be handled with care and accuracy." }
];

const adminHindi = [
    { title: "Hindi Set 01: Prashashan", text: "उत्तर प्रदेश सरकार द्वारा जनहित में जारी निर्देश का पालन करें। उत्तर प्रदेश सरकार द्वारा जनहित में जारी निर्देश का पालन करें। उत्तर प्रदेश सरकार द्वारा जनहित में जारी निर्देश का पालन करें। उत्तर प्रदेश सरकार द्वारा जनहित में जारी निर्देश का पालन करें। उत्तर प्रदेश सरकार द्वारा जनहित में जारी निर्देश का पालन करें। उत्तर प्रदेश सरकार द्वारा जनहित में जारी निर्देश का पालन करें। उत्तर प्रदेश सरकार द्वारा जनहित में जारी निर्देश का पालन करें। उत्तर प्रदेश सरकार द्वारा जनहित में जारी निर्देश का पालन करें। उत्तर प्रदेश सरकार द्वारा जनहित में जारी निर्देश का पालन करें। उत्तर प्रदेश सरकार द्वारा जनहित में जारी निर्देश का पालन करें। उत्तर प्रदेश सरकार द्वारा जनहित में जारी निर्देश का पालन करें।" },
    { title: "Hindi Set 02: Nyayalaya", text: "न्यायालय की कार्यवाही में शुद्धता का विशेष महत्व होता है।" }
];

let currentMode = 'en';

// --- NAVIGATION FUNCTIONS (BACK OPTIONS) ---
function handleLogin() {
    const name = document.getElementById('user-name').value;
    if(!name) return alert("Please enter your name");
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('selection-page').style.display = 'flex';
}

function openModule(lang) {
    currentMode = lang;
    document.getElementById('selection-page').style.display = 'none';
    if(lang === 'en') {
        document.getElementById('english-page').style.display = 'flex';
        renderList('en-list', adminEnglish, 'en');
    } else {
        document.getElementById('hindi-page').style.display = 'flex';
        renderList('hi-list', adminHindi, 'hi');
    }
}

function backToLanguage() {
    document.getElementById('english-page').style.display = 'none';
    document.getElementById('hindi-page').style.display = 'none';
    document.getElementById('selection-page').style.display = 'flex';
}

function backToPassageSelection() {
    document.getElementById('typing-page').style.display = 'none';
    if(currentMode === 'en') document.getElementById('english-page').style.display = 'flex';
    else document.getElementById('hindi-page').style.display = 'flex';
}

// --- RENDER & START LOGIC ---
function renderList(elementId, data, lang) {
    const list = document.getElementById(elementId);
    list.innerHTML = ""; // Clear existing
    data.forEach(p => {
        const div = document.createElement('div');
        div.className = "p-item";
        div.innerHTML = `<span>${p.title}</span> <small>Click to Start →</small>`;
        // Click karne par actual typing start hogi
        div.onclick = () => startTyping(p.text, lang);
        list.appendChild(div);
    });
}

function startCustom(lang) {
    const text = document.getElementById(lang + '-custom').value;
    if(text.trim().length < 10) return alert("Text is too short!");
    startTyping(text, lang);
}

function startTyping(passageText, mode) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById('typing-page').style.display = 'flex';
    
    const display = document.getElementById('text-display');
    const area = document.getElementById('typing-area');
    
    display.innerText = passageText;
    area.value = "";
    area.focus();
    
    if(mode === 'hi') {
        area.classList.add('hindi-font');
        display.classList.add('hindi-font');
    } else {
        area.classList.remove('hindi-font');
        display.classList.remove('hindi-font');
    }
}
