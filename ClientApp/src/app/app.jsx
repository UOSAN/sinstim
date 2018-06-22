import React from 'react';
import Intro from './../components/intro/intro'

const App = (props) => {
  return (
      <div className="app">
          <Intro {...props} />
      </div>
  );
}

export default App;