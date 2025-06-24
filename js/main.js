// ================ Loading Screen ================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading');
    
    // Fade out loading screen
    loadingScreen.style.opacity = '0';
    
    // Remove loading screen after fade completes
    setTimeout(() => {
        loadingScreen.remove();
    }, 500);
});

// ================ Scroll Animations ================
const animateOnScroll = () => {
    const animatedElements = document.querySelectorAll('[data-animate]');
    const windowHeight = window.innerHeight;
    const triggerOffset = windowHeight * 0.85; // 85% from top

    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        
        if (elementPosition < triggerOffset) {
            element.classList.add('animated');
        }
    });
};

// Run on load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// ================ Floating Gallery Items ================
const makeItemsFloat = () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        // Only animate every 3rd item for performance
        if (index % 3 === 0) {
            item.style.animation = `float 4s ease-in-out ${index * 0.2}s infinite`;
        }
    });
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    makeItemsFloat();
    
    // ================ Cursor Follower ================
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    const updateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        requestAnimationFrame(updateCursor);
    };
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Enlarge cursor when hovering interactive elements
        const isHovering = e.target.closest('a, button, .gallery-item');
        cursor.classList.toggle('active', isHovering);
    });
    
    updateCursor();
});

// ================ Video Control ================
const video = document.getElementById('main-video');
if (video) {
    video.addEventListener('loadedmetadata', () => {
        video.currentTime = 0;
        video.muted = true;
        video.play().catch(e => console.log("Autoplay prevented:", e));
    });
}
