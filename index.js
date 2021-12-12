const state = {
  breweries: [],
  selectedState: "",
  selectedBreweryType: "",
  selectedCities: [],
};

const selectStateForm = document.querySelector("#select-state-form");
const selectStateInput = document.querySelector("#select-state");
const mainElement = document.querySelector("main");

function fetchBreweriesByState(selectedState) {
  return fetch(
    `https://api.openbrewerydb.org/breweries?by_state=${selectedState}&per_page=50`
  ).then((resp) => resp.json());
}

selectStateForm.addEventListener("submit", function (event) {
  event.preventDefault();
  state.selectedState = selectStateInput.value;
  fetchBreweriesByState(state.selectedState).then((array) => {
    state.breweries = array;

    render();
  });
});

function renderListSection() {
  const listOfBerweriesH1 = document.createElement("h1");
  listOfBerweriesH1.textContent = "List of Breweries";

  const searchBarHeader = document.createElement("header");
  searchBarHeader.setAttribute("class", "search-bar");

  const searchBreweriesForm = document.createElement("form");
  searchBreweriesForm.setAttribute("id", "search-breweries-form");
  searchBreweriesForm.setAttribute("autocomplete", "off");

  const searchBreweriesLabel = document.createElement("label");
  searchBreweriesLabel.setAttribute("for", "search-breweries");

  const searchBreweriesH2 = document.createElement("h2");
  searchBreweriesH2.textContent = "Search breweries";

  const searchBreweriesInput = document.createElement("input");
  searchBreweriesInput.setAttribute("id", "search-breweries");
  searchBreweriesInput.setAttribute("name", "search-breweries");
  searchBreweriesInput.setAttribute("type", "text");

  searchBreweriesForm.append(searchBreweriesLabel, searchBreweriesInput);

  searchBreweriesLabel.append(searchBreweriesH2);
  searchBarHeader.append(searchBreweriesForm);

  const articleElement = document.createElement("article");

  const breweriesListUl = document.createElement("ul");
  breweriesListUl.setAttribute("class", "breweries-list");
  breweriesListUl.innerHTML = "";
  // creating a new array and then filtering
  let breweriesToDisplay = state.breweries;
  if (state.selectedBreweryType !== "") {
    breweriesToDisplay = breweriesToDisplay.filter((brewery) =>
      state.selectedBreweryType.includes(brewery.brewery_type)
    );
  }

  if (state.selectedCities.length > 0) {
    breweriesToDisplay = breweriesToDisplay.filter((brewery) =>
      state.selectedCities.includes(brewery.city)
    );
  }

  // create list for every filtered brewery as above (146)
  for (const brewery of breweriesToDisplay) {
    const listElement = document.createElement("li");

    const breweryTitle = document.createElement("h2");
    breweryTitle.textContent = brewery.name;

    const typeElement = document.createElement("div");
    typeElement.setAttribute("class", "type");
    typeElement.textContent = brewery.brewery_type;

    const addressElement = document.createElement("section");
    addressElement.setAttribute("class", "address");

    const addressTitle = document.createElement("h3");
    addressTitle.textContent = "Address:";

    const addressFirstLine = document.createElement("p");
    addressFirstLine.textContent = brewery.street;

    const addressSecondLine = document.createElement("p");
    const addressSecondLineStrong = document.createElement("strong");
    addressSecondLineStrong.textContent = `${brewery.city}, ${brewery.postal_code}`;

    addressSecondLine.append(addressSecondLineStrong);
    addressElement.append(addressTitle, addressFirstLine, addressSecondLine);

    const phoneElement = document.createElement("section");
    phoneElement.setAttribute("class", "phone");

    const phoneTitle = document.createElement("h3");
    phoneTitle.textContent = "Phone:";

    const phoneNumberEl = document.createElement("p");
    phoneNumberEl.textContent = brewery.phone;

    phoneElement.append(phoneTitle, phoneNumberEl);

    const linkElement = document.createElement("section");
    linkElement.setAttribute("class", "link");

    const visitWebsiteLink = document.createElement("a");
    visitWebsiteLink.setAttribute("href", brewery.website_url);
    visitWebsiteLink.setAttribute("target", "_blank");
    visitWebsiteLink.textContent = "Visit Website";

    linkElement.append(visitWebsiteLink);

    listElement.append(
      breweryTitle,
      typeElement,
      addressElement,
      phoneElement,
      linkElement
    );

    breweriesListUl.append(listElement);
  }

  articleElement.append(breweriesListUl);
  mainElement.append(listOfBerweriesH1, searchBarHeader, articleElement);
}
function render() {
  mainElement.innerHTML = "";
  renderAside();
  renderListSection();
}

