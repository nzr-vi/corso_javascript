// codice javascript di front-end dell'app SONGS

/*

PREREQUISITI: la app deve essere responsive e single page

1. DONE nel corpo centrale deve esserci una tabella con id,title,author,composer
2. DONE nel menu aggiungere un bottone o item "Add Song"
3. DONE in ogni riga devono essere presenti due bottoni "Edit" e "Delete"
4. DONE preparare delle fake response con dei file statici JSON in una cartella mockup
5. TODO fare un form modale per inserimento o modifica di una canzone
6. TODO implementare la Add Song (anche se solo simulata con fake response)
7. TODO implementare la Edit Song (anche se solo simulata con fake response)
8. TODO implementare la Delete Song (anche se solo simulata con fake response)
*/
const base_url = "./stubs/";

let songModal = null;

function writeSong(event){
	let originator = event.currentTarget;
	let song_id = originator.getAttribute('data-song-id');
	console.log("id="+song_id);
	songModal.show();
}

function refreshSongs(event){

	// rileggo la lista delle canzoni dal back-end e ridisegno la tabella

	fetch(base_url+"list.json")
				.then(function(response) {
					return response.json();
				})
				.then(function(json) {
						
						console.log(json);
						// TODO posso ridisegnare la tabella
	
					
				})
				.catch(function(err) { 
						alert(err);
						console.log('Failed to fetch page: ', err);
				});	
}

window.addEventListener(
	'DOMContentLoaded', 
	function(event){

		songModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});

		let bottoniSong = document.getElementsByClassName("write-song");
		for(let li=0; li<bottoniSong.length; li++){
			//console.log(bottoniSong[li]);
			bottoniSong[li].addEventListener("click", writeSong);
		}

		let bottoniRefresh = document.getElementsByClassName("refresh-songs");
		for(let li=0; li<bottoniRefresh.length; li++){
			//console.log(bottoniSong[li]);
			bottoniRefresh[li].addEventListener("click", refreshSongs);
		}
	}
);