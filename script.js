const navLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");
console.log("📝 Donation form submitted");


menuOpenButton.addEventListener("click", () => {
  //Toggle mobile menu visibility
  document.body.classList.toggle("show-mobile-menu");
});

// Close the menu when the close button is clicked
menuCloseButton.addEventListener("click", () => menuOpenButton.click());

// Close menu when nav link is called
navLinks.forEach(link => {
  link.addEventListener("click", () => menuOpenButton.click());
})
//Initialize Swiper
const swiper = new Swiper('.slider-wrapper', {
  loop: true,
  grabCursor: true,
  spaceBetween: 25,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  //Responsive breakpoints
  breakpoints: {
    0: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    }
  }
});



// Handle donation form submit
const donationForm = document.querySelector(".donation-form");

donationForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const amount = document.getElementById("amount").value.trim();

  // Validation
  if (!name) {
    alert("Please enter your name.");
    return;
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    alert("Please enter a valid donation amount.");
    return;
  }


  // If validation passes
  try {
    const response = await fetch("http://localhost:3000/api/donate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, amount }),
    });

    const result = await response.json();
    alert(result.message);
    donationForm.reset();
  } catch (error) {
    alert("Something went wrong. Please try again later.");
    console.error(error);
  }
});

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name')?.value;
    const email = document.getElementById('contact-email')?.value;
    const message = document.getElementById('contact-message')?.value;

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      const result = await response.json();
      alert(result.message);
      contactForm.reset();
    } catch (error) {
      alert('Something went wrong. Please try again later.');
      console.error(error);
    }
  });
}





// Donate button login check
const donateBtn = document.getElementById("donate-btn");


if (donateBtn) {
  donateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("donate")?.scrollIntoView({ behavior: 'smooth' });
  });
}



// Volunteer button interaction
const showEventsBtn = document.getElementById("show-events-btn");
const eventList = document.getElementById("event-list");

if (showEventsBtn && eventList) {
  showEventsBtn.addEventListener("click", () => {
    const isVisible = eventList.style.display === "block";
    eventList.style.display = isVisible ? "none" : "block";
    showEventsBtn.textContent = isVisible 
      ? "Interested in Volunteering?" 
      : "Hide Volunteering Events";
  });
}

