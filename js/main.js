  // Prevent multiple executions
  if (typeof window.mainLoaded === 'undefined') {
      window.mainLoaded = true;
      
      document.addEventListener('DOMContentLoaded', () => {

          // --- CORE NAVIGATION ---
          const showSection = (sectionId) => {
              document.querySelectorAll('.tab-content').forEach(section => {
                  section.classList.remove('active');
              });
              const activeSection = document.getElementById(sectionId);
              if (activeSection) {
                  activeSection.classList.add('active');
              }

              document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
                  link.classList.remove('active');
              });
              const activeLink = document.querySelector(`.sidebar-nav .nav-link[data-section="${sectionId}"]`);
              if (activeLink) {
                  activeLink.classList.add('active');
              }
          };
          window.showSection = showSection;

          document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
              link.addEventListener('click', function(e) {
                  e.preventDefault();
                  showSection(this.getAttribute('data-section'));
              });
          });

          // --- UI & FEEDBACK UTILITIES ---
          window.showErrorPopup = (message) => {
              const el = document.getElementById("error-popup");
              if (el) {
                  el.querySelector("#error-message").textContent = message;
                  el.style.display = 'flex';
              } else {
                  alert(message);
              }
          };

          window.closeErrorPopup = () => {
              const el = document.getElementById("error-popup");
              if (el) el.style.display = 'none';
          };

          window.showNotification = (message = 'Copied to clipboard!') => {
              const el = document.getElementById('notification');
              if (el) {
                  el.querySelector('span').textContent = message;
                  el.classList.add('show');
                  setTimeout(() => el.classList.remove('show'), 2000);
              }
          };

          // --- NEW: CLICK SPARK EFFECT ---
          const createClickSpark = (e) => {
              const container = e.currentTarget;
              const sparkCount = 8;
              const sparkSize = 6;
              const duration = 600;
              const color = container.classList.contains('active') || container.classList.contains('btn-primary') ? '#fff' : 'var(--primary-color-start)';

              const rect = container.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;

              for (let i = 0; i < sparkCount; i++) {
                  const spark = document.createElement('div');
                  spark.className = 'spark';
                  spark.style.position = 'absolute';
                  spark.style.left = `${x}px`;
                  spark.style.top = `${y}px`;
                  spark.style.width = `${sparkSize}px`;
                  spark.style.height = `${sparkSize}px`;
                  spark.style.backgroundColor = color;
                  
                  const angle = (i / sparkCount) * 2 * Math.PI;
                  const distance = Math.random() * 30 + 20;
                  
                  spark.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
                  spark.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);

                  container.appendChild(spark);
                  setTimeout(() => spark.remove(), duration);
              }
          };
          // Apply spark effect to all buttons
          document.querySelectorAll('.btn, .transaction-type-label, .checkbox-button-label').forEach(btn => {
              btn.addEventListener('click', createClickSpark);
          });


          // --- NEW: ANIMATED SUGGESTION LIST ---
          window.createAnimatedSuggestions = (inputElement, suggestionsContainer, items) => {
              suggestionsContainer.innerHTML = '';
              suggestionsContainer.style.display = items.length > 0 ? 'block' : 'none';
              if (items.length === 0) return;

              const inner = document.createElement('div');
              inner.className = 'suggestion-box-inner';
              suggestionsContainer.appendChild(inner);

              items.forEach((item, index) => {
                  const div = document.createElement('div');
                  div.className = 'suggestion-item';
                  div.textContent = item;
                  div.dataset.index = index;
                  div.style.animationDelay = `${index * 0.03}s`;

                  div.addEventListener('mousedown', (e) => {
                      e.preventDefault();
                      inputElement.value = item;
                      suggestionsContainer.style.display = 'none';
                      inputElement.dispatchEvent(new Event('input', { bubbles: true }));
                  });
                  inner.appendChild(div);
              });
              
              // Scroll gradient handler
              const handleScroll = () => {
                  const { scrollTop, scrollHeight, clientHeight } = inner;
                  suggestionsContainer.style.setProperty('--before-opacity', Math.min(scrollTop / 20, 1));
                  suggestionsContainer.style.setProperty('--after-opacity', Math.min((scrollHeight - clientHeight - scrollTop) / 20, 1));
              };
              inner.addEventListener('scroll', handleScroll);
              handleScroll(); // Initial call
          };
          
          // Keyboard navigation for suggestion lists (to be attached by individual component JS)
          window.attachSuggestionKeyNav = (inputElement, suggestionsContainer) => {
              inputElement.addEventListener('keydown', (e) => {
                  const items = suggestionsContainer.querySelectorAll('.suggestion-item');
                  if (items.length === 0 || suggestionsContainer.style.display === 'none') return;

                  let currentIndex = -1;
                  const selected = suggestionsContainer.querySelector('.suggestion-item.selected');
                  if (selected) {
                      currentIndex = parseInt(selected.dataset.index, 10);
                  }

                  if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      currentIndex = Math.min(currentIndex + 1, items.length - 1);
                  } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      currentIndex = Math.max(currentIndex - 1, 0);
                  } else if (e.key === 'Enter' && currentIndex > -1) {
                      e.preventDefault();
                      items[currentIndex].dispatchEvent(new Event('mousedown', { bubbles: true }));
                      return;
                  } else {
                      return;
                  }
                  
                  if (selected) selected.classList.remove('selected');
                  if (currentIndex > -1) {
                      items[currentIndex].classList.add('selected');
                      items[currentIndex].scrollIntoView({ block: 'nearest' });
                  }
              });
          };


          // --- GLOBAL ACTIVE STATE HANDLER ---
          const initializeActiveStateHandlers = (container = document) => {
              // Handle radio buttons
              const radioGroups = {};
              container.querySelectorAll('input[type="radio"]').forEach(radio => {
                  if (!radioGroups[radio.name]) radioGroups[radio.name] = [];
                  radioGroups[radio.name].push(radio);
              });
              Object.values(radioGroups).forEach(radios => {
                  const setActive = () => radios.forEach(radio => {
                      radio.closest('.transaction-type-label, .checkbox-button-label')?.classList.toggle('active', radio.checked);
                  });
                  radios.forEach(radio => radio.addEventListener('change', setActive));
                  setActive(); // Initial state
              });
              // Handle checkboxes
              container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                  const setActive = () => checkbox.closest('.checkbox-button-label')?.classList.toggle('active', checkbox.checked);
                  checkbox.addEventListener('change', setActive);
                  setActive(); // Initial state
              });
          };

          window.initializeActiveStateHandlers = initializeActiveStateHandlers;
          initializeActiveStateHandlers(); // Run for the whole document on load

          // Show default section
          showSection('car-trade');
      });
  }