import {videos} from '../data/videos.js';

const storedBtn = localStorage.getItem('storedBtn');
if (storedBtn){
    document.querySelectorAll('.category-container button').forEach(button => {
        button.style.backgroundColor = "rgb(241, 241, 241)";
        button.style.color = "rgb(0, 0, 0)";

    });        
    document.querySelector(`.${JSON.parse(storedBtn)}`).style.backgroundColor = "rgb(0, 0, 0)";
    document.querySelector(`.${JSON.parse(storedBtn)}`).style.color = "rgb(255, 255, 255)";
    localStorage.removeItem('storedBtn');
}
else {
    document.querySelectorAll('.category-container button').forEach(button => {
        button.style.backgroundColor = "rgb(241, 241, 241)";
        button.style.color = "rgb(0, 0, 0)";

    });        
    document.querySelector(`.all-btn`).style.backgroundColor = "rgb(0, 0, 0)";
    document.querySelector(`.all-btn`).style.color = "rgb(255, 255, 255)";
}


let videosHTML = '';

generateHTML();    
function generateHTML(){
    videosHTML = '';    
    let random20Vids = [];

    while(random20Vids.length !== 20){
        const i = Math.floor(Math.random() * 98)
        random20Vids.push(videos[i]);
        if (random20Vids.length){
            random20Vids = [...new Set(random20Vids)];
        }
    }

    random20Vids = random20Vids.map(video => {
        if (document.querySelector(`.js-element-container[data-element-id="${video.id}"]`)) {
            return { ...video, id: crypto.randomUUID() };
        }
        return video;
    });

    random20Vids.forEach((video) => {

        videosHTML += 
        `
        
            <div  class="element-container js-element-container" data-element-id="${video.id}">
                
                <div class="video-container">
                    <img class="thumbnail js-thumbnail" data-thumbnail-id="${video.id}" 
                    src="${video.imageLink}"
                    alt="Video Thumbnail">
                
                    <iframe class="video js-video" data-video-id="${video.id}" 
                        src="${video.iframeLink}"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowfullscreen>
                    </iframe>


                    <button class="mute-btn js-mute-btn" data-mute-btn-id="${video.id}"><img src="icons/muted-icon.png" class="mute-icon"></button>
                    <button class="cc-btn js-cc-btn" data-cc-btn-id="${video.id}"><img src="icons/cc-on-icon.png" class="cc-icon"></button>
                    
                    
                    <p class="video-time js-video-time" data-video-time-id="${video.id}">${video.videoLength}</p>

                    <div class="video-progress-wrapper js-progress-wrapper" data-progress-wrapper-id="${video.id}">
                        <div class="video-progress-bar js-progress-bar" data-progress-bar-id="${video.id}"></div>
                    </div>
                    
                </div>


                <div class="video-info-grid">

                    <div class="channel-img-div">
                        <img src="${video.channelImage}" class="content-creator-channel-img">
                    </div>

                    <div class="video-details-div">
                        <p class="video-title">${video.videoTitle}</p>
                        <p class="channel-name">${video.channelName}</p>
                        <p class="views-and-time-ago">${video.viewsAndTimeAgo}</p>
                    </div>

                    <div class="three-dot-menu-div js-menu-div">
                        <button class="three-dot-menu-btn js-menu-btn" data-menu-btn-id="${video.id}"><span class="three-dot-menu">&#8942;</span></button>
                    </div>
                </div>
                

                <div class="menu-options js-menu-options" data-menu-options-id="${video.id}">

                    <div class="first-div"> 

                        <div class="add-to-queue">
                            <img src="./images/icons/add-to-queue-icon.png">
                            <a href="#">Add to queue</a>
                        </div>

                        <div>
                            <img src="./images/icons/save-to-watch-later-icon.webp">
                            <a href="#">Save to Watch later</a>
                        </div>

                        <div>
                            <img src="./images/icons/save-to-playlist-icon.jpg" class="save-to-playlist-icon">
                            <a href="#">Save to playlist</a>
                        </div>

                        <div>
                            <img src="./images/icons/download-icon.jpg">
                            <a href="#">Download</a>
                        </div>

                        <div>
                            <img src="./images/icons/share-icon.png">
                            <a href="#">Share</a>
                        </div>
                    </div>     
                    <p></p>
                    <div class="second-div">

                        <div>
                            <img src="./images/icons/not-interested-icon.jpg" class="not-interested-icon">
                            <a href="#">Not interested</a>
                        </div>

                        <div>
                            <img src="./images/icons/dont-recommend-channel-icon.jpg" class="dont-recommend-channel-icon">
                            <a href="#" class="dont-recommend-channel">Don't recommend channel</a>
                        </div>

                        <div class="report">
                            <img src="./images/icons/report-icon.svg">
                            <a href="#">Report</a>
                        </div>
                    </div>
                </div>

            </div>
        
        `;
    });

    document.querySelector('.js-content-container').insertAdjacentHTML('beforeend', videosHTML); 
}