function renderAside() {
  const asideElement = document.createElement("aside");
  asideElement.setAttribute("class", "filters-section");

  const filterBy = document.createElement("h2");
  filterBy.textContent = "Filter By";

  const filterByForm = document.createElement("form");
  filterByForm.setAttribute("id", "filter-by-type-form");
  filterByForm.setAttribute("autocomplete", "off");

  const filterByLabel = document.createElement("label");
  filterByLabel.setAttribute("for", "filter-by-type");

  const typeOfBrewery = document.createElement("h3");
  typeOfBrewery.textContent = "Type of Brewery";

  filterByLabel.append(typeOfBrewery);

  const selectBreweryType = document.createElement("select");
  selectBreweryType.setAttribute("name", "filter-by-type");
  selectBreweryType.setAttribute("id", "filter-by-type");

  selectBreweryType.addEventListener("change", function () {
    const selectedBrewery = selectBreweryType.value;
    state.selectedBreweryType = selectedBrewery;

    render();
  });

  const selectTypeOption = document.createElement("option");
  selectTypeOption.setAttribute("value", "");
  selectTypeOption.textContent = "Select a Type..";

  const selectOptionMicro = document.createElement("option");
  selectOptionMicro.setAttribute("value", "micro");
  selectOptionMicro.textContent = "Micro";

  const selectOptionRegional = document.createElement("option");
  selectOptionRegional.setAttribute("value", "regional");
  selectOptionRegional.textContent = "Regional";

  const selectOptionBrewpub = document.createElement("option");
  selectOptionBrewpub.setAttribute("value", "brewpub");
  selectOptionBrewpub.textContent = "Brewpub";

  const filterByCity = document.createElement("div");
  filterByCity.setAttribute("class", "filter-by-city-heading");

  const citiesH2 = document.createElement("h3");
  citiesH2.textContent = "Cities";

  const clearButton = document.createElement("button");
  clearButton.setAttribute("class", "clear-all-btn");
  clearButton.textContent = "clear all";

  const filterByCityForm = document.createElement("form");
  filterByCityForm.setAttribute("id", "filter-by-city-form");

  let cities = [];
  for (const brewery of state.breweries) {
    if (!cities.includes(brewery.city)) cities.push(brewery.city);
  }
  cities.sort();
  for (const city of cities) {
    const cityCheckbox = document.createElement("input");
    cityCheckbox.setAttribute("type", "checkbox");
    cityCheckbox.setAttribute("name", city);
    cityCheckbox.setAttribute("value", city);

    if (state.selectedCities.includes(city)) {
      cityCheckbox.checked = true;
    }

    cityCheckbox.addEventListener("change", function () {
      state.selectedCities.push(city);
      render();
    });

    const cityLabel = document.createElement("label");
    cityLabel.setAttribute("for", city);
    cityLabel.textContent = city;

    filterByCityForm.append(cityCheckbox, cityLabel);
  }

  filterByForm.append(filterByLabel, selectBreweryType);

  filterByCity.append(citiesH2, clearButton);

  selectBreweryType.append(
    selectTypeOption,
    selectOptionMicro,
    selectOptionRegional,
    selectOptionBrewpub
  );

  asideElement.append(filterBy, filterByForm, filterByCity, filterByCityForm);

  mainElement.append(asideElement);
}
