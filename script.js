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
    
    // Reels functionality
    
    
    
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
    document.addEventListener('DOMContentLoaded', createReels);