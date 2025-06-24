// Copyright-free content sources
const imageSources = [
    "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg",
    "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg",
    "https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg",
    "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg"
];

const videoSources = [
    "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-woman-photographing-the-beach-3286-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-tree-covered-hill-1187-large.mp4"
];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Initialize audio
    const audio = document.getElementById('ambient-audio');
    const audioControl = document.getElementById('audio-control');
    
    audioControl.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            audioControl.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            audio.pause();
            audioControl.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
    
    // Simulate loading
    const loadingProgress = document.querySelector('.progress');
    let progress = 0;
    const loadInterval = setInterval(() => {
        progress += Math.random() * 10;
        loadingProgress.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(loadInterval);
            document.getElementById('loading').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('loading').remove();
                audio.play().catch(e => console.log("Audio autoplay prevented"));
            }, 500);
        }
    }, 200);
    
    // Initialize infinite scroll
    initInfiniteScroll();
});

// Infinite Scroll Functionality
function initInfiniteScroll() {
    const contentContainer = document.getElementById('infinite-content');
    let isLoading = false;
    
    // Initial load
    loadMoreContent();
    
    // Scroll event
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading) {
            loadMoreContent();
        }
    });
    
    async function loadMoreContent() {
        isLoading = true;
        showLoader();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Create new content section
        const section = document.createElement('section');
        section.className = 'content-section';
        section.innerHTML = generateRandomContent();
        contentContainer.appendChild(section);
        
        // Animate new content
        animateOnScroll();
        
        hideLoader();
        isLoading = false;
    }
    
    function showLoader() {
        const loader = document.createElement('div');
        loader.className = 'infinite-loader';
        loader.style.display = 'block';
        document.body.appendChild(loader);
    }
    
    function hideLoader() {
        const loader = document.querySelector('.infinite-loader');
        if (loader) loader.remove();
    }
    
    function generateRandomContent() {
        const contentTypes = ['gallery', 'video', 'mixed'];
        const type = contentTypes[Math.floor(Math.random() * contentTypes.length)];
        
        let contentHTML = `
            <h2 data-animate="fade-up">${getRandomTitle()}</h2>
            <p data-animate="fade-up">${getRandomDescription()}</p>
            <div class="photo-grid">
        `;
        
        // Generate 3-6 media items
        const itemCount = 3 + Math.floor(Math.random() * 3);
        
        for (let i = 0; i < itemCount; i++) {
            const isVideo = type === 'video' || (type === 'mixed' && Math.random() > 0.7);
            
            if (isVideo) {
                const videoSrc = videoSources[Math.floor(Math.random() * videoSources.length)];
                contentHTML += `
                    <div class="photo-item" data-animate="zoom-in">
                        <video autoplay muted loop playsinline>
                            <source src="${videoSrc}" type="video/mp4">
                        </video>
                    </div>
                `;
            } else {
                const imgSrc = imageSources[Math.floor(Math.random() * imageSources.length)];
                contentHTML += `
                    <div class="photo-item" data-animate="zoom-in">
                        <img src="${imgSrc}" alt="Photography">
                    </div>
                `;
            }
        }
        
        contentHTML += `</div>`;
        return contentHTML;
    }
    
    function getRandomTitle() {
        const titles = [
            "Moments in Time",
            "Through the Lens",
            "World Perspectives",
            "Light and Shadow",
            "Frozen Seconds",
            "The Beauty of Nature"
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }
    
    function getRandomDescription() {
        const descriptions = [
            "Capturing the essence of fleeting moments that tell timeless stories.",
            "Exploring the interplay of light, composition, and emotion.",
            "Each frame tells a unique story waiting to be discovered.",
            "Where technical precision meets artistic expression.",
            "Discovering beauty in both the grand and the subtle."
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }
}

// Scroll Animation Trigger
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

// Initialize on load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);
