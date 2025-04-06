import { connectDB } from '@/lib/db';
import { School } from '@/models/School';

export async function PUT(req: Request) {
  await connectDB();

  const { subdomain, name, description, contact } = await req.json();

  if (!subdomain || !name || !description || !contact) {
    return Response.json({ error: 'Missing fields', success: false }, { status: 400 });
  }

  const updated = await School.findOneAndUpdate(
    { subdomain },
    { name, description, contact },
    { new: true }
  );

  if (!updated) {
    return Response.json({ error: 'School not found', success: false }, { status: 404 });
  }

  return Response.json({ data: updated, success: true }, { status: 200 });
}
