let search;
let playerArray = [];
const searchContainerEl = $("#search-field");
const playerEl = $("#search-results-container");

$(document).ready(function () {
    // Show the search history from localStorage on first page load

    // Event listener for submitting search form directly
    $('#search-form').on('submit', function (event) {
        event.preventDefault();
        let searchTerm = $('#search-field').val();
        console.log(searchTerm);
        playerSearch(searchTerm)
    });

    // Event listener for clicking on search button
    $('#search-button').on('click', function (event) {
        let searchTerm = $('#search-field').val();
        playerSearch(searchTerm)
    });
});

// Getting the data info from Free NBA API, and display it


const playerSearch = (searchTerm) => {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://free-nba.p.rapidapi.com/players?page=0&per_page=25" + searchTerm,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "d25b61621dmsh38c64fa14f39745p176c5ejsnfbcc53b1a153",
            "X-RapidAPI-Host": "free-nba.p.rapidapi.com"
        }
    };
    $.ajax(settings).then(function (response) {
        let searchResultEl = $('#search-results');
        playerArray = response.player;

        // Display player info
        searchResultEl.empty();
        searchContainerEl.css('display', 'block');
        playerEl.css('display', 'none');

        // Get a reference to the search history element for this search

        if (playerArray === null) {
            const searchFailedMsg = $('<p>').text('No results found. Try another search!');
            $(/*need direction from html */).append(searchFailedMsg);
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

                // Place the new elements for the player on the page
                $('#search-results').append(resultElement);
            };
        }
    });
};