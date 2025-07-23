import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      enum: ['hero', 'about', 'service', 'cta', 'ourworks', 'ourclients'], // ✅ allow 'cta'
      required: true,
    },
    publicId: {
      type: String,
      required: true,
      unique: true,
    },
    resourceType: {
      type: String,
      enum: ['image', 'video'],
      required: function () {
        return this.section !== 'cta'; // ✅ skip for links
      },
    },
    secureUrl: {
      type: String,
      required: function () {
        return this.section !== 'cta'; // ✅ skip for links
      },
    },
    width: Number,
    height: Number,
    type: {
      type: String,
      enum: ['image', 'video', 'link'],
      default: 'image',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Media || mongoose.model('Media', mediaSchema);
