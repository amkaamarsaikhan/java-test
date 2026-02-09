const currencyRates = {
    "MNT-USD": 0.00029,
    "USD-MNT": 3450,
    "MNT-EUR": 0.00027,
    "EUR-MNT": 3750,
    "USD-EUR": 0.92,
    "EUR-USD": 1.08
};

const mathContainer = document.getElementById('math-container');
const currencyContainer = document.getElementById('currency-container');
const modeTitle = document.getElementById('modeTitle');
const mathResultDisplay = document.getElementById('mathResult');
const mathExpressionDisplay = document.getElementById('mathExpression');

let currentExpression = "";

// Таб солих функц
function switchMode(selectedMode) {
    if (selectedMode === 'calculator') {
        mathContainer.setAttribute('data-active', 'true');
        currencyContainer.setAttribute('data-active', 'false');
        modeTitle.innerText = "Математик Тооцоолуур";
    } else {
        mathContainer.setAttribute('data-active', 'false');
        currencyContainer.setAttribute('data-active', 'true');
        modeTitle.innerText = "Валют Хөрвүүлэгч";
    }
}

//  Математик тооцоолуур функцүүд
function appendValue(value) {
    currentExpression += value;
    mathExpressionDisplay.innerText = currentExpression;
}

function clearAll() {
    currentExpression = "";
    mathExpressionDisplay.innerText = "";
    mathResultDisplay.innerText = "0";
}

function calculateResult() {
    try {
        const result = eval(currentExpression);
        mathResultDisplay.innerText = result;
        currentExpression = result.toString();
    } catch (error) {
        mathResultDisplay.innerText = "Алдаа";
        currentExpression = "";
    }
}

// Валют хөрвүүлэх функц
function convertCurrency() {
    const amount = parseFloat(document.getElementById('amountInput').value);
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
    const resultDisplay = document.getElementById('conversionResult');

    if (isNaN(amount)) {
        resultDisplay.innerText = "Тоон дүн оруулна уу!";
        return;
    }

    if (from === to) {
        resultDisplay.innerText = `Үр дүн: ${amount} ${to}`;
        return;
    }

    const pairKey = `${from}-${to}`;
    const rate = currencyRates[pairKey];

    if (rate) {
        const convertedAmount = (amount * rate).toFixed(2);
        resultDisplay.innerText = `Үр дүн: ${convertedAmount} ${to}`;
    } else {
        resultDisplay.innerText = "Ханш олдсонгүй.";
    }
}
