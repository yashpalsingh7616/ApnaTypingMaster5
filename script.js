const textDisplay = document.getElementById('text-display');
const typingArea = document.getElementById('typing-area');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const modeSelect = document.getElementById('mode-select');

let words = [];
let wordIndex = 0;
let startTime;
let timer;
let backspaces = 0;

const content = {
    en: "The ability to type quickly and accurately is a vital skill in the modern workplace. UPSSSC exams require candidates to maintain a steady speed of thirty words per minute in English.",
    hi: "उत्तर प्रदेश अधीनस्थ सेवा चयन आयोग की परीक्षाओं में हिंदी टाइपिंग का विशेष महत्व है। मंगल इनस्क्रिप्ट कीबोर्ड लेआउट पर अभ्यास करना अनिवार्य है।"
};

function loadText() {
    const lang = modeSelect.value;
    textDisplay.innerHTML = "";
    words = content[lang].split(" ");
    words.forEach((word, i) => {
        const span = document.createElement('span');
        span.innerText = word + " ";
        span.classList.add('word');
        if (i === 0) span.classList.add('current');
        textDisplay.appendChild(span);
    });
}

startBtn.addEventListener('click', () => {
    wordIndex = 0;
    backspaces = 0;
    typingArea.disabled = false;
    typingArea.value = "";
    typingArea.focus();
    startBtn.disabled = true;
    loadText();
    startTimer(300); // 5 Minutes for UPSSSC
});

typingArea.addEventListener('input', (e) => {
    const spans = textDisplay.querySelectorAll('.word');
    const inputVal = typingArea.value.trim();
    const currentWord = words[wordIndex];

    if (e.inputType === 'deleteContentBackward') backspaces++;

    if (typingArea.value.endsWith(" ")) {
        if (inputVal === currentWord) {
            spans[wordIndex].classList.add('correct');
        } else {
            spans[wordIndex].classList.add('wrong');
        }
        
        spans[wordIndex].classList.remove('current');
        wordIndex++;
        if (spans[wordIndex]) spans[wordIndex].classList.add('current');
        typingArea.value = "";
        calculateStats();
    }
});

function startTimer(seconds) {
    let time = seconds;
    timer = setInterval(() => {
        time--;
        let min = Math.floor(time / 60);
        let sec = time % 60;
        timerDisplay.innerText = `${min}:${sec < 10 ? '0' : ''}${sec}`;
        if (time === 0) {
            clearInterval(timer);
            typingArea.disabled = true;
            alert("Test Complete!");
        }
    }, 1000);
}

function calculateStats() {
    document.getElementById('backspace-count').innerText = backspaces;
    const wpm = Math.round((wordIndex / 1)); // Simple WPM for demo
    document.getElementById('wpm').innerText = wpm;
}

loadText(); // Initial load
