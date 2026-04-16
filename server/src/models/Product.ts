import mongoose from "mongoose";

const productImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true,
  },
  publicId: {
    type: String,
    required: true,
    trim: true,
  },
  isCover: {
    type: Boolean,
    default: false,
  },
});

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    images: {
      type: [productImageSchema],
      default: [],
    },
    colors: {
      type: [String],
      default: [],
    },
    sizes: {
      type: [String],
      enum: ["S", "M", "L", "XL", "XXL"],
      default: [],
    },
    price: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
