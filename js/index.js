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
const direccion = document.getElementById("direccion");
const inputImg = document.getElementById("inputImg");
const datosPerfil = document.getElementById("datosPerfil");
const perfilNombre = document.getElementById("perfilNombre");
const perfilTelefono = document.getElementById("perfilTelefono");
const formularioPerfil = document.getElementById("formularioPerfil");
const perfilEditar = document.getElementById("perfilEditar");
const cancelForm = document.getElementById("cancelForm");
const nombreForm = document.getElementById("nombreForm");
const telefonoForm = document.getElementById("telefonoForm");
const localesContent = document.getElementById('localesContent');


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
    leerLocales();
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

function leerLocales() {
    refDatabase.child("usuarios").child(firebase.auth().currentUser.uid).child("locales").once('value', (locales) => {
        locales.forEach((local) => {
            localesContent.insertBefore(
                crearElementoLocal(local.val()),
                localesContent.firstChild
            )
        });
    })
}

function crearElementoLocal(keyLocal) {
    const div = document.getElementById('div');
    var nombreLocal;
    var direccionLocal;
    refDatabase.child("locales").child(keyLocal).once('value', (local) => {
        nombreLocal = local.val().nombre;
        direccionLocal = local.val().direccion;
    }).then(() => {
        div.innerHTML =
            '<article class="guitarra contenedor">' +
            '<img class="derecha" src="" alt="Guitarra Invie Acustica" width="300"/>' +
            '<div class="contenedor-guitarra-a">' +
            '<h3 class="title-b">' + nombreLocal + '</h3>' +
            '<h3 class="title-b">' + direccionLocal + '</h3>' +
            '</div>' +
            '</article>';
        const localElement = div.firstChild;
        let imgURL = "";
        refStorage.child("locales").child(keyLocal).getDownloadURL().then((url) => {
            imgURL = url
        }).then(() => {
            localElement.getElementsByClassName('derecha')[0].src = imgURL;
        });
        return localElement;
    });
}


function agregarLocal() {
    event.preventDefault();
    const n = nombre.value;
    const d = direccion.value;
    const i = inputImg.files[0].name;
    if (n && i) {
        firebase.auth().currentUser.getIdToken(true);
        const keyLocal = refDatabase.child("locales").push({nombre: n, direccion: d}).key;
        refDatabase.child("usuarios").child(firebase.auth().currentUser.uid).child("locales").push(keyLocal);
        refStorage.child("locales").child(keyLocal).put(inputImg.files[0]);
    } else {
        console.log("faltan completar campos");
    }
}

function tirarDatos() {
    refDatabase.child("usuarios").child(firebase.auth().currentUser.uid).child("personal").on("value", (usuario) => {
        perfilNombre.innerHTML = usuario.val().nombre;
        perfilTelefono.innerHTML = usuario.val().telefono;
    })
}

function editarDatos() {
    event.preventDefault();
    refDatabase.child("usuarios").child(firebase.auth().currentUser.uid).child("personal").update({
        nombre: nombreForm.value,
        telefono: telefonoForm.value
    });
    datosPerfil.style.display = "block";
    formularioPerfil.style.display = "none";
}