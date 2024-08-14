import { pb } from '@/lib/utils';
import { NextResponse } from "next/server";

export async function POST(request: any) {

  try {
    const data = await request.json();
    const record = await pb.collection('todos').create(data);

    return NextResponse.json(record, { status: 200 });
  } catch (error) {
    console.error("Error mutate todo:", error);
    return NextResponse.error();
  }
}