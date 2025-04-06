'use server';

import { cookies } from 'next/headers';

export async function getSubdomain() {
  const cookieStore = await cookies();
  const subdomain = cookieStore.get('subdomain')?.value;
  return subdomain || 'default';
}
