//Só carrega quando o HTML estiver pronto.
window.onload = function(){
//Inicialização do banco de dados
	var botao = document.getElementById("botao");
	
	if(window.indexedDB) {
		var db = null;
		var objBanco = window.indexedDB.open("jogosBD", 3);
		objBanco.onsuccess = function(evento){
			console.log("Conexão feita com sucesso.");
			db = evento.target.result;
		}
		
		objBanco.onerror = function(evento){
			console.log("Falha ao conectar com banco de dados");
		}
		
		objBanco.onupgradeneeded = function(evento){
			db = evento.target.result;
			var objContratos = db.createObjectStore("jogos", 
			{ keyPath: "codigo", autoIncrement: true });
		}
		
		//Quando o usuário clicar no botão..
		botao.onclick = function() {
			//Capturar os valores do formulário..
			var sdataJogo = 
			document.getElementById("dataJogo").value;
			var sequipeLocal = 
			document.getElementById("equipeLocal").value;
			var sequipeVisitante = 
			document.getElementById("equipeVisitante").value;
			var fgolcasa = 
			parseFloat(document.getElementById("golcasa").value);
			var fgolvisitante = 
			parseFloat(document.getElementById("golvisitante").value);
			var scampeonato = 
			document.getElementById("campeonato").value;
			var sestadio = 
			document.getElementById("estadio").value;
			var fpublico = 
			parseFloat(document.getElementById("publico").value);
			var smelhoremcampo = 
			document.getElementById("melhoremcampo").value;
			console.log(sdataJogo+sequipeLocal+sequipeVisitante+fgolcasa+fgolvisitante+scampeonato+sestadio+fpublico+smelhoremcampo);
			
			//JSON
			var jogos = {	dataJogo: sdataJogo,
							equipeLocal: sequipeLocal,
							equipeVisitante: sequipeVisitante,
							golcasa: fgolcasa,
							golvisitante: fgolvisitante,
							campeonato: scampeonato,
							estadio: sestadio,
							publico: fpublico,
							melhoremcampo: smelhoremcampo,
							};
			console.log(jogos);
			
			var tx = db.transaction(["jogos"], "readwrite");
			var jogosStore = tx.objectStore("jogos");
			jogos.put(jogos);
			
			window.location.href = "index.html";
		}
	} else {
		console.log("Banco de dados IndexedDB não suportado");
	}

	//Comando para registrar no console
	console.log("Hello!");

	/*
	Chamar o botão de "Adicionar despesa"
	*/

	//Quando o usuário passar o mouse no botão..
	botao.onmouseover = function(){
		botao.value = "Adicionar Partida";
	}

	//Quando o usuário tirar o mouse no botão..
	botao.onmouseout = function(){
		botao.value = "Adicione Partida";
	}	
	

	
	
}