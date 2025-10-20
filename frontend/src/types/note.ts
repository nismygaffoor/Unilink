export type Note = {
  _id: string;
  subject: string;
  unit: string;
  description?: string;
  userId: string;
  author: string;           // ✅ replace old uploader
  filePath: string;         // ✅ replace old link
  createdAt?: string;
  updatedAt?: string;
   date?: string; 
};
