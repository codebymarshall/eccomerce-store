import fs from "fs";
import path from "path";

export async function uploadImage(file: Buffer, fileName: string) {
  try {
    const publicDir = path.join(process.cwd(), "public");
    const uploadsDir = path.join(publicDir, "images", "products");

    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Generate a unique filename
    const uniqueFileName = `${Date.now()}-${fileName}`;
    const filePath = path.join(uploadsDir, uniqueFileName);

    // Write the file
    fs.writeFileSync(filePath, file);

    // Return the public URL
    return `/images/products/${uniqueFileName}`;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
}
