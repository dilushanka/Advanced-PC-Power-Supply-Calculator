// Main Application Controller
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all component modules
    cpuModule.init();
    gpuModule.init();
    // Other module initializations would go here
    
    // Set up calculate button
    document.querySelector('.calculate-btn').addEventListener('click', calculatePower);
    
    // Set up component addition buttons
    document.querySelectorAll('[onclick^="addComponent"]').forEach(button => {
        const type = button.getAttribute('onclick').match(/'([^']+)'/)[1];
        button.addEventListener('click', () => addComponent(type));
    });
    
    // Set up component removal (using event delegation)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-btn')) {
            removeComponent(e.target);
        }
    });
});

// Add component row
function addComponent(type) {
    const container = document.getElementById(`${type}-container`);
    const row = document.createElement('div');
    row.className = 'component-row';
    
    switch(type) {
        case 'cpu':
            row.innerHTML = `
                <select class="cpu-select">
                    <option value="">Select CPU</option>
                    <option value="i9-13900k">Intel Core i9-13900K</option>
                    <option value="i7-13700k">Intel Core i7-13700K</option>
                    <option value="i5-13600k">Intel Core i5-13600K</option>
                    <option value="ryzen9-7950x">AMD Ryzen 9 7950X</option>
                    <option value="ryzen7-7700x">AMD Ryzen 7 7700X</option>
                    <option value="ryzen5-7600x">AMD Ryzen 5 7600X</option>
                    <option value="custom">Custom CPU</option>
                </select>
                <input type="number" class="cpu-count" value="1" min="1" max="4">
                <button class="remove-btn">×</button>
            `;
            break;
        case 'memory':
            row.innerHTML = `
                <select class="memory-select">
                    <option value="">Select Memory Type</option>
                    <option value="ddr4_8gb">DDR4 8GB</option>
                    <option value="ddr4_16gb">DDR4 16GB</option>
                    <option value="ddr5_8gb">DDR5 8GB</option>
                    <option value="ddr5_16gb">DDR5 16GB</option>
                    <option value="ddr5_32gb">DDR5 32GB</option>
                </select>
                <input type="number" class="memory-count" value="0" min="0">
                <button class="remove-btn">×</button>
            `;
            break;
        case 'gpu1':
        case 'gpu2':
            row.innerHTML = `
                <select class="gpu-brand">
                    <option value="">Select Brand</option>
                    <option value="nvidia">NVIDIA</option>
                    <option value="amd">AMD</option>
                    <option value="intel">Intel</option>
                </select>
                <select class="gpu-model" disabled>
                    <option value="">Select Video Card</option>
                </select>
                <input type="number" class="gpu-count" value="0" min="0" max="4">
                <button class="remove-btn">×</button>
            `;
            break;
        // Other component cases would go here
        default:
            console.error(`Unknown component type: ${type}`);
            return;
    }
    
    container.appendChild(row);
    
    // Initialize any event listeners for the new row
    if (type === 'cpu') {
        const select = row.querySelector('.cpu-select');
        select.addEventListener('change', function() {
            const container = this.closest('.form-group');
            const customSpecs = container.querySelector('#custom-cpu-specs');
            customSpecs.style.display = this.value === 'custom' ? 'block' : 'none';
        });
    }
    else if (type === 'gpu1' || type === 'gpu2') {
        const brandSelect = row.querySelector('.gpu-brand');
        brandSelect.addEventListener('change', function() {
            const modelSelect = this.parentElement.querySelector('.gpu-model');
            modelSelect.innerHTML = '<option value="">Select Video Card</option>';
            
            if (this.value) {
                modelSelect.disabled = false;
                gpuModule.populateModels(modelSelect, this.value);
            } else {
                modelSelect.disabled = true;
            }
        });
    }
}

// Remove component row
function removeComponent(button) {
    button.closest('.component-row').remove();
}

// Main calculation function
function calculatePower() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('results').style.display = 'none';
    
    // Use setTimeout to allow UI to update before heavy calculations
    setTimeout(() => {
        let totalPower = 0;
        let peakPower = 0;
        
        // 1. Motherboard base power
        const motherboardPower = {
            'mini_itx': 30,
            'micro_atx': 40,
            'atx': 50,
            'e_atx': 70,
            'server': 100
        };
        const motherboard = document.getElementById('motherboard').value;
        totalPower += motherboardPower[motherboard] || 45;
        peakPower = totalPower;
        
        // 2. Calculate power from each module
        const cpuResults = cpuModule.calculate();
        totalPower += cpuResults.totalPower;
        peakPower += cpuResults.peakPower;
        
        const ramResults = ramModule.calculate();
        totalPower += ramResults.totalPower;
        peakPower += ramResults.peakPower;
        
        // 3. GPU power (primary and secondary sets)
        const gpu1Power = gpuModule.calculate('gpu1-container');
        const gpu2Power = gpuModule.calculate('gpu2-container');
        totalPower += gpu1Power * 0.7 + gpu2Power * 0.5; // Assume not all GPUs at full load
        peakPower += gpu1Power + gpu2Power;
        
        // 4. Storage devices
        const storageResults = storageModule.calculate();
        totalPower += storageResults.totalPower;
        peakPower += storageResults.peakPower;
        
        // 5. Cooling system
        const coolingResults = coolingModule.calculate();
        totalPower += coolingResults.totalPower;
        peakPower += coolingResults.peakPower;
        
        // 6. Peripherals
        const peripheralResults = peripheralsModule.calculate();
        totalPower += peripheralResults.totalPower;
        peakPower += peripheralResults.peakPower;
        
        // 7. Adjust for utilization patterns
        const utilizationTime = parseInt(document.getElementById('utilization-time').value) || 8;
        const gamingTime = parseInt(document.getElementById('gaming-time').value) || 0;
        
        // Calculate load factor based on usage
        let loadFactor = 0.7; // Default for mixed usage
        if (gamingTime > 0) {
            const gamingRatio = gamingTime / utilizationTime;
            loadFactor = 0.5 + gamingRatio * 0.5; // Between 0.5 (light gaming) and 1.0 (heavy gaming)
        }
        
        // Calculate final results
        const estimatedLoad = Math.ceil(totalPower * loadFactor);
        const recommendedPSU = Math.ceil(peakPower * 1.2 / 50) * 50; // Round to nearest 50W
        
        // Calculate UPS capacity (including monitor if specified)
        const monitorResults = peripheralsModule.calculateMonitorPower();
        const upsCapacity = Math.ceil((peakPower + monitorResults) * 1.2 / 100) * 100;
        
        // Display results
        resultsModule.displayResults({
            estimatedLoad,
            recommendedPSU,
            upsCapacity,
            peakPower,
            monitorPower: monitorResults
        });
    }, 100);
}