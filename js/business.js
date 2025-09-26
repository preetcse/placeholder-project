// Prevent multiple executions
if (typeof window.businessLoaded === 'undefined') {
    window.businessLoaded = true;
    
    // Business names database for autocomplete
    // Combined and unique list of business names and categories for suggestions and validation
    const allBusinessNames = [
    "24/7 Store",
    "Ammunition Store",
    "ATM",
    "Bar",
    "Chip Tuning",
    "Car Wash",
    "Car Sharing",
    "Clothing Shop",
    "Cowshed",
    "Electric Charging Station",
    "Farm",
    "Fight Club",
    "Freight Train",
    "Gas Station",
    "Grand Elite Clothing Shop",
    "Hair Salon",
    "Jewellery Store",
    "Juice Shop",
    "Oil Well",
    "Parking",
    "Service Station",
    "State Object",
    "Tattoo Studio",
    "Warehouse",
    "Cabbage Plantation",
    "Pineapple Plantation",
    "Pumpkin Plantation",
    "Mandarin Plantation",
    "a private business",
    "family business",
].filter((value, index, self) => self.indexOf(value) === index); // Filter out duplicates

// Location database for autocomplete
const locationSuggestions = [
     "Vespucci Canals",
     "Vinewood Hills",
     "Rancho",
     "Sandy Shores",
     "Vanilla Unicorn Bar",
     "Richman",
     "Rockford Hills",
     "Paleto Bay",
     "Pillbox Hill",
     "West Vinewood",
     "Bahama Mamas",
     "Banham Canyon",
     "Cayo Perico Island",
     "ghetto",
     "Eclipse Tower",
     "Del Perro",
     "Downtown Vinewood",
     "El Burro Heights",
     "city",
     "near beach",
     "near beach market",
     "near stadium",
     "near fire station",
     "near train station",
     "near post office",
     "near airport",
     "near mall",
     "near Stock Exchange",
     "near Residential complex",
     "near Auto Salon",
     "near Fight Club",
     "near Hospital",
     "near Sandy Hospital",
     "near Diamond Bar",
     "near LifeInvader",
];


document.addEventListener('DOMContentLoaded', () => {
    // Get elements specific to the business ads form
    const businessForm = document.getElementById('businessForm');
    const businessNameInput = document.getElementById('business-name');
    const businessNameSuggestions = document.getElementById('business-name-suggestions');
    const businessLocationInput = document.getElementById('business-location');
    const businessLocationSuggestions = document.getElementById('business-location-suggestions');
    const businessPriceInput = document.getElementById('business-price');
    const businessOutput = document.getElementById('business-output');
    const submitBtn = document.getElementById('business-submit-btn');
    const copyBtn = document.getElementById('business-copy-btn');
    const plantationCategoryGroup = document.getElementById('plantation-category-group');
    const plantationCategoryInputs = document.querySelectorAll('input[name="plantation-category"]');
    const businessNumberInput = document.getElementById('business-number');
    const transactionTypeInputs = document.querySelectorAll('input[name="business-transaction"]');


    // Function to validate business name against the combined list
    function validateBusinessName(name) {
        const lowerCaseName = name.toLowerCase();
         if (lowerCaseName.includes("drug lab")) {
            return "Burger Shop"; // Redirect "drug lab" to a valid business
        }
        // Find an exact match (case-insensitive) in the combined list
        const foundMatch = allBusinessNames.find(item => lowerCaseName === item.toLowerCase());
        if (foundMatch) {
            return foundMatch;
        }
        return null; // Return null if no valid match is found
    }

    // Function to convert and format price (Revised)
    function convertPrice(priceString) {
        if (!priceString) return "Negotiable";

        const cleanPrice = priceString.toString().toLowerCase().replace(/[^0-9km.]/g, '');
        let num = parseFloat(cleanPrice);

        if (isNaN(num)) {
            return "Negotiable";
        }

        if (cleanPrice.includes('m')) {
            // Format millions: no decimal if whole number, one decimal otherwise, use space before Million
            const formattedNum = num % 1 === 0 ? num.toFixed(0) : num.toFixed(1);
             return `${formattedNum} Million`; // Return just the value and text
        } else if (cleanPrice.includes('k')) {
             // Format thousands with period as decimal separator
             return (num * 1000).toLocaleString('en-US', { minimumFractionDigits: 0 }).replace(/,/g, '.');
        } else {
             // Format raw number with period as decimal separator
             return num.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace(/,/g, '.');
        }
    }


    // Function to update the business ad preview (Revised period and dollar sign logic)
    function updateBusinessAd() {
        const transactionType = document.querySelector('input[name="business-transaction"]:checked')?.value || 'Selling';
        const businessName = businessNameInput?.value.trim() || '';
        const businessNumber = businessNumberInput?.value.trim() || '';
        const location = businessLocationInput?.value.trim() || '';
        const price = businessPriceInput?.value.trim() || '';
        let plantationCategory = '';

        // Check if plantation category group is visible and get the selected value
        if (plantationCategoryGroup && plantationCategoryGroup.style.display !== 'none') {
            plantationCategory = document.querySelector('input[name="plantation-category"]:checked')?.value || '';
        }

        const validatedName = validateBusinessName(businessName);

        // Only update if a valid business name is entered
        if (!validatedName) {
            if (businessOutput) businessOutput.textContent = "Complete the form to generate your transaction description"; // Reset output if invalid
            return;
        }

        let adText = `${transactionType}`; // Start with transaction type

        // Construct the business name part of the ad
        if (plantationCategory && validatedName.toLowerCase().includes('plantation')) {
            // If a plantation category is selected and the business is a plantation
            let plantationName = `${plantationCategory} ${validatedName.replace(/ business/i, '').replace(/\d+-bed /i, '').trim()}`;
            // Always append 'business' if not present
            plantationName = plantationName.replace(/ business$/i, '');
            plantationName += ' business';
            adText += ` ${plantationName}`;
        } else if (businessNumber) {
            // If a business number is entered
            adText += ` ${validatedName.replace(/ business/i, '').trim()} №${businessNumber}`;
        } else if (validatedName.toLowerCase().includes('business') && !validatedName.toLowerCase().includes('plantation business')) {
             // If the validated name already includes "business" (and is not a plantation business)
             adText += ` ${validatedName.trim()}`;
        }
        else {
             // Default format: BusinessName (without "business" suffix)
             // For plantation businesses, always append 'business' if not present
             if (validatedName.toLowerCase().includes('plantation')) {
                 let plantationName = validatedName.trim();
                 // Remove trailing 'business' if present, then append
                 plantationName = plantationName.replace(/ business$/i, '');
                 plantationName += ' business';
                 adText += ` ${plantationName}`;
             } else {
                 // If not already ending with 'business', append it
                 let baseName = validatedName.replace(/ business/i, '').trim();
                 if (!baseName.toLowerCase().endsWith('business')) {
                     baseName += ' business';
                 }
                 adText += ` ${baseName}`;
             }
        }


        if (location) {
            adText += ` in ${location}`;
        }

        const formattedPriceValue = convertPrice(price); // Get the formatted value (e.g., "4.000", "4 Million", "Negotiable")

        // Append the price part, including the dollar sign and the formatted value
        if (formattedPriceValue !== "Negotiable") {
             adText += `. ${transactionType === 'Buying' ? 'Budget' : 'Price'}: $${formattedPriceValue}`;
        } else {
             adText += `. ${transactionType === 'Buying' ? 'Budget' : 'Price'}: ${formattedPriceValue}`;
        }

        // Add a final period only if the formatted price value is "Negotiable" or includes "Million"
        const priceEndsWithNegotiableOrMillion = formattedPriceValue.includes('Negotiable') || formattedPriceValue.includes('Million');
        if (priceEndsWithNegotiableOrMillion) {
            adText += '.';
        }
         // If it's a numerical price like "4.000", no period is added here.


            // --- IMPROVED: Ensure output always ends with a period for all cases except raw numbers ---
            // (e.g., "Price: $4.000" should not have a period, but "Price: Negotiable" and "Price: $4 Million" should)
            function ensureFinalPeriod(text) {
                if (text.trim().endsWith('.')) return text.trim();
                if (/\d$/.test(text.trim()) && !text.includes('Million') && !text.includes('Negotiable')) return text.trim();
                return text.trim() + '.';
            }
            if (businessOutput) {
                businessOutput.textContent = ensureFinalPeriod(adText.trim());
            }
    }

    // Event listeners for form changes to update the ad preview
    // Relying on the form's input and change events to capture changes from all fields
    if (businessForm) {
        businessForm.addEventListener('input', updateBusinessAd);
        businessForm.addEventListener('change', updateBusinessAd); // For radio/checkbox changes
    }

    // Autocomplete for Business Name
    if (businessNameInput && businessNameSuggestions) {
        businessNameInput.addEventListener('input', () => {
            const value = businessNameInput.value.toLowerCase();
            businessNameSuggestions.innerHTML = '';
            if (value) {
                // Use the combined unique list for suggestions
                const filtered = allBusinessNames.filter(name => name.toLowerCase().includes(value));

                if (filtered.length > 0) {
                    const list = document.createElement('ul');
                    list.className = 'suggestion-list';
                    filtered.forEach(name => {
                        const div = document.createElement('div');
                        div.classList.add('suggestion-item');
                        div.textContent = name;
                        // Use mousedown instead of click for immediate update before blur
                        div.addEventListener('mousedown', (e) => {
                            e.preventDefault(); // Prevent blur from hiding suggestions immediately
                            businessNameInput.value = name;
                            businessNameSuggestions.style.display = 'none';
                            // Show plantation category if the selected business is Plantation or related
                            if (name.toLowerCase().includes("plantation")) {
                                if (plantationCategoryGroup) plantationCategoryGroup.style.display = 'block';
                            } else {
                                if (plantationCategoryGroup) plantationCategoryGroup.style.display = 'none';
                                // Reset plantation category radio buttons if hidden
                                plantationCategoryInputs.forEach(input => input.checked = false);
                            }
                            updateBusinessAd(); // Update ad on selection
                        });
                        list.appendChild(div);
                    });
                    businessNameSuggestions.appendChild(list);
                    businessNameSuggestions.style.display = 'block';
                } else {
                    businessNameSuggestions.style.display = 'none';
                     if (plantationCategoryGroup) plantationCategoryGroup.style.display = 'none'; // Hide if no suggestions match
                     plantationCategoryInputs.forEach(input => input.checked = false); // Reset plantation category radio buttons
                     updateBusinessAd(); // Update ad even if no suggestions
                }
            } else {
                businessNameSuggestions.style.display = 'none';
                 if (plantationCategoryGroup) plantationCategoryGroup.style.display = 'none'; // Hide if input is cleared
                 plantationCategoryInputs.forEach(input => input.checked = false); // Reset plantation category radio buttons
                 updateBusinessAd(); // Update ad when input is cleared
            }
        });

         // Hide suggestions when input loses focus (with a slight delay)
        businessNameInput.addEventListener('blur', () => {
            setTimeout(() => {
                if (businessNameSuggestions) businessNameSuggestions.style.display = 'none';
            }, 100); // Delay to allow mousedown on suggestion
        });
    }


    // Autocomplete for Location
    if (businessLocationInput && businessLocationSuggestions) {
        businessLocationInput.addEventListener('input', () => {
            const query = businessLocationInput.value.toLowerCase();
            const suggestions = locationSuggestions.filter(loc => loc.toLowerCase().includes(query));
            const suggestionBox = document.getElementById('business-location-suggestions');
            suggestionBox.innerHTML = '';

            if (query && suggestions.length > 0) {
                const list = document.createElement('ul');
                list.className = 'suggestion-list';
                suggestions.forEach(suggestion => {
                    const div = document.createElement('div');
                    div.classList.add('suggestion-item');
                    div.textContent = suggestion; // Display full suggestion
                    // Use mousedown instead of click for immediate update before blur
                    div.addEventListener('mousedown', (e) => {
                        e.preventDefault(); // Prevent blur from hiding suggestions immediately
                        businessLocationInput.value = suggestion; // Set input value to full suggestion
                        suggestionBox.innerHTML = ''; // Clear suggestions
                        suggestionBox.style.display = 'none'; // Hide suggestion box
                        updateBusinessAd(); // Update ad on selection
                    });
                    list.appendChild(div);
                });
                suggestionBox.appendChild(list);
                suggestionBox.style.display = 'block';
            } else {
                suggestionBox.style.display = 'none';
                 updateBusinessAd(); // Update ad even if no suggestions
            }
        });

         // Hide suggestions when input loses focus (with a slight delay)
        businessLocationInput.addEventListener('blur', () => {
            setTimeout(() => {
                if (businessLocationSuggestions) businessLocationSuggestions.style.display = 'none';
            }, 100); // Delay to allow mousedown on suggestion
        });
    }


    // Handle Generate Ad button click (optional, as ad updates automatically)
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent form submission
            updateBusinessAd(); // Ensure ad is updated on click
        });
    }


    // Handle Copy button click
    if (copyBtn) {
        copyBtn.addEventListener('click', (e) => { // Added event parameter
            e.preventDefault(); // Prevent default button behavior

            const output = businessOutput ? businessOutput.textContent : '';
             // Check for minimum valid output before allowing copy
             const minLength = "Selling . Price: Negotiable.".length; // Approximate minimum valid output length
             if (!output || output === 'Complete the form to generate your transaction description' || output.trim().length <= minLength) {
                 if (typeof showErrorPopup === 'function') {
                    showErrorPopup('Generate an ad first!');
                 } else {
                     alert('Generate an ad first!');
                 }
                 return;
             }


            navigator.clipboard.writeText(output).then(() => {
                if (typeof showNotification === 'function') {
                    showNotification('Copied to clipboard!');
                } else {
                    console.log('Copied to clipboard:', output); // Fallback
                }
            }).catch(err => {
                if (typeof showErrorPopup === 'function') {
                   showErrorPopup('Failed to copy to clipboard: ' + err);
                } else {
                    alert('Failed to copy to clipboard: ' + err); // Fallback
                }
            });
        });
    }

    // Handle Reset button click
    const businessResetBtn = document.getElementById('business-reset-btn');
    if (businessResetBtn) {
        businessResetBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default button behavior

            // Reset form state
            if(businessForm) businessForm.reset();
            if(businessOutput) businessOutput.textContent = 'Complete the form to generate your transaction description';
            if(plantationCategoryGroup) plantationCategoryGroup.style.display = 'none';

            // Manually reset radio buttons and their active class for transaction type
            document.querySelectorAll('input[name="business-transaction"]').forEach(radio => {
                const label = radio.closest('label');
                if (radio.value === 'Selling') { // Assuming 'Selling' is the default checked
                    radio.checked = true;
                    if(label) label.classList.add('active'); // Re-add active class to default
                } else {
                    radio.checked = false;
                    if(label) label.classList.remove('active');
                }
            });

            // Manually reset radio buttons for plantation category
            plantationCategoryInputs.forEach(radio => {
                radio.checked = false;
            });

            // Manually clear input fields and trigger input event to update preview
            if(businessNameInput) {
                businessNameInput.value = '';
                businessNameInput.dispatchEvent(new Event('input'));
            }
            if(businessNumberInput) {
                businessNumberInput.value = '';
                businessNumberInput.dispatchEvent(new Event('input'));
            }
            if(businessLocationInput) {
                businessLocationInput.value = '';
                businessLocationInput.dispatchEvent(new Event('input'));
            }
            if(businessPriceInput) {
                businessPriceInput.value = '';
                businessPriceInput.dispatchEvent(new Event('input'));
            }

            // Remove active classes from checkbox labels
            document.querySelectorAll('.checkbox-button-label').forEach(label => {
                label.classList.remove('active');
            });

            // Hide suggestions
            if(businessNameSuggestions) businessNameSuggestions.style.display = 'none';
            if(businessLocationSuggestions) businessLocationSuggestions.style.display = 'none';
        });
    }

    // Add a global click listener to hide suggestions when clicking outside
     document.addEventListener('click', (e) => {
        // Check if the click target is not a suggestion item, not a suggestion box, and not the input field itself
        // Use closest() for robustness
        if (!e.target.closest('.suggestion-item') && !e.target.closest('.suggestion-box') && e.target !== businessNameInput && e.target !== businessLocationInput) {
             document.querySelectorAll('.suggestion-box').forEach(s => {
                s.style.display = 'none';
            });
        }
    });


    // Initial ad generation on page load
    updateBusinessAd();
});

}