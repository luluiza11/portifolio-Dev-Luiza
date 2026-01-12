
'use strict';

// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================
function initMobileMenu() {
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbarScroll() {
    if (!navbar) return;

    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply appropriate animation class
                if (entry.target.classList.contains('scroll-animate')) {
                    entry.target.classList.add('visible');
                } else if (entry.target.classList.contains('scroll-animate-left')) {
                    entry.target.classList.add('visible');
                } else if (entry.target.classList.contains('scroll-animate-right')) {
                    entry.target.classList.add('visible');
                } else if (entry.target.classList.contains('scroll-animate-scale')) {
                    entry.target.classList.add('visible');
                } else if (entry.target.classList.contains('scroll-animate-item')) {
                    entry.target.classList.add('visible');
                } else {
                    // Fallback for old fade-in-up animation
                    entry.target.classList.add('fade-in-up');
                }
                observer.unobserve(entry.target);
            }
        });
    };

    const animationObserver = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements with scroll animation classes
    const elementsToAnimate = [
        '.scroll-animate',
        '.scroll-animate-left',
        '.scroll-animate-right',
        '.scroll-animate-scale',
        '.scroll-animate-item',
        '.skill-card',
        '.project-card',
        '.experience-item',
        '.contact-card',
        '.section-header'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            animationObserver.observe(element);
        });
    });
}

// ============================================
// GEOMETRIC SHAPES MOUSE MOVEMENT
// ============================================
function initGeometricMovement() {
    const heroBackground = document.querySelector('.hero-background');
    const shapes = document.querySelectorAll('.geometric-shape');

    if (!heroBackground || shapes.length === 0) return;

    heroBackground.addEventListener('mousemove', (e) => {
        const rect = heroBackground.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.02;
            const moveX = (x - rect.width / 2) * speed;
            const moveY = (y - rect.height / 2) * speed;

            shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    heroBackground.addEventListener('mouseleave', () => {
        shapes.forEach(shape => {
            shape.style.transform = 'translate(0, 0)';
        });
    });
}

// ============================================
// CONTACT FORM HANDLING
// ============================================
function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // WhatsApp phone number (Luiza)
        const phoneNumber = '5598984970428';

        // Format message for WhatsApp
        const whatsappMessage = `*Novo Contato do Portfólio*%0A%0A*Nome:* ${encodeURIComponent(name)}%0A*Assunto:* ${encodeURIComponent(subject)}%0A%0A*Mensagem:*%0A${encodeURIComponent(message)}`;

        // Create WhatsApp link
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

        // Open WhatsApp
        window.open(whatsappLink, '_blank');

        // Show success message
        showNotification(
            'Abrindo WhatsApp! Sua mensagem será enviada.',
            'success'
        );

        // Reset form
        contactForm.reset();

    });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    // Apply styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '400px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
        backdropFilter: 'blur(10px)'
    });

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ============================================
// PARALLAX EFFECT
// ============================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(element => {
            const rate = element.dataset.parallax || 0.5;
            element.style.transform = `translateY(${scrolled * rate}px)`;
        });
    });
}

// ============================================
// PROJECT CARDS INTERACTIVITY
// ============================================
function initProjectCards() {
    document.querySelectorAll('.project-card').forEach(card => {
        const overlay = card.querySelector('.project-overlay');

        if (overlay) {
            card.addEventListener('mouseenter', () => {
                overlay.style.opacity = '1';
            });

            card.addEventListener('mouseleave', () => {
                overlay.style.opacity = '0';
            });
        }
    });
}

// ============================================
// FORM FIELD ENHANCEMENTS
// ============================================
function initFormFields() {
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');

    inputs.forEach(input => {
        // Focus effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });

        // Input validation feedback
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });
    });
}

// ============================================
// SKILL CARDS STAGGER ANIMATION
// ============================================
function initSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach((card, index) => {
        const delay = (index * 0.1) + 's';
        card.style.setProperty('animation-delay', delay);
    });
}

