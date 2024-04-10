console.log("welcome to spotify")
let songIndex = 0;
let audioElement = new Audio('song1.mp3');
let masterplay = document.getElementById('masterplay')
let myProgressBar = document.getElementById('myprogressBar');
let prevBtn = document.getElementById('prev');
let nextBtn = document.getElementById('next');
let songsItem = Array.from(document.getElementsByClassName('songitem')); 
let songs = [
    { songname: "let me love u", filepath: "song1.mp3", coverpath: "song1.jpg" },
    { songname: "we dont talk anymore", filepath: "song2.mp3", coverpath: "song2.jpg" },
];

// Function to load a new song
function loadSong(index) {
    audioElement.src = songs[index].filepath;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
}

// Display the first song initially
loadSong(songIndex);

// Loop through song items and set cover images
songsItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
});

// Handle play/pause click 
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    } else {
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
    }
});

// Listen to timeupdate event
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Handle seekbar change
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Handle previous song click
prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
});

// Handle next song click
nextBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
});
