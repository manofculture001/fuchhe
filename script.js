// ====== PUT YOUR LOCAL IMAGES HERE ======
const photos = [
  "images/photo1.jpg",
  "images/photo2.jpg",
  "images/photo3.jpg",
  "images/photo4.jpg"
];

// ====== ELEMENTS ======
const loading = document.getElementById("loading");
const countdown = document.getElementById("countdown");
const countHolder = document.getElementById("countHolder");
const actor = document.getElementById("actor");
const flower = document.getElementById("flower");
const text = document.getElementById("text");
const restart = document.getElementById("restart");

// ====== PRELOAD IMAGES ======
function preloadImages(){
  photos.forEach(src=>{
    const img = new Image();
    img.src = src;
  });
}

// ====== SLEEP FUNCTION ======
function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

// ====== COUNTDOWN ======
async function startCountdown(){
  for(let i = 3; i >= 1; i--){
    const el = document.createElement("div");
    el.className = "count";
    el.textContent = i;
    countHolder.innerHTML = "";
    countHolder.appendChild(el);
    await sleep(1000);
  }
  countdown.style.display = "none";
  startScene();
}

// ====== START SCENE ======
function startScene(){
  actor.classList.add("walk");

  setTimeout(()=>{
    createBouquet();
    text.classList.add("show");
    restart.classList.add("show");
    createFloatingHearts();
  },7000);
}

// ====== CREATE BOUQUET ======
function createBouquet(){
  flower.innerHTML = "";

  requestAnimationFrame(()=>{

    const centerX = flower.clientWidth / 2;
    const centerY = flower.clientHeight / 2;

    let photoIndex = 0;

    function getPhoto(){
      return photos[photoIndex++ % photos.length];
    }

    function createPetal(x, y, size, imgSrc, angle=0){
      const petal = document.createElement("div");
      petal.className = "petal";
      petal.style.width = size + "px";
      petal.style.height = size + "px";
      petal.style.left = x + "px";
      petal.style.top = y + "px";
      petal.style.transform =
        `translate(-50%, -50%) rotate(${angle}deg)`;

      const img = document.createElement("img");
      img.src = imgSrc;
      petal.appendChild(img);

      addClickHandler(petal);
      flower.appendChild(petal);
    }

    // center
    createPetal(centerX, centerY, 100, getPhoto());

    const layers = [
      {count:8, radius:120, size:80},
      {count:12, radius:200, size:70}
    ];

    layers.forEach(layer=>{
      const angleStep = (2 * Math.PI) / layer.count;

      for(let i=0;i<layer.count;i++){
        const angle = i * angleStep;
        const x = centerX + Math.cos(angle) * layer.radius;
        const y = centerY + Math.sin(angle) * layer.radius;

        createPetal(
          x,
          y,
          layer.size,
          getPhoto(),
          angle * 180 / Math.PI
        );
      }
    });

  });
}

// ====== CLICK ZOOM ======
function addClickHandler(petal){

  const close = document.createElement("button");
  close.className = "close-btn";
  close.textContent = "×";

  close.onclick = e=>{
    e.stopPropagation();
    flower.classList.remove("dim");
    document
      .querySelectorAll(".petal")
      .forEach(p=>p.classList.remove("active"));
  };

  petal.appendChild(close);

  petal.onclick = e=>{
    e.stopPropagation();
    flower.classList.add("dim");
    document
      .querySelectorAll(".petal")
      .forEach(p=>p.classList.remove("active"));
    petal.classList.add("active");
  };
}

// ====== FLOATING HEARTS ======
function createFloatingHearts(){
  for(let i=0;i<30;i++){
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = Math.random()*100 + "%";
    heart.style.top = "-20px";
    document.body.appendChild(heart);

    let speed = 0.5 + Math.random();

    function fall(){
      let top = parseFloat(heart.style.top);

      if(top > window.innerHeight){
        heart.style.top = "-20px";
      } else {
        heart.style.top = (top + speed) + "px";
      }

      requestAnimationFrame(fall);
    }

    fall();
  }
}

// ====== RESTART ======
restart.onclick = ()=>{
  actor.classList.remove("walk");
  flower.innerHTML = "";
  document.querySelectorAll(".heart").forEach(h=>h.remove());
  text.classList.remove("show");
  restart.classList.remove("show");
  countdown.style.display = "grid";
  startCountdown();
};

// ====== START ======
preloadImages();
setTimeout(()=>{
  loading.style.display="none";
  startCountdown();
},1000);