// ============================================
// EXPERIENCE TIMELINE ANIMATION
// ============================================
function initExperienceTimeline() {
    const experienceItems = document.querySelectorAll('.experience-item');

    experienceItems.forEach((item, index) => {
        const delay = (index * 0.2) + 's';
        item.style.setProperty('animation-delay', delay);
    });
}

// ============================================
// LAZY LOADING IMAGES
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// INITIALIZE ALL ON DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initMobileMenu();
    initNavbarScroll();
    initSmoothScroll();
    initActiveNavLink();
    initScrollAnimations();
    initGeometricMovement();
    initContactForm();
    initParallax();
    initProjectCards();
    initFormFields();
    initSkillCards();
    initExperienceTimeline();
    initLazyLoading();
    initSpaceGame();

    // Initialize word animation
    const words = document.querySelectorAll('.word');
    const animateWords = () => {
        words.forEach(word => word.classList.remove('visible'));
        const updateArrayWithDelay = (index = 0) => {
            if (index < words.length) {
                words[index].classList.add('visible');
                setTimeout(() => {
                    updateArrayWithDelay(index + 1);
                }, 30);
            }
        };
        updateArrayWithDelay();
    };

    setTimeout(() => {
        animateWords();
        setInterval(animateWords, 5000); // Repeat every 5 seconds
    }, 60);

    // Mark page as loaded
    document.body.classList.add('loaded');
});

