const api_url = "https://cors-anywhere.herokuapp.com/https://zoeken.oba.nl/api/v1/search/?q=1984&authorization=76f45dfa187d66be5fd6af05573eab04&output=json";

async function getJSON() {
    try {
        const response = await fetch(api_url);
        const data = await response.json();

        const jsonOutput = document.getElementById("jsonOutput");
        jsonOutput.innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

getJSON();
