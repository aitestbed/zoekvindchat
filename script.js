const api_url = "https://cors-anywhere.herokuapp.com/https://zoeken.oba.nl/api/v1/search/?q=1984&authorization=76f45dfa187d66be5fd6af05573eab04&output=json";

async function getPlaatjes() {
    try {
        const response = await fetch(api_url);
        const data = await response.json();
        const results = data.results;

        const plaatjesContainer = document.getElementById("plaatjesContainer");

        results.forEach(result => {
            const plaatje = document.createElement("img");
            plaatje.src = result.coverimages[0].coverimage;
            plaatje.alt = result.titles[0].title;
            plaatje.style.margin = "10px";
            plaatjesContainer.appendChild(plaatje);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

document.addEventListener("DOMContentLoaded", getPlaatjes);
