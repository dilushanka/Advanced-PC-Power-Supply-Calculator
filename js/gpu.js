// GPU Module
const gpuModule = (function() {
    // GPU data
    const gpuModels = {
        "nvidia": [
            { name: "RTX 4090", tdp: 450 },
            { name: "RTX 4080", tdp: 320 },
            // ... other GPU models
        ],
        "amd": [
            { name: "RX 7900 XTX", tdp: 355 },
            // ... other GPU models
        ],
        "intel": [
            { name: "Arc A770", tdp: 225 },
            // ... other GPU models
        ]
    };

    // Initialize GPU dropdowns
    function initGPU() {
        const gpuBrandSelects = document.querySelectorAll('.gpu-brand');
        gpuBrandSelects.forEach(select => {
            select.addEventListener('change', function() {
                const modelSelect = this.parentElement.querySelector('.gpu-model');
                modelSelect.innerHTML = '<option value="">Select Video Card</option>';
                
                if (this.value) {
                    modelSelect.disabled = false;
                    gpuModels[this.value].forEach(gpu => {
                        const option = document.createElement('option');
                        option.value = gpu.name.toLowerCase().replace(/\s+/g, '_');
                        option.textContent = gpu.name;
                        modelSelect.appendChild(option);
                    });
                } else {
                    modelSelect.disabled = true;
                }
            });
        });
    }

    // Calculate GPU power
    function calculateGPUPower(containerId) {
        let gpuPower = 0;
        
        document.querySelectorAll(`#${containerId} .component-row`).forEach(row => {
            const gpuBrand = row.querySelector('.gpu-brand').value;
            const gpuModel = row.querySelector('.gpu-model').value;
            const gpuCount = parseInt(row.querySelector('.gpu-count').value) || 0;
            
            if (gpuBrand && gpuModel && gpuCount > 0) {
                // Find the GPU in our data
                const gpu = gpuModels[gpuBrand].find(g => g.name.toLowerCase().replace(/\s+/g, '_') === gpuModel);
                if (gpu) {
                    const coreClock = parseInt(row.querySelector('.gpu-core-clock')?.value) || 1500;
                    const overvoltage = parseInt(row.querySelector('.gpu-overvoltage')?.value) || 0;
                    const memClock = parseInt(row.querySelector('.gpu-mem-clock')?.value) || 2000;
                    
                    // Adjust power based on overclocking (simplified)
                    const powerMultiplier = 1 + (overvoltage / 100) + ((coreClock - 1500) / 500) * 0.1;
                    gpuPower += gpu.tdp * powerMultiplier * gpuCount;
                }
            }
        });
        
        return gpuPower;
    }

    // Public API
    return {
        init: initGPU,
        calculate: calculateGPUPower
    };
})();