import { user } from '@prisma/client'
import prisma from '../client'
import roleService from './role_service'

export type UserCreateInteface = {
    username: string
    password: string
    email: string
}

export default {
    safeUser(user: user) {
        return { ...user, password: undefined }
    },

    async exists(column: string, value: any) {
        return prisma.user.count({ where: { [column]: value } }).then((exists) => exists > 0)
    },

    findOneBy(column: string, value: any) {
        return prisma.user.findFirst({
            where: { [column]: value },
            include: { role: true },
        })
    },

    async create(user: UserCreateInteface) {
        const role = await roleService.findByName('default')
        return prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                password: user.password,
                roleId: role.id,
            },
            include: { role: true },
        })
    },
}
