import React from 'react';
import { Plus, Trash2, CornerDownRight, Undo2 } from 'lucide-react';

const Toolbar = ({ onAddNode, onDeleteAll, onAddChild, onUndo }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      width: '100px',
      backgroundColor: '#1a1a1a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '20px',
      boxShadow: '2px 0 5px rgba(0,0,0,0.3)',
      zIndex: 1000,
    }}>
      <div style={{ color: '#fff', fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>
        Cognify
      </div>
      <button
        style={buttonStyle}
        onClick={onAddNode || (() => console.log('Add Node clicked'))}
        title="Add Node"
      >
        <Plus size={20} />
      </button>
      <button
        style={buttonStyle}
        onClick={onUndo || (() => console.log('Undo clicked'))}
        title="Undo"
      >
        <Undo2 size={20} />
      </button>
      <button
        style={buttonStyle}
        onClick={onAddChild || (() => console.log('Add Child clicked'))}
        title="Add Child"
      >
        <CornerDownRight size={20} />
      </button>
      <button
        style={buttonStyle}
        onClick={onDeleteAll || (() => console.log('Delete All clicked'))}
        title="Delete All"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

const buttonStyle = {
  margin: '15px 0',
  padding: '12px 0',
  width: '50px',
  fontSize: '24px',
  color: '#fff',
  backgroundColor: '#333',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

export default Toolbar;
