// Mock crop database (simplified for demo)
const cropDatabase = {
    wheat: { name: "Wheat - Variety A", yield: "4-6 tons/ha", pests: ["Aphids", "Rust"], soil: "Well-drained loamy" },
    corn: { name: "Corn - Variety B", yield: "8-10 tons/ha", pests: ["Corn borer", "Fusarium"], soil: "Fertile, well-drained" },
    rice: { name: "Rice - Variety C", yield: "5-7 tons/ha", pests: ["Rice blast", "Brown planthopper"], soil: "Clay or clay-loam" },
    soybean: { name: "Soybean - Variety D", yield: "2-3 tons/ha", pests: ["Soybean cyst nematode", "Aphids"], soil: "Well-drained, fertile" },
    barley: { name: "Barley - Variety E", yield: "3-5 tons/ha", pests: ["Powdery mildew", "Barley yellow dwarf"], soil: "Loamy, well-drained" },
    oats: { name: "Oats - Variety F", yield: "2-4 tons/ha", pests: ["Crown rust", "Aphids"], soil: "Fertile, moist" },
    potato: { name: "Potato - Variety G", yield: "20-30 tons/ha", pests: ["Colorado potato beetle", "Late blight"], soil: "Sandy loam" },
    tomato: { name: "Tomato - Variety H", yield: "50-80 tons/ha", pests: ["Tomato hornworm", "Fusarium wilt"], soil: "Well-drained, fertile" },
    lettuce: { name: "Lettuce - Variety I", yield: "10-15 tons/ha", pests: ["Aphids", "Downy mildew"], soil: "Rich, well-drained" },
    carrot: { name: "Carrot - Variety J", yield: "30-50 tons/ha", pests: ["Carrot fly", "Alternaria leaf blight"], soil: "Sandy, loose" }
    // Add more entries to reach 500+ varieties
};

// Navigation
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
}

// Crop Selection
document.getElementById('crop-select').addEventListener('change', function() {
    const crop = this.value;
    const info = cropDatabase[crop];
    if (info) {
        document.getElementById('crop-info').innerHTML = `
            <h3>${info.name}</h3>
            <p><strong>Expected Yield:</strong> ${info.yield}</p>
            <p><strong>Common Pests:</strong> ${info.pests.join(', ')}</p>
            <p><strong>Preferred Soil:</strong> ${info.soil}</p>
        `;
    } else {
        document.getElementById('crop-info').innerHTML = '';
    }
});

// Yield Predictor
document.getElementById('yield-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const soilType = document.getElementById('soil-type').value;
    const weather = document.getElementById('weather').value;
    const area = parseFloat(document.getElementById('area').value);
    
    // Simple mock calculation (in reality, this would use complex models)
    let baseYield = 5; // tons/ha
    if (soilType === 'loamy') baseYield += 1;
    if (weather === 'temperate') baseYield += 0.5;
    
    const totalYield = baseYield * area;
    const optimizedYield = totalYield * 1.2; // 20% increase from ScaleDown
    
    document.getElementById('yield-result').innerHTML = `
        <h3>Yield Prediction</h3>
        <p>Base Yield: ${totalYield.toFixed(2)} tons</p>
        <p>Optimized Yield : ${optimizedYield.toFixed(2)} tons</p>
        <p>Improvement: ${(totalYield * 0.2).toFixed(2)} tons (+20%)</p>
    `;
});

// Pest/Disease Identifier
function identifyPest() {
    const symptoms = document.getElementById('symptoms').value.toLowerCase();
    let identified = "Unknown";
    
    if (symptoms.includes('yellow') && symptoms.includes('spots')) {
        identified = "Rust disease";
    } else if (symptoms.includes('holes') && symptoms.includes('leaves')) {
        identified = "Leaf beetle pest";
    } else if (symptoms.includes('wilting') && symptoms.includes('brown')) {
        identified = "Fusarium wilt";
    }
    
    document.getElementById('pest-result').innerHTML = `
        <h3>Identification Result</h3>
        <p><strong>Possible Issue:</strong> ${identified}</p>
        <p><em>Note: This is a simplified demo. Real identification would use AI image analysis.</em></p>
    `;
}

// Soil Analysis
function analyzeSoil() {
    const ph = parseFloat(document.getElementById('ph').value);
    const nitrogen = parseFloat(document.getElementById('nitrogen').value);
    const phosphorus = parseFloat(document.getElementById('phosphorus').value);
    const potassium = parseFloat(document.getElementById('potassium').value);
    
    let analysis = "<h3>Soil Analysis</h3>";
    
    if (ph < 6) analysis += "<p>pH is acidic. Consider liming.</p>";
    else if (ph > 7.5) analysis += "<p>pH is alkaline. May need sulfur amendment.</p>";
    else analysis += "<p>pH is optimal.</p>";
    
    if (nitrogen < 0.1) analysis += "<p>Low nitrogen. Add nitrogen fertilizer.</p>";
    else analysis += "<p>Nitrogen levels adequate.</p>";
    
    if (phosphorus < 0.05) analysis += "<p>Low phosphorus. Apply phosphorus fertilizer.</p>";
    else analysis += "<p>Phosphorus levels adequate.</p>";
    
    if (potassium < 0.2) analysis += "<p>Low potassium. Add potassium fertilizer.</p>";
    else analysis += "<p>Potassium levels adequate.</p>";
    
    document.getElementById('soil-result').innerHTML = analysis;
}

// Climate Adaptation
function suggestCrops() {
    const temp = parseFloat(document.getElementById('temperature').value);
    const rainfall = parseFloat(document.getElementById('rainfall').value);
    
    let suggestions = [];
    
    if (temp > 20 && rainfall > 1000) {
        suggestions = ["Rice", "Sugarcane", "Banana"];
    } else if (temp > 15 && rainfall > 500) {
        suggestions = ["Corn", "Soybean", "Wheat"];
    } else if (temp > 10 && rainfall > 300) {
        suggestions = ["Barley", "Oats", "Potato"];
    } else {
        suggestions = ["Cold-hardy varieties of wheat or barley"];
    }
    
    document.getElementById('climate-suggestions').innerHTML = `
        <h3>Crop Suggestions</h3>
        <p>Based on ${temp}°C and ${rainfall}mm rainfall:</p>
        <ul>${suggestions.map(crop => `<li>${crop}</li>`).join('')}</ul>
    `;
}