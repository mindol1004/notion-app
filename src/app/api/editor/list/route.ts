import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const editors = await prisma.editor.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' },
    })
    return NextResponse.json(editors, { status: 200 })
  } catch (error) {
    console.error('Failed to fetch editors:', error)
    return NextResponse.json({ message: 'Failed to fetch editors' }, { status: 500 })
  }
}
