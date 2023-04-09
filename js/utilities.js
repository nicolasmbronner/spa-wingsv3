// ---------- ELEMENTS DU DOM

const consoleOutput = document.getElementById("consoleOutput");
const consoleInputForm = document.querySelector("#consoleInputForm");
const consoleInput = document.querySelector("#consoleInput");


const contentAddedEvent = new Event("contentadded");



// ---------- GESTION DE L'AFFICHAGE

function writeToConsole(text) {
    if (consoleOutput) {
        consoleOutput.innerHTML += text + "<br>";
        consoleOutput.dispatchEvent(contentAddedEvent);
    } else {
        console.error("consoleOutput element not found");
    }
}


function clearConsole() {
    if (consoleOutput) {
        consoleOutput.textContent = "";
    } else {
        console.error("consoleOutput element not found");
    }
}



// ---------- GESTION DE L'ENTREE UTILISATEUR

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
}



// ---------- FONCTIONS UTILITAIRES
  
  
function sendCommand(command) {
    handleUserInput(command);
}

// Garder le défilement ancré sur le contenu le plus en bas (récent)
function appendOutput(text) {
    if (consoleOutput) {
        const isAtBottom = consoleOutput.scrollTop + consoleOutput.clientHeight >= consoleOutput.scrollHeight - 50;
        consoleOutput.innerHTML += text + "<br>";

        if (isAtBottom) {
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
        }
    } else {
        console.error("consoleOutput element not found");
    }
}