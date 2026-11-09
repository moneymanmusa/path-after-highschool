// Apply the saved theme before first paint to avoid a flash.
(function () {
  var t = null;
  try { t = localStorage.getItem("pahs.theme"); } catch (e) { /* storage unavailable */ }
  if (t !== "light" && t !== "dark" && t !== "blur") {
    t = window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.documentElement.setAttribute("data-theme", t);
})();
