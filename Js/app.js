
document.addEventListener("DOMContentLoaded", function () {

    // GET HTML ELEMENTS

    const destinationList =
        document.getElementById("destination-list");

    const searchInput =
        document.getElementById("search-input");

    const searchButton =
        document.getElementById("search-button");

    const searchMessage =
        document.getElementById("search-message");

    const showAllButton =
        document.getElementById("show-all-button");

    const destinationDescription =
        document.getElementById("destination-description");


    // DISPLAY DESTINATIONS

    function displayDestinations(destinationData) {

        destinationList.innerHTML = "";

        if (destinationData.length === 0) {

            destinationList.innerHTML =
                "<p>No destinations found. Try another search.</p>";

            return;
        }

        destinationData.forEach(function (place) {

            const card = document.createElement("div");

            card.className = "destination-card";

            card.innerHTML = `
                <h3>${place.name}</h3>
                <p>State: ${place.state}</p>
                <p>Category: ${place.category}</p>
                <p>Starting Budget: ₹${place.budget}</p>
            `;

            destinationList.appendChild(card);

        });

    }


    // SEARCH DESTINATIONS

    function searchDestinations() {

        const searchValue =
            searchInput.value.trim().toLowerCase();

        if (searchValue === "") {

            searchMessage.textContent =
                "Please enter a destination.";

            displayDestinations(destinations);

            destinationDescription.textContent =
                "Discover some of India's favourite destinations.";

            return;
        }

        const filteredDestinations =
            destinations.filter(function (place) {

                return (
                    place.name.toLowerCase().includes(searchValue) ||
                    place.state.toLowerCase().includes(searchValue) ||
                    place.category.toLowerCase().includes(searchValue)
                );

            });

        if (filteredDestinations.length > 0) {

            searchMessage.textContent =
                filteredDestinations.length + " destination(s) found.";

        } else {

            searchMessage.textContent =
                "No matching destinations found.";

        }

        destinationDescription.textContent =
            "Search results for: " + searchInput.value.trim();

        displayDestinations(filteredDestinations);

        document.getElementById("popular").scrollIntoView({
            behavior: "smooth"
        });

    }


    // SEARCH BUTTON

    searchButton.addEventListener("click", searchDestinations);


    // ENTER KEY SEARCH

    searchInput.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            searchDestinations();
        }

    });


    // CATEGORY FILTERING

    const categoryCards =
        document.querySelectorAll(".category-card");

    categoryCards.forEach(function(card) {

        card.addEventListener("click", function() {

            const selectedCategory =
                card.getAttribute("data-category");

            const filteredDestinations =
                destinations.filter(function(place) {

                    return place.category.toLowerCase() ===
                           selectedCategory.toLowerCase();

                });

            searchInput.value = "";

            searchMessage.textContent =
                filteredDestinations.length +
                " destination(s) found.";

            destinationDescription.textContent =
                "Explore " + selectedCategory + " destinations.";

            displayDestinations(filteredDestinations);

            document.getElementById("popular").scrollIntoView({
                behavior: "smooth"
            });

        });

    });


    // SHOW ALL DESTINATIONS

    showAllButton.addEventListener("click", function() {

        searchInput.value = "";

        searchMessage.textContent = "";

        destinationDescription.textContent =
            "Discover some of India's favourite destinations.";

        displayDestinations(destinations);

    });


    // INITIAL DISPLAY

    displayDestinations(destinations);

    console.log("Trip Nest loaded successfully!");

    console.log("Available destinations:", destinations);

});
