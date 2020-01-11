//Só carrega quando o HTML estiver pronto.
//window.onload = function(){
	$(document).ready (function() { 
if(window.indexedDB) {
		var db = null;
		//var contador = 0;
		//if(contador==0) {
		//	$("#tabela").hide();
		//	$("#alerta").show();
		//}else{
		//	$("#tabela").show();
		//	$("#alerta").hide();
		//}

		var objBanco = window.indexedDB.open("jogosBD", 3);
		objBanco.onsuccess = function(evento){
			console.log("Conectado com sucesso.");
			db = evento.target.result;
			
	

			//CONSULTA
			var tx = db.transaction(["jogosBD"], "readonly");
			var jogosStore = tx.objectStore("jogos");
			
			var request = jogosStore.openCursor();
			request.onerror = function(evento){
				console.log("Erro na consulta");
			}
			
			var tabela = document.getElementById("tabela");
			
			

			//Caso a requisição deu certo!
			request.onsuccess = function(evento){
				var cursor = evento.target.result;
				if(cursor){
					var linha 			= tabela.insertRow(-1);
					var celdataJogo 	= linha.insertCell(0);
					var celequipeLocal 	 	= linha.insertCell(1);
					var celequipeVisitante 	 	= linha.insertCell(2);
					var celgolcasa 	= linha.insertCell(3);
					var celgolvisitante 	 	= linha.insertCell(4);
					var celcampeonato	 	= linha.insertCell(5);
					var celpublico 	= linha.insertCell(6);
					var celBotoes 	 	= linha.insertCell(7);
					
					var jogos = cursor.value;
					console.log(jogos);
					
					var sdataJogo=jogos.dataJogo.substring (8,10)+"/"+
					jogos.dataJogo.substring (5,7)+"/"+
					jogos.dataJogo.substring (0,4);
					celdataJogo.innerHTML 		= sdataJogo;
					celequipeLocal.innerHTML  	= jogos.equipeLocal;
					celequipeVisitante.innerHTML  	= jogos.equipevisitante;
					var sgolcasa =jogos.golcasa
					celgolcasa.innerHTML 		= sgolcasa;
					var sgolvisitante =jogos.golvisitante
					celgolvisitante.innerHTML 		= sgolvisitante;
					celcampeonato.innerHTML 		= jogos.campeonato;
					var spublico =jogos.publico
					celpublico.innerHTML 		= s.publico;
					celBotoes.innerHTML="<a class='btn btn-outline-warning' href='editar.html?codigo="+jogos.codigo+"'>Editar</a>"+"   "+"<a class='btn btn-outline-danger' href='apagar.html?codigo="+jogos.codigo+"'>Apagar</a>";
					
					//contador++;
					//console.log(contador);

					cursor.continue();
					
				}
			}

			
			
		}
		
		objBanco.onerror = function(evento){
			console.log("Erro na conexão com BD");
		}
		
		objBanco.onupgradeneeded = function(evento){
			db = evento.target.result;
			var objjogos = db.createObjectStore("jogos", 
			{ keyPath: "codigo", autoIncrement: true });
		}
	} else {
		console.log("Banco de dados IndexedDB não suportado");
	}		
});