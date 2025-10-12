'use server';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  const supabase = await createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (data.user == null) {
    return new Response(JSON.stringify({
      message: 'Login failed'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    console.log(data.session.access_token);
    return new Response(JSON.stringify({
      message: 'Login Success',
      email: data.user.email,
      id: data.user.id
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
}
