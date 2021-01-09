const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

//enable & disable button
const toggleButton = () => (button.disabled = !button.disabled);
//Passing Joke to VoiceRSS API
function voiceAJoke(joke) {
  VoiceRSS.speech({
    key: config.key,
    src: joke,
    hl: "en-US",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// test();
const UrlOfApi =
  "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
//get jokes from joke API
async function fetchJokesFromAPI() {
  let joke = "";
  try {
    const response = await fetch(UrlOfApi);
    const data = await response.json();
    joke = data.setup ? `${data.setup}...${data.delivery}` : data.joke;
    //reading a joke
    voiceAJoke(joke);
    //disable button not interrupt the reading
    toggleButton();
  } catch (error) {
    console.log("Fail to get a joke because:", error);
  }
}
//Event Listners
button.addEventListener("click", fetchJokesFromAPI);
audioElement.addEventListener("ended", toggleButton);
