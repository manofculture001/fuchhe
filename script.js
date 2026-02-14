const loading = document.getElementById("loading");
const countdown = document.getElementById("countdown");
const countHolder = document.getElementById("countHolder");
const actor = document.getElementById("actor");
const bouquet = document.getElementById("bouquet");
const restart = document.getElementById("restart");
const petals = document.querySelectorAll(".petal");
const textMsg = document.getElementById("text");

// Show loading first
setTimeout(() => {
  loading.classList.add("hidden");
  startCountdown();
}, 1500);

// Countdown 3 → 2 → 1
function startCountdown(){
  countdown.classList.remove("hidden");
  let count = 3;
  countHolder.textContent = count;

  const interval = setInterval(()=>{
    count--;
    if(count>0){
      countHolder.textContent = count;
    } else {
      clearInterval(interval);
      countdown.classList.add("hidden");
      showActor();
    }
  },1000);
}

// Stickman walks in
function showActor(){
  actor.classList.remove("hidden");
  setTimeout(()=>{ actor.style.left = "10%"; }, 50);
  setTimeout(showBouquet, 2000);
}

// Show bouquet and text
function showBouquet(){
  bouquet.classList.remove("hidden");
  textMsg.classList.remove("hidden");
  createHearts();
}

// Petal click interaction
petals.forEach(petal=>{
  petal.addEventListener("click",()=>{
    petals.forEach(p=>p.classList.remove("open"));
    petal.classList.add("open");
  });
});

// Restart button
restart.addEventListener("click",()=> location.reload());

// Hearts floating
function createHearts(){
  setInterval(()=>{
    const heart = document.createElement("div");
    heart.className="heart";
    heart.textContent="💖";
    heart.style.left=Math.random()*100+"vw";
    heart.style.animationDuration = (3 + Math.random()*3) + "s";
    document.body.appendChild(heart);
    setTimeout(()=> heart.remove(),6000);
  },500);
}
