import React, { useCallback, useState, useRef } from 'react';
import { ReactFlow } from '@xyflow/react';
import {
    ReactFlowProvider,
    addEdge,
    MiniMap,
    Controls,
    Background,
    NodeToolbar,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nanoid } from 'nanoid';
import Toolbar from './components/Toolbar';
import './App.css';

const nodeTypes = {
  custom: ({ id, data }) => {
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
  }
};

const initialNodes = [];
const initialEdges = [];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const reactFlowInstance = useRef(null);

  const reactFlowWrapper = useRef(null);

  const onAddChild = (id) => {
    console.log("Add child to node:", id);
  };

  const onDelete = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  };

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
      data: { label: 'New Node', onAddChild, onDelete },
      style: { padding: 10, border: '1px solid #777', borderRadius: 5 },
      type: 'custom'
    };
    setNodes((nds) => nds.concat(newNode));
  }, [onAddChild, onDelete]);

  const handleAddNode = useCallback(() => {
    if (!reactFlowInstance.current) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const position = reactFlowInstance.current.project({ x: viewportWidth / 2, y: viewportHeight / 2 });

    const newNode = {
      id: nanoid(),
      position,
      data: { label: 'New Node', onAddChild, onDelete },
      style: { padding: 10, border: '1px solid #777', borderRadius: 5 },
      type: 'custom',
    };
    setNodes((nds) => nds.concat(newNode));
  }, [onAddChild, onDelete]);

  const handleDeleteAll = () => {
    setNodes([]);
    setEdges([]);
  };

  const sanitizedNodes = nodes.map((node) =>
    node.type === "dimensions" ? { ...node, type: "custom" } : node
  );

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }} ref={reactFlowWrapper} onDoubleClick={handleDoubleClick}>
      <Toolbar 
        onAddNode={handleAddNode} 
        onAddChild={onAddChild} 
        onDeleteAll={handleDeleteAll} 
      />
      <div style={{ flexGrow: 1, marginLeft: '80px' }}>
        <ReactFlow
          nodes={sanitizedNodes}
          edges={edges}
          draggable={true}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          zoomOnDoubleClick={false}
          fitView
          panOnDrag
          zoomOnScroll
          nodeTypes={nodeTypes}
          panOnScroll
          zoomOnPinch
          onInit={(instance) => {
            reactFlowInstance.current = instance;
          }}
        >
          <MiniMap />
          <Controls />
          <NodeToolbar />
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>
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
