
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { z } from 'zod';

// Initialize Razorpay instance
// IMPORTANT: Replace with your actual Key ID and Key Secret in environment variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

// Zod schema for validating the request body
const orderSchema = z.object({
  amount: z.number().positive('Amount must be a positive number'),
  currency: z.string().default('INR'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedBody = orderSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json({ error: 'Invalid request body', details: parsedBody.error.flatten() }, { status: 400 });
    }

    const { amount, currency } = parsedBody.data;

    const options = {
      amount: amount * 100, // Amount in the smallest currency unit (e.g., paise for INR)
      currency,
      receipt: `receipt_order_${new Date().getTime()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    return NextResponse.json(order, { status: 200 });

  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
