// --- DATABASE ---
const adminEnglish = [
    { title: "English Set 01: Basics", text: "The ability to type quickly and accurately is a vital skill in the modern workplace." },
    { title: "English Set 02: UPSSSC", text: "UPSSSC exams require candidates to maintain a steady speed of thirty words per minute in English." }
];

const adminHindi = [
    { title: "Hindi Set 01: Mangal", text: "उत्तर प्रदेश अधीनस्थ सेवा चयन आयोग की परीक्षाओं में हिंदी टाइपिंग का विशेष महत्व है।" }
];

let timer;
let timeLeft = 300; // 5 Minutes
let isStarted = false;
let backspaceCount = 0;
let passageWords = [];
let currentWordIndex = 0;

// --- NAVIGATION ---
function handleLogin() {
    const name = document.getElementById('user-name').value;
    if(!name) return alert("Naam bhariye");
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('selection-page').style.display = 'flex';
}

function openModule(lang) {
    document.getElementById('selection-page').style.display = 'none';
    const pageId = lang === 'en' ? 'english-page' : 'hindi-page';
    const listId = lang === 'en' ? 'en-list' : 'hi-list';
    const data = lang === 'en' ? adminEnglish : adminHindi;
    
    document.getElementById(pageId).style.display = 'flex';
    renderList(listId, data, lang);
}

function renderList(listId, data, lang) {
    const list = document.getElementById(listId);
    list.innerHTML = data.map(p => `
        <div class="p-item" onclick="startTyping(\`${p.text}\`, '${lang}')">
            ${p.title} <button class="select-btn">Select</button>
        </div>
    `).join('');
}

// --- TYPING CORE ---
function startTyping(text, mode) {
    // Pages Switch
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById('typing-page').style.display = 'flex';

    // Reset Variables
    clearInterval(timer);
    timeLeft = 300;
    isStarted = false;
    backspaceCount = 0;
    currentWordIndex = 0;
    document.getElementById('back-count').innerText = "0";
    document.getElementById('timer').innerText = "Time Left: 05:00";

    // Setup Text Display
    const display = document.getElementById('text-display');
    passageWords = text.trim().split(/\s+/);
    display.innerHTML = passageWords.map(word => `<span class="word-span">${word}</span>`).join(' ');
    
    // Highlight first word
    display.children[0].classList.add('current-word');

    // Font Styling
    const area = document.getElementById('typing-area');
    area.value = "";
    if(mode === 'hi') {
        area.classList.add('hindi-font');
        display.classList.add('hindi-font');
    } else {
        area.classList.remove('hindi-font');
        display.classList.remove('hindi-font');
    }
    
    // Start Engine
    setupEngine();
}

function setupEngine() {
    const area = document.getElementById('typing-area');
    const display = document.getElementById('text-display');

    area.onkeydown = (e) => {
        if (!isStarted) startTimer();
        if (e.key === 'Backspace') {
            backspaceCount++;
            document.getElementById('back-count').innerText = backspaceCount;
        }
    };

    area.oninput = () => {
        const value = area.value;
        const currentSpan = display.children[currentWordIndex];
        const currentWordText = passageWords[currentWordIndex];

        // Word match check
        if (value.endsWith(' ')) {
            const inputWord = value.trim();
            if (inputWord === currentWordText) {
                currentSpan.className = "word-span correct";
            } else {
                currentSpan.className = "word-span wrong";
            }
            
            currentWordIndex++;
            if (currentWordIndex < passageWords.length) {
                display.children[currentWordIndex].classList.add('current-word');
                area.value = "";
                // Scroll into view
                display.children[currentWordIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                finishTest();
            }
            calculateWPM();
        }
    };
}

function startTimer() {
    isStarted = true;
    timer = setInterval(() => {
        timeLeft--;
        let mins = Math.floor(timeLeft / 60);
        let secs = timeLeft % 60;
        document.getElementById('timer').innerText = `Time Left: ${mins}:${secs < 10 ? '0' : ''}${secs}`;
        if (timeLeft <= 0) finishTest();
    }, 1000);
}

function calculateWPM() {
    const timeSpent = (300 - timeLeft) / 60;
    const wpm = Math.round(currentWordIndex / (timeSpent || 1));
    document.getElementById('live-wpm').innerText = wpm;
}

function finishTest() {
    clearInterval(timer);
    document.getElementById('typing-area').disabled = true;
    alert(`Test Over! \nFinal Speed: ${document.getElementById('live-wpm').innerText} WPM \nBackspaces: ${backspaceCount}`);
}

function backToLanguage() { location.reload(); }
function backToPassageSelection() { location.reload(); }
