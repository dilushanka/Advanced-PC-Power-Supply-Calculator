// Peripherals Module
const peripheralsModule = (function() {
    // Input devices data
    const inputData = {
        "standard_keyboard": { power: 0.5 },
        "gaming_keyboard": { power: 1.5 },
        "mechanical_keyboard": { power: 1 },
        "standard_mouse": { power: 0.5 },
        "gaming_mouse": { power: 1 },
        "wireless_mouse": { power: 0.3 }
    };

    // Other devices data
    const otherData = {
        "usb_device": { power: 2.5 },
        "rgb_lighting": { power: 5 },
        "fan_controller": { power: 5 },
        "external_hdd": { power: 10 }
    };

    // Monitor data
    const monitorData = {
        "24_1080p": { power: 25 },
        "27_1440p": { power: 35 },
        "32_4k": { power: 50 },
        "ultrawide": { power: 60 }
    };

    // Calculate peripherals power consumption
    function calculate() {
        let totalPower = 0;
        let peakPower = 0;
        
        // Input devices
        const keyboardSelect = document.querySelector('.keyboard-select');
        const keyboardCount = parseInt(document.querySelector('.keyboard-count').value) || 0;
        if (keyboardSelect.value && keyboardCount > 0 && inputData[keyboardSelect.value]) {
            const power = inputData[keyboardSelect.value].power * keyboardCount;
            totalPower += power;
            peakPower += power;
        }
        
        const mouseSelect = document.querySelector('.mouse-select');
        const mouseCount = parseInt(document.querySelector('.mouse-count').value) || 0;
        if (mouseSelect.value && mouseCount > 0 && inputData[mouseSelect.value]) {
            const power = inputData[mouseSelect.value].power * mouseCount;
            totalPower += power;
            peakPower += power;
        }
        
        // Other devices
        document.querySelectorAll('.component-row').forEach(row => {
            if (row.querySelector('.other-select')) {
                const otherSelect = row.querySelector('.other-select');
                const otherCount = parseInt(row.querySelector('.other-count').value) || 0;
                
                if (otherSelect.value && otherCount > 0 && otherData[otherSelect.value]) {
                    const power = otherData[otherSelect.value].power * otherCount;
                    totalPower += power;
                    peakPower += power;
                }
            }
        });
        
        return { totalPower, peakPower };
    }

    // Calculate monitor power separately (for UPS calculation)
    function calculateMonitorPower() {
        const monitorSelect = document.getElementById('monitor-select');
        const monitorCount = parseInt(document.getElementById('monitor-count').value) || 0;
        
        if (monitorSelect.value && monitorCount > 0 && monitorData[monitorSelect.value]) {
            return monitorData[monitorSelect.value].power * monitorCount;
        }
        return 0;
    }

    return { 
        calculate,
        calculateMonitorPower 
    };
})();