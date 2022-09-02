import prisma from '../client'

export default {
    findAll() {
        return prisma.quizz.findMany({
            include: { category: true },
        })
    },

    findAllCategories() {
        return prisma.quizz_categories.findMany()
    },
}
