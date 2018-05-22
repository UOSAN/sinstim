import React from 'react';
import Login from './../components/login/login'

const App = (props) => {
  return (
      <div className="app">
          <Login {...props} />
      </div>
  );
}

export default App;