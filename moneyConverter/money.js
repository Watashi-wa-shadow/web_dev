let input = document.querySelector(".input-group");
let fromCurrency = document.querySelector("#fromCurrency");
let toCurrency = document.querySelector("#toCurrency");
let convertButton = document.querySelector(".convert-button");
let result = document.querySelector(".result");
let rate;
let from ;
let to ;
let countries;
let amount = document.querySelector("#amount");
convertButton.addEventListener("click",() =>{
    conversion();
})
allCountry();
async function allCountry(){
    await currencies();
    for(let country of countries){
        toCurrency.innerHTML += `
            <option value="${country.iso_code}">${country.name}</option>
        `;
        fromCurrency.innerHTML += `
            <option value="${country.iso_code}">${country.name}</option>
        
        `
    }
}
async function currencies(){
    return fetch(`https://api.frankfurter.dev/v2/currencies`)
        .then(response => response.json())
        .then(data =>{
            countries = data;
        })

}
async function conversion(){
    from = fromCurrency.value;
    to = toCurrency.value;
    await dataFetch();
    display();
    
}
async function dataFetch(){
    return fetch(`https://api.frankfurter.dev/v2/rate/${from}/${to}`)
        .then(response => response.json())
        .then(data => {
            rate = data.rate;
    })
}
function display(){
   let value = amount.value;
    result.innerHTML = `
    <p id="resultText">${value} ${from} = ${(value * rate).toFixed(2)} ${to}</p>
    `;
}



