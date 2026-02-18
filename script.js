const board = document.querySelector('.board');
const startbutton =document.querySelector('.btn-start');
const modal = document.querySelector('.modal');
const StarGameModal = document.querySelector('.start-game')
const GameoverModal = document.querySelector('.game-over')
const restartbtn = document.querySelector('.btn-rester')

const hightscore = document.querySelector('#high-score')
const score = document.querySelector('#score')
const time = document.querySelector('#time')


const blockHieght = 30
const blockWidth = 30

let hightsco = localStorage.getItem("hightsco") || 0
let sco = 0
let timesco = '00-00'

hightscore.innerText = hightsco


const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHieght);
let intervalId= null;
let timeIntervalId = null;

let food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)

}
const blocks = [];
let snake =[{
    x: 1, y: 3
}
]

let direction = 'down'

for (let row = 0; row < rows; row++){
    for(let col = 0; col < cols; col++){
    const block = document.createElement('div');
    block.classList.add('block')
    board.appendChild(block);
    // block.innerText = `${row} -${col}`;  
    blocks[`${row}-${col}`] = block
    }
}


function render(){
     let head = null 
     
     blocks[`${food.x}-${food.y}`] .classList.add("food")

    if(direction === 'left'){
        head = {x: snake[0].x, y: snake[0].y - 1}
    }else if(direction === "right") {
      head = {x: snake[0].x, y: snake[0].y + 1}
    }else if(direction === "down") {
      head = {x: snake[0].x + 1, y: snake[0].y}
    }else if(direction === "up") {
      head = {x: snake[0].x - 1, y: snake[0].y}
    }

     snake.forEach(seg=>{
    blocks[`${seg.x}-${seg.y}`].classList.remove("fill")
   })

   if (head.x < 0 || head.x >= rows|| head.y < 0 || head.y >= cols){

    clearInterval(intervalId)
    
    modal.style.display = 'flex'
    StarGameModal.style.display='none'
    GameoverModal.style.display = 'flex'

    return;
   }

   for (let seg of snake) {
    if (seg.x === head.x && seg.y === head.y) {
         restartGame();
        return;
    }
}

   if(head.x==food.x && head.y==food.y){
     blocks[`${food.x}-${food.y}`] .classList.remove("food")
     food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)
    }
     blocks[`${food.x}-${food.y}`] .classList.add("food")
     snake.unshift(head)

     sco += 10
     score.innerText = sco

     if(sco > hightsco){
        hightsco = sco
        localStorage.setItem("hightsco", hightsco)
     }
   }

    snake.unshift(head)
    snake.pop()
   snake.forEach(seg=>{
    blocks[`${seg.x}-${seg.y}`].classList.add("fill")
   })
}


startbutton.addEventListener("click", ()=>{
    modal.style.display = "none";
    intervalId = setInterval(() => {render()} , 200)
    timeIntervalId = setInterval (()=>{
        let [min, sec] = timesco.split("-").map(Number)

        if(sec == 59){
            min += 1
            sec = 0
        }else{
            sec +=1
        }
        timesco = `${min}-${sec}`
        time.innerText = timesco
        
    }, 1000)
})

restartbtn.addEventListener("click", restartGame)

function restartGame() {
    direction= "down"
    blocks[`${food.x}-${food.y}`] .classList.remove("food")
    snake.forEach(seg => {
    blocks[`${seg.x}-${seg.y}`].classList.remove("fill")
    })

    sco = 0
    timesco = '00-00'

    score.innerText = sco
    time.innerText = timesco
    hightscore.innerText = hightsco

    modal.style.display = "none";
     snake =[ { x: 1, y: 3} ];
     food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
     intervalId = setInterval(() => {render()} , 200)


}

addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        direction = "up"
    }
    else if (event.key === "ArrowRight") {
        direction = "right"
    }
    else if (event.key === "ArrowLeft") {
        direction = "left"
    }
    else if (event.key === "ArrowDown") {
        direction = "down"
    }
})

