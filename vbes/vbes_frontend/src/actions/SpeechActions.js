const SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition;
const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();

recognition.continous = true;
//recognition.interimResults = true;
recognition.lang = 'en-US';

export const speak = str => {
  let utterThis = new SpeechSynthesisUtterance(str);
  synth.speak(utterThis);
};

export const listen = () => {
  return new Promise((resolve, reject) => {
    recognition.start();
    recognition.onend = () => {
      console.log('...continue listening...');
      recognition.start();
    };

    recognition.onstart = () => {
      console.log('Listening!');
    };

    let finalTranscript = '';
    recognition.onresult = event => {
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript = transcript;
        else interimTranscript = transcript;
      }
      // console.log(finalTranscript);
      resolve(finalTranscript);
    };

    recognition.onerror = event => {
      console.log('Error occurred in recognition: ' + event.error);
    };
  });
};

export const stopListening = () => {
  return new Promise((resolve, reject) => {
    recognition.stop();
    recognition.onend = () => {
      console.log('Stopped listening per click');
      resolve();
    };
  });
};
