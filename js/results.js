// Results Module
const resultsModule = (function() {
    // Display results
    function displayResults(totalPower, peakPower) {
        // Adjust for utilization time
        const utilizationTime = parseInt(document.getElementById('utilization-time').value) || 8;
        const gamingTime = parseInt(document.getElementById('gaming-time').value) || 0;
        
        // If system is used for gaming/rendering, increase load factor
        let loadFactor = 0.7; // Default load factor
        if (gamingTime > 0) {
            const gamingRatio = gamingTime / utilizationTime;
            loadFactor = 0.5 + gamingRatio * 0.5; // Between 0.5 and 1.0
        }
        
        // Calculate recommended PSU wattage (peak power + 20% headroom)
        const recommendedPSU = Math.ceil(peakPower * 1.2 / 50) * 50; // Round to nearest 50W
        
        // Calculate estimated system load (average)
        const estimatedLoad = Math.ceil(totalPower * loadFactor);
        
        // Calculate UPS capacity (system + monitor + 20% headroom)
        const monitorSelect = document.getElementById('monitor-select');
        const monitorCount = parseInt(document.getElementById('monitor-count').value) || 0;
        const monitorPower = monitorSelect.value && monitorCount > 0 ? 
            monitorData[monitorSelect.value].power * monitorCount : 0;
        
        const upsCapacity = Math.ceil((peakPower + monitorPower) * 1.2 / 100) * 100; // Round to nearest 100VA
        
        // Display results
        document.getElementById('psu-wattage').textContent = `${recommendedPSU}W`;
        document.getElementById('system-load').textContent = `${estimatedLoad}W`;
        document.getElementById('ups-capacity').textContent = `${upsCapacity}VA`;
        
        // Generate recommendation
        generateRecommendation(recommendedPSU, upsCapacity, peakPower);
        
        // Show results
        document.getElementById('loading').style.display = 'none';
        document.getElementById('results').style.display = 'block';
        
        // Scroll to results
        document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Generate recommendation text
    function generateRecommendation(psuWattage, upsCapacity, peakPower) {
        let recommendation = 'Based on your configuration, we recommend:';
        
        // PSU recommendation
        if (psuWattage < 400) {
            recommendation += '\n\n- A 80 Plus Bronze or better power supply in the 350W-450W range from reputable brands like Corsair CX series or Seasonic S12III.';
        } else if (psuWattage < 600) {
            recommendation += '\n\n- A 80 Plus Gold power supply in the 500W-650W range from brands like Corsair RMx, EVGA SuperNOVA G3, or Seasonic Focus.';
        } else if (psuWattage < 850) {
            recommendation += '\n\n- A high-quality 80 Plus Gold or Platinum power supply in the 650W-850W range from brands like Corsair RMx/HXi, EVGA SuperNOVA G6/P2, or Seasonic Prime.';
        } else {
            recommendation += '\n\n- A top-tier 80 Plus Platinum or Titanium power supply with 850W+ capacity from brands like Corsair AX, EVGA SuperNOVA P2/T2, or Seasonic Prime TX.';
        }
        
        // UPS recommendation
        if (upsCapacity > 0) {
            recommendation += `\n\n- A UPS system with at least ${upsCapacity}VA capacity for basic backup power. For longer runtime, consider a larger capacity unit.`;
            
            if (peakPower > 800) {
                recommendation += ' Given your high power requirements, look for a pure sine wave UPS for best compatibility.';
            }
        }
        
        // Efficiency note
        recommendation += '\n\nNote: Always choose a power supply from a reputable brand with good reviews. Higher efficiency ratings (Gold/Platinum) will save energy and produce less heat.';
        
        document.getElementById('recommendation-text').innerHTML = recommendation.replace(/\n/g, '<br>');
    }

    // Public API
    return {
        displayResults
    };
})();