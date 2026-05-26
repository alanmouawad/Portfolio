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
            },
            {
                status: "Fuzzy Information Retrieval System",
                title: "FIRS",
                desc: "An Arabic Information Retrieval desktop app in C# using Fuzzy Logic to rank Word documents on marketing. It features an Arabic stemmer, custom Stop Words filtering (e.g., prepositions), and a smart caching system for instant re-search results. Files are ranked based on title match, term frequency, and proximity to the document's beginning.",
                images: [
                    "Clinic1.png",
                    "Clinic 2.png",
                    "Clinic 3.png",
                    "Clinic 4.png"
                ],
                stack: ["Next.js", "Supabase", "TypeScript", "Tailwind Engines", "Next.js / TypeScript"]
            }
        ];

        // محرك حقن البيانات المتطور لدعم معمارية الـ Accordion القابلة للطي
        const _renderEngine = () => {
            const grid = document.getElementById('secure-render-grid');
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
            
            _initScrollReveal();
            _initVisitorCounter(); 
            _initNeuronBackground(); // تشغيل خلفية الشبكة العصبونية التفاعلية
        };

        // محرك الفتح والإغلاق التفاعلي للمشاريع
        const _toggleProjectAccordion = (index) => {
            const card = document.getElementById(`card-${index}`);
            const isExpanded = card.classList.contains('is-expanded');
            
            document.querySelectorAll('.project-card').forEach(c => c.classList.remove('is-expanded'));
            
            if (!isExpanded) {
                card.classList.add('is-expanded');
                setTimeout(() => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 150);
            }
        };

        // محرك جلب عدد الزيارات الفعلي وتحديث الواجهة ديناميكياً
        const _initVisitorCounter = () => {
            const namespace = "alan_matrix_portfolio";
            const key = "home_page";
            
            fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
                .then(res => res.json())
                .then(data => {
                    document.getElementById('count').innerText = String(data.value).padStart(6, '0');
                })
                .catch(err => {
                    let localCount = localStorage.getItem('_sys_visit_cache') || 1024;
                    localCount = parseInt(localCount) + 1;
                    localStorage.setItem('_sys_visit_cache', localCount);
                    document.getElementById('count').innerText = String(localCount).padStart(6, '0');
                });
        };

        const _slideAction = (sliderIndex, direction) => {
            const slider = document.getElementById(`slider-${sliderIndex}`);
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

        // المحرك الفيزيائي المستقل لبناء خلايا العصبونات ومحاورها الذكية
        const _initNeuronBackground = () => {
            const canvas = document.getElementById('neuron-canvas');
            const ctx = canvas.getContext('2d');

            let width = canvas.width = window.innerWidth;
            let height = canvas.height = window.innerHeight;

            const neurons = [];
            // كثافة متزنة لعدد العصبونات بناءً على دقة شاشة العرض
            const neuronCount = Math.min(60, Math.floor((width * height) / 25000)); 
            const maxConnectionDistance = 150;

            // كائن لتتبع حركة الفأرة لإحداث جاذبية متجاوبة لطيفة
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
                    // سرعة انتقال بطيئة وثابتة لمحاكاة النبض الهادئ العشوائي
                    this.vx = (Math.random() - 0.5) * 0.35;
                    this.vy = (Math.random() - 0.5) * 0.35;
                    this.radius = Math.random() * 2 + 1.5;
                }

                update() {
                    this.x += this.vx;
                    this.y += this.vy;

                    // الارتداد الهادئ عن جدران الشاشة
                    if (this.x < 0 || this.x > width) this.vx *= -1;
                    if (this.y < 0 || this.y > height) this.vy *= -1;

                    // تأثير تفاعلي خفيف لجاذبية الفأرة دون تشتيت
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
                    // لون النواة مشتق من درجة الـ Accent Blue مع شفافية فائقة النعومة
                    ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
                    ctx.fill();
                }
            }

            // توليد النواة العصبية الأولية
            for (let i = 0; i < neuronCount; i++) {
                neurons.push(new Neuron());
            }

            // حلقة المحاكاة والأنيميشن المستمر
            const animate = () => {
                ctx.clearRect(0, 0, width, height);

                // تحديث ورسم العصبونات وتوصيل المسارات والروابط
                for (let i = 0; i < neurons.length; i++) {
                    neurons[i].update();
                    neurons[i].draw();

                    for (let j = i + 1; j < neurons.length; j++) {
                        const dx = neurons[i].x - neurons[j].x;
                        const dy = neurons[i].y - neurons[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < maxConnectionDistance) {
                            // حساب شفافية الخيط العصبي بناءً على بعده ليتلاشى بنعومة فائقة
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

        document.addEventListener('DOMContentLoaded', _renderEngine);
        // 1. منع النقر بالزر الأيمن للفأرة (Context Menu)
document.addEventListener('contextmenu', (event) => event.preventDefault());

// 2. حظر اختصارات لوحة المفاتيح الشهيرة للوصول إلى الكود
document.addEventListener('keydown', (event) => {
    // حظر زر F12
    if (event.key === 'F12' || event.keyCode === 123) {
        event.preventDefault();
        return false;
    }

    // حظر Ctrl+Shift+I (فتح أدوات المطورين) و Ctrl+Shift+J (فتح الكونسول)
    if (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.keyCode === 73 || event.key === 'J' || event.keyCode === 74)) {
        event.preventDefault();
        return false;
    }

    // حظر Ctrl+Shift+C (أداة فحص العناصر Inspect Element)
    if (event.ctrlKey && event.shiftKey && (event.key === 'C' || event.keyCode === 67)) {
        event.preventDefault();
        return false;
    }

    // حظر Ctrl+U (عرض سورس الصفحة View Source)
    if (event.ctrlKey && (event.key === 'u' || event.keyCode === 85)) {
        event.preventDefault();
        return false;
    }

    // حظر Ctrl+S (لحفظ الملفات محلياً)
    if (event.ctrlKey && (event.key === 's' || event.keyCode === 83)) {
        event.preventDefault();
        return false;
    }
});

// 3. نظام رادار متقدم: كشف فتح أدوات المطورين وعمل تجميد برميجي (Debugger Loop)
// بمجرد أن يحاول مستخدم متقدم فتح أدوات المطورين عبر القائمة الجانبية للمتصفح، سيتم توقيف المتصفح تلقائياً
(function() {
    const checkDevTools = function() {
        const startTime = new Date().getTime();
        // إطلاق دالة الجرد البرمجي
        debugger; 
        const endTime = new Date().getTime();
        
        // إذا استغرق التنفيذ أكثر من 100 مللي ثانية، فهذا يعني أن المتصفح متوقف عند الـ debugger (الأدوات مفتوحة)
        if (endTime - startTime > 100) {
            // إعادة توجيه المستخدم أو تفريغ الصفحة لمنع الرؤية
            document.body.innerHTML = "<h1 style='color:#38bdf8; text-align:center; margin-top:20%; font-family:sans-serif;'>Security Protocol Activated. Access Denied.</h1>";
        }
    };
    
    // تشغيل الفحص الأمني بشكل دوري كل ثانية
    setInterval(checkDevTools, 1000);
})();
