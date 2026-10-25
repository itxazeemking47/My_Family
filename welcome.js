/* =====================================================
   NOOR ❤️ AZEEM
   LOVE POSTCARD INTERACTIONS
===================================================== */

const envelopeScreen =
    document.getElementById("envelopeScreen");

const envelope =
    document.getElementById("envelope");

const openEnvelope =
    document.getElementById("openEnvelope");

const mainWorld =
    document.getElementById("mainWorld");

const sparkleContainer =
    document.getElementById("sparkles");


/* =====================================================
   OPEN ENVELOPE
===================================================== */

function openLoveLetter() {

    if (!envelope) return;

    envelope.classList.add("open");

    /*
     * Small delay makes the letter-opening animation
     * feel natural before revealing the main page.
     */

    setTimeout(() => {

        if (envelopeScreen) {
            envelopeScreen.classList.add("opened");
        }

        if (mainWorld) {
            mainWorld.classList.add("visible");
        }

        startSparkles();

    }, 950);
}


/* =====================================================
   BUTTON
===================================================== */

if (openEnvelope) {

    openEnvelope.addEventListener(
        "click",
        openLoveLetter
    );
}


/* =====================================================
   ALSO OPEN WHEN ENVELOPE IS TAPPED
===================================================== */

if (envelope) {

    envelope.addEventListener(
        "click",
        (event) => {

            /*
             * Don't trigger twice from the heart button.
             */

            if (
                event.target === openEnvelope ||
                openEnvelope.contains(event.target)
            ) {
                return;
            }

            openLoveLetter();
        }
    );
}


/* =====================================================
   SPARKLE EFFECT
===================================================== */

function createSparkle(x, y) {

    if (!sparkleContainer) return;

    const sparkle =
        document.createElement("div");

    sparkle.className = "sparkle";

    sparkle.textContent =
        Math.random() > .5
            ? "✦"
            : "✧";

    sparkle.style.left =
        x + "px";

    sparkle.style.top =
        y + "px";

    sparkle.style.fontSize =
        (10 + Math.random() * 12) + "px";

    sparkleContainer.appendChild(
        sparkle
    );

    setTimeout(() => {

        sparkle.remove();

    }, 1000);
}


/* =====================================================
   RANDOM SPARKLES
===================================================== */

function startSparkles() {

    setInterval(() => {

        createSparkle(
            Math.random() *
                window.innerWidth,

            Math.random() *
                window.innerHeight
        );

    }, 1300);
}


/* =====================================================
   CLICK SPARKLES
===================================================== */

document.addEventListener(
    "click",
    (event) => {

        createSparkle(
            event.clientX,
            event.clientY
        );

        createSparkle(
            event.clientX + 12,
            event.clientY - 8
        );
    }
);


/* =====================================================
   MOBILE TOUCH SPARKLES
===================================================== */

document.addEventListener(
    "touchstart",
    (event) => {

        const touch =
            event.touches[0];

        if (!touch) return;

        createSparkle(
            touch.clientX,
            touch.clientY
        );
    },
    {
        passive: true
    }
);


/* =====================================================
   CARD PRESS EFFECT
===================================================== */

const cards =
    document.querySelectorAll(
        ".memory-card"
    );

cards.forEach((card) => {

    card.addEventListener(
        "touchstart",
        () => {

            card.style.transform =
                "scale(.98)";

        },
        {
            passive: true
        }
    );

    card.addEventListener(
        "touchend",
        () => {

            card.style.transform = "";

        },
        {
            passive: true
        }
    );
});


/* =====================================================
   CONSOLE MESSAGE 😎
===================================================== */

console.log(
    "%c Noor ❤️ Azeem ",
    "font-size:20px;font-weight:bold;color:#e85b91;"
);

console.log(
    "%c Welcome to your little world ✨",
    "font-size:13px;color:#8d6b7b;"
);
