import React from 'react';
import '../styles/_content.scss';

function Content() {
  return (
    <div className="content">
      <div className="card">
        <button className="option-button">Create session</button>
        <button className="option-button">Join session</button>
      </div>
    </div>
  );
}

export default Content;
