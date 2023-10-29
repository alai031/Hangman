import React, {useState} from 'react'
import stand from './assets/stand.png'
import head from './assets/head.png'
import body from './assets/body.png'
import leftArm from './assets/leftArm.png'
import rightArm from './assets/rightArm.png'
import leftLeg from './assets/leftLeg.png'
import rightLeg from './assets/rightLeg.png'
import axios from 'axios'

var answer = "blackpink";
var current = [];
var mistakes = 0;

for (let i = 0; i < answer.length; ++i){
  current.push('_');
}

var characters = [];

function App() {
  const [character, setCharacter] = useState('')

  const insertCharacter = (event) => {
    let c = event.target.value;
    if (event.key === 'Enter'){
      characters.push(c)
      setCharacter('')
      for (let i = 0; i < current.length; ++i){
        if (c == answer[i]){
          current[i] = answer[i];
        }
      }
      
      if (answer.search(c) === -1)
        ++mistakes;
    }
  }

  return (
    <div className="app">
      <div className="container">
        <div className="top">
          <p>HANGMAN</p>

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

          <div id="current">
            {current.map( (character) => (
              <>{character}{' '}</>
            ))}
          </div>

          <div id="Attempts">
            Attempts:  
            {characters.map((character) => (
              <>{' '}{character}</>
            ))}
          </div>

        </div>

        <div className="search">
          <input
          value = {character}
          onChange={event => setCharacter(event.target.value)}
          onKeyDown={insertCharacter}
          placeholder='Enter a character'
          type="text"/>
        </div>

        {/* <div className="bottom">
          <p>Hello</p>
        </div> */}

      </div>
    </div>
  );
}

export default App;
