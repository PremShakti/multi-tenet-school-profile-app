import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      name: string;
      email: string;
      [key: string]: any;
    };

    return Response.json({
      name: decoded.name,
      email: decoded.email,
      success: true,
    });
  } catch (err) {
    return Response.json({ error: 'Invalid token' }, { status: 401 });
  }
}
