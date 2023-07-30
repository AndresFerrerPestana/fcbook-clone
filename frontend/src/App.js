import { Gaming } from './svg';

function App() {
  const get = async () => {
    const res = await fetch('http://localhost:8000');
    console.log(res);
  };

  get();

  return (
    <div>
      welcome to frontend
      <div>
        <Gaming color="brown" />
      </div>
    </div>
  );
}

export default App;
