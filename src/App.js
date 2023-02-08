import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import kronshtein1 from './assets/kronshtein1.jpg';

function App() {
  const [f1, setF1] = useState('');
  const [f2, setF2] = useState('');
  const [fileName, setFileName] = useState('Upload your photo');
  const [kronshteinImg, setKronshteinImg] = useState('');
  const [example1, setExample1] = useState('');
  const [example2, setExample2] = useState('');
  const [example3, setExample3] = useState('');
  const [isRightExample1, setIsRightExample1] = useState(false);
  const [isRightExample2, setIsRightExample2] = useState(false);
  const [isRightExample3, setIsRightExample3] = useState(false);
  const [buildFiguresRows, setBuildFiguresRows] = useState([
    {
      columns: [
        {
          lines: [
            { className: 'build__line--blue gradus-right-0' },
            { className: 'build__line--blue gradus-right--15' },
            { className: 'build__line--blue gradus-right--30' },
            { className: 'build__line--blue gradus-right--45' },
            { className: 'build__line--blue gradus-right--60' },
            { className: 'build__line--blue gradus-right--75' },
            { className: 'build__line--blue gradus-right--90' },
          ],
        },
        {
          lines: [
            { className: 'build__line--blue gradus-right-0' },
            { className: 'build__line--blue gradus-right-15' },
            { className: 'build__line--blue gradus-right-30' },
            { className: 'build__line--blue gradus-right-45' },
            { className: 'build__line--blue gradus-right-60' },
            { className: 'build__line--blue gradus-right-75' },
            { className: 'build__line--blue gradus-right-90' },
          ],
        },
        {
          lines: [
            { className: 'build__line--blue gradus-left-0' },
            { className: 'build__line--blue gradus-left-15' },
            { className: 'build__line--blue gradus-left-30' },
            { className: 'build__line--blue gradus-left-45' },
            { className: 'build__line--blue gradus-left-60' },
            { className: 'build__line--blue gradus-left-75' },
            { className: 'build__line--blue gradus-left-90' },
          ],
        },
        {
          lines: [
            { className: 'build__line--blue gradus-left-0' },
            { className: 'build__line--blue gradus-left--15' },
            { className: 'build__line--blue gradus-left--30' },
            { className: 'build__line--blue gradus-left--45' },
            { className: 'build__line--blue gradus-left--60' },
            { className: 'build__line--blue gradus-left--75' },
            { className: 'build__line--blue gradus-left--90' },
          ],
        },
      ],
    },
  ]);
  const [buildAreaFigures, setBuildAreaFigures] = useState([]);
  const [buildAreaInputs, setBuildAreaInputs] = useState([
    {
      top: 10,
      left: 20,
    },
  ]);

  const buildAreRef = useRef(null);

  const changeFile = (e) => {
    if (!e.target.files) {
      return;
    }

    setFileName(e.target.files[0]?.name ? e.target.files[0].name : 'Upload your photo');
    setKronshteinImg(fileName);
    console.log(fileName);
  };

  const addFigureToAreaFigures = (className) => {
    setBuildAreaFigures((prev) => [...prev, { className }]);
  };

  const deleteFigureToAreaFigures = (className) => {
    setBuildAreaFigures((prev) => prev.filter((el) => el.className !== className));
  };

  const solveExample1 = () => {
    if (fileName === 'kronshtein1.jpg' && example1 === 'F2 - Rab - Rac * cos60 = 0') {
      setIsRightExample1(true);
    }
  };

  const solveExample2 = () => {
    if (fileName === 'kronshtein1.jpg' && example2 === '-Rac * cos30 - F1 = 0') {
      setIsRightExample2(true);
    }
  };

  const solveExample3 = () => {
    if (
      fileName === 'kronshtein1.jpg' &&
      example3 === 'F2 * cos30 - F1 * cos30 - Rac - Rab * cos60 = 0'
    ) {
      setIsRightExample3(true);
    }
  };

  const createAreaInput = (e) => {
    const areaPaddingLeft = 200;
    const cursorPositionX = e.pageX - areaPaddingLeft;
    const cursorPositionY = e.pageY - buildAreRef.current.getBoundingClientRect().top;

    setBuildAreaInputs((prev) => [...prev, { left: cursorPositionX, top: cursorPositionY }]);
  };

  const deleteAreaInput = (top, left) => {
    setBuildAreaInputs((prev) => prev.filter((el) => el.left !== left && el.top !== top));
  };

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
            <p>Rab - ?, Rac - ?</p>
          </div>
          <div className="dano__column">
            <img src={kronshteinImg ? kronshtein1 : ''} alt="" />
            <input type="file" id="input__file" onInput={changeFile} />
            <span>{fileName}</span>
          </div>
        </div>
      </div>
      <div className="build">
        <div className="build__area" onClick={createAreaInput} ref={buildAreRef}>
          {buildAreaInputs.map((input) => {
            return (
              <input
                style={{ top: input.top, left: input.left }}
                autoFocus={true}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteAreaInput(input.top, input.left);
                }}
              />
            );
          })}
          {buildAreaFigures.map((el) => {
            return (
              <div
                className={'build__line' + ' ' + el.className}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFigureToAreaFigures(el.className);
                }}></div>
            );
          })}
        </div>
        {buildFiguresRows.map((row) => {
          return (
            <div className="build__figures-row">
              {row.columns.map((column) => {
                return (
                  <div className="build__figures-column">
                    {column.lines.map((line) => {
                      return (
                        <div
                          className={'build__line' + ' ' + line.className}
                          onClick={() => addFigureToAreaFigures(line.className)}></div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="examples">
        <p>
          (1), Σ <input type="text" />
        </p>
        <input
          type="text"
          placeholder="Складаємо рівняння рівноваги"
          value={example1}
          onChange={(e) => {
            setExample1(e.target.value);
          }}
        />
        <button onClick={solveExample1}>Вирішити</button>
        <div>{isRightExample1 ? 'Все правильно' : 'Не правильно'}</div>
        <p>
          (1), Σ <input type="text" />
        </p>
        <input
          type="text"
          placeholder="Складаємо рівняння рівноваги"
          value={example2}
          onChange={(e) => {
            setExample2(e.target.value);
          }}
        />
        <button onClick={solveExample2}>Вирішити</button>
        <div>{isRightExample2 ? 'Все правильно' : 'Не правильно'}</div>
        <p>
          (1), Σ <input type="text" />
        </p>
        <input
          type="text"
          placeholder="Складаємо перевірочне рівняння рівноваги"
          value={example3}
          onChange={(e) => {
            setExample3(e.target.value);
          }}
        />
        <button onClick={solveExample3}>Вирішити</button>
        <div>{isRightExample3 ? 'Все правильно' : 'Не правильно'}</div>
      </div>
    </div>
  );
}

export default App;
