import { connectDB } from '@/lib/db';
import { School } from '@/models/School';

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const school = searchParams.get('school');

  if (!school) {
    return Response.json({ error: 'Missing school name', success: false }, { status: 400 });
  }

  const schoolData = await School.findOne({ subdomain: school });

  if (!schoolData) {
    return Response.json({ error: 'School not found', success: false }, { status: 404 });
  }

  return Response.json(schoolData, { status: 200 });
}


