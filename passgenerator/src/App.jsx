import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(6); // Corrected 'lenght' to 'length'
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*-+_{}[]~`';

    for (let i = 1; i < length; i++) {
      // Fix random index calculation
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select(); // Select input text
    window.navigator.clipboard.writeText(password); // Copy to clipboard
    
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center bg-black">
        <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-6 py-8 text-center text-white bg-gray-800">
          <h1 className="text-3xl font-bold mb-6">Password Generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3 text-gray-700 font-medium"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className="outline-none bg-blue-500 hover:bg-blue-600 text-white px-3 py-0.5 shrink-0"
            >
              Copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={20}
                value={length}
                className="cursor-pointer"
                onChange={(e) => setLength(Number(e.target.value))}
              />
              <label>Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                checked={numAllowed}
                id="numberinput"
                onChange={() => setNumAllowed((prev) => !prev)}
              />
              <label htmlFor="numberinput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                checked={charAllowed}
                id="characterinput"
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label htmlFor="characterinput">Special Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

