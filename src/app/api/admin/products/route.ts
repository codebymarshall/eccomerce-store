import { uploadImage } from "@/lib/image-upload";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File;

    if (!name || !description || !price || !category || !imageFile) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Upload image locally
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const imageUrl = await uploadImage(buffer, imageFile.name);

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        image: imageUrl,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File | null;

    if (!id || !name || !description || !price || !category) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    let imageUrl: string | undefined;

    if (imageFile) {
      // Upload new image locally
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageUrl = await uploadImage(buffer, imageFile.name);
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        category,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCTS_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
