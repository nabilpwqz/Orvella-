import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  PlusIcon,
  TagIcon,
  UploadIcon,
  LoaderIcon,
  LayersIcon,
  SparkleIcon,
  UserIcon,
} from "../../../components/common/Icons";
import { addPerfumes } from "../../../lib/actions/perfume";

interface ImgBBResponse {
  data: {
    url: string;
    display_url: string;
  };
  success: boolean;
  status: number;
}

interface PerfumeFormData {
  title: string;
  category: string;
  gender: "Men" | "Women" | "Unisex";
  scentNotes: string;
  price: number;
  shortDescription: string;
  fullDescription: string;
  imageUrl?: string;
}

const AddPerfume = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PerfumeFormData>({
    defaultValues: {
      gender: "Unisex",
    },
  });

  const selectedGender = watch("gender");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreviewImage(localPreview);

    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    if (!apiKey) {
      toast.error("ImgBB API Key is missing!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setImageUploading(true);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data: ImgBBResponse = await res.json();

      if (data.success) {
        setUploadedImageUrl(data.data.display_url);
        setValue("imageUrl", data.data.display_url);
        toast.success("Flacon visual uploaded successfully.");
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("ImgBB Upload Error:", error);
      toast.error("Error uploading image.");
    } finally {
      setImageUploading(false);
    }
  };

  const onSubmit = async (data: PerfumeFormData) => {
    if (!uploadedImageUrl && !data.imageUrl) {
      toast.error("Please provide or upload a flacon image!");
      return;
    }

    const finalData = {
      ...data,
      imageUrl: uploadedImageUrl || data.imageUrl,
      price: Number(data.price),
    };

    try {
      setIsSubmitting(true);
      const response = await addPerfumes(finalData);

      if (response && response.acknowledged) {
        toast.success("Fragrance added to Orvella collection.");
      } else {
        toast.success("Flacon catalog entry recorded.");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to save perfume.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-perf-bg w-full flex items-center justify-center p-3.5 sm:p-6 lg:p-8 text-perf-text-main">
      <div className="w-full max-w-5xl bg-perf-card border border-perf-border/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-xl my-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 space-y-1">
          <span className="uppercase tracking-[0.25em] sm:tracking-[0.3em] text-perf-gold text-xs font-semibold inline-flex items-center gap-1.5">
            <SparkleIcon size={12} />
            Orvella Atelier
          </span>
          <h1 className="text-2xl sm:text-3xl font-light font-serif-luxury text-perf-text-main">
            Catalog New Fragrance Creation
          </h1>
          <p className="text-xs text-perf-text-muted">
            Enter formulation details to publish into the Maison vault
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Row 1: Title & Gender Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-perf-text-main flex items-center gap-1.5">
                <TagIcon size={14} className="text-perf-gold" /> Flacon Title
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                type="text"
                placeholder="e.g., Orvella Noir Supreme"
                className="w-full bg-perf-input-bg border border-perf-border rounded-xl px-4 py-3 text-xs text-perf-text-main outline-none focus:border-perf-gold transition-colors"
              />
              {errors.title && (
                <span className="text-xs text-red-500">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-perf-text-main flex items-center gap-1.5">
                <UserIcon size={14} className="text-perf-gold" /> Identity Orientation
              </label>

              <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-0.5">
                {["Unisex", "Women", "Men"].map((genderVal) => (
                  <label
                    key={genderVal}
                    className={`flex items-center justify-center py-2.5 px-1.5 sm:px-3 rounded-xl border cursor-pointer transition-all text-[11px] sm:text-xs font-semibold uppercase tracking-tight sm:tracking-wider ${
                      selectedGender === genderVal
                        ? "bg-perf-gold text-white border-perf-gold shadow-xs"
                        : "bg-perf-input-bg border-perf-border text-perf-text-muted hover:border-perf-gold/50"
                    }`}
                  >
                    <input
                      type="radio"
                      value={genderVal}
                      {...register("gender", { required: true })}
                      className="hidden"
                    />
                    <span>{genderVal === "Women" ? "Femme" : genderVal === "Men" ? "Homme" : "Unisex"}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Concentration & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-perf-text-main flex items-center gap-1.5">
                <LayersIcon size={14} className="text-perf-gold" /> Concentration Tier
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full bg-perf-input-bg border border-perf-border rounded-xl px-4 py-3 text-xs text-perf-text-main outline-none focus:border-perf-gold transition-colors cursor-pointer"
              >
                <option value="">Select Concentration</option>
                <option value="Extrait de Parfum">Extrait de Parfum (28-35%)</option>
                <option value="Eau de Parfum">Eau de Parfum (20-25%)</option>
                <option value="Eau de Toilette">Eau de Toilette (15-18%)</option>
                <option value="Attar Oil">Pure Perfume Attar Oil</option>
              </select>
              {errors.category && (
                <span className="text-xs text-red-500">
                  {errors.category.message}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-perf-text-main">
                Price ($ USD)
              </label>
              <input
                {...register("price", {
                  required: "Price is required",
                  min: { value: 1, message: "Price must be greater than 0" },
                })}
                type="number"
                step="0.01"
                placeholder="285.00"
                className="w-full bg-perf-input-bg border border-perf-border rounded-xl px-4 py-3 text-xs text-perf-text-main outline-none focus:border-perf-gold transition-colors font-mono"
              />
              {errors.price && (
                <span className="text-xs text-red-500">
                  {errors.price.message}
                </span>
              )}
            </div>
          </div>

          {/* Row 3: Scent Profile & Short Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-perf-text-main flex items-center gap-1.5">
                <SparkleIcon size={14} className="text-perf-gold" /> Olfactory Notes Accord
              </label>
              <input
                {...register("scentNotes")}
                type="text"
                placeholder="Top: Bergamot | Heart: Saffron | Base: Amber, Cedar"
                className="w-full bg-perf-input-bg border border-perf-border rounded-xl px-4 py-3 text-xs text-perf-text-main outline-none focus:border-perf-gold transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-perf-text-main">
                Atmospheric Summary
              </label>
              <input
                {...register("shortDescription", {
                  required: "Short description is required",
                })}
                type="text"
                placeholder="e.g., A fragrance that stays after you leave..."
                className="w-full bg-perf-input-bg border border-perf-border rounded-xl px-4 py-3 text-xs text-perf-text-main outline-none focus:border-perf-gold transition-colors"
              />
              {errors.shortDescription && (
                <span className="text-xs text-red-500">
                  {errors.shortDescription.message}
                </span>
              )}
            </div>
          </div>

          {/* Row 4: Full Scent Narrative */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-perf-text-main">
              Full Composition Narrative
            </label>
            <textarea
              {...register("fullDescription", {
                required: "Full description is required",
              })}
              rows={4}
              placeholder="Elaborate the olfactory development, maceration timeline, and emotional resonance..."
              className="w-full bg-perf-input-bg border border-perf-border rounded-xl px-4 py-3 text-xs text-perf-text-main outline-none focus:border-perf-gold transition-colors resize-none"
            />
            {errors.fullDescription && (
              <span className="text-xs text-red-500">
                {errors.fullDescription.message}
              </span>
            )}
          </div>

          {/* Row 5: Flacon Image Upload */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-perf-text-main flex items-center gap-1.5">
              <UploadIcon size={14} className="text-perf-gold" /> Flacon Photography
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <label className="sm:col-span-2 flex flex-col items-center justify-center border-2 border-dashed border-perf-border hover:border-perf-gold rounded-2xl p-5 bg-perf-input-bg cursor-pointer transition text-center group">
                {imageUploading ? (
                  <div className="flex flex-col items-center py-1">
                    <LoaderIcon size={22} className="text-perf-gold mb-1" />
                    <span className="text-xs text-perf-text-muted">
                      Uploading to atelier archive...
                    </span>
                  </div>
                ) : uploadedImageUrl ? (
                  <div className="flex items-center gap-2 text-perf-gold font-semibold text-xs py-1">
                    <SparkleIcon size={16} />
                    <span>Visual Uploaded Successfully</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <UploadIcon size={22} className="text-perf-gold mb-1" />
                    <span className="text-xs font-semibold text-perf-text-main">
                      Upload high-resolution bottle visual
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              <div className="h-28 border border-perf-border rounded-2xl bg-perf-input-bg flex items-center justify-center overflow-hidden">
                {previewImage || uploadedImageUrl ? (
                  <img
                    src={previewImage || uploadedImageUrl}
                    alt="Flacon Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-perf-text-muted">No Image</span>
                )}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || imageUploading}
              className="w-full flex items-center justify-center gap-2 bg-perf-gold hover:opacity-90 text-white font-semibold py-3.5 px-6 rounded-xl transition duration-300 shadow-md disabled:opacity-60 cursor-pointer text-xs uppercase tracking-[0.2em]"
            >
              {isSubmitting ? (
                <>
                  <LoaderIcon size={16} />
                  <span>Recording Formulation...</span>
                </>
              ) : (
                <>
                  <PlusIcon size={16} />
                  <span>Publish Flacon to Orvella Vault</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddPerfume;
