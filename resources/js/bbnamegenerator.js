/**
 * Executes the program.
 */
function execute() {

    clearHTMLElements();

    const firstName = document.querySelector("#firstName").value.trim();
    const familyName = document.querySelector("#familyName").value.trim();

    let isIncorrect = checkName(firstName, "firstName");
    if (isIncorrect === true) return;
    isIncorrect = checkName(familyName, "familyName");
    if (isIncorrect === true) return;

    const bbFirstName = generateBBName(firstName);
    const bbFamilyName = generateBBName(familyName);
    const bbName = capitalizeFirstChar(bbFirstName + bbFamilyName);
    document.getElementById("bbName").innerHTML = bbName;
    document.getElementById("bbSmiley").innerHTML = 
    "&#128514" + "&#128514" + "&#128514" + "&#128514" + "&#128514";    
}


/**
 * Generates a bb name from user input.
 * @param {string} name 
 * @returns bb name
 */
function generateBBName(name) {
    
    let bbName = name;    
    bbName = processName(bbName);
    return bbName;
}


/**
 * Processes given name into bb name.
 * @param {string} name Given name.
 * @returns Processed name.
 */
function processName(name) {
    
    name = hyphensInBetween(name);
    const formation = probeCheckbox();
    let newName = "";
    let names = name.split("-");

    for (let i = 0; i < names.length; i++) {
        let c = names[i];
        if (formation === true) c = checkNameFormation(c);
        c = c.replace(c.charAt(0), "b");
        newName = newName + c;
    }
    return newName;
}


/**
 * Inspects if given name has more than one hyphen in between.
 * For example: Ruby-----Rose turns to Ruby-Rose.
 * @param {string} name Given name.
 * @returns Corrected name, if it had more than one hyphen, 
 * otherwise returns the original name.
 */
function hyphensInBetween(name) {

    for (let i = name.length - 1; i >= 1; i--) {
        let char = name[i];
        let previousChar = name[i-1];
        let hyphen = "-";

        if (char === hyphen && previousChar === hyphen) {
            name = name.replace(name.charAt(i), "");
        }
    }
    return name;
}


/**
 * Checks if checkbox is checked.
 * @returns True if checked, false if not.
 */
function probeCheckbox() {
    const checkbox  = document.getElementById("formation").checked;
    return checkbox;
}


/**
 * Checks name formation with names of certain character order.
 * Names such as Edward and Adelia, which have a vowel first and
 * consonant second. Output in these cases might be a little weird
 * for some, so the user has the option to change
 * the output in these kinds of cases from Bdward and Bdelia to 
 * Bedward and Badelia, for example.
 * @param {string} name Given name. 
 * @returns Processed name.
 */
function checkNameFormation(name) {

    let firstChar = name.charAt(0);
    let secondChar = name.charAt(1);
    let isFirstVowel = /^[aeiouyäö]$/i.test(firstChar);
    let isSecondVowel = /^[aeiouyäö]$/i.test(secondChar);
    if (isFirstVowel === true && isSecondVowel === false) {
        name = "b" + name.toLowerCase();
    }
    return name;
}


/**
 * Capitalize the first character of the otherwise
 * finished bb name.
 * @param {string} name 
 * @returns Finished bb name.
 */
 function capitalizeFirstChar(name) {
    
    name = name.toLowerCase();
    return name.charAt(0).toUpperCase() + name.slice(1);
}


/**
 * Checks given name for illegal characters such as
 * numbers and special characters.
 * @param {string} name 
 * @param {string} id 
 * @returns True if name contains errors, false if not.
 */
function checkName(name, id) {

    let nameLength = name.length;

    if (nameLength < 1 || nameLength > 25 ) {
        document.getElementById(id).style.borderColor = "red";
        document.getElementById(id + "Error").innerHTML = "Liian lyhyt tai liian pitkä.";
        return true;
    }

    let isIncorrect = name.includes(".")
    if (isIncorrect === true) {
        document.getElementById(id).style.borderColor = "red";
        document.getElementById(id + "Error").innerHTML = "Poista erikoismerkit.";
        return true;
    }

    isIncorrect = /\d/.test(name);               // Check numbers.
    if (isIncorrect === true) {
        document.getElementById(id).style.borderColor = "red";
        document.getElementById(id + "Error").innerHTML = "Poista numerot.";
        return true;
    }

    isIncorrect = /[^a-zA-Z0-9\.-]/.test(name);  // Check special characters, allow hyphen.
    if (isIncorrect === true) {
        document.getElementById(id).style.borderColor = "red";
        document.getElementById(id + "Error").innerHTML = "Poista erikoismerkit.";
        return true;
    }

    let hyphen = "-";
    let firstChar = name.charAt(0);
    let lastChar = name.charAt(nameLength - 1);
    if (firstChar === hyphen || lastChar === hyphen) {
        document.getElementById(id).style.borderColor = "red";
        document.getElementById(id + "Error").innerHTML = "Poista erikoismerkit.";
        return true;
    }
    return false;    
}


/**
 * Clears given HTML elements.
 */
function clearHTMLElements() {

    document.getElementById("firstName").style.removeProperty("border");
    document.getElementById("familyName").style.removeProperty("border");
    document.getElementById("firstNameError").innerHTML = ""; 
    document.getElementById("familyNameError").innerHTML = ""; 
    document.getElementById("bbName").innerHTML = "";
    document.getElementById("bbSmiley").innerHTML = "";
}    