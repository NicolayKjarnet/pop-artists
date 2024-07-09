document.addEventListener("DOMContentLoaded", () => {
  const envUrl = "https://localhost:7000/env";
  fetch(envUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Environment variables:", data);

      const updateElements = (selector, value) => {
        document.querySelectorAll(selector).forEach((el) => {
          el.href = value;
          el.textContent = value;
        });
      };

      // Update href and text content for base URLs
      updateElements(".base-url", data.apiUrl);

      // Update href and text content for Swagger URLs
      updateElements(".swagger-url", data.swaggerUrl);

      // Update specific endpoint URLs
      updateElements(".artist-url", data.apiUrl + "/Artist");
      updateElements(
        ".search-by-name-url",
        data.apiUrl + "/Artist/SearchByName"
      );
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
});
