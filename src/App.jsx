import './App.css';
import { Bloco } from './Components/Bloco/Index';

function App() {
  const handleClickBloco = (x) => {
    console.log(x);
  };

  return (
    <>
      <div className="container">
        <Bloco onKeyPress={handleClickBloco} />
      </div>
    </>
  );
}

export default App;
