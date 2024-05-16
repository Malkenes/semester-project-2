/**
 * Checks if the repeat password matches the original password.
 * This function retrieves the password inputs from the document and compares the values.
 * If the repeat password does not match the original password, it adds a CSS class to indicate an invalid input.
 * @returns {boolean} Returns true if the repeat password matches the original password; otherwise, false.
 */
export function checkRepeatPassword() {
    const passwords = document.querySelectorAll("input[type=password]");
    if (passwords.length === 0) {
        return true
    }
    if (passwords[0].value !== passwords[1].value) {
        passwords[1].classList.add("is-invalid");
    }
    return (passwords[0].value == passwords[1].value);
}
