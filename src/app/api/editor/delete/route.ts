import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'

const prisma = new PrismaClient()

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { editorId } = await req.json()

  if (!editorId) {
    return NextResponse.json({ message: 'Missing editorId' }, { status: 400 })
  }

  try {
    await prisma.editor.delete({
      where: { id: editorId, userId: session.user.id },
    })
    return NextResponse.json({ message: 'Editor deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Failed to delete editor:', error)
    return NextResponse.json({ message: 'Failed to delete editor' }, { status: 500 })
  }
}
