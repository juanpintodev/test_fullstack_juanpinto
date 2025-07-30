import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: "OK",
    message: "Task List Frontend is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
} 