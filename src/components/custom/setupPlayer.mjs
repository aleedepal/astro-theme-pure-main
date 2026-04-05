import { currentIndex } from "./MusicPlayer.astro.inline.mjs";

export const setupPlayer = () => {
const audio = document.getElementById('main-audio') as HTMLAudioElement;
const btn = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');

const loadSong = (index) => {
currentIndex = index;
audio.src = playlist[index].src;

// This tells the browser exactly what the file is
if (playlist[index].src.endsWith('.weba')) {
audio.type = 'audio/webm';
} else {
audio.type = 'audio/mpeg'; // for mp3
}

titleDisp.innerText = playlist[index].title;
audio.load(); // Force the browser to reload the new source
};

// Initialize first song
if (!audio.src || audio.src === "") {
loadSong(0);
}

btn?.addEventListener('click', () => {
if (audio.paused) {
audio.play();
playIcon.classList.add('hidden');
pauseIcon.classList.remove('hidden');
} else {
audio.pause();
playIcon.classList.remove('hidden');
pauseIcon.classList.add('hidden');
}
});

nextBtn?.addEventListener('click', () => {
currentIndex = (currentIndex + 1) % playlist.length;
loadSong(currentIndex);
audio.play();
playIcon.classList.add('hidden');
pauseIcon.classList.remove('hidden');
});

prevBtn?.addEventListener('click', () => {
currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
loadSong(currentIndex);
audio.play();
});

// Auto-play next song
audio.addEventListener('ended', () => nextBtn.click());
};
