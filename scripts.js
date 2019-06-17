//This holds the default names and scores when the DOM is refreshed
var scores = {
    Alyssa: 0,
    Demetre: 0,
    DJ: 0,
    Seven: 0,
    Trinity: 0
};

// Assigns keys of default object to an array
var peopleNames = Object.keys(scores);

// Writes Welcome message
$(`#scores`).html(`<p class="display-1">Scores Will Show Up Here!</p>
<h2>Click name to edit it</h2>
<h2>Scores can not go less than zero</h2>
<h2>Names cannot have more than 8 characters.</h2>
<h2>Enjoy!</h2>`);

// Creates BUtton to show rules
$(`#rules`).html(`<button type="button" class="btn btn-primary">Primary</button>`);

//Writes Buttons and Button's names to DOM
function getPointText(){
    var i = 1;
    Object.keys(scores).forEach(function(key){
        $(`#points`).append(`

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
        `);
        i++;
    });
}
getPointText();

// Writes Score's Names and scores to DOM
function showScores(){
    $( "div#scores" ).html(`
        <p class="display-3">${peopleNames[0]}: ${scores[Object.keys(scores)[0]]}</p>
        <p class="display-3">${peopleNames[1]}: ${scores[Object.keys(scores)[1]]}</p>
        <p class="display-3">${peopleNames[2]}: ${scores[Object.keys(scores)[2]]}</p>
        <p class="display-3">${peopleNames[3]}: ${scores[Object.keys(scores)[3]]}</p>
        <p class="display-3">${peopleNames[4]}: ${scores[Object.keys(scores)[4]]}</p>
        `);
}

// Show's Button's Name and hide's Name Input; Update's Names using User's Input; Validates Input; Updates Score Names;
function getNameInput(person, content, input){
    var name = $(person).val();
    var i = person.slice(-1);
    if(name.length > 8){
        $(`#inputValid${i}`).html(`<p>Maximum of 8 Characters</p>`);
    } else if(name !== ""){
        $(content).html(`${name}`);
        peopleNames[i - 1] = `${name}`;
        $(input).hide();
        $(content).show();
        showScores();
        $(`#inputValid${i}`).html(``);
   } else {
        $(input).hide();
        $(content).show();
        showScores();
        $(`#inputValid${i}`).html(``);
   }; 
   
//    showScores();
}

//  Hides Button's Name and shows Name Input
function showInput(content, input){
    $(content).hide();
    $(input).show();
}


/******************************** BUTTONS ********************************/


// Edit Name Button
$("#personButton1").click(function() {
    getNameInput("#personInput1", "#person1", "#input1");
});

$("#personButton2").click(function() {
    getNameInput("#personInput2", "#person2", "#input2");
});

$("#personButton3").click(function() {
    getNameInput("#personInput3", "#person3", "#input3");
});

$("#personButton4").click(function() {
    getNameInput("#personInput4", "#person4", "#input4");
});

$("#personButton5").click(function() {
    getNameInput("#personInput5", "#person5", "#input5");
});

// Shows Input to Edit Name
$("#person1").click(function(){
    showInput("#person1", "#input1");
    $("#personInput1" ).focus().select();
    // $("#personInput1").;
});

$("#person2").click(function(){
    showInput("#person2", "#input2");
    $("#personInput2" ).focus().select();;
});

$("#person3").click(function(){
    showInput("#person3", "#input3");
    $("#personInput3" ).focus().select();;
});

$("#person4").click(function(){
    showInput("#person4", "#input4");
    $("#personInput4" ).focus().select();;
});

$("#person5").click(function(){
    showInput("#person5", "#input5");
    $("#personInput5" ).focus().select();;
});

// Add one Point Button
// Use function and forEach to consolidate it.
$("#plus1").click(function() {
    scores[Object.keys(scores)[0]] += 1;
    showScores();
    if((scores[Object.keys(scores)[0]]) > 0){
        $(`#minus1`).attr("disabled", false);;
    }
});

$("#plus2").click(function() {
    scores[Object.keys(scores)[1]] += 1;
    showScores();
    if((scores[Object.keys(scores)[1]]) > 0){
        $(`#minus2`).attr("disabled", false);;
    }
});

