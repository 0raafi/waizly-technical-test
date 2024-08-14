import { pb } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function GET(request: any) {
  try {
    const records = await pb.collection('users').getFullList({
      sort: '-created',
    });

    return NextResponse.json(
      {
        records
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching event list:", error);
    // Return an error response if fetching the event list fails
    return NextResponse.error();
  }
}