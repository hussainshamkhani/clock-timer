import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faPlay, faPause, faSync } from '@fortawesome/free-solid-svg-icons';
import './App.css'

function App() {
  const [breakLength, setBreakLength] = useState<number>(5);
  const [sessionLength, setSessionLength] = useState<number>(25);
  const [timeLeft, setTimeLeft] = useState<number>(sessionLength * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [switchState, setSwitchState] = useState<boolean>(true);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const breakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const breakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const sessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft((sessionLength - 1) * 60);
    }
  };

  const sessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft((sessionLength + 1) * 60);
    }
  };

  const resetTimer = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };


useEffect(() => {
  let timerInterval:any;
  
  if (isRunning) {
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        // Switch to break or session time when the timer reaches 0
        if (sessionLength > 0) {
          // It's currently a session, switch to break
          setTimeLeft(breakLength * 60);
          console.log(sessionLength);
        } else {
          // It's currently a break, switch to session
          setTimeLeft(sessionLength * 60);
        }
        setSwitchState(!switchState);
      }
    }, 1000);
  } else {
    clearInterval(timerInterval);
  }

  return () => {
    clearInterval(timerInterval);
  };
}, [isRunning, timeLeft, breakLength, sessionLength]);


  return (
    <div id="container">
      <h1>25 + 5 Clock</h1>
      <div id="break-label">
        <h2>Break Length</h2>
        <button id="break-decrement" ><FontAwesomeIcon icon={faArrowDown} onClick={breakDecrement}/></button>
        <span id="break-length">{breakLength}</span>
        <button id="break-increment" ><FontAwesomeIcon icon={faArrowUp} onClick={breakIncrement}/></button>
        </div>
      <div id="session-label">
        <h2>Session Length</h2>
        <button id="session-decrement"><FontAwesomeIcon icon={faArrowDown} onClick={sessionDecrement}/></button>
          <span id="session-length">{sessionLength}</span>
        <button id="session-increment" ><FontAwesomeIcon icon={faArrowUp} onClick={sessionIncrement}/></button>
        </div>
        <div id="timer">
        <div id="time-wrapper">
        <div id="timer-label">
          {switchState ? (
          <h3>Session</h3>
          ) : (
            <h3>Break</h3>
          )}
          
          </div>
        <div id="time-left">{formatTime(timeLeft)}</div>
        </div>
        </div>
        <div id="timer-control">
        <button id="start_stop" onClick={toggleTimer}>
          {isRunning ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
  </button>
          <button id="reset"><FontAwesomeIcon icon={faSync} onClick={resetTimer}/></button>
        </div>
    </div>
  )
}

export default App
