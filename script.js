
var countriesList = document.querySelectorAll('.countries-list');
var btnResult = document.querySelector('.btn-result');
var toList = document.querySelector('#to-country');
var fromList = document.querySelector('#from-country');
var amountBar = document.querySelector('#enter-amount');
var resultBar = document.querySelector('.results');


async function getData() {
    var curr = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json")
    var data = await curr.json();
    for (let index = 0; index < countriesList.length; index++) {
        for (const key in data) {
            let option = document.createElement('option');
            option.value = key;
            option.textContent = key.toUpperCase();

            if (key.toUpperCase() === "INR") {
                option.selected = true;
            }
            countriesList[index].appendChild(option);
        }
    }
}
getData();


async function convertCurrency() {
    if (amountBar.value === "") {
        alert("Enter Amount please!");
    } else if (fromList.value === toList.value) {
        alert("Please select different countries!");
    } else {
        let resp = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromList.value}.json`)
        let countryData = await resp.json();
        // console.log(countryData[fromList.value][toList.value]);
        let amountBarValue = amountBar.value;
        let MultiplyValue = countryData[fromList.value][toList.value];
        // console.log(MultiplyValue + " " + amountBarValue);

        let calculation = amountBarValue * MultiplyValue;
        // console.log(`${amountBarValue} ${fromList.value} = ${calculation} ${fromList.value}`);
        resultBar.textContent = `${amountBarValue} ${fromList.value.toUpperCase()} = ${calculation} ${toList.value.toUpperCase()}`;
    }
}

btnResult.addEventListener('click', convertCurrency);