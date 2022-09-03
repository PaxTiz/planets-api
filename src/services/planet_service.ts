import prisma from '../client'

export type FindAllInterface = {
    galaxy?: boolean
}

export default {
    findById(id: string) {
        return prisma.planet.findUnique({ where: { id } })
    },

    async findAll(options: FindAllInterface) {
        return prisma.planet.findMany({
            include: { galaxy: options.galaxy },
        })
    },
}
