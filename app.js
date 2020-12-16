let words = ["programming", "application", "monitor", "printer", "developer", "python", "javascript"];
let chosenWord = words[Math.floor(Math.random() * words.length)];
let answer = document.getElementById("answer");
let message = document.getElementById("message");
let wrong = 4;
const playAgainBtn = document.getElementById('playAgain');
const wrongBlock = document.querySelector('.wrong-letters');
const notification = document.querySelector('#notification');
let KeysPressed = '';
let enteredWord = '';


playAgainBtn.addEventListener('click', function(){
  document.getElementById('block').classList.add("none");
  resetGame();
});


//display letters
function outputRandomWord(){
    for(let i=0; i<chosenWord.length; i++){
      let span = document.createElement("span");
      // let letters = document.createTextNode(chosenWord[i]);
      span.className = `${chosenWord[i]}`;
      answer.appendChild(span);
  }
}
outputRandomWord();


//Keypress
document.addEventListener("keydown", keyPressed);

function keyPressed(e){
  if(e.which >= 65 && e.which < 90)
  {
    let flag = false;
    let flagMain = false; 
    let key = e.key.toLowerCase();
    // console.log(key);
    flagMain=false;
    for(let i=0; i<KeysPressed.length; i++){
      if(KeysPressed[i]===key){
        flagMain = true;
      }
    }
    
    if(flagMain){
      // console.log('Already Pressed');
      notification.classList.add('show');
      setTimeout(function(){
        notification.classList.remove('show');
      }, 2000);
    }
    else {
        // flagMain=false;
        KeysPressed += key;
        // console.log(KeysPressed);
      for(let i=0; i < chosenWord.length; i++)
      {
        if(key==chosenWord[i])
        {
          let text = document.querySelectorAll(`.${key}`);
          flag=true;
          for(let j=0; j<text.length; j++){
            text[j].innerHTML = key;
          }
          enteredWord += key;
          if(enteredWord.length === chosenWord.length){
            won();
          }
         
          console.log(enteredWord);
        }
      }
      if(flag==false)
      {
        wrongLetterFound(key);
        wrong++;
        if(wrong==10){
          document.getElementById(`man-${wrong}`).classList.remove('none');
          gameOver();
        }
        else{
          document.getElementById(`man-${wrong}`).classList.remove('none');
        }
      }
    }
    

  }
}

//Game Over
function gameOver(){
  document.getElementById('block').classList.remove("none");
  message.innerHTML = "GAME OVER 😫";
  setTimeout(function(){
    document.getElementById('block').classList.add("none");
    message.innerHTML = "";
  }, 5000);

  resetGame();
}


//Reset Game
function resetGame(){
  wrong=4;
  for(let i=5; i<=10; i++)
  {
    document.getElementById(`man-${i}`).classList.add('none');
  }
  while (answer.lastElementChild) {
    answer.removeChild(answer.lastElementChild);
  }
  chosenWord = words[Math.floor(Math.random() * words.length)];
  wrongBlock.classList.add('none');
  wrongBlock.lastElementChild.innerHTML='';
  KeysPressed = '';
  enteredWord = '';
  outputRandomWord();
  // window.location.reload();
}

//Wrong Letter found
function wrongLetterFound(key){
  wrongBlock.classList.remove('none');
  let x = document.createTextNode(`${key}, `)
  wrongBlock.lastElementChild.appendChild(x);
}

function won(){
  document.getElementById('block').classList.remove("none");
  message.innerHTML = "You Won 😁😁";
  setTimeout(function(){
    document.getElementById('block').classList.add("none");
    message.innerHTML = "";
  }, 5000);

  resetGame();
}