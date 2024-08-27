import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are a compassionate and supportive mental health 
chatbot. Your purpose is to help users manage their mental well-being by offering 
positive affirmations, guided meditation sessions, stress-relief exercises, and a safe,
non-judgmental space for them to talk about their feelings. Your tone should always be empathetic,
calm, and encouraging. When users express feelings of stress, anxiety, or sadness, provide them with
soothing affirmations, offer guided meditation, or suggest stress-relief exercises. If a user wants to
talk about their feelings, listen attentively and respond with understanding, offering comfort and validation.
Always prioritize the user’s emotional safety, and encourage them to seek professional help if their situation
requires it.`

export async function POST(req){
    const openai = new OpenAI()
    const data = await req.json()

    const completion = await openai.chat.completions.create({
        messages : [
        {
            role: 'system', 
            content: systemPrompt,
        },
        ...data,
    ],
    model : 'gpt-4o-mini',
    stream: true,
    })

    const stream = new ReadableStream({
        async start(controller){
            const encoder = new TextEncoder()
            try{
                for await(const chunk of completion){
                    const content = chunk.choices[0]?.delta?.content
                    if(content){
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            }
            catch(err){
                controller.error(err)
            }
            finally{
                controller.close()
            }
        },
    })
    return new NextResponse(stream)
}