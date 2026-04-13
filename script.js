"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}
const button = document.getElementById("switch");
if (button) {
    button.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        }
        else {
            localStorage.setItem("theme", "light");
        }
    });
}
const countriesContainer = document.getElementById("container");
const searchInput = document.getElementById("searchInput");
const regionFilter = document.getElementById("region");
let allCountries = [];
// Fetch countries
async function fetchCountries() {
    try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        allCountries = data;
        displayCountries(allCountries);
    }
    catch (err) {
        console.error("Error fetching countries:", err);
    }
}
// Display countries
function displayCountries(countries) {
    countriesContainer.innerHTML = "";
    countries.forEach((country) => {
        const card = document.createElement("section");
        card.innerHTML = `
      <img src="${country.flags.png}" alt="${country.name.common}">
      <p><strong>${country.name.common}</strong></p>
      <p>Population: ${country.population.toLocaleString()}</p>
      <p>Region: ${country.region}</p>
      <p>Capital: ${country.capital ? country.capital[0] : "N/A"}</p>
    `;
        countriesContainer.appendChild(card);
    });
}
fetchCountries();
// Filter countries
function filterCountries() {
    const searchValue = searchInput.value.toLowerCase();
    const regionValue = regionFilter.value;
    const filtered = allCountries.filter((country) => {
        const matchesSearch = country.name.common
            .toLowerCase()
            .includes(searchValue);
        const matchesRegion = regionValue
            ? country.region === regionValue
            : true;
        return matchesSearch && matchesRegion;
    });
    displayCountries(filtered);
}
searchInput.addEventListener("input", () => filterCountries());
regionFilter.addEventListener("change", () => filterCountries());
//# sourceMappingURL=script.js.map