(function(){
    const formulario = document.querySelector("#formulario");
    const nombre = document.querySelector("#nombre");
    const correo = document.querySelector("#correo");
    const telefono = document.querySelector("#telefono");
    const mensaje = document.querySelector("#mensaje");
    nombre.addEventListener("change",validarCamposFunction);
    formulario.addEventListener("submit",validarFormulario);
    correo.addEventListener("change",validarCamposFunction);
    telefono.addEventListener("change",validarCamposFunction);
    mensaje.addEventListener("change",validarCamposFunction);
    function validarFormulario(e){
        e.preventDefault();
        if(nombre.value === "" || correo.value === "" || telefono.value === "" || mensaje.value === ""){
            Swal.fire({
                title: '¡Error!',
                text: 'Todos los campos deben estar llenos',
                icon: 'error',
                confirmButtonText: 'Entendido'
            })
            return;
        }
        Swal.fire({
            title: '¡Exito!',
            text: 'Formulario enviado correctamente',
            icon: 'success',
            confirmButtonText: 'Entendido'
        })
        formulario.reset();
    }
    function validarCamposFunction({target,target:{value}}){
        const regexNombre = /^[a-zA-Z]+$/;
        const regexEmail = /^[a-zA-Z]+[@]{1}[a-zA-Z]{1,10}[.]+[a-z]{1,10}$/;
        const regexTelefono = /^[0-9]+$/
        const regexMensaje = /^[a-zA-Z0-9]+$/;
        const div =  document.querySelector(`#${target.id}Div`);
        if(target.id == "nombre" && !regexNombre.test(value)){
                target.classList.add("error");
                !div.querySelector(".error__parrafo") ? div.appendChild(mensajeError("Debes ingresar un nombre válido")) : null;
        }else if(target.id == "correo" && !regexEmail.test(value)){
                target.classList.add("error");
                !div.querySelector(".error__parrafo") ? div.appendChild(mensajeError("Debes ingresar un email válido")) : null;
        }
        else if(target.id== "telefono" && !regexTelefono.test(value)){
            target.classList.add("error");
            !div.querySelector(".error__parrafo") ? div.appendChild(mensajeError("Debes ingresar un telefono válido")) : null;
            console.log(div);
        }else if(target.id == "mensaje" && !regexMensaje.test(value)){
            target.classList.add("error");
            !div.querySelector(".error__parrafo") ? div.appendChild(mensajeError("Debes ingresar un mensaje válido")) : null;
        }else{
                target.classList.remove("error");
                document.querySelector(".error__parrafo") ? div.removeChild(div.lastChild) : null;
        }
    }
    function mensajeError(mensaje){
        const parrafo = document.createElement("p");
        parrafo.textContent = mensaje;
        parrafo.classList.add("error__parrafo");
        return parrafo;
    }
}());