// ============================================
// SPACE GAME INITIALIZATION
// ============================================
function initSpaceGame() {
    const canvas = document.getElementById('spaceGameCanvas');
    const ctx = canvas.getContext('2d');
    if (!canvas || !ctx) return;

    // Game variables
    let playerX = canvas.width / 2;
    let playerY = canvas.height - 50;
    const playerWidth = 30;
    const playerHeight = 40;
    const playerSpeed = 6;

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height - 50;

    let bullets = [];
    let enemies = [];
    let explosions = [];
    let impacts = [];
    let score = 0;
    let lives = 3;
    let gameRunning = true;
    let lastEnemySpawn = 0;
    let enemySpawnRate = 60; // spawn every 60 frames
    let lastShot = 0;
    let shootRate = 15; // shoot every 15 frames (auto-fire)

    // Update UI
    function updateUI() {
        document.getElementById('gamePoints').textContent = score;
        document.getElementById('gameLives').textContent = lives;
    }

    // Draw player (nave)
    function drawPlayer() {
        // Corpo da nave
        ctx.fillStyle = '#00ff00';
        ctx.beginPath();
        ctx.moveTo(playerX, playerY - 20);
        ctx.lineTo(playerX - 15, playerY + 10);
        ctx.lineTo(playerX - 10, playerY + 15);
        ctx.lineTo(playerX + 10, playerY + 15);
        ctx.lineTo(playerX + 15, playerY + 10);
        ctx.closePath();
        ctx.fill();

        // Cockpit (cabine)
        ctx.fillStyle = '#00ccff';
        ctx.beginPath();
        ctx.arc(playerX, playerY - 8, 4, 0, Math.PI * 2);
        ctx.fill();

        // Asa esquerda
        ctx.fillStyle = '#00ff00';
        ctx.beginPath();
        ctx.moveTo(playerX - 15, playerY + 5);
        ctx.lineTo(playerX - 25, playerY + 8);
        ctx.lineTo(playerX - 20, playerY + 12);
        ctx.closePath();
        ctx.fill();

        // Asa direita
        ctx.beginPath();
        ctx.moveTo(playerX + 15, playerY + 5);
        ctx.lineTo(playerX + 25, playerY + 8);
        ctx.lineTo(playerX + 20, playerY + 12);
        ctx.closePath();
        ctx.fill();

        // Propulsor (efeito de fogo)
        const flameHeight = 8 + Math.random() * 4;
        ctx.fillStyle = `rgba(255, 165, 0, ${0.7 + Math.random() * 0.3})`;
        ctx.beginPath();
        ctx.moveTo(playerX - 5, playerY + 15);
        ctx.lineTo(playerX + 5, playerY + 15);
        ctx.lineTo(playerX, playerY + 15 + flameHeight);
        ctx.closePath();
        ctx.fill();

        // Glow effect
        ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(playerX, playerY, 30, 0, Math.PI * 2);
        ctx.stroke();
    }

    // Draw enemy (nave inimiga)
    function drawEnemy(enemy) {
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.moveTo(enemy.x, enemy.y + 15);
        ctx.lineTo(enemy.x - 12, enemy.y - 15);
        ctx.lineTo(enemy.x + 12, enemy.y - 15);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Draw bullet
    function drawBullet(bullet) {
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(bullet.x - 2, bullet.y - 6, 4, 12);

        ctx.strokeStyle = 'rgba(255, 255, 0, 0.8)';
        ctx.lineWidth = 1;
        ctx.strokeRect(bullet.x - 2, bullet.y - 6, 4, 12);
    }

    // Draw explosions
    function drawExplosion(explosion) {
        const progress = explosion.life / explosion.maxLife;
        const radius = explosion.maxRadius * (1 - progress);
        const opacity = progress;

        // Outer circle
        ctx.fillStyle = `rgba(255, 200, 0, ${0.7 * opacity})`;
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Inner bright circle
        ctx.fillStyle = `rgba(255, 255, 100, ${opacity})`;
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, radius * 0.6, 0, Math.PI * 2);
        ctx.fill();

        // Particles
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const distance = radius * progress;
            const x = explosion.x + Math.cos(angle) * distance;
            const y = explosion.y + Math.sin(angle) * distance;

            ctx.fillStyle = `rgba(255, 100, 0, ${0.6 * opacity})`;
            ctx.fillRect(x - 2, y - 2, 4, 4);
        }
    }

    // Draw impact
    function drawImpact(impact) {
        const progress = impact.life / impact.maxLife;
        const scale = 1 + progress * 0.5;
        const opacity = 1 - progress;

        ctx.strokeStyle = `rgba(255, 0, 0, ${opacity})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(impact.x, impact.y, 20 * scale, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(255, 100, 0, ${opacity * 0.7})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(impact.x, impact.y, 30 * scale, 0, Math.PI * 2);
        ctx.stroke();
    }

    // Draw stars background
    function drawStars() {
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 50; i++) {
            const x = (i * 7) % canvas.width;
            const y = (i * 13) % canvas.height;
            ctx.fillRect(x, y, 1, 1);
        }
    }

    // Spawn enemy
    function spawnEnemy() {
        const x = Math.random() * (canvas.width - 30) + 15;
        enemies.push({
            x: x,
            y: -20,
            width: 25,
            height: 30,
            speed: 2 + Math.random() * 2
        });
    }

    // Update explosions
    function updateExplosions() {
        explosions = explosions.filter(exp => {
            exp.life--;
            return exp.life > 0;
        });
    }

    // Update impacts
    function updateImpacts() {
        impacts = impacts.filter(imp => {
            imp.life--;
            return imp.life > 0;
        });
    }

    // Update bullets
    function updateBullets() {
        bullets = bullets.filter(bullet => {
            bullet.y -= 8;
            return bullet.y > 0;
        });
    }

    // Update enemies
    function updateEnemies() {
        enemies = enemies.filter(enemy => {
            enemy.y += enemy.speed;
            return enemy.y < canvas.height;
        });

        // Remove enemies that passed
        enemies = enemies.filter(enemy => {
            if (enemy.y > canvas.height) {
                lives--;
                if (lives <= 0) {
                    gameRunning = false;
                }
                return false;
            }
            return true;
        });
    }

    // Collision detection
    function checkCollisions() {
        // Bullet-Enemy collision
        for (let i = bullets.length - 1; i >= 0; i--) {
            for (let j = enemies.length - 1; j >= 0; j--) {
                const bullet = bullets[i];
                const enemy = enemies[j];

                if (bullet &&
                    bullet.x > enemy.x - enemy.width / 2 &&
                    bullet.x < enemy.x + enemy.width / 2 &&
                    bullet.y > enemy.y - enemy.height / 2 &&
                    bullet.y < enemy.y + enemy.height / 2) {
                    
                    // Create explosion
                    explosions.push({
                        x: enemy.x,
                        y: enemy.y,
                        life: 20,
                        maxLife: 20,
                        maxRadius: 25
                    });

                    bullets.splice(i, 1);
                    enemies.splice(j, 1);
                    score += 10;
                    break;
                }
            }
        }

        // Enemy-Player collision
        for (let enemy of enemies) {
            if (playerX > enemy.x - enemy.width / 2 - playerWidth / 2 &&
                playerX < enemy.x + enemy.width / 2 + playerWidth / 2 &&
                playerY > enemy.y - enemy.height / 2 - playerHeight / 2 &&
                playerY < enemy.y + enemy.height / 2 + playerHeight / 2) {
                
                // Create impact effect
                impacts.push({
                    x: playerX,
                    y: playerY,
                    life: 15,
                    maxLife: 15
                });

                lives--;
                if (lives <= 0) {
                    gameRunning = false;
                } else {
                    resetPlayer();
                }
            }
        }
    }

    function resetPlayer() {
        playerX = canvas.width / 2;
        playerY = canvas.height - 50;
        bullets = [];
        enemies = [];
    }

    // Game loop
    let frameCount = 0;
    function gameLoop() {
        // Clear canvas
        ctx.fillStyle = '#0a0e27';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawStars();

        if (gameRunning) {
            // Player movement
            if (mouseX > playerX + 5) playerX += playerSpeed;
            if (mouseX < playerX - 5) playerX -= playerSpeed;

            // Boundary check
            playerX = Math.max(playerWidth / 2, Math.min(canvas.width - playerWidth / 2, playerX));

            // Auto-fire
            frameCount++;
            lastShot++;
            if (lastShot > shootRate) {
                bullets.push({
                    x: playerX,
                    y: playerY - playerHeight / 2,
                    speed: 8
                });
                lastShot = 0;
            }

            // Spawn enemies
            if (frameCount > enemySpawnRate) {
                spawnEnemy();
                frameCount = 0;
            }

            updateBullets();
            updateEnemies();
            updateExplosions();
            updateImpacts();
            checkCollisions();

            // Draw everything
            drawPlayer();
            bullets.forEach(drawBullet);
            enemies.forEach(drawEnemy);
            explosions.forEach(drawExplosion);
            impacts.forEach(drawImpact);

            updateUI();
        } else {
            // Game Over
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#ff0000';
            ctx.font = 'bold 32px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 40);

            ctx.fillStyle = '#ffffff';
            ctx.font = '18px Arial';
            ctx.fillText('Pontos: ' + score, canvas.width / 2, canvas.height / 2 + 10);
            ctx.fillText('Clique para reiniciar', canvas.width / 2, canvas.height / 2 + 50);

            updateUI();
        }

        requestAnimationFrame(gameLoop);
    }

    // Event listeners
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        mouseX = touch.clientX - rect.left;
        mouseY = touch.clientY - rect.top;
    });

    canvas.addEventListener('click', () => {
        if (!gameRunning) {
            // Restart game
            playerX = canvas.width / 2;
            playerY = canvas.height - 50;
            bullets = [];
            enemies = [];
            explosions = [];
            impacts = [];
            score = 0;
            lives = 3;
            gameRunning = true;
            frameCount = 0;
            lastShot = 0;
        }
    });

    canvas.addEventListener('touchstart', (e) => {
        if (!gameRunning) {
            e.preventDefault();
            // Restart game
            playerX = canvas.width / 2;
            playerY = canvas.height - 50;
            bullets = [];
            enemies = [];
            explosions = [];
            impacts = [];
            score = 0;
            lives = 3;
            gameRunning = true;
            frameCount = 0;
            lastShot = 0;
        }
    });

    gameLoop();
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initialized successfully! 🚀');
});

// ============================================
// EXPORT UTILITIES
// ============================================
window.PortfolioUtils = {
    debounce,
    throttle,
    showNotification
};
