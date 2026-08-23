import { arr } from "./data.js";
let totalCountVal = document.querySelector("#totalCount");
let addButton = document.querySelector(".add-btn");
let input  = document.querySelector("#company");
let position  = document.querySelector("#position");
let loc  = document.querySelector("#location");
let salary  = document.querySelector("#salary");
let date  = document.querySelector("#date");
let stat  = document.querySelector("#status");
let applications = document.querySelector("#emptyState");
let appliedCount = document.querySelector("#appliedCount");
let interviewCount = document.querySelector("#interviewCount");
let selectedCount = document.querySelector("#selectedCount");
let rejectedCount = document.querySelector("#rejectedCount");
function showToast(message) {
    // Check if an existing toast is already active to prevent duplicates
    let existingToast = document.querySelector(".floating-toast");
    if (existingToast) existingToast.remove();

    const toast = document.createElement("div");
    toast.className = "floating-toast";
    toast.textContent = message;

    Object.assign(toast.style, {
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#ef4444",
        color: "white",
        padding: "12px 24px",
        borderRadius: "8px",
        fontWeight: "600",
        fontSize: "14px",
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.18)",
        zIndex: "9999",
        transition: "opacity 0.2s ease, transform 0.2s ease",
        opacity: "1",
        pointerEvents: "none"
    });

    document.body.appendChild(toast);

    // Hide and remove after 1 second
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(-50%) translateY(-10px)";
        setTimeout(() => toast.remove(), 200);
    }, 1000);
}
addButton.addEventListener("click",() =>{
    if (
        !input.value.trim() ||
        !position.value.trim() ||
        !loc.value.trim() ||
        !salary.value.trim() ||
        !date.value.trim() ||
        !stat.value.trim()
    ) {
        showToast("Please fill out all the necessary details");
        return; // Stop execution
    }
    arr.push({
        companyName : input.value,
        position : position.value,
        location : loc.value,
        salary : salary.value,
        date : date.value,
        status : stat.value,
    })
    localStorage.setItem("applications", JSON.stringify(arr));
    display();
})
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
function display(listToRender = arr) {
    applications.innerHTML = "";
    for (let i = 0; i < listToRender.length; i++) {
        let div = document.createElement("div");
        div.classList.add("container");
        let btn = document.createElement("button");
        btn.classList.add("btn");
        btn.innerText = "Remove";
        div.innerHTML = `
            <p>Company name: ${listToRender[i].companyName}</p>
            <p>Position: ${listToRender[i].position}</p>
            <p>Location: ${listToRender[i].location}</p>
            <p>Salary: ${listToRender[i].salary}</p>
            <p>Date: ${listToRender[i].date}</p>
            <p>Status: ${listToRender[i].status}</p>
        `;
        div.append(btn);
        applyCardStyle(div);
        applications.append(div);
        
        btn.addEventListener("click",() => {
          let index = arr.indexOf(listToRender[i]);
          if(index !== -1){
            arr.splice(index,1);
            localStorage.setItem("applications", JSON.stringify(arr));
            display();
          }
        })
    }
    displayValue();
}
display();
function displayValue(){
    totalCountVal.innerHTML = arr.length;
    applied();
    interview();
    selected();
    rejected();
}
function applied() {
    let filteredArr = arr.filter(item => item.status === "Applied");
    appliedCount.innerHTML = filteredArr.length;
}

function interview(){
    let filteredArr = arr.filter(item => item.status === "Interview");
    interviewCount.innerHTML = filteredArr.length;
}

function selected(){
    let filteredArr = arr.filter(item => item.status === "Selected");
    selectedCount.innerHTML = filteredArr.length;
}

function rejected(){
    let filteredArr = arr.filter(item => item.status === "Rejected");
    rejectedCount.innerHTML = filteredArr.length;
}

let sortApplications = document.querySelector("#sortApplications");
sortApplications.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    switch(selectedValue){
        case "oldest":
            arr.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case "newest":
            arr.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case "companyAZ":
            arr.sort((a, b) => a.companyName.localeCompare(b.companyName));
            break;
        case "companyZA":
            arr.sort((a, b) => b.companyName.localeCompare(a.companyName));
            break;
        default:
            break;
    }
    localStorage.setItem("applications", JSON.stringify(arr));
    display();
})
let filterStatus = document.querySelector("#filterStatus");
filterStatus.addEventListener("change",(event) =>{
    const selectedValue = event.target.value;
    switch(selectedValue){
        case 'Wishlist':
            wishlistDisplay();
            break;
        case 'Applied':
            appliedDisplay();
            break;
        case 'Interview':
            interviewDisplay();
            break;
        case 'Rejected':
            rejectedDisplay();
            break;
        case 'Selected':
            selectedDisplay();
            break;
        default : 
            display();
            break;
        
    }
})
function wishlistDisplay(){
    let filteredArr = arr.filter(item => item.status === "Wishlist");
    applications.innerHTML = ``;
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
        applications.append(div);
        btn.addEventListener("click",() => {
          let index = arr.indexOf(filteredArr[i]);
          if(index !== -1){
            arr.splice(index, 1);
            localStorage.setItem("applications", JSON.stringify(arr));
            wishlistDisplay();
          }
        })
    }
    displayValue();
}
function appliedDisplay(){
    let filteredArr = arr.filter(item => item.status === "Applied");
    applications.innerHTML = ``;
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
        applications.append(div);
        btn.addEventListener("click",() => {
          let index = arr.indexOf(filteredArr[i]);
          if(index !== -1){
            arr.splice(index, 1);
            localStorage.setItem("applications", JSON.stringify(arr));
            appliedDisplay();
          }
        })
    }
    displayValue();
}
function interviewDisplay(){
    let filteredArr = arr.filter(item => item.status === "Interview");
    applications.innerHTML = ``;
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
        applications.append(div);
        btn.addEventListener("click",() => {
          let index = arr.indexOf(filteredArr[i]);
          if(index !== -1){
            arr.splice(index, 1);
            localStorage.setItem("applications", JSON.stringify(arr));
            interviewDisplay();
          }
        })
    }
    displayValue();
}
function rejectedDisplay(){
    let filteredArr = arr.filter(item => item.status === "Rejected");
    applications.innerHTML = ``;
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
        applications.append(div);
        btn.addEventListener("click",() => {
          let index = arr.indexOf(filteredArr[i]);
          if(index !== -1){
            arr.splice(index, 1);
            localStorage.setItem("applications", JSON.stringify(arr));
            rejectedDisplay();
          }
        })
    }
    displayValue();
}
function selectedDisplay(){
    let filteredArr = arr.filter(item => item.status === "Selected");
    applications.innerHTML = ``;
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
        applications.append(div);
        btn.addEventListener("click",() => {
          let index = arr.indexOf(filteredArr[i]);
          if(index !== -1){
            arr.splice(index, 1);
            localStorage.setItem("applications", JSON.stringify(arr));
            selectedDisplay();
          }
        })
    }
    displayValue();
}
const searchInput = document.querySelector("#search");

if (!searchInput) {
  console.error(" Critical: #search input element not found in DOM! Check your HTML id.");
}

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();

  // If empty, show full array
  if (!query) {
    display(arr);
    return;
  }
  const filtered = arr.filter((app) => {
    // Defensive check: ensure properties are strings and exist
    const company = String(app.companyName || "").toLowerCase();
    const pos = String(app.position || "").toLowerCase();
    const loc = String(app.location || "").toLowerCase();

    return company.includes(query) || pos.includes(query) || loc.includes(query);
  });

  console.log("Filtered matches found:", filtered.length, filtered);

  // Send filtered array to display
  display(filtered);
});
