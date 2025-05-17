import React from 'react';
import { Handle, Position } from '@xyflow/react';

const CustomNode = ({ data, id }) => {
  const handleChange = (e) => {
    data.onChange(id, e.target.value);
  };

  return (
    <div style={{
      border: '2px solid #888',
      borderRadius: '20px',
      padding: '10px',
      backgroundColor: '#fdfdfd',
      minWidth: '160px',
      textAlign: 'center',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    }}>
      <input
        type="text"
        value={data.label}
        onChange={handleChange}
        style={{
          width: '100%',
          border: 'none',
          outline: 'none',
          fontSize: '1rem',
          textAlign: 'center',
          backgroundColor: 'transparent'
        }}
      />
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => data.onAddChild(id)} style={{ marginRight: '5px' }}>Add</button>
        <button onClick={() => data.onDelete(id)}>Delete</button>
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default CustomNode;
