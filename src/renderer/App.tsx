/* eslint-disable no-console */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
/* import { clipboard } from 'electron'; */
import './App.css';

import React, { useRef, useEffect } from 'react';

function MyComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D>(null);
  const text = useRef('');

  const parseTextToLines = (str: string): string[] => {
    const lineArray: string[] = [];

    const words: string[] = str.split(' ');
    let testLine: string = '';
    let currentLine: string = '';

    words.forEach((word, index) => {
      testLine += `${word} `;
      ctxRef.current.wordSpacing = `0px`;
      const testLineWidth = ctxRef.current.measureText(testLine).width;
      const isLineTooLong = testLineWidth > canvasRef.current.width;

      if (isLineTooLong) {
        console.log('Overflow!!');
        lineArray.push(currentLine.slice(0, -1));
        testLine = `${word} `;
        currentLine = `${word} `;
        /*        console.log([
          testLine,
          ctxRef.current.measureText(testLine),
          ctxRef.current.font,
          canvasRef.current.width,
          currentLineWidth,
        ]); */
      } else {
        currentLine += `${word} `;
      }
    });

    lineArray.push(currentLine.slice(0, -1));

    console.log(lineArray);

    return lineArray;
  };

  function addText() {
    const lines = parseTextToLines(text.current);
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    ctxRef.current.font = '20px sans-serif';
    ctxRef.current.textAlign = 'left';
    ctxRef.current.textBaseline = 'top';

    lines.forEach((line, index) => {
      // Calculating wordSpacing to justify the text
      // Count the number of spaces
      ctxRef.current.wordSpacing = `0px`;
      const count = (line.match(/ /g) || []).length;
      const lineWidth = ctxRef.current.measureText(line).width;

      const whiteSpace = canvasRef.current.width - lineWidth;
      const whiteSpaceBySpace = whiteSpace / count;

      console.log(whiteSpaceBySpace);

      ctxRef.current.wordSpacing = `${whiteSpaceBySpace}px`;

      if (index === lines.length - 1) ctxRef.current.wordSpacing = `0px`;

      ctxRef.current.fillText(line, 0, index * 18);
    });
  }

  const onKeyDown = (e) => {
    switch (e.key) {
      case 'Backspace':
        if (text.current.length > 0)
          text.current = text.current.slice(0, text.current.length - 1);

        break;

      default:
        text.current += e.key;
        break;
    }

    addText();
  };

  useEffect(() => {
    ctxRef.current = canvasRef.current.getContext('2d');
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('paste', (e) => {
      console.log(e.clipboardData.getData('text'));
      text.current += e.clipboardData.getData('text');
      addText();
    });
    canvasRef.current.width = 800;
    canvasRef.current.height = 800;
  }, []);

  return <canvas width="800px" height="10000px" ref={canvasRef} />;
}

function Bye() {
  return <MyComponent />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Bye />} />
      </Routes>
    </Router>
  );
}
