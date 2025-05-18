import CustomNode from './components/CustomNode';
import React, { useCallback, useState } from "react";
import SignUp from "./components/signup.jsx";  
import {
  ReactFlow,
  addEdge,
  SelectionMode,
  useEdgesState,
  useNodesState,
  MiniMap,
  Handle,
  Position,
  Background,
  Controls,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import './index.css';
import Toolbar from "./components/Toolbar";
import { Sun } from 'lucide-react';
import { Moon } from 'lucide-react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";

export const defaultNodes = [
  {
    id: "1",
    type: "custom",
    data: { label: `Node` },
    position: { x: 250, y: 25 },
  },
];

export const defaultEdges = [];

const nodeColor = (node) => {
  switch (node.type) {
    case "input":
      return "#2196f3";
    case "output":
      return "#2196f3";
    default:
      return "#2196f3";
  }
};

const MainApp = () => {
  const [theme, setTheme] = useState('light');
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);

  const onEdgeClick = useCallback(
    (event, edge) => {
      event.stopPropagation();
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    },
    [setEdges]
  );

  const handleAddNode = (parentId, direction = 'right') => {
    const newNodeId = (nodes.length + 1).toString();

    setNodes((nds) => {
      const parentNode = nds.find((n) => n.id === parentId);

      const newNode = {
        id: newNodeId,
        type: "custom",
        data: { label: `Node ${newNodeId}`, onAddNode: handleAddNode },
        position: {
          x:
            direction === 'right'
              ? (parentNode?.position.x || 0) + 150
              : (parentNode?.position.x || 0) - 150,
          y: parentNode?.position.y || 0,
        },
      };

      return [...nds, newNode];
    });
    setEdges((eds) => [
      ...eds,
      {
        id: `e${parentId}-${newNodeId}`,
        type: "smoothstep",
        source: parentId,
        target: newNodeId,
        animated: true,
        style: { stroke: "#b1b1b7", strokeWidth: 2 },
      },
    ]);
  };

  const handleUndo = () => {
    if (nodes.length > 1) {
      const updatedNodes = [...nodes];
      const removedNode = updatedNodes.pop();
      setNodes(updatedNodes);
      setEdges((eds) => eds.filter((e) => e.source !== removedNode.id && e.target !== removedNode.id));
    }
  };


  const handleDeleteAll = () => {
    setNodes([]);
    setEdges([]);
  };

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
            animated: true,
            style: { stroke: "#b1b1b7", strokeWidth: 2 },
          },
          eds
        )
      ),
    [setEdges]
  );

  const enhancedNode = nodes.map((node) => ({
    ...node,
    data: { ...node.data, onAddNode: handleAddNode },
  }));

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ease-in-out flex w-screen h-screen ${
        theme === 'dark' ? 'bg-black ' : 'bg-gray-500'
      }`}
    >
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-full bg-gray-200 dark:bg-black transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Moon className="w-5 h-5 text-white" /> : <Sun className="w-5 h-5 text-white" />}
        </button>
      </div>
      <Toolbar
        onAddNode={() => handleAddNode("1")}
        onUndo={handleUndo}
        onDeleteAll={handleDeleteAll}
      />
      <div className="flex-grow ml-30">
        <ReactFlow
          nodes={enhancedNode}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onEdgeClick={onEdgeClick}
          nodeTypes={{ custom: CustomNode }}
          onConnect={onConnect}
          fitView
          panOnScroll
          zoomOnPinch
          defaultEdgeOptions={{
            type: "smoothstep",
            style: { stroke: "#b1b1b7", strokeWidth: 2 },
          }}
        >
          <Background color="#aaa" gap={16} size={1} />
          <MiniMap
            nodeColor={nodeColor}
            nodeStrokeWidth={3}
            zoomable
            pannable
            className="bg-gray-100 border border-gray-300 rounded"
          />
          <Controls showInteractive={true} />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<MainApp />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<SignUp />} />
</Routes>
    </BrowserRouter>
  );
}
