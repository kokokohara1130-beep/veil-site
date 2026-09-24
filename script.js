// A single, restrained entrance transition. Content stays visible when JavaScript is unavailable.
document.documentElement.classList.add("js");

window.requestAnimationFrame(() => {
  document.documentElement.classList.add("is-loaded");
});

const navigation = document.querySelector(".site-nav");
const updateNavigation = () => {
  navigation?.classList.toggle("is-scrolled", window.scrollY > 32);
};
updateNavigation();
window.addEventListener("scroll", updateNavigation, { passive: true });
