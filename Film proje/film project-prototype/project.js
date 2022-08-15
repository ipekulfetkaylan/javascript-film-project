const form= document.querySelector("#film-form");
const titleElement= document.querySelector("#title");
const directorElement= document.querySelector("#director");
const urlElement= document.querySelector("#url");
const cardBody= document.querySelectorAll(".card-body")[1];
const clear= document.querySelector("#clear-films")

// //ui objesini başlatma
// const ui= new UI();

// //storage objesi
// const storage= new Storage();

//tüm eventler
evenlisteners();
function evenlisteners(){
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films= Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });

    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click", clearAllFilms);

}
function addFilm(e){
    const title= titleElement.value;
    const director= directorElement.value;
    const url = urlElement.value;
    if(title==="" || director==="" || url===""){
        //hata
        UI.displayMessages("Tüm alanları doldurun!","danger");
    }
    else{
        //yeni film
        const newFilm= new Film(title, director, url);

        //arayüze film ekleme
        UI.addFilmToUI(newFilm);

        //storage'a film ekleme
        Storage.addFilmToStorage(newFilm);
        UI.displayMessages("Film başarı ile eklendi","success");
    }
    
    UI.clearInput(titleElement, directorElement, urlElement);

    e.preventDefault();
}
function deleteFilm(e){
    if(e.target.id==="delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Silme işlemi başarılı...","success");

    }
}
function clearAllFilms(e){
    if(confirm("Tüm fimleri silmek istediğinizde emin misiniz?")){
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
    }
   
}