const container = document.querySelector("#characters");
const searchForm = document.querySelector("#searchForm");
// const search = document.querySelector('#search')
const search = document.querySelector("input");

this.addEventListener("load", () => {
  fetch("/characters").then((response) => {
    response.json().then((data) => {
      console.log("data:::: ", data);
      const results = data.data.results;
      let content = "";
      results.map((item) => {
        content += `
                    <div class='card'>
                    <p>${item.name}</p>
                    <img 
                        src='${item.thumbnail.path}.${item.thumbnail.extension}'
                    />
                    </div>`;
      });

      console.log("data:::: ", results);
      container.innerHTML = content;
    });
  });
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchValue = search.value;

  fetch("/characters?name=" + searchValue).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log("resp::: ", data);
      } else {
        console.log("resp::: ", data);
        const results = data.data.results;
        let content = "";
        results.map((item) => {
          content += `
                        <div class='card'>
                        <p>${item.name}</p>
                        <img 
                            src='${item.thumbnail.path}.${item.thumbnail.extension}'
                        />
                        </div>`;
        });

        console.log("data:::: ", results);
        container.innerHTML = content;
      }
    });
  });
});
