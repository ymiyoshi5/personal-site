// Nav bar
const sideNav = document.querySelector('.side-nav');
const navToggle = document.querySelector('.nav-toggle');

navToggle.addEventListener('click', () => {
    sideNav.classList.toggle('open');
});

// Close nav when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        sideNav.classList.remove('open');
    });
});

// Close nav when clicking outside
document.addEventListener('click', function(event) {
    const sideNav = document.querySelector('.side-nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navPanel = document.querySelector('.nav-panel');
    
    if (!navPanel.contains(event.target) && !navToggle.contains(event.target)) {
        sideNav.classList.remove('open');
    }
});

// Typewriter effect
function initTypewriter() {
    // if reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.getElementById('typewriter-text').textContent = "Hi, I'm Yuna Miyoshi!";
        return;
    }

    const textElement = document.getElementById('typewriter-text');
    const texts = [
        "Hi, welcome to my page!",
        "My name is Yuna Miyoshi :)",
        "Backend-Focused Developer",
        "Full-Stack Explorer", 
        "Accessibility Advocate"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseBetweenTexts = 2000;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, pauseBetweenTexts);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
        }
    }
    
    setTimeout(type, 1000);
}

// Floating interests
function initFallingImages() {
    const interestItems = document.querySelectorAll('.interest-item');
    
    interestItems.forEach(item => {
        item.addEventListener('click', function() {
            const originalImg = this.querySelector('img');
            const count = 10;
            
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    const floatingImg = document.createElement('img');
                    floatingImg.src = originalImg.src;
                    floatingImg.alt = originalImg.alt;
                    floatingImg.className = 'floating-interest';
                    floatingImg.style.width = '80px';
                    floatingImg.style.height = '80px';
                    floatingImg.style.borderRadius = '50%';
 
                    const randomX = Math.random() * (window.innerWidth - 80);
                    floatingImg.style.left = randomX + 'px';
                    floatingImg.style.top = '-100px';
                    
                    document.body.appendChild(floatingImg);
                    
                    setTimeout(() => {
                        if (floatingImg.parentNode) {
                            floatingImg.parentNode.removeChild(floatingImg);
                        }
                    }, 3000);
                }, i * 200);
            }
        });
    });
}

// Back-to-top button
const backToTopButton = document.getElementById('backToTop');

// Show button when scrolling down
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 200) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Scroll to top when clicked (smoothly)
backToTopButton.addEventListener('click', () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Dark mode
document.body.classList.add('dark-mode');
localStorage.setItem('theme', 'dark');

// Create toggle button
const themeToggle = document.createElement('button');
themeToggle.textContent = '☀️';
themeToggle.className = 'theme-toggle';
document.body.appendChild(themeToggle);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// Check if user previously chose light mode
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.remove('dark-mode');
    themeToggle.textContent = '🌙';
}

// initialization
document.addEventListener('DOMContentLoaded', function() {
    initTypewriter();
    initFallingImages();
});