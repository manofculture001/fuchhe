const photos=[
  "photos/1.jpg","photos/2.jpg","photos/3.jpg",
  "photos/4.jpg","photos/5.jpg","photos/6.jpg"
];

const loading=document.getElementById("loading");
const countdown=document.getElementById("countdown");
const countHolder=document.getElementById("countHolder");
const actor=document.getElementById("actor");
const bouquet=document.getElementById("bouquet");
const flower=document.getElementById("flower");
const text=document.getElementById("text");
const restart=document.getElementById("restart");

function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

async function startCountdown(){
  for(let i=3;i>=1;i--){
    const el=document.createElement("div");
    el.className="count";
    el.textContent=i;
    countHolder.innerHTML="";
    countHolder.appendChild(el);
    await sleep(1200);
  }
  countdown.style.display="none";
  startScene();
}

function startScene(){
  actor.classList.add("walk");
  setTimeout(()=>{
    createBouquet();
    text.classList.add("show");
    restart.classList.add("show");
    createFloatingHearts();
  },7000);
}

function createBouquet(){
  flower.innerHTML="";
  const centerX = flower.offsetWidth / 2;
  const centerY = flower.offsetHeight / 2;

  let usedPhotos=[];
  function getPhoto(){
    for(let i=0;i<photos.length;i++){
      if(!usedPhotos.includes(i)){
        usedPhotos.push(i); return photos[i];
      }
    }
    return photos[Math.floor(Math.random()*photos.length)];
  }

  function createPetal(x, y, size, imgSrc, angle=0){
    const petal=document.createElement("div");
    petal.className="petal";
    petal.style.width=size+"px";
    petal.style.height=size+"px";
    petal.style.left=x+"px";
    petal.style.top=y+"px";
    petal.style.transform=`translate(-50%, -50%) rotate(${angle}deg)`;

    const img=document.createElement("img");
    img.src=imgSrc;
    petal.appendChild(img);

    addClickHandler(petal);
    flower.appendChild(petal);
  }

  // Center petal
  createPetal(centerX, centerY, 100, photos[photos.length-1]);

  // Surrounding petals
  const layers=[
    {count:8, radius:120, size:80},
    {count:12, radius:200, size:70}
  ];

  layers.forEach(layer=>{
    const angleStep=(2*Math.PI)/layer.count;
    for(let i=0;i<layer.count;i++){
      const angle=i*angleStep;
      const x=centerX + Math.cos(angle)*layer.radius;
      const y=centerY + Math.sin(angle)*layer.radius;
      createPetal(x, y, layer.size, getPhoto(), angle*180/Math.PI);
    }
  });
}

function addClickHandler(petal){
  const close=document.createElement("button");
  close.className="close-btn";
  close.textContent="×";
  close.onclick=e=>{
    e.stopPropagation();
    flower.classList.remove("dim");
    document.querySelectorAll(".petal").forEach(p=>p.classList.remove("active"));
  };
  petal.appendChild(close);

  petal.onclick=e=>{
    e.stopPropagation();
    flower.classList.add("dim");
    document.querySelectorAll(".petal").forEach(p=>p.classList.remove("active"));
    petal.classList.add("active");
  };
}

function createFloatingHearts(){
  for(let i=0;i<40;i++){
    const heart=document.createElement("div");
    heart.className="heart";
    heart.style.left=Math.random()*100+"%";
    heart.style.top=-20+"px";
    heart.style.width=5+Math.random()*10+"px";
    heart.style.height=5+Math.random()*10+"px";
    document.body.appendChild(heart);
    let speed=0.5+Math.random()*1;
    function fall(){
      let top=parseFloat(heart.style.top);
      if(top>window.innerHeight){
        heart.style.top=-20+"px";
        heart.style.left=Math.random()*100+"%";
      } else {
        heart.style.top=(top+speed)+"px";
        heart.style.left=parseFloat(heart.style.left)+Math.sin(top/50)*0.3+"%";
      }
      requestAnimationFrame(fall);
    }
    fall();
  }
}

restart.onclick=()=>{
  actor.classList.remove("walk");
  flower.innerHTML="";
  document.querySelectorAll(".heart").forEach(h=>h.remove());
  countdown.style.display="grid";
  startCountdown();
};

setTimeout(()=>{loading.style.display="none";startCountdown();},1500);
