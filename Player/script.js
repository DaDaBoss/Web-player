const musics = [

    {
        id: 1,
        element: document.getElementById('first'),
        title: "Michael Jackson - Bilie Jean",
        image: "images/Michael Jackson - Bilie Jean.jpg",
        music: "muzika/Michael Jackson - Bilie Jean.mp3"
    },
    {
        id: 2,
        element: document.getElementById('second'),
        title: "Дурной Вкус - звук и темнота",
        image: "images/Дурной Вкус - звук и темнота.jpg",
        music: "muzika/Дурной Вкус - звук и темнота.mp3"
    },
    {
        id: 3,
        element: document.getElementById('third'),
        title: "Король и Шут – Дайте людям рому!",
        image: "images/Король и Шут – Дайте людям рому!.jpg",
        music: "muzika/Король и Шут – Дайте людям рому!.mp3"
    },
    {
        id: 4,
        element: document.getElementById('fourth'),
        title: "лампабикт - Крылья",
        image: "images/лампабикт - Крылья.jpg",
        music: "muzika/лампабикт - Крылья.mp3"
    },
    {
        id: 5,
        element: document.getElementById('fifth'),
        title: "Цой - Перемен!",
        image: "images/Цой - Перемен!.jpg",
        music: "muzika/Цой - Перемен!.mp3"
    },
    
]

function getMusicById(id) {
    return musics[id - 1]
}



function prev() {
    if (id_track_play_in_now > 1) {


        const music_previous = getMusicById(id_track_play_in_now)
        music_previous.element.classList.remove('play')
        music_previous.element.getElementsByTagName('img')[0].src = "svg/play.svg"

        id_track_play_in_now--;

        
        loadMusic(getMusicById(id_track_play_in_now))

        if (!audioCtx) {

            audioCtx = new (window.AudioContext || window.webkitAudioContext);
            source = audioCtx.createMediaElementSource(player_of_music);
            analyser = audioCtx.createAnalyser();
        }
    
        analyser.fftSize = columnCount;
        source.connect(analyser); // Подключаем анализатор к элементу audio
        analyser.connect(audioCtx.destination); // Без этой строки нет звука, но анализатор работает.
        frequencyData = new Uint8Array(analyser.frequencyBinCount);
    
        window.requestAnimationFrame(render)

        photo.src = getMusicById(id_track_play_in_now).image
        getMusicById(id_track_play_in_now).element.classList.add('play');
        getMusicById(id_track_play_in_now).element.getElementsByTagName('img')[0].src = "svg/pause.svg"
        play_or_pause.src = "svg/pause.svg"
        music_title.innerText = getMusicById(id_track_play_in_now).title
        is_play = true;

        player_of_music.play()


        time_on_time_line = 0

    }
}

function next() {
    if (id_track_play_in_now < musics.length) {


        const music_previous = getMusicById(id_track_play_in_now)
        music_previous.element.classList.remove('play')
        music_previous.element.getElementsByTagName('img')[0].src = "svg/play.svg"

        id_track_play_in_now++;
        loadMusic(getMusicById(id_track_play_in_now))

        if (!audioCtx) {

            audioCtx = new (window.AudioContext || window.webkitAudioContext);
            source = audioCtx.createMediaElementSource(player_of_music);
            analyser = audioCtx.createAnalyser();
        }
    
        analyser.fftSize = columnCount;
        source.connect(analyser); // Подключаем анализатор к элементу audio
        analyser.connect(audioCtx.destination); // Без этой строки нет звука, но анализатор работает.
        frequencyData = new Uint8Array(analyser.frequencyBinCount);
    
        window.requestAnimationFrame(render)



        photo.src = getMusicById(id_track_play_in_now).image
        getMusicById(id_track_play_in_now).element.classList.add('play');
        getMusicById(id_track_play_in_now).element.getElementsByTagName('img')[0].src = "svg/pause.svg"
        play_or_pause.src = "svg/pause.svg"
        music_title.innerText = getMusicById(id_track_play_in_now).title
        is_play = true;

        player_of_music.play()


        
        time_on_time_line = 0

    }
}

var id_track_play_in_now = 1;
var is_play = false;


