'use server';
import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
    const supabase = await createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );

    const { data, error  } = await supabase.from("Article").select("*");

    if (data) {
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function POST(request: NextRequest) {
    const supabase = await createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );

    const body = await request.json();
    const { title } = body;

    const { data, error  } = await supabase
        .from("Article")
        .select("*")
        .like('title', '%' + title + '%');

    if (data) {
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}