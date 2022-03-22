import "./styles.css";
//url -> https://www.thecolorapi.com/scheme?hex={hex}&mode={mode}&count=5

const colorBlocks = [...document.getElementsByClassName("color")];
const colorNames = [...document.getElementsByClassName("color-name")];
const seedDisplay = document.getElementById("intro");
const colorInput = document.getElementById("seed-color");
const colorForm = document.getElementById("color-form");
const schemeMode = document.getElementById("scheme-mode");
let colorScheme = [];

const clipColor = (text) => {
  navigator.clipboard.writeText(text);
};

const getColorScheme = (reseed) => {
  const chosenColor = colorInput.value.slice(1); //remove #
  const mode = schemeMode.value;
  const url = `https://www.thecolorapi.com/scheme?hex=${chosenColor}&mode=${mode}&count=5`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const seedName = data.seed.name.value;
      colorScheme = data.colors;

      let i = 0;
      for (let c of colorBlocks) {
        const hexValue = colorScheme[i].hex.value;
        c.style.background = hexValue;
        c.textContent = colorScheme[i].name.value;
        colorNames[i].textContent = hexValue;
        colorNames[i].addEventListener("click", () => clipColor(hexValue));
        i++;
      }
      if (reseed) {
        seedDisplay.textContent = `Seed color: ${colorInput.value.toUpperCase()} ${seedName}`;
        seedDisplay.style.boxShadow = `1px 1px 10px ${colorInput.value}`;
      }
    });
};

getColorScheme(false);

colorForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getColorScheme(true);
});
