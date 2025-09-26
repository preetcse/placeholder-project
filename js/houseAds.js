// Prevent multiple executions
if (typeof window.houseAdsLoaded === 'undefined') {
    window.houseAdsLoaded = true;
    
    // Locations for suggestion
    const locationList = [
      "in Vespucci Canals", "in Vinewood Hills", "in Mirror Park", "in Rancho",
      "in Sandy Shores", "in Richman", "in Rockford Hills", "in Paleto Bay",
      "in Pillbox Hill", "in West Vinewood", "in Bahama Mamas", "in Banham Canyon",
      "in Cayo Perico Island", "in ghetto", "in Eclipse Tower", "in Del Perro",
      "in Downtown Vinewood", "in El Burro Heights", "in city", "near beach",
      "near beach market", "near stadium", "near fire station", "near train station",
      "near post office", "near airport", "near mall", "near (the) Casino"
    ];

    const formatPrice = (price, action, transaction, duration) => {
        let label = '';
        if (action === 'rent') {
            label = transaction.includes('Looking') ? 'Budget' : 'Rent';
        } else {
            label = transaction.includes('Buying') ? 'Budget' : 'Price';
        }

        if (!price) {
            return `${label}: Negotiable.`;
        }

        let formattedPrice = '';
        const cleanPrice = price.toString().toLowerCase().replace(/[^0-9km.]/g, '');
        
        if (cleanPrice.includes('m')) {
            const num = parseFloat(cleanPrice.replace('m', ''));
            if (isNaN(num)) return `${label}: Negotiable.`;
            formattedPrice = `$${num.toLocaleString(undefined, {maximumFractionDigits: 1})} Million`;
        } else if (cleanPrice.includes('k')) {
            const num = parseFloat(cleanPrice.replace('k', '')) * 1000;
            if (isNaN(num)) return `${label}: Negotiable.`;
            formattedPrice = `$${num.toLocaleString('en-US').replace(/,/g, ".")}`;
        } else {
            const num = parseFloat(cleanPrice);
            if (isNaN(num)) return `${label}: Negotiable.`;
            formattedPrice = `$${num.toLocaleString('en-US').replace(/,/g, ".")}`;
        }

        let result = `${label}: ${formattedPrice}`;
        if (action === 'rent' && duration) {
            result += ` ${duration}`;
        }
        
        if (!/\d$/.test(result.trim())) {
            result += '.';
        }

        return result;
    };


    document.addEventListener('DOMContentLoaded', () => {
        const houseAdsSection = document.getElementById('house-ads');
        if (!houseAdsSection) return;

        const allInputs = houseAdsSection.querySelectorAll('input, select');
        allInputs.forEach(input => {
            input.addEventListener('change', generateHouseAd);
            if(input.type === 'text' || input.type === 'number') {
                input.addEventListener('input', generateHouseAd);
            }
        });

        document.getElementById('house-submit-btn')?.addEventListener('click', generateHouseAd);
        document.getElementById('house-copy-btn')?.addEventListener('click', copyHouseAd);
        document.getElementById('house-reset-btn')?.addEventListener('click', resetHouseForm);

        setupEventListeners();
        updateTransactionTypes(); 
        generateHouseAd(); 
    });

    function setupEventListeners() {
        document.querySelectorAll('input[name="house-action"]').forEach(radio => {
            radio.addEventListener('change', updateTransactionTypes);
        });

        document.getElementById('second-property-toggle')?.addEventListener('change', (e) => {
            const secondFields = document.getElementById('second-property-fields');
            if (secondFields) {
                secondFields.style.display = e.target.checked ? 'block' : 'none';
            }
            generateHouseAd();
        });
        
        const locationInput = document.getElementById('location');
        const locationSuggestions = document.getElementById('location-suggestions');
        if (locationInput && locationSuggestions) {
            locationInput.addEventListener('input', () => {
                const inputText = locationInput.value.toLowerCase();
                locationSuggestions.innerHTML = "";
                if (inputText) {
                    const matches = locationList.filter(loc => loc.toLowerCase().includes(inputText));
                    if (matches.length > 0) {
                        matches.forEach(loc => {
                            const div = document.createElement('div');
                            div.textContent = loc;
                            div.addEventListener('click', () => {
                                locationInput.value = loc;
                                locationSuggestions.style.display = 'none';
                                generateHouseAd();
                            });
                            locationSuggestions.appendChild(div);
                        });
                        locationSuggestions.style.display = 'block';
                    } else {
                        locationSuggestions.style.display = 'none';
                    }
                } else {
                     locationSuggestions.style.display = 'none';
                }
            });
            locationInput.addEventListener('blur', () => setTimeout(() => locationSuggestions.style.display = 'none', 150));
        }
    }
    
    function updateTransactionTypes() {
        const action = document.querySelector('input[name="house-action"]:checked')?.value || 'sell';
        const group = document.getElementById('house-transaction-type-group');
        const priceLabel = document.getElementById('house-price-label');
        const rentDurationInput = document.getElementById('house-rent-duration');
        if (!group || !priceLabel || !rentDurationInput) return;

        let types = [];
        if (action === 'sell') {
            types = ['Selling', 'Buying'];
            priceLabel.innerHTML = `<i class="fas fa-dollar-sign"></i> Price/Budget:`;
            rentDurationInput.style.display = 'none';
        } else {
            types = ['Renting out', 'Looking to rent'];
            priceLabel.innerHTML = `<i class="fas fa-dollar-sign"></i> Rent/Budget:`;
            rentDurationInput.style.display = 'block';
        }
        
        group.innerHTML = types.map((type, index) => `
            <label class="transaction-type-label">
                <input type="radio" name="house-transaction" value="${type}" ${index === 0 ? 'checked' : ''} class="d-none">
                <div class="transaction-type-button d-flex align-items-center gap-2">
                    <i class="fas ${type === 'Buying' || type === 'Looking to rent' ? 'fa-credit-card' : 'fa-dollar-sign'}"></i> ${type}
                </div>
            </label>
        `).join('');

        // Re-attach event listeners
        group.querySelectorAll('input[name="house-transaction"]').forEach(radio => {
            radio.addEventListener('change', generateHouseAd);
        });
        
        // This is handled globally by main.js now, but kept for immediate feedback
        if (typeof window.initializeActiveStateHandlers === 'function') {
             window.initializeActiveStateHandlers('#house-transaction-type-group');
        }
        
        generateHouseAd();
    }
    
    function getPropertyDetails(num) {
        const type = document.querySelector(`input[name="property-type-${num}"]:checked`)?.value || 'house';
        const number = document.getElementById(`house-number-${num}`)?.value.trim() || '';
        return { type, number };
    }

    function generateHouseAd() {
        const transaction = document.querySelector('input[name="house-transaction"]:checked')?.value || 'Selling';
        const action = document.querySelector('input[name="house-action"]:checked')?.value || 'sell';
        const isTwo = document.getElementById('second-property-toggle')?.checked;
        
        const p1 = getPropertyDetails(1);
        const p2 = isTwo ? getPropertyDetails(2) : null;

        let adText = transaction;
        
        if (isTwo && p2) {
            const bothHouses = p1.type === 'house' && p2.type === 'house';
            const bothApts = p1.type === 'apartment' && p2.type === 'apartment';
            if (bothHouses) {
                adText += ` houses${p1.number ? ` №${p1.number}`: ''}${p2.number ? ` and №${p2.number}` : ''}`;
            } else if (bothApts) {
                 adText += ` apartments${p1.number ? ` №${p1.number}`: ''}${p2.number ? ` and №${p2.number}` : ''}`;
            } else {
                 adText += ` a ${p1.type}${p1.number ? ` №${p1.number}`: ''} and an ${p2.type}${p2.number ? ` №${p2.number}`: ''}`;
            }
        } else {
            const typeName = p1.type === 'penthouse' ? 'Casino penthouse' : p1.type;
            const article = p1.type === 'apartment' ? 'an' : 'a';
            adText += p1.number ? ` ${typeName} №${p1.number}` : ` ${article} ${typeName}`;
        }

        // Features
        const features = [];
        const isPlural = isTwo;
        if (document.getElementById('garden')?.checked) features.push(isPlural ? "gardens" : "a garden");
        
        const gs = Array.from(document.querySelectorAll('[id^="garage-"]:checked')).map(el => el.id.replace('garage-', '') + ' g.s.');
        if (gs.length > 0) features.push(gs.join(', '));

        const wh = Array.from(document.querySelectorAll('[id^="warehouse-"]:checked')).map(el => el.id.replace('warehouse-', '') + ' w.h.');
        if (wh.length > 0) features.push(wh.join(', '));

        if (document.getElementById('custom-interior')?.checked) features.push("custom interior");
        if (document.getElementById('house-insurance')?.checked) features.push("insurance");
        
        if (document.getElementById('helipad')?.checked) features.push(isPlural ? "helipads" : "helipad");
        if (document.getElementById('tennis-court')?.checked) features.push(isPlural ? "tennis courts" : "tennis court");
        if (document.getElementById('driveway')?.checked) features.push(isPlural ? "long driveways" : "long driveway");
        if (document.getElementById('swimming-pool')?.checked) features.push(isPlural ? "swimming pools" : "swimming pool");
        
        const view = document.getElementById('view')?.value;
        if (view) features.push(view);

        if(features.length > 0) {
            adText += " with " + (features.length === 1 ? features[0] : features.slice(0, -1).join(', ') + ' and ' + features.slice(-1));
        }

        const location = document.getElementById('location')?.value.trim();
        if (location) {
            adText += ` ${location}`;
        }
        
        adText = adText.replace(/g\.s\.,/g, 'g.s.,').replace(/w\.h\.,/g, 'w.h.,');

        const price = document.getElementById('house-price')?.value;
        const duration = document.getElementById('house-rent-duration')?.value;
        adText += `. ${formatPrice(price, action, transaction, duration)}`;

        const outputDiv = document.getElementById('house-output');
        if (outputDiv) {
             outputDiv.textContent = adText.replace(/\s\s+/g, ' ').trim();
        }
    }

    function copyHouseAd() {
        const outputText = document.getElementById('house-output')?.textContent;
        if (!outputText || outputText.includes('will appear here')) {
            showErrorPopup("Nothing to copy! Please generate an ad first.");
            return;
        }
        navigator.clipboard.writeText(outputText).then(() => {
            showNotification('Copied to clipboard!');
        }).catch(err => {
            showErrorPopup("Error copying text: " + err);
        });
    }

    function resetHouseForm() {
        const formContainer = document.getElementById('house-ads');
        if (!formContainer) return;
        
        formContainer.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => input.value = '');
        formContainer.querySelectorAll('input[type="checkbox"]').forEach(input => input.checked = false);
        formContainer.querySelectorAll('select').forEach(select => select.selectedIndex = 0);
        
        const defaultAction = formContainer.querySelector('input[name="house-action"][value="sell"]');
        if (defaultAction) defaultAction.checked = true;
        const defaultProp1 = formContainer.querySelector('input[name="property-type-1"][value="house"]');
        if (defaultProp1) defaultProp1.checked = true;
         const defaultProp2 = formContainer.querySelector('input[name="property-type-2"][value="house"]');
        if (defaultProp2) defaultProp2.checked = true;

        const secondFields = document.getElementById('second-property-fields');
        if(secondFields) secondFields.style.display = 'none';
        
        updateTransactionTypes();
        generateHouseAd();
         const outputDiv = document.getElementById('house-output');
        if (outputDiv) {
            outputDiv.innerHTML = `<div class="output-placeholder"><i class="fas fa-lightbulb"></i><p>Your house advertisement will appear here...</p></div>`;
        }
    }
}
