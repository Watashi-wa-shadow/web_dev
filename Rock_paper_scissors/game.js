let userscore = 0;
let compscore = 0;
let comp = document.querySelector("#score1");
let user = document.querySelector("#score");
let choices = document.querySelectorAll(".choice");
let msg = document.querySelector(".msg");

const computerchoice = () =>{
    let options = ["rock","paper","scissors"];
    let idx = Math.floor(Math.random ()* 3);
    console.log(options[idx]);
    return options[idx];
}

const scoreboard = (user_choice) => {
        if(user_choice == true){
            userscore++;
            user.innerText = userscore;
        }
        else{
            compscore++;
            comp.innerText= compscore;
        }
}

const matchdraw = () => {
        msg.innerText = "Game is drawn. Play again.";
        msg.style.backgroundColor = "black";
}
const showwinner = (user_choice, userChoice, compchoice) => {
        if(user_choice == true){
            msg.innerText=`You won. Your ${userChoice} beats ${compchoice}`;
            msg.style.backgroundColor = "green";
        }
        else{
            msg.innerText =`You lost.${compchoice} beats Your ${userChoice}`;
            msg.style.backgroundColor = "red";
        }
        scoreboard(user_choice);
}
const playgame = (userChoice) => {
        let compchoice = computerchoice();
        if(userChoice === compchoice){
            matchdraw();
        }
        else{
            let user_choice = true;
            if(userChoice === "rock"){
                user_choice = compchoice === "scissors"? true : false;
            }
            else if(userChoice === "scissors"){
                user_choice = compchoice ==="paper"? true : false;
            }
            else{
                user_choice = compchoice ==="rock"? true : false;
            }
            showwinner(user_choice, userChoice, compchoice);
             return user_choice;
        }
}
 choices.forEach((choice) => {
    choice.addEventListener("click", () => {
       const userChoice = choice.getAttribute("id");
       playgame(userChoice);
    })
 })