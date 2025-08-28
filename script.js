// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Highlight nav link while scrolling
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });
    navItems.forEach(a => {
        a.classList.remove("active");
        if (a.getAttribute("href") === `#${current}`) {
            a.classList.add("active");
        }
    });
});

// Basic form validation
const form = document.getElementById('application-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        const error = input.nextElementSibling;
        if (!input.value.trim()) {
            error.style.display = 'block';
            isValid = false;
        } else {
            error.style.display = 'none';
        }
        if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
            error.style.display = 'block';
            isValid = false;
        }
    });

    if (isValid) {
        document.getElementById("success-message").style.display = "block";
        form.reset();
    }
});
