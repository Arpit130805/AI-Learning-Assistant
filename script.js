function setMode(mode) {
    const lessonArea = document.getElementById("lesson-area");
    if (mode === "visual") {
        lessonArea.innerHTML = "<img src='assets/diagram.png' alt='Visual Learning Diagram'>";
    } else if (mode === "auditory") {
        lessonArea.innerHTML = "<audio controls><source src='assets/audio.mp3' type='audio/mpeg'>Your browser does not support audio.</audio>";
    } else if (mode === "kinesthetic") {
        lessonArea.innerHTML = "<p>Try this interactive exercise: <a href='#'>Drag and drop activity</a></p>";
    }
}

async function generateSummary() {
    const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_OPENAI_API_KEY"
        },
        body: JSON.stringify({
            model: "gpt-4",
            prompt: "Summarize the key points of this lesson in simple terms.",
            max_tokens: 100
        })
    });
    const data = await response.json();
    document.getElementById("lesson-area").innerHTML = `<p><strong>AI Summary:</strong> ${data.choices[0].text}</p>`;
}

function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onresult = function(event) {
        document.getElementById("speech-text").innerText = event.results[0][0].transcript;
    };
    recognition.start();
}

// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// Firebase Config (Replace with your details)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function signIn() {
    signInWithPopup(auth, provider).then(result => {
        document.getElementById("user-info").innerText = `Hello, ${result.user.displayName}`;
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("logout-btn").style.display = "block";
    }).catch(error => console.log(error));
}

function signOutUser() {
    signOut(auth).then(() => {
        document.getElementById("user-info").innerText = "";
        document.getElementById("login-btn").style.display = "block";
        document.getElementById("logout-btn").style.display = "none";
    }).catch(error => console.log(error));
}
