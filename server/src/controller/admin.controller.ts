import type { Request, Response } from "express";
import Category from "../models/Category";
import Product from "../models/Product";
import { asyncHandler } from "../utils/asyncHandler";
import { ok } from "../utils/envelop";
import {
  requireFound,
  requireNumber,
  requireText,
  toTitleCase,
} from "../utils/helpers";
import { AppError } from "../utils/AppError";
import { uploadManyBuffersToCloudinary } from "../utils/cloudinary";
import { getDbUserFromReq } from "../middleware/auth";

type UploadedImage = {
  url: string;
  publicId: string;
  isCover: boolean;
};

export const getCategories = asyncHandler(
  async (_req: Request, res: Response) => {
    const categories = await Category.find().sort({ name: 1 });

    res.json(ok(categories));
  }
);

export const postCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const name = String(req.body.name || "").trim();

    requireText(name, "Name is required");

    const category = await Category.create({ name });

    res.status(201).json(ok(category));
  }
);

export const putCategory = asyncHandler(async (req: Request, res: Response) => {
  const name = String(req.body.name || "").trim();

  const extractCategoryId = req.params.id as string;

  requireText(name, "Category name is required");

  const existingCategory = await Category.findById(extractCategoryId);
  const category = requireFound(existingCategory, "Category not found");

  category.name = toTitleCase(name);

  await category.save();

  res.status(200).json(ok(category));
});

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const search = String(req.query.search || "").trim();

  const query: Record<string, unknown> = {}; //Record<keyType, valueType>

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  const products = await Product.find(query)
    .populate("category", "name")
    .sort({ createdAt: -1 });

  res.status(200).json(ok(products));
});

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const productId = req.params.id as string;

    const product = await Product.findById(productId).populate(
      "category",
      "name"
    );
    requireFound(product, "Product not found");

    res.status(200).json(ok(product));
  }
);

export const postProduct = asyncHandler(async (req: Request, res: Response) => {
  const title = String(req.body.title || "").trim();
  const description = String(req.body.description || "").trim();
  const category = String(req.body.category || "").trim();
  const brand = String(req.body.brand || "").trim();
  const price = Number(req.body.price);
  const salePercentage = Number(req.body.salePercentage || 0);
  const stock = Number(req.body.stock);
  const status = String(req.body.status || "active").trim();
  const colors = req.body.colors || [];
  const sizes = req.body.sizes || [];

  requireText(title, "Title is required");
  requireText(description, "Description is required");
  requireText(category, "Category is required");
  requireText(brand, "Brand is required");

  requireNumber(price, "Price is required");
  requireNumber(salePercentage, "Sale Percentage is required");
  requireNumber(stock, "Stock is required");

  const existingCategory = await Category.findById(category);

  requireText(existingCategory, "Category not found", 404);

  const files = (req.files as Express.Multer.File[]) || [];

  if (!files.length) {
    throw new AppError(400, "Atleast one image is needed");
  }

  const uploadedImages = await uploadManyBuffersToCloudinary(
    files.map((file) => file.buffer)
  );

  const images = uploadedImages.map((img, index) => ({
    url: img.url,
    publicId: img.publicId,
    isCover: index === 0,
  }));

  const user = await getDbUserFromReq(req);

  const product = await Product.create({
    title,
    description,
    category,
    brand,
    images,
    colors,
    sizes,
    price,
    salePercentage,
    stock,
    status,
    createdBy: user._id,
  });

  const createdProduct = await Product.findById(product._id).populate(
    "category",
    "name"
  );

  res.status(201).json(ok(createdProduct));
});

export const putProduct = asyncHandler(async (req: Request, res: Response) => {
  const productId = req.params.id as string;
  const title = String(req.body.title || "").trim();
  const description = String(req.body.description || "").trim();
  const category = String(req.body.category || "").trim();
  const brand = String(req.body.brand || "").trim();
  const price = Number(req.body.price);
  const salePercentage = Number(req.body.salePercentage || 0);
  const stock = Number(req.body.stock);
  const status = String(req.body.status || "active").trim() as
    | "active"
    | "inactive";
  const colors = req.body.colors || [];
  const sizes = req.body.sizes || [];
  const coverImagePublicId = String(req.body.coverImagePublicId || "").trim();

  requireText(title, "Title is required");
  requireText(description, "Description is required");
  requireText(category, "Category is required");
  requireText(brand, "Brand is required");

  requireNumber(price, "Price is required");
  requireNumber(salePercentage, "Sale Percentage is required");
  requireNumber(stock, "Stock is required");

  const existingCategoryDoc = await Category.findById(category);
  const existingCategory = requireFound(
    existingCategoryDoc,
    "Category not found"
  );

  const productDoc = await Product.findById(productId);
  const product = requireFound(productDoc, "Product not found");

  const files = (req.files as Express.Multer.File[]) || [];

  const uploadNewImages = await uploadManyBuffersToCloudinary(
    files.map((file) => file.buffer)
  );

  const newlyAddedImages = uploadNewImages.map((image) => ({
    url: image.url,
    publicId: image.publicId,
    isCover: false,
  }));

  let existingImages: UploadedImage[] = product.images.map(
    (img: UploadedImage) => ({
      url: img.url,
      publicId: img.publicId,
      isCover: img.isCover,
    })
  );

  const mergedImages: UploadedImage[] = [
    ...existingImages,
    ...newlyAddedImages,
  ];

  if (!mergedImages.length) {
    throw new AppError(400, "Atleast one img is needed");
  }

  const finalImages: UploadedImage[] = mergedImages.map(
    (image: UploadedImage, index) => ({
      url: image.url,
      publicId: image.publicId,
      isCover: coverImagePublicId
        ? image.publicId === coverImagePublicId
        : index === 0,
    })
  );

  product.title = title;
  product.description = description;
  product.category = existingCategory._id;
  product.brand = brand;
  product.colors = colors;
  product.sizes = sizes;
  product.price = price;
  product.salePercentage = salePercentage;
  product.stock = stock;
  product.status = status;
  product.set("images", finalImages);

  await product.save();

  const updatedProduct = await Product.findById(product._id).populate(
    "category",
    "name"
  );

  res.json(ok(updatedProduct));
});
