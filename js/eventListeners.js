if (consoleOutput) {
    consoleOutput.addEventListener("contentadded", () => {
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    });
} else {
    console.error("consoleOutput element not found");
}


if (consoleInputForm instanceof HTMLFormElement) {
    consoleInputForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
      if (consoleInput instanceof HTMLInputElement) {
        const input = consoleInput.value.trim();
        handleUserInput(input);
        consoleInput.value = "";
      } else {
        console.error("consoleInput element not found");
      }
    });
  } else {
    console.error("consoleInputForm element not found");
}


// HELP BUTTON SWITCHER (From ? to X)
document.getElementById("helpButton").addEventListener("click", function() {
    const helpButton = document.getElementById("helpButton");
    helpButton.textContent = helpButton.textContent === "?" ? "X" : "?";
  });
  