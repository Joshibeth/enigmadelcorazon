document.addEventListener("DOMContentLoaded", (e) => {
  cardGenerator();
});

// CONSTANTES DEFINIDAS

  // INICIO
  const StartButton = document.getElementById("startButton");
  const level1 = document.querySelector(".screen__level1");
  const Home = document.querySelector(".start-screen");
  const ImgHome = document.querySelector(".start-screen__img");
  const presentationHome = document.querySelector(".start-screen__presentation-bubble");

  
  const keyItems = document.querySelectorAll(".footer__item-key");
  const arrowItems = document.querySelectorAll(".footer__item-arrow");
  const noButton = document.querySelector(".answer__button-no");
  const container = document.querySelector('.screen__level4-container-game');
  const homeItem = document.querySelector(".footer__item-home");
  const level4 = document.querySelector(".screen__level4");
  const yesButton = document.querySelector(".answer__button-yes");


  
  // LEVEL 1 (JUEGO MEMORY)

  // Array de objetos para generar tarjetas
    
  let cardData = [
      { imgSrc: "./images/kitties.jpg", id: 1, name: "kitties" },
      { imgSrc: "./images/shibas.jpg", id: 2, name: "shibas" },
      { imgSrc: "./images/puppies.jpg", id: 3, name: "puppies" },
      { imgSrc: "./images/otters.jpg", id: 4, name: "otters" },
      { imgSrc: "./images/hamsters.jpg", id: 5, name: "hamsters" },
      { imgSrc: "./images/capibaras.jpg", id: 6, name: "capibaras" },
      { imgSrc: "./images/bears.jpg", id: 7, name: "bears" },
      { imgSrc: "./images/beavers.jpg", id: 8, name: "beavers" },
      { imgSrc: "./images/kitties.jpg", id: 9, name: "kitties" },
      { imgSrc: "./images/shibas.jpg", id: 10, name: "shibas" },
      { imgSrc: "./images/puppies.jpg", id: 11, name: "puppies" },
      { imgSrc: "./images/otters.jpg", id: 12, name: "otters" },
      { imgSrc: "./images/hamsters.jpg", id: 13, name: "hamsters" },
      { imgSrc: "./images/capibaras.jpg", id: 14, name: "capibaras" },
      { imgSrc: "./images/bears.jpg", id: 15, name: "bears" },
      { imgSrc: "./images/beavers.jpg", id: 16, name: "beavers" },
    ];

    // variables de estado del juego
    let flippedCards = [];
    let lockBoard = false;



    // LEVEL 2 - JUEGO GUESS THE LOVE SONG

    // Array con info de las canciones

    var letrasDeCanciones = [
      { titulo: "Just the way you are - Bruno Mars", palabraClave: "smile", pista: "Expresión facial (inglés)" },
      { titulo: "Can't take my eyes off you - Frankie Valli", palabraClave: "night", pista: "Parte del día después de la puesta del sol (inglés)" },
      { titulo: "Amor Completo - Mon Laferte", palabraClave: "completo", pista: "Adjetivo que indica que tiene todas las partes" },
      { titulo: "Bésame Mucho", palabraClave: "vez", pista: "Momento determinado en el tiempo" },
    ];

      // variables estado del juego
      var indiceCancionActual = 0;
      var intentosMaximos = 5;
      var intentosRestantes = intentosMaximos;
      var palabraClave;

    // LEVEL 2 - ART OF LOVE

    // Array con info cuadros

    // JUEGO PAINTINGS
    const paintings = [
      { imageUrl: 'images/los-amantes-magritte.jpg', correctOption: 'Los Amantes (René Magritte)', options: ['Pareja en el Père Lathuille (Édouard Manet)', 'El Primer Beso (W.A Bouguereau)', 'Los Amantes (René Magritte)'] },
      { imageUrl: 'images/romeo-julieta-dicksee.jpg', correctOption: 'Romeo y Julieta (Frank Dicksee)', options: ['El beso (Francesco Hayez)', 'Romeo y Julieta (Frank Dicksee)', 'El pescador y la sirena (Frederick Leighton)'] },
      { imageUrl: 'images/la-carta-boucher.jpg', correctOption: 'La Carta (Francois Boucher)', options: ['La Carta (Francois Boucher)', 'La confesión del Amor (Jean-Honore Fragonard)', 'El Jardín del Amor (Rubens)'] },
      { imageUrl: 'images/el-beso-hayez.jpg', correctOption: 'El Beso (Francesco Hayez)', options: ['El Beso (Gustav Klimt)', 'El Beso (Francesco Hayez)', 'Encuentro en la torre (F.William Burton)'] },
    ];

      // Variables de estado del juego
      let currentPainting = 0;
      let correctGuesses = 0;
      let attempts = 2; 



    // FUNCIONES

    // LEVEL 1 (JUEGO MEMORY)

    // funcion para generar las tarjetas del memory
    const cardGenerator = () => {

      // ordenamos aleatoriamente el array
      cardData.sort(() => Math.random() - 0.5); 
      
      // generamos las cartas correspondientes
      cardData.forEach((item) => {
        const gameContainer = document.querySelector(".game");
        const card = document.createElement("div");
        card.classList = "card";
    
        card.setAttribute("id", item.id);
        card.setAttribute("name", item.name);
        
        // creamos elemento img que representa la cara visible
        const face = document.createElement("img");
        face.classList = "face";
        face.src = item.imgSrc;
        
        // Crea un nuevo elemento div que representará la parte posterior
        const back = document.createElement("div");
        back.classList = "back";
    
        gameContainer.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);
    
        // evento de click llamando a la función
        card.addEventListener("click", handleCardClick);
      });
    };
    
    
    // Función para manejar el click en las tarjetas
    const handleCardClick = (e) => {

      if (lockBoard) return;
    
      const clickedCard = e.currentTarget;
    
      if (clickedCard === flippedCards[0]) return; // Evitar clic en la misma carta
    
      // Esto cambia la apariencia de la carta, indicando que está volteada.
      clickedCard.querySelector(".face").classList.toggle("toggleCard");
      clickedCard.classList.toggle("toggleCard"); 
    
      flippedCards.push(clickedCard);
    
      // Verifica si hay dos cartas volteadas. Si es así, bloquea el tablero.
      if (flippedCards.length === 2) {
        lockBoard = true;
        setTimeout(checkCards, 500);
      }
    };
    
    // Función para verificar si las tarjetas coinciden
    const checkCards = () => {
      const [firstCard, secondCard] = flippedCards;
    
      // Compara el atributo "name" de las dos cartas
      if (
        firstCard.getAttribute("name") === secondCard.getAttribute("name")
      ) {
        disableCards();
      } else {
        unflipCards();
      }
    
      flippedCards = [];
      lockBoard = false;
    };
    
    // Función para deshabilitar tarjetas coincidentes
    const disableCards = () => {
      flippedCards.forEach((card) => {
        card.removeEventListener("click", handleCardClick);
      });
    };
    
    
    // Función para volver a voltear las tarjetas no coincidentes despues de un tiempo
    const unflipCards = () => {
      flippedCards.forEach((card) => {
        setTimeout(() => {
          card.querySelector(".face").classList.remove("toggleCard");
          card.classList.remove("toggleCard");
        }, 500);
      });
    };
    

