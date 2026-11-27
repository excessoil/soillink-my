// Sample soil listings

let soilListings = JSON.parse(localStorage.getItem("soilListings")) || [

    {
        project: "Residential Development",
        location: "Shah Alam",
        type: "Fill Soil",
        quantity: 500,
        description: "Suitable for general filling works."
    },

    {
        project: "Road Construction Project",
        location: "Klang",
        type: "Sandy Soil",
        quantity: 300,
        description: "Excavated sandy soil available."
    },

    {
        project: "Commercial Building",
        location: "Subang Jaya",
        type: "Clay",
        quantity: 200,
        description: "Clay soil from excavation works."
    }

];

// Display listings

function displaySoil(listings) {

    const results = document.getElementById("soilResults");

    results.innerHTML = "";

    if (listings.length === 0) {
        results.innerHTML = "<p>No matching soil found.</p>";
        return;
    }

    listings.forEach(function(soil) {

        results.innerHTML += `

            <div class="soil-card">

                <span class="tag">${soil.type}</span>

                <h3>${soil.project}</h3>

                <p><strong>Location:</strong> ${soil.location}</p>

                <p><strong>Quantity:</strong> ${soil.quantity} tonnes</p>

                <p>${soil.description}</p>

            </div>

        `;

    });

}

// Search soil

function searchSoil() {

    const location =
        document.getElementById("searchLocation")
        .value.toLowerCase();

    const type =
        document.getElementById("searchType").value;

    const quantity =
        Number(document.getElementById("searchQuantity").value) || 0;

    const filteredSoil = soilListings.filter(function(soil) {

        const locationMatch =
            soil.location.toLowerCase().includes(location);

        const typeMatch =
            type === "" || soil.type === type;

        const quantityMatch =
            soil.quantity >= quantity;

        return locationMatch && typeMatch && quantityMatch;

    });

    displaySoil(filteredSoil);

}

// Show all listings

function showAllSoil() {

    document.getElementById("searchLocation").value = "";
    document.getElementById("searchType").value = "";
    document.getElementById("searchQuantity").value = "";

    displaySoil(soilListings);

}

// Add new listing

document.getElementById("soilForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const newSoil = {

        project: document.getElementById("projectName").value,

        location: document.getElementById("location").value,

        type: document.getElementById("soilType").value,

        quantity: Number(document.getElementById("quantity").value),

        description: document.getElementById("description").value

    };

    soilListings.push(newSoil);

    // Save data in browser

    localStorage.setItem(
        "soilListings",
        JSON.stringify(soilListings)
    );

    displaySoil(soilListings);

    alert("Soil listing successfully added!");

    // Reset form

    document.getElementById("soilForm").reset();

});

// Display listings when website opens

displaySoil(soilListings);