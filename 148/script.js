// why are you here
function calculate() {
  const grades = {
    a1: Number(document.getElementById("a1").value),
    a2: Number(document.getElementById("a2").value),
    labs: Number(document.getElementById("labs").value),
    preps: Number(document.getElementById("preps").value),
    midterm1: Number(document.getElementById("midterm1").value),
    midterm2: Number(document.getElementById("midterm2").value),
    final: Number(document.getElementById("final").value),
  };

  const weightings = {
    a1: 10,
    a2: 10,
    labs: 7,
    preps: 8,
    midterm1: 10,
    midterm2: 10,
    final: 40,
  };

  // apply 5% float
  if (grades.midterm1 > grades.midterm2) {
    weightings.midterm1 = 15;
  } else {
    weightings.midterm2 = 15;
  }

  let weightedSum = 0;
  for (let key in grades) {
    weightedSum += grades[key] * weightings[key];
  }

  let result =
    Math.round((weightedSum * 100.0) / sumObjValues(weightings)) / 100;
  let displayResult = document.getElementById("result");
  let displayImg;

  // choose which image to show
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
