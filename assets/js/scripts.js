(function() {
   // Set the path and onHomepage variables to help determine the correct path for fetching JSON data, render the correct img.src and href values in the HTML, and to pass on to shuffleArray fn.
  let path = window.location.pathname;
  let onHomepage = path == '/2023/revivals/' || path =='/2023/revivals/index.html';

  async function getJSONData() {
    try {
      let response = await fetch(onHomepage ? "./assets/js/projects.json" : "./../assets/js/projects.json");
      let data = await response.json();
      return data;
    } catch(error) {
      console.log(error);
    }
  }

  /*
  The project grid data is shuffled on both the index and project pages. When a user is on a project page we remove the current project from the grid using the filterArray fn and then shuffle.
  */
  function shuffleArray(fontData, onHomepage, path) {
    function filterArray() {
      return fontData.filter((el) => !el.url.includes(path));
    }

    let array = (onHomepage) ? fontData : filterArray();

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async function projectGridSetup() {
    // Get data
    let fontData = await getJSONData();
    let shuffledData = shuffleArray(fontData, onHomepage, path);

    // Render the project grid
    const parent = document.getElementById("projectGrid");
    for (let i = 0; i < shuffledData.length; i++) {
      const project = shuffledData[i];

      const singleProject = document.createElement("a");
      singleProject.href = onHomepage ? `.${project.url}` : `./..${project.url}`;
      singleProject.setAttribute("id", i);

      const img = document.createElement("img");
      img.src = onHomepage ? `./assets/img${project.img}` : `./../assets/img${project.img}`;

      const description = document.createElement("div");
      description.innerHTML += `
        <p>${project.designer}</p>
      `;
      singleProject.append(img, description);
      parent.appendChild(singleProject);
    }
  }

  projectGridSetup();
})();
