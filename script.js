// ===================================
// FIREBASE & DYNAMIC BLOG
// ===================================
import { db } from './firebase-config.js';
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ===================================
// SMOOTH SCROLL & NAVIGATION
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Handle navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Theme toggle logic
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Set initial theme
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Load dynamic blogs
    loadBlogs();
});

async function loadBlogs() {
    const blogContainer = document.getElementById('blog-container');
    if (!blogContainer) return;

    try {
        const blogsRef = collection(db, "blogs");
        const q = query(blogsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        // Remove loading state
        blogContainer.innerHTML = '';

        if (querySnapshot.empty) {
            blogContainer.innerHTML = `
                <div class="blog-loading">
                    <p>No posts yet. Stay tuned!</p>
                </div>
            `;
            return;
        }

        let delay = 0;
        querySnapshot.forEach((doc) => {
            const blog = doc.data();
            const blogHtml = `
                <article class="blog-card" data-aos="fade-up" data-aos-delay="${delay}">
                    <div class="blog-card-header">
                        <div class="blog-category">${blog.category || 'General'}</div>
                        <div class="blog-date">${blog.date || ''}</div>
                    </div>
                    <h3 class="blog-title">${blog.title}</h3>
                    <p class="blog-excerpt">${blog.excerpt}</p>
                    <div class="blog-footer">
                        <div class="blog-read-time">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="8" cy="8" r="6" />
                                <path d="M8 4v4l3 2" />
                            </svg>
                            <span>${blog.readTime || '5 min read'}</span>
                        </div>
                        <a href="${blog.link || '#'}" class="blog-read-more" ${blog.link ? 'target="_blank"' : ''}>
                            Read More
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </a>
                    </div>
                </article>
            `;
            blogContainer.insertAdjacentHTML('beforeend', blogHtml);
            delay += 100;
        });

        // Add the "Coming Soon" card at the end
        const comingSoonHtml = `
            <article class="blog-card blog-card-add" data-aos="fade-up" data-aos-delay="${delay}">
                <div class="blog-add-content">
                    <div class="blog-add-icon">✍️</div>
                    <h3 class="blog-add-title">More Coming Soon</h3>
                    <p class="blog-add-text">
                        I regularly share insights about engineering, product management, and leadership.
                    </p>
                </div>
            </article>
        `;
        blogContainer.insertAdjacentHTML('beforeend', comingSoonHtml);

        // Re-run AOS to animate the newly added elements
        if (typeof revealOnScroll === 'function') {
            revealOnScroll();
        }

    } catch (error) {
        console.error("Error loading blogs: ", error);
        blogContainer.innerHTML = `
            <div class="blog-loading">
                <p>Failed to load blogs. Please try again later.</p>
            </div>
        `;
    }
}

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe timeline items
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const skillCategories = document.querySelectorAll('.skill-category');

    timelineItems.forEach(item => {
        observer.observe(item);
    });

    skillCategories.forEach(category => {
        observer.observe(category);
    });
});

// ===================================
// PARALLAX EFFECT FOR GRADIENT ORBS
// ===================================
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;

        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===================================
// TYPING EFFECT FOR HERO SUBTITLE (Optional Enhancement)
// ===================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Uncomment to enable typing effect
// document.addEventListener('DOMContentLoaded', () => {
//     const subtitle = document.querySelector('.hero-subtitle');
//     const originalText = subtitle.textContent;
//     typeWriter(subtitle, originalText, 80);
// });

// ===================================
// SCROLL REVEAL ANIMATION
// ===================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('[data-aos]');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('aos-animate');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
document.addEventListener('DOMContentLoaded', revealOnScroll);

// ===================================
// PROFILE CARD TILT EFFECT
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const profileCard = document.querySelector('.profile-card');

    if (profileCard) {
        profileCard.addEventListener('mousemove', (e) => {
            const rect = profileCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        profileCard.addEventListener('mouseleave', () => {
            profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    }
});

// ===================================
// SKILL BADGE ANIMATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const skillBadges = document.querySelectorAll('.skill-badge');

    skillBadges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.05}s`;
    });
});

// ===================================
// COPY EMAIL TO CLIPBOARD
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const email = link.getAttribute('href').replace('mailto:', '');

            // Create temporary input to copy email
            const tempInput = document.createElement('input');
            tempInput.value = email;
            document.body.appendChild(tempInput);
            tempInput.select();

            try {
                document.execCommand('copy');
                showNotification('Email copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy email:', err);
            }

            document.body.removeChild(tempInput);
        });
    });
});

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message, duration = 3000) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        padding: '1rem 2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        zIndex: '9999',
        animation: 'slideInRight 0.3s ease-out',
        fontWeight: '600',
        fontSize: '0.95rem'
    });

    document.body.appendChild(notification);

    // Remove after duration
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .aos-animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Debounce function for scroll events
function debounce(func, wait = 10) {
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

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
    revealOnScroll();
}, 10));

// ===================================
// PRELOAD IMAGES (if you add custom images)
// ===================================
function preloadImages(urls) {
    urls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Example usage:
// preloadImages([
//     'path/to/image1.jpg',
//     'path/to/image2.jpg'
// ]);

// ===================================
// CONSOLE EASTER EGG
// ===================================
console.log('%c👋 Hello, curious developer!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cLike what you see? Let\'s connect!', 'font-size: 14px; color: #b4b8d4;');
console.log('%chttps://www.linkedin.com/in/malekziad/', 'font-size: 12px; color: #00f2fe;');
