document.addEventListener('DOMContentLoaded', function() {

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active menu link highlighting
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('header nav ul li a');

    window.addEventListener('scroll', ()=> {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });


    // Particles.js Initialization for Plexus Effect
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {"value": 80, "density": {"enable": true, "value_area": 800}},
                "color": {"value": "#ffffff"},
                "shape": {"type": "circle"},
                "opacity": {"value": 0.5, "random": false},
                "size": {"value": 3, "random": true},
                "line_linked": {"enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1},
                "move": {"enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out"}
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {"onhover": {"enable": true, "mode": "grab"}, "onclick": {"enable": false}},
                "modes": {"grab": {"distance": 140, "line_opacity": 1}}
            },
            "retina_detect": true
        });
    }

    // Typed.js Initialization for Hero Title
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        new Typed('#hero-title', {
            strings: ['Bocchi Marketing', '孤独な社長のお手伝い'],
            typeSpeed: 100,
            backSpeed: 50,
            loop: true,
            showCursor: true,
        });
    }

    // AOS Initialization
    AOS.init({ duration: 1000, once: true, easing: 'ease-in-out' });

    // Smooth scrolling
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Contact Form Submission using Fetch to Formspree
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const form = e.target;
            const data = new FormData(form);
            const action = form.action;

            fetch(action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    document.getElementById('contact-form').style.display = 'none';
                    document.getElementById('form-thanks').classList.remove('hidden');
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            alert(data["errors"].map(error => error["message"]).join(", "));
                        } else {
                            alert('フォームの送信中に問題が発生しました。');
                        }
                    })
                }
            }).catch(error => {
                alert('フォームの送信中に問題が発生しました。');
            });
        });
    }

    
});