const leftScrollBtn = document.querySelector(".scroll-btn.left");
const rightScrollBtn = document.querySelector(".scroll-btn.right");
const categoryContainer = document.querySelector(".category-container");


const scrollAmount = 100; 


rightScrollBtn.addEventListener("click", () => {
    categoryContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
});


leftScrollBtn.addEventListener("click", () => {
    categoryContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 300){
        generateHTML();
        loadYouTubeAPI();
    }
});


document.querySelector('.js-hamburger-menu').addEventListener('click', (event) => {
    event.stopPropagation();
    document.querySelector('.js-side-menu-parent').style.left = '0px';
});

document.querySelector('.js-side-menu-hamburger-menu').addEventListener('click', () => {
    document.querySelector('.js-side-menu-parent').style.left = '-250px';
});


document.querySelectorAll('.js-shorts-btn').forEach(element => {
    element.addEventListener( 'click',() => {
        window.location.href = 'https://www.youtube.com/shorts/';
    });
});
  
document.querySelectorAll('.js-subscriptions-btn').forEach(element => {
    element.addEventListener( 'click',() => {
        window.location.href = 'https://www.youtube.com/feed/subscriptions';
    });
});

document.querySelector('.js-search-bar').addEventListener('keyup', (event) => {
    const searchValue = document.querySelector('.js-search-bar').value;
    const searchValueEncoded = searchValue.replace(/ /g, "+");

    if (event.key === "Enter" && (searchValue).trim()){
        document.querySelector('.js-search-bar').value = '';  
        window.location.href = `https://www.youtube.com/results?search_query=${searchValueEncoded}`;
    }
}); 

document.querySelector('.js-search-icon-btn').addEventListener('click', () => {
    const searchValue = document.querySelector('.js-search-bar').value;
    const searchValueEncoded = searchValue.replace(/ /g, "+");

    if ((searchValue).trim()){        
        document.querySelector('.js-search-bar').value = '';
        window.location.href = `https://www.youtube.com/results?search_query=${searchValueEncoded}`;
    }
}); 


document.querySelector('.js-create-btn').addEventListener('click', () => {
    if(document.querySelector('.js-create-btn').style.display  === 'none') return;
    if(document.querySelector('.js-create-div').style.display === 'block'){
        document.querySelector('.js-create-div').style.display = 'none';
        return;
    }
    document.querySelector('.js-create-div').style.display = 'block';
});





 function showPrompt() {    
    document.getElementById("js-provide-info-div").style.display = "none";
    document.getElementById("customPrompt").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}
function showProvideInfo() {
    document.getElementById("customPrompt").style.display = "none";
    document.getElementById("js-provide-info-div").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}
