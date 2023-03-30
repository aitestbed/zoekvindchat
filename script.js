async function getResults(searchTerm, category) {
  const api_url_base = "https://cors-anywhere.herokuapp.com/https://zoeken.oba.nl/api/v1/search/?q=";
  const api_key = "authorization=76f45dfa187d66be5fd6af05573eab04";
  const api_output = "&output=json";
  let api_facet = "";

  if (category === "boeken") {
    api_facet = "&facet=Type(book)";
  } else if (category === "dvds") {
    api_facet = "&facet=Type(movie)";
  } else if (category === "activiteiten") {
    api_facet = "%20table:Activiteiten";
  } else if (category === "cursussen") {
    api_facet = "%20table:jsonsrc";
  }

  const api_url = api_url_base + searchTerm + api_facet + "&" + api_key + api_output;

  try {
    const response = await fetch(api_url, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.results;
    } else {
      console.error("Error fetching data:", response.status, response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function search() {
  const searchTerm = document.getElementById("searchTerm").value.trim();

  if (searchTerm.length === 0) {
    return;
  }

  const categories = [
    { name: "boeken", container: "boekenContainer" },
    { name: "dvds", container: "dvdsContainer" },
    { name: "activiteiten", container: "activiteitenContainer" },
    { name: "cursussen", container: "cursussenContainer" },
  ];

  for (const category of categories) {
    const results = await getResults(searchTerm, category.name);

    if (results.length > 0) {
      showResults(category.container, results);
      document.getElementById(category.container).style.display = "block";
    } else {
      document.getElementById(category.container).style.display = "none";
    }
  }
}

document.getElementById("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  search();
});

const categoryContainers = document.querySelectorAll(".category-container");
categoryContainers.forEach((container) => {
  container.style.display = "none";
});

function showResults(containerId, results) {
  const resultsContainer = document.getElementById(containerId).querySelector(".results-container");
  resultsContainer.innerHTML = "";

  results.forEach((result) => {
    const img = document.createElement("img");
    img.src = result.coverimages[0];
    img.alt = result.titles[0];

    let detailLink = result.detailLink;
    if (!detailLink) {
      detailLink = result.detaillink;
    }

    const link = document.createElement("a");
    link.href = detailLink.replace("http:", "https:");
    link.target = "_blank";
    link.appendChild(img);

    const item = document.createElement("div");
    item.className = "result-item";
    item.appendChild(link);

    resultsContainer.appendChild(item);
  });
}
