import { useState, useEffect } from 'react';
import ActionItem from '../components/ActionItem';

const availableActions = [
  'Alert', 'Show Text', 'Show Image', 'Refresh Page', 'Set Localstorage',
  'Get Localstorage', 'Increase Button Size', 'Close Window', 'Prompt and Show',
  'Change Button Color', 'Disable Button'
];

function ConfigPage() {
  const [label, setLabel] = useState('');
  const [workflow, setWorkflow] = useState([]);
  const [actionType, setActionType] = useState('');
  const [actionValue, setActionValue] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const savedConfig = JSON.parse(localStorage.getItem('buttonConfig') || '{}');
    setLabel(savedConfig.label || '');
    setWorkflow(savedConfig.workflow || []);
  }, []);

  const addAction = () => {
    if (!actionType) return;
    const newAction = { type: actionType, value: actionValue };
    setWorkflow([...workflow, newAction]);
    setActionType('');
    setActionValue('');
  };

  const removeAction = (index) => {
    setWorkflow(workflow.filter((_, i) => i !== index));
  };

  const saveConfig = () => {
    const config = { label, workflow };
    localStorage.setItem('buttonConfig', JSON.stringify(config));
    alert('Configuration saved!');
  };

  return (
    <div>
      <h1>Config Page</h1>
      <div>
        <label>Button Label:</label>
        <input value={label} onChange={(e) => setLabel(e.target.value)} />
      </div>
      <div>
        <h3>Add Action</h3>
        <select value={actionType} onChange={(e) => setActionType(e.target.value)}>
          <option value="">Select Action</option>
          {availableActions.map((action) => (
            <option key={action} value={action}>{action}</option>
          ))}
        </select>
        <input
          value={actionValue}
          onChange={(e) => setActionValue(e.target.value)}
          placeholder="Action Value (if needed)"
        />
        <button onClick={addAction}>Add Action</button>
      </div>
      <h3>Workflow</h3>
      {workflow.map((action, index) => (
        <ActionItem key={index} action={action} onRemove={() => removeAction(index)} />
      ))}
      <button onClick={saveConfig}>Save Config</button>
    </div>
  );
}

export default ConfigPage;