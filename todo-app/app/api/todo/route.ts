import { pb } from '@/lib/config';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const record = await pb.collection('todos').create(data);

    return NextResponse.json(record, { status: 200 });
  } catch (error) {
    console.error("Error mutate todo:", error);
    return NextResponse.error();
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const keyword = url.searchParams.get('keyword')

    const records = await pb.collection('todos').getFullList({
      sort: '-created',
      filter: `title~'${keyword}'`,
      expand: 'assign',
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