let container = document.querySelector(".container");
let game = document.querySelector(".game");
let boxes = document.querySelectorAll(".box");
let message = document.querySelectorAll(".message-container");
let resetBtn = document.querySelector("#resetBtn");
let newGame = document.querySelector("#newGame");
let msg =document.querySelector("#message");
let value=true;
let count=0;
    boxes.forEach((box) => {
     let GameFunction = box.addEventListener("click",() => {
    if(value === true){
        box.innerText= "0";
        value=false;
        box
    }
    else {
        box.innerText="X";
        value=true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();
    if(count=== 9 && !isWinner)
     gamedraw();
})
})
const boxdisabled = () => {
    for (let box of boxes){
        box.disabled = true;
    }
}
const WinCondition = [[0,1,2] , [3,4,5] , [6,7,8] , [0,4,8], [2,4,6] , [0,3,6] , [1,4,7] , [2,5,8]];
const showwinner = (winner) => {
    msg.innerText=`The winner is ${winner}`;
    boxdisabled();
    count=0;
    // message.classList.remove("hide");
}
const gamedraw = () => {
    // message.classList.remove("hide");
    msg.innerText="game is draw";
    boxdisabled();
}
const checkWinner = () => {
    for (let win of WinCondition){
        let positionVal1 = boxes[win[0]].innerText;
        let positionVal2 = boxes[win[1]].innerText;
        let positionVal3 = boxes[win[2]].innerText;
        if( positionVal1 != "" && positionVal2 != "" && positionVal3 != ""){
            if(positionVal1 === positionVal2 && positionVal2 === positionVal3){
                showwinner(positionVal1);
                return true;
            }
        }
    }
}
resetBtn.addEventListener("click",() =>{
        boxes.forEach((box) => {
            box.innerText="";
            box.disabled = false;
        })
})
newGame.addEventListener("click",() =>{
        boxes.forEach((box) => {
            box.innerText="";
            box.disabled = false;
        })
})
