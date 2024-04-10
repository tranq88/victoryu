function loadSavedGrades() {
  const elements = {
    a1: document.getElementById("a1"),
    a1Documentation: document.getElementById("a1Documentation"), 
    a2: document.getElementById("a2"),
    labs: document.getElementById("labs"),
    preps: document.getElementById("preps"),
    midterm1: document.getElementById("midterm1"),
    midterm2: document.getElementById("midterm2"),
    final: document.getElementById("final"),
  };

  const surveyElements = {
    survey1: document.getElementById("survey1"),
    survey2: document.getElementById("survey2"),
    survey3: document.getElementById("survey3"),
  }

  const grades = JSON.parse(window.localStorage.getItem("grades"));
  const surveyGrades = JSON.parse(window.localStorage.getItem("surveyGrades"));

  for (let key in elements) {
    elements[key].value = grades[key];
  }

  for (let key in surveyElements) {
    surveyElements[key].checked = surveyGrades[key];
  }
}


function calculate() {
  const grades = {
    a1: Number(document.getElementById("a1").value),
    a1Documentation: Number(document.getElementById("a1Documentation").value),
    a2: Number(document.getElementById("a2").value),
    labs: Number(document.getElementById("labs").value),
    preps: Number(document.getElementById("preps").value),
    midterm1: Number(document.getElementById("midterm1").value),
    midterm2: Number(document.getElementById("midterm2").value),
    final: Number(document.getElementById("final").value),
  };

  const surveyElements = {
    survey1: document.getElementById("survey1").checked,
    survey2: document.getElementById("survey2").checked,
    survey3: document.getElementById("survey3").checked,
  };

  const weightings = {
    a1: 10,
    a1Documentation: 5,
    a2: 10,
    labs: 8,
    preps: 7,
    midterm1: 10,
    midterm2: 10,
    final: 40,
  };

  window.localStorage.setItem("grades", JSON.stringify(grades));
  window.localStorage.setItem("surveyGrades", JSON.stringify(surveyElements));

  let weightedSum = 0;
  for (let key in grades) {
    weightedSum += grades[key] * weightings[key];
  }

  let result = Math.round((weightedSum * 100.0) / sumObjValues(weightings)) / 100;
  for (let key in surveyElements) {
    if (surveyElements[key]) {
      result += 0.5;
    }
  }
  if (surveyElements.survey1 && surveyElements.survey2 && surveyElements.survey3) {
    result += 0.5;
  }
  let displayResult = document.getElementById("result");

  // choose which image to show
  let displayImg;
  if (result < 80) {
    displayImg = "wtf.webp";
  } else {
    displayImg = "steamhappy.webp";
  }

  displayResult.innerHTML = `your grade is: ${result}% <img id="result-img" style="vertical-align:middle" src="/assets/${displayImg}" />`;
}


function sumObjValues(obj) {
  let sum = 0;
  for (let key in obj) {
    sum += obj[key];
  }
  return sum;
}
