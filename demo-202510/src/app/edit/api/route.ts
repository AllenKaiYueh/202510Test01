'use server';
import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
    const supabase = await createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const { data, error  } = await supabase
        .from("Article")
        .select("*")
        .eq('id', id);

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
    const { id, title, content } = body;

    const { error  } = await supabase
        .from("Article")
        .update({
            title: title,
            content: content
        })
        .eq('id', id);

    if (!error) {
        return new Response(JSON.stringify({
            message: 'Update successful'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}