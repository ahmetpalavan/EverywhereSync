import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { db, storage } from "@/firebase";
import { useStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import toast from "react-hot-toast";

export function DeleteModal() {
  const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] = useStore((state) => [
    state.isDeleteModalOpen,
    state.setIsDeleteModalOpen,
    state.fileId,
    state.setFileId,
  ]);

  const { user } = useUser();

  const deleteFile = async () => {
    if (!user || !fileId) return;

    const toastId = toast.loading("Deleting file...");

    const fileRef = ref(storage, `users/${user?.id}/files/${fileId}`);
    try {
      await deleteObject(fileRef)
        .then(() => {
          toast.success("File deleted successfully", { id: toastId });
        })
        .catch((error) => {
          console.log(error);
        });
      await deleteDoc(doc(db, "users", user?.id, "posts", fileId)).then(() => {
        toast.success("File deleted successfully", { id: toastId });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      modal
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md sm:w-full sm:p-4">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this file?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 justify-between">
          <Button size={"sm"} className="w-full" variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
            <span className="flex items-center space-x-2">Cancel</span>
          </Button>
          <Button
            className="w-full"
            onClick={() => {
              deleteFile();
              setIsDeleteModalOpen(false);
            }}
            type="submit"
            size={"sm"}
            variant="destructive"
          >
            <span className="flex items-center space-x-2">Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
