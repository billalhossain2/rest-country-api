const capitalSelectElement = document.getElementById("capital");
const languageSelectElement = document.getElementById("language");
const spinner = document.getElementById("spinner");
const errorAlertBox = document.getElementById("error-message");
const countriesContainer = document.getElementById("countries-container");
const loadCapitals = async () => {
  const URL = `https://restcountries.com/v3.1/all`;
  const response = await fetch(URL);
  const data = await response.json();
  const cities = data.reduce((arr, country) => {
    if (country.capital) {
      arr.push(country.capital[0]);
      return arr;
    }
    return arr;
  }, []);
  cities.sort().forEach((city) => displayCapitals(city));
};

const displayCapitals = (city) => {
  const option = document.createElement("option");
  option.setAttribute("value", city);
  option.innerText = city;
  capitalSelectElement.append(option);
};
loadCapitals();

//Load All Countries
const loadCountries = async () => {
  const URL = "https://restcountries.com/v3.1/all";
  spinner.style.display = "block";
  try {
    const response = await fetch(URL);
    const countries = await response.json();
    spinner.style.display = "none";
    errorAlertBox.style.display = "none";
    const limitedCountries = countries.slice(0, 22);
    limitedCountries.forEach((country) =>
      country.currencies ? displayCountries(country) : ""
    );
  } catch (error) {
    spinner.style.display = "none";
    errorAlertBox.style.display = "block";
    countriesContainer.innerHTML = "";
  }
};

//Display each country in UI
const displayCountries = (country) => {
  const currency =
    country?.currencies[Object.keys(country?.currencies)[0]].name;
  const language = country?.languages[Object.keys(country?.languages)[0]];

  const countriesContainer = document.getElementById("countries-container");
  countriesContainer.innerHTML += `
 <div class="country">
             <div class="flag-container">
                 <img src="${country.flags.png}" alt="Bangladesh National Flag">
               </div>
               <p class="country-name">${country.name.common}</p>
               <p class="country-region">Region: ${country.region}</p>
               <p class="language">Language: ${language}</p>
               <p class="currency">Currency: ${currency}</p>
               <p class="population">Population: ${country.population}</p>
 </div>
 `;
};
loadCountries();

//==============***Loading data by dynamic URL***==========
const loadCountriesByDynamicSearchQuery = async (searchQuery) => {
  const URL = `https://restcountries.com/v3.1/${searchQuery}`;
  spinner.style.display = "block";
  try {
    const response = await fetch(URL);
    const data = await response.json();
    spinner.style.display = "none";
    errorAlertBox.style.display = "none";
    data.forEach((country) => displayCountries(country));
  } catch (error) {
    spinner.style.display = "none";
    errorAlertBox.style.display = "block";
    countriesContainer.innerHTML = "";
  }
};

//Clear previous countries html elements from DOM
const clearPreviousCountriesDiv = () => {
  countriesContainer.innerHTML = "";
};

//Event listeners
const filtersContainer = document.getElementById("filters-container");
filtersContainer.addEventListener("change", (event) => {
  const filterText = event.target.getAttribute("name");
  switch (filterText) {
    case "region":
      {
        clearPreviousCountriesDiv();
        loadCountriesByDynamicSearchQuery(`region/${event.target.value}`);
      }
      break;
    case "capital":
      {
        clearPreviousCountriesDiv();
        loadCountriesByDynamicSearchQuery(`capital/${event.target.value}`);
      }
      break;
    case "language": {
      clearPreviousCountriesDiv();
      loadCountriesByDynamicSearchQuery(`lang/${event.target.value}`);
    }
    default:
      break;
  }
});

const dismissErrorButton = document.getElementById("dismiss-btn");
dismissErrorButton.onclick = () => (errorAlertBox.style.display = "none");