for (var i = 0; i < musics.length; i++) {

    const music = musics[i];

    music.element.addEventListener('click', () => {

        if (id_track_play_in_now === music.id) {
            if (is_play) {
                music.element.getElementsByTagName('img')[0].src = "svg/play.svg"
                play_or_pause.src = "svg/play.svg"
                is_play = false
                player_of_music.pause()
            } else {
                music.element.getElementsByTagName('img')[0].src = "svg/pause.svg"
                play_or_pause.src = "svg/pause.svg"
                is_play = true
                player_of_music.play()
            }
        }

        else {



            if (id_track_play_in_now > 0) {
                const music_previous = getMusicById(id_track_play_in_now)
                music_previous.element.classList.remove('play')
                music_previous.element.getElementsByTagName('img')[0].src = "svg/play.svg"
            }
    
            photo.src = music.image
            id_track_play_in_now = music.id;
            music.element.classList.add('play');
            music.element.getElementsByTagName('img')[0].src = "svg/pause.svg"
            play_or_pause.src = "svg/pause.svg"
            music_title.innerText = music.title
            is_play = true;

            


            if (!audioCtx) {

                audioCtx = new (window.AudioContext || window.webkitAudioContext);
                source = audioCtx.createMediaElementSource(player_of_music);
                analyser = audioCtx.createAnalyser();
            }


        
            analyser.fftSize = columnCount;
            source.connect(analyser); // Подключаем анализатор к элементу audio
            analyser.connect(audioCtx.destination); // Без этой строки нет звука, но анализатор работает.
            frequencyData = new Uint8Array(analyser.frequencyBinCount);
        
            window.requestAnimationFrame(render)

            loadMusic(getMusicById(id_track_play_in_now))


            player_of_music.play()


            time_on_time_line = 0
        }


    })

}


const tool_prev = document.getElementById('prev')
const tool_next = document.getElementById('next')

const play_or_pause = document.getElementById('play_or_pause')

const music_title = document.getElementById('music_title')
const photo = document.getElementById('photo')

const time_line = document.getElementById('time_line')



var time_of_music = 100
var time_on_time_line = 0

var time_music_current = 0

time_line.max = time_line.clientWidth
var step = time_line.max / time_of_music

var interval_for_play_music = setInterval(() => {


    if (is_play) {
        time_on_time_line += step
        time_line.value = time_on_time_line
    
        if (time_on_time_line >= time_line.max) {
            next()
            time_on_time_line = 0
            time_line.max = time_line.clientWidth
            step = time_line.max / time_of_music
            time_line.value = 0
    
        }
    }
    


    
}, 1000)


function change_time(val) {
    time_on_time_line = parseInt(val)
    time_music_current = time_on_time_line / step 
    player_of_music.currentTime = time_music_current
}



play_or_pause.addEventListener('click', () => {
    if (is_play) {
        getMusicById(id_track_play_in_now).element.getElementsByTagName('img')[0].src = "svg/play.svg"
        play_or_pause.src = "svg/play.svg"
        is_play = false
        player_of_music.pause()
    } else {
        getMusicById(id_track_play_in_now).element.getElementsByTagName('img')[0].src = "svg/pause.svg"
        play_or_pause.src = "svg/pause.svg"
        is_play = true
        player_of_music.play()
        if (!audioCtx) {

            audioCtx = new (window.AudioContext || window.webkitAudioContext);
            source = audioCtx.createMediaElementSource(player_of_music);
            analyser = audioCtx.createAnalyser();
        }
    
        analyser.fftSize = columnCount;
        source.connect(analyser); // Подключаем анализатор к элементу audio
        analyser.connect(audioCtx.destination); // Без этой строки нет звука, но анализатор работает.
        frequencyData = new Uint8Array(analyser.frequencyBinCount);
    
        window.requestAnimationFrame(render)
    }
})


tool_prev.addEventListener('click', prev)

tool_next.addEventListener('click', next)




var time_of_music = 100
var time_on_time_line = 0

var time_music_current = 0

time_line.max = time_line.clientWidth
var step = time_line.max / time_of_music


let player_of_music = document.getElementById("player_of_music")

player_of_music.addEventListener('loadedmetadata', function() {

    time_of_music = parseInt(player_of_music.duration)

    time_end_of_music = parseInt(player_of_music.duration)
    time_music_current = 0
    step = parseInt(time_line.max) / (time_of_music)

});

function loadMusic(music) {

    player_of_music.src = music.music
    player_of_music.load()
}

loadMusic(musics[0])



let audioCtx = null
let source = null
let analyser = null
let frequencyData = null

const column_gaps = 4
const columnCount = 64


let auido_visual = document.getElementById('auido_visual')
let auido_visual_context = auido_visual.getContext('2d')


function drawColumn(x, width, height) {
    let gradient = auido_visual_context.createLinearGradient(0, auido_visual.height - height / 2, 0, auido_visual.height);
    gradient.addColorStop(1, "rgb(255, 255, 255)");
    auido_visual_context.fillStyle = gradient;
    auido_visual_context.fillRect(x, auido_visual.height - height / 2, width, height)
}



function render() {
    analyser.getByteFrequencyData(frequencyData);
    
    const columnWidth = (auido_visual.width / frequencyData.length) - column_gaps + (column_gaps / frequencyData.length) // Ширина колонки
    const heightScale = auido_visual.height / 100; // Масштабный коэффициент

    auido_visual_context.clearRect(0, 0, auido_visual.width, auido_visual.height);

    let xPos = 0

    for (let i = 0; i < frequencyData.length; i++) {
        let columnHeight = frequencyData[frequencyData.length - 1 - i] * heightScale

        drawColumn(xPos, columnWidth, columnHeight / 2)

        xPos += columnWidth + column_gaps
    }

    window.requestAnimationFrame(render)

}