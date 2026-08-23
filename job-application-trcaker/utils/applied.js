import { arr } from "./data.js";
let state = document.querySelector(".empty-state");
function applyCardStyle(div) {
    Object.assign(div.style, {
        marginBottom: "10px",
        marginTop: "10px",
        width: "100%",
        alignSelf: "flex-start",
        textAlign: "left",

        background: "white",
        padding: "18px",
        border: "1px solid #e2e8f0",
        borderRadius: "10px",
        boxSizing: "border-box",
        transition: "0.2s",
        boxShadow: "0 3px 10px rgba(0, 0, 0, 0.08)",
    });

    const paragraphs = div.querySelectorAll("p");

    paragraphs.forEach((p) => {
        Object.assign(p.style, {
            margin: "8px 0",
            fontSize: "16px",
            color: "#475569",
        });
    });

    const btn = div.querySelector(".btn");
    if (btn){
      Object.assign(btn.style, {
          background: "#fee2e2",
          color: "#dc2626",
          border: "none",
          padding: "8px 15px",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold",
          marginTop: "10px",
      });
    }
}
function appliedDisplay(){
    let filteredArr = arr.filter(item => item.status === "Applied");
    state.innerHTML = ``;
    if (filteredArr.length > 0) {
        for(let i=0;i<filteredArr.length;i++){
            let div = document.createElement("div");
            div.classList.add("container");
            let btn = document.createElement("button");
            btn.classList.add("btn");
            btn.innerText = "Remove";
            div.innerHTML = `
                <p>Company name: ${filteredArr[i].companyName}</p>
                <p>Position: ${filteredArr[i].position}</p>
                <p>Location: ${filteredArr[i].location}</p>
                <p>Salary: ${filteredArr[i].salary}</p>
                <p>Date: ${filteredArr[i].date}</p>
                <p>Status: ${filteredArr[i].status}</p>
            `;
            div.append(btn);
            applyCardStyle(div);
            state.append(div);
            btn.addEventListener("click",() => {
                let index = arr.indexOf(filteredArr[i]);
                if (index !== -1) {
                    arr.splice(index, 1);
                    localStorage.setItem("applications", JSON.stringify(arr));
                    appliedDisplay();
                }
            })
        }
    }
    else {
        state.innerHTML = `<p style="color: #64748b; text-align: center;">No applied applications found.</p>`;
    }
    applied();
}
function applied() {
    let filteredArr = arr.filter(item => item.status === "Applied");
    appliedPageCount.innerHTML = filteredArr.length;
}
appliedDisplay();