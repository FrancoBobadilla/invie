////////////////////////////////////CONFIGURACION DE FIREBASE////////////////////////////////////

firebase.initializeApp({
    apiKey: "AIzaSyDka4z16iHDdWC_8GNx1M61VDBOs1VeHp4",
    authDomain: "franco-ce0a8.firebaseapp.com",
    databaseURL: "https://franco-ce0a8.firebaseio.com",
    projectId: "franco-ce0a8",
    storageBucket: "franco-ce0a8.appspot.com",
    messagingSenderId: "116092167536"
});


////////////////////////////////////CONSTANTES DE FIREBASE////////////////////////////////////

const refDatabase = firebase.database().ref();
const refStorage = firebase.storage().ref();


////////////////////////////////////CONSTANTES DE DOCUMENT////////////////////////////////////

const btnUsuario = document.getElementById("btnUsuario");
const btnRegister = document.getElementById("btnRegister");
const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");
const btnResetPassword = document.getElementById("btnResetPassword");
const btnUpdateEmail = document.getElementById("btnUpdateEmail");
const btnUpdatePassword = document.getElementById("btnUpdatePassword");
const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const descripcion = document.getElementById("descripcion");
const tipo = document.getElementById("tipo");
const inputImg = document.getElementById("inputImg");
const datosPerfil = document.getElementById("datosPerfil");
const perfilNombre = document.getElementById("perfilNombre");
const perfilTelefono = document.getElementById("perfilTelefono");
const perfilDireccion = document.getElementById("perfilDireccion");
const formularioPerfil = document.getElementById("formularioPerfil");
const perfilEditar = document.getElementById("perfilEditar");
const cancelForm = document.getElementById("cancelForm");
const nombreForm = document.getElementById("nombreForm");
const telefonoForm = document.getElementById("telefonoForm");
const calleForm = document.getElementById("calleForm");
const coloniaForm = document.getElementById("coloniaForm");
const cpForm = document.getElementById("cpForm");
const guitarrasContent = document.getElementById('guitarrasContent');


////////////////////////////////////EVENTOS////////////////////////////////////

firebase.auth().onAuthStateChanged((usuario) => {
    if (usuario) {
        btnRegister.style.display = 'none';
        btnLogin.style.display = 'none';
        btnLogout.style.display = 'block';
        btnResetPassword.style.display = 'none';
        btnUpdateEmail.style.display = 'block';
        btnUpdatePassword.style.display = 'block';
    } else {
        btnRegister.style.display = 'block';
        btnLogin.style.display = 'block';
        btnLogout.style.display = 'none';
        btnResetPassword.style.display = 'block';
        btnUpdateEmail.style.display = 'none';
        btnUpdatePassword.style.display = 'none';
    }
});

btnUsuario.addEventListener("click", () => {
    leerGuitarras();
    tirarDatos();
    console.log(firebase.auth().currentUser);
});

btnRegister.addEventListener("click", () => {
    event.preventDefault();


    //email y password hardcodeadas
    var email = "1709673@ucc.edu.ar";
    var password = "holachau";
    //email y password hardcodeadas


    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        console.log("cuenta creada");
        firebase.auth().currentUser.sendEmailVerification().then(() => {
            console.log("verificacion enviada");
        }).catch((error) => {
            console.log(error.code, error.message);
        });
    }).catch((error) => {
        console.log(error.code, error.message);
    });
});

btnLogin.addEventListener("click", () => {
    event.preventDefault();


    //email y password hardcodeadas
    var email = "1709673@ucc.edu.ar";
    var password = "holachau";
    //email y password hardcodeadas


    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        console.log("sesion iniciada");
    }).catch((error) => {
        console.log(error.code, error.message);
    });
});

btnLogout.addEventListener("click", () => {
    event.preventDefault();


    firebase.auth().signOut().then(() => {
        console.log("sesion cerrada");
    }).catch((error) => {
        console.log(error.code, error.message);
    });
});

btnResetPassword.addEventListener("click", () => {
    event.preventDefault();

    //email hardcodeado
    var email = "1709673@ucc.edu.ar";
    //email hardcodeado


    firebase.auth().sendPasswordResetEmail(email).then(function () {
        console.log("email de restablecimiento de contraseña enviado");
    }).catch(function (error) {
        console.log(error.code, error.message);
    });
});

