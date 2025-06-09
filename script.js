// script.js - Cropwise AI Interactive Features

// 1. Toggle Switch for Audience
const toggleSwitch = document.getElementById("audienceToggle");
const studentContent = document.getElementById("studentContent");
const mentorContent = document.getElementById("mentorContent");

toggleSwitch.addEventListener("change", () => {
  if (toggleSwitch.checked) {
    studentContent.style.display = "block";
    mentorContent.style.display = "none";
  } else {
    studentContent.style.display = "none";
    mentorContent.style.display = "block";
  }
});

// 2. FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Close all other items
    faqItems.forEach((el) => {
      if (el !== item) {
        el.classList.remove("active");
      }
    });

    // Toggle current item
    item.classList.toggle("active");
  });
});

// 3. Contact Form Validation
const form = document.querySelector("#contactForm");
const emailField = form.querySelector("input[type='email']");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = form.querySelector("input[name='name']").value.trim();
  const email = emailField.value.trim();
  const message = form.querySelector("textarea[name='message']").value.trim();

  if (!name || !email || !message) {
    alert("Please fill out all fields.");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  alert("Thank you for contacting Cropwise AI!");
  form.reset();
});

// 4. Visitor Counter with localStorage
const visitCounter = document.getElementById("visitorCounter");
let visits = localStorage.getItem("cropwise_visits");

if (!visits) {
  visits = 1;
} else {
  visits = parseInt(visits) + 1;
}
localStorage.setItem("cropwise_visits", visits);
visitCounter.textContent = `👁️ ${visits} visits`;

// 5. Smooth Scroll Navigation
const navLinks = document.querySelectorAll("nav a[href^='#']");

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// 6. Dark/Light Mode Toggle (optional)
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("cropwise_theme");
  if (savedTheme === "dark") {
    root.classList.add("dark-mode");
    themeToggle.checked = true;
  }

  themeToggle.addEventListener("change", () => {
    root.classList.toggle("dark-mode");
    const newTheme = root.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("cropwise_theme", newTheme);
  });
}
