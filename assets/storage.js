const CACHE_KEY = "calculation_history";

function checkForStorage() {
	return typeof(Storage) !== "undefined";
}

function putHistory(data) {
	if (checkForStorage()) {
		let historyData = null;
		if (!localStorage.getItem(CACHE_KEY)) {
			historyData = [];
		} else {
			historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
		}

		historyData.unshift(data);

		if (historyData.length > 5) {
			historyData.pop();
		}

		localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
	} 
}

function getHistory() {
	if (checkForStorage()) {
		return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
	} else {
		return
	}
}

function renderHistory() {
	const historyData = getHistory();
	let historyList = document.getElementById("historyList");

	historyList.innerHTML = "";
	for (let history of historyData) {
		let row = document.createElement("tr");
		row.innerHTML = "<td>" + history.firtsNumber + "</td>";
		row.innerHTML += "<td>" + history.operator + "</td>";
		row.innerHTML += "<td>" + history.secondNumber + "</td>";
		row.innerHTML += "<td>" + history.result + "</td>";

		historyList.appendChild(row);
	}
}

renderHistory();