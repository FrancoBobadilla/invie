firebase.initializeApp({
    apiKey: "AIzaSyDka4z16iHDdWC_8GNx1M61VDBOs1VeHp4",
    authDomain: "franco-ce0a8.firebaseapp.com",
    databaseURL: "https://franco-ce0a8.firebaseio.com",
    projectId: "franco-ce0a8",
    storageBucket: "franco-ce0a8.appspot.com",
    messagingSenderId: "116092167536"
});

const refGuitarras = firebase.database().ref("guitarras");
const btnLogout = document.getElementById("btnLogout");
const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const descripcion = document.getElementById("descripcion");
const tipo = document.getElementById("tipo");
const inputImg = document.getElementById("inputImg");
const test = document.getElementById("test");
const refStorage = firebase.storage().ref();
const btnDescargar = document.getElementById("btnDescargar");
const btnGuitarras = document.getElementById("btnGuitarras");
/*
firebase.auth().onAuthStateChanged(function (user) {
    console.log(user);
    if (!user) window.location.href = "../index.html"
});
*/

btnGuitarras.addEventListener("click", () => {
    event.preventDefault();
    console.log(firebase.auth().currentUser);
});

btnLogout.addEventListener("click", () => {
    event.preventDefault();
    firebase.auth().signOut().then(() => {
        alert("Se ha cerrado la sesión");
    });
});

inputImg.addEventListener("change", () => {
});

btnDescargar.addEventListener("click", () => {
    event.preventDefault();
    descargarStorage("puto.jpg");
});

function nuevaGuitarra() {
    event.preventDefault();
    var obj = {
        nombre: nombre.value,
        descripcion: descripcion.value,
        tipo: tipo.value,
        precio: precio.value,
        imagen: inputImg.files[0].name
    };
    console.log(obj);
    if (obj.tipo === "normal" || obj.tipo === "vip") {
        refGuitarras.child(obj.tipo).child(firebase.auth().currentUser.uid).set(obj);
        subirStorage(inputImg);
    } else {
        console.log("la guitarra debe ser normal o vip")
    }
}

function subirStorage(input) {
    //firebase.auth().currentUser.getIdToken(true);

    var carpeta = "normal";
    var img = input.files[0];

    if (img) {
        refStorage.child(carpeta).child(firebase.auth().currentUser.uid).child(img.name).put(img).catch((error) => {
            console.log(error.code + '\n' + error.message);
        });
    }
}

function descargarStorage(nombre) {

    var carpeta = "normal";

    if (nombre) {
        refStorage.child(carpeta).child(firebase.auth().currentUser.uid).child(nombre).getDownloadURL().then((url) => {
            test.src = url;
        }).catch((error) => {
            console.log(error.code + '\n' + error.message);
        });
    }
}