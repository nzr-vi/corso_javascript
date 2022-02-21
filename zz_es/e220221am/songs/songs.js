// codice javascript di front-end dell'app SONGS

/*

PREREQUISITI: la app deve essere responsive e single page

1. TODO nel corpo centrale deve esserci una tabella con id,title,author,composer
2. TODO nel menu aggiungere un bottone o item "Add Song"
3. TODO in ogni riga devono essere presenti due bottoni "Edit" e "Delete"
4. TODO preparare delle fake response con dei file statici JSON in una cartella mockup
5. TODO fare un form modale per inserimento o modifica di una canzone
6. TODO implementare la Add Song (anche se solo simulata con fake response)
7. TODO implementare la Edit Song (anche se solo simulata con fake response)
8. TODO implementare la Delete Song (anche se solo simulata con fake response)

id input type text but read only

insert a form inside the modal to allow the edit of the 4 (-1) elements
put the datas inside the form, (handluing the 2 cases, add song and edit in case
	the id has a value or not)
*/



let songModal;

function writeSong(event){

	let originator = event.currentTarget;
	let song_id = originator.getAttribute('data-song-id');
	songModal.show();
}

window.addEventListener(
	'DOMContentLoaded', 
	function(event){

		songModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
		//songModal.show();
		let btns_write_song = document.querySelectorAll('.write-song');
		btns_write_song.forEach(element => {
			//console.log(element);
			element.addEventListener('click',writeSong);
		});
	}
);