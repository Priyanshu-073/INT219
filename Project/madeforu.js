let songIndex = 0;

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from( document.getElementsByClassName("songitem"));
let bottomSongName = document.getElementById('bottomSongName');


let songs = [
    {songName:"Daaku", filepath: "songs/Daaku - Badshah.mp3" , coverPath:"covers/1.jpg"},
    {songName:"Let me Down", filepath: "songs/audio1.mp3" , coverPath:"covers/2.jpg"},
    {songName:"Faded", filepath: "songs/Faded(PaglaSongs).mp3" , coverPath:"covers/3.jpg"},
    {songName:"Stay", filepath: "songs/Stay(PaglaSongs).mp3" , coverPath:"covers/4.jpg"},
    {songName:"Moving-On", filepath: "songs/Moving-On(PaglaSongs).mp3" , coverPath:"covers/5.jpg"},
    {songName:"Die for You", filepath: "songs/Die-For-You(PaglaSongs).mp3" , coverPath:"covers/6.jpg"},
    {songName:"CrazY", filepath: "songs/Die-For-You(PaglaSongs).mp3" , coverPath:"covers/7.jpg"},
    {songName:"B town", filepath: "songs/B-Town-Gadi-Hauli-Hauli-Jave(PaglaSongs).mp3" , coverPath:"covers/8.jpg"},
    {songName:"Over and out", filepath: "songs/Over-and-Out-(Feat.-Charlott-Boss)(PaglaSongs).mp3" , coverPath:"covers/9.jpg"},
    {songName:"Tum Hi Ho", filepath:"songs/Tum Hi Ho.mp3" , coverPath:"covers/10.jpg"},
    
]
bottomSongName.innerText = songs[songIndex].songName;
let audioElement = new Audio(songs[songIndex].filepath);

const makeAllPlays =()=>{
    songItems.forEach((element)=>{
    element.querySelector('.songitemplay').classList.remove('fa-pause');
        
    element.querySelector('.songitemplay').classList.add('fa-play');
})
}
 let lastindex = -1;
 
songItems.forEach((element, i)=>{
    console.log(element , i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName('songname')[0].innerText = songs[i].songName;
    let audioElementl = new Audio(songs[i].filepath);
    
    audioElementl.addEventListener('loadedmetadata', ()=>{
        element.getElementsByClassName('timestamp')[0].innerText = parseInt((audioElementl.duration)/60) + ':' +  parseInt((audioElementl.duration)%60);
    })
   
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
      
       if(songIndex != lastindex){
        audioElement.src = songs[songIndex].filepath;
        bottomSongName.innerText = songs[songIndex].songName;
       }
        
        if( audioElement.paused ){
            if(songIndex != lastindex){
               audioElement.currentTime = 0; 
            }
            audioElement.play();
            e.target.querySelector('.songitemplay').classList.remove('fa-play');
            e.target.querySelector('.songitemplay').classList.add('fa-pause');
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        }
        else{
            if(songIndex == lastindex){
             audioElement.pause();
            e.target.querySelector('.songitemplay').classList.remove('fa-pause');
            e.target.querySelector('.songitemplay').classList.add('fa-play');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
             }
             else{
                audioElement.currentTime = 0; 
                audioElement.play();
                e.target.querySelector('.songitemplay').classList.remove('fa-play');
                e.target.querySelector('.songitemplay').classList.add('fa-pause');
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
                gif.style.opacity = 1;
             }
           
        }
        lastindex = songIndex;
    })
     
        
    })

    document.getElementById('next').addEventListener('click' , ()=>{
        if(songIndex>=9){
            songIndex =0;
        }
        else{
            songIndex+=1;
        }
        audioElement.src = songs[songIndex].filepath;
        bottomSongName.innerText = songs[songIndex].songName;
        makeAllPlays();
        audioElement.play();
        document.getElementById(`${songIndex}`).querySelector('.songitemplay').classList.remove('fa-play');
        document.getElementById(`${songIndex}`).querySelector('.songitemplay').classList.add('fa-pause');
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        lastindex = songIndex;
    })

    document.getElementById('previous').addEventListener('click' , ()=>{
        if(songIndex<=0){
            songIndex =0;
        }
        else{
            songIndex-=1;
        }
        audioElement.src = songs[songIndex].filepath;
        bottomSongName.innerText = songs[songIndex].songName;
        makeAllPlays();
        audioElement.play();
        document.getElementById(`${songIndex}`).querySelector('.songitemplay').classList.remove('fa-play');
        document.getElementById(`${songIndex}`).querySelector('.songitemplay').classList.add('fa-pause');
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        lastindex = songIndex;
        
    })


// audioElement.play();

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
   

    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        document.getElementById(`${songIndex}`).querySelector('.songitemplay').classList.remove('fa-play');
        document.getElementById(`${songIndex}`).querySelector('.songitemplay').classList.add('fa-pause');
    }
    else{
        makeAllPlays();
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
let progress;
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    // Update Seekbar
    progress = ((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value = progress;
    if(progress>=100){
        if(songIndex>=9){
            songIndex =0;
        }
        else{
            songIndex+=1;
        }
        audioElement.src = songs[songIndex].filepath;
        bottomSongName.innerText = songs[songIndex].songName;
        makeAllPlays();
        audioElement.play();
        document.getElementById(`${songIndex}`).querySelector('.songitemplay').classList.remove('fa-play');
        document.getElementById(`${songIndex}`).querySelector('.songitemplay').classList.add('fa-pause');
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        lastindex = songIndex;
    }
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
})