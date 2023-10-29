defaultapicall();
async function defaultapicall() {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/83e00c35ac5a90121c93e99d/latest/USD`
    );
    const data = await response.json();

    const conversionRates = data.conversion_rates;

    var selectfrom = document.getElementById("from");
    var selectto = document.getElementById("to");

    for (const key of Object.keys(conversionRates)) {
      var newOption = document.createElement("option");
      newOption.value = key;
      newOption.text = key;
      selectfrom.appendChild(newOption);

      var newOption2 = document.createElement("option");
      newOption2.value = key;
      newOption2.text = key;
      selectto.appendChild(newOption2);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function swapSelectValues() {
  var selectfrom = document.getElementById("from");
  var selectto = document.getElementById("to");

  // Check if both elements exist
  if (selectfrom && selectto) {
    var tempValue = selectfrom.value;
    selectfrom.value = selectto.value;
    selectto.value = tempValue;
  }
}

button_container = document.querySelector(".button-container");

async function submitForm(event) {
  event.preventDefault();


  
  const amount = event.target.querySelector("#amount").value;
  const from = event.target.querySelector("#from").value;
  const to = event.target.querySelector("#to").value;

  if (isNaN(amount)) {
    alert("Please enter a valid number");
    window.location.reload();
  }

  if (from === to) {
    alert("Please Add a Valid Conversion From and To Cannot be Same");

    window.location.reload();
  }

  if (amount < 0) {
    alert("Please Add a Valid number");

    window.location.reload();
  }

  console.log(amount, from, to);

  console.log("working");

  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/83e00c35ac5a90121c93e99d/latest/${from}`
    );
    const data = await response.json();

    console.log(Object.keys(data.conversion_rates));
    console.log(amount * data.conversion_rates[to]);
    const value = (amount * data.conversion_rates[to]).toFixed(3);

    answer = document.getElementById("answer");

    answer.textContent = `${amount} ${from} = ${value} ${to}`;
    answer.style.display = "block";
    answer.style.backgroundColor = "rgba(144, 238, 144, 0.2)";


    tableupdate(amount, from, to, value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }


  
}

var amountArr = [];
var fromArr = [];
var toArr = [];
var valueArr = [];
var dateArr = [];

collapsed_table=document.querySelector('.collapsed-table')

function tableupdate(amount, from, to, value) {
  // Push new values into the arrays


  
  var currentDate = new Date();
  var DateNew = currentDate.toLocaleString();

  amountArr.push(amount);
  fromArr.push(from);
  toArr.push(to);
  valueArr.push(value);
  dateArr.push(DateNew);

  amountArr.reverse();
  fromArr.reverse();
  toArr.reverse();
  valueArr.reverse();
  dateArr.reverse();

  // Store the arrays in sessionStorage after serializing them
  sessionStorage.setItem("amount", JSON.stringify(amountArr));
  sessionStorage.setItem("from", JSON.stringify(fromArr));
  sessionStorage.setItem("to", JSON.stringify(toArr));
  sessionStorage.setItem("value", JSON.stringify(valueArr));
  sessionStorage.setItem("date", JSON.stringify(dateArr));

  // Clear the existing table
  var table = document.querySelector("#table table");
  table.innerHTML = "";

  var thead = document.createElement("thead");
  var headerRow = document.createElement("tr");

  var headers = ["From","Amount", "To", "Value","Date & Time"];

  headers.forEach(function (headerText) {
    var th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Loop through the arrays and create table rows for each entry
  for (var i = 0; i < amountArr.length; i++) {
    var trow = document.createElement("tr");


    var fromCell = document.createElement("td");
    fromCell.textContent = fromArr[i];
    trow.appendChild(fromCell);

    var amountCell = document.createElement("td");
    amountCell.textContent = amountArr[i];
    trow.appendChild(amountCell);

    var toCell = document.createElement("td");
    toCell.textContent = toArr[i];
    trow.appendChild(toCell);


    var valueCell = document.createElement("td");
    valueCell.textContent = valueArr[i];
    trow.appendChild(valueCell);
    
    var dateCell = document.createElement("td");
    dateCell.textContent = dateArr[i];
    trow.appendChild(dateCell);

  

    table.appendChild(trow);
  }

  cut_btn.style.display = "inline";
}

// Call tableupdate to initialize and display data

function toggleTable() {
  var button_container = document.querySelector(".button-container");
  var collapsed_table = document.querySelector(".collapsed-table");
  var historyButton = document.getElementById("history");

  if (collapsed_table.style.display === "none") {
    collapsed_table.style.display = "block";
    historyButton.textContent = "Hide History";
    

  } else {
    collapsed_table.style.display = "none";
    historyButton.textContent = "Show History";
  }
}


cut_btn = document.getElementById("cut_btn");

toggle_button = document.querySelector(".toggle-button");

// function cut() {
//   sessionStorage.clear();
//   cut_btn.style.display = "none";
//   toggle_button.style.display = "none";
// }




