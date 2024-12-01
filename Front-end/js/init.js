const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
//NUEVAS RUTAS DE API
const CATEGORIES_URL = "http://localhost:3000/protected/cats";
const PRODUCTS_URL = "http://localhost:3000/protected/cats_products";
const PRODUCT_INFO_URL = "http://localhost:3000/protected/products/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/protected/products_comments/";

document.addEventListener("DOMContentLoaded", ()=> {
  cargarMenu();
  
})

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}


// FUNCIÓN PARA VERIFICAR LA SESIÓN Y REDIRIGIR AL LOGIN SI ES NECESARIO
function checkSessionAndRedirect() {
  const userSession = JSON.parse(localStorage.getItem("userSession"));

  if (!userSession || !userSession.token) {
      console.log('Token no encontrado o sesión no iniciada.');
      localStorage.removeItem('userSession'); 
      window.location.href = "login.html"; 
      return false; 
  }
  return true; 
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();

  
  if (!checkSessionAndRedirect()) {
      hideSpinner();
      return; 
  }

  const userSession = JSON.parse(localStorage.getItem("userSession"));

  return fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${userSession.token}` 
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('No autorizado o error al obtener datos');
      }
      return response.json();
  })
  .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
  })
  .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      console.error('Error al obtener datos protegidos:', error.message);
      localStorage.removeItem('userSession');
      window.location.href = "login.html"; 
      return result;
  });
}

//FUNCIÓN PARA ACCEDER A RUTAS PROTEGIDAS
function fetchProtectedData(endpoint) {

  if (!checkSessionAndRedirect()) {
      return; 
  }

  const userSession = JSON.parse(localStorage.getItem('userSession'));

  fetch(endpoint, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${userSession.token}`,
      },
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('No autorizado o recurso no encontrado.');
      }
      return response.json();
  })
  .then(data => console.log('Datos protegidos:', data))
  .catch(error => {
      alert(error.message);
      localStorage.removeItem('userSession'); 
      window.location.href = "login.html"; 
  });
}


//FUNCIÓN QUE CARGA EL MENU DESPLEGABLE CON LAS OPCIONES DE IR AL CARRITO Y MI PERFIL
function cargarMenu(){
  fetch("menu.html")
  .then(response => response.text())
  .then(data => {
      document.getElementById("menu-placeholder").innerHTML = data;
        if (document.getElementById("user-name")) {
          checkLoginStatus();
      }
  })
  .catch(error => console.error("Error al cargar el menú:", error));
}

//FUNCIÓN QUE CORROBORA SI HAY UNA SESION GUARDADA DEL USUARIO, ES DECIR, SI ESTA LOGGEADO
function checkLoginStatus() {
  //Obtenemos los datos guardados de la sesión
  const userSession = JSON.parse(localStorage.getItem('userSession'));

  //Corroboramos si existe una sesión guardada, y si el usuario inició sesión:
  if (userSession && userSession.loggedIn) {
      console.log(`Bienvenido/a, ${userSession.username}`);

      // Si no está loggeado, es redirigido a login-html
  } else {
      window.location.href= "login.html"
      console.log('El usuario no tiene una sesión iniciada. Redirigir al log-in');
  }
  
      // Desafíate entrega 2, mostrar usuario el parte derecha del navbar
      document.getElementById('user-name').textContent = userSession.username;

}

//FUNCIÓN PARA CERRAR SESION
function logout() {
  console.log('Función de cerrar sesión llamada'); 
  localStorage.removeItem('userSession');
  localStorage.removeItem("firstName");
  localStorage.removeItem("secondName");
  localStorage.removeItem("lastName");
  localStorage.removeItem("secondLastName");
  localStorage.removeItem("phone");
  localStorage.removeItem('token');
  console.log('Sesión cerrada y datos eliminados de localStorage.');
  window.location.href = 'index.html';
}


//EVENTO DEL BOTON PARA IR HACIA ARRIBA
document.addEventListener('scroll', function() {
  if(document.documentElement.scrollTop > 100) {
   document.querySelector('.go-top-container').classList.add('show-button');

  } else {
   document.querySelector('.go-top-container').classList.remove('show-button');
  }
});

document.querySelector('.go-top-container').addEventListener('click', function() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const body = document.body;

  // Verificar si el modo oscuro está activado en localStorage
  if (localStorage.getItem('darkMode') === 'enabled') {
      body.classList.add('active');
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const darkModeToggle = document.querySelector(".dark-mode");
  if (darkModeToggle) {
      const body = document.body;

      // Verificar si el modo oscuro estaba habilitado antes
      if (localStorage.getItem('darkMode') === 'enabled') {
          body.classList.add('active');
      }

      darkModeToggle.addEventListener("click", () => {
          console.log("Dark mode toggled");
          body.classList.toggle("active");

          // Guardar el estado en localStorage
          if (body.classList.contains('active')) {
              localStorage.setItem('darkMode', 'enabled');
          } else {
              localStorage.setItem('darkMode', 'disabled');
          }
      });
    }
});
