// AOS
AOS.init({
duration: 1000,
once: true
});

// =====================
// Loading
// =====================

window.addEventListener("load", () => {

const loader = document.getElementById("loader");

if (loader) {
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 800);
    }, 600);
}

});

// =====================
// Cursor Glow
// =====================

const glow = document.getElementById("cursor-glow");

if (glow) {
    document.addEventListener("mousemove", (e) => {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    });
}

// =====================
// Theme Toggle
// =====================

const themeBtn = document.getElementById("themeToggle");

if (themeBtn) {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const darkMode = document.body.classList.contains("dark");

        if (darkMode) {
            localStorage.setItem("theme", "dark");
            themeBtn.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            themeBtn.textContent = "🌙";
        }
    });
}

// =====================
// Skill Bar Animation
// =====================

const progressBars = document.querySelectorAll(".progress");

if (progressBars.length > 0) {
    const skillObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.width = entry.target.dataset.width;
                }
            });
        },
        { threshold: 0.4 }
    );

    progressBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// =====================
// Card 3D Tilt
// =====================

const cards = document.querySelectorAll(".card,.box,.item,.profile-card");

cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });
});

// =====================
// Particle Background
// =====================

const canvas = document.getElementById("particles");

if (canvas) {
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];

    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.6,
            speedY: (Math.random() - 0.5) * 0.6
        });
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(122,179,232,${0.15 - distance / 1000})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0 || p.x > canvas.width) {
                p.speedX *= -1;
            }

            if (p.y < 0 || p.y > canvas.height) {
                p.speedY *= -1;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(122,179,232,.35)";
            ctx.fill();
        });

        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

// =====================
// Navbar Shadow
// =====================

const nav = document.querySelector("nav");

if (nav) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            nav.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";
        } else {
            nav.style.boxShadow = "none";
        }
    });
}

// =====================
// Reveal Animation
// =====================

const revealElements = document.querySelectorAll(".card,.box,.item");

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0px)";
                }
            });
        },
        { threshold: 0.1 }
    );

    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all .8s ease";
        revealObserver.observe(el);
    });
}