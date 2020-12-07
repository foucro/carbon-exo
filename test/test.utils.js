"use strict";

var cont = document.getElementById("testContainer");
var section;

function it(desc, fn) {
  try {
    fn();
    writeSuccess(desc);
  } catch (error) {
    writeFail(desc, error);
  }
}

function writeSuccess(testText) {
  let line = document.createElement("li");
  line.setAttribute("class", "success");
  line.innerHTML = "&#9745; " + testText;
  cont.lastChild.lastChild.appendChild(line);
}

function writeFail(testText, err) {
  console.error(err);
  let line = document.createElement("li");
  line.setAttribute("class", "fail");
  line.innerHTML = "&#9940; " + testText + " => " + err;
  cont.lastChild.lastChild.appendChild(line);
}
function isEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
function createTestSection(titleText) {
  let div = document.createElement("div");
  let title = document.createElement("h2");
  let list = document.createElement("ul");
  title.textContent = titleText;
  div.appendChild(title);
  div.appendChild(list);
  cont.appendChild(div);
}