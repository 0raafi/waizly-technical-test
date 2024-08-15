import { pb } from '@/lib/config';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const record = await pb.collection('todos').create(data);

    return NextResponse.json(record, { status: 200 });
  } catch (error) {
    console.error('Error mutate todo:', error);
    return NextResponse.error();
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const keyword = url.searchParams.get('keyword');
    const status = url.searchParams.get('status');
    const priority = url.searchParams.get('priority');
    const assign = url.searchParams.get('assign');

    let filterString = '';

    if (keyword) {
      filterString += `title~'${keyword}'`;
    }

    if (status) {
      filterString += filterString ? `&& status='${status}'` : `status='${status}'`;
    }

    if (priority) {
      filterString += filterString ? `&& priority='${priority}'` : `priority='${priority}'`;
    }

    if (assign) {
      filterString += filterString ? `&& assign='${assign}'` : `assign='${assign}'`;
    }

    const records = await pb.collection('todos').getFullList({
      sort: '-created',
      filter: filterString,
      expand: 'assign',
    });

    return NextResponse.json(
      {
        records
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching todo list:', error);
    return NextResponse.error();
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json();
    const record = await pb.collection('todos').update(data.id, data);

    return NextResponse.json(record, { status: 200 });
  } catch (error) {
    console.error('Error mutate patch todo:', error);
    return NextResponse.error();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const data = await request.json();
    const record = await pb.collection('todos').delete(data.id);

    return NextResponse.json(record, { status: 200 });
  } catch (error) {
    console.error('Error mutate delete todo:', error);
    return NextResponse.error();
  }
}
