document.addEventListener("DOMContentLoaded", function () {
  console.log("Page fully loaded!");
  
  // Ensure the element with the class 'heading-primary' exists
  const h1 = document.querySelector(".heading-primary");
  if (h1) {
    const myName = "John";
    console.log(myName);
    console.log(h1);

    // Example of an event listener on the heading (Uncomment if needed)
    // h1.addEventListener("click", function () {
    //   h1.textContent = myName;
    //   h1.style.backgroundColor = "red";
    //   h1.style.padding = "5rem";
    // });
  } else {
    console.log("Element with class 'heading-primary' not found!");
  }

  // Set current year in element with class 'year'
  const yearEl = document.querySelector(".year");
  if (yearEl) {
    const currentYear = new Date().getFullYear();
    yearEl.textContent = currentYear;
  } else {
    console.log("Element with class 'year' not found!");
  }

  // Mobile navigation toggle
  const btnNavEl = document.querySelector(".btn-mobile-nav");
  const headerEl = document.querySelector(".header");

  if (btnNavEl && headerEl) {
    btnNavEl.addEventListener("click", function () {
      headerEl.classList.toggle("nav-open");
    });
  } else {
    console.log("Mobile navigation elements not found!");
  }

  // Smooth scrolling animation for all links
  const allLinks = document.querySelectorAll("a:link");

  if (allLinks.length > 0) {
    allLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const href = link.getAttribute("href");

        if (href === "#") {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }

        if (href !== "#" && href.startsWith("#")) {
          const sectionEl = document.querySelector(href);
          sectionEl.scrollIntoView({ behavior: "smooth" });
        }

        if (link.classList.contains("main-nav-link")) {
          headerEl.classList.toggle("nav-open");
        }
      });
    });
  } else {
    console.log("No links found for smooth scrolling!");
  }

  // Sticky navigation on scroll
  const sectionHeroEl = document.querySelector(".section-hero");
  if (sectionHeroEl) {
    const obs = new IntersectionObserver(function (entries) {
      const ent = entries[0];
      console.log(ent);

      if (ent.isIntersecting === false) {
        document.body.classList.add("sticky");
      }

      if (ent.isIntersecting === true) {
        document.body.classList.remove("sticky");
      }
    }, {
      root: null,
      threshold: 0,
      rootMargin: "-80px",
    });
    obs.observe(sectionHeroEl);
  } else {
    console.log("Hero section not found for sticky navigation!");
  }

  // Check for flexbox gap support
  function checkFlexGap() {
    const flex = document.createElement("div");
    flex.style.display = "flex";
    flex.style.flexDirection = "column";
    flex.style.rowGap = "1px";

    flex.appendChild(document.createElement("div"));
    flex.appendChild(document.createElement("div"));

    document.body.appendChild(flex);
    const isSupported = flex.scrollHeight === 1;
    flex.parentNode.removeChild(flex);
    console.log(isSupported);

    if (!isSupported) document.body.classList.add("no-flexbox-gap");
  }
  checkFlexGap();

  // Ingredient swap functionality
  const swaps = {
    gyozas: [
      { original: "Pork", swap: "Mushrooms" },
      { original: "Soy sauce", swap: "Tamari" },
      { original: "Flour wrappers", swap: "Rice paper" },
    ],
   "avocado-salad": [
    { original: "Avocado", swap: "Mashed peas" },
    { original: "Lettuce", swap: "Cabbage" },
    { original: "Feta cheese", swap: "Goat cheese" },
  ],
    spaghetti : [
      {original : "Pasta", swap: "Zucchini noodles"},
      {original : "meat", swap: "Tofu"},
      {original : "Tomato sauce", swap: "Pesto"},
    ],
    chicken : [
      {original : "Chicken", swap: "Tofu"},
      {original : "edible oil", swap: "Olive oil"},
      {original : "salt", swap: "Herbs"},
    ],
    salad: [
      { original: "onion", swap: "capsicum" },
      { original: "peanuts", swap: "sprouts" },
      { original: "chatmasala", swap: "pepper powder" },
    ],
    pancakes: [
      { original: "Flour", swap: "Almond flour" },
      { original: "Milk", swap: "Oat milk" },
      { original: "Butter", swap: "Coconut oil" },
    ],
    smoothie: [
      { original: "Milk", swap: "Coconut water" },
      { original: "Sugar", swap: "Honey" },
      { original: "Banana", swap: "Mango" },
    ],
    sushi: [
      { original: "White rice", swap: "Brown rice" },
      { original: "Fish", swap: "Tofu" },
      { original: "Soy sauce", swap: "Coconut aminos" },
    ],
    burger: [
      { original: "chicken", swap: "Black bean patty" },
      { original: "Mayonnaise", swap: "Avocado spread" },
      { original: "Cheese", swap: "Vegan cheese" },
    ],
    pizza: [
      { original: "Dough", swap: "Cauliflower crust" },
      { original: "Cheese", swap: "Cashew cheese" },
      { original: "Pepperoni", swap: "Mushrooms" },
    ],
    tacos: [
      { original: "Tortilla", swap: "Lettuce wrap" },
      { original: "meat", swap: "Lentils" },
      { original: "Cheese", swap: "Nutritional yeast" },
    ],
    curry: [
      { original: "Cream", swap: "Coconut milk" },
      { original: "Chicken", swap: "Chickpeas" },
      { original: "White rice", swap: "Quinoa" },
    ],
    
  };

  document.querySelectorAll(".swap-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const meal = this.dataset.meal;
      const swapList = document.getElementById(`${meal}-swaps`);
      if (swapList) {
        swapList.innerHTML = "";
        swaps[meal].forEach((item) => {
          const li = document.createElement("li");
          li.textContent = `${item.original} → ${item.swap}`;
          swapList.appendChild(li);
        });
      }
    });
  });

  // Chatbot functionality
  const chatbotBtn = document.querySelector(".chatbot-btn");
  const chatbotWindow = document.querySelector(".chatbot-window");
  const chatbotClose = document.querySelector(".chatbot-close");
  const chatbotMessages = document.querySelector(".chatbot-messages");
  const chatbotInput = document.querySelector(".chatbot-input");
  const chatbotSend = document.querySelector(".chatbot-send");

  if (chatbotBtn && chatbotWindow && chatbotClose && chatbotMessages && chatbotInput && chatbotSend) {
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
        spaghetti: "For Spaghetti, you can swap pasta with zucchini noodles or meat with tofu.",
        chicken: "For Grilled Chicken, you can swap chicken with tofu or edible oil with olive oil.",
        salad: "For Vegan Salad, you can swap onion with capsicum or peanuts with sprouts.",
        pancakes: "For Pancakes, you can swap flour with almond flour or milk with oat milk.",
        smoothie: "For Smoothie, you can swap milk with coconut water or suagar with honey.",
        sushi: "For Sushi, you can swap white rice with brown rice or fish with tofu.",
        burger: "For Burger, you can swap chicken with black bean patty or mayonnaise with avocado spread.",
        pizza: "For Pizza, you can swap dough with cauliflower crust or cheese with cashew cheese.",
        tacos: "for Tacos you can swap tortilla with lettuce wrap or meat with lentils.",
        curry: "For Curry, you can swap cream with coconut milk or chicken with chickpeas.",
        suggest: "I can suggest ingredient swaps! just type a dish name.",
        meal : "I can recommend meals! Just ask for a specific dish.",
        recommend: "Looking for recommendations? Try our healthy Avocado Salad!",
        ok: "Great! Let me know if you need anything else.",
        bye: "Goodbye! have a great day!",
        thanks: "You're welcome! 😊",
      };

      for (const keyword in responses) {
        if (input.includes(keyword)) {
          return responses[keyword];
        }
      }

      return "I'm not sure about that. Try asking about 'swap' or a dish name!";
    }
  } else {
    console.log("Chatbot elements not found!");
  }
})
  //-------------------------login and signup----------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");

  // Signup functionality
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("full-name").value;
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;

      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if user already exists
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        alert("User already exists. Please log in.");
        return;
      }

      // Save new user
      users.push({ name, email, password, hasOrdered: false });
      localStorage.setItem("users", JSON.stringify(users));

      alert("Signup successful! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    });
  }

  // Login functionality
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      const users = JSON.parse(localStorage.getItem("users")) || [];
      let user = users.find(u => u.email === email && u.password === password);

      if (user) {
        if (!user.hasOrdered) {
          alert("Congratulations! Your first meal is free.");
          user.hasOrdered = true;
        } else {
          alert("Login successful!");
        }

        // Update the user in the array and save
        const updatedUsers = users.map(u => u.email === user.email ? user : u);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        // localStorage.setItem("loggedInUser", user.email);

        window.location.href = "index.html";
      } else {
        alert("Invalid email or password.");
      }
    });
  }

  // Redirect signup link
  const signupLink = document.getElementById("signup-link");
  if (signupLink) {
    signupLink.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "signup.html";
    });
  }

  // Redirect login link
  const loginLink = document.getElementById("login-link");
  if (loginLink) {
    loginLink.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "index.html";
    });
  }
});


