// Storage Module
const storageModule = (function() {
    // Storage device data
    const storageData = {
        "hdd_35_7200": { power: 6.8, spinup: 20 },
        "hdd_35_5400": { power: 4.5, spinup: 16 },
        "hdd_25": { power: 2.5, spinup: 8 },
        "ssd_25_sata": { power: 3, spinup: 0 },
        "ssd_m2_nvme": { power: 4.5, spinup: 0 },
        "ssd_m2_sata": { power: 3.5, spinup: 0 }
    };

    // Calculate storage power consumption
    function calculate() {
        let totalPower = 0;
        let peakPower = 0;
        
        document.querySelectorAll('.component-row').forEach(row => {
            if (row.querySelector('.storage-select')) {
                const storageSelect = row.querySelector('.storage-select');
                const storageCount = parseInt(row.querySelector('.storage-count').value) || 0;
                
                if (storageSelect.value && storageCount > 0 && storageData[storageSelect.value]) {
                    const storageInfo = storageData[storageSelect.value];
                    totalPower += storageInfo.power * storageCount;
                    peakPower += storageInfo.spinup * storageCount;
                }
            }
        });
        
        return { totalPower, peakPower };
    }

    return { calculate };
})();