"use client";
import React, { useCallback, useState } from "react";
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



export const CustomNode = ({ data, id, selected }) => {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data.label);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    setLabel(e.target.value);
  };

  const handleBlur = () => {
    setEditing(false);
    data.label = label;
  };

  return (
    <div
      className={`relative rounded-md shadow-md transition-all animate-fadeIn ${
        selected ? "ring-2 ring-blue-400" : ""
      }`}
      style={{
        backgroundColor: "white",
        padding: "16px",
        minWidth: "150px",
        minHeight: "60px",
      }}
      onDoubleClick={handleDoubleClick}
    >
      {editing ? (
        <input
          type="text"
          value={label}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
          className="w-full p-2 text-sm border border-blue-400 rounded focus:outline-none"
        />
      ) : (
        <div className="text-gray-800 font-medium">{label}</div>
      )}

      {selected && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              data.onAddNode(id, 'left');
            }}
            className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full w-6 h-6 border-none cursor-pointer flex items-center justify-center hover:bg-blue-600 transition-colors"
          >
            +
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              data.onAddNode(id, 'right');
            }}
            className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full w-6 h-6 border-none cursor-pointer flex items-center justify-center hover:bg-blue-600 transition-colors"
          >
            +
          </button>
        </>
      )}

      <Handle
        type="target"
        position={Position.Left}
        id="a"
        style={{
          background: "#2196f3",
          width: "10px",
          height: "10px",
          border: "2px solid white",
        }}
        isConnectable={true}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{
          background: "#2196f3",
          width: "10px",
          height: "10px",
          border: "2px solid white",
        }}
        isConnectable={true}
      />
    </div>
  );
};

export default function App() {
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
    <div style={{ display: "flex", width: "100vw", height: "100vh" }} className="bg-gray-50">
      <Toolbar
        onAddNode={() => handleAddNode("1")}
        onUndo={handleUndo}
        onDeleteAll={handleDeleteAll}
      />
      <div style={{ flexGrow: 1, marginLeft: "80px" }}>
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
            style={{
              backgroundColor: "#f8f9fa",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </div>
  );
}
