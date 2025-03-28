// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const navLinks = document.querySelector('.nav-links');

mobileMenuButton.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenuButton.innerHTML = navLinks.classList.contains('active') 
    ? '<i class="fas fa-times"></i>' 
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
});

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scroll-progress');
  if (scrollProgress) {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    scrollProgress.style.width = progress + '%';
  }
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
  // Check for saved preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }

  // Check system preference if no local storage
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    if (!localStorage.getItem('darkMode')) {
      document.body.classList.add('dark-mode');
      const icon = darkModeToggle.querySelector('i');
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  }

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    
    if (document.body.classList.contains('dark-mode')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      localStorage.setItem('darkMode', 'disabled');
    }
  });
}

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');
if (backToTopButton) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Form Validation with improved UX
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    
    try {
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual fetch to your backend)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      const successModal = createModal(
        'Message Sent!',
        'Thank you for your message. I will get back to you soon.',
        'success'
      );
      document.body.appendChild(successModal);
      contactForm.reset();
    } catch (error) {
      const errorModal = createModal(
        'Error',
        'There was an error sending your message. Please try again later.',
        'error'
      );
      document.body.appendChild(errorModal);
    } finally {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}

// Helper function to create modal
function createModal(title, message, type) {
  const modal = document.createElement('div');
  modal.className = 'custom-modal';
  modal.innerHTML = `
    <div class="custom-modal-content ${type}">
      <h3>${title}</h3>
      <p>${message}</p>
      <button class="close-custom-modal">OK</button>
    </div>
  `;
  
  modal.querySelector('.close-custom-modal').addEventListener('click', () => {
    modal.remove();
  });
  
  return modal;
}

// Achievement Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.getAttribute('data-tab');
    
    // Remove active class from all buttons and panes
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));
    
    // Add active class to clicked button and corresponding pane
    btn.classList.add('active');
    document.getElementById(tabId).classList.add('active');
  });
});

// Project Demo Modal with loading state
const demoBtns = document.querySelectorAll('.demo-btn');
const modal = document.getElementById('projectModal');
const closeModal = document.querySelector('.close-modal');
const demoFrame = document.getElementById('demoFrame');

demoBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const project = btn.getAttribute('data-project');
    
    // Show loading state
    modal.style.display = 'flex';
    demoFrame.innerHTML = '<div class="modal-loading"><i class="fas fa-spinner fa-spin"></i> Loading demo...</div>';
    
    // Simulate loading (replace with actual content loading)
    setTimeout(() => {
      switch(project) {
        case 'assembly':
          demoFrame.src = 'https://www.youtube.com/embed/example1';
          break;
        case 'translator':
          demoFrame.src = 'https://www.youtube.com/embed/example2';
          break;
        case 'sign-language':
          demoFrame.src = 'https://www.youtube.com/embed/example3';
          break;
        case 'parking':
          demoFrame.src = 'https://www.youtube.com/embed/example4';
          break;
      }
    }, 800);
  });
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  demoFrame.src = '';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    demoFrame.src = '';
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Initialize navbar scroll state
window.dispatchEvent(new Event('scroll'));

// Hide loading spinner when page is fully loaded
window.addEventListener('load', () => {
  const spinner = document.getElementById('loading-spinner');
  if (spinner) {
    spinner.style.display = 'none';
  }
});

// Add analytics tracking for important interactions
document.querySelectorAll('a[href^="#"], .project-link, .demo-btn, .learn-more').forEach(el => {
  el.addEventListener('click', function() {
    // In a real implementation, you would send this data to analytics
    console.log(`User clicked: ${this.textContent.trim() || this.getAttribute('href')}`);
  });
});

// Add scroll-based animation triggers
const animateOnScroll = () => {
  document.querySelectorAll('[data-aos]').forEach(el => {
    const rect = el.getBoundingClientRect();
    const isVisible = (rect.top <= window.innerHeight * 0.75);
    
    if (isVisible) {
      el.classList.add('aos-animate');
    }
  });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run once on load