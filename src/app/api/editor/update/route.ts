import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'

const prisma = new PrismaClient()

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { editorId, data } = await req.json()

  if (!editorId || !data) {
    return NextResponse.json({ message: 'Missing editorId or data' }, { status: 400 })
  }

  try {
    const updatedEditor = await prisma.editor.update({
      where: { id: editorId, userId: session.user.id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })
    return NextResponse.json(updatedEditor, { status: 200 })
  } catch (error) {
    console.error('Failed to update editor:', error)
    return NextResponse.json({ message: 'Failed to update editor' }, { status: 500 })
  }
}
