const displaySearchHistory = (newSearchTerm) => {
    let searchHistory = {};
    if (localStorage.getItem('search_history')) {
        searchHistory = JSON.parse(localStorage.getItem('search_history'));
    };

    if (newSearchTerm in searchHistory) {
        return;
    } else if (newSearchTerm && newSearchTerm.length > 0) {
        searchHistory[newSearchTerm] = {text: newSearchTerm};
        localStorage.setItem('search_history', JSON.stringify(searchHistory));
    };

    if (Object.keys(searchHistory).length > 0) {
        $('#search-history-help').addClass('hidden');
        updateSearchHistoryList(searchHistory);
    }
};

const updateSearchHistoryList = (searchHistory) => {
    const searchHistoryList = $('#search-history-list');
    searchHistoryList.empty();
    for (let i=0; i<Object.keys(searchHistory).length; i++) {
        const searchTerm = Object.keys(searchHistory)[i];
        const searchTermElement = $('<li>').attr('data-search', searchTerm)

        searchTermElement.hover(function() {
            $(this).css('cursor', 'pointer');
            $(this).addClass('has-background-dark has-text-light');
        }, function() {
            $(this).removeClass('has-background-dark has-text-light');
        });

        searchTermElement.text(`${searchHistory[searchTerm].text}`);
        searchHistoryList.append(searchTermElement);
        searchTermElement.on('click', function() {
            teamSearch($(this).attr('data-search'));
        });
    };    
};