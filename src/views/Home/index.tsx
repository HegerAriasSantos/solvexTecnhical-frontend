import './styles.scss';
import { useState } from 'react';
function App() {
  const [state, setState] = useState({});

  return (
    <div
      className='container'
      style={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <button
        onChange={() =>
          setState((e) => {
            console.log(e);
            return {
              ...e,
              name: 'test',
            };
          })
        }
      ></button>
    </div>
  );
}

export default App;
