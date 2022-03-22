// Variable declarations
const TEXT_AREA = document.getElementById("inputBox");
const KEYBOARD = document.getElementById("keyboard");
const FLEX_CONTAINER = document.getElementById("flexContainer");
const H1_ELEMENT = document.querySelector("h1");

// Hide keyboard
FLEX_CONTAINER.removeChild(KEYBOARD);
// Clicking the text area will bring up the keyboard

TEXT_AREA.addEventListener("click", showKeyboard);
// Clicking the 'return' key will hide the keyboard

// Shows keyboard on click from the text area.
function showKeyboard() {
  FLEX_CONTAINER.appendChild(KEYBOARD);
  KEYBOARD.classList.add("base");
  FLEX_CONTAINER.removeChild(H1_ELEMENT);

  // Will only call this function when keyboard is shown.
  // This prevents the function running multiple times at once if text area is clicked more than once
  // otherwise text area will print out the letter x amount of times depending on how many keyboardActive() functions are running.
  keyboardActive();
}

// All keyboard functions run inside of here
function keyboardActive() {
  const RETURN_KEY = document.getElementById("returnKey");
  const CAPS_KEY = document.getElementById("capsKey");
  const HIDE_KEY = document.getElementById("hideKeyboard");
  const KEY_ARR = KEYBOARD.querySelectorAll(".key");
  const SPACE_KEY = document.getElementById("spaceKey");
  const EMOJI_KEY = document.getElementById("emojiKey");
  const BACKSPACE_KEY = document.getElementById("backSpace");
  const CLOSE_BTN = document.getElementById("closeBtn");
  const EMOJI_BOARD = document.getElementById("emojiBoard");
  const EMOJIS = document.querySelectorAll(".emoji");
  const MICROPHONE = document.getElementById("microphone");
  const SPEECH_RECOGNITION =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const RECOGNITION = new SPEECH_RECOGNITION();

  // Bring up the emoji board and print out emoji clicked to the text area
  EMOJI_KEY.addEventListener("click", emojiActive);

  function emojiActive() {
    EMOJI_BOARD.style.display = "grid";

    CLOSE_BTN.addEventListener("click", () => {
      EMOJI_BOARD.style.display = "none";
      return;
    });
  }

  RETURN_KEY.addEventListener("click", () => {
    TEXT_AREA.textContent += "\n";
  });

  CAPS_KEY.addEventListener("click", () => {
    CAPS_KEY.classList.toggle("caps-clicked");
  });

  HIDE_KEY.addEventListener("click", () => {
    FLEX_CONTAINER.removeChild(KEYBOARD);
    KEYBOARD.classList.remove("base");
    FLEX_CONTAINER.appendChild(H1_ELEMENT);
    keyboardActive = false;
  });

  BACKSPACE_KEY.addEventListener("click", () => {
    TEXT_AREA.textContent = TEXT_AREA.textContent.substring(
      0,
      TEXT_AREA.textContent.length - 1
    );
  });

  SPACE_KEY.addEventListener("click", () => {
    TEXT_AREA.textContent += ` `;
  });

  for (let i = 0; i < KEY_ARR.length; i++) {
    const key = KEY_ARR[i];

    key.addEventListener("click", () => {
      if (CAPS_KEY.classList.contains("caps-clicked")) {
        TEXT_AREA.textContent += key.textContent.toUpperCase();
        return;
      }
      TEXT_AREA.textContent += key.textContent.toLowerCase();
    });
  }

  for (let x = 0; x < EMOJIS.length; x++) {
    const emoji = EMOJIS[x];

    emoji.addEventListener("click", () => {
      TEXT_AREA.textContent += emoji.textContent;
    });
  }

  MICROPHONE.addEventListener("mousedown", function () {
    RECOGNITION.start();
    TEXT_AREA.textContent = "...speaking";
  });
  RECOGNITION.onresult = function (e) {
    TEXT_AREA.textContent = "";
    const transcript = e.results[0][0].transcript;
    TEXT_AREA.textContent += transcript;
  };
}
