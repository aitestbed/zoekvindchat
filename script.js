const api_url_base = "https://cors-anywhere.herokuapp.com/https://zoeken.oba.nl/api/v1/search/?q=";
const api_key = "authorization=76f45dfa187d66be5fd6af05573eab04";
const api_output = "&output=json";

async function getResults(searchTerm) {
    const api_url = api_url_base + searchTerm + "&" + api_key + api_output;
    try {
        const response = await fetch(api_url);
        const data = await response.json();
        const results = data.results;

        const resultsContainer = document.getElementById("resultsContainer");
        resultsContainer.innerHTML = ""; // Clear previous results

        results.forEach(result => {
            const plaatje = document.createElement("img");
            plaatje.src = result.coverimages[0];
            plaatje.alt = result.titles[0];
            plaatje.style.margin = "10px";
            resultsContainer.appendChild(plaatje);

            const titleLink = document.createElement("a");
            titleLink.href = result.detaillink;
            titleLink.innerText = result.titles[0];
            titleLink.style.display = "block";
            resultsContainer.appendChild(titleLink);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function search() {
    const searchTerm = document.getElementById("searchTerm").value;
    getResults(searchTerm);
}

document.addEventListener("DOMContentLoaded", () => {
    getResults("1984");
});