// LEVEL 2 (JUEGO GUESS THE LOVE SONG)

// función para cargar la info de la canción actual 

function cargarCancion() {
  var cancionActual = letrasDeCanciones[indiceCancionActual];
  palabraClave = cancionActual.palabraClave;

  document.querySelector(".screen__level2-title--song").innerText = cancionActual.titulo;
  document.querySelector(".screen__level2-hint").innerText = "Pista: " + cancionActual.pista;
  document.querySelector(".screen__level2-audio").src = "audio/Cancion" + (indiceCancionActual + 1) + ".mp3";
}

cargarCancion();

// función que reproduce la cancion actual
function playAudio() {
  var audio = document.querySelector(".screen__level2-audio");
  audio.play();
}

// funcion para mostrar mensaje sobre el estatus del juego
function mostrarMensaje(mensaje) {
  var gameStatusElement = document.querySelector(".screen__level2-status");
  gameStatusElement.innerText = mensaje;
}

// función para reiniciar el juego al estado inicial
function reiniciarJuego() {
  indiceCancionActual = 0;
  intentosRestantes = intentosMaximos;
  cargarCancion();
  // Limpiar el mensaje al reiniciar
  mostrarMensaje("");
}

// función para procesar palabra adivinada 
function procesarPalabra() {
  var palabraAdivinada = document.getElementById("letterInput").value.toLowerCase();  

  if (palabraAdivinada === palabraClave) {
    // si se adivina se actualiza el índice de la canción actual y carga la siguiente
    indiceCancionActual++;
    intentosRestantes = intentosMaximos;

    if (indiceCancionActual >= letrasDeCanciones.length) {
      // si adivinas todas las canciones
      mostrarMensaje("¡Has ganado todas las canciones!");
      reiniciarJuego(); // Reiniciar el juego
    } else {
      mostrarMensaje("¡Correcto!");
      setTimeout(function () {
        mostrarMensaje("");
      }, 2000);

      // Limpiar el input
      document.getElementById("letterInput").value = "";
      cargarCancion();
    }
  
  } else {
    // incorrecto y intentos restantes
    mostrarMensaje("Palabra incorrecta. Intentos restantes: " + intentosRestantes);
    intentosRestantes--;

    if (intentosRestantes === 0) {
      // si se agotan intentos restantes se reinicia juego
      mostrarMensaje("Has agotado tus intentos. ¡Intentalo de nuevo!");
      indiceCancionActual = 0;
      cargarCancion();
      intentosRestantes = intentosMaximos;
    }
  }
}
 