function hideThem() {
    document.getElementById("customPrompt").style.display = "none";
    document.getElementById("js-provide-info-div").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

function handleResponse(response) {
    if (response === 'lets-go') {
        showProvideInfo();
        return;
    } else {
        localStorage.setItem('response', "remind-me-later");
    }
    document.getElementById("customPrompt").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

document.querySelector('.js-lets-go').addEventListener('click', () => {
    handleResponse('lets-go');
});
document.querySelector('.js-remind-me-later').addEventListener('click', () => {
    handleResponse('remind-me-later');
});
function storedInfo(){
    const channelId = JSON.parse(localStorage.getItem('channelId'));
    const youTubeHandle = JSON.parse(localStorage.getItem('youTubeHandle'));
    if(channelId && youTubeHandle){
        return [channelId, youTubeHandle];
    }
    return null;
}

if (!localStorage.getItem('response') && !localStorage.getItem('channelId') && !localStorage.getItem('youTubeHandle')){
    window.onload = function() {
        showPrompt();
    };
}
else {
    document.querySelector('.js-create-btn').style.display = "block";
    document.querySelector('.js-notification-icon').style.display = "block";
    document.querySelector('.js-my-account-icon').style.display = "block";
    document.querySelector('.js-kebab-menu').style.display = "none";
    document.querySelector('.js-sign-in-btn').style.display = "none";

}
document.querySelector('.js-x-btn').addEventListener('click', () => {
    hideThem();
    document.querySelector('.js-input-1').value = "";
    document.querySelector('.js-input-2').value = "";
});

document.querySelector('.js-submit-btn').addEventListener('click', () => {
    const input1 = document.querySelector('.js-input-1');
    const input2 = document.querySelector('.js-input-2');
    if (!input1.value.trim() || !input2.value.trim()){
        alert('Please Make Sure To Provide The Needed Information')
        return;
    }
    const start = (input1.value).indexOf("channel/") + 8;
    const end = (input1.value).length;
    const channelId = (input1.value).substring(start, end);
    const youTubeHandle = input2.value;

    localStorage.setItem('channelId', JSON.stringify((channelId).trim()));
    localStorage.setItem('youTubeHandle', JSON.stringify((youTubeHandle).trim()));
    hideThem();
    window.location.href = "youtube-homepage.html";
});
document.querySelector('.js-upload-video').addEventListener('click', () => {
    const array = storedInfo();
    array? window.location.href = `https://studio.youtube.com/channel/${array[0]}/videos/upload?filter=%5B%5D&sort=%7B%22columnType%22%3A%22date%22%2C%22sortOrder%22%3A%22DESCENDING%22%7D` : showPrompt();

});
document.querySelector('.js-you-section-btn').addEventListener('click', () => {
    window.location.href = `https://www.youtube.com/feed/you`;
});

document.querySelector('.js-go-live').addEventListener('click', () => {
    const array = storedInfo();
    array? window.location.href = `https://studio.youtube.com/channel/${array[0]}/livestreaming` : showPrompt();
});
document.querySelector('.js-create-post').addEventListener('click', () => {
    const array = storedInfo();
    array? window.location.href = `https://www.youtube.com/channel/${array[0]}/community?show_create_dialog=1` : showPrompt();
});
document.querySelector('.js-notification-settings').addEventListener('click', () => {
    window.location.href = "https://www.youtube.com/account_notifications";
});

document.querySelectorAll('.category-container button').forEach(button => {
    button.addEventListener('click', () => {
        const buttonClass = button.className;
        localStorage.setItem('storedBtn', JSON.stringify(buttonClass));
        window.location.href = 'youtube-homepage.html';
    })
});

document.querySelector('.js-youtube-logo-img').addEventListener('click', () => {
    window.location.href = 'youtube-homepage.html';
});

document.querySelectorAll('.js-home-btn').forEach(element => {
    element.addEventListener( 'click',() => {
        window.location.href = 'youtube-homepage.html';
    });
});

document.querySelector('.js-my-account-icon').addEventListener('click', (event) => {
    event.stopPropagation();
    const div = document.querySelector('.js-account-stuff-parent');
    if(window.getComputedStyle(div).display === 'none'){
        div.style.display = 'block';
        return;
    }
    div.style.display = 'none';
});
document.querySelector('.js-span-a').addEventListener('click', () => {
    const array = storedInfo();
    array? window.location.href=`https://www.youtube.com/${array[1]}` : showPrompt();
});
document.querySelector('.js-google-account').addEventListener('click', () => {
    window.location.href="https://myaccount.google.com/u/0/?utm_source=YouTubeWeb&tab=rk&utm_medium=act&gar=WzgwLCIyMzMzODciXQ&tab=rk&hl=en";
});
document.querySelector('.js-youtube-studio').addEventListener('click', () => {
    const array = storedInfo();
    array? window.location.href=`https://studio.youtube.com/channel/${array[0]}` : showPrompt();
});
document.querySelector('.js-purchase-and-membership').addEventListener('click', () => {
    window.location.href="https://www.youtube.com/paid_memberships?ybp=mAEK";
});
document.querySelector('.js-your-data').addEventListener('click', () => {
    window.location.href="https://myaccount.google.com/u/0/yourdata/youtube?hl=en";
});

document.querySelectorAll('.js-settings').forEach(element => {
    element.addEventListener('click' ,() => {
    window.location.href="https://www.youtube.com/account";
    });
});

document.querySelector('.js-switch-account').addEventListener('click', (event) => {
    event.stopPropagation();
    const div = document.querySelector('.js-accounts-entire-div');
    const bigDiv = document.querySelector('.js-account-stuff-parent');

    window.getComputedStyle(div).display === 'none' ? div.style.display = 'block' : div.style.display = 'none';
    window.getComputedStyle(bigDiv).display === 'none' ? bigDiv.style.display = 'block' : bigDiv.style.display = 'none';
});

document.querySelector('.js-appearance-div').addEventListener('click', (event) => {
    event.stopPropagation();
    const div = document.querySelector('.js-theme');
    const bigDiv = document.querySelector('.js-account-stuff-parent');

    window.getComputedStyle(div).display === 'none' ? div.style.display = 'block' : div.style.display = 'none';
    window.getComputedStyle(bigDiv).display === 'none' ? bigDiv.style.display = 'block' : bigDiv.style.display = 'none';
});
document.querySelector('.js-go-back-themes').addEventListener('click', (event) => {
    event.stopPropagation();
    const div = document.querySelector('.js-theme');
    const bigDiv = document.querySelector('.js-account-stuff-parent');

    window.getComputedStyle(div).display === 'none' ? div.style.display = 'block' : div.style.display = 'none';
    window.getComputedStyle(bigDiv).display === 'none' ? bigDiv.style.display = 'block' : bigDiv.style.display = 'none';
});

if (storedInfo()) document.querySelector('.youTubeHandle').textContent = (storedInfo())[1];

document.querySelector('.js-go-back-accounts').addEventListener('click', (event) => {
    event.stopPropagation();
    const div = document.querySelector('.js-accounts-entire-div');
    const bigDiv = document.querySelector('.js-account-stuff-parent');

    window.getComputedStyle(div).display === 'none' ? div.style.display = 'block' : div.style.display = 'none';
    window.getComputedStyle(bigDiv).display === 'none' ? bigDiv.style.display = 'block' : bigDiv.style.display = 'none';
});
document.querySelector('.js-kebab-menu').addEventListener('click', (event) => {
    event.stopPropagation();
    const div = document.querySelector('.js-account-stuff-lil-div');
    window.getComputedStyle(div).display === 'none' ? div.style.display = 'block' : div.style.display = 'none';
});

document.querySelector('.js-account').addEventListener('click', () => {
    window.location.href = 'youtube-homepage.html';
});
document.querySelector('.js-view-channels').addEventListener('click', () => {
    window.location.href="https://www.youtube.com/account";
});
document.querySelector('.js-add-account').addEventListener('click', () => {
    window.location.href = "https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3D%252F&hl=en&passive=false&service=youtube&uilel=0&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S2000008078%3A1741891469080975";
});
document.querySelector('.js-sign-in-btn').addEventListener('click', (event) => {
    event.stopPropagation();
    showPrompt()
});
document.querySelector('.js-history-div').addEventListener('click', () => {
    window.location.href = "https://www.youtube.com/feed/history";
});
document.querySelector('.js-playlists').addEventListener('click', () => {
    window.location.href = "https://www.youtube.com/feed/playlists";
});
document.querySelector('.js-your-videos').addEventListener('click', () => {
    const array = storedInfo();
    array? window.location.href=`https://studio.youtube.com/channel//${array[0]}/videos/upload?filter=%5B%5D&sort=%7B%22columnType%22%3A%22date%22%2C%22sortOrder%22%3A%22DESCENDING%22%7D` : showPrompt();
});
document.querySelector('.js-watch-later').addEventListener('click', () => {
    window.location.href = "https://www.youtube.com/playlist?list=WL";
});
document.querySelector('.js-liked-videos').addEventListener('click', () => {
    window.location.href = "https://www.youtube.com/playlist?list=LL";
});
document.querySelector('.js-report-history').addEventListener('click', () => {
    window.location.href = "https://www.youtube.com/reporthistory";
});


const voiceButton = document.getElementById('voiceButton');
const micContainer = document.getElementById('micContainer');
const speechText = document.getElementById('speechText');
const closeButton = document.getElementById("closeButton");
const speechContainer = document.querySelector('.speech-recognition-parent');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true; 
    let finalTranscript = ""; 

    voiceButton.addEventListener("click", () => {
        speechText.innerText = "";
        finalTranscript = ""; 
        micContainer.classList.add("listening");
        speechContainer.style.display = 'block';
        recognition.start();
    });

    closeButton.addEventListener("click", () => {
        recognition.stop();
        micContainer.classList.remove("listening");
        speechText.innerText = "";
        speechContainer.style.display = 'none'; 
    });

    recognition.onresult = (event) => {
        let interimTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript + " ";
            } else {
                interimTranscript += event.results[i][0].transcript + " ";
            }
        }
        speechText.innerText = finalTranscript + interimTranscript; 
    };

    recognition.onend = () => {
        micContainer.classList.remove("listening");
        speechContainer.style.display = 'none'; 
        console.log(speechContainer.style.display)

        if (finalTranscript.trim()) {
            const searchValueEncoded = finalTranscript.trim().replace(/ /g, "+");
            speechText.innerText = ""; 
            window.location.href = `https://www.youtube.com/results?search_query=${searchValueEncoded}`;
        }
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        micContainer.classList.remove("listening");
        speechContainer.style.display = 'none'; 
    };
} else {
    alert("Your browser does not support speech recognition.");
}

