import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { title } = await req.json()

  try {
    const newEditor = await prisma.editor.create({
      data: {
        userId: session.user.id,
        title: title || 'Untitled',
        content: '',
      },
    })
    return NextResponse.json(newEditor, { status: 201 })
  } catch (error) {
    console.error('Failed to create editor:', error)
    return NextResponse.json({ message: 'Failed to create editor' }, { status: 500 })
  }
}
