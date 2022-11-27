(function(){
    // Variables Globales
    const navegacion = document.getElementById("navegacion");
    const cerrar = document.getElementById("cerrar");
    const abrir = document.getElementById("abrir");
    const localizacion = window.location.pathname;
    const enlaces = document.querySelectorAll(".link");
    
    eventListeners();
    cambiarHora();
    setInterval(cambiarHora,1000);
    enlaces.forEach((e) =>{
        if(e.href.includes(`${localizacion}`)){
            e.classList.add("activo");
        }else{
            e.classList.add("text-amber-600");
        }
    })
    function eventListeners(){
    cerrar.addEventListener("click",() =>{
        navegacion.style.right = "-1000px";
        document.querySelector("body").style.overflowY = "";
    });
    abrir.addEventListener("click",() =>{
        navegacion.style.right = "0";
        document.querySelector("body").style.overflowY = "hidden";
    });
    
}
function cambiarHora(){
    const horaParrafo = document.querySelector(".hora");
    let result;
    const fecha = new Date();
    let horas = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();
    let horaConfigurada = horas % 12;
    
    if(horaConfigurada < 10){
        horaConfigurada = "0" + horaConfigurada;
    }
    if(minutos < 10){
        minutos = "0" + minutos;
    }
    if(segundos < 10){
        segundos = "0" + segundos;
    }
    result = `${horaConfigurada}:${minutos}:${segundos}`;
    if(horas > 12){
        result = result + " PM";
    }else{
        result = result + " AM";
    }
    
    horaParrafo.textContent = result;
}

}());

