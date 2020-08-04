//This holds the default names and scores when the DOM is refreshed
let scoreArray = [
  ['Team 1', 0],
  ['Team 2', 0],
  ['Team 3', 0],
];

const updateLocalStorage = array => {
  window.localStorage.setItem('savedScores', JSON.stringify(array));
};

// Assigns keys of default object to an array
const scoreDiv = document.querySelector('#scores');
const pointsDiv = document.querySelector('#points');

// Writes Welcome message

//Writes Buttons and Button's names to DOM
const getPointText = () => {
  pointsDiv.innerHTML = '';
  scoreArray.forEach(function ([name, score], i) {
    pointsDiv.innerHTML += `
      <div class="person">
      
          <div class="input-group mb-3" id="input${i}" style="display:none">
              <div class="input-group-prepend" >
                  <button type="submit" class="btn btn-outline-secondary" value=${i} id="counterButton${i}">edit</button>
              </div>
              <input type="text" id="counterInput${i}" class="form-control" placeholder="" aria-label="name" aria-describedby="button-addon1">
          
          </div>
          <div class="validate" id="inputValid${i}"></div>
          <div class="title-container">
          
        
        <h2 class="title" id="counter${i}">${name} </h2> 
          </div>
          <div class="buttons-container">
            <button type="submit" class="btn btn-outline-success" id="plus${i}">
            <h2>+1</h2>
            </button>
            <button type="submit" class="btn btn-outline-danger" id="minus${i}" ${
      score === 0 ? 'disabled' : ''
    }>
            <h2>-1</h2>
            </button>
          </div>
          <div class="delete-container">
          <span id="delete${i}" class="delete-button">Delete</span>
        </div> 
      </div>
      <hr/>
  `;
  });

  document.querySelector(
    '#add-counter-here'
  ).innerHTML = `</div><div class="add-counter-container">
  <button type="submit" class="btn btn-outline-secondary" id="add-counter">Add Counter</button>
</div>`;
  pointsDiv;
};

// Show's Button's Name and hide's Name Input; Update's Names using User's Input; Validates Input; Updates Score Names;
const getNameInput = (counter, content, input) => {
  const name = document.querySelector(counter).value;
  const i = counter.slice(-1);
  const validationDiv = document.querySelector(`#inputValid${i}`);
  const inputDiv = document.querySelector(input);
  const contentDiv = document.querySelector(content);
  validationDiv.innerHTML = ``;
  if (name !== '') {
    contentDiv.innerHTML = name;
    scoreArray[i][0] = name;
    inputDiv.style.display = 'none';
    contentDiv.style.display = 'block';
  } else {
    inputDiv.style.display = 'none';
    contentDiv.style.display = 'block';
  }
  updateLocalStorage(scoreArray);
  showScores();
};

// Writes Score's Names and scores to DOM
const showScores = () => {
  scoreDiv.innerHTML = '';
  scoreArray.forEach(([name, score], i) => {
    scoreDiv.innerHTML += `
    <div class="counter-container">
        <div class="counter-name">${name}</div>
        <div class="counter-value">${score}</div> 
    </div>
      `;
  });
};

//  Hides Button's Name and shows Name Input
const showInput = (content, input, i) => {
  document.querySelector(content).style.display = 'none';
  const inputQuery = document.querySelector(input);
  inputQuery.querySelector('input').value = scoreArray[i][0];
  inputQuery.style.display = 'flex';
};

const addEventListeners = () => {
  scoreArray.forEach(function ([name, score], i) {
    const nameInputFunction = () =>
      getNameInput(`#counterInput${i}`, `#counter${i}`, `#input${i}`);

    // Edit Name Button
    const editButtonDiv = document.querySelector(`#counterButton${i}`);
    editButtonDiv.addEventListener('click', () => {
      nameInputFunction();
    });

    // Shows Input to Edit Name
    const counterNameDiv = document.querySelector(`#counter${i}`);
    const nameInputDIv = document.querySelector(`#counterInput${i}`);
    counterNameDiv.addEventListener('click', () => {
      showInput(`#counter${i}`, `#input${i}`, i);
      nameInputDIv.focus();
    });

    // Submit name input on enter  key
    nameInputDIv.addEventListener('keydown', event => {
      var keyCode = event.keyCode ? event.keyCode : event.which;
      if (keyCode == 13) {
        nameInputFunction();
      }
    });

    const plusButton = document.querySelector(`#plus${i}`);
    const minusButton = document.querySelector(`#minus${i}`);
    const deleteButton = document.querySelector(`#delete${i}`);

    // Add one Point Button
    plusButton.addEventListener('click', () => {
      scoreArray[i][1] += 1;
      runIt();
      if (scoreArray[i][1] > 0) {
        minusButton.disabled = false;
      }
      updateLocalStorage(scoreArray);
    });

    //Minus one Point Button
    minusButton.addEventListener('click', () => {
      scoreArray[i][1] -= 1;
      runIt();
      if (scoreArray[i][1] == 0) {
        minusButton.disabled = true;
      }
      updateLocalStorage(scoreArray);
    });

    deleteButton.addEventListener('click', () => {
      if (window.confirm(`Are you sure you want to delete ${name}`)) {
        scoreArray.splice(i, 1);
        runIt();
        updateLocalStorage(scoreArray);
      }
    });
  });

  const addCounterBtn = document.querySelector(`#add-counter`);
  addCounterBtn.addEventListener('click', () => {
    scoreArray.push(['New Team', 0]);
    runIt();
    updateLocalStorage(scoreArray);
  });

  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
      direction: 'left',
    });
  });
};

const restartButton = document.querySelector(`#restart-scores`);
restartButton.addEventListener('click', () => {
  if (window.confirm(`Are you sure you want to reset your scores?`)) {
    scoreArray = [
      ['Team 1', 0],
      ['Team 2', 0],
      ['Team 3', 0],
    ];
    updateLocalStorage([
      ['Team 1', 0],
      ['Team 2', 0],
      ['Team 3', 0],
    ]);
    runIt();
  }
});

const getSavedData = () => {
  const savedScores = JSON.parse(
    window.localStorage.getItem('savedScores', null)
  );
  if (savedScores) {
    scoreArray = savedScores;
    scoreDiv.innerHTML = `
      <div>
      <p class="display-4">Welcome Back!</p>
      <p class="display-1">Counters Will Show Up Here!</p>
      </br>
      <h2>Click on a name to edit it</h2>
      </br>    
      <h2>Score values can not go below 0</h2>
      </br>    
      <h2>Enjoy!</h2>
      </div>
    `;
  } else {
    scoreDiv.innerHTML = `
      <div>
      <p class="display-1">Counters Will Show Up Here!</p>
      </br>
      <h2>Click on a name to edit it</h2>
      </br>    
      <h2>Score values can not go below 0</h2>
      </br>    
      <h2>Enjoy!</h2>
      </div>
    `;
    updateLocalStorage(scoreArray);
  }
};
getSavedData();

const runIt = (showScore = true) => {
  showScore && showScores();
  getPointText();
  addEventListeners();
};

runIt(false);
