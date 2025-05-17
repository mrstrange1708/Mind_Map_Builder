import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";

const CustomNode = ({ data, id, selected }) => {
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
      className={`relative rounded-md shadow-md transition-all p-4 min-w-[150px] min-h-[60px] bg-white ${
        selected ? "ring-2 ring-blue-400" : ""
      } cursor-pointer select-none`}
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
        <button
          onClick={(e) => {
            e.stopPropagation();
            data.onAddNode(id);
          }}
          className="absolute -right-2 -top-2 bg-blue-500 text-white rounded-full w-6 h-6 border-none cursor-pointer flex items-center justify-center hover:bg-blue-600 transition-colors"
          aria-label="Add node"
        >
          +
        </button>
      )}

      <Handle
        type="target"
        position={Position.Left}
        id="a"
        style={{
          background: "#2196f3",
          width: 10,
          height: 10,
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
          width: 10,
          height: 10,
          border: "2px solid white",
        }}
        isConnectable={true}
      />
    </div>
  );
};

export default CustomNode;