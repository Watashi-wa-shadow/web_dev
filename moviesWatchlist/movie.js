let movieName = document.querySelector("#movieName");
let genre = document.querySelector("#genre");
let ratings = document.querySelector("#rating");
let status = document.querySelector("#status");
let addButton = document.querySelector("#addButton");
let allButton = document.querySelector("#allButton");
let watchedButton = document.querySelector("#watchedButton");
let unwatchedButton = document.querySelector("#unwatchedButton");
let movieList = document.querySelector("#movieList");
let all = JSON.parse(localStorage.getItem("movies")) || [];
addButton.addEventListener("click",() =>{
    if(ratings.value<0){
        ratings.value = 0;
    }
    if(ratings.value > 10){
        ratings.value = 10;
    }
    all.push({
        name : movieName.value,
        gen : genre.value,
        rating : ratings.value,
        status : status.value
    })
    localStorage.setItem("movies", JSON.stringify(all));
    display(all);
    movieName.value = "";
    genre.value = "";
    ratings.value = "";
    status.value = "unwatched";
});
function display(arr){
     movieList.innerHTML = ``;
    for(let i=0;i<arr.length;i++){
        let value = document.createElement("div");
        value.className = "movie";
        value.innerHTML = `
            <p>Name : ${arr[i].name}</p>
            <p>Genre : ${arr[i].gen}</p>
            <p>Rating : ${arr[i].rating}</p>
        `;
        let value2 = document.createElement("button");
        value2.innerText = "Delete";
        value2.id = "deleteButton";
        Object.assign(value2.style, {
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: "pointer"
        });
        let btn = document.createElement("button");
        btn.className = "btn";
        btn.innerText = `Status : ${arr[i].status}`;
        if(arr[i].status === "watched"){
            Object.assign(btn.style, {
                backgroundColor: "green",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer"
            });
        }
        else{
            Object.assign(btn.style, {
                backgroundColor: "grey",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer"
            });
        }
        value2.addEventListener("click", () => {
            let index = all.indexOf(arr[i]);
            arr.splice(i, 1);
            localStorage.setItem("movies", JSON.stringify(all));
            display(arr);
        });
        btn.addEventListener("click",() => {
            if(arr[i].status === "watched"){
                btn.innerText = "Status : unwatched";
                arr[i].status = "unwatched";
                Object.assign(btn.style, {
                backgroundColor: "grey",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer"
                });
            }
            else{
                arr[i].status = "watched";
                btn.innerText = "Status : watched";
                Object.assign(btn.style, {
                backgroundColor: "green",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer"
                });
                
            }
            localStorage.setItem("movies", JSON.stringify(all));
        })
        value.append(btn);
        value.appendChild(value2);
        movieList.appendChild(value);
    }
}
watchedButton.addEventListener("click", () => {
    let watched = all.filter(movie => movie.status === "watched");
    display(watched);
});

unwatchedButton.addEventListener("click", () => {
    let unwatched = all.filter(movie => movie.status === "unwatched");
    display(unwatched);
});

allButton.addEventListener("click", () => {
    display(all);
});
display(all);