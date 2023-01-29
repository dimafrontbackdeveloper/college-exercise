import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import kronshtein1 from './assets/kronshtein1.jpg';

function App() {
  const [f1, setF1] = useState('');
  const [f2, setF2] = useState('');
  const [fileName, setFileName] = useState('Upload your photo');
  const [kronshteinImg, setKronshteinImg] = useState('');

  const changeFile = (e) => {
    if (!e.target.files) {
      return;
    }

    setFileName(e.target.files[0]?.name ? e.target.files[0].name : 'Upload your photo');
    setKronshteinImg(fileName);
    console.log(fileName);
  };

  useEffect(() => {
    console.log(f1);
    console.log(f2);
  }, [f1, f2]);

  return (
    <div className="App">
      <div className="dano">
        <div className="dano__row">
          <div className="dano__column">
            <p>Дано</p>
            <p>
              f1 = <input type="text" value={f1} onChange={(e) => setF1(e.target.value)} />
            </p>
            <p>
              f2 = <input type="text" value={f2} onChange={(e) => setF2(e.target.value)} />
            </p>
          </div>
          <div className="dano__column">
            <img src={kronshteinImg ? kronshtein1 : ''} alt="" />
            <input type="file" id="input__file" onInput={changeFile} />
            <span>{fileName}</span>
          </div>
        </div>
      </div>
      <div className="build">
        <div className="build__area">
          <div className="build__line build__line--blue"></div>
          {/* <div className="build__line build__line--green"></div> */}
          {/* <div className="build__line build__line--red"></div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
