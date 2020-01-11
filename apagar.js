//Só carrega quando o HTML estiver pronto.
//window.onload = function(){
	$(document).ready (function() { 
        if(window.indexedDB) {
                var db = null;
                var objBanco = window.indexedDB.open("jogosBD", 3);
                objBanco.onsuccess = function(evento){
                    console.log("Conexão realizada com sucesso!");
                    var db = evento.target.result;
                    
                    //CONSULTA
                    var tx = db.transaction(["jogos"], "readonly");
                    var jogosStore = tx.objectStore("jogos");
                  

                    var iCodigo = parseInt(getUrlParameter("codigo"));
                    console.log(iCodigo);
            
                    var objConsulta = jogosStore.get(iCodigo);
                    objConsulta.onsuccess = function() {
                         var registro = objConsulta.result;
                        console.log(registro);
                        $("#dataJogo").html(registro.dataJogo.substring(8,10)+"/"+
                            registro.dataIni.substring(5,7)+"/"+
                            registro.dataIni.substring(0,4));
                        $("#equipeLocal").html(registro.equipeLocal);
                        $("#equipeVisitante").html(registro.equipeVisitante);
                        $("#golcasa").html(registro.golcasa);
                        $("#golvisitante").html(registro.golvisitante);
                        $("#campeonato").html(registro.campeonato);
                        $("#estadio").html(registro.estadio);
                        $("#publico").html(registro.publico);
                        $("#melhoremcampo").html(registro.melhoremcampo);
                    };
                    
                    //Atualizar no banco de dados
                    $("#botao").click(function(){
                                        var txt = db.transaction(["jogos"], "readwrite");
                                        var atualizaJogos = txt.objectStore("jogos");
                                        atualizaJogos.delete(iCodigo);
                                        window.location.href="index.html";

                                });
                    }
                
        }

    });