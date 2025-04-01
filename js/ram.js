// RAM Module
const ramModule = (function() {
    // RAM data
    const memoryData = {
        "ddr4_8gb": { power: 3 },
        "ddr4_16gb": { power: 4 },
        "ddr5_8gb": { power: 4 },
        "ddr5_16gb": { power: 5 },
        "ddr5_32gb": { power: 6 }
    };

    // Calculate RAM power
    function calculateRAMPower() {
        let totalPower = 0;
        let peakPower = 0;
        
        document.querySelectorAll('.component-row').forEach(row => {
            if (row.querySelector('.memory-select')) {
                const memSelect = row.querySelector('.memory-select');
                const memCount = parseInt(row.querySelector('.memory-count').value) || 0;
                
                if (memSelect.value && memCount > 0 && memoryData[memSelect.value]) {
                    const memPower = memoryData[memSelect.value].power * memCount;
                    totalPower += memPower;
                    peakPower += memPower;
                }
            }
        });
        
        // FB DIMMs add extra power
        if (document.getElementById('fb-dimms').checked) {
            totalPower += 15;
            peakPower += 15;
        }
        
        return { totalPower, peakPower };
    }

    // Public API
    return {
        calculate: calculateRAMPower
    };
})();