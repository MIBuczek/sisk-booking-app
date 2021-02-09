import * as React from 'react';
import * as ReactDOM from 'react-dom';

const App: React.SFC = () => {
  return (
    <h1>
      <h1>My React and TypeScript App!</h1>
    </h1>
  );
};

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
