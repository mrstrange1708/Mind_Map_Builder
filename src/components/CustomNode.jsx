import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { TooltipNode } from "@/components/ui/tooltip";

const CustomNode = ({ data, id }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleChange = (e) => {
    data.onChange(id, e.target.value);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setIsClicked(!isClicked);
  };

  return (
    <TooltipNode>
      <TooltipTrigger asChild>
        <div
          onClick={handleClick}
          className="relative"
          style={{
            border: `2px solid ${isClicked ? '#2196f3' : '#888'}`,
            borderRadius: '20px',
            padding: '10px',
            backgroundColor: isClicked ? '#e3f2fd' : '#fdfdfd',
            minWidth: '160px',
            textAlign: 'center',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          {isClicked && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  data.onAddChild(id, "left");
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-blue-600"
              >
                +
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  data.onAddChild(id, "right");
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-blue-600"
              >
                +
              </button>
            </>
          )}
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
              backgroundColor: 'transparent',
              cursor: 'text',
              userSelect: 'text',
            }}
          />
          <div style={{ marginTop: '10px' }} onclick={handleClick}>
            <button onClick={() => data.onAddChild(id)} style={{ marginRight: '5px' }}>
              Add
            </button>
            <button onClick={() => data.onDelete(id)}>Delete</button>
          </div>

          <Handle type="source" position={Position.Left} />
          <Handle type="source" position={Position.Right} />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {data.label}
      </TooltipContent>
    </TooltipNode>
  );
};

export default CustomNode;