// تشغيل أيقونات Lucide الرائعة
lucide.createIcons();

// 1. نظام التحويل والتبديل المتقدم للوضع الداكن / الفاتح
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// التحقق من التفضيل المحفوظ سابقاً أو تفضيل النظام الافتراضي
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);
} else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = prefersDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', defaultTheme);
    updateIcon(defaultTheme);
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.setAttribute('data-lucide', 'sun');
    } else {
        icon.setAttribute('data-lucide', 'moon');
    }
    lucide.createIcons(); // إعادة بناء الأيقونة بعد التغيير
}

// 2. تتبع التمرير لتحديث الرابط النشط في شريط التنقل وتأثيرات الظهور
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = {
    root: null,
    threshold: 0.2, // يشتغل التأثير عندما يظهر 20% من القسم
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // إضافة كلاس الظهور الحركي للأقسام
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // تحديث الرابط النشط في الـ Navbar
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});