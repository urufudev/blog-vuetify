import { required, email, max } from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
    ...required,
    message: "Este campo es requerido",
});

extend("max", {
    ...max,
    message: "Este campo debe tener {length} caracteres o menos",
});

extend("email", {
    ...email,
    message: "Este campo debe ser un correo electrónico válido",
});
