import React, { useState } from "react";
import { ChevronDown, ChevronRight, Folder, FileText } from "lucide-react";

const AccordionItem = ({ item, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className={`ml-${level * 2}`}>
      <div
        className="flex items-center gap-1 cursor-pointer hover:bg-gray-200 px-2 py-1 rounded"
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {hasChildren ? (
          isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
        ) : (
          <FileText size={16} className="text-gray-400" />
        )}
        {hasChildren ? <Folder size={16} className="text-yellow-600" /> : null}
        <span className="text-sm text-gray-700">
          {item.link ? (
            <a href={item.link} className="hover:underline">
              {item.name}
            </a>
          ) : (
            item.name
          )}
        </span>
      </div>

      {hasChildren && isOpen && (
        <div className="ml-4">
          {item.children.map((child, idx) => (
            <AccordionItem key={idx} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
const resourceData = [
    {
      name: "Folder A",
      children: [
        { name: "Subresource A1", link: "/a1" },
        {
          name: "Subfolder A2",
          children: [
            { name: "Sub-sub A2-1", link: "/a2-1" },
            { name: "Sub-sub A2-2", link: "/a2-2" },
          ],
        },
      ],
    },
    {
      name: "Folder B",
      children: [
        { name: "Subresource B1", link: "/b1" },
        { name: "Subresource B2", link: "/b2" },
      ],
    },
  ];
  

const NestedSidebar = () => {
  return (
    <div className="w-64 bg-gray-100 p-4 h-screen shadow-md">
      <h2 className="font-semibold text-gray-800 mb-2">Resources</h2>
      {resourceData.map((item, index) => (
        <AccordionItem key={index} item={item} />
      ))}
    </div>
  );
};

export default NestedSidebar;