// LEVEL 4

// funcion para mover el boton a una posición aleatoria dentro del contenedor
function moveButton() {

    // obtener dimensiones del boton y contenedor
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // calcular rango máximo dentro del contenedor
    const maxWidth = containerWidth - buttonWidth;
    const maxHeight = containerHeight - buttonHeight;

    // generamos coordenadas aleatorias dentro del rango
    const newWidth = Math.random() * maxWidth;
    const newHeight = Math.random() * maxHeight;

    // posición fija del botón en las nuevas coordenadas
    noButton.style.position = "fixed";
    noButton.style.left = `${newWidth}px`;
    noButton.style.top = `${newHeight}px`; 
}


// LEVEL 3 (JUEGO ART OF LOVE)

// Muestra la pintura actual y las opciones de respuesta
function renderPainting() {
  const paintingContainers = document.querySelectorAll('.game__quiz-containerGame');
  const resultElement = document.querySelector('.game__quiz-result');
  //Obtiene información sobre la pintura actual
  const currentPaintingData = paintings[currentPainting];

  paintingContainers.forEach((container, index) => {
    const picture = container.querySelector('.game__quiz-picture');
    const img = picture.querySelector('.game__quiz-img');
    const optionsContainer = container.querySelector('.game__quiz-options');

    // Comprueba si es la pintura actual y actualiza la interfaz
    if (index === currentPainting) {
      img.src = currentPaintingData.imageUrl;
      optionsContainer.innerHTML = '';

      //Crea botones para cada opción y asigna eventos
      currentPaintingData.options.forEach((option) => {
        const optionElement = document.createElement('button');
        optionElement.classList.add('game__quiz-option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(optionElement);
      });

      container.style.display = 'flex';  // Mostrar el contenedor actual
    } else {
      container.style.display = 'none';  // Ocultar los contenedores que no son los actuales
    }
  });

  resultElement.textContent = '';
}

// Función para comprobar respuesta
function checkAnswer(selectedOption) {
  const currentPaintingData = paintings[currentPainting];
  const correctOption = currentPaintingData.correctOption;
  const resultElement = document.querySelector('.game__quiz-result');
  // Compara la opción seleccionada con la correcta
  if (selectedOption === correctOption) {
    resultElement.textContent = '¡Correcto!';
    correctGuesses++;

    //Avanza a la siguiente pintura si hay más, reinicia intentos
    currentPainting++;
    if (currentPainting < paintings.length) {
      attempts = 2; // Reinicia los intentos por cada cuadro
      setTimeout(() => {
        renderPainting();
        resultElement.textContent = '';
      }, 1000);
    } else {
      // Muestra mensaje de victoria o derrota al final del juego
      setTimeout(() => {
        if (correctGuesses === paintings.length) {
          resultElement.textContent = '¡Felicidades! Has ganado el juego.';
        } else {
          resultElement.textContent = 'Lo siento, has perdido. Vuelve a intentarlo.';
        }
      }, 1000);
    }
  } else {
    attempts--;
    // Muestra intentos restantes o reinicia el juego después de agotar intentos
    if (attempts > 0) {
      resultElement.textContent = `Incorrecto. Intentos restantes:${attempts}`;
    } else {

      setTimeout(() => {
        resultElement.textContent = 'Lo siento, has perdido el juego. Vuelve a intentarlo.';
        setTimeout(() => {
          resetGame(); // Reinicia el juego después de un breve retraso para mostrar el mensaje
        }, 3000); // 3000 milisegundos = 3 segundos
      }, 1000);
    }
  }
}
// función para reiniciar juego
function resetGame() {
  currentPainting = 0;
  correctGuesses = 0;
  attempts = 2; // Reinicia los intentos por cada cuadro
  renderPainting();
}

  // EVENTOS Y ASIGNACIONES 

  // ocultar inicio y mostrar siguiente nivel y cambiar background
  StartButton.addEventListener("click", function () {
    Home.style.display = "none";
    level1.style.display = "block";
    document.body.style.background =
      'url("css/background_stars.jpg") center/cover no-repeat';
  });

  

// evento para mostar presentación inicio
ImgHome.addEventListener("click", function () {
  // Toggle de la visibilidad del segundo elemento SVG
  const presentationHomeVisible =  !presentationHome.style.display || presentationHome.style.display === "none";

  if (presentationHomeVisible) {
    presentationHome.style.display = "block";
  
  } else {
    presentationHome.style.display = "none";
  }
});


// evento para desplegar instrucciones al hacer click en la llave
keyItems.forEach((keyItem, index) => {
  keyItem.addEventListener("click", () => toggleInstructionBubble(index + 1));
});

function toggleInstructionBubble(nivel) {

  const instructionBubbles = document.querySelectorAll(".instruction__bubble");

  instructionBubbles.forEach((bubble, index) => {
      // Determinar si la burbuja actual corresponde al nivel clicado
      const isVisible = index + 1 === nivel && bubble.style.display !== "none";

      bubble.style.display = isVisible ? "none" : "block";
  });

}

// evento para permitir que la flecha ejecute el siguiente nivel
arrowItems.forEach((arrowItem) => {
  arrowItem.addEventListener("click", mostrarSiguienteNivel);
});

function mostrarSiguienteNivel(event) {
  const botonClicado = event.currentTarget;

  const nivelActual = botonClicado.closest('.screen');

  nivelActual.style.display = 'none';

  const siguienteNivel = nivelActual.nextElementSibling;

  if (siguienteNivel && siguienteNivel.classList.contains('screen')) {
      siguienteNivel.style.display = 'block';
  }
}


// LEVEL 2

// Agrega un Event Listener al botón de reproducción
document.querySelector(".screen__level2-Button--play").addEventListener("click", playAudio); 


// Agrega un Event Listener al botón de adivinar
document.querySelector(".screen__level2-button--guess").addEventListener("click", procesarPalabra);

// evento dom level 3
document.addEventListener('DOMContentLoaded', resetGame);


// LEVEL 4

// evento para cuando el mouse se acerque al boton se mueva
noButton.addEventListener('mouseenter', moveButton);


// evento para volver al inicio y reiniciar la página web
homeItem.addEventListener("click", function () {

  level4.style.display = "none";
  Home.style.display = "block";
  document.body.style.background =
    'url("css/background.jpg") center/cover no-repeat';
    location.reload(true); 
});

// FINAL

  // evento click en botón si final
  yesButton.addEventListener('click', function() {
    document.querySelector('.screen__level4').style.display = 'none';
    document.querySelector('.screen__final').style.display = 'block';
    document.body.style.background =
    'url("css/background-end.jpg") center/cover no-repeat';
  });



