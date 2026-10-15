/* ============================================
   TEACHER TOOLS STUDIO
   Main Application Logic
   By Akash Srivastva
   ============================================ */

// ============================================
// GLOBAL STATE
// ============================================
let allTools = [];
let currentFilter = 'all';

// ============================================
// LOAD TOOLS FROM JSON
// ============================================
async function loadTools() {
  try {
    const response = await fetch('data/tools.json');
    if (!response.ok) throw new Error('Failed to load tools');
    const data = await response.json();
    allTools = data.tools;
    renderTools();
  } catch (error) {
    console.error('Error loading tools:', error);
    document.getElementById('toolsGrid').innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <div class="empty-state-icon">⚠️</div>
        <h3>Could not load tools</h3>
        <p>Please refresh the page or check your connection.</p>
      </div>
    `;
  }
}

// ============================================
// RENDER TOOLS
// ============================================
function renderTools() {
  const grid = document.getElementById('toolsGrid');
  const filtered = currentFilter === 'all'
    ? allTools
    : allTools.filter(t => t.category === currentFilter);

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <div class="empty-state-icon">🔍</div>
        <h3>No tools found</h3>
        <p>Try a different category.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map((tool, index) => {
    const isSoon = tool.status === 'coming-soon';
    const badgeClass = isSoon ? 'badge-soon' : 'badge-ready';
    const badgeText = isSoon ? 'Coming Soon' : 'Ready';
    const cardClass = isSoon ? 'tool-card coming-soon' : 'tool-card';
    const delay = (index * 0.04).toFixed(2);

    return `
      <a href="${tool.url}" 
         class="${cardClass}" 
         data-category="${tool.category}"
         style="animation-delay: ${delay}s">
        <div class="tool-card-top">
          <div class="tool-icon">${tool.icon}</div>
          <span class="tool-badge ${badgeClass}">${badgeText}</span>
        </div>
        <h3>${tool.name}</h3>
        <p>${tool.description}</p>
        <div class="tool-card-footer">
          <span class="tool-category">${tool.category}</span>
          <span class="tool-open">
            ${isSoon ? 'Preview' : 'Open Tool'} →
          </span>
        </div>
      </a>
    `;
  }).join('');
}

// ============================================
// FILTER HANDLING
// ============================================
function setupFilters() {
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.dataset.filter;
      renderTools();
    });
  });
}

// ============================================
// MOBILE DRAWER
// ============================================
function openDrawer() {
  document.getElementById('drawer').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  document.getElementById('drawer').classList.remove('active');
  document.body.style.overflow = '';
}

function closeDrawerOnBg(event) {
  if (event.target.id === 'drawer') closeDrawer();
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  loadTools();
  setupFilters();
});