const form= document.querySelector("#film-form");
const titleElement= document.querySelector("#title");
const directorElement= document.querySelector("#director");
const urlElement= document.querySelector("#url");
const cardBody= document.querySelectorAll(".card-body")[1];
const clear= document.querySelector("#clear-films")

//ui objesini başlatma
const ui= new UI();

//storage objesi
const storage= new Storage();

//tüm eventler
evenlisteners();
function evenlisteners(){
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films= storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
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
        ui.displayMessages("Tüm alanları doldurun!","danger");
    }
    else{
        //yeni film
        const newFilm= new Film(title, director, url);

        //arayüze film ekleme
        ui.addFilmToUI(newFilm);

        //storage'a film ekleme
        storage.addFilmToStorage(newFilm);
        ui.displayMessages("Film başarı ile eklendi","success");
    }
    
    ui.clearInput(titleElement, directorElement, urlElement);

    e.preventDefault();
}
function deleteFilm(e){
    if(e.target.id==="delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Silme işlemi başarılı...","success");

    }
}
function clearAllFilms(e){
    if(confirm("Tüm fimleri silmek istediğinizde emin misiniz?")){
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    }
   
}