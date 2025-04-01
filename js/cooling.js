// Cooling Module
const coolingModule = (function() {
    // Fan data
    const fanData = {
        "120mm": { power: 1.5 },
        "140mm": { power: 2 },
        "200mm": { power: 3 },
        "cpu_cooler": { power: 2 }
    };

    // Liquid cooling data
    const liquidCoolingData = {
        "aio_120mm": { power: 5 },
        "aio_240mm": { power: 7 },
        "aio_360mm": { power: 9 },
        "custom_loop": { power: 10 }
    };

    // Pump data
    const pumpData = {
        "aio_pump": { power: 5 },
        "d5_pump": { power: 23 },
        "ddc_pump": { power: 18 }
    };

    // Calculate cooling power consumption
    function calculate() {
        let totalPower = 0;
        let peakPower = 0;
        
        // Fans
        document.querySelectorAll('.component-row').forEach(row => {
            if (row.querySelector('.fan-select')) {
                const fanSelect = row.querySelector('.fan-select');
                const fanCount = parseInt(row.querySelector('.fan-count').value) || 0;
                
                if (fanSelect.value && fanCount > 0 && fanData[fanSelect.value]) {
                    const fanPower = fanData[fanSelect.value].power * fanCount;
                    totalPower += fanPower;
                    peakPower += fanPower;
                }
            }
        });
        
        // Liquid cooling
        const liquidCoolingSelect = document.querySelector('.liquid-cooling-select');
        const liquidCoolingCount = parseInt(document.querySelector('.liquid-cooling-count').value) || 0;
        if (liquidCoolingSelect.value && liquidCoolingCount > 0 && 
            liquidCoolingData[liquidCoolingSelect.value]) {
            const coolingPower = liquidCoolingData[liquidCoolingSelect.value].power * liquidCoolingCount;
            totalPower += coolingPower;
            peakPower += coolingPower;
        }
        
        // Pumps
        const pumpSelect = document.querySelector('.pump-select');
        const pumpCount = parseInt(document.querySelector('.pump-count').value) || 0;
        if (pumpSelect.value && pumpCount > 0 && pumpData[pumpSelect.value]) {
            const pumpPower = pumpData[pumpSelect.value].power * pumpCount;
            totalPower += pumpPower;
            peakPower += pumpPower;
        }
        
        return { totalPower, peakPower };
    }

    return { calculate };
})();