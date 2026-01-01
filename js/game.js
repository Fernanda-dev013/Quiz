let perguntasFeitas = [];

// Perguntas do jogo
const perguntas = [

  // Pergunta 0
  {pergunta: "Qual dessas linguagens não é considerada uma linguagem da programação?",
   respostas:["PHP","JavaCript","C++","HTML"],
   correta: "resp3"
  },

  // Pergunta 1
  {pergunta: "Em que ano o Brasil foi descoberto?",
   respostas:["1498","1500","1375","1800"],
   correta: "resp1"
  },

    // Pergunta 2
  {pergunta: "O que significa a sigla HTML?",
   respostas:["Hyper tonto Maluco Legal","Hyper Text Markup Language","Hey Trade More Language","Hyper Text Mark Lang"],
   correta: "resp1"
  },

    // Pergunta 3
  {pergunta: "Quais dessas linguagens é considerada uma linguagem da Marcação?",
   respostas:["HTML","C++","JavaCript","PHP"],
   correta: "resp0"
  },
]

var qtdPerguntas = perguntas.length -1;

gerarPerguntas(qtdPerguntas);

function gerarPerguntas(maxPerguntas) {

  // gerar um número aleatório
  let aleatorio = (Math.random() * maxPerguntas).toFixed();

  // converter para numero
  aleatorio = Number(aleatorio);

  // mostrar no console qual foi a perginta sorteada
  console.log('a pergunta sorteada foi a:' + aleatorio);

  // verfificar se a pergunta sorteada já foi feita
  if(!perguntasFeitas.includes(aleatorio)){

    // colocar como pergunta feita
    perguntasFeitas.push(aleatorio);

    var p_selecionada = perguntas[aleatorio].pergunta;
    console.log(p_selecionada);

    // alimentar a pergunta vinda do sorteio
    $("#pergunta").html(p_selecionada);
    $("#pergunta").attr('data-indece', aleatorio);

    // colocar as respostas

    // (laço de repetição = abreviação dos códigos)
    for(var i=0; i<4; i++){
      $("#resp" + i).html(perguntas[aleatorio].respostas[i]);
    }

    // (código completo)
    // var resp0 = perguntas[aleatorio].respostas[0];
    // var resp1 = perguntas[aleatorio].respostas[1];
    // var resp2 = perguntas[aleatorio].respostas[2];
    // var resp3 = perguntas[aleatorio].respostas[3];

    // $("#resp0").html(resp0);
    // $("#resp1").html(resp1);
    // $("#resp2").html(resp2);
    // $("#resp3").html(resp3);

    // Embaralhar as resposta
    var pai = $("#respostas");
    var botoes = pai.children();

    for (var i = 1; i<botoes.length; i ++){
      pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)));
    }
  } else{
    // Se a pergunta já foi feita
    console.log('A pergunta já foi pergunta feitas. Sorteando novamente');
     if (perguntasFeitas.length < qtdPerguntas +1) {
      return gerarPerguntas(maxPerguntas);
     } 
     else{
      console.log('Acabaram as perguntas');

      $('#quiz').addClass('oculto');
      $('#mensagem').html('Parabéns!');
      $('#status').removeClass('oculto');
    }
  }
}

$('.resposta').click(function(){
  if($("#quiz").attr('data-status') !== 'travado'){

  resetaBotoes();

  // Adicionar a classe selecionada
  $(this).addClass('selecionada');
   }
});

$("#confirm").click(function(){
  //Peger o indece da pergunta
  var indece = $("#pergunta").attr('data-indece');
  
  //Qual a resposta certa
  var respCerta = perguntas[indece].correta;

  //Qual foi a resposta que o usuário selecionou
  $('.resposta').each(function(){
    if($(this).hasClass('selecionada')){
      var respostaEscolhida = $(this).attr('id');

      if (respCerta == respostaEscolhida){
        console.log('Resposta certa');
        proximaPergunta();
      }

      else {
        console.log('Resposta errada');
        $('#quiz').attr('data-status', 'travado');
        $("#confirm").addClass('oculto');
        $('#'+ respCerta).addClass('correta');
        $('#'+ respostaEscolhida).removeClass('selecionada');
        $('#'+ respostaEscolhida).addClass('errada');

        //2 segundos para dar Game Over
        setTimeout(function () {
          gameOver();
        },2000);
      }
    }
  })
});

function newGame(){
  $("#confirm").removeClass('oculto');
  $('#quiz').attr('data-status', 'ok');
  perguntasFeitas = [];
  resetaBotoes();
  gerarPerguntas(qtdPerguntas);
  $('#quiz').removeClass('oculto');
  $('#status').addClass('oculto');

}

function proximaPergunta(){
  resetaBotoes();
  gerarPerguntas(qtdPerguntas);

}

function resetaBotoes(){
   $('.resposta').each(function(){
    if($(this).hasClass('selecionada')){
      $(this).removeClass('selecionada');
    }
    if($(this).hasClass('correta')){
      $(this).removeClass('correta');
    }
    if($(this).hasClass('errada')){
      $(this).removeClass('errada');
    }
  });
}

function gameOver(){
  $('#quiz').addClass('oculto');
  $('#mensagem').html('Game Over!');
  $('#status').removeClass('oculto');
}

$('#novoJogo').click(function(){
  newGame();
});

