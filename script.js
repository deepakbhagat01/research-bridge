const config = window.RESEARCHBRIDGE_CONFIG || {};
const email = config.email || "dinkardeepak980@gmail.com";
const emailLink = document.getElementById("email-link");
document.getElementById("email-text").textContent = email;
emailLink.href = `mailto:${email}`;
document.getElementById("year").textContent = new Date().getFullYear();

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "☰";
}));

document.getElementById("project-form").addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const subject = encodeURIComponent(`Research-Bridge enquiry: ${data.get("type")}`);
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nEnquiry type: ${data.get("type")}\n\nRequirements:\n${data.get("message")}`
  );
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  document.getElementById("form-status").textContent = "Your email app should open with a prepared draft. Review it before sending.";
});

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(() => {}));
}
