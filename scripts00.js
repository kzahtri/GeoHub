document.addEventListener("DOMContentLoaded", function () {
    // Simple parallax effect using scroll event
window.addEventListener('scroll', function() {
  const parallaxBackground = document.querySelector('.parallax-background img');
  let scrollPosition = window.scrollY;
  parallaxBackground.style.transform = 'translateY(' + scrollPosition * 0.3 + 'px)';
});

  // Ensure document is loaded before interacting
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');

  // Initialize card animations when they appear in view
  const options = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.2 // Trigger animation when 20% of the card is in view
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add the class to animate the cards in
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once the card is animated
      }
    });
  }, options);

  cards.forEach(card => {
    observer.observe(card); // Start observing each card
  });

  // Add smooth scroll effect for cards container
  const cardContainer = document.querySelector('.card-container');
  cardContainer.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
      cardContainer.scrollBy({ left: 200, behavior: 'smooth' }); // Scroll right
    } else {
      cardContainer.scrollBy({ left: -200, behavior: 'smooth' }); // Scroll left
    }
  });
});

// Smooth Parallax Scrolling Effect
document.addEventListener("scroll", function() {
  const parallaxSection = document.querySelector('.hero-parallax');
  const scrollPosition = window.pageYOffset;

  // Adjust the background position for parallax effect
  parallaxSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`; // Adjust multiplier for desired effect
});


// Additional smooth hover effects for cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseover', () => {
    card.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
    card.style.transform = 'translateY(-10px)';
    card.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.15)';
  });

  card.addEventListener('mouseout', () => {
    card.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)';
  });
});

  // Create an intersection observer to detect when each card enters the viewport
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show'); // Add 'show' class to animate
          observer.unobserve(entry.target); // Stop observing once the card is visible
        }
      });
    }, { threshold: 0.5 });  // Trigger when 50% of the card is in the viewport
  
    // Target all cards to observe
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => observer.observe(card)); // Observe each card
  });
  
  // JavaScript for triggering card animations when they enter the viewport
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
  
    // Intersection Observer to detect when a card enters the viewport
    const observerOptions = {
      root: null,  // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.5  // Trigger when 50% of the card is visible
    };
  
    // Observer callback function to add the 'visible' class
    const handleCardVisibility = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add the 'visible' class to the card
          entry.target.classList.add('visible');
        }
      });
    };
  
    // Create the Intersection Observer instance
    const observer = new IntersectionObserver(handleCardVisibility, observerOptions);
  
    // Observe each card element
    cards.forEach(card => {
      observer.observe(card);
    });
  });

  // Create an intersection observer to trigger the card animations when they come into view
const cards = document.querySelectorAll('.card');

const observerOptions = {
  threshold: 0.3, // Trigger when 30% of the card is visible in the viewport
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show'); // Add 'show' class to trigger the CSS animation
      observer.unobserve(entry.target); // Stop observing after animation triggers
    }
  });
}, observerOptions);

// Start observing each card
cards.forEach(card => {
  observer.observe(card);
});

  