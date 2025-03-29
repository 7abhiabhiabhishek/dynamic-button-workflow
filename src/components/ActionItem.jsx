function ActionItem({ action, onRemove }) {
    return (
      <div>
        <span>{action.type}: {action.value || 'N/A'}</span>
        <button onClick={onRemove}>Remove</button>
      </div>
    );
  }
  
  export default ActionItem;