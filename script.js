///////////////// PRE LOADER /////////////////
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    
    loader.classList.add('loaderHidden');
  
    loader.addEventListener('transitioned', () => {
      document.body.removeChild('loader');
    })
  })




///////////////// OPENS MENU /////////////////
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId)
  
    toggle.addEventListener('click', () => {
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu')
  
        // Add show-icon to show and hide the menu icon
        toggle.classList.toggle('show-icon')
    })
  }
  showMenu('nav-toggle', 'nav-menu')
  
  ///////////////// MOBILE DROPDOWN HANDLING /////////////////
  document.addEventListener('DOMContentLoaded', function() {
    // Get all dropdown items
    const dropdownItems = document.querySelectorAll('.dropdown__item');
    
    // Check if we're on mobile
    const isMobile = () => window.innerWidth <= 1118;
    
    // Function to handle dropdown clicks on mobile
    const handleDropdownClick = function(e) {
      if (!isMobile()) return; // Only apply on mobile
      
      // Prevent the click from bubbling up
      e.stopPropagation();
      
      // Toggle dropdown menu visibility with a class
      const dropdownMenu = this.querySelector('.dropdown__menu');
      
      // Check if this dropdown is already open
      const isOpen = dropdownMenu.classList.contains('dropdown-active');
      
      // First close all open dropdowns
      document.querySelectorAll('.dropdown-active').forEach(menu => {
        menu.classList.remove('dropdown-active');
        menu.style.maxHeight = '0px';
      });
      
      // Toggle the clicked dropdown
      if (!isOpen) {
        dropdownMenu.classList.add('dropdown-active');
        dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + 'px';
      }
    };
    
    // Function to handle subdropdown clicks on mobile
    const handleSubdropdownClick = function(e) {
      if (!isMobile()) return; // Only apply on mobile
      
      // Prevent the click from bubbling up
      e.stopPropagation();
      
      // Toggle subdropdown menu visibility
      const subdropdownMenu = this.querySelector('.dropdown__submenu');
      
      // Check if this subdropdown is already open
      const isSubOpen = subdropdownMenu.classList.contains('dropdown-active');
      
      // Toggle the clicked subdropdown
      if (!isSubOpen) {
        subdropdownMenu.classList.add('dropdown-active');
        subdropdownMenu.style.maxHeight = subdropdownMenu.scrollHeight + 'px';
      } else {
        subdropdownMenu.classList.remove('dropdown-active');
        subdropdownMenu.style.maxHeight = '0px';
      }
    };
    
    // Add click event listeners to dropdown items
    dropdownItems.forEach(item => {
      const dropdownLink = item.querySelector('.nav__link');
      if (dropdownLink) {
        dropdownLink.addEventListener('click', handleDropdownClick.bind(item));
      }
      
      // Handle subitem clicks
      const subItems = item.querySelectorAll('.dropdown__subitem');
      subItems.forEach(subItem => {
        const subLink = subItem.querySelector('.dropdown__link');
        if (subLink) {
          subLink.addEventListener('click', handleSubdropdownClick.bind(subItem));
        }
      });
    });
    
    // Reset mobile-specific styles when resizing to desktop
    window.addEventListener('resize', function() {
      if (!isMobile()) {
        document.querySelectorAll('.dropdown-active').forEach(menu => {
          menu.classList.remove('dropdown-active');
          menu.style.maxHeight = '';
        });
      }
    });
  });







  document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const totalSlides = slides.length;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('indicators');
    
    let currentIndex = 0;
    let autoPlayInterval = null;
    let userInteracted = false;
    let cooldownTimer = null;
    
    const AUTO_PLAY_INTERVAL = 5000; // 5 seconds
    const COOLDOWN_DURATION = 30000; // 30 seconds
    
    // Create indicators
    slides.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('indicator');
      if (index === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => {
        handleUserInteraction();
        goToSlide(index);
      });
      indicatorsContainer.appendChild(indicator);
    });
    
    const indicators = Array.from(document.querySelectorAll('.indicator'));
    
    function updateSlides() {
      slides.forEach((slide, index) => {
        // First remove all classes
        slide.classList.remove('active', 'prev', 'next');
        
        // Then assign appropriate class based on index
        if (index === currentIndex) {
          slide.classList.add('active');
        } else if (index === getPrevIndex()) {
          slide.classList.add('prev');
        } else if (index === getNextIndex()) {
          slide.classList.add('next');
        }
      });
      
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
      });
    }
    
    function getPrevIndex() {
      return (currentIndex - 1 + totalSlides) % totalSlides;
    }
    
    function getNextIndex() {
      return (currentIndex + 1) % totalSlides;
    }
    
    function goToSlide(index) {
      currentIndex = index;
      updateSlides();
    }
    
    function goToPrev() {
      currentIndex = getPrevIndex();
      updateSlides();
    }
    
    function goToNext() {
      currentIndex = getNextIndex();
      updateSlides();
    }
    
    function startAutoPlay() {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(() => {
        if (!userInteracted) {
          goToNext();
        }
      }, AUTO_PLAY_INTERVAL);
    }
    
    function handleUserInteraction() {
      userInteracted = true;
      if (cooldownTimer) clearTimeout(cooldownTimer);
      
      cooldownTimer = setTimeout(() => {
        userInteracted = false;
      }, COOLDOWN_DURATION);
    }
    
    // Initialize the carousel
    updateSlides();
    startAutoPlay();
    
    // Event listeners for navigation buttons - using explicit function calls
    prevBtn.addEventListener('click', function() {
      handleUserInteraction();
      goToPrev();
    });
    
    nextBtn.addEventListener('click', function() {
      handleUserInteraction();
      goToNext();
    });
    
    // Allow clicking on each slide to navigate
    slides.forEach((slide) => {
      slide.addEventListener('click', function() {
        const slideIndex = parseInt(this.getAttribute('data-index'));
        
        if (slideIndex === getPrevIndex()) {
          goToPrev();
          handleUserInteraction();
        } else if (slideIndex === getNextIndex()) {
          goToNext();
          handleUserInteraction();
        }
      });
    });
  });











  document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.elements.name.value = '';
    e.target.elements.email.value = '';
    e.target.elements.message.value = '';
  });
