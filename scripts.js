//This holds the default names and scores when the DOM is refreshed
let scores = {
  Alyssa: 0,
  Demetre: 0,
  DJ: 0,
  Seven: 0,
  Trinity: 0,
};

// Assigns keys of default object to an array
const scoreDiv = document.querySelector('#scores');
const pointsDiv = document.querySelector('#points');

// Writes Welcome message
scoreDiv.innerHTML = `<p class="display-1">Scores Will Show Up Here!</p>
<h2>Click name to edit it</h2>
<h2>Scores can not go less than zero</h2>
<h2>Names cannot have more than 8 characters.</h2>
<h2>Enjoy!</h2>`;

// Show's Button's Name and hide's Name Input; Update's Names using User's Input; Validates Input; Updates Score Names;
const getNameInput = (person, content, input) => {
  const name = document.querySelector(person).value;
  const i = person.slice(-1);
  const oldName = Object.keys(scores)[i];
  const oldScore = scores[oldName];
  const validationDiv = document.querySelector(`#inputValid${i}`);
  const inputDiv = document.querySelector(input);
  const contentDiv = document.querySelector(content);
  if (name.length > 8) {
    validationDiv.innerHTML = `<p>Maximum of 8 Characters</p>`;
  } else if (name !== '') {
    contentDiv.innerHTML = name;
    delete scores[oldName];
    scores[name] = oldScore;
    inputDiv.style.display = 'none';
    contentDiv.style.display = 'block';
    showScores();
    validationDiv.innerHTML = ``;
  } else {
    inputDiv.style.display = 'none';
    contentDiv.style.display = 'block';
    showScores();
    validationDiv.innerHTML = ``;
  }
};

//Writes Buttons and Button's names to DOM
const getPointText = () => {
  pointsDiv.innerHTML = '';
  Object.keys(scores).forEach(function (key, i) {
    pointsDiv.innerHTML += `
    <div class="friend">
        <div class="input-group mb-3" id="input${i}" style="display:none">
            <div class="input-group-prepend" >
                <button type="submit" class="btn btn-outline-secondary" value=${i} id="personButton${i}">edit</button>
            </div>
            <input type="text" id="personInput${i}" class="form-control" placeholder="" aria-label="name" aria-describedby="button-addon1">
        
        </div>
        <div class="validate" id="inputValid${i}"></div>
        <h2 id="person${i}">${key}</h2>
        <button type="submit" class="btn btn-outline-success" id="plus${i}">
            <h2>+1</h2>
        </button>
        <button type="submit" class="btn btn-outline-danger" id="minus${i}" disabled>
            <h2>-1</h2>
        </button>
    </div>
`;
  });

  pointsDiv.innerHTML +=
    '<button type="submit" class="btn btn-outline-secondary" id="add-counter">Add Person</button>';
};

// Writes Score's Names and scores to DOM
const showScores = () => {
  scoreDiv.innerHTML = '';
  Object.keys(scores).forEach((key, i) => {
    scoreDiv.innerHTML += `<p class='display-3'>
      ${key}: ${scores[key]}
    </p>`;
  });
};

//  Hides Button's Name and shows Name Input
const showInput = (content, input) => {
  document.querySelector(content).style.display = 'none';
  document.querySelector(input).style.display = 'flex';
};

const addEventListeners = () => {
  Object.keys(scores).forEach(function (key, i) {
    const nameInputFunction = () =>
      getNameInput(`#personInput${i}`, `#person${i}`, `#input${i}`);

    // Edit Name Button
    const editButtonDiv = document.querySelector(`#personButton${i}`);
    editButtonDiv.addEventListener('click', () => {
      nameInputFunction();
    });

    // Shows Input to Edit Name
    const personNameDiv = document.querySelector(`#person${i}`);
    const nameInputDIv = document.querySelector(`#personInput${i}`);
    personNameDiv.addEventListener('click', () => {
      showInput(`#person${i}`, `#input${i}`);
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

    // Add one Point Button
    plusButton.addEventListener('click', () => {
      scores[key] += 1;
      showScores();
      if (scores[key] > 0) {
        minusButton.disabled = false;
      }
    });

    //Minus one Point Button
    minusButton.addEventListener('click', () => {
      scores[key] -= 1;
      showScores();
      if (scores[key] == 0) {
        minusButton.disabled = true;
      }
    });
  });

  const addCounterBtn = document.querySelector(`#add-counter`);
  addCounterBtn.addEventListener('click', () => {
    console.log('clicked it');
  });
};

const runIt = () => {
  getPointText();
  addEventListeners();
};

runIt();

scores.test = 0;

runIt();
