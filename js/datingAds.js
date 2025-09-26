// Prevent multiple executions
if (typeof window.datingAdsLoaded === 'undefined') {
    window.datingAdsLoaded = true;
    
    const lookingForOptions = [
        "a specific person", "a wife", "a husband", "a girlfriend", 
        "a boyfriend", "a date", "a family", "family members", 
        "family friends", "friends", "a friend"
    ];

    document.addEventListener('DOMContentLoaded', () => {
        const lookingForSelect = document.getElementById('dating-looking-for');
        if (!lookingForSelect) return;

        const personNameGroup = document.getElementById('dating-person-name-group');
        const personNameInput = document.getElementById('dating-person-name');
        const submitBtn = document.getElementById('dating-submit-btn');
        const copyBtn = document.getElementById('dating-copy-btn');
        const resetBtn = document.getElementById('dating-reset-btn');
        const outputDiv = document.getElementById('dating-output');

        // Populate dropdown
        lookingForSelect.innerHTML = lookingForOptions.map(optionText => {
            const capitalized = optionText.charAt(0).toUpperCase() + optionText.slice(1);
            return `<option value="${optionText}">${capitalized}</option>`;
        }).join('');

        const updateAd = () => {
            const selection = lookingForSelect.value;
            let outputText = '';

            if (selection === 'a specific person') {
                personNameGroup.style.display = 'block';
                const personName = personNameInput.value.trim();
                // Generate ad text only if a name is entered, otherwise wait.
                outputText = personName ? `Looking for ${personName}.` : '';
            } else {
                personNameGroup.style.display = 'none';
                personNameInput.value = '';
                outputText = `Looking for ${selection}.`;
            }

            if (outputText) {
                 outputDiv.textContent = outputText;
            } else {
                outputDiv.innerHTML = `<div class="output-placeholder"><i class="fas fa-lightbulb"></i><p>Your dating advertisement will appear here...</p></div>`;
            }
        };

        // Event Listeners
        lookingForSelect.addEventListener('change', updateAd);
        personNameInput.addEventListener('input', updateAd);
        submitBtn.addEventListener('click', updateAd);

        copyBtn.addEventListener('click', () => {
            const textToCopy = outputDiv.textContent;
            if (textToCopy && !textToCopy.includes('will appear here')) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    if(typeof showNotification === 'function') showNotification('Copied to clipboard!');
                }).catch(err => {
                    if(typeof showErrorPopup === 'function') showErrorPopup('Failed to copy: ' + err);
                });
            } else {
                if(typeof showErrorPopup === 'function') showErrorPopup('Generate an ad first!');
            }
        });

        resetBtn.addEventListener('click', () => {
            lookingForSelect.selectedIndex = 0;
            personNameInput.value = '';
            personNameGroup.style.display = 'none';
            updateAd();
        });
        
        // Initial call
        updateAd();
    });
}