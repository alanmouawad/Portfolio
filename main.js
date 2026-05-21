// Secure Data Payload (Base64 Encoded to prevent static analysis)
const _0xdb = [
    "UHJvZHVjdGlvbi组织VzdGVtIChFdm9sdmluZyBTaW5jZSAyMDIzKQ==", // status 1
    "UHJvamVjdCBDeWNsZSBNYW5hZ2VtZW50IChQQ00pIFN5c3RlbQ==",     // title 1
    "QW4gZW50ZXJwcmlzZS1sZXZlbCBQcm9qZWN0IEN5Y2xlIE1hbmFnZW1lbnQgYXBwbGljYXRpb24gZW5naW5lZXJlZCB1bmRlciBzdHJpY3QgQ2xlYW4gQXJjaGl0ZWN0dXJlLg==", // desc 1
    "SGlnaC1QZXJmb3JtYW5jZSBEZXNrdG9wIENsaWVudA==",             // status 2
    "U3R1ZHkgWm9uZSBNYW5hZ2VyIFBybw==",                         // title 2
    "QSBjb21waWxlZCBjcm9zcy1wbGF0Zm9ybSBkZXNrdG9wIG1hbmFnZW1lbnQgYXBwbGljYXRpb24gZW5naW5lZXJlZCBmb3IgemVyby1sYXRlbmN5IHNlc3Npb24gdHJhY2tpbmcu", // desc 2
    "RnVsbC1TdGFjayBBcHBsaWNhdGlvbiBMYXllcg==",                 // status 3
    "RGVudGl4",                                                 // title 3
    "QSBtb2Rlcm4gY2xpbmljIGVjb3N5c3RlbSBkZXNpZ25lZCBmb3Igb3B0aW1pemVkIHBhdGllbnQgdHJhY2tpbmcu" // desc 3
];

