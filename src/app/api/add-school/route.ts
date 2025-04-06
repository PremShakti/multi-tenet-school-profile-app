import { connectDB } from "@/lib/db";
import { School } from "@/models/School";

export async function POST(req: Request) {
    await connectDB();
  
    const { name, description, contact, subdomain } = await req.json();
  
    if (!name || !description || !contact || !subdomain) {
      return Response.json({ error: 'Missing required fields', success: false }, { status: 400 });
    }
  
    const existing = await School.findOne({ subdomain });
  
    if (existing) {
      return Response.json({ error: 'School with this subdomain already exists', success: false }, { status: 409 });
    }
  
    const newSchool = new School({ name, description, contact, subdomain });
    await newSchool.save();
  
    return Response.json(newSchool, { status: 201 });
  }