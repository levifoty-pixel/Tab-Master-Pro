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
