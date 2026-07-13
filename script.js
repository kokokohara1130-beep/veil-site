// A single, restrained entrance transition. Content stays visible when JavaScript is unavailable.
document.documentElement.classList.add("js");

window.addEventListener("load", () => {
  window.requestAnimationFrame(() => {
    document.documentElement.classList.add("is-loaded");
  });
});
