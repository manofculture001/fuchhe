const loading = document.getElementById("loading");
const countdown = document.getElementById("countdown");
const countHolder = document.getElementById("countHolder");
const actor = document.getElementById("actor");
const bouquet = document.getElementById("bouquet");
const restart = document.getElementById("restart");
const petals = document.querySelectorAll(".petal");

setTimeout(() => {
  loading.classList.add("hidden");
  startCountdown();
}, 1500);

function startCountdown(){
  countdown.classList.remove("hidden");
  let count = 3;
  countHolder.textContent = count;

  const interval = setInterval(()=>{
    count--;
    countHolder.textContent = count;
    if(count === 0){
      clearInterval(interval);
      countdown.classList.add("hidden");
      showMain();
    }
  },1000);
}

function showMain(){
  actor.classList.remove("hidden");
  bouquet.classList.remove("hidden");
  restart.classList.remove("hidden");
  createHearts();
}

petals.forEach(petal=>{
  petal.addEventListener("click",()=>{
    petals.forEach(p=>p.classList.remove("open"));
    petal.classList.add("open");
  });
});

restart.addEventListener("click",()=>{
  location.reload();
});

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