document.querySelector('.js-voice-search-btn').addEventListener('click', () => {
    speechContainer.style.display = 'block';
});

document.querySelector('.js-notification-icon').addEventListener('click', (event) => {
    event.stopPropagation();
    const div = document.querySelector('.js-notification-div');
    console.log('been excuted')
    if(window.getComputedStyle(div).display === 'none'){
        div.style.display = 'block';
        return;
    }
    div.style.display = 'none';
});

let players = [];
let lastTimes = [];
let isMuteds = [];
let captionsOns = [];
let haveEventListeners = [];

window.onYouTubeIframeAPIReady = function () {
    const existingHTML = document.querySelector('.js-content-container').innerHTML;
    if (!existingHTML){
        if (players.length !== 0) {
            players.forEach(playerObject => playerObject.player.destroy());
            players = [];
        }        
    }

    document.querySelectorAll('.js-element-container').forEach((element) => {
        const elementId = element.dataset.elementId;        
        const elementHasEventListeners = haveEventListeners.find(eventListener => {eventListener.hasEventListenerId === elementId});
        if(elementHasEventListeners) return;

        const video = document.querySelector(`.js-video[data-video-id="${elementId}"]`);

        players.push({
            playerId: elementId,         
            player: new YT.Player(video, { events: { 'onReady': event => onPlayerReady(event, elementId)} })                
        });

        lastTimes.push({
            lastTimeId: elementId,
            lastTime: 0
        });

        isMuteds.push({
            isMutedId: elementId,
            isMuted: true
        });

        captionsOns.push({
            captionsOnId: elementId,
            captionsOn: true
        });

        haveEventListeners.push({
            hasEventListenerId: elementId,
            hasEventListener: true
        });

    });

};

