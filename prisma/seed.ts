import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed example directory recipe (foundation only)
  await prisma.directoryRecipe.upsert({
    where: { slug: 'example-recipe' },
    update: {},
    create: {
      slug: 'example-recipe',
      title: 'Example Recipe',
      description: 'This is a placeholder recipe for the directory foundation.',
      cuisine: 'American',
      difficulty: 'Easy',
      timeMinutes: 30,
      ingredientsJson: [
        { name: 'Ingredient 1', amount: '1 cup', notes: '' },
        { name: 'Ingredient 2', amount: '2 tbsp', notes: '' },
      ],
      stepsJson: [
        { step: 1, instruction: 'Do step 1' },
        { step: 2, instruction: 'Do step 2' },
      ],
    },
  })

  console.log('Seed completed')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
