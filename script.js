// Data
const categories = {
  tops: [
    { id: 'tshirt', name: 'T-Shirt', icon: '👕', path: 'M70 115 Q100 110 130 115 L135 200 Q100 210 65 200 Z' },
    { id: 'blouse', name: 'Blouse', icon: '👚', path: 'M65 115 Q100 105 135 115 L140 195 Q100 215 60 195 Z' },
    { id: 'hoodie', name: 'Hoodie', icon: '🧥', path: 'M60 110 Q100 100 140 110 L145 210 Q100 225 55 210 Z' },
    { id: 'crop', name: 'Crop Top', icon: '✨', path: 'M72 115 Q100 112 128 115 L130 165 Q100 175 70 165 Z' }
  ],
  trousers: [
    { id: 'jeans', name: 'Jeans', icon: '👖', path: 'M78 230 L70 420 L90 420 L100 280 L110 420 L130 420 L122 230 Z' },
    { id: 'chinos', name: 'Chinos', icon: '🩳', path: 'M80 230 L75 415 L95 415 L100 275 L105 415 L125 415 L120 230 Z' },
    { id: 'shorts', name: 'Shorts', icon: '🩳', path: 'M78 230 L72 320 L95 320 L100 250 L105 320 L128 320 L122 230 Z' },
    { id: 'skirt', name: 'Skirt', icon: '👗', path: 'M75 230 Q100 235 125 230 L140 340 Q100 360 60 340 Z' }
  ],
  dresses: [
    { id: 'sundress', name: 'Sundress', icon: '👗', path: 'M70 115 Q100 108 130 115 L145 380 Q100 410 55 380 Z' },
    { id: 'midi', name: 'Midi Dress', icon: '💃', path: 'M68 115 Q100 105 132 115 L140 350 Q100 375 60 350 Z' },
    { id: 'gown', name: 'Gown', icon: '👑', path: 'M65 115 Q100 100 135 115 L155 420 Q100 450 45 420 Z' },
    { id: 'shift', name: 'Shift', icon: '🎀', path: 'M72 115 Q100 112 128 115 L135 300 Q100 320 65 300 Z' }
  ],
  jackets: [
    { id: 'blazer', name: 'Blazer', icon: '🧥', path: 'M55 110 Q100 95 145 110 L150 230 Q100 250 50 230 Z' },
    { id: 'bomber', name: 'Bomber', icon: '✈️', path: 'M58 112 Q100 100 142 112 L148 215 Q100 235 52 215 Z' },
    { id: 'denimj', name: 'Denim Jacket', icon: '🧢', path: 'M60 115 Q100 105 140 115 L145 220 Q100 240 55 220 Z' },
    { id: 'coat', name: 'Coat', icon: '🧣', path: 'M50 105 Q100 90 150 105 L155 280 Q100 300 45 280 Z' }
  ],
  fabrics: [
    { id: 'solid', name: 'Solid', class: 'fabric-solid' },
    { id: 'stripes', name: 'Stripes', class: 'fabric-stripes' },
    { id: 'polka', name: 'Polka', class: 'fabric-polka' },
    { id: 'plaid', name: 'Plaid', class: 'fabric-plaid' },
    { id: 'denim', name: 'Denim', class: 'fabric-denim' },
    { id: 'silk', name: 'Silk', class: 'fabric-silk' },
    { id: 'leather', name: 'Leather', class: 'fabric-leather' },
    { id: 'knit', name: 'Knit', class: 'fabric-knit' }
  ]
};

const colors = [
  '#e63946', '#f4a261', '#e9c46a', '#2a9d8f',
  '#264653', '#023e8a', '#0077b6', '#00b4d8',
  '#ffffff', '#000000', '#6d6875', '#b5838d',
  '#ffb4a2', '#e5989b', '#9b5de5', '#00f5d4'
];

// State
let currentCategory = 'tops';
let selectedItems = {
  top: null,
  trousers: null,
  dress: null,
  jacket: null
};
let currentColor = '#e63946';
let currentFabric = 'solid';
let activeLayer = 'top';

// DOM
const itemsGrid = document.getElementById('itemsGrid');
const itemsTitle = document.getElementById('itemsTitle');
const colorPalette = document.getElementById('colorPalette');
const fabricGrid = document.getElementById('fabricGrid');
const selectedItemEl = document.getElementById('selectedItem');
const selectedColorEl = document.getElementById('selectedColor');
const selectedFabricEl = document.getElementById('selectedFabric');

// Init
function init() {
  renderCategoryButtons();
  renderItems();
  renderColors();
  renderFabrics();
  updateInfo();
}

function renderCategoryButtons() {
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      itemsTitle.textContent = btn.textContent;
      renderItems();
    });
  });
}

