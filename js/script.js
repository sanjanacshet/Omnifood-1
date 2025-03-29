console.log("Hello world!");

const myName = "Md. Emmanul Haque";
const h1 = document.querySelector(".heading-primary");
console.log(myName);
console.log(h1);

// h1.addEventListener("click", function () {
//   h1.textContent = myName;
//   h1.style.backgroundColor = "red";
//   h1.style.padding = "5rem";
// });

///////////////////////////////////////////////////////////
// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile naviagtion
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/
document.addEventListener("DOMContentLoaded", function () {
  const swaps = {
    gyozas: [
      { original: "Pork", swap: "Mushrooms" },
      { original: "Soy sauce", swap: "Tamari" },
      { original: "Flour wrappers", swap: "Rice paper" },
    ],
    salad: [
      { original: "Avocado", swap: "Mashed peas" },
      { original: "Lettuce", swap: "Spinach" },
      { original: "Feta cheese", swap: "Nutritional yeast" },
    ],
  };

  document.querySelectorAll(".swap-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const meal = this.dataset.meal;
      const swapList = document.getElementById(`${meal}-swaps`);
      swapList.innerHTML = "";
      swaps[meal].forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.original} → ${item.swap}`;
        swapList.appendChild(li);
      });
    });
  });
});

  // Chatbot Functionality
  document.addEventListener("DOMContentLoaded", function () {
    const chatbotBtn = document.querySelector(".chatbot-btn");
    const chatbotWindow = document.querySelector(".chatbot-window");
    const chatbotClose = document.querySelector(".chatbot-close");
    const chatbotMessages = document.querySelector(".chatbot-messages");
    const chatbotInput = document.querySelector(".chatbot-input");
    const chatbotSend = document.querySelector(".chatbot-send");
  
    chatbotBtn.addEventListener("click", () => {
      chatbotWindow.style.display = "block";
    });
  
    chatbotClose.addEventListener("click", () => {
      chatbotWindow.style.display = "none";
    });
  
    chatbotSend.addEventListener("click", () => {
      processChat();
    });
  
    chatbotInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        processChat();
      }
    });
  
    function processChat() {
      const msg = chatbotInput.value.trim().toLowerCase();
      if (!msg) return;
  
      const userMsg = document.createElement("p");
      userMsg.textContent = `You: ${msg}`;
      chatbotMessages.appendChild(userMsg);
  
      chatbotInput.value = "";
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  
      setTimeout(() => {
        const botMsg = document.createElement("p");
        botMsg.textContent = `Bot: ${getBotResponse(msg)}`;
        chatbotMessages.appendChild(botMsg);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      }, 1000);
    }
  
    function getBotResponse(input) {
      const responses = {
        hello: "Hello! How can I assist you?",
        hi: "Hi there! Need help with something?",
        swap: "I can suggest ingredient swaps! Just type a dish name.",
        japanese: "For Japanese Gyozas, you can swap pork with mushrooms or soy sauce with tamari.",
        avocado: "For Avocado Salad, you can swap avocado with mashed peas or feta cheese with nutritional yeast.",
        recommend: "Looking for recommendations? Try our healthy Avocado Salad!",
        thanks: "You're welcome! 😊",
      };
  
      for (const keyword in responses) {
        if (input.includes(keyword)) {
          return responses[keyword];
        }
      }
  
      return "I'm not sure about that. Try asking about 'swap' or a dish name!";
    }
  });