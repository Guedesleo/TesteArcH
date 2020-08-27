const Login = function(login){
    if(login.length <2)
        return;

    const json = {
        "login": login
    }
   url('users','GET',null,json).then(function(response){
    const suggestionsPanel = document.getElementById('suggestions');
    while (suggestionsPanel.firstChild) {
        suggestionsPanel.removeChild(suggestionsPanel.firstChild);
    }
      response.forEach(function(suggested) {
                
            let div = document.createElement('div');
            div.setAttribute("id",`div_login_id_${suggested.idlogin}`);
            div.innerHTML = suggested.nome;
            div.addEventListener('click', function() { 
                selecionaSugestao(this); 
                chekedPermisao();
             } );            
            let hdf = document.createElement('input');
            hdf.setAttribute("type","hidden");
            hdf.setAttribute("id",`hdf_login_id_${suggested.idlogin}`);
            hdf.setAttribute("value",`${suggested.idlogin}`);
            div.appendChild(hdf);
            suggestionsPanel.appendChild(div);
            
      })
      
})
.catch(function(error){
    console.warn(error);
});

}


const Sistemas = function(){
    url('sistemas','GET').then(function(response){
        response.forEach(function(user){
            var x = document.getElementById('sistema');
            let option = document.createElement("option");

            option.innerHTML='<option>'+user.systemname+'</option>'
            option.value = user.idsystem; 
            option.id=user.idsystem;
            x.appendChild(option);
        });
    })
    .catch(function(error){
        console.warn(error);
    });

}

const permissao = function(idSistema){
    const json = {
        "idsystem": idSistema
    }
    url('permissoes','GET',null,json).then(function(response){
            response.forEach(function(user){
                const userRuleName= user.rulename.replace(/\s/g, '');
                var check = document.getElementById("check");
                let input = document.createElement("input");
                input.type = "checkbox";   
                input.id = userRuleName.concat(user.idrule); 
                input.setAttribute('value',user.idrule); 
                input.setAttribute('name',"selecaoCheked"); 
                let label = document.createElement("label");
                label.innerHTML =user.rulename;
                label.htmlFor=userRuleName.concat(user.idrule); 


                check.appendChild(input);
                check.appendChild(label);
            });
        })
        .catch(function(error){
            console.warn(error);
        });
}

const gruposelecao = function(selecaopermissao,idLogin){
    const json = {
        "idsystem":selecaopermissao,
        "idLogin":idLogin
    }
    url('grupodeselecao','GET',null,json,null).then(function(response){
        response.forEach(user => {
            const userRuleName= user.rulename.replace(/\s/g, '');
            const checkedPermissao = document.getElementById(`${ userRuleName.concat(user.idrule)}`);
            checkedPermissao.checked = true; 

        })

    });
}

const salvarLogin = function(json){
     const teste = {
         "idLogin": json.idLogin,
         "sistemas":json.sistemas
     }
     url('create-LoginRules',"POST",teste,null,null)
    };

const deletelogin = function(idLogin,sistemas){  
    const json = {
        "idrule" : sistemas
    }
    url(`delete-LoginRules/${idLogin}`,'DELETE',json,null).then(response =>  salvar(status=response))

    };
function selecionaSugestao(element)
{
    document.getElementById('login').value = element.firstChild.textContent;
    document.getElementById('hddIdLogin').value = element.lastElementChild.value;
    const node =document.getElementById('suggestions')
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function checkbox(){
    checkboxes = document.querySelectorAll('div#check input[type=checkbox]');
    checkboxes.forEach(element => {
       element.checked = true; 
    });
    
}
function inverter(){
    checkboxes = document.querySelectorAll('div#check input[type=checkbox]');
    selecionados = [].filter.call(checkboxes,(element) => { return element.checked==true });

    naoselecionados =   [].filter.call(checkboxes,(element) => { return element.checked==false });
    
    selecionados.forEach( element => element.checked = false);
    naoselecionados.forEach( element => element.checked = true);
}

function salvar(status){
    const idLogin=document.getElementById('hddIdLogin').value;
    checkboxes = document.querySelectorAll('div#check input[type=checkbox]');
    selecionados = [].filter.call(checkboxes,(element) => {return element.checked==true });
    const arr = [];
    selecionados.forEach(element => arr.push(element.value));

    const arr1 = [];
    checkboxes.forEach(element =>arr1.push(element.value));
    const json = { idLogin, sistemas : arr};
    if(status === 204)
        salvarLogin(json);
    if(status != 204)
        deletelogin(idLogin , sistemas=arr1);

        document.getElementById('login').value='';
    document.getElementById('sistema').value='';  
}


function populaRules(event){
    const idSistema =  document.getElementById("sistema")[event.srcElement.selectedIndex].value;
    permissao(idSistema);
    var elemento = document.getElementById("check");
    while (elemento.firstChild) {
             elemento.removeChild(elemento.firstChild);
    }
}
 
function chekedPermisao(){
    const selecaopermissao =  document.getElementById("sistema").selectedIndex;
    const idLogin=document.getElementById('hddIdLogin').value;
    if(selecaopermissao && idLogin)
        gruposelecao(selecaopermissao,idLogin)

 }

(function() {

    if(document.addEventListener){
        document.addEventListener('DOMContentLoaded',function(){                      
            document.getElementById('login').addEventListener('keyup',() =>{
                const login =  document.getElementById('login').value;
                Login(login);
                    document.getElementById('login').addEventListener('change',() => { 
                    document.getElementById('hddIdLogin').value='';
                });
            });
            Sistemas();  
            //document.getElementById('login').addEventListener('blur',chekedPermisao);
            document.getElementById('sistema').addEventListener('click',chekedPermisao);
            
            document.getElementById('sistema').addEventListener('change',(e) => populaRules(e));   
            document.getElementById('btnMT').addEventListener('click',checkbox);
            document.getElementById('btnIVT').addEventListener('click',inverter);
            document.getElementById('btnSubmit').addEventListener('click',salvar);                           
        });
    }    
}
)();