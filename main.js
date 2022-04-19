music1 = "";
music2 = "";

leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
scoreleftwristY = 0;
scorerightwristY = 0;
song1_status = "";
song2_status = "";



function preload(){
    music1 = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}
function setup(){
    
    canvas = createCanvas(500,500);
    canvas.position(500,200);
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video,modelloaded);
    posenet.on('pose',gotposes);
    
}

function gotposes(results){
    if(results.length>0){
        console.log(results);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        scoreleftwristY = results[0].pose.keypoints[9].score;
        scorerightwristY = results[0].pose.keypoints[10].score;
        
    }
}


function modelloaded(){
    console.log("modelloaded");
}

function draw(){
    image(video,0,0,500,500);
    song1_status = music1.isPlaying();
    song2_status = music2.isPlaying();
    if(scoreleftwristY>0.2){
        circle(leftwristX-80,leftwristY,20);
        music2.stop();
        if(song1_status==false){
            music1.play();
            document.getElementById("song_name").innerHTML = "First song is playing" ;
        }
    }
    if(scorerightwristY>0.2){
        circle(rightwristX-80,rightwristY,20);
        music1.stop();
        if(song2_status==false){
            music2.play();
            document.getElementById("song_name").innerHTML = "Second song is playing" ;
        }
    }
}

