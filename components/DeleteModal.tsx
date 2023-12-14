import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useStore } from "@/store/store";

export function DeleteModal() {
  const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] = useStore((state) => [
    state.isDeleteModalOpen,
    state.setIsDeleteModalOpen,
    state.fileId,
    state.setFileId,
  ]);

  console.log(fileId, isDeleteModalOpen);

  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this file?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
            <span className="flex items-center space-x-2">Delete</span>
          </Button>
          <Button
            onClick={() => {
              setIsDeleteModalOpen(false);
              setFileId("");
            }}
            type="submit"
            size={"sm"}
            className="flex items-center space-x-2"
            variant="secondary"
          >
            <span>Delete</span>
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button size={"sm"} className="flex items-center space-x-2" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
