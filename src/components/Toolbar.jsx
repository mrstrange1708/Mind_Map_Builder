import React from 'react';
import { Plus, Trash2, Undo2 , UserRoundPen } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Toolbar = ({ onAddNode, onDeleteAll, onUndo }) => {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 h-screen w-[130px] bg-neutral-900 flex flex-col items-center pt-5 shadow-lg z-[1000]">
      <div className="text-white text-3xl font-bold mb-5 p">
        Cognify
      </div>
      <button
        className="my-[15px] p-[12px] w-[50px] text-white text-xl bg-neutral-800 rounded-md border-none cursor-pointer transition-colors hover:bg-neutral-700"
        onClick={() => onAddNode?.()}
        title="Add Node"
      >
        <Plus size={25} />
      </button>
      <button
        className="my-[15px] p-[12px] w-[50px] text-white text-xl bg-neutral-800 rounded-md border-none cursor-pointer transition-colors hover:bg-neutral-700"
        onClick={() => onUndo?.()}
        title="Undo"
      >
        <Undo2 size={25} />
      </button>


      <button
        className="my-[15px] p-[12px] w-[50px] text-white text-xl bg-neutral-800 rounded-md border-none cursor-pointer transition-colors hover:bg-neutral-700"
        onClick={() => onDeleteAll?.()}
        title="Delete All"
      >
        <Trash2 size={25} />
      </button>
      <div className="mt-auto mb-6">
        <button
          className="p-[12px] w-[50px] text-white text-xl bg-neutral-800 rounded-md border-none cursor-pointer transition-colors hover:bg-neutral-700"
          onClick={() => {
            navigate("/login");
          }}
          title="Login"
        >
          <UserRoundPen size={25} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