loadYouTubeAPI();
function loadYouTubeAPI(){
    if (!window.YT) {
        let tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        let firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    else if (window.YT && YT.Player) {
        onYouTubeIframeAPIReady();
    }
}



function onPlayerReady(event, elementId) {
    const lastTimeObject = lastTimes.find(lastTimeObject => lastTimeObject.lastTimeId === elementId);
    const playerObject = players.find(playerObject => playerObject.playerId === elementId);

    lastTimeObject.lastTime = 0;
    playerObject.player.seekTo(0, true);
    playerObject.player.mute();      


    setupEventListeners(elementId);   

    setInterval(() => {
        if (!playerObject.player) return;
        if (playerObject.player.getPlayerState() !== 1) return;
        
        let currentTime = playerObject.player.getCurrentTime();
        let duration = playerObject.player.getDuration();
        let remainingTime = duration - currentTime;
        document.querySelector(`.js-video-time[data-video-time-id="${elementId}"]`).textContent = formatTime(remainingTime);        
    }, 1000);

    setInterval(() => {
        if (!playerObject.player) return;
        if (playerObject.player.getPlayerState() !== 1) return;
    
        const currentTime = playerObject.player.getCurrentTime();
        const duration = playerObject.player.getDuration();
        const percentage = (currentTime / duration) * 100;
    
        document.querySelector(`.js-progress-bar[data-progress-bar-id="${elementId}"]`).style.width = `${percentage}%`;        
    }, 100);

    if (playerObject.player) playerObject.player.pauseVideo();               



    const progressWrapper = document.querySelector(`.js-progress-wrapper[data-progress-wrapper-id="${elementId}"]`);    
    
    let isDragging = false;
    progressWrapper.addEventListener('click', (event) => {
        event.stopPropagation();
        const progressWrapperWidth = progressWrapper.offsetWidth;
        const offsetX = event.clientX - progressWrapper.getBoundingClientRect().left;

        const percentage = (offsetX / progressWrapperWidth) * 100;
        const duration = playerObject.player.getDuration();
        const newTime = (percentage / 100) * duration;
    
        playerObject.player.seekTo(newTime, true);        
    });




    progressWrapper.addEventListener('mousedown', (event) => {
        isDragging = true;
        const progressWrapperWidth = progressWrapper.offsetWidth;
        const offsetX = event.clientX - progressWrapper.getBoundingClientRect().left;
        const percentage = Math.min(Math.max(0, (offsetX / progressWrapperWidth) * 100), 100);    
    
        document.querySelector(`.js-progress-bar[data-progress-bar-id="${elementId}"]`).style.width = `${percentage}%`;        

        
        const duration = playerObject.player.getDuration();
        const newTime = (percentage / 100) * duration;
        playerObject.player.seekTo(newTime, true);
    });




    progressWrapper.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const progressWrapperWidth = progressWrapper.offsetWidth;
            const offsetX = event.clientX - progressWrapper.getBoundingClientRect().left;
            const percentage = Math.min(Math.max(0, (offsetX / progressWrapperWidth) * 100), 100);    
        
            document.querySelector(`.js-progress-bar[data-progress-bar-id="${elementId}"]`).style.width = `${percentage}%`;        
    
            
            const duration = playerObject.player.getDuration();
            const newTime = (percentage / 100) * duration;
            playerObject.player.seekTo(newTime, true);
        }
    });



    progressWrapper.addEventListener('mouseup', () => {
        isDragging = false;
    });


    progressWrapper.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    playerObject.player.addEventListener("onStateChange", (event) => {
        if (event.data === 0) { // 0 means "ENDED"
            document.querySelector(`.js-thumbnail[data-thumbnail-id="${elementId}"]`).style.opacity = '1';
            document.querySelector(`.js-video[data-video-id="${elementId}"]`).style.opacity = '0';
            document.querySelector(`.js-mute-btn[data-mute-btn-id="${elementId}"]`).style.opacity = '0';
            document.querySelector(`.js-cc-btn[data-cc-btn-id="${elementId}"]`).style.opacity = '0';
            progressWrapper.style.opacity = '0';
            document.querySelector(`.js-progress-bar[data-progress-bar-id="${elementId}"]`).style.opacity = '0'; 
            document.querySelector(`.js-progress-bar[data-progress-bar-id="${elementId}"]`).style.width = '0%';
            lastTimeObject.lastTime = playerObject.player.getCurrentTime();
            document.querySelector(`.js-video-time[data-video-time-id="${elementId}"]`).textContent = calculateVidTime(lastTimeObject.lastTime);
            playerObject.player.seekTo(0, true);
            playerObject.player.pauseVideo();
        }
    });

 }