btnUpdateEmail.addEventListener("click", () => {
    event.preventDefault();

    //nuevoEmail hardcodeado
    var nuevoEmail = "1709673@ucc.edu.ar";
    //nuevoEmail hardcodeado


    firebase.auth().currentUser.updateEmail(nuevoEmail).then(() => {
        console.log("email actualizado");
    }).catch((error) => {
        console.log(error.code, error.message);
    });
});

btnUpdatePassword.addEventListener("click", () => {
    event.preventDefault();

    //nuevaPassword hardcodeada
    var nuevaPassword = "holachau";
    //nuevaPassword hardcodeada

    firebase.auth().currentUser.updatePassword(nuevaPassword).then(() => {
        console.log("contraseña actualizada");
    }).catch((error) => {
        console.log(error.code, error.message);
    });
});

perfilEditar.addEventListener("click", () => {
    datosPerfil.style.display = "none";
    formularioPerfil.style.display = "block";
});

cancelForm.addEventListener("click", () => {
    datosPerfil.style.display = "block";
    formularioPerfil.style.display = "none";
});


////////////////////////////////////FUNCIONES////////////////////////////////////

function leerGuitarras() {
    refDatabase.child("usuarios").child(firebase.auth().currentUser.uid).child("guitarras").once('value', (usuario) => {
        usuario.forEach((datos) => {
            guitarrasContent.insertBefore(
                crearElementoGuitarra(datos.key, datos.val().nombre, datos.val().precio, datos.val().tipo, datos.val().descripcion, datos.val().imagen),
                guitarrasContent.firstChild
            )
        });
    })
}

function crearElementoGuitarra(key, nombre, precio, tipo, descripcion, imagen) {
    const div = document.getElementById('div');
    div.innerHTML =
        '<article class="guitarra contenedor">' +
        '<img class="derecha" src="" alt="Guitarra Invie Acustica" width="150"/>' +
        '<div class="contenedor-guitarra-a">' +
        '<h3 class="title-b">' + nombre + '</h3>' +
        '<ol>' +
        '<li class="precio-b">' + precio + '</li>' +
        '<li class="descripcion-b">' + descripcion + '</li>' +
        '<li class="descripcion-b">' + tipo + '</li>' +
        '</ol>' +
        '</div>' +
        '</article>';
    const guitarElement = div.firstChild;
    let imgURL = "";
    refStorage.child("guitarras").child(firebase.auth().currentUser.uid).child(key).child(imagen).getDownloadURL().then((url) => {
        imgURL = url
    }).then(() => {
        guitarElement.getElementsByClassName('derecha')[0].src = imgURL;
    });
    return guitarElement;
}


function agregarGuitarra() {
    event.preventDefault();
    if (nombre.value && descripcion.value && precio.value && inputImg.files[0].name) {
        refStorage.child("guitarras").child(firebase.auth().currentUser.uid).child(refDatabase.child("usuarios").child(firebase.auth().currentUser.uid).child("guitarras").push({
            nombre: nombre.value,
            descripcion: descripcion.value,
            tipo: tipo.value,
            precio: precio.value,
            imagen: inputImg.files[0].name
        }).key).child(inputImg.files[0].name).put(inputImg.files[0]);
    } else {
        console.log("faltan completar campos");
    }
}

function tirarDatos() {
    refDatabase.child("usuarios").child(firebase.auth().currentUser.uid).child("personal").on("value", (usuario) => {
        perfilNombre.innerHTML = usuario.val().nombre;
        perfilTelefono.innerHTML = usuario.val().telefono;
        perfilDireccion.innerHTML = usuario.val().direccion.calle + ", " + usuario.val().direccion.colonia + " " + usuario.val().direccion.cp;
    })
}

function editarDatos() {
    event.preventDefault();
    refDatabase.child("usuarios").child(firebase.auth().currentUser.uid).child("personal").update({
        nombre: nombreForm.value,
        telefono: telefonoForm.value,
        direccion: {
            calle: calleForm.value,
            colonia: coloniaForm.value,
            cp: cpForm.value
        }
    });
    datosPerfil.style.display = "block";
    formularioPerfil.style.display = "none";
}