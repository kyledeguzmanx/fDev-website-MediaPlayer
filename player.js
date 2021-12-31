let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
  
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
    {
      name: "Fool For You",
      artist: "Snoh Aalegra",
      image: "img/snoha.jpg",
      path: "audio/snoh.mp3"
    },
    {
      name: "3 Hour Drive (feat Sampha)",
      artist: "Alicia Keys",
      image: "img/aliciakeys.png",
      path: "audio/Alicia.mp3"
    },
    {
      name: "True Colors",
      artist: "The Weeknd",
      image: "img/weeknd.jpg",
      path: "audio/weeknd.mp3",
    },
    {
        name: "Before I Do",
        artist: "Sevyn Streeter",
        image: "img/sevyn.jpg",
        path: "audio/Sevyn.mp3",
    },
    {
        name: "Still Your Best",
        artist: "Giveon",
        image: "img/giveon.png",
        path: "audio/Giveon.mp3",
    },
    {
        name: "U 2 Luv (feat Jeremih)",
        artist: "Ne-Yo",
        image: "img/neyo.png",
        path: "audio/neyo.mp3",
    },
    {
        name: "Easy (feat 6LACK)",
        artist: "Next Town Down",
        image: "img/nexttown.jpg",
        path: "audio/easy.mp3",
    },
    {
        name: "Superstar",
        artist: "Majid Jordan",
        image: "img/majid.png",
        path: "audio/superstar.mp3",
    },
    {
        name: "Prom",
        artist: "SZA",
        image: "img/sza.jpg",
        path: "audio/prom.mp3",
    },
    {
        name: "Chicago Boys",
        artist: "Ari Lennox",
        image: "img/ari.jpg",
        path: "audio/chicagoboys.mp3",
    },
    {
        name: "Morocco (feat 6LACK)",
        artist: "Alina Baraz",
        image: "img/alina.jpg",
        path: "audio/morocco.mp3",
    },
    {
        name: "Tonight",
        artist: "ZAYN",
        image: "img/zayn.jpg",
        path: "audio/tonight.mp3",
    },
    {
        name: "Grateful",
        artist: "Mahalia",
        image: "img/mahlia.jpg",
        path: "audio/grateful.mp3",
    },
    {
        name: "What If",
        artist: "Amber Mark",
        image: "img/ambermark.jpg",
        path: "audio/whatif.mp3",
    },
  ];

  function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();
    
    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    // Update details of the track
    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;
    
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
    
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
    }
    
    // Function to reset all values to their default
    function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    }
    
    function playpauseTrack() {
        // Switch between playing and pausing
        // depending on the current state
        if (!isPlaying) playTrack();
        else pauseTrack();
        }
        
    function playTrack() {
        // Play the loaded track
        curr_track.play();
        isPlaying = true;
        
        // Replace icon with the pause icon
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }
        
    function pauseTrack() {
        // Pause the loaded track
        curr_track.pause();
        isPlaying = false;
        
        // Replace icon with the play icon
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }
        
    function nextTrack() {
        // Go back to the first track if the
        // current one is the last in the track list
        if (track_index < track_list.length - 1)
            track_index += 1;
        else track_index = 0;
        
        // Load and play the new track
        loadTrack(track_index);
        playTrack();
    }
        
    function prevTrack() {
        // Go back to the last track if the
        // current one is the first in the track list
        if (track_index > 0)
            track_index -= 1;
        else track_index = track_list.length - 1;
            
        // Load and play the new track
        loadTrack(track_index);
        playTrack();
    }
    function seekTo() {
            // Calculate the seek position by the
            // percentage of the seek slider
            // and get the relative duration to the track
            seekto = curr_track.duration * (seek_slider.value / 100);
            
            // Set the current track position to the calculated seek position
            curr_track.currentTime = seekto;
    }
            
    function setVolume() {
            // Set the volume according to the
            // percentage of the volume slider set
            curr_track.volume = volume_slider.value / 100;
    }
            
    function seekUpdate() {
            let seekPosition = 0;
            
            // Check if the current track duration is a legible number
            if (!isNaN(curr_track.duration)) {
                seekPosition = curr_track.currentTime * (100 / curr_track.duration);
                seek_slider.value = seekPosition;
            
                // Calculate the time left and the total duration
                let currentMinutes = Math.floor(curr_track.currentTime / 60);
                let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
                let durationMinutes = Math.floor(curr_track.duration / 60);
                let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
            
                // Add a zero to the single digit time values
                if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
            
                // Display the updated duration
                curr_time.textContent = currentMinutes + ":" + currentSeconds;
                total_duration.textContent = durationMinutes + ":" + durationSeconds;
            }
    }
// Load the first track in the tracklist
loadTrack(track_index);
                    