const input = document.getElementById("playground-input");
const preview = document.getElementById("playground-preview");

input.addEventListener("input", () => {
  // Reset the preview
  preview.removeAttribute("style");
  preview.style.minHeight = "80px";
  preview.style.borderRadius = "12px";
  preview.style.border = "2px dashed rgba(255,255,255,0.1)";
  preview.style.display = "flex";
  preview.style.alignItems = "center";
  preview.style.justifyContent = "center";
  preview.style.transition = "all 0.3s ease";
  preview.className = "";

  const classes = input.value.trim().split(" ");
  if (classes.length === 0) {
    preview.innerHTML =
      '<span style="color:#475569;">Preview will appear here…</span>';
    return;
  }

  preview.innerHTML =
    '<span style="color:inherit;">Hello, Chai Tailwind! ☕</span>';
  classes.forEach((cls) => preview.classList.add(cls));
  // The MutationObserver in chai-tailwind.js will pick up the new classes
});
