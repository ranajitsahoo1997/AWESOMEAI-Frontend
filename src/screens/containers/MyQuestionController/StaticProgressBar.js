import React from 'react';

function StaticProgressBar({ value, max,Text }) {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div style={{ width: '100%'}}>
      <div style={{ marginTop: 4, fontSize: 14 }}>
        <span><b>{`${Text}: `}</b>{`${value} / ${max}`}</span>
      </div>
      <div
        style={{
          height: 20,
          backgroundColor: '#eee',
          borderRadius: 10,
          overflow: 'hidden',
          boxShadow: 'inset 5px 5px 10px rgba(0,0,0,0.5)',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${percentage}%`,
            backgroundColor: `${percentage>=50?'#4caf50':percentage>=30?'#ff9800':'#f44336'}`,
            transition: 'width 0.3s ease',
            boxShadow: 'inset 5px 5px 10px rgba(0,0,0,0.5)',
          }}
        />
      </div>
    </div>
  );
}

export default StaticProgressBar;
