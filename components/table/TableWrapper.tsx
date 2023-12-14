"use client";

import { FileType } from "@/typing";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DataTable } from "./Table";
import { columns } from "./column";
import { useUser } from "@clerk/nextjs";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { Skeleton } from "../ui/skeleton";

type Props = {
  skeletonFile: FileType[];
};

const TableWrapper = ({ skeletonFile }: Props) => {
  const { user } = useUser();
  const [data, setData] = useState<FileType[]>([]);
  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc");
  const [docs, loading, error] = useCollection(user && query(collection(db, "users", user.id, "posts"), orderBy("createdAt", sortBy)));

  useEffect(() => {
    if (!docs) return;
    const tempData: FileType[] = docs.docs.map((doc) => ({
      id: doc.id,
      filename: doc.data().fileName || doc.id,
      downloadURL: doc.data().downloadURL,
      fullName: doc.data().fullName,
      size: doc.data().size,
      type: doc.data().type,
      timestamps: new Date(doc.data().timestamps?.seconds * 1000),
    })) as FileType[];
    setData(tempData);
  }, [docs]);

  if (docs?.docs.length === undefined)
    return (
      <div className="flex flex-col">
        <Button variant={"outline"} className="ml-auto w-36 h-10 mb-5">
          <Skeleton className="h-5 w-full" />
        </Button>

        <div className="border rounded-lg"></div>
        <div className="border-b h-12">
          {skeletonFile.map((file) => (
            <div key={file.id} className="flex items-center p-5 w-full space-x-4">
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}

          {skeletonFile.length === 0 && (
            <div className="flex items-center p-5 w-full space-x-4">
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}
        </div>
      </div>
    );

  return (
    <div className="flex flex-col space-y-5 pb-10">
      <Button
        onClick={() => {
          setSortBy(sortBy === "asc" ? "desc" : "asc");
        }}
        className="ml-auto w-fit"
      >
        Sort by {sortBy === "asc" ? "Oldest" : "Newest"}
      </Button>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TableWrapper;
