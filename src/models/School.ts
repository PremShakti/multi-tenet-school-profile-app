import mongoose from 'mongoose';

const SchoolSchema = new mongoose.Schema({
  subdomain: { type: String, unique: true },
  name: String,
  description: String,
  contact: String,
});

export const School =
  mongoose.models.School || mongoose.model('School', SchoolSchema);



 



