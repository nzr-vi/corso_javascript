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

let template_riga_song = "";
let songModal = null;
let modalTitle;

function resetModal(id, title, author, composer){
	document.getElementById('input_id').value = id;
	document.getElementById('input_title').value = title;
	document.getElementById('input_author').value = author;
	document.getElementById('input_composer').value = composer;
}

function writeSong(event){
	let song_id = document.getElementById('input_id').value;
	let song_title = document.getElementById('input_title').value;
	let song_author = document.getElementById('input_author').value;
	let song_composer = document.getElementById('input_composer').value;

	if(song_id=="")
	{
		if(confirm("Sei sicuro di voler aggiungere la canzone: "+song_title+"?"))
		{
			fetch(base_url+"create.json",
				{
					method: 'POST',
					headers: {
					'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						"title":song_title,
						"author":song_author,
						"composer":song_composer
					})
				})
				.then(function(response) {
					return response.json();
				})
				.then(function(json) {
						
						console.log(json);
	
						if(json.result !== 0){
							alert("Error "+json.result+" in createSong: "+json.message);
						} else {
							alert("creazione della canzone "+song_title+" avvenuta con successo.");
						}
						refreshSongs();
						
				})
				.catch(function(err) { 
						alert(err);
						console.log('Failed to fetch page: ', err);
				});
		}
	}
	else{
		if(confirm("Sei sicuro di voler aggiornare la canzone: "+song_id+" - "+song_title+"?")){
		fetch(base_url+"edit.json",
			{
				method: 'POST',
				headers: {
				'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"id":song_id,
					"title":song_id,
					"author":song_author,
					"composer":song_composer
				})
			})
			.then(function(response) {
				return response.json();
			})
			.then(function(json) {
					
					console.log(json);

					if(json.result !== 0){
						alert("Error "+json.result+" in editSong: "+json.message);
					} else {
						alert("edit della canzone "+song_title+" avvenuta con successo.");
					}
					refreshSongs();
					
			})
			.catch(function(err) { 
					alert(err);
					console.log('Failed to fetch page: ', err);
			});
		}
	}
}

function initWriteForm(event){
	let originator = event.currentTarget;
	let song_id = originator.getAttribute('data-song-id');
	console.log("write id="+song_id);
	
	let isEdit = song_id!=null && song_id!='';

	let idInput = document.getElementById('input_id');

	if(isEdit){
		modalTitle.innerHTML = "Edit Song";
		let values = JSON.parse(originator.getAttribute('data-song-data'));
		resetModal(song_id,values.title,values.author,values.composer);
		idInput.removeAttribute('placeholder');
	}
	else{
		modalTitle.innerHTML = "Add Song";
		resetModal('','','','');
		idInput.setAttribute('placeholder','defined by the server afterwards');
	}	
	songModal.show();
}

function deleteSong(event){
	let originator = event.currentTarget;
	let song_id = originator.getAttribute('data-song-id');
	let song_title = originator.getAttribute('data-song-title');
	console.log("delete id="+song_id);

	if(confirm("Sei sicuro di voler cancellare la canzone: "+song_id+" - "+song_title+"?")){
		fetch(base_url+"delete.json?id="+song_id)
		.then(function(response) {
			return response.json();
		})
		.then(function(json) {
				
				console.log(json);

				if(json.result !== 0){
					alert("Error "+json.result+" in deleteSong: "+json.message);
				} else {
					alert("cancellazione della canzone "+song_title+" avvenuta con successo.");
				}
				refreshSongs();
				
		})
		.catch(function(err) { 
				alert(err);
				console.log('Failed to fetch page: ', err);
		});
	}
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
		let rows = "";

		if(json.result !== 0){
			alert("Error "+json.result+" in refreshSongs: "+json.message);
		} else {
			for(let li=0; li<json.data.length; li++){
				let row = template_riga_song;
				rows += row.replaceAll("{{id}}", json.data[li].id)
					.replaceAll("{{title}}", json.data[li].title)
					.replaceAll("{{author}}", json.data[li].author)
					.replaceAll("{{composer}}", json.data[li].composer);
			}
		}
		document.getElementById("table_songs_body").innerHTML = rows;
		agganciaEventiEditDelete();
	})
	.catch(function(err) { 
			alert(err);
			console.log('Failed to fetch page: ', err);
	});	
}

function agganciaEventiEditDelete(){
	let bottoniEditSong = document.getElementsByClassName("edit-song");
	for(let li=0; li<bottoniEditSong.length; li++){
		bottoniEditSong[li].addEventListener("click", initWriteForm);
	}

	let bottoniDeleteSong = document.getElementsByClassName("delete-song");
	for(let li=0; li<bottoniDeleteSong.length; li++){
		bottoniDeleteSong[li].addEventListener("click", deleteSong);
	}
}

window.addEventListener(
	'DOMContentLoaded', 
	function(event){

		songModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});

		let bottoniAddSong = document.getElementsByClassName("add-song");
		for(let li=0; li<bottoniAddSong.length; li++){
			bottoniAddSong[li].addEventListener("click", initWriteForm);
		}

		let bottoniRefreshSongs = document.getElementsByClassName("refresh-songs");
		for(let li=0; li<bottoniRefreshSongs.length; li++){
			bottoniRefreshSongs[li].addEventListener("click", refreshSongs);
		}

		template_riga_song = document.getElementById("table_songs_body").innerHTML;

		modalTitle = document.getElementById("DataFormTitle");

		document.getElementById("btn-fetch-edit-song").addEventListener('click',writeSong);

		refreshSongs(null);
	}
);