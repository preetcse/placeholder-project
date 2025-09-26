// Prevent multiple executions
if (typeof window.mixedAdsLoaded === 'undefined') {
    window.mixedAdsLoaded = true;

    // Combined list of items and clothing for autocomplete
    const mixedItemsList = [
        // Clothing Items (from clothing.js)
        "Abibas Keezy Foam shoes", "Abibas Marquee Boost Lows shoes", "Abibas pants", "Abibas Pezy Boost 700 V3 Alvah shoes", "Abibas Pro Bounce 2019 Lows shoes", "Abibas sport pants", "Abibas suit", "Abibas sweatpants", "accessory", "Acic Gel Kayano sneakers", "Air Bior pullover sweater", "AK-47 chain", "Alaska winter jacket", "Alastor McQueen oversized shoes", "alien with neon eyes mask", "Alvin Lein backpack skin", "Alvin Lein pants", "Alvin Lein set", "Alvin Lein T-shirt", "anime mask", "Anti Social Club hoodie", "bitkin handbag skin", "Arm Pangel jacket", "assassins mask", "backpack skin", "backpack with a cat skin", "bandana mask", "Bans sneakers", "baseball mask", "bear backpack skin", "belted pants", "Bersace set", "Bersace trousers", "Bigness mask", "biohazard backpack skin", "Bior backpack skin", "Bior pants", "black voron shoulder accessory", "black jacket with yellow trim", "blob longsleeve top", "Bomber jacket with glowing elements", "boxing gloves", "boxing helmet", "bracelet", "branded CDG T-shirt", "branded insulated hoodie", "branded longsleeve", "branded Molo T-shirt", "branded monochrome T-shirt", "branded pants with bunny detail", "branded T-shirt", "branded headband", "bright hoodie", "bright StarWars hoodie", "bright StarWars set", "bright StarWars trousers", "bright trousers", "CAP T-shirt", "carnival mask", "Casual neon helmet", "Casual neon torso", "cat mask", "CDG branded T-shirt", "chain", "chain around the body accessory", "chain lost treasure neon accessory", "chain with spikes backpack skin", "chain with star pendant", "checkered Pans sneakers", "Christmas tree mask", "classic denim jacket", "classic Lui Vi backpack skin", "clown chain", "clown mask", "cloud backpack skin", "collection 2022 T-shirt", "colored pants", "cow backpack skin", "cowgirl hat", "Craft Munk mask", "cropp collection T-shirt", "cross backpack skin", "Cupids crown", "Curry Flow 8 sneakers", "cute bear backpack skin", "deer antler accessory", "deer antlers with a red nose accessory", "demon backpack skin", "demon mask", "Denim jacket", "Lui Vi desert scarf mask", "desert scarf mask", "devil mask", "Domo backpack skin", "double pockets backpack skin", "duck backpack skin", "duffel bag skin", "earrings", "eagle necklace", "earphones with a heart", "el primo corazon krawl on the shoulder accessory", "emoji mask", "Essential brand suit top", "Essential branded pants", "evil mask", "exclusive T-shirt", "exotic mask", "fancy bear backpack skin.", "fashionista scarf mask", "flying bear on the shoulder accessory", "fluorescent cat ears", "fox mask", "fur coat without a hood", "G backpack skin", "glasses with glowing snow", "gloves", "glowing face scarf mask", "glowing nails", "gold Kolex watch with black dial", "gold Kolex watch with rainbow bezels", "gothic hoodie with neon eyes", "silver Kolex watch with rainbow bezels", "gorilla mask", "Grand chain", "Grada set", "Grand RP collection hoodie", "Grand RP collection pants", "Grand RP collection set", "Grand RP collection T-shirt", "Ground Mordan 4 Retro Laser 30th shoes", "Gussi shorts", "half-glowing pants", "hamster on the shoulder accessory", "handbag backpack skin", "handkerchief mask", "hearts Pride glasses", "heart backpack skin", "heart with wings backpack skin", "Hilipp Lein T-shirt", "hippy bear backpack skin", "human backpack skin", "insulated personal pants", "Jacket", "Jacket with a hood", "jacket with blue luminous trim", "jacket with green luminous trim", "jacket with pink luminous trim", "jacket with red luminous trim", "jacket with T-shirt", "jacket with turquoise luminous trim", "jacket with white luminous trim", "Jason blue mask", "jolly bear backpack skin", "Juice Wrld Vlone T-shirt", "Kasio G-Shock watch", "Kazer headphones", "Mickeys Christmas backpack skin", "modern heeled boots", "Keezy Boost shoes", "Khampion pants", "Khampion set", "Khampion T-shirt", "Khanel pants", "Khanel set", "Khanel top", "kitsune mask", "Kolex 2 watch", "Kolex watch", "Kupreme backpack skin", "Kupreme set", "Kupreme T-shirt", "Lacoste T-shirt", "leather school backpack skin", "leather gothic pants", "leon krawl on the shoulder accessory", "Love costume", "lovely bird egg on the shoulder accessory", "Lui Vi shorts", "Lui Vi backpack skin", "Lui Vi jacket", "Lui Vi pants", "Lui Vi shoulder backpack skin.", "Lui Vi set", "Lui Vi sweatshirt", "Lui Vi T-shirt", "Lui Vi top", "luminous Bendi pants", "luminous Bendi set", "luminous branded pants with bunny detail", "luminous Grand RP trousers", "luminous head bag mask", "luminous LM Playboy mask", "luminous LM Playboy set", "luminous LM Playboy trousers", "luminous OFF pants", "luminous OFF set", "luminous shoes", "luminous trousers", "LUV backpack with wings skin", "maliky hoodie", "maliky T-shirt", "mask", "Mask Broken", "mask made of clips on a chain", "Mickey Mouse pants", "Mickey Mouse T-shirt", "Mikachu hoodie", "Mikachu T-shirt", "mini-bear backpack skin", "mix collection T-shirt", "monkey boss mask", "monkey mask", "Mordan 1 shoes", "Mordan 6 shoes", "Muci backpack skin", "Muci branded flip-flops", "Muci hoodie", "Muci hoodie with a snake", "Muci Not Fake hoodie", "Muci pants", "Muci sweatshirt", "Muci trousers", "multi-colored Pans sneakers", "Murberry pants", "N.E.S.A. pants", "N.E.S.A. T-shirt", "navel piercing accessory", "neck scarf accessory", "necklace", "neon horns with spikes", "neon Lui Vi pants", "neon pants", "neon rabbit ears", "neon shoes", "neon torso", "New Balance trousers", "new fashionable joggers", "New Years Eve costume", "Nik Huarache shoes", "Nik shorts with leggings", "Niki backpack skin", "Niki Ground Porce One new collection shoes", "Niki mask", "Niki new collection hoodie", "Niki new collection pants", "Niki Shox shoes", "Niki tech fleece pants", "Niki tech top", "Niki track suit pants", "Niki track suit top", "Niki Uptempo shoes", "Niki Zoom Freak 1 Multi-Color shoes", "old summer shorts", "one-colour CAP T-shirt", "owl mask", "owl on the shoulder accessory", "panama hat", "pants", "pants split", "pants with belt", "Pans sneakers", "penguin mask", "Pezy Boost shoes", "piggy keychain backpack skin", "pig mask", "pixel glasses", "plain jacket with sweater", "plaid bunny backpack skin", "Polo Kinder T-shirt", "pullover with long sleeve", "purge mask", "rabbit ears", "raccoon mask", "ragged jeans", "raptor mask", "raven mask", "red sneakers", "red stocking mask", "reindeer mask", "RGB neon shoes", "Rick and Morty trendy jacket", "Rick Ownis X Dr. Martian boots", "robot human mask", "robot mask", "Rocs", "rooster mask", "sneakers", "S cargo pants", "sad hare backpack skin", "samurai mask", "Santa Claus mask", "saruko neon mask", "satanic wings", "Sashmello mask", "scary chicken backpack skin", "scary turtleneck T-shirt", "scarf", "shamanic mask", "shark backpack skin", "shirt new", "shiny deer antler headband accessory", "shoes", "short pullover", "shorts", "sporty boots for women", "Simpsons T-shirt", "six-tailed fox on the shoulder accessory", "skater jeans", "skeleton cat backpack skin", "skeleton cheetah plush backpack skin", "skeleton king mask", "skinny jacket", "skull backpack skin", "snowboarders mask", "snowflake glasses", "snowman mask", "spider pants", "sports mask", "sports top", "Spring Set", "star bunny backpack skin", "stealthy mask", "ston islan classic sport pants", "stonislan pants", "strawberry backpack skin", "strong chicken on the shoulder accessory", "stylish suit", "Summer bra", "summer collection T-shirt", "summer top", "summer voyage shorts", "Sweatshirt", "swordmen pants", "T-shirt", "The West Pace jacket", "tie", "tight mask", "tied scarf mask", "toothy mask", "toothless dragon on the shoulder accessory", "top", "top 2 outerwear", "top with chains", "topic pok", "trainers", "trendy jacket", "trending shark head hat", "Tron helmet", "Tron pants", "Tron set", "Tron shoes", "trousers", "Tsum collection T-shirt", "TV-head mask", "Up-Green Keezy Boost shoes", "Up-Green Pezy Boost shoes", "Up-Green sweatshirt", "Valenciaga pants", "Valenciaga set", "Valenciaga Track shoes", "valentines cat backpack skin", "Venom backpack skin", "VIN T-shirt", "vintage Abibas Olympic Jerseys", "Volex 2 watch", "Volex watch", "Watch Me sweater", "wedding dress", "white Lui Vi desert scarf mask with multi-colored top", "tapered classic turtleneck", "wide print soccer T-shirt", "wide printed football T-shirt ", "winter collection dress", "wristband accessory", "zipper pants", "Abibas leggings", "Bandana top", "Barberry corset dress", "beads accessory", "Body wraps kill top", "branded colourful T-shirt", "Calligraphy dress", "Collection 5 top", "Corset top", "Day dress", "Dress", "Dress with cutout", "Faution top", "Hoodie", "Jeans", "Kupreme dress", "Long brand T-shirt", "low dress", "luminous LM Playboy jacket", "luminous LM Playboy sweatshirt", "luminous LM Playboy T-shirt", "luminous LM Playboy top", "luminous T-shirt", "Muci shorts", "Niki new collection set", "open olympics top", "Onelove chain", "Panel pants", "Skirt", "Skirt with tights", "swimming trunks", "Tall boots", "Tron torso", "Valenciaga T-shirt",
        // General Items (from items.js)
        "a pet dog", "a pet cat", "a pet pig", "a pet rabbit", "a pet poodle", "a pet husky", "a pet rottweiler", "a pet ghost", "a pet voodoo doll", "a pet pumpkin guardian", "a pet monkey", "a pet lion cub", "a pet panther", "a pet Santa Claus", "pet food", "Monowheel", "treasure map", "repair kit", "battery", "scrap metal", "video card", "platinum prime ticket", "automatic drill", "Cayo Perico ticket", "unique rims", "body armour skin", "ammunition", "GrandPro bodycam", "hookah", "diamond", "ruby", "fuel canister", "timber", "secret ticket", "tactical grand armoured vest skin", "container for racers 1", "flower", "dice", "high quality fishing rod", "power booster", "unique love container", "drawing print", "7.62 ammo", "Trezor container", "green fabric", "Ocelot container", "Progen container", "sim-card", "Christmas tree", "pet resource miners ticket", "neon armoured vest skin", "license plate", "pumpkin seed", "luminous stone", "automatic sawmill", "lottery ticket", "paint can", "20% protection juice", "perch", "salmon"
    ].filter((v, i, a) => a.indexOf(v) === i).sort(); // Unique and sorted

    const mixedColors = ["luminous", "red", "blue", "green", "black", "white", "yellow", "purple", "orange", "pink", "gray"];
    const mixedTypes = Array.from({ length: 30 }, (_, i) => `type ${i + 1}`);
    const mixedGenders = ["", "for men", "for women"];

    class MixedForm {
        constructor() {
            this.state = {
                type: 'Buying',
                isTrading: false,
                items: [{}, {}, {}],
                activeItemCount: 1,
                useInBulk: false,
                useRespectively: false
            };

            this.initializeElements();
            this.attachEventListeners();
            this.updateUI();
            this.updatePreview();
        }

        initializeElements() {
            this.form = document.getElementById('mixedForm');
            this.itemsContainer = document.getElementById('mixedItemsContainer');
            this.pricesContainer = document.getElementById('mixedPricesContainer');
            this.output = document.getElementById('mixed-output');
            this.itemCount = document.getElementById('mixedItemCount');
            this.itemsTitle = document.getElementById('mixedItemsTitle');
            this.respectivelyCheck = document.getElementById('mixedRespectivelyCheck');
            this.itemControls = document.getElementById('mixedItemControls');
            this.inBulkInput = document.getElementById('mixedInBulkOption');
            this.inBulkLabel = document.querySelector('label[for="mixedInBulkOption"]');
            this.tradingCheckbox = document.getElementById('mixed-trading');
            this.addItemBtn = document.getElementById('addMixedItem');
            this.removeItemBtn = document.getElementById('removeMixedItem');
            this.submitBtn = document.getElementById('mixed-submit-btn');
            this.copyBtn = document.getElementById('mixed-copy-btn');
        }

        attachEventListeners() {
            document.querySelectorAll('input[name="mixed-transaction"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    this.state.type = e.target.value;
                    this.updatePreview();
                });
            });

            if (this.tradingCheckbox) {
                this.tradingCheckbox.addEventListener('change', (e) => {
                    this.state.isTrading = e.target.checked;
                    this.updateUI();
                    this.updatePreview();
                });
            }

            if (this.addItemBtn) this.addItemBtn.addEventListener('click', () => this.addItem());
            if (this.removeItemBtn) this.removeItemBtn.addEventListener('click', () => this.removeItem());

            if (this.inBulkInput) {
                this.inBulkInput.addEventListener('change', (e) => {
                    this.state.useInBulk = e.target.checked;
                    this.updatePreview();
                });
            }

            if (this.respectivelyCheck) {
                this.respectivelyCheck.addEventListener('change', (e) => {
                    this.state.useRespectively = e.target.checked;
                    this.updatePreview();
                });
            }

            if (this.submitBtn) {
                this.submitBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.updatePreview();
                });
            }

            if (this.copyBtn) {
                this.copyBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleCopy();
                });
            }

            const resetBtn = document.getElementById('mixed-reset-btn');
            if (resetBtn) {
                resetBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.resetForm();
                });
            }

            this.state.type = document.querySelector('input[name="mixed-transaction"]:checked')?.value || 'Buying';
            this.state.isTrading = this.tradingCheckbox?.checked || false;
        }

        addItem() {
            if (this.state.activeItemCount < 3) {
                this.state.activeItemCount++;
                this.state.items[this.state.activeItemCount - 1] = {};
                this.updateUI();
                this.updatePreview();
            }
        }

        removeItem() {
            if (this.state.activeItemCount > 1) {
                this.state.items[this.state.activeItemCount - 1] = {};
                this.state.activeItemCount--;
                this.updateUI();
                this.updatePreview();
            }
        }

        createInputGroup(index) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'mixed-item-group mb-3 p-3 border rounded bg-light';

            const nameLabel = document.createElement('label');
            nameLabel.className = 'form-label';
            nameLabel.innerHTML = `<i class="fas fa-tags"></i> Item/Clothing Name:`;
            itemDiv.appendChild(nameLabel);

            const nameInputGroup = document.createElement('div');
            nameInputGroup.className = 'position-relative';
            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.className = 'form-control mixed-name-input';
            nameInput.placeholder = this.state.isTrading && index === 0 ? 'Your item' : (this.state.isTrading && index === 1 ? 'Wanted item' : `Name ${index + 1}`);
            nameInput.value = this.state.items[index].name || '';

            const nameSuggestionsDiv = document.createElement('div');
            nameSuggestionsDiv.className = 'suggestion-box';

            nameInputGroup.appendChild(nameInput);
            nameInputGroup.appendChild(nameSuggestionsDiv);
            itemDiv.appendChild(nameInputGroup);

            nameInput.addEventListener('input', () => this.handleNameInput(nameInput, nameSuggestionsDiv, index));
            nameInput.addEventListener('focus', () => { if (nameInput.value) this.handleNameInput(nameInput, nameSuggestionsDiv, index); });
            nameInput.addEventListener('blur', () => setTimeout(() => { nameSuggestionsDiv.style.display = 'none'; }, 150));

            // Simplified for mixed - only show Quantity and Plural options
            const quantityLabel = document.createElement('label');
            quantityLabel.className = 'form-label mt-3';
            quantityLabel.innerHTML = `<i class="fas fa-sort-numeric-up"></i> Quantity (Optional):`;
            itemDiv.appendChild(quantityLabel);

            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.className = 'form-control mixed-quantity-input';
            quantityInput.placeholder = 'e.g., 5';
            quantityInput.min = '1';
            quantityInput.value = this.state.items[index].quantity || '';
            quantityInput.addEventListener('input', (e) => {
                this.state.items[index].quantity = e.target.value;
                this.updatePreview();
            });
            itemDiv.appendChild(quantityInput);

            const pluralCheckLabel = document.createElement('label');
            pluralCheckLabel.className = 'checkbox-button-label mt-2';
            pluralCheckLabel.innerHTML = `<input type="checkbox" id="mixedPluralS${index}" class="d-none"> Add "s"`;

            const pluralInput = pluralCheckLabel.querySelector('input[type="checkbox"]');
            pluralInput.checked = this.state.items[index].usePluralS || false;
            if (pluralInput.checked) pluralCheckLabel.classList.add('active');

            pluralInput.addEventListener('change', (e) => {
                this.state.items[index].usePluralS = e.target.checked;
                pluralCheckLabel.classList.toggle('active', e.target.checked);
                this.updatePreview();
            });
            pluralCheckLabel.addEventListener('click', (e) => {
                e.preventDefault();
                pluralInput.checked = !pluralInput.checked;
                pluralInput.dispatchEvent(new Event('change'));
            });
            itemDiv.appendChild(pluralCheckLabel);

            return itemDiv;
        }

        createPriceInputGroup(index) {
            const priceDiv = document.createElement('div');
            priceDiv.className = 'mixed-price-group mb-3';

            const priceLabel = document.createElement('label');
            priceLabel.className = 'form-label';
            priceLabel.innerHTML = `<i class="fas fa-dollar-sign"></i> Price/Budget for Item ${index + 1}:`;
            priceDiv.appendChild(priceLabel);

            const priceInputGroup = document.createElement('div');
            priceInputGroup.className = 'input-group';

            const span = document.createElement('span');
            span.className = 'input-group-text';
            span.innerHTML = '<i class="fas fa-dollar-sign"></i>';

            const priceInput = document.createElement('input');
            priceInput.type = 'text';
            priceInput.className = 'form-control mixed-price-input';
            priceInput.placeholder = 'e.g. 400k or 2m';
            priceInput.value = this.state.items[index].price || '';
            priceInput.addEventListener('input', (e) => {
                this.state.items[index].price = e.target.value;
                this.updatePreview();
            });

            priceInputGroup.appendChild(span);
            priceInputGroup.appendChild(priceInput);

            const eachCheckLabel = document.createElement('label');
            eachCheckLabel.className = 'checkbox-button-label ms-2';
            eachCheckLabel.innerHTML = `<input type="checkbox" id="mixedEach${index}" class="d-none"> Each`;

            const eachInput = eachCheckLabel.querySelector('input[type="checkbox"]');
            eachInput.checked = this.state.items[index].useEach || false;
            if (eachInput.checked) eachCheckLabel.classList.add('active');

            eachInput.addEventListener('change', (e) => {
                this.state.items[index].useEach = e.target.checked;
                eachCheckLabel.classList.toggle('active', e.target.checked);
                this.updatePreview();
            });
            eachCheckLabel.addEventListener('click', (e) => {
                e.preventDefault();
                eachInput.checked = !eachInput.checked;
                eachInput.dispatchEvent(new Event('change'));
            });

            priceInputGroup.appendChild(eachCheckLabel);
            priceDiv.appendChild(priceInputGroup);
            return priceDiv;
        }

        handleNameInput(inputElement, suggestionsBox, index) {
            const value = inputElement.value.toLowerCase();
            suggestionsBox.innerHTML = '';

            if (value) {
                const matchingItems = mixedItemsList.filter(item => item.toLowerCase().includes(value));
                if (matchingItems.length > 0) {
                    suggestionsBox.style.display = 'block';
                    matchingItems.forEach(item => {
                        const div = document.createElement('div');
                        div.className = 'suggestion-item';
                        div.textContent = item;
                        div.addEventListener('mousedown', (e) => {
                            e.preventDefault();
                            inputElement.value = item;
                            this.state.items[index].name = item;
                            suggestionsBox.style.display = 'none';
                            this.updatePreview();
                        });
                        suggestionsBox.appendChild(div);
                    });
                } else {
                    suggestionsBox.style.display = 'none';
                    this.state.items[index].name = inputElement.value; // Allow custom items
                    this.updatePreview();
                }
            } else {
                suggestionsBox.style.display = 'none';
                this.state.items[index].name = '';
                this.updatePreview();
            }
        }

        updateUI() {
            this.itemsContainer.innerHTML = '';
            this.pricesContainer.innerHTML = '';

            for (let i = 0; i < this.state.activeItemCount; i++) {
                this.itemsContainer.appendChild(this.createInputGroup(i));
                this.pricesContainer.appendChild(this.createPriceInputGroup(i));
            }

            if (this.itemCount) this.itemCount.textContent = `${this.state.activeItemCount} of 3`;
            if (this.addItemBtn) this.addItemBtn.disabled = this.state.activeItemCount >= 3;
            if (this.removeItemBtn) this.removeItemBtn.disabled = this.state.activeItemCount <= 1;

            if (this.respectivelyCheck) {
                this.respectivelyCheck.classList.toggle('d-none', this.state.activeItemCount <= 1);
            }

            document.querySelectorAll('.mixed-price-group .checkbox-button-label').forEach(label => {
                label.style.display = this.state.isTrading ? 'none' : 'inline-flex';
            });
            if (this.state.isTrading) {
                this.state.items.forEach(item => item.useEach = false);
            }

            document.querySelectorAll('.mixed-item-group .mixed-quantity-input, .mixed-item-group .checkbox-button-label').forEach(element => {
                element.style.display = this.state.isTrading ? 'none' : '';
            });
            if (this.state.isTrading) {
                this.state.items.forEach(item => {
                    item.quantity = '';
                    item.usePluralS = false;
                });
            }
        }

        formatPrice(price) {
            if (!price) return 'Negotiable';
            let cleanPrice = price.toString().toLowerCase().replace(/[^0-9km.]/g, '');
            let numericValue;

            if (cleanPrice.includes('k')) {
                numericValue = parseFloat(cleanPrice.replace('k', '')) * 1000;
                if (!isNaN(numericValue)) return numericValue.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace(/,/g, '.');
            } else if (cleanPrice.includes('m')) {
                numericValue = parseFloat(cleanPrice.replace('m', '')) * 1000000;
                if (!isNaN(numericValue)) {
                    const formattedNum = numericValue / 1000000;
                    return `${formattedNum % 1 === 0 ? formattedNum.toFixed(0) : formattedNum.toFixed(1)} Million`;
                }
            } else {
                numericValue = parseFloat(cleanPrice);
                if (!isNaN(numericValue)) return numericValue.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace(/,/g, '.');
            }
            return 'Negotiable';
        }

        formatAd() {
            const { type, isTrading, items, useInBulk, useRespectively, activeItemCount } = this.state;
            const validItems = items.slice(0, activeItemCount).filter(item => item.name && item.name.trim());
            if ((isTrading && validItems.length !== 2) || (!isTrading && validItems.length === 0)) {
                return 'Your mixed advertisement will appear here...';
            }
            const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
            // Format items with correct plural, article, and order
            let itemsText = validItems.map((item, idx) => {
                let { name, quantity, usePluralS } = item;
                let parts = [];
                if (quantity && !isTrading) parts.push(quantity.trim());
                let formattedName = name.trim();
                if (usePluralS && !formattedName.toLowerCase().endsWith('s')) {
                    formattedName += 's';
                }
                parts.push(formattedName);
                return parts.join(' ');
            });
            // Join items with commas and 'and' for 2/3 items
            if (itemsText.length > 2) {
                itemsText = `${itemsText.slice(0, -1).join(', ')} and ${itemsText[itemsText.length - 1]}`;
            } else {
                itemsText = itemsText.join(' and ');
            }
            let output = `${capitalizedType}${isTrading ? ' or trading' : ''} ${itemsText}`;
            if (useInBulk && !isTrading) output += ' in bulk';
            // Price/Budget label
            const priceLabel = type === 'Buying' ? 'Budget' : (type === 'Renting' ? 'Rent' : 'Price');
            let priceSection = `. ${priceLabel}: `;
            // Format prices
            const validPrices = items.slice(0, activeItemCount).map(item => item.price && item.price.trim()).filter(p => p);
            if (validPrices.length === 0) {
                output += `. ${priceLabel}: Negotiable.`;
            } else {
                const priceTexts = items.slice(0, activeItemCount).map((item, index) => {
                    const formattedPrice = this.formatPrice(item.price);
                    const suffix = (item.useEach && !isTrading) ? ' each' : '';
                    return formattedPrice + suffix;
                });
                let priceStrings = [];
                for (let i = 0; i < validItems.length; i++) {
                    const p = priceTexts[i] || 'Negotiable';
                    if (p !== 'Negotiable') {
                        priceStrings.push(`$${p}`);
                    } else {
                        priceStrings.push(p);
                    }
                }
                if (isTrading && priceStrings.length === 2) {
                    priceSection += `${priceStrings[0]} and ${priceStrings[1]}`;
                } else if (priceStrings.length === 1) {
                    priceSection += priceStrings[0];
                } else if (useRespectively && !isTrading && priceStrings.length === validItems.length) {
                    if (priceStrings.length === 2) {
                        priceSection += `${priceStrings[0]} and ${priceStrings[1]} respectively`;
                    } else {
                        priceSection += `${priceStrings.slice(0, -1).join(', ')} and ${priceStrings[priceStrings.length - 1]} respectively`;
                    }
                } else {
                    priceSection += priceStrings.join(', ');
                }
                output += priceSection;
                // Add period if needed
                const lastPrice = priceStrings[priceStrings.length - 1] || '';
                if (lastPrice.includes('Negotiable') || lastPrice.includes('Million') || lastPrice.includes('each') || useRespectively) {
                    if (!output.endsWith('.')) output += '.';
                }
            }
            return output.trim();
        }

        updatePreview() {
            if (this.output) {
                this.output.textContent = this.formatAd();
            }
        }

        handleCopy() {
            const outputText = this.output.textContent;
            if (outputText === 'Your mixed advertisement will appear here...') {
                if (typeof showErrorPopup === 'function') showErrorPopup('Generate an ad first!');
                return;
            }
            navigator.clipboard.writeText(outputText).then(() => {
                if (typeof showNotification === 'function') showNotification('Copied to clipboard!');
            }).catch(err => {
                if (typeof showErrorPopup === 'function') showErrorPopup('Failed to copy: ' + err);
            });
        }

        resetForm() {
            this.state = {
                type: 'Buying', isTrading: false, items: [{}, {}, {}],
                activeItemCount: 1, useInBulk: false, useRespectively: false
            };
            if (this.form) this.form.reset();
            document.querySelectorAll('#mixed-ads .checkbox-button-label').forEach(l => l.classList.remove('active'));
            this.updateUI();
            this.updatePreview();
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('mixed-ads')) {
            new MixedForm();
        }
    });
}