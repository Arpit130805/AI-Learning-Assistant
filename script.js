import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3Nh0HKR5sqEadbAsiFMXXcS-nzGg2E28",
    authDomain: "ai-learning-assistant-b0ae5.firebaseapp.com",
    projectId: "ai-learning-assistant-b0ae5",
    storageBucket: "ai-learning-assistant-b0ae5.appspot.com",
    messagingSenderId: "638966508282",
    appId: "1:638966508282:web:b023057d01a52c098df743",
    measurementId: "G-KR0GFF1YM0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Login Function
window.signIn = function () {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Login successful:", result.user);
            localStorage.setItem("user", JSON.stringify(result.user)); // Store user info in local storage
            window.location.href = "index.html"; // Redirect after login
        })
        .catch((error) => {
            console.error("Login Error:", error);
        });
};

// Logout Function
window.signOutUser = function () {
    signOut(auth)
        .then(() => {
            console.log("User signed out.");
            localStorage.removeItem("user"); // Remove user info
            window.location.href = "login.html"; // Redirect to login page after logout
        })
        .catch((error) => {
            console.error("Logout Error:", error);
        });
};

// Check Authentication State on Page Load
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById("user-info").innerText = `Hello, ${user.displayName}`;
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("logout-btn").style.display = "block";
    } else {
        document.getElementById("user-info").innerText = "";
        document.getElementById("login-btn").style.display = "block";
        document.getElementById("logout-btn").style.display = "none";
    }
});

// Learning Mode Selection
window.setMode = function (mode) {
    const lessonArea = document.getElementById("lesson-area");
    if (mode === "visual") {
        lessonArea.innerHTML = "<img src='assets/diagram.png' alt='Visual Learning Diagram'>";
    } else if (mode === "auditory") {
        lessonArea.innerHTML = "<audio controls><source src='assets/audio.mp3' type='audio/mpeg'>Your browser does not support audio.</audio>";
    } else if (mode === "kinesthetic") {
        lessonArea.innerHTML = "<p>Try this interactive exercise: <a href='#'>Drag and drop activity</a></p>";
    }
};

// AI Summary Function
window.generateSummary = async function () {
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
};

// Voice Input Function
window.startListening = function () {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onresult = function (event) {
        document.getElementById("speech-text").innerText = event.results[0][0].transcript;
    };
    recognition.start();
};
