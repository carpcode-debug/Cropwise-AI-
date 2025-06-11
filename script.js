// script.js - Cropwise AI Interactive Features

// 1. Toggle Switch for Audience
const toggleSwitch = document.getElementById("audienceSwitch"); 
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
  item.querySelector(".faq-question").addEventListener("click", () => {
    faqItems.forEach((el) => {
      if (el !== item) el.classList.remove("active");
    });
    item.classList.toggle("active");
  });
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
const visitCounter = document.getElementById("visitorCount");
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
const context = `Cropwise AI is a Kenyan agritech startup founded by Polycarp Maina, a Financial Engineering student passionate about combining technology with sustainable farming. Our mission is to empower farmers and agribusinesses in Africa with AI-driven tools to optimize crop yield, manage resources efficiently, and reduce waste. We offer products like YieldMax, AquaSense, and PestGuard that use satellite data, IoT sensors, and predictive analytics to provide real-time, localized insights. Our team includes Polycarp Maina (Founder & Product Designer), Nicole Kirigi (Lead Agronomist), Noah Kipkechem (Full-Stack Developer), and Russel Rwara (Product Strategizer). Support us by sharing our vision, giving feedback, or reaching out via email at support@cropwise.ai. Our long-term goal is to revolutionize farming across Africa using ethical, accessible AI.`;

const input = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const chatWindow = document.getElementById("chat-window");
const sampleBtns = document.querySelectorAll(".sample");

function appendBubble(message, className) {
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${className}`;
  bubble.textContent = message;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function sendMessage() {
  const question = input.value.trim();
  if (!question) {
    alert("Please enter a question.");
    return;
  }

  appendBubble(question, "user");
  input.value = "";
  appendBubble("...", "ai");

  try {
    const reply = await puter.ai.chat({
      messages: [
        { role: "system", content: context },
        { role: "user", content: question }
      ]
    });

    const lastBubble = document.querySelector(".ai:last-child");
    lastBubble.textContent = reply.choices[0].message.content;
  } catch (err) {
    alert("Sorry, the AI could not respond.");
    const lastBubble = document.querySelector(".ai:last-child");
    lastBubble.textContent = "Oops! Something went wrong.";
  }
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

sampleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    input.value = btn.textContent;
    sendMessage();
  });
});
