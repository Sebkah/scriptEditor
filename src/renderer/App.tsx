import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import icon from '../../assets/icon.svg';

function MyComponent() {
  const quill = useRef(null);
  const [value, setValue] = useState('');

  function givePDF() {
    console.log(typeof quill.current.unprivilegedEditor.getHTML());
    console.log(quill.current.value);
  }

  return (
    <>
      <button type="submit" onClick={givePDF}>
        To PDF
      </button>
      <ReactQuill ref={quill} theme="snow" value={value} onChange={setValue} />
    </>
  );
}

function Bye() {
  return <MyComponent />;
}

function Hello() {
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <Link to="/bye">BYE</Link>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            No
          </button>
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/bye" element={<Bye />} />
      </Routes>
    </Router>
  );
}
