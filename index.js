const state = {
  breweries: [],
  selectedState: "",
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

    /*
<aside class="filters-section">
  <h2>Filter By:</h2>
  <form id="filter-by-type-form" autocompete="off">
    <label for="filter-by-type"><h3>Type of Brewery</h3></label>
    <select name="filter-by-type" id="filter-by-type">
      <option value="">Select a type...</option>
      <option value="micro">Micro</option>
      <option value="regional">Regional</option>
      <option value="brewpub">Brewpub</option>
    </select>
  </form>
  <div class="filter-by-city-heading">
    <h3>Cities</h3>
    <button class="clear-all-btn">clear all</button>
  </div>
  <form id="filter-by-city-form">
    <input type="checkbox" name="chardon" value="chardon" /><label for="chardon"
      >Chardon</label
    ><input type="checkbox" name="cincinnati" value="cincinnati" /><label
      for="cincinnati"
      >Cincinnati</label
    >
    // More checkboxes
  </form>
</aside>

*/
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

    for (const brewery of state.breweries) {
      const cityCheckbox = document.createElement("input");
      cityCheckbox.setAttribute("type", "checkbox");
      cityCheckbox.setAttribute("name", brewery.city);
      cityCheckbox.setAttribute("value", brewery.city);

      const cityLabel = document.createElement("label");
      cityLabel.setAttribute("for", brewery.city);
      cityLabel.textContent = brewery.city;

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
  });
});
