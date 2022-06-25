let search;
let playerArray = [];
const searchContainerEl = $(); // need direction from html
const playerEl = $(); // need direction from html

// Getting the data info from Free NBA API, and display it
const playerSearch = (searchTerm) => {
    $.ajax({
        url: "https://free-nba.p.rapidapi.com/players/%7Bid%7D"+searchTerm,
        method: "GET"
    }).then(function(response){
        let searchResultEl = $('#search-results');
        playerArray = response.player;

        // Display player info
        searchResultEl.empty();
        searchContainerEl.css('display', 'block');
        recipeEl.css('display', 'none');
  
        // Get a reference to the search history element for this search

        if (playerArray === null) {
            const searchFailedMsg = $('<p>').text('Sorry, no results were found. Try another search.');
            $('#search-results').append(searchFailedMsg);
        } else {
            displaySearchHistory(searchTerm);
            const historyElement = document.querySelector('[data-search="' + searchTerm + '"]');

            // Update search history listing with count of recipes returned
            const playerReturnedCount = `${searchTerm} (${playerArray.length})`;
          
            // Get the search history object and update the count for this search
            let searchHistory = JSON.parse(localStorage.getItem('search_history'));
            searchHistory[searchTerm].text = playerReturnedCount;
          
            // Save search result to local storage
            localStorage.setItem('search_history', JSON.stringify(searchHistory));

            historyElement.innerHTML = playerReturnedCount;
            
            // Print each search result
            for (obj of playerArray) {
                const resultElement = $('<div>').attr('class', 'column is-3');
                const resultLink = $('<a id="' + obj.idMeal + '">');
                const resultImg = $('<img>').attr('width', '200');
                resultImg.attr('src', obj.strMealThumb);
                const resultPara = $('<p>').text(obj.strMeal);
              
                resultLink.attr("onclick", "recipeSelected(event)");
                resultLink.append(resultImg);
                resultLink.append(resultPara);
                resultElement.append(resultLink);
              
                // Place the new elements for the recipe on the page
                $('#search-results').append(resultElement);
            };
        }
    });
};