const _0xfb = (idx) => decodeURIComponent(atob(_0xdb[idx]).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

const _systemRegistry = [
    { status: _0xfb(0), title: _0xfb(1), desc: _0xfb(2), images: ["pcm-1.jpg", "pcm-2.jpg", "pcm-3.jpg", "pcm-4.jpg"], stack: ["ASP.NET Core MVC 5.0", "C#", "EF Core", "SQL Server", "Clean Architecture Pattern"] },
    { status: _0xfb(3), title: _0xfb(4), desc: _0xfb(5), images: ["study-1.jpg", "study-2.jpg", "study-3.jpg", "study-4.jpg"], stack: [".NET", "C#", "SQLite", "Tauri framework", "Rust"] },
    { status: _0xfb(6), title: _0xfb(7), desc: _0xfb(8), images: ["Clinic1.png", "Clinic 2.png", "Clinic 3.png", "Clinic 4.png"], stack: ["Next.js", "Supabase", "TypeScript", "Tailwind Engines"] }
];

const _renderEngine = () => {
    const grid = document.getElementById('secure-render-grid');
    if (!grid) return;
    let html = '';

    _systemRegistry.forEach((p, i) => {
        let tags = p.stack.map(t => `<span class="tech-tag" onclick="event.stopPropagation(); _navigateToProject('${t}')">${t}</span>`).join('');
        let slides = p.images.map(img => `<div class="slider-slide"><img src="${img}" alt="${p.title}" class="project-img" loading="lazy"></div>`).join('');

        html += `<div class="project-card" id="card-${i}"><div class="project-header-trigger" onclick="_toggleProjectAccordion(${i})"><div class="project-header-title"><div class="project-status" style="margin-bottom:2px;">${p.status}</div><h3>${p.title}</h3></div><div class="accordion-arrow">&#9662;</div></div><div class="project-body-collapse" id="collapse-${i}"><div class="slider-wrapper"><button class="slider-btn prev" onclick="event.stopPropagation(); _slideAction(${i},-1)">&#10094;</button><div class="image-slider" id="slider-${i}">${slides}</div><button class="slider-btn next" onclick="event.stopPropagation(); _slideAction(${i},1)">&#10095;</button></div><div class="project-content"><p>${p.desc}</p><div class="tech-grid">${tags}</div></div></div></div>`;
    });
    grid.innerHTML = html;
    _initScrollReveal();
    _initVisitorCounter();
    _initNeuronBackground();
};

const _toggleProjectAccordion = (i) => {
    const card = document.getElementById(`card-${i}`);
    if (!card) return;
    const exp = card.classList.contains('is-expanded');
    document.querySelectorAll('.project-card').forEach(c => c.classList.remove('is-expanded'));
    if (!exp) {
        card.classList.add('is-expanded');
        setTimeout(() => { card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 150);
    }
};

const _initVisitorCounter = () => {
    const el = document.getElementById('count');
    if (!el) return;
    let c = localStorage.getItem('_sys_visit_cache') || 1024;
    c = parseInt(c) + 1;
    localStorage.setItem('_sys_visit_cache', c);
    el.innerText = String(c).padStart(6, '0');
};

const _slideAction = (idx, dir) => {
    const s = document.getElementById(`slider-${idx}`);
    if (!s) return;
    const w = s.clientWidth, cur = s.scrollLeft, max = s.scrollWidth - w;
    if (dir === 1 && Math.ceil(cur) >= max) { s.scrollTo({ left: 0, behavior: 'smooth' }); }
    else if (dir === -1 && cur <= 0) { s.scrollTo({ left: max, behavior: 'smooth' }); }
    else { s.scrollBy({ left: w * dir, behavior: 'smooth' }); }
};

const _navigateToProject = (tech) => {
    const idx = _systemRegistry.findIndex(p => p.stack.some(t => t.toLowerCase() === tech.toLowerCase()));
    if (idx !== -1) {
        const card = document.getElementById(`card-${idx}`);
        if (card) {
            if (!card.classList.contains('is-expanded')) { _toggleProjectAccordion(idx); }
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.classList.remove('highlight-target');
            void card.offsetWidth;
            card.classList.add('highlight-target');
        }
    }
};

const _initScrollReveal = () => {
    const cards = document.querySelectorAll('.project-card');
    if (cards.length === 0) return;
    const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    cards.forEach(c => obs.observe(c));
};

const _initNeuronBackground = () => {
    const canvas = document.getElementById('neuron-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth, h = canvas.height = window.innerHeight;
    const pts = [];
    const count = Math.min(60, Math.floor((w * h) / 25000));
    const maxDist = 150;
    const mouse = { x: null, y: null, radius: 180 };

    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });
    window.addEventListener('resize', () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; });

    class Pt {
        constructor() {
            this.x = Math.random() * w; this.y = Math.random() * h;
            this.vx = (Math.random() - 0.5) * 0.35; this.vy = (Math.random() - 0.5) * 0.35;
            this.r = Math.random() * 2 + 1.5;
        }
        update() {
            this.x += this.vx; this.y += this.vy;
            if (this.x < 0 || this.x > w) this.vx *= -1;
            if (this.y < 0 || this.y > h) this.vy *= -1;
            if (mouse.x != null && mouse.y != null) {
                const dx = mouse.x - this.x, dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const f = (mouse.radius - dist) / mouse.radius;
                    this.x -= (dx / dist) * f * 0.4; this.y -= (dy / dist) * f * 0.4;
                }
            }
        }
        draw() {
            ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(56, 189, 248, 0.25)'; ctx.fill();
        }
    }

    for (let i = 0; i < count; i++) pts.push(new Pt());

    const anim = () => {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < pts.length; i++) {
            pts[i].update(); pts[i].draw();
            for (let j = i + 1; j < pts.length; j++) {
                const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxDist) {
                    const a = (1 - (dist / maxDist)) * 0.12;
                    ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
                    ctx.strokeStyle = `rgba(56, 189, 248, ${a})`; ctx.lineWidth = 0.8; ctx.stroke();
                }
            }
        }
        requestAnimationFrame(anim);
    };
    anim();
};

// Security Layer
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
    if (e.key === 'F12' || e.keyCode === 123) { e.preventDefault(); return false; }
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) { e.preventDefault(); return false; }
    if (e.ctrlKey && (e.key === 'u' || e.key === 's')) { e.preventDefault(); return false; }
});

document.addEventListener('DOMContentLoaded', _renderEngine);
