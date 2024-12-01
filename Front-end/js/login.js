const LOGIN_URL = "http://localhost:3000/login"

//DECLARACION DE VARIABLES Y CONSTANTES
let inputArray = document.querySelectorAll("input");
let signBtn = document.getElementById("signBtn");
let password = document.getElementById("password-input");
let user = document.getElementById("user-input");
let eyeOpen = document.getElementById('password-icon-show');
let eyeClosed = document.getElementById('password-icon-hide');


//FUNCIÓN QUE MUESTRA ERROR SI LOS CAMPOS NO ESTAN CORRECTOS
function showError(input) {
    let inputBox = input.closest('.input-box');
    inputBox.classList.add('error'); // agrego la clase eror al contenedor
    document.getElementById("error").style.display = "block";
}

//FUNCIÓN QUE DEJA DE MOSTRAR EL ERROR EN CASO DE QUE LOS CAMPOS SE CORRIGAN
function hideError(input) {
    let inputBox = input.closest('.input-box');
    inputBox.classList.remove('error'); // remuevo la clase error del contenedor
}

//FUNCIÓN QUE VALIDA QUE LOS CAMPOS SEAN VALIDOS
function inputValidation() {
    let isValid = true;

    inputArray.forEach(input => {
        if (input.value === "" || input.value.length < 3) {
            showError(input); // muestra el error si el campo no es valido
            isValid = false;
        } else {
            hideError(input); // oculta si el campo es valido
        }
    });

    console.log(isValid);

    return isValid;
}


// EVENTO QUE MUESTRA U OCULTA CONTRASEÑA
document.getElementById("show-hide-button").addEventListener("click", function () {
    if (password.type == "password") {
        password.type = "text";
          eyeOpen.style.display = 'none';
        eyeClosed.style.display = 'block';
    } else {
        password.type = "password";
        eyeOpen.style.display = 'block';
        eyeClosed.style.display = 'none';
    }
});


// CÓDIGO QUE MANEJA EL LOGIN DEL USUARIO
signBtn.addEventListener("click", function () {
    const usernameValue = user.value.trim();
    const passwordValue = password.value.trim();

    if (!usernameValue || !passwordValue) {
        alert('Por favor, ingrese un nombre de usuario y una contraseña.');
        return;
    }

    fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameValue, password: passwordValue })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Credenciales inválidas');
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:', data); 
            if (data.token) {
                const userSession = {
                    username: usernameValue,
                    token: data.token,  
                    loggedIn: true,
                };

                console.log('Guardando userSession en localStorage:', userSession);  
                localStorage.setItem('userSession', JSON.stringify(userSession));  

                window.location.href = "index.html";  
            } else {
                throw new Error('No se recibió el token');
            }
        })
        .catch(error => {
            alert(error.message);
        });
});

