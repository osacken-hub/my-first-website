console.log("Сайт загружен успешно.");

const config = window.SITE_CONFIG || {};

function applySiteConfig() {
  const contacts = config.contacts;
  if (!contacts) return;

  const emailLink = document.getElementById("contactEmail");
  const telegramLink = document.getElementById("contactTelegram");
  const phoneLink = document.getElementById("contactPhone");

  if (emailLink && contacts.email) {
    emailLink.href = "mailto:" + contacts.email;
    emailLink.textContent = "Email: " + contacts.email;
  }

  if (telegramLink && contacts.telegram) {
    telegramLink.href = "https://t.me/" + contacts.telegram;
    telegramLink.textContent = "Telegram: @" + contacts.telegram;
  }

  if (phoneLink && contacts.phone) {
    phoneLink.href = "tel:" + contacts.phone;
    phoneLink.textContent = "Телефон: " + (contacts.phoneDisplay || contacts.phone);
  }
}

function initMobileMenu() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!header || !toggle) return;

  toggle.addEventListener("click", function () {
    const isOpen = header.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      header.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Открыть меню");
    });
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (sections.length === 0 || navLinks.length === 0) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        navLinks.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    },
    {
      rootMargin: "-40% 0px -45% 0px",
      threshold: 0,
    }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (items.length === 0) return;

  const observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  items.forEach(function (item) {
    observer.observe(item);
  });
}

function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const messageInput = document.getElementById("messageInput");
  const formMessage = document.getElementById("formMessage");
  const submitButton = document.getElementById("submitButton");
  const endpoint = config.formspreeEndpoint;

  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    formMessage.classList.remove("error");

    if (!contactForm.checkValidity()) {
      formMessage.textContent = "Пожалуйста, заполните все поля корректно.";
      formMessage.classList.add("error");
      return;
    }

    const payload = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim(),
    };

    if (!endpoint) {
      formMessage.textContent =
        "Спасибо! Сообщение сохранено локально. Добавьте formspreeEndpoint в site-config.js для реальной отправки.";
      contactForm.reset();
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Отправка...";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Form submit failed");
      }

      formMessage.textContent = "Спасибо! Сообщение успешно отправлено.";
      contactForm.reset();
    } catch (error) {
      formMessage.textContent = "Не удалось отправить сообщение. Попробуйте позже или напишите напрямую.";
      formMessage.classList.add("error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Отправить сообщение";
    }
  });
}

applySiteConfig();
initMobileMenu();
initScrollSpy();
initReveal();
initContactForm();
