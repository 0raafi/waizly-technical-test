import { pb } from '@/lib/config';
import { NextResponse } from 'next/server';

export async function GET(request: any) {
  try {
    const records = await pb.collection('profiles').getFullList({
      sort: '-created',
    });

    return NextResponse.json(
      {
        records
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user list:", error);
    return NextResponse.error();
  }
}