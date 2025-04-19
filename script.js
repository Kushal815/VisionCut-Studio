const blobCount = 17;
const blobs = [];

for (let i = 0; i < blobCount; i++) {
  const blob = document.createElement('div');
  blob.classList.add('gradient');
  document.body.appendChild(blob);

  // Random initial position and velocity
  blobs.push({
    el: blob,
    x: Math.random() * (window.innerWidth - 80),
    y: Math.random() * (window.innerHeight - 80),
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2
  });
}

function animate() {
  const radius = 40;

  for (let i = 0; i < blobs.length; i++) {
    let b = blobs[i];

    // Move
    b.x += b.vx;
    b.y += b.vy;

    // Bounce off walls
    if (b.x <= 0 || b.x >= window.innerWidth - 80) b.vx *= -1;
    if (b.y <= 0 || b.y >= window.innerHeight - 80) b.vy *= -1;

    // Collision detection with other blobs
    for (let j = i + 1; j < blobs.length; j++) {
      let b2 = blobs[j];
      let dx = b2.x - b.x;
      let dy = b2.y - b.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius * 2) {
        // Basic elastic collision response
        let angle = Math.atan2(dy, dx);
        let targetX = b.x + Math.cos(angle) * radius * 2;
        let targetY = b.y + Math.sin(angle) * radius * 2;
        let ax = (targetX - b2.x) * 0.05;
        let ay = (targetY - b2.y) * 0.05;
        b.vx -= ax;
        b.vy -= ay;
        b2.vx += ax;
        b2.vy += ay;
      }
    }

    // Apply position
    b.el.style.transform = `translate(${b.x}px, ${b.y}px)`;
  }

  requestAnimationFrame(animate);
}

animate();
    const aboutText = document.getElementById('aboutText');
    const aboutImage = document.getElementById('aboutImage');

    document.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const moveX = (x - centerX) * 0.02;
    const moveY = (y - centerY) * 0.02;

    aboutText.style.transform = `translate(${moveX}px, ${moveY}px)`;
    aboutImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    

    
    function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'm';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num;
    }
    
    function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        const videoId = entry.target.id.split('-')[1];
        const video = document.getElementById(`video-${videoId}`);
        const progress = document.getElementById(`progress-${videoId}`);
        
        if (entry.isIntersecting) {
            video.play();
            video.addEventListener('timeupdate', () => updateProgressBar(video, progress));
            currentReelIndex = Array.from(videos).indexOf(video);
        } else {
            video.pause();
            video.removeEventListener('timeupdate', () => updateProgressBar(video, progress));
            progress.style.width = '0%';
        }
        });
    }, { threshold: 0.8 });
    
    videos.forEach(video => observer.observe(video));
    }
    
    function updateProgressBar(video, progressBar) {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percent}%`;
    }
    
    function setupScrollListener() {
    let isScrolling = false;
    
    reelsContainer.addEventListener('scroll', () => {
        if (!isScrolling) {
        isScrolling = true;
        const containerHeight = reelsContainer.clientHeight;
        const scrollPosition = reelsContainer.scrollTop;
        const newIndex = Math.round(scrollPosition / containerHeight);
        
        if (newIndex !== currentReelIndex) {
            videos[currentReelIndex].pause();
            document.getElementById(`progress-${videos[currentReelIndex].id.split('-')[1]}`).style.width = '0%';
            currentReelIndex = newIndex;
            videos[currentReelIndex].currentTime = 0;
            videos[currentReelIndex].play();
        }
        
        setTimeout(() => { isScrolling = false; }, 100);
        }
    });
    }
    const slider = document.getElementById('reelsSlider');
let currentIndex = 0;
const totalReels = slider.children.length;

function scrollReels(direction) {
    currentIndex = (currentIndex + direction + totalReels) % totalReels;
    slider.scrollTo({
    left: slider.offsetWidth * currentIndex,
    behavior: 'smooth'
    });
}

setInterval(() => {
    scrollReels(1);
}, 3000);


    window.addEventListener('DOMContentLoaded', () => {
        const image = document.querySelector('.d_img');

        image.addEventListener('mousemove', (e) => {
            const rect = image.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((x - centerX) / centerX) * -10;

            image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.2)`;
        });

        image.addEventListener('mouseleave', () => {
            image.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

        