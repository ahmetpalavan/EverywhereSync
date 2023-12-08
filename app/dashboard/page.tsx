import { Dropzone } from "@/components/Dropzone";
import TableWrapper from "@/components/table/TableWrapper";
import { db } from "@/firebase";
import { FileType } from "@/typing";
import { auth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";

const Page = async () => {
  const { userId } = auth();
  const docResult = await getDocs(collection(db, "users", userId!, "posts"));
  const skeletonFile: FileType[] = docResult.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      downloadURL: data.downloadURL,
      timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
      filename: data.filename,
      fullName: data.fullName,
      size: data.size,
      type: data.type,
    };
  });
  console.log("🚀 ~ file: page.tsx:22 ~ constskeletonFile:FileType[]=docResult.docs.map ~ skeletonFile:", skeletonFile);
  return (
    <div>
      <Dropzone />
      <section className="container space-y-5">
        <h2>Files</h2>
        <TableWrapper skeletonFile={skeletonFile} />
      </section>
    </div>
  );
};

export default Page;
