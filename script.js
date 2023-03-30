async function getResults(searchTerm, facet = "") {
  const api_url = api_url_base + searchTerm + facet + "&" + api_key + api_output;

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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function search() {
  const searchTerm = document.getElementById("searchTerm").value.trim();

  if (searchTerm.length === 0) {
    return;
  }

  categoryContainers.forEach((container) => {
    container.style.display = "none";
  });

  const categories = [
    { name: "boeken", facet: "&facet=type(book)" },
    { name: "dvds", facet: "&facet=type(movie)" },
    { name: "activiteiten", facet: "%20table:Activiteiten" },
    { name: "cursussen", facet: "%20table:jsonsrc" },
  ];

  for (const category of categories) {
    const results = await getResults(searchTerm, category.facet);
    if (results.length > 0) {
      showResults(category.name, results);
      document.getElementById(category.name + "Container").style.display = "block";
    } else {
      document.getElementById(category.name + "Container").style.display = "none";
    }

    // Voeg een time-out van 500ms toe
    await sleep(500);
  }
}
