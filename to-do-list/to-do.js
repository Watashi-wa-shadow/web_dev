let addbutton = document.querySelector(".addButton");
let placeholder = document.querySelector(".inputData");
let output = document.querySelector(".output");
let calendar = document.querySelector(".calendar");

let arr = JSON.parse(localStorage.getItem("todoList")) || [];

addbutton.onclick = function() {
    arr.push({
        text: placeholder.value,
        due: calendar.value
    });
    localStorage.setItem("todoList", JSON.stringify(arr));
    placeholder.value = "";
    calendar.value = "";
    
    display();
};

function display() {
    output.innerHTML = ""; // clear old content

    for(let i = 0; i < arr.length; i++) {

        let para1 = document.createElement("p");
        para1.innerText = arr[i].text;

        let para2 = document.createElement("p");
        para2.innerText = arr[i].due;
        //para2.style.fontSize = "2rem";

        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";

        Object.assign(deleteButton.style,{
            fontSize: "1rem",
            backgroundColor: "#ef4444",
            color: "white",
            borderRadius: "8px",
            width: "100px",
            height: "45px",

            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        });

        deleteButton.onclick = function() {
            arr.splice(i,1); // remove object from array
            localStorage.setItem("todoList", JSON.stringify(arr));
            display();       // redraw
        };

        output.appendChild(para1);
        output.appendChild(para2);
        output.appendChild(deleteButton);
    }
}
display();