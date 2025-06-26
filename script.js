document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    mobileNavToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        this.textContent = navMenu.classList.contains('active') ? '' : '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileNavToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu on window resize
    // window.addEventListener('resize', function() {
    //     if (window.innerWidth > 768) {
    //         navMenu.classList.remove('active');
    //         body.style.overflow = 'auto';
    //         mobileNavToggle.textContent = '☰';
    //     }
    // });

    // Handle touch events for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    // function handleSwipe() {
    //     const swipeThreshold = 100;
    //     const diff = touchEndX - touchStartX;

    //     if (Math.abs(diff) > swipeThreshold) {
    //         if (diff > 0 && navMenu.classList.contains('active')) {
    //             // Swipe right to close menu
    //             navMenu.classList.remove('active');
    //             body.style.overflow = 'auto';
    //             mobileNavToggle.textContent = '☰';
    //         }
    //     }
    // }

    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.package-card, .portfolio-item, .contact-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial animation setup
    const elementsToAnimate = document.querySelectorAll('.package-card, .portfolio-item, .contact-item');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
    });

    // Improve scroll performance
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(function() {
            // Run scroll-based animations here
            animateOnScroll();
        }, 50);
    }, false);

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    
    // Enhanced Preloader functionality
    const preloader = document.querySelector('.preloader');
    const progress = document.querySelector('.loading-progress');
    let loadProgress = 0;

    // Simulate loading progress
    const updateProgress = () => {
        if (loadProgress < 100) {
            loadProgress += Math.random() * 30;
            loadProgress = Math.min(loadProgress, 100);
            progress.style.width = `${loadProgress}%`;

            if (loadProgress < 100) {
                requestAnimationFrame(updateProgress);
            } else {
                // Hide preloader when loading is complete
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                },5000);
            }
        }
    };

    // Start progress animation
    requestAnimationFrame(updateProgress);

    // Disable scrolling while preloader is visible
    document.body.style.overflow = 'hidden';
}); 


// Video Playback Control
document.querySelectorAll('.portfolio-video').forEach(videoContainer => {
    const video = videoContainer.querySelector('video');
    const playBtn = videoContainer.querySelector('.play-video-btn');

    playBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playBtn.style.opacity = '0';
        } else {
            video.pause();
            playBtn.style.opacity = '1';
        }
    });

    video.addEventListener('click', () => {
        if (!video.paused) {
            video.pause();
            playBtn.style.opacity = '1';
        }
    });
});

// Portfolio Filtering
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button state
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Filter portfolio items
        document.querySelectorAll('.portfolio-item').forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});


