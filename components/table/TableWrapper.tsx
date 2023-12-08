import { FileType } from "@/typing";
import React from "react";
import { Button } from "../ui/button";

type Props = {
  skeletonFile: FileType[];
};

const TableWrapper = ({ skeletonFile }: Props) => {
  return <div>
    <Button>Click me</Button>
  </div>;
};

export default TableWrapper;