// Show search suggestions
document.addEventListener("DOMContentLoaded", function () {
  const recipesContainer = document.getElementById("recipes-container");


  // List of all 12 recipes
  const recipes = [
    { name: "Japanese Gyozas", image: "img/meals/meal-1.jpg" },
    { name: "Avocado Salad", image: "img/meals/meal-2.jpg" },
    { name: "Spaghetti", image: "img/recipes/spaghetti.jpg" },
    { name: "Grilled Chicken", image: "img/recipes/chicken.jpg" },
    { name: "Vegan Salad", image: "img/recipes/salad.jpg" },
    { name: "Pancakes", image: "img/recipes/pancakes.jpg" },
    { name: "Smoothie", image: "img/recipes/smoothie.jpg" },
    { name: "Sushi", image: "img/recipes/sushi.jpg" },
    { name: "Burger", image: "img/recipes/burger.jpg" },
    { name: "Pizza", image: "img/recipes/pizza.jpg" },
    { name: "Tacos", image: "img/recipes/tacos.jpg" },
    { name: "Curry", image: "img/recipes/curry.jpg" }
  ];

 // Generate recipe cards dynamically
  recipes.forEach(recipe => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("meal");
    recipeCard.id = recipe.name.toLowerCase().replace(/\s+/g, "-"); // Unique ID for scrolling

    recipeCard.innerHTML = `
      <img src="${recipe.image}" class="meal-img" alt="${recipe.name}" />
      <div class="meal-content">
        <p class="meal-title">${recipe.name}</p>
       
      </div>
    `;

    recipesContainer.appendChild(recipeCard);
  });

  // Scroll to the exact recipe if the URL contains ?recipe=
  const urlParams = new URLSearchParams(window.location.search);
  const recipeName = urlParams.get("recipe");

  if (recipeName) {
    const formattedId = recipeName.toLowerCase().replace(/\s+/g, "-");
    const recipeElement = document.getElementById(formattedId);
    
    if (recipeElement) {
      setTimeout(() => {
        recipeElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 500); // Delay ensures smooth scrolling after page load
    }
  }
});