$("#plus3").click(function() {
    scores[Object.keys(scores)[2]] += 1;
    showScores();
    if((scores[Object.keys(scores)[2]]) > 0){
        $(`#minus3`).attr("disabled", false);;
    }
});

$("#plus4").click(function() {
    scores[Object.keys(scores)[3]] += 1;
    showScores();
    if((scores[Object.keys(scores)[3]]) > 0){
        $(`#minus4`).attr("disabled", false);;
    }
});

$("#plus5").click(function() {
    scores[Object.keys(scores)[4]] += 1;
    showScores();
    if((scores[Object.keys(scores)[4]]) > 0){
        $(`#minus5`).attr("disabled", false);;
    }
});

//Minus one Point Button
$("#minus1").click(function() {
    if((scores[Object.keys(scores)[0]]) == 1){
        scores[Object.keys(scores)[0]] -= 1;
        showScores();
        $(`#minus1`).attr("disabled", true);
    } else{
        scores[Object.keys(scores)[0]] -= 1;
        showScores();
    };
});

$("#minus2").click(function() {
    if((scores[Object.keys(scores)[1]]) == 1){
        scores[Object.keys(scores)[1]] -= 1;
        showScores();
        $(`#minus2`).attr("disabled", true);
    } else{
        scores[Object.keys(scores)[1]] -= 1;
        showScores();
    };
});
$("#minus3").click(function() {
    if((scores[Object.keys(scores)[2]]) == 1){
        scores[Object.keys(scores)[2]] -= 1;
        showScores();
        $(`#minus3`).attr("disabled", true);
    } else{
        scores[Object.keys(scores)[2]] -= 1;
        showScores();
    };
});

$("#minus4").click(function() {
    if((scores[Object.keys(scores)[3]]) == 1){
        scores[Object.keys(scores)[3]] -= 1;
        showScores();
        $(`#minus4`).attr("disabled", true);
    } else{
        scores[Object.keys(scores)[3]] -= 1;
        showScores();
    };
});

$("#minus5").click(function() {
    if((scores[Object.keys(scores)[4]]) == 1){
        scores[Object.keys(scores)[4]] -= 1;
        showScores();
        $(`#minus5`).attr("disabled", true);
    } else{
        scores[Object.keys(scores)[4]] -= 1;
        showScores();
    };
});

// $(`#personInput1`).keypress(function (e) {


$(`#personInput1`).keydown(function(event){ 
    var keyCode = (event.keyCode ? event.keyCode : event.which);   
    if (keyCode == 13) {
        $('#personButton1').trigger('click');
    }
});

$(`#personInput2`).keydown(function(event){ 
    var keyCode = (event.keyCode ? event.keyCode : event.which);   
    if (keyCode == 13) {
        $('#personButton2').trigger('click');
    }
});

$(`#personInput3`).keydown(function(event){ 
    var keyCode = (event.keyCode ? event.keyCode : event.which);   
    if (keyCode == 13) {
        $('#personButton3').trigger('click');
    }
});

$(`#personInput4`).keydown(function(event){ 
    var keyCode = (event.keyCode ? event.keyCode : event.which);   
    if (keyCode == 13) {
        $('#personButton4').trigger('click');
    }
});

$(`#personInput5`).keydown(function(event){ 
    var keyCode = (event.keyCode ? event.keyCode : event.which);   
    if (keyCode == 13) {
        $('#personButton5').trigger('click');
    }
});

/******************************** COMMENTED OUT CODE ********************************/

// changeKey = () => {
//     if (scores.hasOwnProperty('Demetre')) {
//         scores['Teresa'] = scores['Demetre'];
//         delete scores['Demetre'];
//     }
//     showScores();
//     console.log(scores);
//     return scores;
// }


// function showScores(){
//     let keys = Object.keys(scores)
//     let value = Object.values(scores)
//     $( "div#scores" ).html('')
//     keys.forEach(key => {
//         value.forEach(value => {
//             $( "div#scores" ).append(`
//                 <p class="display-3-${key}">${key}: ${value}</p>
//             `)
//         })
//     })
// }
