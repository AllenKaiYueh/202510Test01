'use server';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, content } = body;

  const supabase = await createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );

  const { error } = await supabase
    .from("Article")
    .insert({ title: title, content: content });
  
  return new Response(JSON.stringify({
    message: 'Create Success'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
  
}
