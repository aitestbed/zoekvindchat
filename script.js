const api_url_base = "https://cors-anywhere.herokuapp.com/https://zoeken.oba.nl/api/v1/search/?q=";
const api_key = "authorization=76f45dfa187d66be5fd6af05573eab04";
const api_output = "&output=json";

const facets = {
  boeken: "&facet=type(book)",
  dvds: "&facet=type(movie)",
  activiteiten: "%20table:Activiteiten",
  cursussen: "%20table:jsonsrc",
};

async function getResults(searchTerm, facet = "") {
  const api_url = api_url_base + searchTerm + facet + "&" + api_key + api_output;

  try {
    const response = await fetch(api_url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

function displayResults(results, containerId) {
  const resultsContainer = document.getElementById(containerId);
  resultsContainer.innerHTML = ""; // Clear previous results

  if (results.length === 0) {
    resultsContainer.textContent = "Er zijn geen resultaten";
    return;
  }

  results.forEach((result) => {
    const resultItem = document.createElement("div");
    resultItem.className = "result-item";

    const plaatjeLink = document.createElement("a");
    if (result.detailLink) {
      plaatjeLink.href = result.detailLink.replace("http://", "https://");
    }

    const plaatje = document.createElement("img");
    plaatje.src = result.coverimages[0];
    plaatje.alt = result.titles[0];

    plaatjeLink.appendChild(plaatje);
    resultItem.appendChild(plaatjeLink);

    resultsContainer.appendChild(resultItem);
  });
}

async function search() {
  const searchTerm = document.getElementById("searchTerm").value;

  for (const [facetName, facetValue] of Object.entries(facets)) {
    const results = await getResults(searchTerm, facetValue);
    displayResults(results, `${facetName}Results`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  search();
});
