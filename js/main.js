document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Remove loading screen
    setTimeout(() => {
        document.getElementById('loading').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading').remove();
        }, 500);
    }, 1500);
    
    // Initialize scroll animations
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Auto-play videos
    document.querySelectorAll('video').forEach(video => {
        video.play().catch(e => console.log("Video autoplay prevented:", e));
    });
});

function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('animated');
        }
    });
}
