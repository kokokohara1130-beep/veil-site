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

// Keep the two-column portraits compact on mobile; full biographies remain available.
const profiles = document.querySelectorAll(".member-profile");
const profileDialog = document.createElement("dialog");
profileDialog.className = "profile-dialog";
profileDialog.setAttribute("aria-labelledby", "profile-dialog-title");
profileDialog.innerHTML = '<button class="profile-dialog__close" type="button" aria-label="紹介を閉じる">閉じる ×</button><h2 id="profile-dialog-title"></h2><p class="profile-dialog__meta"></p><p class="profile-dialog__body"></p>';
document.body.append(profileDialog);
profileDialog.querySelector("button").addEventListener("click", () => profileDialog.close());
profileDialog.addEventListener("click", (event) => {
  if (event.target !== profileDialog) return;
  const bounds = profileDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) profileDialog.close();
});
profiles.forEach((profile) => {
  const copy = profile.querySelector(".member-profile__copy");
  const description = profile.querySelector(".member-profile__description");
  const summary = document.createElement("p");
  summary.className = "member-profile__summary";
  summary.textContent = description.textContent.split("。")[0] + "。";
  const button = document.createElement("button");
  button.type = "button";
  button.className = "member-profile__more";
  button.textContent = "プロフィールを見る ＋";
  button.setAttribute("aria-haspopup", "dialog");
  button.setAttribute("aria-label", profile.querySelector("h3").textContent + "のプロフィールを見る");
  button.addEventListener("click", () => {
    profileDialog.querySelector("h2").textContent = profile.querySelector("h3").textContent;
    profileDialog.querySelector(".profile-dialog__meta").textContent = profile.querySelector(".member-profile__name").textContent;
    profileDialog.querySelector(".profile-dialog__body").textContent = description.textContent;
    profileDialog.showModal();
  });
  copy.append(summary, button);
});
document.documentElement.classList.add("profiles-ready");
