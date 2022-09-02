import prisma from '../client'

export default {
    findById(id: number) {
        return prisma.planet.findUnique({ where: { id } })
    },

    async findAll(includeGalaxy: boolean) {
        return prisma.planet.findMany({
            include: { galaxy: includeGalaxy },
        })
    },
}
