import { FileType } from "@/typing";
import React from "react";
import { Button } from "../ui/button";

type Props = {
  skeletonFile: FileType[];
};

const TableWrapper = ({ skeletonFile }: Props) => {
  return <div>
    <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 space-y-5 rounded-sm inline-flex items-center">
      Try it for free
    </Button>
  </div>;
};

export default TableWrapper;
