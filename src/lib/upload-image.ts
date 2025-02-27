"use client";
export async function uploadImage({
  filename,
  base64Data,
}: {
  filename: string;
  base64Data: string;
}) {
  const byteCharacters = atob(base64Data.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length)
    .fill(0)
    .map((_, i) => byteCharacters.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "image/webp" });

  const formData = new FormData();
  formData.append("image", blob, filename);

  const response = await fetch(
    "https://ultratec-admin-backend.onrender.com/api/v1/helper/image/upload",
    {
      method: "POST",
      body: formData,
    },
  );

  const result = await response.json();
  return result.payload.url;
}
