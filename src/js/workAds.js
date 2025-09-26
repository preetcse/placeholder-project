// Prevent multiple executions
if (typeof window.workAdsLoaded === 'undefined') {
    window.workAdsLoaded = true;
    
    const workRoles = [
        "locksmith", "electrician", "land worker", "surveyor", "driver",
        "trucker", "lawyer", "DJ", "photographer", "cameraman", "bodyguard",
        "professional dancer", "oil man", "gardener", "pilot", "collector",
        "firefighter", "personal assistant", "singer"
    ];

    const constructionSiteLocations = {
        "1": "on Vespucci Boulevard",
        "2": "on Calais Avenue",
        "3": "in Pillbox Hill",
        "4": "in Mirror Park"
    };

    const formatSalary = (salary) => {
        if (!salary) return "Negotiable";
        const cleanPrice = salary.toString().toLowerCase().replace(/[^0-9km.]/g, '');
        let num;

        if (cleanPrice.includes('m')) {
            num = parseFloat(cleanPrice.replace('m', ''))
            if(isNaN(num)) return "Negotiable";
            const formattedNum = num % 1 === 0 ? num.toFixed(0) : num.toFixed(1);
            return `$${formattedNum} Million`;
        } else if (cleanPrice.includes('k')) {
            num = parseFloat(cleanPrice.replace('k', '')) * 1000;
            if(isNaN(num)) return "Negotiable";
            return `$${num.toLocaleString('en-US').replace(/,/g, '.')}`;
        } else {
            num = parseFloat(cleanPrice);
            if(isNaN(num)) return "Negotiable";
            return `$${num.toLocaleString('en-US').replace(/,/g, '.')}`;
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        const workAdsSection = document.getElementById('work-ads');
        if (!workAdsSection) return;

        // Get elements
        const roleInput = document.getElementById('work-role');
        const roleSuggestions = document.getElementById('work-role-suggestions');

        const updateAd = () => {
            const transactionType = document.querySelector('input[name="work-transaction"]:checked')?.value || 'Hiring';
            
            const role = roleInput.value.trim();
            const experience = document.getElementById('work-experience').value.trim();
            const site = document.getElementById('work-construction-site').value;
            const salary = document.getElementById('work-salary').value.trim();
            const isPerHour = document.getElementById('work-per-hour').checked;
            const isPerDay = document.getElementById('work-per-day').checked;
            const outputDiv = document.getElementById('work-output');

            if (!role) {
                outputDiv.innerHTML = `<div class="output-placeholder"><i class="fas fa-lightbulb"></i><p>Your work advertisement will appear here...</p></div>`;
                return;
            }

            let adText = `${transactionType}`;

            if (transactionType === "Hiring") {
                const article = ['a','e','i','o','u'].includes(role.charAt(0).toLowerCase()) ? ' an' : ' a';
                adText += `${article} ${role}`;
            } else { // Looking for a job
                 adText += ` as a ${role}`;
            }

            if (experience) {
                adText += ` with ${experience} years of experience`;
            }

            if (site && constructionSiteLocations[site]) {
                adText += ` at construction site №${site}, ${constructionSiteLocations[site]}`;
            }

            const formattedSal = formatSalary(salary);
            adText += `. Salary: ${formattedSal}`;

            if (isPerHour) {
                adText += " per hour";
            } else if (isPerDay) {
                adText += " per day";
            }
            
            if (!/\d$/.test(adText.trim()) && !adText.endsWith('.')) {
                adText += ".";
            }


            outputDiv.textContent = adText.replace(/\.\./g, '.').replace(/\s\./g, '.');
        };
        
        const showSuggestions = (filter = '') => {
            const value = filter.toLowerCase();
            roleSuggestions.innerHTML = '';
            const filtered = workRoles.filter(r => r.toLowerCase().includes(value));
            
            if (filtered.length > 0) {
                 filtered.forEach(r => {
                    const div = document.createElement('div');
                    div.textContent = r;
                    div.addEventListener('mousedown', () => {
                        roleInput.value = r;
                        roleSuggestions.style.display = 'none';
                        updateAd();
                    });
                    roleSuggestions.appendChild(div);
                });
                roleSuggestions.style.display = 'block';
            } else {
                 roleSuggestions.style.display = 'none';
            }
        };

        roleInput.addEventListener('focus', () => showSuggestions(roleInput.value));
        roleInput.addEventListener('input', () => showSuggestions(roleInput.value));
        roleInput.addEventListener('blur', () => setTimeout(() => { if(roleSuggestions) roleSuggestions.style.display = 'none' }, 150));


        // Event listeners for all form elements
        workAdsSection.querySelectorAll('input, select').forEach(el => {
            el.addEventListener('input', updateAd);
            el.addEventListener('change', updateAd);
        });
        
        document.getElementById('work-submit-btn')?.addEventListener('click', updateAd);

        document.getElementById('work-copy-btn')?.addEventListener('click', () => {
            const textToCopy = document.getElementById('work-output')?.textContent;
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
        
        const resetWorkForm = () => {
            const formContainer = document.getElementById('work-ads');
            if (!formContainer) return;

            formContainer.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => input.value = '');
            formContainer.querySelectorAll('input[type="checkbox"]').forEach(input => input.checked = false);
            formContainer.querySelectorAll('select').forEach(select => select.selectedIndex = 0);
            
            const defaultRadio = formContainer.querySelector('input[name="work-transaction"][value="Hiring"]');
            if (defaultRadio) defaultRadio.checked = true;

            if (typeof window.initializeActiveStateHandlers === 'function') {
                window.initializeActiveStateHandlers('#work-ads');
            }

            updateAd();
        };

        document.getElementById('work-reset-btn')?.addEventListener('click', resetWorkForm);

        updateAd(); // Initial call
    });
}
