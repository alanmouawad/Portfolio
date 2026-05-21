const _systemRegistry = [
    {
        status: "Production System (Evolving Since 2023)",
        title: "Project Cycle Management (PCM) System",
        desc: "An enterprise-level Project Cycle Management application engineered under strict Clean Architecture (Repository Pattern) isolating business logic from infrastructure tiers. Built to handle heavy data flows from project instantiation through complex audit evaluation loops.",
        images: [
            "pcm-1.jpg",
            "pcm-2.jpg",
            "pcm-3.jpg",
            "pcm-4.jpg"
        ],
        stack: ["ASP.NET Core MVC 5.0", "C#", "EF Core", "SQL Server", "C# / .NET (ASP.NET Core)", "Clean Architecture Pattern", "Entity Framework Core", "SQLite & SQL Server"]
    },
    {
        status: "High-Performance Desktop Client",
        title: "Study Zone Manager Pro",
        desc: "A compiled cross-platform desktop management application engineered for zero-latency session tracking and automated offline administration. Implemented local secure data schemas and structural state management for optimized performance.",
        images: [
            "study-1.jpg",
            "study-2.jpg",
            "study-3.jpg",
            "study-4.jpg"
        ],
        stack: [".NET", "C#", "SQLite", "Tauri/Rust Compatible Model", "Rust", "Tauri framework", "SQLite & SQL Server", "C# / .NET (ASP.NET Core)"]
    },
    {
        status: "Full-Stack Application Layer",
        title: "Dentix",
        desc: "A modern clinic ecosystem designed for optimized patient tracking, zero-loss operational data mapping, and instant client-side rendering with real-time state persistence algorithms.",
        images: [
            "Clinic1.png",
            "Clinic 2.png",
            "Clinic 3.png",
            "Clinic 4.png"
        ],
        stack: ["Next.js", "Supabase", "TypeScript", "Tailwind Engines", "Next.js / TypeScript"]
    }
];

// محرك بناء وحقن محتوى المشاريع في الصفحة
const _renderEngine = () => {
    const grid = document.getElementById('secure-render-grid');
    if (!grid) return;
    let _htmlBuffer = '';

    _systemRegistry.forEach((project, index) => {
        let tags = project.stack.map(t => `<span class="tech-tag" onclick="event.stopPropagation(); _navigateToProject('${t}')">${t}</span>`).join('');
        
        let slides = project.images.map(img => `
            <div class="slider-slide">
                <img src="${img}" alt="${project.title}" class="project-img" loading="lazy">
            </div>
        `).join('');

        _htmlBuffer += `
            <div class="project-card" id="card-${index}">
                <div class="project-header-trigger" onclick="_toggleProjectAccordion(${index})">
                    <div class="project-header-title">
                        <div class="project-status" style="margin-bottom: 2px;">${project.status}</div>
                        <h3>${project.title}</h3>
                    </div>
                    <div class="accordion-arrow">&#9662;</div>
                </div>
                
                <div class="project-body-collapse" id="collapse-${index}">
                    <div class="slider-wrapper">
                        <button class="slider-btn prev" onclick="event.stopPropagation(); _slideAction(${index}, -1)">&#10094;</button>
                        <div class="image-slider" id="slider-${index}">
                            ${slides}
                        </div>
                        <button class="slider-btn next" onclick="event.stopPropagation(); _slideAction(${index}, 1)">&#10095;</button>
                    </div>
                    <div class="project-content">
                        <p>${project.desc}</p>
                        <div class="tech-grid">${tags}</div>
                    </div>
                </div>
            </div>
        `;
    });
    grid.innerHTML = _htmlBuffer;
    
    // تشغيل الأنظمة التفاعلية والفيزيائية الملحقة بأمان
    _initScrollReveal();
    _initVisitorCounter(); 
    _initNeuronBackground();
};

const _toggleProjectAccordion = (index) => {
    const card = document.getElementById(`card-${index}`);
    if (!card) return;
    const isExpanded = card.classList.contains('is-expanded');
    
    document.querySelectorAll('.project-card').forEach(c => c.classList.remove('is-expanded'));
    
    if (!isExpanded) {
        card.classList.add('is-expanded');
        setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 150);
    }
};

