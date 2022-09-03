import prisma from '../client'

export default {
    findByName(name: string) {
        return prisma.role.findFirstOrThrow({
            where: { name },
        })
    },
}
