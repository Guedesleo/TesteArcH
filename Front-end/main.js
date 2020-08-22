var Login = function(login){

    const json = {
        "Login": login
    }
    return new Promise (function(resolve , reject){
        let url = 'http://localhost:3333/users';
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status === 200)
                    resolve(JSON.parse(xhr.responseText));
            }
        }
        xhr.send(JSON.stringify(json));
    });
}

var Sistemas = function(){
    return new Promise (function(resolve , reject){
        let url = 'http://localhost:3333/sistemas';
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status === 200)
                    resolve(JSON.parse(xhr.responseText));
            }
        }
        xhr.send();
    });
}

var permissao = function(){
    return new Promise (function(resolve , reject){
        let url = 'http://localhost:3333/permissoes';
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status === 200)
                    resolve(JSON.parse(xhr.responseText));
            }
        }
        xhr.send();
    });
}


Login()
    .then(function(response){
        const searchInput = document.querySelector('.search-input');
        const suggestionsPanel = document.querySelector('.suggestions');    
        searchInput.addEventListener('keyup', function() {
          const input = searchInput.value;
          suggestionsPanel.innerHTML = '';
          const suggestions = response.filter(function(users) {
            return users.nome.toUpperCase().startsWith(input);
          });
          suggestions.forEach(function(suggested) {
                const div = document.createElement('div');
                div.innerHTML = suggested.nome;
                suggestionsPanel.appendChild(div);
                });
                if (input === '') {
                  suggestionsPanel.innerHTML = '';  
                }
          });
    })
    .catch(function(error){
        console.warn(error);
    });
Sistemas()
    .then(function(response){
        response.forEach(function(user){
            var x = document.getElementById('sistema');
            let option = document.createElement("option");

            option.innerHTML='<option>'+user.systemname+'</option>'
            x.add(option);
        });
    })
    .catch(function(error){
        console.warn(error);
    });

permissao() 
.then(function(response){
    response.forEach(function(user){
        var check = document.getElementById("check"); 
        let input = document.createElement("input");
        input.type = "checkbox"; 
        input.className = "s"; 
        input.id = "permissao"; 
        let label = document.createElement("label");
        label.innerHTML='<label>'+user.rulename+'</label>';
        label.className="alinamento";
                
        check.appendChild(input);
        check.appendChild(label);
    });
})
.catch(function(error){
    console.warn(error);
});

