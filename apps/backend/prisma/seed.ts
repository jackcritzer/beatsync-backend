import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding data...')

  // Create users
  const jack = await prisma.user.create({
    data: {
      email: 'jack@example.com',
      name: 'Jack Critzer',
      passwordHash: 'hashed-password-1',
    },
  })

  const friend = await prisma.user.create({
    data: {
      email: 'friend@example.com',
      name: 'Friend Rapper',
      passwordHash: 'hashed-password-2',
    },
  })

  // Create a project owned by Jack
  const project = await prisma.project.create({
    data: {
      name: 'New Collab Tape',
      description: 'An EP with three tracks',
      ownerId: jack.id,
    },
  })

  // Add friend as collaborator
  await prisma.projectCollaborator.create({
    data: {
      userId: friend.id,
      projectId: project.id,
    },
  })

  // Add credit for Friend
  await prisma.credit.create({
    data: {
      userId: friend.id,
      projectId: project.id,
      role: 'vocalist',
    },
  })

  // Add a comment from Jack
  await prisma.projectComment.create({
    data: {
      content: 'Let’s finish track 2 this week',
      projectId: project.id,
      authorId: jack.id,
    },
  })

  // Upload a file
  await prisma.file.create({
    data: {
      name: 'drum_loop_v1.wav',
      url: 'https://s3.example.com/drum_loop_v1.wav',
      type: 'stem',
      projectId: project.id,
      uploaderId: jack.id,
      approved: false,
    },
  })

  // Send a project message
  await prisma.projectMessage.create({
    data: {
      content: 'I just uploaded a new drum loop!',
      projectId: project.id,
      authorId: jack.id,
    },
  })

  console.log('✅ Seed complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })