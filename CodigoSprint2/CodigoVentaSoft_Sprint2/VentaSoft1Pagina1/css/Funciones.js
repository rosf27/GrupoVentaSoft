function ConfirmLogin() {
    //Ingresamos un mensaje a mostrar
    var mensaje = confirm("¿Enviar solicitud de Login?");
    //Detectamos si el usuario acepto el mensaje
    if (mensaje) {
        //alert("¡Confirmar envio Login!");
        ValorCajaTexto("Usuario: ", "usr");
        ValorCajaTexto("Password: ", "pwd");
    }
    //Detectamos si el usuario denegó el mensaje
    else {
        alert("¡Terminar sin confirmar!");
    }
}

function ConfirmCambio() {
    //Ingresamos un mensaje a mostrar
    var mensaje = confirm("¿Confirma cambio de password?");
    //Detectamos si el usuario acepto el mensaje
    if (mensaje) {
        alert("¡Confirmar cambio del password!");
    }
    //Detectamos si el usuario denegó el mensaje
    else {
        alert("¡Terminar sin cambiar password!");
    }
}

function ValorCajaTexto(frase, identificador){
    let texto = document.getElementById(identificador).value;
    alert(frase + texto);
}