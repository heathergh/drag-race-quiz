const app = {};

app.displayQueens = queens => {
    const queenContainer = document.querySelector('.queen-container');
    
    // check if queen container element contains any child nodes
    if (queenContainer.hasChildNodes()) {
        // if queen container element has child nodes, replace child nodes with an empty string so new queens are displayed
        queenContainer.innerHTML = '';
    } 
    // TODO: Add check for queen quote and insert quote only if not an empty string
    queens.forEach(queen => {
        const season = queen.seasons[0].id;
        const queenInfoHtml = `
            <div class="queen-card">
                <h3 class="queen-title">${queen.name}</h3>
                <div class="image-container">
                    <img class="queen-image" src=${queen.image_url} alt=${queen.name} />
                </div>
                <h4>Season: ${season} </h4>
                <p class="quote">Quote: ${queen.quote}</p>
            </div>
        `;
        
        queenContainer.insertAdjacentHTML("beforeend", queenInfoHtml);
    });
};

//Fetch API call for queens by season
app.getQueens = async seasonNumber => {
    await fetch(`https://www.nokeynoshade.party/api/seasons/${seasonNumber}/queens`)
    .then(response => response.json())
    .then(result => {
        if (Array.isArray(result)) {
            app.displayQueens(result);
        } else {
            app.getErrorMessage("There are no results. Please try again later.")
        }
    })
    .catch(error => {
        app.getErrorMessage(error);
    });
};

app.getSelectValue = () => {
    const select = document.querySelector('#queen-category');
	select.addEventListener('change', (event) => {
		event.preventDefault();
		
        const selectValue = event.target.value;

        app.getQueens(selectValue);
    })
}

// TODO: toggle for error message, and create boolean that is updated when API call is successful for not
app.getErrorMessage = error => {
    document.querySelector('.error').innerHTML = `<p>Error: ${error}</p>`;
};

app.init = () => {
    // Set default to render season 1 until a season has been selected by the user
    app.getQueens(1);
    app.getSelectValue();
};

if (document.readyState === "complete") {
    app.init();
} else {
    document.addEventListener("DOMContentLoaded", app.init);
};