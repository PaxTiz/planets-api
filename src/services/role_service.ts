import prisma from '../client'

export default {
    findByName(name: string) {
        return prisma.role.findFirst({
            where: { name },
            rejectOnNotFound: true,
        })
    },
}
