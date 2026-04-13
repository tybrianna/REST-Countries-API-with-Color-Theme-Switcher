const button = document.getElementById("switch");

if (button) {
  button.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
  });
}

type Country = {
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital?: string[];
  flags: {
    png: string;
  };
};


const countriesContainer = document.getElementById("countries") as HTMLElement;
const searchInput = document.getElementById("search") as HTMLInputElement;
const regionFilter = document.getElementById("region") as HTMLSelectElement;

let allCountries: Country[] = [];

// Fetch countries
async function fetchCountries(): Promise<void> {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data: Country[] = await res.json();

    allCountries = data;
    displayCountries(allCountries);
  } catch (err) {
    console.error("Error fetching countries:", err);
  }
}

// Display countries
function displayCountries(countries: Country[]): void {
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

// Search
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(value)
  );

  displayCountries(filtered);
});

// Filter
regionFilter.addEventListener("change", () => {
  const region = regionFilter.value;

  if (!region) {
    displayCountries(allCountries);
  } else {
    const filtered = allCountries.filter(
      (country) => country.region === region
    );

    displayCountries(filtered);
  }
});

fetchCountries();