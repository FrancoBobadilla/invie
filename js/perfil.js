firebase.initializeApp({
    apiKey: "AIzaSyDka4z16iHDdWC_8GNx1M61VDBOs1VeHp4",
    authDomain: "franco-ce0a8.firebaseapp.com",
    databaseURL: "https://franco-ce0a8.firebaseio.com",
    projectId: "franco-ce0a8",
    storageBucket: "franco-ce0a8.appspot.com",
    messagingSenderId: "116092167536"
});

const refUsuario = firebase.database().ref().child("usuario");
const refPush = firebase.database().ref().child("push");
const btnLogout = document.getElementById("btnLogout");
const btnPush = document.getElementById("btnPush");
const btnUpdate = document.getElementById("btnUpdate");
const btnSet = document.getElementById("btnSet");
const btnRemove = document.getElementById("btnRemove");
const datosPerfil = document.getElementById("datosPerfil");
const perfilNombre = document.getElementById("perfilNombre");
const perfilEmail = document.getElementById("perfilEmail");
const perfilTelefono = document.getElementById("perfilTelefono");
const perfilDireccion = document.getElementById("perfilDireccion");
const formularioPerfil = document.getElementById("formularioPerfil");
const perfilEditar = document.getElementById("perfilEditar");
const cancelForm = document.getElementById("cancelForm");
const nombreForm = document.getElementById("nombreForm");
const telefonoForm = document.getElementById("telefonoForm");
const emailForm = document.getElementById("emailForm");
const calleForm = document.getElementById("calleForm");
const interiorForm = document.getElementById("interiorForm");
const coloniaForm = document.getElementById("coloniaForm");
const cpForm = document.getElementById("cpForm");


firebase.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
        btnLogin.style.display = 'none';
        btnLogout.style.display = 'block';
        tirarDatos(user.uid);
    } else {
        window.location.href = "../index.html";
    }
});

btnLogout.addEventListener("click", () => {
    event.preventDefault();
    firebase.auth().signOut().then(() => {
        alert("Se ha cerrado la sesión");
    });
});


btnPush.addEventListener("click", () => {
    event.preventDefault();
    refPush.push({
        datoA: "alfa",
        datoB: "beta",
        datoC: {
            datoCA: "gama",
            datoCB: "delta"
        }
    }).then(() => {
        alert("información del usuario pusheada");
    }).catch((err) => {
        alert("error en pusheo de información");
        console.log(err);
    })
});

btnUpdate.addEventListener("click", () => {
    event.preventDefault();
    refPush.child("-LLuu_cSkTJkiqEFD65e").update({
        datoA: "hola",
        datoC: {
            datoCA: "como",
            datoCB: "estas",
            datoCC: "bien",
            datoCD: "tu"
        }
    }).then(() => {
        alert("información del usuario updateada");
    }).catch((err) => {
        alert("error en updateo de información");
        console.log(err);
    });
});

btnSet.addEventListener("click", () => {
    event.preventDefault();
    refPush.child("-LLuu_cSkTJkiqEFD65e").set({
        datoA: "file",
        datoB: "edit",
        datoC: "view",
        datoD: {
            datoDA: "navigate",
            datoDD: "code"
        }
    }).then(() => {
        alert("información del usuario seteada");
    }).catch((err) => {
        alert("error en seteo de información");
        console.log(err);
    });
});

btnRemove.addEventListener("click", () => {
    event.preventDefault();
    refPush.child("-LLuu_cSkTJkiqEFD65e").remove().then(() => {
        alert("información del usuario removeada");
    }).catch((err) => {
        alert("error en removeo de información");
        console.log(err);
    });
});

function tirarDatos(uid) {
    refUsuario.child(uid).on("value", (data) => {
        perfilNombre.innerHTML = data.val().nombre;
        perfilEmail.innerHTML = data.val().email;
        perfilTelefono.innerHTML = data.val().telefono;
        perfilDireccion.innerHTML = data.val().direccion.calle + ", " + data.val().direccion.interior + ", " + data.val().direccion.colonia + " " + data.val().direccion.cp;
    })
}

perfilEditar.addEventListener("click", () => {
    datosPerfil.style.display = "none";
    formularioPerfil.style.display = "block";
});

cancelForm.addEventListener("click", () => {
    datosPerfil.style.display = "block";
    formularioPerfil.style.display = "none";
});

function editarDatos() {
    event.preventDefault();
    refUsuario.child(firebase.auth().currentUser.uid).update({
        nombre: nombreForm.value,
        email: emailForm.value,
        telefono: telefonoForm.value,
        direccion: {
            calle: calleForm.value,
            interior: interiorForm.value,
            colonia: coloniaForm.value,
            cp: cpForm.value
        }
    });
    datosPerfil.style.display = "block";
    formularioPerfil.style.display = "none";
}