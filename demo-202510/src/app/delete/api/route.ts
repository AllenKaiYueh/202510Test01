'use server';
import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function DELETE(request: NextRequest) {
    const body = await request.json();
    const { id } = body;

    const supabase = await createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );

    const response = await supabase
        .from('Article')
        .delete()
        .eq('id', id);

    return new Response(JSON.stringify({
      message: 'Delete successful'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
}