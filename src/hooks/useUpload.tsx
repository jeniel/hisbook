/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

interface UploadResult {
  success: boolean;
  message: string;
  url?: string;
}

export const useUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File, folder: string): Promise<UploadResult> => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`http://localhost:3000/upload/${folder}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || "Upload failed");
      }

      const data = await res.json();
      return {
        success: true,
        message: data.message,
        url: data.url,
      };
    } catch (err: any) {
      setError(err.message || "Unknown error");
      return {
        success: false,
        message: err.message || "Unknown error",
      };
    } finally {
      setLoading(false);
    }
  };

  const getFile = async (bucket: string, object: string, filename: string): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      const url = `http://localhost:3000/files/${bucket}/${object}/${encodeURIComponent(filename)}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch file: ${res.statusText}`);
      }
      // Return the blob URL so it can be used in an <img> tag
      const blob = await res.blob();
      return URL.createObjectURL(blob);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { uploadFile, getFile, loading, error };
};
