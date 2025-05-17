import React, { useCallback, useState, useRef } from 'react';
import { ReactFlow } from '@xyflow/react';
import {
  ReactFlowProvider,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nanoid } from 'nanoid';
import './App.css';

const initialNodes = [];
const initialEdges = [];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const reactFlowWrapper = useRef(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => nds.map((node) => {
      const change = changes.find((c) => c.id === node.id);
      return change ? { ...node, ...change } : node;
    })),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => eds.map((edge) => {
      const change = changes.find((c) => c.id === edge.id);
      return change ? { ...edge, ...change } : edge;
    })),
    []
  );

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const handleDoubleClick = useCallback((event) => {
    const bounds = reactFlowWrapper.current.getBoundingClientRect();
    const position = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };
    const newNode = {
      id: nanoid(),
      position,
      data: { label: 'New Node' },
      style: { padding: 10, border: '1px solid #777', borderRadius: 5 },
    };
    setNodes((nds) => nds.concat(newNode));
  }, []);

  const handleDeleteAll = () => {
    setNodes([]);
    setEdges([]);
  };

  const CustomNode = ({ id, data }) => {
    return (
      <div style={{ padding: 10, border: '1px solid #777', borderRadius: 5, background: 'white' }}>
        <div>{data.label}</div>
        <button onClick={() => data.onAddChild(id)} style={{
          marginRight: '5px',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          fontSize: '20px',
          lineHeight: '20px',
          textAlign: 'center',
          padding: 0,
        }}>+</button>
        <button onClick={() => data.onDelete(id)}>Delete</button>
      </div>
    );
  };

  return (
    <div
      style={{ width: '100vw', height: '100vh' }}
      onDoubleClick={handleDoubleClick}
      ref={reactFlowWrapper}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        draggable= {true}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        panOnDrag
        zoomOnScroll
        nodeTypes={{ custom: CustomNode }}
        panOnScroll
        zoomOnPinch
      >
        <MiniMap />
        <Controls />
        <Background gap={12} size={1} />
      </ReactFlow>
      <button
        onClick={handleDeleteAll}
        style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}
      >
        Delete All
      </button>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