function setupEventListeners(elementId) {
    const videoBox = document.querySelector(`.js-element-container[data-element-id="${elementId}"]`);
    const muteBtn = document.querySelector(`.js-mute-btn[data-mute-btn-id="${elementId}"]`);
    const ccBtn = document.querySelector(`.js-cc-btn[data-cc-btn-id="${elementId}"]`);
    const thumbnail = document.querySelector(`.js-thumbnail[data-thumbnail-id="${elementId}"]`);
    const video = document.querySelector(`.js-video[data-video-id="${elementId}"]`);
    const playerObject = players.find(playerObject => playerObject.playerId === elementId);
    const lastTimeObject = lastTimes.find(lastTimeObject => lastTimeObject.lastTimeId === elementId);
    const isMutedObject = isMuteds.find(isMutedObject => isMutedObject.isMutedId === elementId);
    const captionsOnObject = captionsOns.find(captionsOnObject => captionsOnObject.captionsOnId === elementId);
    const progressWrapper = document.querySelector(`.js-progress-wrapper[data-progress-wrapper-id="${elementId}"]`);
    const progressBar = document.querySelector(`.js-progress-bar[data-progress-bar-id="${elementId}"]`);
    const menuContainer = document.querySelector(`.js-menu-options[data-menu-options-id="${elementId}"]`);
    const wholeLink = (videos.find(video => video.id === elementId)).iframeLink;
    const start = wholeLink.indexOf("embed/") + 6;
    const end = wholeLink.indexOf("?", start);
    const videoLink = wholeLink.substring(start, end);

    
    
    
    
  


    document.querySelector(`.js-menu-btn[data-menu-btn-id="${elementId}"]`).addEventListener("click", (event) => {
        event.stopPropagation();
        document.querySelectorAll('.js-menu-options').forEach(menu => {
            if (getComputedStyle(menu).display === "block") {
                menu.style.display = "none";
            }
        })
        menuContainer.style.display = "block";
    });

    document.addEventListener("click", () => {

        menuContainer.style.display = "none";
        document.querySelector('.js-side-menu-parent').style.left = '-250px';
        document.querySelector('.js-notification-div').style.display = "none";
        document.querySelector('.js-account-stuff-parent').style.display = "none";
        document.querySelector('.js-accounts-entire-div').style.display = "none";
        document.querySelector('.js-theme').style.display = "none";
        document.querySelector('.js-account-stuff-lil-div').style.display = "none";
        document.querySelector('.js-create-div').style.display = "none";


        

    });

    videoBox.addEventListener('click', (event) => {
        event.stopPropagation();
        videoBox.style.backgroundColor = '#e0e0e0';
        window.location.href = `https://www.youtube.com/watch?v=${videoLink}`;
    });

    videoBox.addEventListener("mouseenter", () => {
        thumbnail.style.opacity = '0';
        video.style.opacity = '1';
        playerObject.player.seekTo(lastTimeObject.lastTime, true);
        playerObject.player.playVideo();
        muteBtn.style.opacity = '1';
        ccBtn.style.opacity = '1';
        progressWrapper.style.opacity = '1';
        progressBar.style.opacity = '1';
    });

    videoBox.addEventListener("mouseleave", () => {
        if (!playerObject.player) return;
        lastTimeObject.lastTime = playerObject.player.getCurrentTime();
        playerObject.player.pauseVideo();
        thumbnail.style.opacity = '1';
        video.style.opacity = '0';
        muteBtn.style.opacity = '0';
        ccBtn.style.opacity = '0';
        progressWrapper.style.opacity = '0';
        progressBar.style.opacity = '0';        
    });

    muteBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        if (!playerObject.player) return;
        isMutedObject.isMuted = !isMutedObject.isMuted;
        if (isMutedObject.isMuted) {
            playerObject.player.mute();
            muteBtn.innerHTML = `<img src="icons/muted-icon.png" class="mute-icon">`;
        } else {
            playerObject.player.unMute();
            muteBtn.innerHTML = `<img src="icons/unmuted-icon.png" class="mute-icon">`;
        }
        // I am not sure why to get the current time here.. but I will leave this line here for now
        lastTimeObject.lastTime = playerObject.player.getCurrentTime();        
    });


    ccBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        if (!playerObject.player) return;
        captionsOnObject.captionsOn = !captionsOnObject.captionsOn;
        if (captionsOnObject.captionsOn) {
            playerObject.player.loadModule("captions");
            playerObject.player.setOption("captions", "track", { languageCode: "en" });
            ccBtn.innerHTML = `<img src="icons/cc-on-icon.png" class="cc-icon">`;
        } else {
            playerObject.player.setOption("captions", "track", {});
            ccBtn.innerHTML = `<img src="icons/cc-off-icon.jpg" class="cc-icon">`;
        }

        // not sure why have it here either
        lastTimeObject.lastTime = playerObject.player.getCurrentTime();        
    });


    

    
}






function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor(seconds / 60);
    let secondsRemaining = Math.floor(seconds % 60);

    return hours? `${hours}:${minutes}:${secondsRemaining < 10 ? '0' + secondsRemaining : secondsRemaining}` : `${minutes}:${secondsRemaining < 10 ? '0' + secondsRemaining : secondsRemaining}`;
}

function calculateVidTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let theSeconds = Math.floor(seconds % 60);

    let format = (num) => num < 10 ? `0${num}` : num;

    return hours ? `${format(hours)}:${format(minutes)}:${format(theSeconds)}` : `${format(minutes)}:${format(theSeconds)}`;
}
