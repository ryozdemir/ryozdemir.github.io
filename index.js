const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')


// Song titles

const songs = ['himiko-kikuchi-get-hot', 'hiromasa-suzuki-ratafia-japanese-jazz-funk-1977', 'hiromasa-suzuki-smash', 'horii-katsumi-project-greyhound', 'jiro-inagaki-soul-media-breeze', 'kazumi-watanabe-milestones', 'kifu-mitsuhashi-kiyoshi-yamaya-hanagasa-ondo-japanese-jazz-funk-1976', 'kiyoshi-sugimoto-yeh-boogie-1978', 'masaru-imada-trio-green-caterpillar-1975', 'my-little-partner-by-stomu-yamashtas-red-buddha-theatre-the-man-from-the-east-ilps9228', 'native-son-go-for-it-live-1979', 'sadao-watanabe-chaser-vinyl', 'space-circus-funky-caravan-a2-network']

// Keep track 0f songs

let songIndex = 0

// load song info Dom

loadSong(songs[songIndex])


// Update song details

function loadSong(song) {
    title.innerText = song
    audio.src = `japan_pl/${song}.mp3`
    // cover.src = `img/${song}.jpg` //

}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}

function prevSong() {
    songIndex--

    if (songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])

    playSong()

}

function nextSong() {
    songIndex++

    if (songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])

    playSong()

}


function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

// evet listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})


// change songs

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)


audio.addEventListener('timeupdate', updateProgress)


progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)


function toggleFullScreen(elem) {
    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}