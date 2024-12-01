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

//AL APRETAR INGRESAR, TE LLEVA A LA PAGINA PRINCIPAL SI ES VALIDO
// signBtn.addEventListener("click", function () {
//     console.log("clickeado");
//     if (inputValidation()) {
//         // Session storage
//         let token = password.value;
//         let userName = user.value;
//         console.log(token, userName);
//         loginUser(userName, token);
//     }
// });

// evento que me muestra u oculta contraseña
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

//FUNCIÓN QUE CREA UN OBJETO CON LOS DATOS DEL LOG-IN USUARIO Y LO GUARDA EN EL SESSION STORAGE
function loginUser(username, token) {
    const userSession = {
        username: username,
        password: token,
        loggedIn: true,
    };
 
    // POST para conseguir el token de el usuario en http://localhost:3001/login
    fetch(LOGIN_URL, {
        method: 'POST',
        body: JSON.stringify(userSession),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
                userSession.token = data.token;
                userSession.loggedIn = true;
                // Guardo el objeto en el session storage
                localStorage.setItem('userSession', JSON.stringify(userSession));
                window.location.href = "index.html";
                return;
        })
        .catch((error) => {
            userSession.loggedIn = false;
            userSession.clear();
            alert('Usuario no existe o no esta autorizado, Intente nuevamente.');
        });


    console.log('Log in correcto y sesión guardada.');
}

// ACÁ EL CÓDIGO NUEVO:
// ESTA ES LA FUNCIÓN QUE ARMÉ PARA UNIFICAR LOGINUSER() Y EL ADDEVENTLISTENES A SIGNBTN

signBtn.addEventListener("click", function () {
    console.log("Botón clickeado");
    const usernameValue = user.value;
    const passwordValue = password.value;
    const userSession = { usernameValue, passwordValue };
    
    fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userSession)
    })
    .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         // userSession.token = data.token;
//         // userSession.loggedIn = true;
//         // // Guardo el objeto en el session storage
//         // localStorage.setItem('userSession', JSON.stringify(userSession));
//         window.location.href = "index.html";
//         return;
// })
    .then(data => {
        console.log("Respuesta recibida:", data)
        window.location.href = "index.html";
    } )
    .catch(error => console.error("Error en fetch:", error));
});