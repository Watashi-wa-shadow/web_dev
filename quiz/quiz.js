let questions = [
    {
        question: "Which keyword is used to declare a variable?",
        options: ["var", "int", "string", "define"],
        answer: "var"
    },

    {
        question: "Which symbol is used for strict equality?",
        options: ["=", "==", "===", "!="],
        answer: "==="
    },

    {
        question: "Which method adds an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "slice()"],
        answer: "push()"
    },

    {
        question: "Which method removes the last element from an array?",
        options: ["shift()", "pop()", "remove()", "delete()"],
        answer: "pop()"
    },

    {
        question: "Which keyword is used to create a constant variable?",
        options: ["var", "let", "const", "constant"],
        answer: "const"
    },

    {
        question: "Which method is commonly used to select an element using its CSS selector?",
        options: ["getElement()", "querySelector()", "selectElement()", "findElement()"],
        answer: "querySelector()"
    },

    {
        question: "What does JSON.stringify() do?",
        options: [
            "Converts a string into an object",
            "Converts an object into a JSON string",
            "Deletes an object",
            "Converts an array into a number"
        ],
        answer: "Converts an object into a JSON string"
    },

    {
        question: "Which method is used to convert a JSON string back into a JavaScript object?",
        options: ["JSON.convert()", "JSON.stringify()", "JSON.parse()", "JSON.object()"],
        answer: "JSON.parse()"
    },

    {
        question: "Which operator is used to find the remainder of a division?",
        options: ["/", "%", "//", "rem"],
        answer: "%"
    },

    {
        question: "Which keyword is used to define a function?",
        options: ["function", "func", "define", "method"],
        answer: "function"
    }
];
let quest = document.querySelector("#question");
let options = document.querySelector("#options");
let questionNumber = document.querySelector("#questionNumber");
let nextButton = document.querySelector("#nextButton");
//let score = document.querySelector("#score");
let restartButton = document.querySelector("#restartButton");

let val = 1;
let score = 0;
let num;
let used = new Map();
quizGame();
function quizGame(){
    num = Math.floor(Math.random() * 10);
     if (used.has(num)) {
        quizGame();
        return;
    }
    used.set(num, true);
    quest.innerText = questions[num].question;
    options.innerHTML = `
        <div>
            ${questions[num].options[0]}
            <input type="radio" name="option" value="0">
        </div>

        <div>
            ${questions[num].options[1]}
            <input type="radio" name="option" value="1">
        </div>

        <div>
            ${questions[num].options[2]}
            <input type="radio" name="option" value="2">
        </div>

        <div>
            ${questions[num].options[3]}
            <input type="radio" name="option" value="3">
        </div>
    `;
}
nextButton.addEventListener("click",() =>{
     let selected = options.querySelector('input[name="option"]:checked');

    if (!selected) {
       let message = document.createElement("div");
        message.innerText = "Please select an option";

        message.style.position = "fixed";
        message.style.top = "20px";
        message.style.right = "20px";
        message.style.padding = "15px";
        message.style.backgroundColor = "red";
        message.style.color = "white";
        message.style.borderRadius = "5px";

        document.body.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 1000)
        return;
    }
    if(questions[num].options[selected.value] === questions[num].answer)
                score++;
    if(val === 5){
        quest.innerText = "Quiz completed";
        options.innerHTML = `Score is ${score}`;
        nextButton.disabled = true;
    }
    else{
        quizGame();
        val ++;
        questionNumber.innerText = `Question ${val} / 5`;
        
        
    }
})

restartButton.addEventListener("click",() =>{
    val = 1;
    used.clear();
    score = 0;
    questionNumber.innerText = `Question ${val} / 5`;
    quizGame();
    nextButton.disabled = false;
})