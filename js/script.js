    document.addEventListener('DOMContentLoaded', async function () {
        const response = await fetch('https://restcountries.com/v3/all');
        if (response.ok) {
        const countries = await response.json();
        const countriesList = document.getElementById('countries-list');
        countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    
        countries.forEach(country => {
            const countryName = country.name.common;
            const countryFlag = country.flags[0];
    
            let template = `
            <div class='country-container'>
                <img src='${countryFlag}' alt='${country.altSpellings[1]}'/>
                <p class='name'>${countryName}</p>
            </div>
            `;
    
            const countryContainer = document.createElement('div');
            countryContainer.innerHTML = template;
    
            const countryImg = countryContainer.querySelector('img');
    
            countryImg.addEventListener('click', () => {
            showCountryInfo(country);
            });
    
            countriesList.appendChild(countryContainer);
        });
    
        console.log(countries);
        } else {
        console.error(`HTTP error! Status: ${response.status}`);
        }
    });
    
    function showCountryInfo(country) {
        const existingModal = document.querySelector('.countryInfo-container');
        if (existingModal) {
          existingModal.remove();
        }
      
        const container = document.createElement('div');
        container.classList.add('countryInfo-container', 'modal');
      
        const countryInfo = document.createElement('div');
        countryInfo.innerHTML = `
          <div class = 'info-container'>
            <img src='${country.flags[0]}' alt='${country.altSpellings[1]}'/>
            <div class='info'
              <h2><span>${country.name.common}</span></h2>
              <p>Capital: ${country.capital}</p>
              <p>Population: ${country.population}</p>
              <p>Side of the road: ${country.car.side}</p>
              <button class='close-button' onclick='closeCountryInfo()'>Close</button>
            </div>
          </div>
        `;
      
        container.appendChild(countryInfo);
        document.body.appendChild(container);
      }
      
    
    function closeCountryInfo() {
        const modal = document.querySelector('.countryInfo-container');
        if (modal) {
        modal.remove();
        }
    }
    