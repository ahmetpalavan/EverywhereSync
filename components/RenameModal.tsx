import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { db } from "@/firebase";
import { useStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "./ui/input";

export function RenameModal() {
  const [input, setInput] = useState<string>("");
  const [isRenameModalOpen, setIsRenameModalOpen, filename, setFilename, fileId] = useStore((state) => [
    state.isRenameModalOpen,
    state.setIsRenameModalOpen,
    state.filename,
    state.setFilename,
    state.fileId,
  ]);

  const { user } = useUser();

  const renameFile = async () => {
    if (!user || !fileId) return;
    const toastId = toast.loading("Renaming file...");
    try {
      await updateDoc(doc(db, "users", user?.id, "posts", fileId), {
        fileName: input,
      });
      toast.success("File renamed successfully", { id: toastId });
      setIsRenameModalOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog modal open={isRenameModalOpen} onOpenChange={setIsRenameModalOpen}>
      <DialogContent className="sm:max-w-md sm:w-full sm:p-4">
        <DialogHeader>
          <DialogTitle>Rename this file</DialogTitle>
          <DialogDescription>Enter a new name for your file.</DialogDescription>
          <Input
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                renameFile();
              }

              if (e.key === "Escape") {
                setIsRenameModalOpen(false);
              }
            }}
            defaultValue={filename}
            id="link"
            onChange={(e) => setInput(e.target.value)}
          />
        </DialogHeader>
        <div className="flex items-center space-x-2 justify-between">
          <Button size={"sm"} className="w-full" variant="secondary" onClick={() => setIsRenameModalOpen(false)}>
            Cancel
          </Button>
          <Button
            className="w-full"
            onClick={() => {
              renameFile();
            }}
            type="submit"
            size={"sm"}
            variant="success"
          >
            Rename
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
