function celebrate() {
    document.getElementById("wish").style.display = "block";

    const song = document.getElementById("song");
    song?.play().catch(() => {});

    // 💖 NEW: heart burst on click
    burstHearts();

    // 💕 Optional: gentle continuous hearts for 2 seconds
    let heartInterval = setInterval(burstHearts, 400);
    setTimeout(() => clearInterval(heartInterval), 2000);

    setTimeout(() => {
        document.getElementById("intro").style.display = "none";
        document.getElementById("album").style.display = "block";
        startPhotoStack();
    }, 1200);
}

/* 💖 HEART EFFECT LOGIC */
function burstHearts() {
    const container = document.getElementById("heart-effects");
    const heart = document.querySelector(".heart");
    if (!container || !heart) return;

    const rect = heart.getBoundingClientRect();

    for (let i = 0; i < 8; i++) {
        const h = document.createElement("div");
        h.className = "floating-heart";
        h.innerHTML = "❤️";

        h.style.left =
            rect.left + rect.width / 2 + random(-30, 30) + "px";
        h.style.top =
            rect.top + rect.height / 2 + random(-10, 10) + "px";

        h.style.fontSize = random(28, 42) + "px";
        h.style.animationDuration = random(1.4, 2.2) + "s";

        container.appendChild(h);

        setTimeout(() => h.remove(), 2300);
    }
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

/* PHOTO STACK — FINAL WORKING VERSION */
function startPhotoStack() {
    const stack = document.getElementById("photoStack");
    if (!stack) return;

    function layout() {
        [...stack.children].forEach((img, i) => {
            img.style.zIndex = 100 - i;
            img.style.transform =
                `translate(${i * 12}px, ${i * 12}px) scale(${1 - i * 0.05})`;
        });
    }

    layout();

    setInterval(() => {
        stack.appendChild(stack.firstElementChild);
        layout();
    }, 2000);
}