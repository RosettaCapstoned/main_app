import React, { Component } from 'react';

class VoiceRecognition extends Component {
  constructor(props) {
    super(props);

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition ||
      window.oSpeechRecognition;

    if (SpeechRecognition != null) {
      this.recognition = this.createRecognition(SpeechRecognition);
    } else {
      console.warn(
        'The current browser does not support the SpeechRecognition API.'
      );
    }
  }

  createRecognition = SpeechRecognition => {
    const defaults = {
      continuous: true,
      interimResults: true,
      lang: 'en-US',
    };

    let recognition = new SpeechRecognition();

    Object.assign(recognition, defaults, this.props);

    return recognition;
  };

  handleEnd = event => {
    this.start();
  };

  bindResult = event => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    this.props.onResult({ interimTranscript, finalTranscript });
  };

  start = () => {
    this.recognition.start();
    setTimeout(this.stop, 40000);
    this.props.onStart();
  };

  stop = () => {
    this.recognition.stop();
    this.props.onEnd();
  };

  forceStop = () => {
    this.recognition.stop();
    this.props.onEnd();
  };

  abort = () => {
    this.recognition.abort();
  };

  audioStart = () => {
    console.log('audiostart');
  };
  soundStart = () => {
    console.log('soundstart');
  };
  speechStart = () => {
    console.log('speechstart');
  };
  audioEnd = () => {
    console.log('audioend');
  };
  soundEnd = () => {
    console.log('soundend');
  };
  speechEnd = () => {
    console.log('speechend');
  };

  componentWillReceiveProps({ stop }) {
    if (stop) {
      this.forceStop();
    }
  }

  componentDidMount() {
    const events = [
      { name: 'start', action: this.props.onStart },
      { name: 'end', action: this.props.onEnd },
      { name: 'error', action: this.props.onError },
    ];

    events.forEach(event => {
      this.recognition.addEventListener(event.name, event.action);
    });

    this.recognition.addEventListener('result', this.bindResult);

    this.recognition.addEventListener('end', this.handleEnd);

    this.recognition.addEventListener('audiostart', this.audioStart);
    this.recognition.addEventListener('soundstart', this.soundStart);
    this.recognition.addEventListener('speechstart', this.speechStart);
    this.recognition.addEventListener('audioend', this.audioEnd);
    this.recognition.addEventListener('soundsend', this.soundEnd);
    this.recognition.addEventListener('speechend', this.speechEnd);

    this.start();
  }

  componentWillUnmount() {
    this.abort();
  }

  render() {
    return null;
  }
}

export default VoiceRecognition;
