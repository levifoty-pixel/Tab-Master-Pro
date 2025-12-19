const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    const target = item.getAttribute('data-view');

    views.forEach(v => v.classList.add('hidden'));
    document.getElementById(`view-${target}`).classList.remove('hidden');
  });
});
// Shortcut click logic
const shortcutCards = document.querySelectorAll('.shortcut-card');

shortcutCards.forEach(card => {
  card.addEventListener('click', () => {
    const target = card.getAttribute('data-view');
    if (!target) return;

    views.forEach(v => v.classList.add('hidden'));
    document.getElementById(`view-${target}`).classList.remove('hidden');
  });
});

// GENRE SEARCH FILTER
const genreSearch = document.getElementById('genre-search');
const genreDropdown = document.getElementById('genre-dropdown');

if (genreSearch) {
  genreSearch.addEventListener('input', () => {
    const filter = genreSearch.value.toLowerCase();
    const options = genreDropdown.querySelectorAll('option');

    options.forEach(option => {
      const text = option.textContent.toLowerCase();
      option.style.display = text.includes(filter) ? 'block' : 'none';
    });
  });
}
