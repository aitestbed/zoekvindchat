const api_url = "https://zoeken.oba.nl/api/v1/search/?q=1984&authorization=76f45dfa187d66be5fd6af05573eab04&output=json";
const cors_proxy_url = "http://localhost:8080/";

async function getBookData() {
    try {
        const response = await fetch(cors_proxy_url + api_url, {
            method: "GET",
            headers: {
                "Origin": "",
            },
        });
        const data = await response.json();
        const result = data.results[0];

        const titel = document.getElementById("titel");
        const plaatje = document.getElementById("plaatje");
        const link = document.getElementById("link");

        titel.innerText = result.titles[0].title;
        plaatje.src = result.coverimages[0].coverimage;
        link.href = result.detaillink;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

getBookData();
