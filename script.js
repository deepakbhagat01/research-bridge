const config = window.RESEARCHBRIDGE_CONFIG || {};
const email = config.email || "YOUR_EMAIL@example.com";
const phone = (config.whatsappNumber || "910000000000").replace(/\D/g, "");
const emailLink = document.getElementById("email-link");
const waLink = document.getElementById("wa-link");
document.getElementById("email-text").textContent = email;
emailLink.href = `mailto:${email}`;
if (email.includes("YOUR_EMAIL")) emailLink.addEventListener("click", e => { e.preventDefault(); alert("Please add your approved email address in config.js first."); });
if (phone === "910000000000" || phone.length < 10) {
  document.getElementById("wa-text").textContent = "Add your WhatsApp number";
  waLink.href = "#contact";
  waLink.addEventListener("click", e => { e.preventDefault(); alert("Please add your approved WhatsApp number in config.js first."); });
} else {
  document.getElementById("wa-text").textContent = "+" + phone;
  waLink.href = `https://wa.me/${phone}`;
}
document.getElementById("year").textContent = new Date().getFullYear();
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false"); menuButton.textContent = "☰";
}));
document.getElementById("project-form").addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const subject = encodeURIComponent(`ResearchBridge enquiry: ${data.get("type")}`);
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nEnquiry type: ${data.get("type")}\n\nRequirements:\n${data.get("message")}`
  );
  if (email.includes("YOUR_EMAIL")) {
    document.getElementById("form-status").textContent = "First add your approved email address in config.js. Then this form will prepare an email draft.";
    return;
  }
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  document.getElementById("form-status").textContent = "Your email app should open with a prepared draft. Review it before sending.";
});
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(() => {}));
}
