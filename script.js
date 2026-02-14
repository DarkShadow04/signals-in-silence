/* =========================
GLOBAL VARIABLES
========================= */

let popupTriggered = false;
let popupTimerStarted = false;


/* =========================
START EVERYTHING
========================= */

window.addEventListener("load", () => {

initFireflies();

createFloatingHearts();

initMusic();

initSecretHeart();

initScrollPopup();

});


/* =========================
NAME GATE LOGIC
========================= */

function showLoveMessage(){

const name =
document
.getElementById("loveNameInput")
.value
.trim()
.toLowerCase();

resetPopupState();

document.getElementById("nameGate").style.display = "none";

if(name === "silpa"){

document.getElementById("silpaSection").style.display = "block";

}
else if(name === "diya"){

document.getElementById("diyaSection").style.display = "block";

}
else{

document.getElementById("nameError").innerText =
"Please enter your name";

document.getElementById("nameGate").style.display = "flex";

return;

}

document.getElementById("gratitudeSection").style.display = "block";

window.scrollTo(0,0);

}


/* =========================
BACK BUTTON
========================= */

function goBack(){

document.getElementById("silpaSection").style.display = "none";

document.getElementById("diyaSection").style.display = "none";

document.getElementById("gratitudeSection").style.display = "none";

document.getElementById("nameGate").style.display = "flex";

resetPopupState();

}


/* =========================
RESET POPUP STATE
========================= */

function resetPopupState(){

popupTriggered = false;

popupTimerStarted = false;

const existing =
document.getElementById("endPopup");

if(existing) existing.remove();

}


/* =========================
FIRELIES SYSTEM
========================= */

function initFireflies(){

const canvas =
document.getElementById("fireflies");

if(!canvas) return;

const ctx =
canvas.getContext("2d");

let particles = [];

function resize(){

canvas.width =
window.innerWidth;

canvas.height =
Math.max(
window.innerHeight,
document.body.scrollHeight
);

}

resize();

window.addEventListener("resize", resize);

for(let i=0;i<60;i++){

particles.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

size:Math.random()*2+0.5,

speed:Math.random()*0.4+0.1

});

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

for(let p of particles){

p.y -= p.speed;

if(p.y < 0){

p.y = canvas.height;

p.x = Math.random()*canvas.width;

}

ctx.beginPath();

ctx.arc(p.x,p.y,p.size,0,Math.PI*2);

ctx.fillStyle="rgba(255,140,200,0.8)";

ctx.fill();

}

requestAnimationFrame(animate);

}

animate();

}


/* =========================
FLOATING HEARTS
========================= */

function createFloatingHearts(){

setInterval(()=>{

const heart =
document.createElement("div");

heart.className="floatingHeart";

heart.innerHTML="❤";

heart.style.left =
Math.random()*100 + "vw";

heart.style.fontSize =
(Math.random()*15+10) + "px";

heart.style.animationDuration =
(Math.random()*5+5) + "s";

document.body.appendChild(heart);

setTimeout(()=>{

heart.remove();

},8000);

},800);

}


/* =========================
SECRET HEART MESSAGE
========================= */

function initSecretHeart(){

const heart =
document.getElementById("heart");

const secret =
document.getElementById("eggMsg");

if(!heart || !secret) return;

heart.onclick = ()=>{

secret.style.display="flex";

};

secret.onclick = ()=>{

secret.style.display="none";

};

}


/* =========================
END SCROLL POPUP WITH DELAY
========================= */

function initScrollPopup(){

window.addEventListener("scroll", ()=>{

const scrollBottom =
window.innerHeight + window.scrollY >=
document.body.offsetHeight - 5;

if(scrollBottom && !popupTimerStarted){

popupTimerStarted = true;

setTimeout(()=>{

if(!popupTriggered){

createEndPopup();

popupTriggered = true;

}

},10000);

}

});

}


/* =========================
CREATE END POPUP
========================= */

function createEndPopup(){

if(document.getElementById("endPopup")) return;

const overlay = document.createElement("div");

overlay.id = "endPopup";

overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.display = "flex";
overlay.style.justifyContent = "center";
overlay.style.alignItems = "center";
overlay.style.background = "rgba(0,0,0,0.55)";
overlay.style.zIndex = "9999";
overlay.style.opacity = "0";
overlay.style.transition = "opacity 1.2s ease";

overlay.innerHTML = `

<div style="
max-width:90%;
width:420px;
padding:35px 30px;
border-radius:22px;

background:linear-gradient(135deg,#ff4d6d,#ff9acb);

box-shadow:
0 0 40px rgba(255,80,140,0.9),
0 0 80px rgba(255,80,140,0.6);

text-align:center;

font-size:18px;
line-height:1.7;

color:white;

transform:scale(0.92);
transition:transform 1.2s ease, opacity 1.2s ease;
opacity:0;
">

Thank you for everything.<br><br>

For your support.<br>
For your strength.<br>
For being there when I needed it the most.<br><br>

Our paths may be different,<br>
but your presence remains part ofv of my journey.<br><br>

I wish you peace.<br>
I wish you happiness.<br>
I wish you everything beautiful.<br><br>

Happy Valentine's Day.

</div>
`;

document.body.appendChild(overlay);

const box = overlay.firstElementChild;


/* fade in */

setTimeout(()=>{

overlay.style.opacity = "1";
box.style.opacity = "1";
box.style.transform = "scale(1)";

},200);


/* stay for 8 seconds, then fade away */

setTimeout(()=>{

overlay.style.opacity = "0";
box.style.opacity = "0";
box.style.transform = "scale(0.92)";

setTimeout(()=>{

overlay.remove();

},1200);

},8000);

}

/* =========================
MUSIC SYSTEM
========================= */

function initMusic(){

const music =
document.getElementById("bgMusic");

if(!music) return;

document.addEventListener("click", ()=>{

if(music.paused){

music.volume=0.6;

music.play();

}

},{once:true});

}