const _initVisitorCounter = () => {
    try {
        let localCount = localStorage.getItem('_sys_visit_cache') || 1024;
        localCount = parseInt(localCount) + 1;
        localStorage.setItem('_sys_visit_cache', localCount);
        const countElement = document.getElementById('count');
        if (countElement) {
            countElement.innerText = String(localCount).padStart(6, '0');
        }
    } catch (e) {
        console.log("Counter error bypassed.");
    }
};

const _slideAction = (sliderIndex, direction) => {
    const slider = document.getElementById(`slider-${sliderIndex}`);
    if (!slider) return;
    const slideWidth = slider.clientWidth;
    const currentScroll = slider.scrollLeft;
    const maxScroll = slider.scrollWidth - slideWidth;

    if (direction === 1 && Math.ceil(currentScroll) >= maxScroll) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
    } 
    else if (direction === -1 && currentScroll <= 0) {
        slider.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } 
    else {
        slider.scrollBy({ left: slideWidth * direction, behavior: 'smooth' });
    }
};

const _navigateToProject = (techName) => {
    const projectIndex = _systemRegistry.findIndex(project => 
        project.stack.some(tech => tech.toLowerCase() === techName.toLowerCase())
    );

    if (projectIndex !== -1) {
        const targetCard = document.getElementById(`card-${projectIndex}`);
        if (targetCard) {
            if (!targetCard.classList.contains('is-expanded')) {
                _toggleProjectAccordion(projectIndex);
            }
            
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            targetCard.classList.remove('highlight-target');
            void targetCard.offsetWidth; 
            targetCard.classList.add('highlight-target');
        }
    }
};

const _initScrollReveal = () => {
    const cards = document.querySelectorAll('.project-card');
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal-active');
                }, idx * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => cardObserver.observe(card));
};

// المحرك الفيزيائي المستقل للشبكة العصبونية التفاعلية خلف النصوص
const _initNeuronBackground = () => {
    const canvas = document.getElementById('neuron-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const neurons = [];
    const neuronCount = Math.min(60, Math.floor((width * height) / 25000)); 
    const maxConnectionDistance = 150;
    const mouse = { x: null, y: null, radius: 180 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    class Neuron {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.35;
            this.vy = (Math.random() - 0.5) * 0.35;
            this.radius = Math.random() * 2 + 1.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            if (mouse.x != null && mouse.y != null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    this.x -= (dx / distance) * force * 0.4;
                    this.y -= (dy / distance) * force * 0.4;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
            ctx.fill();
        }
    }

    for (let i = 0; i < neuronCount; i++) {
        neurons.push(new Neuron());
    }

    const animate = () => {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < neurons.length; i++) {
            neurons[i].update();
            neurons[i].draw();

            for (let j = i + 1; j < neurons.length; j++) {
                const dx = neurons[i].x - neurons[j].x;
                const dy = neurons[i].y - neurons[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxConnectionDistance) {
                    const alpha = (1 - (distance / maxConnectionDistance)) * 0.12;
                    ctx.beginPath();
                    ctx.moveTo(neurons[i].x, neurons[i].y);
                    ctx.lineTo(neurons[j].x, neurons[j].y);
                    ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    };

    animate();
};

// بدء التشغيل الفوري عند جاهزية هيكل الصفحة الخارجي
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _renderEngine);
} else {
    _renderEngine();
}

// جدران الحماية ضد أداة فحص العناصر وعرض الأكواد (حماية السورس البرمجي)
document.addEventListener('contextmenu', (event) => event.preventDefault());
document.addEventListener('keydown', (event) => {
    if (event.key === 'F12' || event.keyCode === 123) {
        event.preventDefault();
        return false;
    }
    if (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.keyCode === 73 || event.key === 'J' || event.keyCode === 74)) {
        event.preventDefault();
        return false;
    }
    if (event.ctrlKey && event.shiftKey && (event.key === 'C' || event.keyCode === 67)) {
        event.preventDefault();
        return false;
    }
    if (event.ctrlKey && (event.key === 'u' || event.keyCode === 85)) {
        event.preventDefault();
        return false;
    }
    if (event.ctrlKey && (event.key === 's' || event.keyCode === 83)) {
        event.preventDefault();
        return false;
    }
});