function renderItems() {
  itemsGrid.innerHTML = '';
  const items = categories[currentCategory];

  items.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'item-btn';
    btn.innerHTML = `<span class="icon">${item.icon || ''}</span><span>${item.name}</span>`;
    
    if (currentCategory !== 'fabrics') {
      const layer = mapCategoryToLayer(currentCategory);
      if (selectedItems[layer] && selectedItems[layer].id === item.id) {
        btn.classList.add('selected');
      }
    } else if (currentFabric === item.id) {
      btn.classList.add('selected');
    }

    btn.addEventListener('click', () => {
      if (currentCategory === 'fabrics') {
        currentFabric = item.id;
        applyFabricToActive();
      } else {
        const layer = mapCategoryToLayer(currentCategory);
        selectedItems[layer] = item;
        activeLayer = layer;
        applyClothing(layer, item);
      }
      renderItems();
      updateInfo();
    });

    itemsGrid.appendChild(btn);
  });
}

function mapCategoryToLayer(cat) {
  const map = { tops: 'top', trousers: 'trousers', dresses: 'dress', jackets: 'jacket' };
  return map[cat] || 'top';
}

function applyClothing(layer, item) {
  const el = document.getElementById(layer);
  if (!el) return;

  // Clear conflicting layers (dress vs top+trousers)
  if (layer === 'dress') {
    clearLayer('top');
    clearLayer('trousers');
    selectedItems.top = null;
    selectedItems.trousers = null;
  } else if (layer === 'top' || layer === 'trousers') {
    clearLayer('dress');
    selectedItems.dress = null;
  }

  el.setAttribute('d', item.path);
  el.setAttribute('fill', currentColor);
  el.setAttribute('stroke', '#222');
  el.setAttribute('stroke-width', '1.5');
  applyFabricPattern(el);
}

function clearLayer(layer) {
  const el = document.getElementById(layer);
  if (el) {
    el.setAttribute('d', '');
    el.setAttribute('fill', 'none');
  }
}

function applyFabricToActive() {
  const layers = ['top', 'trousers', 'dress', 'jacket'];
  layers.forEach(l => {
    if (selectedItems[l]) {
      const el = document.getElementById(l);
      applyFabricPattern(el);
    }
  });
}

function applyFabricPattern(el) {
  el.style.filter = '';
  switch (currentFabric) {
    case 'denim':
      el.setAttribute('fill', '#3a5f8a');
      break;
    case 'leather':
      el.setAttribute('fill', '#4a3728');
      break;
    case 'silk':
      el.setAttribute('fill', '#e8d5a3');
      break;
    default:
      el.setAttribute('fill', currentColor);
  }
}

function renderColors() {
  colorPalette.innerHTML = '';
  colors.forEach(c => {
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    swatch.style.background = c;
    if (c === currentColor) swatch.classList.add('active');
    
    swatch.addEventListener('click', () => {
      currentColor = c;
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      
      const layers = ['top', 'trousers', 'dress', 'jacket'];
      layers.forEach(l => {
        if (selectedItems[l]) {
          const el = document.getElementById(l);
          if (['solid', 'polka', 'plaid', 'stripes', 'knit'].includes(currentFabric)) {
            el.setAttribute('fill', currentColor);
          }
        }
      });
      updateInfo();
    });
    colorPalette.appendChild(swatch);
  });
}

function renderFabrics() {
  fabricGrid.innerHTML = '';
  categories.fabrics.forEach(f => {
    const btn = document.createElement('button');
    btn.className = `fabric-btn ${f.class}`;
    btn.textContent = f.name;
    if (currentFabric === f.id) btn.classList.add('selected');
    
    btn.addEventListener('click', () => {
      currentFabric = f.id;
      document.querySelectorAll('.fabric-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      applyFabricToActive();
      updateInfo();
    });
    fabricGrid.appendChild(btn);
  });
}

function updateInfo() {
  const active = Object.entries(selectedItems).find(([k, v]) => v);
  selectedItemEl.textContent = active ? active[1].name : 'None';
  selectedColorEl.textContent = currentColor;
  selectedFabricEl.textContent = currentFabric.charAt(0).toUpperCase() + currentFabric.slice(1);
}

// Buttons
document.getElementById('resetBtn').addEventListener('click', () => {
  selectedItems = { top: null, trousers: null, dress: null, jacket: null };
  ['top', 'trousers', 'dress', 'jacket'].forEach(clearLayer);
  currentColor = '#e63946';
  currentFabric = 'solid';
  renderItems();
  renderColors();
  renderFabrics();
  updateInfo();
});

document.getElementById('exportBtn').addEventListener('click', () => {
  alert('Look exported! (In a real app this would download an image or save the design)');
});

// Start
init();
