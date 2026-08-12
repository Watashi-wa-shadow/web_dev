let arr =JSON.parse(localStorage.getItem("tracker")) || [];
let expense = document.querySelector("#expenseName");
let btn = document.querySelector("#addButton");
let amount = document.querySelector("#expenseAmount");
let expenseList = document.querySelector("#expenseList");
let total = document.querySelector("#total")
btn.addEventListener("click",() => {
    arr.push({
        expense : expense.value,
        amount : amount.value,
    })
    localStorage.setItem("tracker",JSON.stringify(arr));
    expense.value = "";
    amount.value = "";
    display();
})
function display(){
    expenseList.innerHTML = "";
    let sum = 0;
    for(let i=0;i<arr.length;i++){
        let item = document.createElement("div");
        Object.assign(item.style, {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap : "15px",
            marginBottom: "10px"
        });
        let para1 = document.createElement("p");
        para1.innerText = arr[i].expense;
        let para2 = document.createElement("p");
        para2.innerText = arr[i].amount;
        sum += Number(arr[i].amount);
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        Object.assign(para1.style, {
            width: "250px",
            fontSize: "1.6rem",
            textAlign : "left"
        });

        Object.assign(para2.style, {
            width: "250px",
            fontSize: "1.6rem",
            textAlign : "center"
        });
        Object.assign(deleteBtn.style, {
            width : "100px",
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px"
        });
        total.innerText = sum;
        deleteBtn.addEventListener("click",() => {
            arr.splice(i,1);
            localStorage.setItem("tracker",JSON.stringify(arr));
            display();
        })
        item.append(para1);
        item.append(para2);
        item.append(deleteBtn);
        expenseList.append(item);
    }
    total.innerText = sum;
}
display();