// -----------------------------------------------
// Search functionality with auto-suggestions
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-bar");
  const suggestionsList = document.getElementById("ingredient-suggestions");

  const recipes = [
  "Spaghetti", "Grilled Chicken", 
    "Vegan Salad", "Pancakes", "Smoothie", "Sushi", "Burger", "Pizza", "Tacos", "Curry"
  ];

  function showSuggestions() {
    const query = searchInput.value.toLowerCase();
    suggestionsList.innerHTML = ""; // Clear previous suggestions

    if (query.length === 0) {
      suggestionsList.style.display = "none";
      return;
    }

    const filteredRecipes = recipes.filter(recipe => 
      recipe.toLowerCase().includes(query)
    );

    filteredRecipes.forEach(recipe => {
      const li = document.createElement("li");
      li.textContent = recipe;
      li.classList.add("suggestion-item");

      // When a suggestion is clicked, redirect to the recipe with smooth scroll
      li.addEventListener("click", function () {
        searchInput.value = recipe;
        window.location.href = `recipes.html?recipe=${encodeURIComponent(recipe)}`;
      });

      suggestionsList.appendChild(li);
    });

    suggestionsList.style.display = filteredRecipes.length > 0 ? "block" : "none";
  }

  searchInput.addEventListener("input", showSuggestions);

  document.addEventListener("click", function (e) {
    if (!searchInput.contains(e.target) && !suggestionsList.contains(e.target)) {
      suggestionsList.style.display = "none";
    }
  });
});


