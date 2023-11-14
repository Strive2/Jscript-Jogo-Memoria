const emojis = [
    "😀",
    "😀",
    "😎",
    "😎",
    "🤩",
    "🤩",
    "🤗",
    "🤗",
    "😮",
    "😮",
    "😛",
    "😛",
    "🙃",
    "🙃",
    "😤",
    "😤",
]

let openCards = []

let shuffleEmojis = emojis.sort(() => Math.random() > 0.5 ? 2 : -1);

let timer = 0;
let misses = 0;
let time = "";

for(let i = 0; i < emojis.length; i++){
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

function handleClick(){
    if(openCards.length < 2 && !this.className.includes("boxOpen")){
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if(openCards.length === 2){
        setTimeout(checkForMatch, 850);
    }
}

function checkForMatch(){
    if(openCards[0].innerHTML === openCards[1].innerHTML){
        openCards[0].classList.add("boxMatched");
        openCards[1].classList.add("boxMatched");
    } else{
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
        document.getElementById("misses").innerHTML = ++misses;
    }

    openCards = [];

    if(document.querySelectorAll(".boxMatched").length === emojis.length){
        alert("Fim de jogo! \nTempo final: " + time + "\nErros: " + misses);
        clearTimeout(startTimer);
    }
}

const startTimer = setInterval(() =>{
    timer++;
    let minutes = Math.floor(timer/60)
    let seconds = timer%60;

    if(seconds < 10){
        time = minutes + ":0" + seconds;
    } else{
        time =  minutes + ":" + seconds;
    }
    console.log(time);
    document.getElementById("timer").innerText = time;
    }, 1000)