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

// SONG SEARCH BAR LOGIC
const songSearch = document.getElementById('songSearch');
const songList = document.getElementById('songList');

songSearch.addEventListener('input', () => {
  // This is placeholder logic — real filtering will come when songs are added
  const query = songSearch.value.toLowerCase();
  const songs = songList.querySelectorAll('.song-item');

  songs.forEach(song => {
    const title = song.textContent.toLowerCase();
    song.style.display = title.includes(query) ? 'block' : 'none';
  });
});

// MODE SWITCHING
const simpleBtn = document.getElementById("simpleMode");
const customBtn = document.getElementById("customMode");

const simpleContent = document.getElementById("simpleContent");
const customContent = document.getElementById("customContent");

// Switch to Simple Mode
simpleBtn.addEventListener("click", () => {
  simpleBtn.classList.add("mode-active");
  customBtn.classList.remove("mode-active");

  simpleContent.classList.remove("hidden");
  customContent.classList.add("hidden");
});

// Switch to Custom Mode
customBtn.addEventListener("click", () => {
  customBtn.classList.add("mode-active");
  simpleBtn.classList.remove("mode-active");

  customContent.classList.remove("hidden");
  simpleContent.classList.add("hidden");
});

// MOCK SONG GENERATOR
function mockGenerateSong({ title, vibe, lyrics, instrumental }) {
  const id = Date.now();

  return {
    id,
    title: title || "Untitled Track",
    vibe: vibe || "Unknown vibe",
    lyrics: lyrics || "",
    instrumental: instrumental || false,
    audioUrl: "placeholder.mp3", // your fake audio file
    createdAt: new Date().toLocaleString()
  };
}

function addSongToList(song) {
  const list = document.getElementById("songList");

  // Remove "Create your first song" message
  const emptyMsg = list.querySelector(".empty-message");
  if (emptyMsg) emptyMsg.remove();

  const item = document.createElement("div");
  item.classList.add("song-item");

  item.innerHTML = `
    <h4>${song.title}</h4>
    <p><strong>Vibe:</strong> ${song.vibe}</p>
    <audio controls src="${song.audioUrl}"></audio>
    <p class="timestamp">${song.createdAt}</p>
  `;

  list.appendChild(item);
}

document.getElementById("createSongBtn").addEventListener("click", () => {
  const vibe = document.getElementById("vibeInput").value;

  const song = mockGenerateSong({
    title: "Generated Song",
    vibe,
    instrumental: false
  });

  addSongToList(song);
});

document.getElementById("createSongBtnCustom").addEventListener("click", () => {
  const title = document.getElementById("songTitle").value;
  const lyrics = document.getElementById("lyricsInput").value;
  const vibe = document.getElementById("customVibe").value;

  const song = mockGenerateSong({
    title,
    lyrics,
    vibe,
    instrumental: false
  });

  addSongToList(song);
});

window.addEventListener("DOMContentLoaded", () => {
  const createBtn = document.getElementById("createSongBtn");

  if (!createBtn) {
    console.error("createSongBtn not found");
    return;
  }

  createBtn.addEventListener("click", () => {
    console.log("Create button clicked");

    const userPrompt = document.getElementById("vibeInput").value;

    fetch("https://ss-backend-sp3m.onrender.com/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userPrompt })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Audio URL:", data.audio_url);

        const songList = document.getElementById("songList");
        songList.innerHTML = `
          <p>Vibe: ${userPrompt}</p>
          <audio controls>
            <source src="${data.audio_url}" type="audio/mpeg">
          </audio>
          <p>${new Date().toLocaleString()}</p>
        `;
      })
      .catch(err => {
        console.error("Error generating song:", err);
      });
  });
});
