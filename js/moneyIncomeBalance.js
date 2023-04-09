

// ---------- FONCTIONS SPECIFIQUES AUX COMMANDES

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



// ---------- TRANSACTIONS - ADD

function addTransaction(type, sequence, displaySeparator = true) {
    const outputType = {
      'visa': 'Total Visa',
      'cash': 'Total Cash',
      'tips': 'Total Tips Visa'
    }[type];
  
    const entriesArray = {
      'visa': visaEntries,
      'cash': cashEntries,
      'tips': tipsEntries
    }[type];
  
    const previousEntriesArray = {
      'visa': previousVisaEntries,
      'cash': previousCashEntries,
      'tips': previousTipsEntries
    }[type];
  
    writeToConsole("");
    if (sequence.length === 0 && previousEntriesArray.length === 0) {
      writeToConsole(`Pas de ${type}`);
    } else {
      addSequence(sequence, outputType, entriesArray, previousEntriesArray, displaySeparator);
    }
}
  

function addVisa(sequence, displaySeparator = true) {
addTransaction('visa', sequence, displaySeparator);
}

function addCash(sequence, displaySeparator = true) {
addTransaction('cash', sequence, displaySeparator);
}

function addTips(sequence, displaySeparator = true) {
addTransaction('tips', sequence, displaySeparator);
}



// ---------- TRANSACTIONS - GET TOTAL

function getTotal(type) {
    const previousEntriesArray = {
      'visa': previousVisaEntries,
      'cash': previousCashEntries,
      'tips': previousTipsEntries
    }[type];
  
    const allEntries = previousEntriesArray.flat();
    let total = 0;
    allEntries.forEach(num => {
      if (!isNaN(num)) {
        total += num;
      }
    });
    return total;
}


function getTotalVisa() {
return getTotal('visa');
}

function getTotalCash() {
return getTotal('cash');
}

function getTotalTipsVisa() {
return getTotal('tips');
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