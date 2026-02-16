const photos=[
  "images/img1.jpeg",
  "images/img2.jpeg",
  "images/img3.jpeg",
  "images/img4.jpeg",
  "images/img5.jpeg",
  "images/img6.jpeg",
  "images/img7.jpeg",
  "images/img8.jpeg",
  "images/img9.jpeg",
  "images/img10.jpeg",
  "images/img11.jpeg",
  "images/img12.jpeg",
  "images/img13.jpeg",
  "images/img14.jpeg",
  "images/img15.jpeg",
  "images/img16.jpeg",
  "images/img17.jpeg",
  "images/img18.jpeg",
  "images/img19.jpeg",
  "images/img20.jpeg",
  "images/img21.jpeg"
];

const loading=document.getElementById("loading");
const countdown=document.getElementById("countdown");
const countHolder=document.getElementById("countHolder");
const actor=document.getElementById("actor");
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
  const centerX=flower.offsetWidth/2;
  const centerY=flower.offsetHeight/2;

  let used=[];
  function getPhoto(){
    for(let i=0;i<photos.length;i++){
      if(!used.includes(i)){used.push(i);return photos[i];}
    }
    return photos[Math.floor(Math.random()*photos.length)];
  }

  function createPetal(x,y,size,img,angle=0){
    const petal=document.createElement("div");
    petal.className="petal";
    petal.style.width=size+"px";
    petal.style.height=size+"px";
    petal.style.left=x+"px";
    petal.style.top=y+"px";
    petal.style.transform=`translate(-50%,-50%) rotate(${angle}deg)`;

    const image=document.createElement("img");
    image.src=img;
    petal.appendChild(image);

    addClickHandler(petal);
    flower.appendChild(petal);
  }

  createPetal(centerX,centerY,100,photos.at(-1));

  [
    {count:8,radius:120,size:80},
    {count:12,radius:200,size:70}
  ].forEach(layer=>{
    const step=(2*Math.PI)/layer.count;
    for(let i=0;i<layer.count;i++){
      const a=i*step;
      createPetal(
        centerX+Math.cos(a)*layer.radius,
        centerY+Math.sin(a)*layer.radius,
        layer.size,
        getPhoto(),
        a*180/Math.PI
      );
    }
  });
}

function addClickHandler(petal){
  const close=document.createElement("button");
  close.className="close-btn";
  close.textContent="×";
  close.onclick=e=>{
    e.stopPropagation();
    document.querySelectorAll(".petal").forEach(p=>p.classList.remove("active"));
  };
  petal.appendChild(close);

  petal.onclick=e=>{
    e.stopPropagation();
    document.querySelectorAll(".petal").forEach(p=>p.classList.remove("active"));
    petal.classList.add("active");
  };
}

function createFloatingHearts(){
  for(let i=0;i<40;i++){
    const h=document.createElement("div");
    h.className="heart";
    h.style.left=Math.random()*100+"%";
    h.style.top="-20px";
    document.body.appendChild(h);

    let speed=0.5+Math.random();
    (function fall(){
      let top=parseFloat(h.style.top);
      if(top>window.innerHeight){
        h.style.top="-20px";
        h.style.left=Math.random()*100+"%";
      }else{
        h.style.top=(top+speed)+"px";
      }
      requestAnimationFrame(fall);
    })();
  }
}

restart.onclick=()=>{
  actor.classList.remove("walk");
  flower.innerHTML="";
  document.querySelectorAll(".heart").forEach(h=>h.remove());
  countdown.style.display="grid";
  startCountdown();
};

setTimeout(()=>{
  loading.style.display="none";
  startCountdown();
},1500);
.text{
  position:absolute;
  bottom:25px;              /* moved downward */
  width:100%;
  text-align:center;
  font-size:22px;           /* reduced size */
  font-weight:600;
  opacity:0;
  transition:opacity 1.5s ease;
  line-height:1.4;
  z-index:30;
  padding:0 16px;           /* prevents overflow on mobile */
}

.text.show{
  opacity:1;
}
@media (max-width: 768px) {

  .stage{
    border-radius:16px;
  }

  .text{
    font-size:18px;        /* smaller text for mobile */
    bottom:18px;
  }

  .restart{
    bottom:15px;
    right:15px;
    padding:10px 20px;
    font-size:15px;
  }

  .petal.active{
    width:90vw !important;
    height:auto !important;
    max-height:70vh;
  }

  .bouquet{
    width:90vw;
    height:90vw;
    top:48%;
  }
}
@media (max-width: 480px) {

  .text{
    font-size:16px;
  }

  .restart{
    font-size:14px;
    padding:8px 18px;
  }
}
