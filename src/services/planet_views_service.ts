import prisma from '../client'
import planetService from './planet_service'

export default {
    findByPlanetAndUserOrIp(planet: number, user: number, ip: string) {
        return prisma.planet_views.findFirst({
            where: {
                ip,
                planetId: planet,
                userId: user,
            },
            include: { planet: true, user: true },
        })
    },

    async upsert(planetId: number, userId: number, ip: string) {
        const planet = await planetService.findById(planetId)
        if (!planet) {
            return null
        }

        const pv = await this.findByPlanetAndUserOrIp(planetId, userId, ip)
        if (pv) {
            return prisma.planet_views.update({
                data: {
                    count: { increment: 1 },
                },
                where: {
                    id: pv?.id,
                },
                include: { planet: true, user: true },
            })
        }

        return prisma.planet_views.create({
            data: { ip, planetId, userId },
            include: { planet: true, user: true },
        })
    },
}