//----------------recipies.js---------------------------
document.addEventListener("DOMContentLoaded", function () {
  const seeAllRecipesLink = document.getElementById("see-all-recipes");
  const recipesContainer = document.getElementById("recipes-container");

  // If on index.html -> Redirect to recipes.html
  if (seeAllRecipesLink) {
    seeAllRecipesLink.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "recipes.html"; // Redirect to recipes page
    });
  }

  // If on recipes.html -> Load Recipes
  if (recipesContainer) {
    const recipes = [
      { name: "Spaghetti", image: "./img/recipes/spaghetti.jpg" },
      { name: "Grilled Chicken", image: "img/recipes/chicken.jpg" },
      { name: "Vegan Salad", image: "img/recipes/salad.jpg" },
      { name: "Pancakes", image: "img/recipes/pancakes.jpg" },
      { name: "Smoothie", image: "img/recipes/smoothie.jpg" },
      { name: "Sushi", image: "img/recipes/sushi.jpg" },
      { name: "Burger", image: "img/recipes/burger.jpg" },
      { name: "Pizza", image: "img/recipes/pizza.jpg" },
      { name: "Tacos", image: "img/recipes/tacos.jpg" },
      { name: "Curry", image: "img/recipes/curry.jpg" },
    ];
    
    // Set placeholder image if the file is missing
    const placeholderImage = "img/recipes/placeholder.jpg";
    

    recipesContainer.innerHTML = ""; // Clear previous content

    recipes.forEach(recipe => {
      const recipeCard = document.createElement("div");
      recipeCard.classList.add("recipe-card");

      recipeCard.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}" onerror="this.src='placeholder.jpg';">
        <h3>${recipe.name}</h3>
        <button class="buy-btn">Buy</button>
        <button class="order-btn">Order</button>
      `;

      recipesContainer.appendChild(recipeCard);
    });
  }
});


//----billing------------------------------------------------------------------------------
// Handle Buy Button Functionality
// Reset old order if last one was completed (check if user is starting a new session)
 
document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("newOrderStarted")) {
    localStorage.removeItem("orders");
    localStorage.setItem("newOrderStarted", "true");
  }
  document.querySelectorAll(".buy-btn").forEach(button => {
    button.addEventListener("click", function () {
      // Get name/price from the clicked meal
      const meal = this.closest(".meal").getAttribute("data-name");
      const price = parseFloat(this.closest(".meal").getAttribute("data-price"));

      // 🔁 Initialize fresh order if no orders or previous one was completed
      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

      if (existingOrders.length === 0) {
        localStorage.setItem("orders", JSON.stringify([{ meal, price }]));
      } else {
        const newOrders = [...existingOrders, { meal, price }];
        localStorage.setItem("orders", JSON.stringify(newOrders));
      }

      alert(`${meal} has been added to your order!`);

      const proceed = confirm("Shall we proceed to the billing section?");
      if (proceed) {
        const name = prompt("Enter your name:");
        if (!name) return alert("Name is required!");

        const address = prompt("Enter your address:");
        if (!address) return alert("Address is required!");

        localStorage.setItem("userName", name);
        localStorage.setItem("userAddress", address);

        window.location.href = "billing.html";
      }
    });
  });
});
