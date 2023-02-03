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
  const [rab1Hidden, setRab1Hidden] = useState(null);
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
  const [buildAreaFigures, setBuildAreaFigures] = useState([
    // {
    //   className: 'build__line--blue gradus-left-45',
    // },
  ]);

  const changeFile = (e) => {
    if (!e.target.files) {
      return;
    }

    setFileName(e.target.files[0]?.name ? e.target.files[0].name : 'Upload your photo');
    setKronshteinImg(fileName);
    console.log(fileName);
  };

  const solveExample1 = () => {
    const example1LeftSideArr = [];
    const example1RightSideArr = [];
    let solutionToExample1 = [];
    let isPushToLeftSide = true;

    // const newExample1 = [];

    example1.split(' ').forEach((el, i) => {
      if (
        el === 'Rab' ||
        el === 'Rac' ||
        el === '=' ||
        (el === '-' && example1.split(' ')[i + 1] === 'Rac') ||
        (el === '-' && example1.split(' ')[i + 1] === 'Rab') ||
        (el === '*' && example1.split(' ')[i - 1] === 'Rac') ||
        (el === '0' && example1.split(' ')[i - 1] === '=')
      ) {
        isPushToLeftSide = false;

        if (el !== '=' && example1.split(' ')[i - 1] !== '=') {
          solutionToExample1.push(el);
        }

        return;
      }

      if (isPushToLeftSide) {
        if (el === 'F1') {
          example1LeftSideArr.push(f1);
        } else if (el === 'F2') {
          example1LeftSideArr.push(f2);
        } else if (el === 'cos30') {
          example1LeftSideArr.push(0.867);
        } else if (el === 'cos60') {
          example1LeftSideArr.push(0.5);
        } else {
          example1LeftSideArr.push(el);
        }
      } else {
        if (el === 'F1') {
          example1RightSideArr.push(f1);
        } else if (el === 'F2') {
          example1RightSideArr.push(f2);
        } else if (el === 'cos30') {
          example1RightSideArr.push(0.867);
        } else if (el === 'cos60') {
          example1RightSideArr.push(0.5);
        } else {
          example1RightSideArr.push(el);
        }
      }
    });

    // convert from arr to solution to example
    let example1LeftSide = eval(example1LeftSideArr.join(''));
    let example1RightSide = eval(example1RightSideArr.join(''));
    solutionToExample1 = [example1LeftSide, ...solutionToExample1, example1RightSide];
    console.log(eval(solutionToExample1));
  };

  const addFigureToAreaFigures = (className) => {
    setBuildAreaFigures((prev) => [...prev, { className }]);
  };

  const deleteFigureToAreaFigures = (className) => {
    setBuildAreaFigures((prev) => prev.filter((el) => el.className !== className));
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
        <div className="build__area">
          {/* <div className="build__line build__line--green build__line--green-gradus gradus-right-0"></div> */}
          {buildAreaFigures.map((el) => {
            return (
              <div
                className={'build__line' + ' ' + el.className}
                onClick={() => deleteFigureToAreaFigures(el.className)}></div>
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

        {/* <div className="build__figures-row">
          <div className="build__figures-column">
            <div className="build__line build__line--blue gradus-right-0"></div>
            <div className="build__line build__line--blue gradus-right--15"></div>
            <div className="build__line build__line--blue gradus-right--30"></div>
            <div className="build__line build__line--blue gradus-right--45"></div>
            <div className="build__line build__line--blue gradus-right--60"></div>
            <div className="build__line build__line--blue gradus-right--75"></div>
            <div className="build__line build__line--blue gradus-right--90"></div>
          </div>
          <div className="build__figures-column">
            <div className="build__line build__line--blue gradus-right-0"></div>
            <div className="build__line build__line--blue gradus-right-15"></div>
            <div className="build__line build__line--blue gradus-right-30"></div>
            <div className="build__line build__line--blue gradus-right-45"></div>
            <div className="build__line build__line--blue gradus-right-60"></div>
            <div className="build__line build__line--blue gradus-right-75"></div>
            <div className="build__line build__line--blue gradus-right-90"></div>
          </div>
          <div className="build__figures-column">
            <div className="build__line build__line--blue gradus-left-0"></div>
            <div className="build__line build__line--blue gradus-left--15"></div>
            <div className="build__line build__line--blue gradus-left--30"></div>
            <div className="build__line build__line--blue gradus-left--45"></div>
            <div className="build__line build__line--blue gradus-left--60"></div>
            <div className="build__line build__line--blue gradus-left--75"></div>
            <div className="build__line build__line--blue gradus-left--90"></div>
          </div>
          <div className="build__figures-column">
            <div className="build__line build__line--blue gradus-left-0"></div>
            <div className="build__line build__line--blue gradus-left-15"></div>
            <div className="build__line build__line--blue gradus-left-30"></div>
            <div className="build__line build__line--blue gradus-left-45"></div>
            <div className="build__line build__line--blue gradus-left-60"></div>
            <div className="build__line build__line--blue gradus-left-75"></div>
            <div className="build__line build__line--blue gradus-left-90"></div>
          </div>
        </div> */}
      </div>
      <div className="examples">
        <p>(1), ΣFx = 0</p>
        <input
          type="text"
          placeholder="Складаємо рівняння рівноваги"
          value={example1}
          onChange={(e) => {
            console.log(e.target.value);
            setExample1(e.target.value);
          }}
        />
        <button onClick={solveExample1}>Вирішити</button>
      </div>
    </div>
  );
}

export default App;
