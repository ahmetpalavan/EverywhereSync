"use client";

import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import DropzoneComponent from "react-dropzone";
import { addDoc, collection, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const Dropzone = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const maxSize = 1048576;
  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (selectedFile: File) => {
    console.log("🚀 ~ file: Dropzone.tsx:45 ~ uploadPost ~ selectedFile", selectedFile);
    
    if (loading) return;
    if (!user) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "users", user.id, "posts"), {
      userId: user.id,
      fileName: selectedFile.name,
      createdAt: Date.now(),
      fullName: user.fullName,
      profileImg: user.imageUrl,
      timestamps: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size,
    });

    const imageRef = ref(storage, `posts/${docRef.id}/${selectedFile.name}`);

    console.log("🚀 ~ file: Dropzone.tsx:46 ~ uploadPost ~ imageRef:", imageRef)
    await uploadBytes(imageRef, selectedFile).then(async (onSnapshot) => {
      console.log("🚀 ~ file: Dropzone.tsx:47 ~ awaituploadBytes ~ uploadBytes:", uploadBytes)
      const downloadUrl = await getDownloadURL(imageRef);
      await updateDoc(docRef, {
        downloadUrl,
      });
    });

    setLoading(false);
  };

  return (
    <DropzoneComponent maxSize={maxSize} minSize={0} onDrop={onDrop}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject, fileRejections }) => {
        const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <section className="m-4">
            <div
              {...getRootProps()}
              className={cn(
                "w-full h-52 border-2 border-gray-300 border-dashed rounded-md flex justify-center items-center",
                isDragActive ? "bg-green-900 text-white animate-pulse" : "bg-slate-50 dark:bg-slate-800 text-slate-500"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload!"}
              {isDragActive && !isDragReject && "Drop it like it's hot!"}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && <div className="text-danger mt-2">File is too large.</div>}
            </div>
          </section>
        );
      }}
    </DropzoneComponent>
  );
};
