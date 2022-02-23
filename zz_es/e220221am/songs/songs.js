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



const base_url = "./stubs/";
let songModal;
let song_row_template;

function writeSong(event){

	let originator = event.currentTarget;
	let song_id = originator.getAttribute('data-song-id');
	songModal.show();
}


function refreshSong(event){

	fetch(base_url+"list.json")
		.then(response=>response.json())
		.then(json=>{
			console.log(json);
			//	TODO ridisegno la tabella

			const row_template = song_row_template.innerHTML;
			let tbody = document.getElementById("song_list_tbody");

			tbody.innerHTML="";

			json.data.forEach(json_element=>{
				let new_row = row_template
					.replaceAll("{{id}}", json_element.id)
					.replaceAll("{{title}}", json_element.title)
					.replaceAll("{{author}}", json_element.author)
					.replaceAll("{{composer}}", json_element.composer);

				tbody.innerHTML+=new_row;
			})
		})
		.catch(err=>console.log(err));

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

		let btns_refresh_song = document.querySelectorAll('.refresh-song');
		btns_refresh_song.forEach(element => {
			//console.log(element);
			element.addEventListener('click',refreshSong);
		});

		song_row_template = document.getElementById('song_row_template')
	}
);