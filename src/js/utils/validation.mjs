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
