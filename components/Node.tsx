"use client";

import { useState } from "react";

import {
  FolderIcon,
  DocumentTextIcon,
  MusicalNoteIcon,
  VideoCameraIcon,
  ChevronRightIcon,
} from "@heroicons/react/16/solid";

type fileTypes = "folder" | "file" | "audio" | "video";

type Node = {
  name: string;
  type?: fileTypes | any;
  folders?: Node[];
};

export default function Node() {
  const [folders, setFolders] = useState([
    {
      name: "Home",
      folders: [
        {
          name: "Music",
          type: "folder",
          folders: [
            {
              name: "Prelude in C",
              type: "audio",
            },
            {
              name: "The Well-Tempered Clavier",
              type: "audio",
            },
          ],
        },
        {
          name: "Documents",
          type: "folder",
          folders: [
            {
              name: "Resume",
              type: "file",
            },
            {
              name: "CV",
              type: "file",
            },
          ],
        },
        {
          name: "Pictures",
          type: "folder",
          folders: [
            {
              name: "Wallpapers",
              type: "folder",
            },
          ],
        },
      ],
    },
  ]);

  return (
    <div className="mt-[2px]">
      {folders.map((node, index) => {
        return <MultimediaItem key={index} node={node} />;
      })}
    </div>
  );
}

function getIcon(type: string) {
  switch (type) {
    case "folder":
      return <FolderIcon className="w-6 h-6" />;
    case "file":
      return <DocumentTextIcon className="w-6 h-6" />;
    case "audio":
      return <MusicalNoteIcon className="w-6 h-6" />;
    case "video":
      return <VideoCameraIcon className="w-6 h-6" />;
    default:
      return <DocumentTextIcon className="w-6 h-6" />;
  }
}

function MultimediaItem({ node }: { node: Node }) {
  const [isOpen, setIsOpen] = useState(true);
  const icon = getIcon(node.type);

  return (
    <div className="flex items-start justify-start space-x-1 mt-[2px]">
      {node.folders && node.folders.length > 0 && (
        <button onClick={() => setIsOpen(!isOpen)}>
          <ChevronRightIcon
            className={`w-6 h-6 transition-all ${isOpen && "rotate-90"}`}
          />
        </button>
      )}
      <div className="flex flex-col items-start justify-start">
        <div className="flex items-center justify-center space-x-2">
          {icon}
          <span>{node.name}</span>
        </div>

        {node.folders &&
          isOpen &&
          node.folders.length > 0 &&
          node.folders.map((node, index) => {
            return <MultimediaItem key={index} node={node} />;
          })}
      </div>
    </div>
  );
}
