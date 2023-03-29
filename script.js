const api_url = "https://cors-anywhere.herokuapp.com/https://zoeken.oba.nl/api/v1/search/?q=1984&authorization=76f45dfa187d66be5fd6af05573eab04&output=json";

async function getBooks() {
    try {
        const response = await fetch(api_url);
        const data = await response.json();
        const books = data.results;

        const bookContainer = document.getElementById("bookContainer");

        books.forEach(book => {
            const bookDiv = document.createElement("div");
            bookDiv.className = "book";

            const coverImg = document.createElement("img");
            coverImg.src = book.coverimages[0].coverimage;
            coverImg.alt = book.titles[0].title;

            const detailLink = document.createElement("a");
            detailLink.href = book.detaillink;
            detailLink.target = "_blank";

            detailLink.appendChild(coverImg);
            bookDiv.appendChild(detailLink);
            bookContainer.appendChild(bookDiv);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

getBooks();
