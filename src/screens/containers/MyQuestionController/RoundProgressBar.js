import React from 'react'
import {
  CircularProgressbar,
  buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function RoundProgressBar({value,max}) {
    const percentage = (value / max) * 100;
  return (
    <div className='' style={{ width: "20%", height: "10%" }}>
      <CircularProgressbar
        value={percentage}
        maxValue={100}
        text={`${value}/${max}`}
        styles={buildStyles({
          textSize: '13px',
          pathColor: `${percentage>=60?'#4caf50':percentage>=30?'#ff9800':'#f44336'}`,
          textColor: '#000',
          trailColor: '#d6d6d6',
          pathTransitionDuration: 4,
        })}
      />
    </div>
  )
}

export default RoundProgressBar