// Bonus data and UI handler
class BonusCalculator {
  constructor() {
    this.bonuses = [];
    this.selectedBonuses = new Set();
    this.imageNameMap = {
      'Ocean Fishing Amateur': 'Ocean Fishing Amateur.png',
      'Ocean Fishing Enthusiast': 'Ocean Fishing Enthusiast.png',
      'Ocean Fishing Fanatic': 'Ocean Fishing Fanatic.png',
      'Small Fish in a Big Pond': 'Small Fish in a Big Pond.png',
      'Big Fish in a Small Pond': 'Big Fish in a Small Pond.png',
      'A Rare Catch': 'A Rare Catch.png',
      'Catch of a Lifetime': 'Catch of a Lifetime.png',
      'Give a Man a Fish': 'Give a Man a Fish.png',
      'Teach a Man to Fish': 'Teach a Man to Fish.png',
      'Fabled Fishers': 'Fabled Fishers.png',
      'Favored by Llymlaen': 'Favored by Llymlaen.png',
      'Bream Team: Galadion Bay': 'Bream Team Galadion Bay.png',
      'Bream Team: Southern Strait of Merlthor': 'Bream Team Southern Strait of Merlthor.png',
      'Bream Team: Cieldalaes': 'Bream Team Cieldalaes.png',
      'Bream Team: Northern Strait of Merlthor': 'Bream Team Northern Strait of Merlthor.png',
      'Bream Team: Rhotano Sea': 'Bream Team Rhotano Sea.png',
      'Bream Team: Bloodbrine Sea': 'Bream Team Bloodbrine Sea.png',
      'Bream Team: Rothlyt Sound': 'Bream Team Rothlyt Sound.png',
      'Octopus Travelers': 'Octopus Travelers.png',
      'Certifiable Shark Hunters': 'Certifiable Shark Hunters.png',
      'Jelled Together': 'Jelled Together.png',
      'Maritime Dragonslayers': 'Maritime Dragonslayers.png',
      'Balloon Catchers': 'Balloon Catchers.png',
      'Crab Boat Crew': 'Crab Boat Crew.png',
      'Sticking it to the Manta': 'Sticking it to the Manta.png',
      'Bream Team: Unnamed Island': 'Bream Team Unnamed Island.png',
      'Bream Team: Sirensong Sea': 'Bream Team Sirensong Sea.png',
      'Bream Team: Kugane Coast': 'Bream Team Kugane Coast.png',
      'Bream Team: Ruby Price': 'Bream Team Ruby Price.png',
      'Bream Team: Lower One River': 'Bream Team One River.png',
      'Bream Team: Thavnairian Coast': 'Bream Team Thavnair.png',
      'Maximum Mussel': 'Maximum Mussel.png',
      'Squid Squadron': 'Squid Squadron.png',
      'Shrimp Smorgasbord': 'Shrimp Smorgasbord.png',
      'Prehistoric Professionals': 'Prehistoric Professionals.png',
      'Time Waits for No Mantis': 'Time Waits for No Mantis.png'
    };
    this.init();
  }

  async init() {
    await this.loadBonuses();
    this.renderBonuses();
    this.setupEventListeners();
    this.calculatePoints();
  }

  async loadBonuses() {
    try {
      const response = await fetch('/bonuses/Ocean Fishing Bonuses.csv');
      const csv = await response.text();
      this.parseCSV(csv);
    } catch (error) {
      console.error('Error loading bonuses CSV:', error);
    }
  }

  parseCSV(csv) {
    const lines = csv.trim().split('\n');
    // Skip header
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim()) continue;

