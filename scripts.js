//This holds the default names and scores when the DOM is refreshed
const scoreArray = [['Team 1', 0]];

// Assigns keys of default object to an array
const scoreDiv = document.querySelector('#scores');
const pointsDiv = document.querySelector('#points');

// Writes Welcome message
scoreDiv.innerHTML = `<p class="display-1">Scores Will Show Up Here!</p>
  <h2>Click name to edit it</h2>
  <h2>Scores can not go less than zero</h2>
  <h2>Names cannot have more than 8 characters.</h2>
  <h2>Enjoy!</h2>`;

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
            <button type="submit" class="btn btn-outline-danger" id="minus${i}" disabled>
            <h2>-1</h2>
            </button>
          </div>
          <div class="delete-container">
            <span id="delete${i}" class="delete-button">Delete</span>
          </div>
          
      </div>
  `;
  });

  pointsDiv.innerHTML +=
    `<div class="add-counter-container">
        <button type="submit" class="btn btn-outline-secondary" id="add-counter">Add Counter</button>
    </div>`;
};

// Show's Button's Name and hide's Name Input; Update's Names using User's Input; Validates Input; Updates Score Names;
const getNameInput = (counter, content, input) => {
  const name = document.querySelector(counter).value;
  const i = counter.slice(-1);
  const validationDiv = document.querySelector(`#inputValid${i}`);
  const inputDiv = document.querySelector(input);
  const contentDiv = document.querySelector(content);
  validationDiv.innerHTML = ``;
  if (name.length > 8) {
    validationDiv.innerHTML = `<p>Maximum of 8 Characters</p>`;
  } else if (name !== '') {
    contentDiv.innerHTML = name;
    scoreArray[i][0] = name;
    inputDiv.style.display = 'none';
    contentDiv.style.display = 'block';
    showScores();
  } else {
    inputDiv.style.display = 'none';
    contentDiv.style.display = 'block';
    showScores();
  }
};

// Writes Score's Names and scores to DOM
const showScores = () => {
  scoreDiv.innerHTML = '';
  scoreArray.forEach(([name, score], i) => {
    scoreDiv.innerHTML += `<p class='display-3'>
        ${name}: ${score}
      </p>`;
  });
};

//  Hides Button's Name and shows Name Input
const showInput = (content, input) => {
  document.querySelector(content).style.display = 'none';
  document.querySelector(input).style.display = 'flex';
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
      showInput(`#counter${i}`, `#input${i}`);
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
      console.log(scoreArray[i][1]);
      showScores();
      if (scoreArray[i][1] > 0) {
        minusButton.disabled = false;
      }
    });

    //Minus one Point Button
    minusButton.addEventListener('click', () => {
      scoreArray[i][1] -= 1;
      showScores();
      if (scoreArray[i][1] == 0) {
        minusButton.disabled = true;
      }
    });

    deleteButton.addEventListener('click', () => {
      if (window.confirm(`Are you sure you want to delete ${name}`)) {
        scoreArray.splice(i, 1);
        runIt();
        showScores();
      }
    });
  });

  const addCounterBtn = document.querySelector(`#add-counter`);
  addCounterBtn.addEventListener('click', () => {
    scoreArray.push(['new counter', 0]);
    runIt();
    showScores();
  });
};

const runIt = () => {
  getPointText();
  addEventListeners();
};

runIt();
