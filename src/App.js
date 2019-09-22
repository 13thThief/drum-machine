import React from "react";

const data = [
  {
    key: "KeyQ",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    key: "KeyW",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    key: "KeyE",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    key: "KeyA",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    key: "KeyS",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    key: "KeyD",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    key: "KeyZ",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    key: "KeyX",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    key: "KeyC",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

class Pad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: "inactive"
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.playBeat = this.playBeat.bind(this);
  }

  handleKeyPress(e) {
    if (e.code === this.props.padId) {
      this.setState({
        padStyle: "active"
      });
      this.playBeat();
      setTimeout(() => {
        this.setState({
          padStyle: "inactive"
        });
      }, 100);
    }
  }

  playBeat() {
    const beat = document.getElementById(this.props.padId.slice(3));
    beat.play();
    this.props.showDisplay(this.props.audioName);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  render() {
    let padId = this.props.padId;
    let audioId = this.props.audioId;
    let audioSrc = this.props.padAudio;
    return (
      <div
        className={`drum-pad ${this.state.padStyle}`}
        id={padId}
        onClick={this.playBeat}
      >
        {padId.slice(3)}
        <audio src={audioSrc} type="audio/mp3" className="clip" id={audioId} />
      </div>
    );
  }
}

// Pad styles from
// https://codepen.io/brandonbrule/pen/LRWxYL

class PadGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let pads = data.map((elem, i) => {
      return (
        <Pad
          padId={elem.key}
          padAudio={elem.url}
          audioId={elem.key.slice(3)}
          audioName={elem.id}
          showDisplay={this.props.showDisplay}
          clearDisplay={this.props.clearDisplay}
        />
      );
    });
    return <div className="padGrid">{pads}</div>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "Make a beat!"
    };
    this.showDisplay = this.showDisplay.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }

  showDisplay(text) {
    this.setState({
      display: text
    });
  }

  clearDisplay() {
    this.setState({
      display: ""
    });
  }

  render() {
    return (
      <div id="drum-machine">
        <div id="display">{this.state.display}</div>
        <PadGrid
          showDisplay={this.showDisplay}
          clearDisplay={this.clearDisplay}
        />
      </div>
    );
  }
}

export default App;
