// Protein Calculator JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Protein sources array - easy to modify and extend
    const proteinSources = [
        { id: 'beef', name: 'Beef (100g)', protein: 26 },
        { id: 'egg', name: 'Egg (dozen)', protein: 78 },
        { id: 'fish', name: 'Fish (100g)', protein: 22 },
        { id: 'chicken', name: 'Chicken (100g)', protein: 31 },
        { id: 'pork', name: 'Pork (100g)', protein: 26 }
    ];

    // Current quantities - will be initialized dynamically
    const quantities = {};

    // Initialize quantities for all protein sources
    proteinSources.forEach(source => {
        quantities[source.id] = 0;
    });

    // Get DOM elements
    const targetProteinInput = document.getElementById('targetProtein');
    const totalProteinSpan = document.getElementById('totalProtein');
    const progressPercentSpan = document.getElementById('progressPercent');
    const proteinSourcesContainer = document.querySelector('.protein-sources');

    // Generate HTML for protein sources
    function generateProteinSourcesHTML() {
        const sourcesHTML = proteinSources.map(source => `
            <div class="protein-item" data-protein="${source.protein}">
                <span class="item-name">${source.name}</span>
                <div class="controls">
                    <button class="btn-minus" data-item="${source.id}">-</button>
                    <span class="quantity" id="${source.id}-qty">0</span>
                    <button class="btn-plus" data-item="${source.id}">+</button>
                </div>
            </div>
        `).join('');

        proteinSourcesContainer.innerHTML = `
            <h2>Protein Sources</h2>
            ${sourcesHTML}
        `;
    }

    // Initialize the protein sources display
    generateProteinSourcesHTML();

    // Add event listeners for all + and - buttons
    function addEventListeners() {
        document.querySelectorAll('.btn-plus, .btn-minus').forEach(button => {
            button.addEventListener('click', function() {
                const item = this.dataset.item;
                const isPlus = this.classList.contains('btn-plus');
                
                if (isPlus) {
                    quantities[item]++;
                } else if (quantities[item] > 0) {
                    quantities[item]--;
                }
                
                updateDisplay(item);
                calculateTotal();
            });
        });
    }

    // Add event listeners after generating HTML
    addEventListeners();

    // Add event listener for target protein input
    targetProteinInput.addEventListener('input', calculateTotal);

    function updateDisplay(item) {
        const qtyElement = document.getElementById(item + '-qty');
        qtyElement.textContent = quantities[item];
    }

    function calculateTotal() {
        let totalProtein = 0;
        
        // Calculate total protein from all sources using the array
        proteinSources.forEach(source => {
            totalProtein += quantities[source.id] * source.protein;
        });
        
        // Update total display
        totalProteinSpan.textContent = totalProtein;
        
        // Calculate and update progress percentage
        const targetProtein = parseFloat(targetProteinInput.value) || 0;
        const progressPercent = targetProtein > 0 ? Math.round((totalProtein / targetProtein) * 100) : 0;
        progressPercentSpan.textContent = progressPercent;
    }

    console.log('Protein Calculator loaded successfully!');
}); 