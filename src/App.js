import React, { useEffect, useState } from 'react';

function App() {
  useEffect(() => {
    document.title = "21BCE6175";
  }, []);

  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log(jsonInput);
      const parsedInput = JSON.parse(jsonInput);
      setError('');

      const res = await fetch('http://localhost:4000/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: parsedInput.data }),
      });

      const result = await res.json();
      console.log(result);
      setResponse(result);

    } catch (err) {
    
      setError(err.message);
    }
  };

  return (
    <div>
      {/* <h1>{"21BCE6175"}</h1> */}
      <input
        type="text"
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='Enter JSON'
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && <Dropdown response={response} />}
    </div>
  );
}

function Dropdown({ response }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (const option of options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    setSelectedOptions(selected);
  };

  return (
    <div>
      <select multiple onChange={handleSelectChange}>
        <option value="Alphabets">Alphabets</option>
        <option value="Numbers">Numbers</option>
        <option value="HighestAlphabet">Highest Lowercase Alphabet</option>
      </select>
      <div>
        {selectedOptions.includes('Alphabets') && <p>Alphabets: {response.alphabets.join(', ')}</p>}
        {selectedOptions.includes('Numbers') && <p>Numbers: {response.numbers.join(', ')}</p>}
        {selectedOptions.includes('HighestAlphabet') && <p>Highest: {response.highest_lowercase_alphabet  }</p>}
      </div>
    </div>
  );
}

export default App;
