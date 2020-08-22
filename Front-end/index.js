function checkbox(){
    checkboxes = document.querySelectorAll('div#check input[type=checkbox]');
    checkboxes.forEach(element => {
       element.checked = true; 
    });
    
}
function inverter(){
    checkboxes = document.querySelectorAll('div#check input[type=checkbox]');
    selecionados = [].filter.call(checkboxes,(element) => { return element.checked==true });
    console.log(selecionados);

    naoselecionados =   [].filter.call(checkboxes,(element) => { return element.checked==false });
    
    selecionados.forEach( element => element.checked = false);
    naoselecionados.forEach( element => element.checked = true);
}

function salvar(){

}


(function() {
    document.getElementById('Login').addEventListener('keyup',() =>{
        const login = document.getElementById('Login').value;
        
        Login(login);
    }) ;

    document.getElementById('btnMT').addEventListener('click',checkbox);
    document.getElementById('btnIVT').addEventListener('click',inverter);
    document.getElementById('btnSubmit').addEventListener('click',inverter);

}
)();