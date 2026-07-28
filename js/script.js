const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let currentTheme = 'light';
let fireworks = [];
let comets = [];
let auroraTime = 0;
let oceanTime = 0;
let sakuraFlowers = [];
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (currentTheme === 'sakura') initSakuraFlowers();
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
class Particle {
    constructor(type = 'default') {
        this.type = type;
        this.reset();
    }
    reset() {
        if (this.type === 'default') {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3 - 0.1;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.fadeSpeed = Math.random() * 0.003 + 0.001;
            this.growing = Math.random() > 0.5;
            const colors = ['#d4a853', '#c77d8a', '#8ab4c7', '#9b8ec4', '#f0d48a'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        } else if (this.type === 'star') {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = 0;
            this.speedY = 0;
            this.opacity = Math.random() * 0.8 + 0.2;
            this.fadeSpeed = Math.random() * 0.005 + 0.002;
            this.growing = Math.random() > 0.5;
            this.color = '#ffffff';
        } else if (this.type === 'leaf') {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 8 + 6;
            this.speedX = (Math.random() - 0.5) * 1;
            this.speedY = Math.random() * 1.5 + 0.5;
            this.opacity = Math.random() * 0.6 + 0.4;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.05;
            this.color = ['#7cb342', '#8bc34a', '#9ccc65', '#aed581'][Math.floor(Math.random() * 4)];
        } else if (this.type === 'snow') {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 5 + 2;
            this.speedX = (Math.random() - 0.3) * 3;
            this.speedY = Math.random() * 2.5 + 1.5;
            this.opacity = Math.random() * 0.8 + 0.2;
            this.color = '#ffffff';
            this.wobble = Math.random() * Math.PI * 2;
            this.wobbleSpeed = Math.random() * 0.05 + 0.02;
        } else if (this.type === 'cloud') {
            this.x = -100;
            this.y = Math.random() * canvas.height * 0.6;
            this.size = Math.random() * 40 + 30;
            this.speedX = Math.random() * 0.3 + 0.1;
            this.speedY = 0;
            this.opacity = Math.random() * 0.3 + 0.2;
            this.color = '#ffffff';
        } else if (this.type === 'bubble') {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 20;
            this.size = Math.random() * 8 + 3;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = -(Math.random() * 1 + 0.5);
            this.opacity = Math.random() * 0.5 + 0.3;
            this.wobble = Math.random() * Math.PI * 2;
            this.wobbleSpeed = Math.random() * 0.03 + 0.01;
            const colors = ['#ffffff', '#95e1d3', '#7ec8ff', '#4ecdc4'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        } else if (this.type === 'petal') {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 10 + 6;
            this.speedX = (Math.random() - 0.5) * 1.2;
            this.speedY = Math.random() * 1 + 0.4;
            this.opacity = Math.random() * 0.7 + 0.3;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.04;
            this.wobble = Math.random() * Math.PI * 2;
            this.wobbleSpeed = Math.random() * 0.03 + 0.01;
            const colors = ['#ffb7c5', '#ff9eb5', '#ffc0cb', '#ff69b4', '#ffd1dc'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        } else if (this.type === 'butterfly') {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height * 0.7;
            this.size = Math.random() * 8 + 6;
            this.speedX = (Math.random() - 0.5) * 1;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.6 + 0.4;
            this.wingPhase = Math.random() * Math.PI * 2;
            this.wingSpeed = Math.random() * 0.15 + 0.1;
            const colors = ['#ff69b4', '#ffb7c5', '#c89eff', '#88c8e8', '#f0d48a'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
    }
    update() {
        if (this.type === 'default' || this.type === 'star') {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.growing) {
                this.opacity += this.fadeSpeed;
                if (this.opacity >= 0.8) this.growing = false;
            } else {
                this.opacity -= this.fadeSpeed;
                if (this.opacity <= 0) this.reset();
            }
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
        } else if (this.type === 'leaf') {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;
            if (this.y > canvas.height + 20) this.reset();
        } else if (this.type === 'snow') {
            this.wobble += this.wobbleSpeed;
            this.x += this.speedX + Math.sin(this.wobble) * 1.5;
            this.y += this.speedY;
            if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) this.reset();
        } else if (this.type === 'cloud') {
            this.x += this.speedX;
            if (this.x > canvas.width + 100) this.reset();
        } else if (this.type === 'bubble') {
            this.wobble += this.wobbleSpeed;
            this.x += this.speedX + Math.sin(this.wobble) * 0.5;
            this.y += this.speedY;
            if (this.y < -20) this.reset();
        } else if (this.type === 'petal') {
            this.wobble += this.wobbleSpeed;
            this.x += this.speedX + Math.sin(this.wobble) * 1;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;
            if (this.y > canvas.height + 20) this.reset();
        } else if (this.type === 'butterfly') {
            this.wingPhase += this.wingSpeed;
            this.x += this.speedX + Math.sin(this.wingPhase * 0.3) * 0.8;
            this.y += this.speedY + Math.cos(this.wingPhase * 0.3) * 0.5;
            if (this.x < -50 || this.x > canvas.width + 50 || this.y < -50 || this.y > canvas.height + 50) this.reset();
        }
    }
    draw() {
        ctx.globalAlpha = this.opacity;
        if (this.type === 'default' || this.type === 'star') {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        } else if (this.type === 'leaf') {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size, this.size * 0.5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        } else if (this.type === 'snow') {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        } else if (this.type === 'cloud') {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.arc(this.x + this.size * 0.6, this.y - this.size * 0.2, this.size * 0.8, 0, Math.PI * 2);
            ctx.arc(this.x + this.size * 1.2, this.y, this.size * 0.7, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.type === 'bubble') {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.25, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.8)';
            ctx.fill();
        } else if (this.type === 'petal') {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size, this.size * 0.5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(-this.size, 0);
            ctx.lineTo(this.size, 0);
            ctx.stroke();
            ctx.restore();
        } else if (this.type === 'butterfly') {
            const wingFlap = Math.sin(this.wingPhase) * 0.8;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.fillStyle = this.color;
            ctx.save();
            ctx.scale(1, wingFlap > 0 ? 0.5 + wingFlap * 0.5 : 1);
            ctx.beginPath();
            ctx.ellipse(-this.size * 0.6, 0, this.size, this.size * 0.7, -0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            ctx.save();
            ctx.scale(1, wingFlap > 0 ? 0.5 + wingFlap * 0.5 : 1);
            ctx.beginPath();
            ctx.ellipse(this.size * 0.6, 0, this.size, this.size * 0.7, 0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            ctx.fillStyle = 'rgba(60,40,60,0.8)';
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size * 0.15, this.size * 0.6, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
        ctx.globalAlpha = 1;
    }
}
class Comet {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.3;
        const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
        const speed = Math.random() * 6 + 4;
        this.speedX = Math.cos(angle) * speed;
        this.speedY = Math.sin(angle) * speed;
        this.size = Math.random() * 2 + 1.5;
        this.trail = [];
        this.maxTrail = 25;
        this.life = 1;
        this.active = true;
    }
    update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrail) this.trail.shift();
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width + 50 || this.y > canvas.height + 50) {
            this.active = false;
        }
    }
    draw() {
        for (let i = 0; i < this.trail.length; i++) {
            const t = this.trail[i];
            const alpha = (i / this.trail.length) * 0.7;
            const size = (i / this.trail.length) * this.size;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(t.x, t.y, size, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.3, 'rgba(255,240,200,0.6)');
        gradient.addColorStop(1, 'rgba(255,240,200,0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}
function initSakuraFlowers() {
    sakuraFlowers = [];
    const count = Math.floor(canvas.width / 60);
    for (let i = 0; i < count; i++) {
        sakuraFlowers.push({
            x: (i / count) * canvas.width + Math.random() * 40,
            y: canvas.height - Math.random() * 40 - 10,
            size: Math.random() * 8 + 6,
            rotation: Math.random() * Math.PI * 2,
            color: ['#ff69b4', '#ffb7c5', '#ff9eb5', '#ffc0cb'][Math.floor(Math.random() * 4)]
        });
    }
}
function drawSakuraFlower(f) {
    ctx.save();
    ctx.translate(f.x, f.y);
    ctx.rotate(f.rotation);
    ctx.globalAlpha = 0.7;
    for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.rotate((i / 5) * Math.PI * 2);
        ctx.fillStyle = f.color;
        ctx.beginPath();
        ctx.ellipse(0, -f.size, f.size * 0.5, f.size, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    ctx.fillStyle = '#fff59d';
    ctx.beginPath();
    ctx.arc(0, 0, f.size * 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.globalAlpha = 1;
}
function drawOceanWaves() {
    oceanTime += 0.01;
    const waveColors = [
        'rgba(78, 205, 196, 0.3)',
        'rgba(126, 200, 255, 0.25)',
        'rgba(149, 225, 211, 0.2)'
    ];
    for (let w = 0; w < 3; w++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        const baseY = canvas.height - 40 - w * 15;
        const amplitude = 8 + w * 3;
        const frequency = 0.01 + w * 0.003;
        const offset = oceanTime * (1 + w * 0.3);
        for (let x = 0; x <= canvas.width; x += 5) {
            const y = baseY + Math.sin(x * frequency + offset) * amplitude + Math.sin(x * frequency * 2 + offset * 1.5) * amplitude * 0.5;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fillStyle = waveColors[w];
        ctx.fill();
    }
}
function drawAurora() {
    auroraTime += 0.005;
    const layers = [
        { color1: 'rgba(74, 222, 128, 0.4)', color2: 'rgba(74, 222, 128, 0)', yBase: 80, amplitude: 40, freq: 0.005, speed: 1 },
        { color1: 'rgba(167, 139, 250, 0.35)', color2: 'rgba(167, 139, 250, 0)', yBase: 120, amplitude: 50, freq: 0.004, speed: 0.7 },
        { color1: 'rgba(244, 114, 182, 0.3)', color2: 'rgba(244, 114, 182, 0)', yBase: 160, amplitude: 35, freq: 0.006, speed: 1.3 },
        { color1: 'rgba(45, 212, 191, 0.25)', color2: 'rgba(45, 212, 191, 0)', yBase: 200, amplitude: 45, freq: 0.003, speed: 0.9 }
    ];
    layers.forEach(layer => {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        for (let x = 0; x <= canvas.width; x += 10) {
            const y = layer.yBase + Math.sin(x * layer.freq + auroraTime * layer.speed) * layer.amplitude + Math.sin(x * layer.freq * 2 + auroraTime * layer.speed * 1.5) * layer.amplitude * 0.3;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, 0);
        ctx.closePath();
        const gradient = ctx.createLinearGradient(0, 0, 0, layer.yBase + layer.amplitude);
        gradient.addColorStop(0, layer.color2);
        gradient.addColorStop(0.5, layer.color1);
        gradient.addColorStop(1, layer.color2);
        ctx.fillStyle = gradient;
        ctx.fill();
    });
}
function initParticles() {
    particles = [];
    comets = [];
    if (currentTheme === 'stars') {
        for (let i = 0; i < 150; i++) particles.push(new Particle('star'));
    } else if (currentTheme === 'spring') {
        for (let i = 0; i < 30; i++) particles.push(new Particle('leaf'));
    } else if (currentTheme === 'winter') {
        for (let i = 0; i < 180; i++) particles.push(new Particle('snow'));
    } else if (currentTheme === 'bird') {
        for (let i = 0; i < 8; i++) particles.push(new Particle('cloud'));
    } else if (currentTheme === 'ocean') {
        for (let i = 0; i < 50; i++) particles.push(new Particle('bubble'));
    } else if (currentTheme === 'sakura') {
        for (let i = 0; i < 35; i++) particles.push(new Particle('petal'));
        for (let i = 0; i < 5; i++) particles.push(new Particle('butterfly'));
        initSakuraFlowers();
    } else if (currentTheme === 'aurora') {
        for (let i = 0; i < 80; i++) particles.push(new Particle('star'));
    } else {
        for (let i = 0; i < 60; i++) particles.push(new Particle('default'));
    }
}
function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.6;
    const colors = ['#ff66aa', '#66ccff', '#ffcc00', '#66ffaa', '#cc66ff', '#ff9966'];
    fireworks.push({
        x, y,
        radius: 0,
        maxRadius: Math.random() * 60 + 40,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 1,
        speed: Math.random() * 2 + 1
    });
}
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (currentTheme === 'aurora') {
        drawAurora();
    }
    particles.forEach(p => { p.update(); p.draw(); });
    if (currentTheme === 'ocean') {
        drawOceanWaves();
    }
    if (currentTheme === 'sakura') {
        sakuraFlowers.forEach(drawSakuraFlower);
    }
    if (currentTheme === 'stars') {
        if (Math.random() < 0.005 && comets.length < 3) {
            comets.push(new Comet());
        }
        comets = comets.filter(c => {
            c.update();
            c.draw();
            return c.active;
        });
    }
    if (currentTheme === 'fireworks') {
        if (Math.random() < 0.02) createFirework();
        fireworks = fireworks.filter(fw => {
            fw.radius += fw.speed;
            fw.opacity = 1 - (fw.radius / fw.maxRadius);
            if (fw.opacity <= 0) return false;
            ctx.globalAlpha = fw.opacity;
            ctx.beginPath();
            ctx.arc(fw.x, fw.y, fw.radius, 0, Math.PI * 2);
            ctx.strokeStyle = fw.color;
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.globalAlpha = 1;
            return true;
        });
    }
    requestAnimationFrame(animateParticles);
}
initParticles();
animateParticles();
const THEMES = [
    { id: 'light', name: 'Светлая', icon: '☀️', colors: ['#fdf6e3', '#d4a853', '#c77d8a'] },
    { id: 'dark', name: 'Тёмная', icon: '🌙', colors: ['#1f1a15', '#e0b865', '#d8909c'] },
    { id: 'stars', name: 'Звёздная ночь', icon: '✨', colors: ['#0a0a1f', '#ffd700', '#ffffff'] },
    { id: 'spring', name: 'Весенний лес', icon: '🌿', colors: ['#f0f8e8', '#6aaa5a', '#8bc34a'] },
    { id: 'winter', name: 'Зимняя сказка', icon: '❄️', colors: ['#e8f0f8', '#78a8c8', '#ffffff'] },
    { id: 'fireworks', name: 'Салютами', icon: '🎆', colors: ['#1a1020', '#ff66aa', '#ffcc00'] },
    { id: 'bird', name: 'Птица', icon: '🕊️', colors: ['#e8f4ff', '#68a8d8', '#ffffff'] },
    { id: 'ocean', name: 'Океан', icon: '🌊', colors: ['#0a2540', '#4ecdc4', '#95e1d3'] },
    { id: 'sakura', name: 'Сакура', icon: '🌸', colors: ['#fff5f7', '#ff69b4', '#ffb7c5'] },
    { id: 'aurora', name: 'Северное сияние', icon: '🌌', colors: ['#0a1628', '#4ade80', '#a78bfa'] }
];
function applyTheme(themeId) {
    currentTheme = themeId;
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('dreamboard_theme', themeId);
    initParticles();
}
function openThemePicker() {
    const activeTheme = currentTheme;
    showGenericModal(`<h3 class="modal-title">🎨 Выбери атмосферу</h3> <div class="modal-subtitle">Каждая тема — это своё настроение. Найди ту, что откликается.</div> <div class="theme-grid"> ${THEMES.map(t => ` <div class= "theme-card ${t.id === activeTheme ? 'active' : ''} " onclick= "selectTheme('${t.id}') " >
 <div class= "theme-icon " >${t.icon} </div >
 <div class= "theme-name " >${t.name} </div >
 <div class= "theme-preview " >
${t.colors.map(c => `<div class="theme-preview-dot" style="background:${c}"></div>`).join('')}
 </div >
 </div >
 `).join('')} </div> <div class="modal-actions"> <button class="btn btn-primary" onclick="closeGenericModal()">Готово</button> </div>`);
}
function selectTheme(themeId) {
    applyTheme(themeId);
    closeGenericModal();
    setTimeout(openThemePicker, 300);
}
(function initTheme() {
    const saved = localStorage.getItem('dreamboard_theme') || 'light';
    applyTheme(saved);
})();
function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') { input.type = 'text'; btn.textContent = '🙈'; }
    else { input.type = 'password'; btn.textContent = '👁️'; }
}
const DEFAULT_CATEGORIES = [
    { id: 'life', name: 'Жизнь', emoji: '🌱', color: 'mint' },
    { id: 'travel', name: 'Путешествия', emoji: '✈️', color: 'sky' },
    { id: 'career', name: 'Карьера', emoji: '💼', color: 'gold' },
    { id: 'love', name: 'Любовь', emoji: '💕', color: 'rose' },
    { id: 'creative', name: 'Творчество', emoji: '🎨', color: 'lavender' },
    { id: 'health', name: 'Здоровье', emoji: '🧘', color: 'mint' },
    { id: 'finance', name: 'Финансы', emoji: '💰', color: 'gold' },
    { id: 'other', name: 'Другое', emoji: '🌈', color: 'sunset' }
];
function getUsers() { return JSON.parse(localStorage.getItem('dreamboard_users') || '{}'); }
function saveUsers(users) { localStorage.setItem('dreamboard_users', JSON.stringify(users)); }
function getCurrentUser() {
    const login = localStorage.getItem('dreamboard_current_user');
    if (!login) return null;
    return getUsers()[login] || null;
}
function saveCurrentUser(user) {
    const users = getUsers();
    users[user.login] = user;
    saveUsers(users);
}
function getDreams() { const u = getCurrentUser(); return u ? (u.dreams || []) : []; }
function saveDreams(dreams) { const u = getCurrentUser(); if (u) { u.dreams = dreams; saveCurrentUser(u); } }
function getThoughts() { const u = getCurrentUser(); return u ? (u.thoughts || []) : []; }
function saveThoughts(thoughts) { const u = getCurrentUser(); if (u) { u.thoughts = thoughts; saveCurrentUser(u); } }
function getCategories() {
    const u = getCurrentUser();
    if (!u) return [];
    if (!u.categories || u.categories.length === 0) {
        u.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
        saveCurrentUser(u);
    }
    return u.categories;
}
function saveCategories(cats) { const u = getCurrentUser(); if (u) { u.categories = cats; saveCurrentUser(u); } }
function getCategoryById(id) { return getCategories().find(c => c.id === id) || { id: 'other', name: 'Другое', emoji: '🌈', color: 'sunset' }; }
function showGenericModal(html) {
    document.getElementById('genericModalContent').innerHTML = html;
    document.getElementById('genericModal').classList.add('show');
}
function closeGenericModal() { document.getElementById('genericModal').classList.remove('show'); }
document.getElementById('genericModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('genericModal')) closeGenericModal();
});
function customConfirm({ title = 'Подтвердите', message = '', icon = '🤔', confirmText = 'Да', cancelText = 'Отмена', danger = false }) {
    return new Promise(resolve => {
        showGenericModal(`<h3 class="modal-title">${icon} ${escapeHtml(title)}</h3> <div class="modal-subtitle">${escapeHtml(message)}</div> <div class="modal-actions"> <button class="btn btn-secondary" onclick="window.__resolveModal(false)">${cancelText}</button> <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" onclick="window.__resolveModal(true)">${confirmText}</button> </div>`);
        window.__resolveModal = (val) => { closeGenericModal(); resolve(val); };
    });
}
let currentTimeEmoji = '', currentTimeGreeting = '';
function initGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) { currentTimeGreeting = 'Доброе утро'; currentTimeEmoji = '🌅'; }
    else if (hour >= 12 && hour < 17) { currentTimeGreeting = 'Добрый день'; currentTimeEmoji = '☀️'; }
    else if (hour >= 17 && hour < 22) { currentTimeGreeting = 'Добрый вечер'; currentTimeEmoji = '🌇'; }
    else { currentTimeGreeting = 'Доброй ночи'; currentTimeEmoji = '🌙'; }
}
function getGreeting() {
    const u = getCurrentUser();
    if (!u) return '';
    return `${currentTimeGreeting}, <strong>${escapeHtml(u.name)}</strong> <span class="greeting-emoji">${currentTimeEmoji}</span>`;
}
const warmPhrases = [
    "{name}, помни: каждая мечта — это маленькая вселенная ✨ ",
    "Ты удивительный человек, {name} 🌙 ",
    "{name}, даже самые смелые мечты начинаются с шага 🌱 ",
    "Сегодня отличный день, чтобы верить в чудеса, {name} 💫 ",
    "{name}, твои мечты важны 🌟 ",
    "Вселенная любит тех, кто мечтает, {name} 🌌 ",
    "{name}, не торопись. Всё приходит в своё время 🌸 ",
    "Ты уже на пути, {name} 💛 ",
    "{name}, мечты не стареют 🌿 ",
    "Звёзды светят для тех, кто смотрит вверх, {name} ⭐ ",
    "{name}, ты делаешь этот мир волшебнее 🌈 ",
    "Не бойся мечтать масштабно, {name} 🚀 ",
    "Сегодня хороший день для мечтаний, {name} 🌻 ",
    "{name}, мечты сбываются у тех, кто верит 💫 ",
    "{name}, маленький шаг сегодня — большое чудо завтра 🌱 ",
    "Пусть этот день принесёт волшебство, {name} ✨ ",
    "{name}, твой внутренний свет делает мечты реальностью 🕯️ ",
    "Дыши глубже, {name}. Мечты любят спокойные сердца 🌬️ "
];
let phraseIndex = 0;
function showRandomWarmPhrase() {
    const u = getCurrentUser();
    const name = u ? u.name : 'друг';
    const phrase = warmPhrases[phraseIndex % warmPhrases.length].replace('{name}', name);
    phraseIndex++;
    const styles = ['', 'warm', 'rose', 'sky'];
    showToast(phrase, styles[Math.floor(Math.random() * styles.length)]);
}
let warmPhraseTimer = null;
function scheduleWarmPhrase() {
    if (warmPhraseTimer) clearTimeout(warmPhraseTimer);
    warmPhraseTimer = setTimeout(() => {
        if (document.getElementById('appScreen').classList.contains('active')) showRandomWarmPhrase();
        scheduleWarmPhrase();
    }, (45 + Math.random() * 45) * 1000);
}
function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    hideAuthError();
    if (tab === 'login') {
        document.querySelectorAll('.auth-tab')[0].classList.add('active');
        document.getElementById('loginForm').classList.add('active');
    } else {
        document.querySelectorAll('.auth-tab')[1].classList.add('active');
        document.getElementById('registerForm').classList.add('active');
    }
}
function showAuthError(msg) { const el = document.getElementById('authError'); el.textContent = msg; el.classList.add('show'); }
function hideAuthError() { document.getElementById('authError').classList.remove('show'); }
function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const login = document.getElementById('regUsername').value.trim().toLowerCase();
    const password = document.getElementById('regPassword').value;
    const users = getUsers();
    if (users[login]) { showAuthError('Пользователь с таким логином уже существует'); return; }
    users[login] = { name, login, password, dreams: [], thoughts: [], categories: JSON.parse(JSON.stringify(DEFAULT_CATEGORIES)), createdAt: Date.now() };
    saveUsers(users);
    localStorage.setItem('dreamboard_current_user', login);
    showApp();
    showToast(`Добро пожаловать в мир мечтаний, ${name}! ✨`, 'warm');
}
function handleLogin(e) {
    e.preventDefault();
    const login = document.getElementById('loginUsername').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    const users = getUsers();
    const user = users[login];
    if (!user || user.password !== password) { showAuthError('Неверный логин или пароль ⚠️'); return; }
    localStorage.setItem('dreamboard_current_user', login);
    showApp();
    showToast(`С возвращением, ${user.name}! 👋`, 'warm');
}
async function handleLogout() {
    document.getElementById('userDropdown').classList.remove('show');
    const confirmed = await customConfirm({ title: 'Выйти из аккаунта?', message: 'Ваши мечты будут ждать вас здесь.', icon: '🚪', confirmText: 'Выйти', cancelText: 'Остаться' });
    if (!confirmed) return;
    localStorage.removeItem('dreamboard_current_user');
    document.getElementById('appScreen').classList.remove('active');
    document.getElementById('authScreen').classList.add('active');
    document.getElementById('loginForm').reset();
    document.getElementById('registerForm').reset();
    hideAuthError();
    if (warmPhraseTimer) clearTimeout(warmPhraseTimer);
}
function openForgotPasswordModal() {
    showGenericModal(`<div class="in-dev-illustration"> <span class="big-icon">🔮</span> <div><span class="sub-icon">✨</span><span class="sub-icon">🛠️</span><span class="sub-icon">💫</span></div> </div> <h3 class="modal-title" style="text-align:center;">Наша общая мечта</h3> <div class="in-dev-quote">«Восстановление пароля —<br>это тоже мечта, которая скоро сбудется»</div> <div class="in-dev-text">Мы уже работаем над этой функцией. Наши мастера-волшебники колдуют над ней день и ночь.</div> <div class="in-dev-progress"></div> <div class="in-dev-text" style="font-size:14px; opacity:0.8;">А пока — помни: мечты сбываются у тех, кто в них верит ✨</div> <div class="modal-actions"><button class="btn btn-primary" onclick="closeGenericModal()">Понятно, жду ✨</button></div>`);
}
function openInfoModal() {
    document.getElementById('userDropdown').classList.remove('show');
    showGenericModal(`
 <div class= "info-modal-content " >
 <span class= "info-logo " >🌙 </span >
 <div class= "info-title " >DreamBoard </div >
 <div class= "info-tagline " >Книга мечтаний — место, где мечты становятся ближе ✨ </div >
 <div class= "info-credits " >
 <div class= "info-credits-title " >✨ Для вас старались </div >
 <div class= "info-credit-row " > <span class= "label " >Автор идеи и креатив </span > <span class= "value " >MylnikCode </span > </div >
 <div class= "info-credit-row " > <span class= "label " >Реализация </span > <span class= "value " >Qwen 3.7 Plus </span > </div >
 <div class= "info-credit-row " > <span class= "label " >Версия платформы </span > <span class= "value " >v7.1 </span > </div >
 </div >
<div class= "info-roadmap " >
 <div class= "info-roadmap-title " >🔮 Наши мечты о платформе </div >
 <div class= "roadmap-item " >
 <div class= "roadmap-icon " >🖌️ </div >
 <div class= "roadmap-content " >
 <div class= "roadmap-name " >Персонализация </div >
 <div class= "roadmap-desc " >Предоставить пользователям максимальную свободу творчества: аватарки, собственные темы, цвета градиентов для карточек✨ </div >
 </div >
 </div >
 <div class= "roadmap-item " >
 <div class= "roadmap-icon " >☁️ </div >
 <div class= "roadmap-content " >
 <div class= "roadmap-name " >Синхронизация между устройствами </div >
 <div class= "roadmap-desc " >Облачное хранение — мечты всегда с тобой, на любом устройстве, в любое время, в любом месте🌐 </div >
 </div >
 </div >
 <div class= "roadmap-item " >
 <div class= "roadmap-icon " >⏳ </div >
 <div class= "roadmap-content " >
 <div class= "roadmap-name " >Капсула времени </div >
 <div class= "roadmap-desc " >Запечатай мечту до определённой даты. Пусть она живёт в тишине, пока не придёт её час раскрыться🎁 </div >
 </div >
 </div >
 <div class= "roadmap-item " >
 <div class= "roadmap-icon " >🗺️ </div >
 <div class= "roadmap-content " >
 <div class= "roadmap-name " >Карта желаний </div >
 <div class= "roadmap-desc " >Бесконечное пространство, на котором человек может пркреплять фотокарточки, располагать дополнительные элементы и получать за это достиженя🏆 </div >
 </div >
 </div >
 </div >
 <div class= "info-version " >Создано с любовью к мечтателям  <span class= "ver-num " >♥ </span > </div >
 </div >
 <div class= "modal-actions " > <button class= "btn btn-primary " onclick= "closeGenericModal() " >Закрыть </button > </div >
`);
}
let currentMode = 'dreams';
function switchMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
    if (mode === 'dreams') {
        document.querySelectorAll('.mode-tab')[0].classList.add('active');
        document.getElementById('dreamsMode').style.display = '';
        document.getElementById('thoughtsMode').style.display = 'none';
        document.getElementById('mainFab').style.display = '';
        document.getElementById('mainFab').onclick = openCreateModal;
        document.getElementById('mainFab').title = 'Новая мечта';
        document.getElementById('mainFab').textContent = '✦';
    } else {
        document.querySelectorAll('.mode-tab')[1].classList.add('active');
        document.getElementById('dreamsMode').style.display = 'none';
        document.getElementById('thoughtsMode').style.display = '';
        document.getElementById('mainFab').style.display = '';
        document.getElementById('mainFab').onclick = openCreateThoughtModal;
        document.getElementById('mainFab').title = 'Новая мысль';
        document.getElementById('mainFab').textContent = '✎';
        renderDiary();
    }
}
let currentFilter = 'all';
let hideFulfilled = false;
function showApp() {
    initGreeting();
    document.getElementById('authScreen').classList.remove('active');
    document.getElementById('appScreen').classList.add('active');
    const u = getCurrentUser();
    document.getElementById('userAvatar').textContent = u.name.charAt(0).toUpperCase();
    document.getElementById('dropdownName').textContent = u.name;
    document.getElementById('dropdownLogin').textContent = '@' + u.login;
    switchMode('dreams');
    renderDreams();
    scheduleWarmPhrase();
    initNotifications();
}
function toggleUserMenu() { document.getElementById('userDropdown').classList.toggle('show'); }
document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu')) document.getElementById('userDropdown').classList.remove('show');
});
function renderDreams() {
    const allDreams = getDreams();
    const dreams = allDreams.filter(d => !d.archived);
    const categories = getCategories();
    const fulfilledCount = dreams.filter(d => d.fulfilled).length;
    const archivedCount = allDreams.filter(d => d.archived).length;
    document.getElementById('greeting').innerHTML = getGreeting();
    document.getElementById('statsBar').innerHTML = `
<div class="stat-chip"><span class="stat-num">${dreams.length}</span><span>всего мечтаний</span></div>
<div class="stat-chip"><span class="stat-num">${fulfilledCount}</span><span>исполнилось ✨</span></div>
<div class="stat-chip"><span class="stat-num">${dreams.length - fulfilledCount}</span><span>в пути 🌟</span></div>
${archivedCount > 0 ? `<div class="stat-chip" style="cursor:pointer;" onclick="openArchiveModal()"><span class="stat-num">${archivedCount}</span><span>в архиве 📦</span></div>` : ''}
`;
    const usedCats = [...new Set(dreams.map(d => d.category))];
    let filterHTML = `<button class="filter-chip ${currentFilter === 'all' ? 'active' : ''}" onclick="setFilter('all')">Все</button>`;
    filterHTML += `<button class="filter-chip ${currentFilter === 'fulfilled' ? 'active' : ''}" onclick="setFilter('fulfilled')">✨ Исполнившиеся</button>`;
    filterHTML += `<button class="filter-chip ${currentFilter === 'priority' ? 'active' : ''}" onclick="setFilter('priority')">🔥 Приоритет</button>`;
    usedCats.forEach(catId => {
        const c = categories.find(cat => cat.id === catId) || getCategoryById(catId);
        const activeClass = currentFilter === catId ? `active-${c.color}` : '';
        filterHTML += `<button class="filter-chip ${activeClass}" onclick="setFilter('${catId}')">${c.emoji} ${escapeHtml(c.name)}</button>`;
    });
    filterHTML += `<div class="filter-divider"></div>`;
    filterHTML += `<label class="filter-toggle ${hideFulfilled ? 'active' : ''}" onclick="toggleHideFulfilled(event)"><input type="checkbox" ${hideFulfilled ? 'checked' : ''}><span class="check-box">✓</span><span>Скрыть исполненные</span></label>`;
    document.getElementById('filterBar').innerHTML = filterHTML;
    let filtered = dreams;
    if (hideFulfilled) filtered = filtered.filter(d => !d.fulfilled);
    if (currentFilter === 'fulfilled') filtered = filtered.filter(d => d.fulfilled);
    else if (currentFilter === 'priority') filtered = filtered.filter(d => d.priority);
    else if (currentFilter !== 'all') filtered = filtered.filter(d => d.category === currentFilter);
    filtered.sort((a, b) => {
        if (a.priority !== b.priority) return a.priority ? -1 : 1;
        if (a.fulfilled !== b.fulfilled) return a.fulfilled ? 1 : -1;
        return b.createdAt - a.createdAt;
    });
    if (filtered.length === 0) {
        const u = getCurrentUser();
        const name = u ? u.name : 'друг';
        let emptyMsg;
        if (dreams.length === 0) emptyMsg = { icon: '🌙', title: 'Пока здесь тихо...', text: `${name}, запиши свою первую мечту ✨` };
        else if (currentFilter === 'priority') emptyMsg = { icon: '🔥', title: 'Нет приоритетной мечты', text: `${name}, выбери одну мечту — нажми на ❗ на карточке` };
        else if (hideFulfilled && dreams.length > 0 && dreams.every(d => d.fulfilled)) emptyMsg = { icon: '🎉', title: 'Все мечты исполнились!', text: `${name}, это невероятно! 🌟` };
        else emptyMsg = { icon: '🔍', title: 'Ничего не найдено', text: 'Попробуй другой фильтр' };
        document.getElementById('dreamsGrid').innerHTML = `
   <div class="empty-state" style="grid-column: 1/-1;">
     <div class="empty-icon">${emptyMsg.icon}</div>
     <h3>${emptyMsg.title}</h3>
     <p>${emptyMsg.text}</p>
     ${dreams.length === 0 ? '<button class="btn btn-primary" onclick="openCreateModal()" style="width:auto;">✦ Записать мечту</button>' : ''}
   </div>
 `;
        return;
    }
    document.getElementById('dreamsGrid').innerHTML = filtered.map((dream, i) => {
        const cat = getCategoryById(dream.category);
        const progress = calculateProgress(dream);
        const progressText = dream.steps && dream.steps.length > 0
            ? `Исполнена на ${progress}%`
            : (dream.fulfilled ? 'Исполнена на 100%' : 'Исполнена на 0%');
        const hasSteps = dream.steps && dream.steps.length > 0;
        const completedCount = hasSteps ? dream.steps.filter(s => s.completed).length : 0;
        const stepsButtonText = hasSteps ? `👣 Шаги (${completedCount}/${dream.steps.length})` : '';
        return `
<div class= "dream-card ${dream.fulfilled ? 'fulfilled' : ''} ${dream.priority ? 'priority' : ''} " data-color= "${dream.color || 'gold'} " style= "animation-delay: ${i * 0.05}s " >
 <div class= "dream-progress-bar " >
 <div class= "dream-progress-fill " style= "width: ${progress}% " > </div >
 </div >
 <div class= "dream-progress-text " >${progressText} </div >
${dream.priority ? ' <div class= "priority-badge " >🔥 Приоритет </div >' : ''}
 <div class= "dream-card-header " >
 <span class= "dream-category cat-${cat.color} " >${cat.emoji} ${escapeHtml(cat.name)} </span >
 <div class= "dream-actions " >
 <button class= "dream-action-btn priority-btn ${dream.priority ? 'active' : ''} " onclick= "togglePriority('${dream.id}') " title= "${dream.priority ? 'Снять приоритет' : 'Сделать приоритетной'} " >${dream.priority ? '🔥' : '❗'} </button >
 <button class= "dream-action-btn fulfill-btn " onclick= "toggleFulfill('${dream.id}') " title= "${dream.fulfilled ? 'Вернуть в мечты' : 'Исполнено!'} " >${dream.fulfilled ? '↩️' : '⭐'} </button >
 <button class= "dream-action-btn archive-btn " onclick= "archiveDream('${dream.id}') " title= "В архив " >📦 </button >
 <button class= "dream-action-btn share-btn " onclick= "generateShareCard('${dream.id}') " title= "Поделиться мечтой " >📤 </button >
 <button class= "dream-action-btn " onclick= "openEditModal('${dream.id}') " title= "Редактировать " >✏️ </button >
 <button class= "dream-action-btn delete-btn " onclick= "deleteDream('${dream.id}') " title= "Удалить " >🗑️ </button >
 </div >
 </div >
 <div class= "dream-title " >${escapeHtml(dream.title)} </div >
${dream.text ? ` <div class= "dream-text " >${escapeHtml(dream.text)} </div >` : ''}
${hasSteps ? `
 <div class= "dream-steps-dropdown " >
 <button class= "steps-toggle-btn " onclick= "toggleStepsDropdown('${dream.id}', this) " >
 <span >${stepsButtonText} </span >
 <span class= "arrow " >▼ </span >
 </button >
 <div class= "steps-dropdown-content " id= "steps-${dream.id} " >
${dream.steps.map((step, idx) => `
 <div class= "step-item ${step.completed ? 'completed' : ''} " >
 <span class= "step-item-num " >${idx + 1} </span >
 <span class= "step-item-text " >${escapeHtml(step.description)} </span >
 <button class= "step-item-btn ${step.completed ? 'uncheck' : 'check'} " onclick= "toggleStepComplete('${dream.id}', ${idx}) " title= "${step.completed ? 'Отменить выполнение' : 'Отметить выполненным'} " >
${step.completed ? '✕' : '✓'}
 </button >
 </div >
`).join('')}
 </div >
 </div >
` : ''}
 <div class= "dream-footer " >
${dream.fulfilled ? ' <span class= "dream-fulfilled-badge " >✨ Исполнено </span >' : ''}
 </div >
 </div >
`;
    }).join('');
}
function setFilter(filter) { currentFilter = filter; renderDreams(); }
function toggleHideFulfilled(e) { e.preventDefault(); hideFulfilled = !hideFulfilled; renderDreams(); }
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
function populateCategorySelect() {
    const categories = getCategories();
    document.getElementById('dreamCategory').innerHTML = categories.map(c => `<option value="${c.id}">${c.emoji} ${escapeHtml(c.name)}</option>`).join('');
}
function openCreateModal() {
    populateCategorySelect();
    document.getElementById('modalTitle').textContent = '✨ Новая мечта';
    document.getElementById('modalSubmitBtn').textContent = '💫 Записать мечту';
    document.getElementById('dreamId').value = '';
    document.getElementById('dreamTitleInput').value = '';
    document.getElementById('dreamTextInput').value = '';
    document.getElementById('dreamCategory').value = getCategories()[0]?.id || 'other';
    selectColor(document.querySelector('#colorPicker .color-option.color-gold'));
    currentSteps = [];
    renderStepsTable();
    document.getElementById('dreamModal').classList.add('show');
    setTimeout(() => document.getElementById('dreamTitleInput').focus(), 300);
}
function openEditModal(id) {
    populateCategorySelect();
    const dream = getDreams().find(d => d.id === id);
    if (!dream) return;
    document.getElementById('modalTitle').textContent = '✏️ Редактировать мечту';
    document.getElementById('modalSubmitBtn').textContent = '💾 Сохранить';
    document.getElementById('dreamId').value = dream.id;
    document.getElementById('dreamTitleInput').value = dream.title;
    document.getElementById('dreamTextInput').value = dream.text || '';
    document.getElementById('dreamCategory').value = dream.category;
    const colorEl = document.querySelector(`#colorPicker .color-option[data-color="${dream.color || 'gold'}"]`);
    if (colorEl) selectColor(colorEl);
    currentSteps = dream.steps ? JSON.parse(JSON.stringify(dream.steps)) : [];
    renderStepsTable();
    document.getElementById('dreamModal').classList.add('show');
}
function closeModal(id) { document.getElementById(id).classList.remove('show'); }
document.getElementById('dreamModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('dreamModal')) closeModal('dreamModal');
});
function selectColor(el) {
    document.querySelectorAll('#colorPicker .color-option').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
}
let currentSteps = [];
function renderStepsTable() {
    const tbody = document.getElementById('stepsTableBody');
    if (!tbody) return;
    if (currentSteps.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="steps-empty">Шаги не добавлены. Нажмите "+ Добавить шаг"</td></tr>';
        return;
    }
    tbody.innerHTML = currentSteps.map((step, idx) => `
<tr >
 <td class= "step-num " >${idx + 1} </td >
 <td class= "step-desc " >${escapeHtml(step.description)} </td >
 <td class= "step-actions " >
 <button type= "button " class= "step-action-btn " onclick= "openStepModal(${idx}) " title= "Редактировать " >✏️ </button >
 <button type= "button " class= "step-action-btn delete " onclick= "deleteStep(${idx}) " title= "Удалить " >🗑️ </button >
 </td >
 </tr >
`).join('');
}
function openStepModal(editIndex = -1) {
    const modal = document.getElementById('stepModal');
    const titleEl = document.getElementById('stepModalTitle');
    const descInput = document.getElementById('stepDescription');
    const indexInput = document.getElementById('stepEditIndex');
    if (editIndex >= 0) {
        titleEl.textContent = '✏️ Редактировать шаг';
        descInput.value = currentSteps[editIndex].description;
        indexInput.value = editIndex;
    } else {
        titleEl.textContent = '✨ Новый шаг';
        descInput.value = '';
        indexInput.value = -1;
    }
    modal.classList.add('show');
    setTimeout(() => descInput.focus(), 300);
}
function handleSaveStep(e) {
    e.preventDefault();
    const description = document.getElementById('stepDescription').value.trim();
    const editIndex = parseInt(document.getElementById('stepEditIndex').value);
    if (!description) return;
    if (editIndex >= 0) {
        currentSteps[editIndex].description = description;
        showToast('Шаг обновлён ✏️');
    } else {
        currentSteps.push({ description, completed: false });
        showToast('Шаг добавлен ✨');
    }
    renderStepsTable();
    closeModal('stepModal');
}
function deleteStep(index) {
    currentSteps.splice(index, 1);
    renderStepsTable();
    showToast('Шаг удалён');
}
function calculateProgress(dream) {
    if (dream.fulfilled) return 100;
    if (!dream.steps || dream.steps.length === 0) return 0;
    const completedSteps = dream.steps.filter(s => s.completed).length;
    const totalSteps = dream.steps.length;
    return Math.round((completedSteps / (totalSteps + 1)) * 100);
}
function toggleStepsDropdown(dreamId, btn) {
    const content = document.getElementById(`steps-${dreamId}`);
    if (!content) return;
    const isOpen = content.classList.contains('show');
    if (isOpen) {
        content.classList.remove('show');
        btn.classList.remove('open');
    } else {
        content.classList.add('show');
        btn.classList.add('open');
    }
}
function toggleStepComplete(dreamId, stepIndex) {
    const dreams = getDreams();
    const dream = dreams.find(d => d.id === dreamId);
    if (!dream || !dream.steps || !dream.steps[stepIndex]) return;
    const step = dream.steps[stepIndex];
    step.completed = !step.completed;
    saveDreams(dreams);
    renderDreams();
    if (step.completed) {
        showToast('Шаг выполнен ✨', 'warm');
    } else {
        showToast('Шаг возвращён в работу');
    }
}
function handleSaveDream(e) {
    e.preventDefault();
    const id = document.getElementById('dreamId').value;
    const title = document.getElementById('dreamTitleInput').value.trim();
    const text = document.getElementById('dreamTextInput').value.trim();
    const category = document.getElementById('dreamCategory').value;
    const color = document.querySelector('#colorPicker .color-option.selected')?.dataset.color || 'gold';
    const dreams = getDreams();
    if (id) {
        const dream = dreams.find(d => d.id === id);
        if (dream) {
            dream.title = title;
            dream.text = text;
            dream.category = category;
            dream.color = color;
            dream.steps = currentSteps;
            dream.updatedAt = Date.now();
            showToast('Мечта обновлена ✏️');
        }
    } else {
        dreams.push({
            id: 'dream_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            title,
            text,
            category,
            color,
            fulfilled: false,
            priority: false,
            archived: false,
            steps: currentSteps,
            createdAt: Date.now()
        });
        showToast('Мечта записана! ✨', 'warm');
    }
    saveDreams(dreams);
    closeModal('dreamModal');
    renderDreams();
}
async function deleteDream(id) {
    const confirmed = await customConfirm({ title: 'Удалить мечту?', message: 'Это действие нельзя отменить.', icon: '💔', confirmText: 'Удалить', cancelText: 'Оставить', danger: true });
    if (!confirmed) return;
    saveDreams(getDreams().filter(d => d.id !== id));
    renderDreams();
    showToast('Мечта удалена');
}
function toggleFulfill(id) {
    const dreams = getDreams();
    const dream = dreams.find(d => d.id === id);
    if (!dream) return;
    dream.fulfilled = !dream.fulfilled;
    if (dream.fulfilled && dream.steps && dream.steps.length > 0) {
        dream.steps.forEach(s => s.completed = true);
    }
    saveDreams(dreams);
    renderDreams();
    if (dream.fulfilled) {
        const u = getCurrentUser();
        showToast(`Мечта исполнилась, ${u.name}! 🎉🌟`, 'warm');
        launchConfetti();
    } else {
        showToast('Мечта снова в пути 🚀');
    }
}
async function togglePriority(id) {
    const dreams = getDreams();
    const dream = dreams.find(d => d.id === id);
    if (!dream) return;
    if (dream.priority) {
        dream.priority = false;
        saveDreams(dreams);
        renderDreams();
        showToast('Приоритет снят');
        return;
    }
    const currentPriority = dreams.find(d => d.priority && d.id !== id);
    if (currentPriority) {
        const confirmed = await customConfirm({
            title: 'Сменить приоритет?',
            message: `У тебя уже есть приоритетная мечта: «${currentPriority.title}». Она перестанет быть приоритетной.`,
            icon: '🔥', confirmText: 'Да, сменить', cancelText: 'Отмена'
        });
        if (!confirmed) return;
        currentPriority.priority = false;
    }
    dream.priority = true;
    saveDreams(dreams);
    renderDreams();
    showToast('Мечта стала приоритетной 🔥', 'warm');
}
async function archiveDream(id) {
    const confirmed = await customConfirm({ title: 'В архив?', message: 'Мечта переместится в архив. Ты всегда сможешь вернуть её.', icon: '📦', confirmText: 'В архив', cancelText: 'Оставить' });
    if (!confirmed) return;
    const dreams = getDreams();
    const dream = dreams.find(d => d.id === id);
    if (!dream) return;
    dream.archived = true;
    dream.priority = false;
    saveDreams(dreams);
    renderDreams();
    showToast('Мечта в архиве 📦');
}
async function unarchiveDream(id) {
    const dreams = getDreams();
    const dream = dreams.find(d => d.id === id);
    if (!dream) return;
    dream.archived = false;
    saveDreams(dreams);
    renderArchiveList();
    renderDreams();
    showToast('Мечта вернулась ✨', 'warm');
}
async function deleteArchivedDream(id) {
    const confirmed = await customConfirm({ title: 'Удалить навсегда?', message: 'Удаление необратимо.', icon: '💔', confirmText: 'Удалить', cancelText: 'Оставить', danger: true });
    if (!confirmed) return;
    saveDreams(getDreams().filter(d => d.id !== id));
    renderArchiveList();
    renderDreams();
    showToast('Мечта удалена');
}
function openArchiveModal() {
    document.getElementById('userDropdown').classList.remove('show');
    renderArchiveList();
}
function renderArchiveList() {
    const archived = getDreams().filter(d => d.archived);
    let listHTML = '';
    if (archived.length === 0) {
        listHTML = `<div class="empty-state" style="padding: 40px 20px;"><div class="empty-icon" style="font-size: 52px;">📦</div><h3 style="font-size: 28px;">Архив пуст</h3><p>Здесь будут мечты, которые ты решил отложить</p></div>`;
    } else {
        listHTML = `<div class="archive-list">` + archived.map(dream => {
            const cat = getCategoryById(dream.category);
            return `<div class="archive-item"> <div class="archive-item-content"> <div class="archive-item-title">${cat.emoji} ${escapeHtml(dream.title)}</div> <div class="archive-item-cat">${escapeHtml(cat.name)}${dream.fulfilled ? ' · ✨ исполнено' : ''}</div> </div> <div class="archive-item-actions"> <button class="archive-action-btn restore-btn" onclick="unarchiveDream('${dream.id}')" title="Вернуть">↩️</button> <button class="archive-action-btn delete-btn" onclick="deleteArchivedDream('${dream.id}')" title="Удалить">🗑️</button> </div> </div>`;
        }).join('') + `</div>`;
    }
    showGenericModal(`<h3 class="modal-title">📦 Архивные мечты</h3> <div class="modal-subtitle">Мечты, которые ты отложил. Их можно вернуть или удалить окончательно.</div> ${listHTML} <div class="modal-actions"><button class="btn btn-primary" onclick="closeGenericModal()">Закрыть</button></div>`);
}
function openRandomDream() {
    const dreams = getDreams().filter(d => !d.archived);
    if (dreams.length === 0) {
        showToast('Сначала запиши хотя бы одну мечту ✨', 'rose');
        return;
    }
    document.getElementById('userDropdown').classList.remove('show');
    const dream = dreams[Math.floor(Math.random() * dreams.length)];
    const cat = getCategoryById(dream.category);
    const modal = document.getElementById('randomDreamModal');
    const catEl = document.getElementById('randomDreamCategory');
    const titleEl = document.getElementById('randomDreamTitle');
    const textEl = document.getElementById('randomDreamText');
    catEl.className = `random-dream-category cat-${cat.color}`;
    catEl.innerHTML = `${cat.emoji} ${escapeHtml(cat.name)}`;
    titleEl.innerHTML = '';
    textEl.innerHTML = '';
    modal.classList.add('show');
    setTimeout(() => {
        typewriterEffect(titleEl, dream.title, 40);
        setTimeout(() => {
            if (dream.text) typewriterEffect(textEl, dream.text, 20);
        }, dream.title.length * 40 + 200);
    }, 400);
}
function typewriterEffect(element, text, speed) {
    element.innerHTML = '';
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.className = 'typewriter-char';
        span.textContent = text.charAt(i) === ' ' ? '\u00A0' : text.charAt(i);
        span.style.animationDelay = (i * speed) + 'ms';
        element.appendChild(span);
    }
}
function closeRandomDream() {
    document.getElementById('randomDreamModal').classList.remove('show');
}
document.getElementById('randomDreamModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('randomDreamModal')) closeRandomDream();
});
document.getElementById('stepModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('stepModal')) closeModal('stepModal');
});
function openProfileEditModal() {
    document.getElementById('userDropdown').classList.remove('show');
    const u = getCurrentUser();
    showGenericModal(`<h3 class="modal-title">👤 Редактировать профиль</h3> <div class="modal-subtitle">Измени свои данные — имя, логин или пароль.</div> <form onsubmit="handleProfileSave(event)"> <div class="form-group"><label>🌟 Ваше имя</label><input type="text" id="profileName" value="${escapeHtml(u.name)}" required></div> <div class="form-group"><label>👤 Логин</label><input type="text" id="profileLogin" value="${escapeHtml(u.login)}" required></div> <div class="form-group"> <label>🔑 Пароль</label> <div class="password-field"> <input type="password" id="profilePassword" value="${escapeHtml(u.password)}" required minlength="4"> <button type="button" class="password-toggle" onclick="togglePasswordVisibility('profilePassword', this)">👁️</button> </div> </div> <div class="modal-actions"> <button type="button" class="btn btn-secondary" onclick="closeGenericModal()">Отмена</button> <button type="submit" class="btn btn-primary">💾 Сохранить</button> </div> </form>`);
}
function handleProfileSave(e) {
    e.preventDefault();
    const newName = document.getElementById('profileName').value.trim();
    const newLogin = document.getElementById('profileLogin').value.trim().toLowerCase();
    const newPassword = document.getElementById('profilePassword').value;
    const users = getUsers();
    const oldUser = getCurrentUser();
    if (newLogin !== oldUser.login && users[newLogin]) {
        showToast('Такой логин уже занят', 'rose');
        return;
    }
    if (newLogin !== oldUser.login) {
        delete users[oldUser.login];
        localStorage.setItem('dreamboard_current_user', newLogin);
    }
    users[newLogin] = { ...oldUser, name: newName, login: newLogin, password: newPassword };
    saveUsers(users);
    closeGenericModal();
    document.getElementById('userAvatar').textContent = newName.charAt(0).toUpperCase();
    document.getElementById('dropdownName').textContent = newName;
    document.getElementById('dropdownLogin').textContent = '@' + newLogin;
    renderDreams();
    showToast('Профиль обновлён ✨', 'warm');
}
const EMOJI_OPTIONS = ['🌱', '🌿', '🌳', '🌲', '🌴', '🍀', '🌾', '🌷', '🌹', '🌺', '🌸', '💐', '🌻', '🌼', '🌵', '🎋', '🍄', '🌰', '🍃', '🍂', '🍁', '☀️', '🌙', '⭐', '🌟', '✨', '💫', '🌈', '⚡', '❄️', '🔥', '💧', '🌊', '☁️', '⛅', '🌤️', '🌌', '🪐', '💥', '☄️', '🌠', '🌍', '🌎', '🌏', '✈️', '🚀', '🚢', '🚗', '🚂', '🚁', '🛸', '🏔️', '🏖️', '🏝️', '🗺️', '🗼', '🏰', '🏯', '🗽', '⛩️', '🕌', '⛪', '🏛️', '🎡', '🎢', '🎨', '🎭', '🎬', '🎸', '🎹', '🎺', '🎻', '🥁', '🎮', '📚', '✍️', '📷', '🎯', '🏆', '🎪', '🎤', '🎧', '🎵', '🎶', '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🎱', '🏓', '🏸', '🥊', '🏋️', '🏃', '🚴', '🧗', '🏊', '⛷️', '🏂', '🧘', '🍰', '🍕', '🍣', '🍷', '☕', '🍵', '🍫', '🍎', '🥐', '🧀', '🥗', '🌮', '🍱', '🍜', '🍝', '🍦', '🍩', '🍪', '🎂', '🧁', '🥧', '🍯', '💕', '💖', '💝', '💗', '💓', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '🥰', '😊', '😇', '🤩', '😍', '💼', '💰', '💎', '👑', '🏢', '📈', '🎓', '💡', '🔑', '🗝️', '💻', '📱', '⌚', '📊', '🧮', '🧘', '💪', '🌞', '🌅', '🌄', '🧖', '💆', '🦋', '🐝', '🦄', '🐬', '🦅', '🐼', '🦊', '🐺', '🦁', '🐯', '🐨', '🐻', '🦆', '🦉', '🐴', '🦓', '🦒', '🐘', '🐿️', '🦔', '🐢', '🐍', '🦎', '🐙', '🦑', '🦀', '🐠', '🐳', '🦈', '🎁', '🎈', '🎉', '🎊', '🔮', '🕯️', '📜', '🎀', '🧿', '💠', '🔷', '🔶', '♾️', '❇️', '✳️', '🏵️', '🎗️', '🎖️', '🏅', '🥇', '🥈', '🥉', '🚩', '🏁', '🪄', '🧞', '🧚', '🧜', '🧝', '🧙', '👼', '🪽', '🎇', '🎆'];
let tempCategories = [];
let activeEmojiPickerIdx = null;
function openCategoriesModal() {
    document.getElementById('userDropdown').classList.remove('show');
    tempCategories = JSON.parse(JSON.stringify(getCategories()));
    renderCategoriesEditor();
}
function renderCategoriesEditor() {
    showGenericModal(`<h3 class="modal-title">📂 Мои категории</h3> <div class="modal-subtitle">Настрой категории под себя.</div> <div class="cat-list" id="catList"></div> <button class="add-cat-btn" onclick="addNewCategory()">+ Добавить категорию</button> <div class="modal-actions"> <button class="btn btn-secondary" onclick="closeGenericModal()">Отмена</button> <button class="btn btn-primary" onclick="saveCategoriesFromModal()">💾 Сохранить</button> </div>`);
    renderCategoriesList();
}
function renderCategoriesList() {
    const list = document.getElementById('catList');
    if (!list) return;
    const dreams = getDreams();
    list.innerHTML = tempCategories.map((cat, idx) => {
        const isUsed = dreams.some(d => d.category === cat.id);
        const canDelete = tempCategories.length > 1 && !isUsed;
        const deleteTitle = tempCategories.length === 1 ? 'Должна остаться хотя бы одна' : isUsed ? 'Нельзя: есть мечты' : 'Удалить';
        return `<div class="cat-item" data-idx="${idx}"> <span class="cat-emoji" onclick="toggleEmojiPicker(event, ${idx})" title="Сменить эмодзи">${cat.emoji}</span> <input class="cat-name-input" type="text" value="${escapeHtml(cat.name)}" oninput="updateCatName(${idx}, this.value)" maxlength="30"> <div class="cat-color-dot" style="background: var(--${cat.color}); width:22px; height:22px; border-radius:50%; cursor:pointer;" onclick="cycleCatColor(${idx})" title="Сменить цвет"></div> <button class="cat-delete-btn" onclick="deleteCategory(${idx})" title="${deleteTitle}" ${!canDelete ? 'disabled' : ''}>🗑️</button> </div>`;
    }).join('');
}
function toggleEmojiPicker(event, idx) {
    event.stopPropagation();
    const existing = document.querySelector('.emoji-picker-popup');
    if (existing) { existing.remove(); if (activeEmojiPickerIdx === idx) { activeEmojiPickerIdx = null; return; } }
    activeEmojiPickerIdx = idx;
    const catItem = event.target.closest('.cat-item');
    const picker = document.createElement('div');
    picker.className = 'emoji-picker-popup';
    picker.innerHTML = `<div class="emoji-picker-title">Выберите эмодзи</div>` + EMOJI_OPTIONS.map(e => `<button type="button" class="emoji-option" onclick="selectEmoji(${idx}, '${e}')">${e}</button>`).join('');
    catItem.appendChild(picker);
    setTimeout(() => document.addEventListener('click', closeEmojiPickerOnOutsideClick, { once: true }), 0);
}
function closeEmojiPickerOnOutsideClick(e) {
    const picker = document.querySelector('.emoji-picker-popup');
    if (picker && !picker.contains(e.target) && !e.target.classList.contains('cat-emoji')) { picker.remove(); activeEmojiPickerIdx = null; }
}
function selectEmoji(idx, emoji) {
    tempCategories[idx].emoji = emoji;
    const picker = document.querySelector('.emoji-picker-popup');
    if (picker) picker.remove();
    activeEmojiPickerIdx = null;
    renderCategoriesList();
}
function updateCatName(idx, value) { tempCategories[idx].name = value.trim() || 'Без названия'; }
function cycleCatColor(idx) {
    const colors = ['gold', 'rose', 'sky', 'mint', 'lavender', 'sunset'];
    tempCategories[idx].color = colors[(colors.indexOf(tempCategories[idx].color) + 1) % colors.length];
    renderCategoriesList();
}
async function deleteCategory(idx) {
    const cat = tempCategories[idx];
    const dreams = getDreams();
    const isUsed = dreams.some(d => d.category === cat.id);
    if (isUsed) { showToast('Нельзя: есть мечты в этой категории', 'rose'); return; }
    if (tempCategories.length <= 1) { showToast('Должна остаться хотя бы одна категория', 'rose'); return; }
    const confirmed = await customConfirm({
        title: 'Удалить категорию?',
        message: `Категория «${cat.emoji} ${cat.name}» будет удалена.`,
        icon: '🗑️', confirmText: 'Удалить', cancelText: 'Оставить', danger: true
    });
    if (!confirmed) { renderCategoriesEditor(); return; }
    tempCategories.splice(idx, 1);
    renderCategoriesEditor();
    showToast('Категория удалена');
}
function addNewCategory() {
    const emojis = ['🌟', '💫', '✨', '🎯', '🌺', '🦋', '🌊', '🏔️', '🎭', '🎨', '🎬', '🎸', '📚', '🍀', '🔮', '💎', '🌠', '🪄', '🧚'];
    const colors = ['gold', 'rose', 'sky', 'mint', 'lavender', 'sunset'];
    tempCategories.push({
        id: 'cat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        name: 'Новая категория',
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        color: colors[Math.floor(Math.random() * colors.length)]
    });
    renderCategoriesList();
    setTimeout(() => {
        const inputs = document.querySelectorAll('.cat-name-input');
        if (inputs.length) { const last = inputs[inputs.length - 1]; last.focus(); last.select(); }
    }, 50);
}
function saveCategoriesFromModal() {
    tempCategories = tempCategories.map(c => ({ ...c, name: c.name.trim() || 'Без названия' }));
    saveCategories(tempCategories);
    closeGenericModal();
    renderDreams();
    showToast('Категории сохранены 📂');
}
function openResetModal() {
    document.getElementById('userDropdown').classList.remove('show');
    const u = getCurrentUser();
    showGenericModal(`<h3 class="modal-title">🗑️ Удалить профиль</h3> <div class="modal-subtitle">${escapeHtml(u.name)}, это действие навсегда удалит твой аккаунт и все данные из системы.</div> <div class="reset-warning">⚠️ Будут удалены <strong>все мечты, мысли, категории и сам профиль</strong>. Восстановить их будет невозможно.</div> <div class="form-group"> <label>Чтобы подтвердить, введи фразу ниже:</label> <div class="reset-input-wrapper"><input type="text" id="resetConfirmInput" placeholder="Удалить профиль" oninput="checkResetInput()"></div> <div class="reset-hint">Введи точно: <strong>Удалить профиль</strong></div> </div> <div class="modal-actions"> <button class="btn btn-secondary" onclick="closeGenericModal()">Отмена</button> <button class="btn btn-danger" id="resetConfirmBtn" disabled onclick="performReset()">🗑️ Удалить навсегда</button> </div>`);
}
function checkResetInput() {
    const input = document.getElementById('resetConfirmInput');
    const btn = document.getElementById('resetConfirmBtn');
    btn.disabled = input.value.trim() !== 'Удалить профиль';
}
async function performReset() {
    const u = getCurrentUser();
    if (!u) return;
    const doubleConfirm = await customConfirm({
        title: 'Точно-точно?', message: `${u.name}, твой профиль и все данные будут удалены навсегда. Это действие нельзя отменить.`,
        icon: '⚠️', confirmText: 'Да, удалить', cancelText: 'Нет, отменить', danger: true
    });
    if (!doubleConfirm) return;
    const users = getUsers();
    delete users[u.login];
    saveUsers(users);
    localStorage.removeItem('dreamboard_current_user');
    closeGenericModal();
    document.getElementById('appScreen').classList.remove('active');
    document.getElementById('authScreen').classList.add('active');
    document.getElementById('loginForm').reset();
    document.getElementById('registerForm').reset();
    hideAuthError();
    if (warmPhraseTimer) clearTimeout(warmPhraseTimer);
    showToast(`Профиль удалён. Будем скучать, ${u.name} 🌙`);
}
const EXPORT_FORMAT_VERSION = 1;
const EXPORT_MAGIC = 'DREAMBOARD_EXPORT';
function exportUserData() {
    document.getElementById('userDropdown').classList.remove('show');
    const u = getCurrentUser();
    if (!u) return;
    const exportData = {
        __magic: EXPORT_MAGIC,
        __version: EXPORT_FORMAT_VERSION,
        exportedAt: new Date().toISOString(),
        user: {
            name: u.name,
            login: u.login,
            password: u.password,
            createdAt: u.createdAt || Date.now()
        },
        dreams: Array.isArray(u.dreams) ? u.dreams : [],
        thoughts: Array.isArray(u.thoughts) ? u.thoughts : [],
        categories: Array.isArray(u.categories) ? u.categories : JSON.parse(JSON.stringify(DEFAULT_CATEGORIES))
    };
    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const safeLogin = (u.login || 'user').replace(/[^a-z0-9а-я_-]/gi, '_');
    const dateStr = new Date().toISOString().slice(0, 10);
    const filename = `dreamboard_${safeLogin}_${dateStr}.json`;
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast(`Файл «${filename}» сохранён 💾`, 'warm');
}
function openImportModal() {
    showGenericModal(`<h3 class="modal-title">📥 Импорт данных</h3> <div class="modal-subtitle">Загрузи файл, который ты ранее экспортировал из DreamBoard. Все мечты, мысли и категории вернутся к тебе ✨</div> <div class="import-drop-zone" id="importDropZone"> <span class="drop-icon">📁</span> <div class="drop-title">Перетащи файл сюда или нажми</div> <div class="drop-hint">Подойдёт файл .json, созданный в DreamBoard</div> <input type="file" id="importFileInput" accept=".json,application/json" style="display:none;"> </div> <div class="import-file-info" id="importFileInfo"> <span class="file-icon">📄</span> <span class="file-name" id="importFileName"></span> <button class="file-clear" onclick="clearImportFile()" title="Убрать файл">✕</button> </div> <div id="importError" class="auth-error" style="margin-bottom:12px;"></div> <div class="modal-actions"> <button class="btn btn-secondary" onclick="closeGenericModal()">Отмена</button> <button class="btn btn-primary" id="importConfirmBtn" disabled onclick="performImport()">📥 Импортировать</button> </div>`);
    window.__importFile = null;
    window.__importData = null;
    const dropZone = document.getElementById('importDropZone');
    const fileInput = document.getElementById('importFileInput');
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleImportFile(e.dataTransfer.files[0]);
        }
    });
    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleImportFile(e.target.files[0]);
        }
    });
}
function handleImportFile(file) {
    const errorEl = document.getElementById('importError');
    errorEl.classList.remove('show');
    errorEl.textContent = '';
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.json') && file.type !== 'application/json') {
        errorEl.textContent = 'Пожалуйста, выбери файл в формате .json';
        errorEl.classList.add('show');
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const text = e.target.result;
            let data;
            try {
                data = JSON.parse(text);
            } catch (err) {
                throw new Error('Файл повреждён или содержит некорректный JSON');
            }
            if (!data || data.__magic !== EXPORT_MAGIC) {
                throw new Error('Это не файл экспорта DreamBoard. Выбери правильный файл.');
            }
            if (!data.__version || data.__version > EXPORT_FORMAT_VERSION) {
                throw new Error('Файл создан в более новой версии DreamBoard. Обнови платформу.');
            }
            if (!data.user || typeof data.user !== 'object' || !data.user.login || !data.user.name) {
                throw new Error('В файле отсутствуют обязательные данные профиля.');
            }
            window.__importFile = file;
            window.__importData = data;
            const info = document.getElementById('importFileInfo');
            const nameEl = document.getElementById('importFileName');
            nameEl.textContent = `${file.name} · ${data.user.name} (@${data.user.login})`;
            info.classList.add('show');
            document.getElementById('importConfirmBtn').disabled = false;
        } catch (err) {
            errorEl.textContent = err.message || 'Не удалось прочитать файл';
            errorEl.classList.add('show');
            window.__importFile = null;
            window.__importData = null;
            document.getElementById('importConfirmBtn').disabled = true;
        }
    };
    reader.onerror = () => {
        const errorEl = document.getElementById('importError');
        errorEl.textContent = 'Не удалось прочитать файл. Попробуй ещё раз.';
        errorEl.classList.add('show');
    };
    reader.readAsText(file);
}
function clearImportFile() {
    window.__importFile = null;
    window.__importData = null;
    const info = document.getElementById('importFileInfo');
    if (info) info.classList.remove('show');
    const fileInput = document.getElementById('importFileInput');
    if (fileInput) fileInput.value = '';
    const btn = document.getElementById('importConfirmBtn');
    if (btn) btn.disabled = true;
    const errorEl = document.getElementById('importError');
    if (errorEl) { errorEl.classList.remove('show'); errorEl.textContent = ''; }
}
async function performImport() {
    const data = window.__importData;
    if (!data) return;
    const users = getUsers();
    const login = String(data.user.login).trim().toLowerCase();
    const name = String(data.user.name).trim();
    const password = String(data.user.password || '');
    if (!login || !name) {
        showToast('В файле нет имени или логина', 'rose');
        return;
    }
    const dreams = Array.isArray(data.dreams) ? data.dreams : [];
    const thoughts = Array.isArray(data.thoughts) ? data.thoughts : [];
    const categories = Array.isArray(data.categories) && data.categories.length > 0
        ? data.categories
        : JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
    let finalLogin = login;
    if (users[finalLogin]) {
        const confirmed = await customConfirm({
            title: 'Пользователь уже существует',
            message: `Логин «@${finalLogin}» уже занят. Импортировать данные в этот аккаунт? Текущие данные будут перезаписаны.`,
            icon: '⚠️',
            confirmText: 'Перезаписать',
            cancelText: 'Отмена',
            danger: true
        });
        if (!confirmed) return;
        users[finalLogin] = {
            ...users[finalLogin],
            name,
            password: password || users[finalLogin].password,
            dreams,
            thoughts,
            categories,
            importedAt: Date.now()
        };
        saveUsers(users);
        localStorage.setItem('dreamboard_current_user', finalLogin);
        closeGenericModal();
        showApp();
        showToast(`Данные импортированы в @${finalLogin} ✨`, 'warm');
        return;
    }
    users[finalLogin] = {
        name,
        login: finalLogin,
        password,
        dreams,
        thoughts,
        categories,
        createdAt: data.user.createdAt || Date.now(),
        importedAt: Date.now()
    };
    saveUsers(users);
    localStorage.setItem('dreamboard_current_user', finalLogin);
    closeGenericModal();
    showApp();
    showToast(`Добро пожаловать, ${name}! Данные импортированы ✨`, 'warm');
}
const THOUGHT_COLORS = ['yellow', 'pink', 'blue', 'green', 'purple', 'orange'];
const THOUGHTS_PER_PAGE = 6;
let currentDiaryPage = 0;
function openCreateThoughtModal(editId = null) {
    const thoughts = getThoughts();
    const thought = editId ? thoughts.find(t => t.id === editId) : null;
    const currentColor = thought ? thought.color : THOUGHT_COLORS[Math.floor(Math.random() * THOUGHT_COLORS.length)];
    showGenericModal(`
 <h3 class="modal-title">${thought ? '✏️ Редактировать мысль' : '💭 Новая мысль'}</h3>
 <div class="modal-subtitle">${thought ? 'Измени свою запись.' : 'Запиши то, что крутится в голове. Это только твоё.'}</div>
 <form onsubmit="handleSaveThought(event, ${editId ? `'${editId}'` : 'null'})">
   <div class="form-group">
     <label>📝 Твоя мысль</label>
     <textarea id="thoughtText" placeholder="О чём ты думаешь?" required style="min-height:140px;">${thought ? escapeHtml(thought.text) : ''}</textarea>
   </div>
   <div class="form-group">
     <label>🎨 Цвет стикера</label>
     <div class="diary-color-picker">
       ${THOUGHT_COLORS.map(c => `<div class="diary-color-option ${c} ${c === currentColor ? 'selected' : ''}" data-color="${c}" onclick="selectThoughtColor(this)"></div>`).join('')}
     </div>
   </div>
   <div class="modal-actions">
     <button type="button" class="btn btn-secondary" onclick="closeGenericModal()">Отмена</button>
     <button type="submit" class="btn btn-primary">${thought ? '💾 Сохранить' : '✨ Записать'}</button>
   </div>
 </form>
`);
}
function selectThoughtColor(el) {
    document.querySelectorAll('.diary-color-option').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
}
function handleSaveThought(e, editId) {
    e.preventDefault();
    const text = document.getElementById('thoughtText').value.trim();
    const color = document.querySelector('.diary-color-option.selected')?.dataset.color || 'yellow';
    const thoughts = getThoughts();
    if (editId) {
        const thought = thoughts.find(t => t.id === editId);
        if (thought) { thought.text = text; thought.color = color; thought.updatedAt = Date.now(); }
        showToast('Мысль обновлена ✏️');
    } else {
        thoughts.push({
            id: 'thought_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            text, color, createdAt: Date.now()
        });
        showToast('Мысль записана 💭', 'warm');
    }
    saveThoughts(thoughts);
    closeGenericModal();
    renderDiary();
}
async function deleteThought(id) {
    const confirmed = await customConfirm({
        title: 'Удалить мысль?', message: 'Эта запись исчезнет навсегда.',
        icon: '💭', confirmText: 'Удалить', cancelText: 'Оставить', danger: true
    });
    if (!confirmed) return;
    saveThoughts(getThoughts().filter(t => t.id !== id));
    renderDiary();
    showToast('Мысль удалена');
}
function renderDiary() {
    const thoughts = getThoughts();
    const totalPages = Math.max(1, Math.ceil(thoughts.length / THOUGHTS_PER_PAGE));
    if (currentDiaryPage >= totalPages) currentDiaryPage = totalPages - 1;
    if (currentDiaryPage < 0) currentDiaryPage = 0;
    const start = currentDiaryPage * THOUGHTS_PER_PAGE;
    const pageThoughts = thoughts.slice(start, start + THOUGHTS_PER_PAGE);
    const stickersEl = document.getElementById('diaryStickers');
    let html = '';
    pageThoughts.forEach(thought => {
        html += `
   <div class="diary-sticker ${thought.color}">
     <div class="diary-sticker-text">${escapeHtml(thought.text)}</div>
     <div class="diary-sticker-actions">
       <button class="diary-sticker-btn" onclick="openCreateThoughtModal('${thought.id}')" title="Редактировать">✏️</button>
       <button class="diary-sticker-btn" onclick="deleteThought('${thought.id}')" title="Удалить">🗑️</button>
     </div>
   </div>
 `;
    });
    const emptySlots = THOUGHTS_PER_PAGE - pageThoughts.length;
    for (let i = 0; i < emptySlots; i++) {
        html += `<div class="diary-sticker diary-empty-sticker" onclick="openCreateThoughtModal()">+</div>`;
    }
    stickersEl.innerHTML = html;
    document.getElementById('pageIndicator').textContent = `Страница ${currentDiaryPage + 1} из ${totalPages}`;
    document.getElementById('prevPageBtn').disabled = currentDiaryPage === 0;
    document.getElementById('nextPageBtn').disabled = currentDiaryPage >= totalPages - 1;
}
function prevDiaryPage() {
    if (currentDiaryPage > 0) {
        const page = document.getElementById('diaryPage');
        page.classList.add('flip-right');
        setTimeout(() => {
            currentDiaryPage--;
            renderDiary();
            page.classList.remove('flip-right');
        }, 300);
    }
}
function nextDiaryPage() {
    const thoughts = getThoughts();
    const totalPages = Math.max(1, Math.ceil(thoughts.length / THOUGHTS_PER_PAGE));
    if (currentDiaryPage < totalPages - 1) {
        const page = document.getElementById('diaryPage');
        page.classList.add('flip-left');
        setTimeout(() => {
            currentDiaryPage++;
            renderDiary();
            page.classList.remove('flip-left');
        }, 300);
    }
}
function launchConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);
    const colors = ['#d4a853', '#c77d8a', '#8ab4c7', '#9b8ec4', '#7db89e', '#f0d48a', '#d4845a'];
    for (let i = 0; i < 60; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = (Math.random() * 100) + 'vw';
        piece.style.top = (Math.random() * 30 + 10) + 'vh';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.width = (Math.random() * 8 + 4) + 'px';
        piece.style.height = (Math.random() * 8 + 4) + 'px';
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        piece.style.animationDuration = (Math.random() * 1 + 1) + 's';
        piece.style.animationDelay = (Math.random() * 0.5) + 's';
        container.appendChild(piece);
    }
    setTimeout(() => container.remove(), 3000);
}
function showToast(msg, style = '') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast' + (style ? ' ' + style : '');
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((reg) => console.log('SW registered:', reg.scope))
            .catch((err) => console.warn('SW failed:', err));
    });
}
function openPwaModal() {
    showGenericModal(`
<h3 class="modal-title">📱 Мечты теперь всегда с тобой!</h3>
<div class="modal-subtitle">Наша команда рада сообщить, что DreamBoard теперь доступна как PWA*!<br>Это значит, что ты можешь пользоваться всеми волшебными удобствами платформы прямо с телефона, как настоящим приложением ✨</div>
<div class="auth-tabs" style="margin-bottom: 20px;">
   <button class="auth-tab active" onclick="switchPwaTab('ios', this)">🍏 iOS (iPhone)</button>
   <button class="auth-tab" onclick="switchPwaTab('android', this)">🤖 Android</button>
 </div>
 <div id="pwa-ios" class="pwa-instruction">
   <div class="modal-subtitle" style="text-align: left; background: var(--input-bg); padding: 16px; border-radius: 12px; border: 1px solid rgba(212,197,169,0.3);">
     <strong>1.</strong> Открой этот сайт в браузере <strong>Safari</strong>.<br><br>
     <strong>2.</strong> Нажми кнопку <strong>«Поделиться»</strong> (квадрат со стрелкой вверх ⬆️) внизу экрана.<br><br>
     <strong>3.</strong> Пролистай меню вниз и выбери <strong>«На экран "Домой"»</strong>.<br><br>
     <strong>4.</strong> Нажми <strong>«Добавить»</strong>. Готово! Иконка с мечтой появится на твоём рабочем столе 🌙
   </div>
 </div>
 <div id="pwa-android" class="pwa-instruction" style="display: none;">
   <div class="modal-subtitle" style="text-align: left; background: var(--input-bg); padding: 16px; border-radius: 12px; border: 1px solid rgba(212,197,169,0.3);">
     <strong>1.</strong> Открой этот сайт в браузере <strong>Chrome</strong>.<br><br>
     <strong>2.</strong> Нажми на <strong>три точки</strong> (⋮) в правом верхнем углу.<br><br>
     <strong>3.</strong> Выбери пункт <strong>«Добавить на главный экран»</strong> (или «Установить приложение»).<br><br>
     <strong>4.</strong> Подтверди добавление. Волшебство рядом! ✨
   </div>
 </div>
 <div class="modal-subtitle" style="margin-top: 20px; font-style: italic; color: var(--rose);">
   Стараемся для вас! С любовью, команда платформы DreamBoard ❤️<br>
   <span style="font-size: 16px; color: var(--ink-faint);">*PWA — Progressive Web Application (Прогрессивное веб-приложение)</span>
 </div>
 <div class="modal-actions">
   <button class="btn btn-primary" onclick="closeGenericModal()">Волшебно! ✨</button>
 </div>
`);
}
function switchPwaTab(os, btn) {
    document.querySelectorAll('#genericModal .auth-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('pwa-ios').style.display = os === 'ios' ? 'block' : 'none';
    document.getElementById('pwa-android').style.display = os === 'android' ? 'block' : 'none';
}
function generateRandomGradient(baseColor) {
    const palettes = {
        gold: { hueRange: [30, 60], sat: [70, 95], light: [55, 75] },
        rose: { hueRange: [330, 360], sat: [65, 90], light: [60, 78] },
        sky: { hueRange: [190, 220], sat: [70, 95], light: [55, 75] },
        mint: { hueRange: [140, 170], sat: [60, 85], light: [55, 75] },
        lavender: { hueRange: [260, 290], sat: [60, 85], light: [60, 78] },
        sunset: { hueRange: [0, 30], sat: [75, 95], light: [55, 72] }
    };
    const p = palettes[baseColor] || palettes.gold;
    const rand = (min, max) => Math.random() * (max - min) + min;
    const angle = Math.floor(Math.random() * 360);
    const colors = [];
    const count = Math.random() < 0.5 ? 2 : 3;
    for (let i = 0; i < count; i++) {
        let hue;
        if (count === 2) {
            hue = i === 0
                ? rand(p.hueRange[0], p.hueRange[1])
                : (rand(p.hueRange[0], p.hueRange[1]) + rand(90, 180) * (Math.random() < 0.5 ? 1 : -1));
        } else {
            const base = rand(p.hueRange[0], p.hueRange[1]);
            hue = base + (i - 1) * rand(60, 120);
        }
        hue = ((hue % 360) + 360) % 360;
        const sat = rand(p.sat[0], p.sat[1]);
        const light = rand(p.light[0], p.light[1]);
        colors.push(`hsl(${hue.toFixed(0)}, ${sat.toFixed(0)}%, ${light.toFixed(0)}%)`);
    }
    const stops = colors.map((c, i) => `${c} ${(i / (colors.length - 1) * 100).toFixed(0)}%`).join(', ');
    return `linear-gradient(${angle}deg, ${stops})`;
}
function generateShareCard(dreamId) {
    const dream = getDreams().find(d => d.id === dreamId);
    if (!dream) return;
    const cat = getCategoryById(dream.category);
    const progress = calculateProgress(dream);
    const color = dream.color || 'gold';
    const gradient = generateRandomGradient(color);
    const card = document.createElement('div');
    card.className = 'share-card-container';
    card.style.background = gradient;
    const dateStr = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    const textPreview = dream.text ? (dream.text.length > 120 ? dream.text.substring(0, 120) + '...' : dream.text) : '';
    card.innerHTML = `
<div class="share-card-header">
<div class="share-card-category">${cat.emoji} ${escapeHtml(cat.name)}</div>
<div class="share-card-progress">
<div class="share-card-progress-num">${progress}%</div>
<div class="share-card-progress-label">исполнено</div>
</div>
</div>
<div class="share-card-content">
<div class="share-card-title">${escapeHtml(dream.title)}</div>
${textPreview ? `<div class="share-card-text">${escapeHtml(textPreview)}</div>` : ''}
</div>
<div class="share-card-footer">
<div class="share-card-watermark">✨ DreamBoard</div>
<div class="share-card-date">${dateStr}</div>
</div>
`;
    document.body.appendChild(card);
    showToast('Генерирую карточку ✨', 'sky');
    setTimeout(() => {
        html2canvas(card, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            logging: false
        }).then(canvas => {
            document.body.removeChild(card);
            canvas.toBlob(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `dreamboard_${dream.title.substring(0, 30).replace(/[^a-z0-9а-я]/gi, '_')}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setTimeout(() => URL.revokeObjectURL(url), 1000);
                showToast('Карточка сохранена! 📤', 'warm');
                if (navigator.share && navigator.canShare) {
                    const file = new File([blob], 'dreamboard.png', { type: 'image/png' });
                    if (navigator.canShare({ files: [file] })) {
                        navigator.share({
                            files: [file],
                            title: 'Моя мечта',
                            text: `${dream.title} — моя мечта в DreamBoard ✨`
                        }).catch(() => { });
                    }
                }
            }, 'image/png');
        }).catch(err => {
            console.error(err);
            document.body.removeChild(card);
            showToast('Не удалось создать карточку', 'rose');
        });
    }, 100);
}
let notificationTimers = [];
let notificationsEnabled = false;
const MOTIVATION_QUOTES_MORNING = [
    '{name}, доброе утро! Сегодня отличный день, чтобы сделать шаг к мечте ✨',
    '{name}, новый день — новые возможности. Что ты сделаешь сегодня для своей мечты? 🌅',
    'Просыпайся, {name}! Вселенная ждёт твоих действий 🌟',
    '{name}, утро — время решать. Какой шаг к мечте ты сделаешь сегодня? ☀️',
    'Каждое утро — это чистый лист, {name}. Напиши на нём что-то волшебное 💫'
];

const MOTIVATION_QUOTES_EVENING = [
    '{name}, как прошёл твой день к мечте? 🌙',
    '{name}, вечер — время подвести итоги. Что хорошего ты сделал сегодня? ✨',
    'Перед сном вспомни свою мечту, {name}. Она ближе, чем кажется 🌟',
    'Спокойной ночи, {name}. Завтра новый день для чудес 🌙',
    '{name}, день закончился. Ты уже на шаг ближе к своей мечте 💫'
];
const DREAM_REMINDERS = [
    '{name}, пора сделать шаг к мечте! 🌟',
    'Твоя мечта ждёт внимания, {name} ✨',
    'Не забывай о своих мечтах, {name} 💫',
    'Время действовать, {name}! Мечты не сбываются сами 🚀',
    '{name}, маленький шаг сегодня — большое достижение завтра 🌱',
    'Проверь свою мечту, {name} — может, пора сделать следующий шаг? 👣'
];
function initNotifications() {
    const u = getCurrentUser();
    if (!u) return;
    if (!u.notificationSettings) {
        u.notificationSettings = {
            morning: false,
            evening: false,
            dreamReminder: false,
            reminderIntervalHours: 24
        };
        saveCurrentUser(u);
    }
    notificationsEnabled = u.notificationSettings.morning || u.notificationSettings.evening || u.notificationSettings.dreamReminder;
    if ('Notification' in window && Notification.permission === 'granted') {
        scheduleAllNotifications();
    }
}
function openNotificationsModal() {
    document.getElementById('userDropdown').classList.remove('show');
    const u = getCurrentUser();
    if (!u) return;
    if (!u.notificationSettings) {
        u.notificationSettings = { morning: false, evening: false, dreamReminder: false, reminderIntervalHours: 24 };
        saveCurrentUser(u);
    }
    const settings = u.notificationSettings;
    const permission = 'Notification' in window ? Notification.permission : 'unsupported';
    let permissionHTML = '';
    if (permission === 'default') {
        permissionHTML = `<div class="notification-option" style="background: rgba(212, 168, 83, 0.1); border-color: var(--gold);"><div class="notification-option-info"><div class="notification-option-title">🔔 Разрешить уведомления</div><div class="notification-option-desc">Чтобы получать напоминания, нужно разрешить уведомления в браузере</div></div><button class="btn btn-primary" style="width:auto; padding: 8px 16px; font-size: 18px;" onclick="requestNotificationPermission()">Разрешить</button></div>`;
    } else if (permission === 'denied') {
        permissionHTML = `<div class="notification-option" style="background: rgba(199, 125, 138, 0.1); border-color: var(--rose);"><div class="notification-option-info"><div class="notification-option-title">⚠️ Уведомления заблокированы</div><div class="notification-option-desc">Разрешите уведомления в настройках браузера</div></div></div>`;
    }
    showGenericModal(`
<h3 class="modal-title">🔔 Уведомления</h3>
<div class="modal-subtitle">Настрой волшебные напоминания, которые вернут тебя к мечте ✨</div>
<div class="modal-subtitle">❕ Опция в стадии разработки, возможны баги, совсем скоро всё будет работать корректно ❕</div>
${permissionHTML}
<div class="notifications-settings">
<div class="notification-option">
<div class="notification-option-info">
<div class="notification-option-title">🌅 Утренние мотивации</div>
<div class="notification-option-desc">Мотивационные цитаты по утрам (10:00)</div>
</div>
<div class="notification-toggle ${settings.morning ? 'active' : ''}" onclick="toggleNotificationSetting('morning', this)"></div>
</div>
<div class="notification-option">
<div class="notification-option-info">
<div class="notification-option-title">🌙 Вечерние размышления</div>
<div class="notification-option-desc">Мотивационные цитаты по вечерам (21:00)</div>
</div>
<div class="notification-toggle ${settings.evening ? 'active' : ''}" onclick="toggleNotificationSetting('evening', this)"></div>
</div>
<div class="notification-option">
<div class="notification-option-info">
<div class="notification-option-title">🎲 Напоминания о мечте</div>
<div class="notification-option-desc">Случайная мечта будет напоминать о себе раз в день</div>
</div>
<div class="notification-toggle ${settings.dreamReminder ? 'active' : ''}" onclick="toggleNotificationSetting('dreamReminder', this)"></div>
</div>
</div>
<div class="modal-actions">
<button class="btn btn-secondary" onclick="testNotification()">🔔 Тест</button>
<button class="btn btn-primary" onclick="closeGenericModal()">Готово</button>
</div>
`);
}
async function requestNotificationPermission() {
    if (!('Notification' in window)) {
        showToast('Уведомления не поддерживаются браузером', 'rose');
        return;
    }
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            showToast('Уведомления разрешены! 🔔', 'warm');
            scheduleAllNotifications();
            openNotificationsModal();
        } else if (permission === 'denied') {
            showToast('Уведомления заблокированы', 'rose');
        } else {
            showToast('Разрешение не получено', 'rose');
        }
    } catch (err) {
        showToast('Ошибка при запросе разрешения', 'rose');
    }
}
function toggleNotificationSetting(key, el) {
    const u = getCurrentUser();
    if (!u || !u.notificationSettings) return;
    if ('Notification' in window && Notification.permission !== 'granted') {
        showToast('Сначала разреши уведомления 🔔', 'rose');
        requestNotificationPermission();
        return;
    }
    u.notificationSettings[key] = !u.notificationSettings[key];
    saveCurrentUser(u);
    el.classList.toggle('active');
    scheduleAllNotifications();
}
function scheduleAllNotifications() {
    notificationTimers.forEach(t => clearTimeout(t));
    notificationTimers = [];
    const u = getCurrentUser();
    if (!u || !u.notificationSettings) return;
    if ('Notification' in window && Notification.permission !== 'granted') return;
    const now = new Date();
    if (u.notificationSettings.morning) {
        const morningTime = getNextTime(10, 0);
        const morningDelay = morningTime - now;
        notificationTimers.push(setTimeout(() => {
            sendMotivationNotification('morning');
            scheduleDailyNotification('morning', 8, 0, () => sendMotivationNotification('morning'));
        }, morningDelay));
    }
    if (u.notificationSettings.evening) {
        const eveningTime = getNextTime(21, 0);
        const eveningDelay = eveningTime - now;
        notificationTimers.push(setTimeout(() => {
            sendMotivationNotification('evening');
            scheduleDailyNotification('evening', 21, 0, () => sendMotivationNotification('evening'));
        }, eveningDelay));
    }
    if (u.notificationSettings.dreamReminder) {
        const reminderTime = getNextTime(15, 0);
        const reminderDelay = reminderTime - now;
        notificationTimers.push(setTimeout(() => {
            sendDreamReminderNotification();
            scheduleDailyNotification('dreamReminder', 14, 0, () => sendDreamReminderNotification());
        }, reminderDelay));
    }
}
function getNextTime(hours, minutes) {
    const now = new Date();
    const target = new Date();
    target.setHours(hours, minutes, 0, 0);
    if (target <= now) {
        target.setDate(target.getDate() + 1);
    }
    return target;
}
function scheduleDailyNotification(key, hours, minutes, callback) {
    const timer = setTimeout(() => {
        callback();
        scheduleDailyNotification(key, hours, minutes, callback);
    }, 24 * 60 * 60 * 1000);
    notificationTimers.push(timer);
}
function sendMotivationNotification(timeOfDay) {
    const u = getCurrentUser();
    if (!u) return;
    const quotes = timeOfDay === 'morning' ? MOTIVATION_QUOTES_MORNING : MOTIVATION_QUOTES_EVENING;
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    const title = timeOfDay === 'morning' ? '🌅 Доброе утро, мечтатель!' : '🌙 Добрый вечер, мечтатель!';
    if ('Notification' in window && Notification.permission === 'granted') {
        const notification = new Notification(title, {
            body: quote.replace('{name}', u.name),
            icon: '🌙',
            badge: '✨',
            tag: 'dreamboard-' + timeOfDay,
            requireInteraction: false
        });
        notification.onclick = () => {
            window.focus();
            notification.close();
        };
    }
}
function sendDreamReminderNotification() {
    const dreams = getDreams().filter(d => !d.archived && !d.fulfilled);
    if (dreams.length === 0) return;
    const dream = dreams[Math.floor(Math.random() * dreams.length)];
    const reminder = DREAM_REMINDERS[Math.floor(Math.random() * DREAM_REMINDERS.length)];
    const progress = calculateProgress(dream);
    if ('Notification' in window && Notification.permission === 'granted') {
        const notification = new Notification('🎲 Твоя мечта ждёт!', {
            body: `${reminder}\n\n✨ ${dream.title}\n📊 Прогресс: ${progress}%`,
            icon: '🌟',
            badge: '✨',
            tag: 'dreamboard-reminder',
            requireInteraction: false
        });
        notification.onclick = () => {
            window.focus();
            notification.close();
        };
    }
}
function testNotification() {
    if (!('Notification' in window)) {
        showToast('Уведомления не поддерживаются', 'rose');
        return;
    }
    if (Notification.permission !== 'granted') {
        showToast('Разреши уведомления сначала 🔔', 'rose');
        requestNotificationPermission();
        return;
    }
    const u = getCurrentUser();
    const name = u ? u.name : 'мечтатель';
    const notification = new Notification('🔔 Тест DreamBoard', {
        body: `Привет, ${name}! Уведомления работают ✨`,
        icon: '🌙',
        badge: '✨',
        tag: 'dreamboard-test'
    });
    notification.onclick = () => {
        window.focus();
        notification.close();
    };
    showToast('Тестовое уведомление отправлено 🔔', 'warm');
}