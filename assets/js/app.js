/* ============================================
   TEACHER'S TOOLS
   Main Application Logic
   ============================================ */

let allTools = [];
let currentFilter = 'all';

// ============================================
// LOAD TOOLS
// ============================================
async function loadTools() {
  try {
    const response = await fetch('data/tools.json');
    const data = await response.json();
    allTools = data.tools;
    renderTools();
    updateCount();
  } catch (error) {
    console.error('Error loading tools:', error);
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
      <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px; color: var(--text-muted);">
        <div style="font-size: 40px; margin-bottom: 12px;">🔍</div>
        <p>No tools found in this category.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(tool => {
    const isSoon = tool.status === 'coming-soon';
    return `
      <a href="${isSoon ? '#' : tool.url}"
         class="tool-card ${isSoon ? 'coming-soon' : ''}"
         data-category="${tool.category}"
         ${isSoon ? 'onclick="return false;"' : ''}>
        <div class="tool-icon">${tool.icon}</div>
        <h3>${tool.name}</h3>
        <p>${tool.description}</p>
        <div class="tool-launch">
          ${isSoon ? 'Soon' : 'Launch →'}
        </div>
      </a>
    `;
  }).join('');
}

function updateCount() {
  const el = document.getElementById('toolsCount');
  if (el) {
    const count = currentFilter === 'all'
      ? allTools.length
      : allTools.filter(t => t.category === currentFilter).length;
    el.textContent = `${count} tool${count !== 1 ? 's' : ''}`;
  }
}

// ============================================
// FILTER
// ============================================
function setupFilters() {
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.dataset.filter;
      renderTools();
      updateCount();
    });
  });
}

function filterFromSidebar(category) {
  closeSidebar();
  currentFilter = category;
  document.querySelectorAll('.filter-pill').forEach(p => {
    p.classList.toggle('active', p.dataset.filter === category);
  });
  renderTools();
  updateCount();
  setTimeout(() => {
    document.getElementById('all-tools')?.scrollIntoView({ behavior: 'smooth' });
  }, 200);
}

// ============================================
// SIDEBAR
// ============================================
function openSidebar() {
  document.getElementById('sidebar').classList.add('active');
  document.getElementById('sidebarOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSidebar(event) {
  if (event && event.target && !event.target.classList.contains('sidebar-overlay')) return;
  document.getElementById('sidebar').classList.remove('active');
  document.getElementById('sidebarOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

// ============================================
// SEARCH
// ============================================
function openSearch() {
  document.getElementById('searchOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('searchInput').focus(), 100);
}

function closeSearch() {
  document.getElementById('searchOverlay').classList.remove('active');
  document.body.style.overflow = '';
  document.getElementById('searchInput').value = '';
  document.getElementById('searchResults').innerHTML = '';
}

function handleSearch(query) {
  const results = document.getElementById('searchResults');
  const q = query.trim().toLowerCase();

  if (!q) {
    results.innerHTML = '';
    return;
  }

  const matches = allTools.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.category.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q)
  );

  if (matches.length === 0) {
    results.innerHTML = `<div class="search-empty">No tools found for "${query}"</div>`;
    return;
  }

  results.innerHTML = matches.map(tool => `
    <a href="${tool.url}" class="search-result">
      <div class="search-result-icon">${tool.icon}</div>
      <div class="search-result-text">
        <h4>${tool.name}</h4>
        <p>${tool.category} · ${tool.description}</p>
      </div>
    </a>
  `).join('');
}

// Escape key closes overlays
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (document.getElementById('searchOverlay').classList.contains('active')) {
      closeSearch();
    } else if (document.getElementById('sidebar').classList.contains('active')) {
      closeSidebar();
    }
  }
});

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  loadTools();
  setupFilters();
});