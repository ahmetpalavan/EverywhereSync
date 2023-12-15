"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileType } from "@/typing";
import { Button } from "../ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useStore } from "@/store/store";
import { DeleteModal } from "../DeleteModal";
import { RenameModal } from "../RenameModal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [setFileId, setFilename, setIsRenameModalOpen, setIsDeleteModalOpen] = useStore((state) => [
    state.setFileId,
    state.setFilename,
    state.setIsRenameModalOpen,
    state.setIsDeleteModalOpen,
  ]);

  const openDeleteModal = (fileId: string) => {
    setFileId(fileId);
    setIsDeleteModalOpen(true); // This will set the state to open the modal
  };

  const openRenameModal = (fileId: string, filename: string) => {
    setFileId(fileId);
    setFilename(filename);
    setIsRenameModalOpen(true); // This will set the state to open the modal
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                <DeleteModal />
                <RenameModal />
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.id === "timestamps" ? (
                      <div className="flex flex-col">
                        <div className="text-sm">{(cell.getValue() as Date).toLocaleDateString("en-US")}</div>
                        <div className="text-xs">{(cell.getValue() as Date).toLocaleTimeString("en-US")}</div>
                      </div>
                    ) : cell.column.id === "filename" ? (
                      <p
                        onClick={() => openRenameModal((row.original as FileType).id, cell.getValue() as string)}
                        className="flex items-center hover:text-blue-500"
                      >
                        {cell.getValue() as string}
                        <PencilIcon size={20} className="ml-2" />
                      </p>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}

                <TableCell key={(row.original as FileType).id}>
                  <Button onClick={() => openDeleteModal((row.original as FileType).id)} variant="outline">
                    <TrashIcon size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
