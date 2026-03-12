// Select elements
const fromSelect = document.querySelector(".from select");
const toSelect = document.querySelector(".to select");
const fromImg = document.querySelector(".from img");
const toImg = document.querySelector(".to img");
const msg = document.querySelector(".msg");
const button = document.querySelector("button");
const amountInput = document.querySelector(".amount input");
const exchangeIcon = document.querySelector(".fa-arrow-right-arrow-left");

// Currency → Country Code Mapping
const countryList = {
  USD: "US",
  INR: "IN",
  EUR: "EU",
  GBP: "GB",
  AUD: "AU",
  CAD: "CA",
  JPY: "JP",
  CNY: "CN",
  AED: "AE",
  SAR: "SA"
};

// API URL
const BASE_URL = "https://api.exchangerate-api.com/v4/latest/";

// 🔹 Populate Dropdowns
for (let currency in countryList) {
  let option1 = document.createElement("option");
  option1.value = currency;
  option1.innerText = currency;

  let option2 = option1.cloneNode(true);

  fromSelect.append(option1);
  toSelect.append(option2);
}

// Set Default Selected
fromSelect.value = "USD";
toSelect.value = "INR";

// 🔹 Update Flag Function
function updateFlag(selectElement, imgElement) {
  let currencyCode = selectElement.value;
  let countryCode = countryList[currencyCode];

  imgElement.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// Initial Flag Set
updateFlag(fromSelect, fromImg);
updateFlag(toSelect, toImg);

// 🔹 Change Event for Flags
fromSelect.addEventListener("change", () => {
  updateFlag(fromSelect, fromImg);
});

toSelect.addEventListener("change", () => {
  updateFlag(toSelect, toImg);
});

// 🔹 Exchange Icon Swap
exchangeIcon.addEventListener("click", () => {
  let temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;

  updateFlag(fromSelect, fromImg);
  updateFlag(toSelect, toImg);
});

// 🔹 Convert Currency
button.addEventListener("click", async (e) => {
  e.preventDefault();

  let amount = amountInput.value;

  if (amount === "" || amount <= 0) {
    amount = 1;
    amountInput.value = "1";
  }

  const fromCurrency = fromSelect.value;
  const toCurrency = toSelect.value;

  try {
    const response = await fetch(BASE_URL + fromCurrency);
    const data = await response.json();

    const rate = data.rates[toCurrency];
    const finalAmount = amount * rate;

    msg.innerText = `${amount} ${fromCurrency} = ${finalAmount.toFixed(2)} ${toCurrency}`;
  } catch (error) {
    msg.innerText = "Error fetching exchange rate!";
  }
});