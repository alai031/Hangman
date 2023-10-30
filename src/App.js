import React, {useState} from 'react'
import stand from './assets/stand.png'
import head from './assets/head.png'
import body from './assets/body.png'
import leftArm from './assets/leftArm.png'
import rightArm from './assets/rightArm.png'
import leftLeg from './assets/leftLeg.png'
import rightLeg from './assets/rightLeg.png'

var fruits = ["apple", "banana", "orange", "lemon", "grapes", "strawberries", "watermelon"];
var kpopGroups = ["le sserafim", "pentagon", "blackpink", "oneus", "dreamcatcher", "bts", "enhypen", "ateez"];
var animals = ["gorilla", "dog", "cat", "rat", "mouse", "zebra", "lion", "wolf", "sea otter", "polar bear"];
var randomCategory = Math.floor(Math.random() * 3);
var randomNum = 0;
var answer = "";
if (randomCategory === 0){
  randomNum = Math.floor(Math.random() * fruits.length);
  answer = fruits[randomNum];
}
else if (randomCategory === 1){
  randomNum = Math.floor(Math.random() * kpopGroups.length);
  answer = kpopGroups[randomNum];
}
else if (randomCategory === 2){
  randomNum = Math.floor(Math.random() * animals.length);
  answer = animals[randomNum];
}

var current = [];

for (let i = 0; i < answer.length; ++i){
  if (answer[i] === ' ')
    current.push(' ');
  else 
    current.push('_');
}
console.log(answer);
console.log(current);

var characters = [];

function App() {
  const [character, setCharacter] = useState('')
  const [equal, setEqual] = useState(0)
  const [mistakes, setMistakes] = useState(0)

  const insertCharacter = (event) => {
    let c = event.target.value;
    if (event.key === 'Enter'){
      characters.push(c)
      setCharacter('')
      for (let i = 0; i < current.length; ++i){
        if (c === answer[i]){
          current[i] = answer[i];
        }
      }
      
      if (answer.search(c) === -1)
        setMistakes(mistakes+1);
      
      if (current.join("") === answer){
        setEqual(1);
      }
      else{
        setEqual(0);
      }
    }
  }

  const playAgain = () => {
    setMistakes(0);
    setEqual(0);
    characters = [];
    current = [];
    randomCategory = Math.floor(Math.random() * 3);
    if (randomCategory === 0){
      randomNum = Math.floor(Math.random() * fruits.length);
      answer = fruits[randomNum];
    }
    else if (randomCategory === 1){
      randomNum = Math.floor(Math.random() * kpopGroups.length);
      answer = kpopGroups[randomNum];
    }
    else if (randomCategory === 2){
      randomNum = Math.floor(Math.random() * animals.length);
      answer = animals[randomNum];
    }
    
    for (let i = 0; i < answer.length; ++i){
      if (answer[i] === ' ')
        current.push(' ');
      else 
        current.push('_');
    }
  }

  return (
    <div className="app">
      
      <div className="container">

        <div className="top">
          <p>HANGMAN</p>
          <div className="category">
            {randomCategory === 0 && 
            <div>
                Category: Fruits
            </div>
            }
            {randomCategory === 1 && 
            <div>
                Category: Kpop Groups
            </div>
            }
            {randomCategory === 2 && 
            <div>
                Category: Animals
            </div>
            }
          </div>
        </div>

        <div className="mid">

          {equal === 0 &&
            <div id="stand-picture">
              <img id="stand" src={stand} alt="stand img"/>

              <div id="hangmanBody">
                <div>
                  {mistakes > 0 ? <img id="head" src={head} alt="head img"/> : <></>}
                </div>
                <div>
                  {mistakes > 1 ? <img id="body" src={body} alt="body img"/> : <></>}
                </div>
                <div>
                  {mistakes > 2 ? <img id="leftArm" src={leftArm} alt="left arm img"/> : <></>}
                </div>
                <div>
                  {mistakes > 3 ? <img id="rightArm" src={rightArm} alt="right arm img"/> : <></>}
                </div>
                <div>
                  {mistakes > 4 ? <img id="leftLeg" src={leftLeg} alt="left leg img"/> : <></>}
                </div>
                <div>
                  {mistakes > 5 ? <img id="rightLeg" src={rightLeg} alt="right leg img"/> : <></>}
                </div>
              </div>

            </div>
          }

          {equal === 1 &&
            <div id="winContainer">
              <p id="winMessage">
                You guessed correctly!<br></br>
                Nice job!
              </p>
            </div>
          }

        </div>

        <div className="bottom">
          <p id="current">
            {current.map( (character) => (
              character === ' ' ? <>{character}{"\xa0\xa0\xa0"}</> : <>{character}{' '}</>
            ))}
          </p>

          <div id="Attempts">
            Characters Attempted:  
            {characters.map((character) => (
              <>{' '}{character}</>
            ))}
          </div>

          {mistakes > 5 && 
            <div>
              <p id="loseMessage">
                You Lose. <br></br>
                The answer was '{answer}'
              </p>
              <button className="b1" onClick={playAgain}>PLAY AGAIN</button>
            </div>
          }

          {equal === 1 && 
            <div>
              <button className="b1" onClick={playAgain}>PLAY AGAIN</button>
            </div>
          }

          { (mistakes < 6) && (equal === 0) && 
            <div className="search">
              <input
              value = {character}
              onChange={event => setCharacter(event.target.value)}
              onKeyDown={insertCharacter}
              placeholder='Enter a character'
              type="text"/>
            </div>
          }
        </div>

      </div>

    </div>
  );
}

export default App;
