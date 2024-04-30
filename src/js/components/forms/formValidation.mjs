import { checkRepeatPassword } from "../../utils/validation.mjs";


export function checkRequired(tab) {
    const inputs = tab.querySelectorAll("input");
    inputs.forEach(input => {
        if (!input.checkValidity()) {
            input.classList.add("is-invalid");
        } else {
            input.classList.remove("is-invalid");
        }
    });
    if (!checkRepeatPassword()) return false;
    const allInputsValid = Array.from(inputs).every(input => input.checkValidity());
    return allInputsValid;
}
