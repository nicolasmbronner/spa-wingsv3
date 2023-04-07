const consoleOutput = document.getElementById("consoleOutput");
const contentAddedEvent = new Event("contentadded");
const consoleInputForm = document.getElementById("consoleInputForm");
const consoleInput = document.getElementById("consoleInput");

let visaEntries = [];
let cashEntries = [];
let tipsEntries = [];

let previousVisaEntries = [];
let previousCashEntries = [];
let previousTipsEntries = [];

function addSequence(sequence, outputType, entriesArray,
    previousEntriesArray, displaySeparator) {
    if (sequence.length > 0) {
        previousEntriesArray.push(sequence.map((num) => parseFloat(num)));
    }
    const allEntries = previousEntriesArray.flat();
    let result = 0;
    allEntries.forEach(num => {
        if (!isNaN(num)) {
            result += num;
        }
    });

    writeToConsole(`${outputType} : ${result}`);

    writeToConsole(previousEntriesArray.map((entry) =>
        entry.join(' ')).join(displaySeparator ? ' | ' : ' '));
}

function addVisa(sequence, displaySeparator = true) {
    writeToConsole("");
    if (sequence.length === 0 && previousVisaEntries.length === 0) {
        writeToConsole("Pas de Visa");
    } else {
        addSequence(sequence, "Total Visa", visaEntries, previousVisaEntries, displaySeparator);
    }
}

function addCash(sequence, displaySeparator = true) {
    writeToConsole("");
    if (sequence.length === 0 && previousCashEntries.length === 0) {
        writeToConsole("Pas de Cash");
    } else {
        addSequence(sequence, "Total Cash", cashEntries, previousCashEntries, displaySeparator);
    }
}

function addTips(sequence, displaySeparator = true) {
    writeToConsole("");
    if (sequence.length === 0 && previousTipsEntries.length === 0) {
        writeToConsole("Pas de Tips");
    } else {
        addSequence(sequence, "Total Tips Visa",
            tipsEntries, previousTipsEntries, displaySeparator);
    }
}

function writeToConsole(text) {
    consoleOutput.innerHTML += text + "<br>";
    consoleOutput.dispatchEvent(contentAddedEvent);
}

function clearConsole() {
    consoleOutput.textContent = "";
}

function getTotalCash() {
    const allCashEntries = previousCashEntries.flat();
    let cashTotal = 0;
    allCashEntries.forEach(num => {
        if (!isNaN(num)) {
            cashTotal += num;
        }
    });
    return cashTotal;
}

function getTotalTipsVisa() {
    const allTipsEntries = previousTipsEntries.flat();
    let tipsTotal = 0;
    allTipsEntries.forEach(num => {
        if (!isNaN(num)) {
            tipsTotal += num;
        }
    });
    return tipsTotal;
}

function displayAllTotals() {
    clearConsole();
    addVisa([], false);
    writeToConsole("");
    addCash([], false);
    writeToConsole("");
    addTips([], false);

    writeToConsole("");
    writeToConsole('------------------------------');
    writeToConsole("");

    const cashToDeclare = getTotalCash() + 500 - getTotalTipsVisa();
    writeToConsole(`Cash à déclarer : ${cashToDeclare}`);

    writeToConsole("");

    const cashForEnvelope = getTotalCash() - getTotalTipsVisa();
    writeToConsole(`Cash à mettre dans l'enveloppe : ${cashForEnvelope}`);

    writeToConsole("");
}

consoleInputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = consoleInput.value.trim();
    handleUserInput(input);
    consoleInput.value = "";
});

consoleOutput.addEventListener("contentadded", () => {
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
});


function handleUserInput(input) {
    const args = input.trim().split(" ");
    const command = args[0].toLowerCase();

    switch (command) {
        case 'test':
            writeToConsole("hello world");
            break;

        case 'cls':
            clearConsole();
            break;

        case 'v':
            addVisa(args.slice(1));
            break;

        case 'c':
            addCash(args.slice(1));
            break;

        case 't':
            addTips(args.slice(1));
            break;

        case 'z':
            displayAllTotals();
            break;

        default:
            writeToConsole('Commande non reconnue');
            break;
    }
    writeToConsole(""); // Ajoute un saut de ligne après chaque réponse
}

function sendCommand(command) {
    handleUserInput(command);
}

function appendOutput(text) {
    const outputDiv = document.getElementById("consoleOutput");
    const isAtBottom = outputDiv.scrollTop + outputDiv.clientHeight >= outputDiv.scrollHeight - 50;

    outputDiv.innerHTML += text + "<br>";

    if (isAtBottom) {
        outputDiv.scrollTop = outputDiv.scrollHeight;
    }
}


