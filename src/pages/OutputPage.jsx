import { useState, useEffect } from 'react';

function OutputPage() {
  const [config, setConfig] = useState({ label: 'Click Me!', workflow: [] });
  const [output, setOutput] = useState([]);
  const [buttonSize, setButtonSize] = useState(16);
  const [buttonColor, setButtonColor] = useState('#007bff');
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const savedConfig = JSON.parse(localStorage.getItem('buttonConfig') || '{}');
    setConfig({
      label: savedConfig.label || 'Click Me!',
      workflow: savedConfig.workflow || []
    });
  }, []);

  const executeWorkflow = () => {
    if (isDisabled) return;
    setOutput([]);
    config.workflow.forEach((action) => {
      switch (action.type) {
        case 'Alert':
          alert(action.value || 'Message');
          break;
        case 'Show Text':
          setOutput((prev) => [...prev, action.value]);
          break;
        case 'Show Image':
          setOutput((prev) => [...prev, <img src={action.value} alt="Workflow Image" />]);
          break;
        case 'Refresh Page':
          window.location.reload();
          break;
        case 'Set Localstorage':
          const [key, value] = action.value.split(',');
          localStorage.setItem(key.trim(), value.trim());
          break;
        case 'Get Localstorage':
          const val = localStorage.getItem(action.value);
          setOutput((prev) => [...prev, val || 'Key not found']);
          break;
        case 'Increase Button Size':
          setButtonSize((prev) => prev + 10);
          break;
        case 'Close Window':
          window.close();
          break;
        case 'Prompt and Show':
          const response = prompt(action.value);
          setOutput((prev) => [...prev,` Hello, ${response}`]);
          break;
        case 'Change Button Color':
          setButtonColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
          break;
        case 'Disable Button':
          setIsDisabled(true);
          break;
        default:
          break;
      }
    });
  };

  return (
    <div>
      <h1>Output Page</h1>
      <button
        onClick={executeWorkflow}
        style={{ fontSize: `${buttonSize}px`, backgroundColor: buttonColor }}
        disabled={isDisabled}
      >
        {config.label}
      </button>
      <div>
        {output.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
}

export default OutputPage;