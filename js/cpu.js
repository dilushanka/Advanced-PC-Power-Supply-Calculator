// CPU Module
const cpuModule = (function() {
    // CPU data - organized by brand and generation
    const cpuData = {
        // Intel Core Series
        "intel": {
            // 13th Gen (Raptor Lake)
            "i9-13900K": { tdp: 125, base: 125, boost: 253 },
            "i9-13900KF": { tdp: 125, base: 125, boost: 253 },
            "i7-13700K": { tdp: 125, base: 125, boost: 253 },
            "i7-13700KF": { tdp: 125, base: 125, boost: 253 },
            "i5-13600K": { tdp: 125, base: 125, boost: 181 },
            "i5-13600KF": { tdp: 125, base: 125, boost: 181 },
            
            // 12th Gen (Alder Lake)
            "i9-12900K": { tdp: 125, base: 125, boost: 241 },
            "i9-12900KF": { tdp: 125, base: 125, boost: 241 },
            "i7-12700K": { tdp: 125, base: 125, boost: 190 },
            "i7-12700KF": { tdp: 125, base: 125, boost: 190 },
            "i5-12600K": { tdp: 125, base: 125, boost: 150 },
            "i5-12600KF": { tdp: 125, base: 125, boost: 150 },
            
            // 11th Gen (Rocket Lake)
            "i9-11900K": { tdp: 125, base: 125, boost: 190 },
            "i9-11900KF": { tdp: 125, base: 125, boost: 190 },
            "i7-11700K": { tdp: 125, base: 125, boost: 160 },
            "i7-11700KF": { tdp: 125, base: 125, boost: 160 },
            "i5-11600K": { tdp: 125, base: 125, boost: 140 },
            "i5-11600KF": { tdp: 125, base: 125, boost: 140 },
            
            // 10th Gen (Comet Lake)
            "i9-10900K": { tdp: 125, base: 125, boost: 190 },
            "i9-10900KF": { tdp: 125, base: 125, boost: 190 },
            "i7-10700K": { tdp: 125, base: 125, boost: 150 },
            "i7-10700KF": { tdp: 125, base: 125, boost: 150 },
            "i5-10600K": { tdp: 125, base: 125, boost: 130 },
            "i5-10600KF": { tdp: 125, base: 125, boost: 130 },
            
            // 9th Gen (Coffee Lake Refresh)
            "i9-9900K": { tdp: 95, base: 95, boost: 127 },
            "i9-9900KF": { tdp: 95, base: 95, boost: 127 },
            "i7-9700K": { tdp: 95, base: 95, boost: 120 },
            "i7-9700KF": { tdp: 95, base: 95, boost: 120 },
            "i5-9600K": { tdp: 95, base: 95, boost: 107 },
            "i5-9600KF": { tdp: 95, base: 95, boost: 107 },

            // 8th Gen (Coffee Lake Refresh)
            "i9-8950HK": { tdp: 45, base: 45, boost: 100 },
            "i7-8850H": { tdp: 45, base: 45, boost: 90 },

            // 7th Gen (Coffee Lake Refresh)

            // 6th Gen (Coffee Lake Refresh)

            // 5th Gen (Broadwell)
            "i5-3470": { tdp: 77, base: 69, boost: 126 }, 
            
            // X-Series (HEDT)
            "i9-10980XE": { tdp: 165, base: 165, boost: 190 },
            "i9-9980XE": { tdp: 165, base: 165, boost: 180 },
            "i9-7960X": { tdp: 165, base: 165, boost: 170 }
        },
        
        // AMD Ryzen Series
        "amd": {
            // Ryzen 7000 Series (Zen 4)
            "Ryzen 9 7950X": { tdp: 170, base: 170, boost: 230 },
            "Ryzen 9 7900X": { tdp: 170, base: 170, boost: 200 },
            "Ryzen 7 7700X": { tdp: 105, base: 105, boost: 142 },
            "Ryzen 5 7600X": { tdp: 105, base: 105, boost: 130 },
            
            // Ryzen 5000 Series (Zen 3)
            "Ryzen 9 5950X": { tdp: 105, base: 105, boost: 142 },
            "Ryzen 9 5900X": { tdp: 105, base: 105, boost: 137 },
            "Ryzen 7 5800X": { tdp: 105, base: 105, boost: 130 },
            "Ryzen 5 5600X": { tdp: 65, base: 65, boost: 95 },
            
            // Ryzen 3000 Series (Zen 2)
            "Ryzen 9 3950X": { tdp: 105, base: 105, boost: 130 },
            "Ryzen 9 3900X": { tdp: 105, base: 105, boost: 120 },
            "Ryzen 7 3800X": { tdp: 105, base: 105, boost: 115 },
            "Ryzen 5 3600X": { tdp: 95, base: 95, boost: 100 },
            
            // Ryzen Threadripper (HEDT)
            "Threadripper 3990X": { tdp: 280, base: 280, boost: 290 },
            "Threadripper 3970X": { tdp: 280, base: 280, boost: 280 },
            "Threadripper 3960X": { tdp: 280, base: 280, boost: 270 }
        },
        
        // Custom CPU entry
        "custom": { tdp: 0 }
    };

    // Get all CPU models for dropdown
    function getCPUModels() {
        let models = [];
        
        // Add Intel CPUs
        for (const model in cpuData.intel) {
            models.push({
                brand: 'Intel',
                name: model,
                tdp: cpuData.intel[model].tdp,
                base: cpuData.intel[model].base,
                boost: cpuData.intel[model].boost
            });
        }
        
        // Add AMD CPUs
        for (const model in cpuData.amd) {
            models.push({
                brand: 'AMD',
                name: model,
                tdp: cpuData.amd[model].tdp,
                base: cpuData.amd[model].base,
                boost: cpuData.amd[model].boost
            });
        }
        
        // Add custom option
        models.push({
            brand: 'Custom',
            name: 'custom',
            tdp: 0,
            base: 0,
            boost: 0
        });
        
        return models;
    }

    // Calculate CPU power
    function calculateCPUPower() {
        let totalPower = 0;
        let peakPower = 0;
        
        document.querySelectorAll('.component-row').forEach(row => {
            if (row.querySelector('.cpu-select')) {
                const cpuSelect = row.querySelector('.cpu-select');
                const cpuCount = parseInt(row.querySelector('.cpu-count').value) || 0;
                
                if (cpuSelect.value && cpuCount > 0) {
                    // Find the CPU in our data
                    let cpuInfo;
                    if (cpuData.intel[cpuSelect.value]) {
                        cpuInfo = cpuData.intel[cpuSelect.value];
                    } 
                    else if (cpuData.amd[cpuSelect.value]) {
                        cpuInfo = cpuData.amd[cpuSelect.value];
                    }
                    else if (cpuSelect.value === 'custom') {
                        const speed = parseInt(document.getElementById('cpu-speed').value) || 3000;
                        const vcore = parseFloat(document.getElementById('cpu-vcore').value) || 1.2;
                        const utilization = parseInt(document.getElementById('cpu-utilization').value) || 90;
                        
                        // Very simplified custom CPU power estimation
                        const basePower = (speed / 1000) * (vcore * vcore) * 10;
                        const cpuPower = basePower * (utilization / 100) * cpuCount;
                        totalPower += cpuPower;
                        peakPower += basePower * cpuCount;
                        return; // Skip the rest for custom CPUs
                    }
                    
                    if (cpuInfo) {
                        const utilization = parseInt(document.getElementById('cpu-utilization').value) || 90;
                        const cpuPower = cpuInfo.tdp * (utilization / 100) * cpuCount;
                        totalPower += cpuPower;
                        peakPower += cpuInfo.tdp * cpuCount;
                    }
                }
            }
        });
        
        return { totalPower, peakPower };
    }

    // Initialize CPU dropdown
    function initCPU() {
        const cpuSelects = document.querySelectorAll('.cpu-select');
        const models = getCPUModels();
        
        cpuSelects.forEach(select => {
            // Clear existing options
            select.innerHTML = '<option value="">Select CPU</option>';
            
            // Add Intel CPUs
            select.appendChild(createOptgroup('Intel'));
            models.filter(cpu => cpu.brand === 'Intel').forEach(cpu => {
                const option = document.createElement('option');
                option.value = cpu.name;
                option.textContent = cpu.name;
                select.appendChild(option);
            });
            
            // Add AMD CPUs
            select.appendChild(createOptgroup('AMD'));
            models.filter(cpu => cpu.brand === 'AMD').forEach(cpu => {
                const option = document.createElement('option');
                option.value = cpu.name;
                option.textContent = cpu.name;
                select.appendChild(option);
            });
            
            // Add custom option
            const option = document.createElement('option');
            option.value = 'custom';
            option.textContent = 'Custom CPU';
            select.appendChild(option);
            
            // Set up change listener
            select.addEventListener('change', function() {
                const container = this.closest('.form-group');
                const customSpecs = container.querySelector('#custom-cpu-specs');
                customSpecs.style.display = this.value === 'custom' ? 'block' : 'none';
            });
        });
    }
    
    // Helper to create optgroup
    function createOptgroup(label) {
        const group = document.createElement('optgroup');
        group.label = label;
        return group;
    }

    // Public API
    return {
        init: initCPU,
        calculate: calculateCPUPower,
        getModels: getCPUModels
    };
})();