      // Parse CSV handling quoted fields
      const fields = this.parseCSVLine(line);
      if (fields.length >= 4) {
        this.bonuses.push({
          name: fields[0].trim(),
          requirement: fields[1].trim(),
          percent: parseInt(fields[2].trim()),
          order: parseInt(fields[3].trim()),
          route: (fields[4] || 'Generic').trim() || 'Generic',
          category: (fields[5] || 'Generic').trim() || 'Generic'
        });
      }
    }
    // Sort by order
    this.bonuses.sort((a, b) => a.order - b.order);
  }

  parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  }

  getImagePath(bonusName) {
    const imageName = this.imageNameMap[bonusName];
    if (imageName) {
      return `/img/bonuses/${imageName}`;
    }
    return null;
  }

  renderBonuses() {
    const grid = document.getElementById('bonusesGrid');
    grid.innerHTML = '';

    const routeGroups = new Map();
    this.bonuses.forEach((bonus, index) => {
      const route = bonus.route || 'Generic';
      if (!routeGroups.has(route)) {
        routeGroups.set(route, []);
      }
      routeGroups.get(route).push({ bonus, index });
    });

    routeGroups.forEach((items, route) => {
      const section = document.createElement('section');
      section.className = 'bonus-route-section';

      const routeGrid = document.createElement('div');
      routeGrid.className = 'bonus-route-grid';

      items.forEach(({ bonus, index }) => {
        const card = document.createElement('div');
        card.className = 'bonus-card';
        card.dataset.index = index;
        card.dataset.percent = bonus.percent;
        card.setAttribute('title', bonus.requirement);
        card.setAttribute('data-bs-toggle', 'tooltip');
        card.setAttribute('data-bs-placement', 'top');

        const imagePath = this.getImagePath(bonus.name);
        const imageHtml = imagePath
          ? `<img src="${imagePath}" alt="${bonus.name}" class="bonus-image">`
          : `<div class="bonus-image" style="display: flex; align-items: center; justify-content: center; background: #f0f0f0; border-radius: 4px;">No image</div>`;

        card.innerHTML = `
          ${imageHtml}
          <div class="bonus-name">${bonus.name}</div>
          <div class="bonus-percentage">+${bonus.percent}%</div>
        `;

        card.addEventListener('click', () => this.toggleBonus(index, card));
        routeGrid.appendChild(card);
      });

      if (route.toLowerCase() !== 'generic') {
        const heading = document.createElement('h3');
        heading.className = 'bonus-route-title';
        heading.textContent = route;
        section.appendChild(heading);
      }
      section.appendChild(routeGrid);
      grid.appendChild(section);
    });

    this.initializeCardTooltips();
  }

  initializeCardTooltips() {
    if (typeof bootstrap === 'undefined' || !bootstrap.Tooltip) {
      return;
    }

    document.querySelectorAll('.bonus-card').forEach(el => {
      bootstrap.Tooltip.getOrCreateInstance(el);
    });
  }

  toggleBonus(index, card) {
    if (card.classList.contains('disabled')) {
      return;
    }

    const bonusRoute = (this.bonuses[index].route || '').toLowerCase();
    const activeSpecificRoute = this.getActiveSpecificRoute();

    if (
      !this.selectedBonuses.has(index) &&
      (bonusRoute === 'indigo' || bonusRoute === 'ruby') &&
      activeSpecificRoute &&
      bonusRoute !== activeSpecificRoute
    ) {
      return;
    }

    if (this.selectedBonuses.has(index)) {
      this.selectedBonuses.delete(index);
      card.classList.remove('selected');
    } else {
      this.selectedBonuses.add(index);
      card.classList.add('selected');
    }
    this.updateCalculation();
  }

  updateTotal() {
    let total = 0;
    this.selectedBonuses.forEach(index => {
      total += this.bonuses[index].percent;
    });

    const totalDisplay = document.getElementById('totalBonus');
    totalDisplay.textContent = total + '%';

    // Update color based on total
    totalDisplay.classList.remove('high', 'very-high');
    if (total >= 150) {
      totalDisplay.classList.add('very-high');
    } else if (total >= 75) {
      totalDisplay.classList.add('high');
    }
  }

  updateSelectedIcons() {
    const iconsContainer = document.getElementById('selectedIcons');
    iconsContainer.innerHTML = '';

    // Sort selected bonuses by their order
    const sortedIndices = Array.from(this.selectedBonuses).sort(
      (a, b) => this.bonuses[a].order - this.bonuses[b].order
    );

    sortedIndices.forEach(index => {
      const bonus = this.bonuses[index];
      const imagePath = this.getImagePath(bonus.name);
      
      if (imagePath) {
        const iconEl = document.createElement('div');
        iconEl.className = 'selected-icon';
        iconEl.title = `${bonus.name} (+${bonus.percent}%)`;
        iconEl.setAttribute('data-bs-toggle', 'tooltip');
        iconEl.setAttribute('data-bs-placement', 'top');
        iconEl.innerHTML = `<img src="${imagePath}" alt="${bonus.name}">`;
        
        iconsContainer.appendChild(iconEl);
      }
    });

    // Reinitialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
      document.querySelectorAll('.selected-icon').forEach(el => {
        new bootstrap.Tooltip(el);
      });
    }
  }

  setupEventListeners() {
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', () => this.resetAll());

    const pointsInput = document.getElementById('pointsInput');
    pointsInput.addEventListener('input', () => this.updateCalculation());
  }

  updateCalculation() {
    this.updateRouteLocks();
    this.updateTotal();
    this.updateSelectedIcons();
    this.calculatePoints();
  }

  getActiveSpecificRoute() {
    let hasIndigo = false;
    let hasRuby = false;

    this.selectedBonuses.forEach(index => {
      const route = (this.bonuses[index].route || '').toLowerCase();
      if (route === 'indigo') {
        hasIndigo = true;
      }
      if (route === 'ruby') {
        hasRuby = true;
      }
    });

    if (hasIndigo && !hasRuby) return 'indigo';
    if (hasRuby && !hasIndigo) return 'ruby';
    return null;
  }

  updateRouteLocks() {
    const activeSpecificRoute = this.getActiveSpecificRoute();
    const selectedCategories = new Set();

    this.selectedBonuses.forEach(index => {
      const category = (this.bonuses[index].category || 'generic').toLowerCase();
      if (category && category !== 'generic') {
        selectedCategories.add(category);
      }
    });

    const cards = document.querySelectorAll('.bonus-card');

    cards.forEach(card => {
      const index = parseInt(card.dataset.index, 10);
      const route = (this.bonuses[index].route || '').toLowerCase();
      const category = (this.bonuses[index].category || 'generic').toLowerCase();
      const isSelected = this.selectedBonuses.has(index);

      let shouldDisable = false;
      if (activeSpecificRoute === 'indigo' && route === 'ruby') {
        shouldDisable = true;
      }
      if (activeSpecificRoute === 'ruby' && route === 'indigo') {
        shouldDisable = true;
      }
      if (!isSelected && category !== 'generic' && selectedCategories.has(category)) {
        shouldDisable = true;
      }

      card.classList.toggle('disabled', shouldDisable);
      card.setAttribute('aria-disabled', shouldDisable ? 'true' : 'false');
    });
  }

  calculatePoints() {
    const pointsInput = document.getElementById('pointsInput');
    const basePoints = parseInt(pointsInput.value) || 0;

    // Calculate total bonus percentage
    let totalBonus = 0;
    this.selectedBonuses.forEach(index => {
      totalBonus += this.bonuses[index].percent;
    });

    // Calculate multiplier (1 + bonus/100)
    const multiplier = 1 + (totalBonus / 100);

    // Calculate total points
    const totalPoints = Math.floor(basePoints * multiplier);

    // Update display
    document.getElementById('basePointsDisplay').textContent = basePoints.toLocaleString();
    document.getElementById('multiplierDisplay').textContent = multiplier.toFixed(2) + 'x';
    document.getElementById('totalPointsDisplay').textContent = totalPoints.toLocaleString();

    // Update bonus info for target section
    document.getElementById('currentBonusDisplay').textContent = totalBonus + '%';
    document.getElementById('currentMultiplierDisplay').textContent = '(' + multiplier.toFixed(2) + 'x)';

    // Calculate required points for targets
    this.calculateTargetPoints(multiplier);
  }

  calculateTargetPoints(multiplier) {
    const targets = [
      { id: 'required-5k', bonusId: 'bonus-5k', value: 5000 },
      { id: 'required-10k', bonusId: 'bonus-10k', value: 10000 },
      { id: 'required-16k', bonusId: 'bonus-16k', value: 16000 },
      { id: 'required-20k', bonusId: 'bonus-20k', value: 20000 }
    ];

    // Calculate total bonus percentage
    let totalBonus = 0;
    this.selectedBonuses.forEach(index => {
      totalBonus += this.bonuses[index].percent;
    });

    targets.forEach(target => {
      const requiredBasePoints = Math.ceil(target.value / multiplier);
      const element = document.getElementById(target.id);
      const bonusElement = document.getElementById(target.bonusId);
      
      element.textContent = requiredBasePoints.toLocaleString();
      bonusElement.textContent = '+' + totalBonus + '%';
    });
  }

  resetAll() {
    this.selectedBonuses.clear();
    document.querySelectorAll('.bonus-card').forEach(card => {
      card.classList.remove('selected');
    });
    this.updateCalculation();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new BonusCalculator();
});
