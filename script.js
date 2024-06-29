document.addEventListener('DOMContentLoaded', () => {
    const countriesContainer = document.getElementById('countries-container');
    const searchInput = document.getElementById('search');

    const fetchCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const countries = await response.json();
            displayCountries(countries);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const displayCountries = (countries) => {
        countriesContainer.innerHTML = '';
        countries.forEach(country => {
            console.log(country.languages);
            const countryCard = document.createElement('div');
            countryCard.classList.add('country-card');
            const languageshtml = Object.values(country.languages).join(', ') + '.';
            countryCard.innerHTML = `
            <a href="${country.maps.googleMaps}">
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
                <h2>${country.name.common}</h2>
                <p><strong>Capital:</strong> ${country.capital}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Languages:</strong>
            </a>
            `+ languageshtml;
            
            countriesContainer.appendChild(countryCard);
        });
    };

    const filterCountries = async (termtosearch) => {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${termtosearch}`);
            const countries = await response.json();
            displayCountries(countries);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    searchInput.addEventListener('input', (e) => {
        const termtosearch = e.target.value;
        if (termtosearch.length > 0) {
            filterCountries(termtosearch);
        } else {
            fetchCountries();
        }
    });

    fetchCountries();
});
