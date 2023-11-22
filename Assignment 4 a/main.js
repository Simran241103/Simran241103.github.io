// COMPLETE VARIABLE AND FUNCTION DEFINITIONS

const customName = document.getElementById('customname');
const randomize = document.getElementById('randomizeBtn');
const storyOutput = document.getElementById('storyOutput');

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// RAW TEXT STRINGS

const storyText =
  "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";

const insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
const insertY = ["the soup kitchen", "Disneyland", "the White House"];
const insertZ = [
  "spontaneously combusted",
  "melted into a puddle on the sidewalk",
  "turned into a slug and crawled away"
];

// EVENT LISTENER AND PARTIAL FUNCTION DEFINITION

randomize.addEventListener('click', result);

function result() {
  if (customName.value !== '') {
    const name = customName.value;
    const newStory = storyText
      .replaceAll(":insertx:", randomValueFromArray(insertX))
      .replaceAll(":inserty:", randomValueFromArray(insertY))
      .replaceAll(":insertz:", randomValueFromArray(insertZ));

    if (document.getElementById("uk").checked) {
      const weight = Math.round(300);
      const temperature = Math.round(94);
      const weightInStones = Math.round(weight / 14);
      const temperatureInCelsius = Math.round((temperature - 32) * 5 / 9);
      storyOutput.textContent = newStory
        .replaceAll("Bob", name)
        .replaceAll("300 pounds", `${weightInStones} stones`)
        .replaceAll("94 fahrenheit", `${temperatureInCelsius} centigrade`);
    } else {
      storyOutput.textContent = newStory.replaceAll("Bob", name);
    }

    storyOutput.style.visibility = 'visible';
  }
}
