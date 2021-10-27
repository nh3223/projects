var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

const getWrittenNumbers = () => {
    maximumNumber = 144;
    writtenNumbers = [];
    for (let number = 0; number <= maxiumNumber; number++) {
      writtenNumbers.push(getNumberText(number));
    }
    return writtenNumbers;
};

const getNumberText = (number) => {
    single_digits = ['zero','one','two','three','four','five','six','seven','eight','nine']
    teens = ['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen']
    tens = [null, null,'twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'] 
    if (number < 10) return single_digits[number];
    if (number < 20) return teens[number - 10];
    if (number % 10 == 0) {
      const tensText = (number == 100) ? 'one hundred' : tens[number / 10];
      return tensText;
    }
    return `${tens[Math.floor(number / 10)]} ${single_digits[number % 10]}`;
};

const getNumberList = async () => {
    const numberText = await getWrittenNumbers();
    const grammar = `#JSGF V1.0; grammar numbers; public <number> = ${numberText.join(' | ')} ;`
    let numberList = new SpeechGrammarList();
    numberList.addFromString(grammar, 1);
    return numberList
};

const getSpeechRecognition = async () => {
    let recognition = new SpeechRecognition();
    recognition.grammars = await getNumberList();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    return recognition
};

export { getSpeechRecognition };
/*
var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

var colorHTML= '';
colors.forEach(function(v, i, a){
  console.log(v, i);
  colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});
hints.innerHTML = 'Tap/click then say a color to change the background color of the app. Try ' + colorHTML + '.';

document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive a color command.');
}

recognition.onresult = function(event) {
    var color = event.results[0][0].transcript;
    diagnostic.textContent = 'Result received: ' + color + '.';
    bg.style.backgroundColor = color;
    console.log('Confidence: ' + event.results[0][0].confidence);
  }

  recognition.onspeechend = function() {
    recognition.stop();
  }

  recognition.onnomatch = function(event) {
    diagnostic.textContent = 'I didnt recognise that color.';
  }

  recognition.onerror = function(event) {
    diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
  }
*/