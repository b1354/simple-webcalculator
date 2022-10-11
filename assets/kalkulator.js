// pertama tama membuat sebuah objek dengan kondisi calculatornya
// seperti display number, operator, first number, dan is wait for second number
const calculator = {
  displayNumber: '0',
  operator: null,
  firtsNumber: null,
  isWaitForSecondNumber: false,
}

// objek diatas digunakan sebagai tempat menyimpan data dan kondisi kalkulator


function updateDisplay () {
  document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}

function clearCalculator () {
  calculator.displayNumber = 0;
  calculator.operator = null;
  calculator.firtsNumber = null;
  calculator.isWaitForSecondNumber = false;
}

function inputDigit(digit) {
  if (calculator.complete) {
    clearCalculator()
    calculator.complete = false;
  }

  if (calculator.displayNumber == '0') {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
}

function handleOperator(operator) {
  if (calculator.operator) {
    alert("operator sudah ditetapkan");
  } else {
    calculator.operator = operator;
    calculator.isWaitForSecondNumber = true;
    calculator.firtsNumber = calculator.displayNumber;
    calculator.displayNumber = "0";
  }
}

function inverseNumber () {
  if (calculator.displayNumber == "0") {
    return;
  }

  calculator.displayNumber *= -1;
  updateDisplay();
}

function performCalculation() {
  if (!calculator.operator || !calculator.firtsNumber) {
    alert("pastikan anda telah memasukan operator");
    return;
  }

  let result = 0;
  if (calculator.operator == "+") {
    result = parseInt(calculator.firtsNumber) + parseInt(calculator.displayNumber);
  } else {
    result = parseInt(calculator.firtsNumber) - parseInt(calculator.displayNumber);
  }

  calculator.displayNumber = result;
  calculator.complete = true;
  updateDisplay();
}

const buttons = document.querySelectorAll(".button")

// untuk menambahkan aksi disetiap nomernya akan menggunakan for of loop
for (const element of buttons) {
  element.addEventListener("click", function(event){
    // mendapatkan element yang di klik
    const target = event.target;

    // menambahkan fungsi clearCalculator() jika terdapat elemen yang memiliki class clear
    if (target.classList.contains("clear")) {
      clearCalculator();
      updateDisplay();
      return;
    }

    if (target.classList.contains("negative")) {
      inverseNumber();
      updateDisplay();
      return;
    }

    if (target.classList.contains("operator")) {
      handleOperator(target.innerText);
      return;
    }

    if (target.classList.contains("equals")) {
      performCalculation();
      updateDisplay();
      return;
    }

    inputDigit(target.innerText);
    updateDisplay()
  })
}
