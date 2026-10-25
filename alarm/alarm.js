
/* =====================================================
   NOOR ❤️ AZEEM — LOVE POSTCARD
   Button + Access Check + Pushbullet + Effects
===================================================== */

const accessDenied = document.getElementById("accessDenied");
const alarmPage = document.getElementById("alarmPage");

const wakeButton = document.getElementById("wakeButton");
const buttonText = document.getElementById("buttonText");
const buttonIcon = document.getElementById("buttonIcon");
const statusBox = document.getElementById("statusBox");

const sparkleLayer = document.getElementById("sparkles");


/* =====================================================
   ACCESS CHECK
   Welcome page sets this sessionStorage flag.
===================================================== */

const openedFromWelcome =
    sessionStorage.getItem("openedFromWelcome") === "true";

if (openedFromWelcome) {
    if (accessDenied) accessDenied.classList.remove("show");
    if (alarmPage) alarmPage.style.display = "";
} else {
    if (accessDenied) accessDenied.classList.add("show");
    if (alarmPage) alarmPage.style.display = "none";
}


/* =====================================================
   PUSHBULLET SETTINGS
   Paste your own Pushbullet access token below.
   Never publish a real token in a public website.
===================================================== */

const PUSHBULLET_API_KEY = "PASTE_YOUR_PUSHBULLET_ACCESS_TOKEN_HERE";


/* =====================================================
   SEND NOTIFICATION
===================================================== */

async function tellAzeem() {

    if (!wakeButton || !buttonText || !statusBox) return;

    if (!openedFromWelcome) {
        statusBox.textContent =
            "Please open this page from the welcome page first. 💗";
        return;
    }

    if (
        !PUSHBULLET_API_KEY ||
        PUSHBULLET_API_KEY === "PASTE_YOUR_PUSHBULLET_ACCESS_TOKEN_HERE"
    ) {
        statusBox.textContent =
            "Pushbullet token add karna baqi hai. 💌";
        return;
    }

    wakeButton.disabled = true;
    wakeButton.classList.add("is-sending");

    buttonText.textContent = "SENDING YOUR LITTLE MESSAGE...";
    if (buttonIcon) buttonIcon.textContent = "💌";

    statusBox.textContent = "Noor ka message Azeem tak bhej rahe hain... 🌸";

    try {

        const response = await fetch(
            "https://api.pushbullet.com/v2/pushes",
            {
                method: "POST",
                headers: {
                    "Access-Token": PUSHBULLET_API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type: "note",
                    title: "💗 Noor is online",
                    body:
                        "Noor is online and wants to talk to you. " +
                        "She pressed the button to let you know she's here. 🌸"
                })
            }
        );

        if (!response.ok) {
            throw new Error("Pushbullet returned HTTP " + response.status);
        }

        statusBox.textContent =
            "Message sent! 💗 Noor is online — check your notifications, Azeem. 🌸";

        buttonText.textContent = "MESSAGE SENT SUCCESSFULLY";
        if (buttonIcon) buttonIcon.textContent = "💖";

        burstHearts();

    } catch (error) {

        console.error("Notification error:", error);

        statusBox.textContent =
            "Message send nahi hua. Internet, Pushbullet token aur account check karo. 💌";

        buttonText.textContent = "TRY AGAIN";
        if (buttonIcon) buttonIcon.textContent = "💗";

    } finally {

        wakeButton.disabled = false;
        wakeButton.classList.remove("is-sending");

    }
}


/* =====================================================
   BUTTON EVENT
===================================================== */

if (wakeButton) {
    wakeButton.addEventListener("click", tellAzeem);
}


/* =====================================================
   SPARKLES
===================================================== */

function createSparkle(x, y) {

    if (!sparkleLayer) return;

    const sparkle = document.createElement("span");

    sparkle.className = "sparkle";
    sparkle.textContent = Math.random() > 0.5 ? "✦" : "✧";

    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";
    sparkle.style.fontSize = (10 + Math.random() * 12) + "px";

    sparkleLayer.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 1000);
}


/* =====================================================
   HEART BURST
===================================================== */

function burstHearts() {

    const hearts = ["💗", "💕", "💖", "♡", "✦"];

    for (let i = 0; i < 14; i++) {

        const particle = document.createElement("span");

        particle.className = "click-particle";
        particle.textContent = hearts[i % hearts.length];

        particle.style.left =
            (window.innerWidth / 2 + (Math.random() * 180 - 90)) + "px";

        particle.style.top =
            (window.innerHeight / 2 + (Math.random() * 100 - 50)) + "px";

        particle.style.setProperty(
            "--move-x",
            (Math.random() * 160 - 80) + "px"
        );

        particle.style.setProperty(
            "--move-y",
            (-40 - Math.random() * 130) + "px"
        );

        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 1000);
    }
}


/* =====================================================
   TAP / CLICK SPARKLES
===================================================== */

document.addEventListener("click", (event) => {

    createSparkle(event.clientX, event.clientY);

    createSparkle(
        event.clientX + 14,
        event.clientY - 10
    );

});


/* =====================================================
   LIGHTWEIGHT BACKGROUND SPARKLES
===================================================== */

setInterval(() => {

    if (document.hidden) return;

    createSparkle(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
    );

}, 1800);
