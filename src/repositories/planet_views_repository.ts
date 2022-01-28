import { planet_views as PlanetView } from '@prisma/client'
import prisma from '../client'

const findByPlanetAndUserOrIp = async (
    planet: number,
    user: number,
    ip: string,
): Promise<PlanetView | null> => {
    return await prisma.planet_views.findFirst({
        where: {
            ip,
            planetId: planet,
            userId: user,
        },
        include: { planet: true, user: true },
    })
}

const upsert = async (planet: number, user: number, ip: string): Promise<PlanetView> => {
    const pv = await findByPlanetAndUserOrIp(planet, user, ip)
    if (pv) {
        return await prisma.planet_views.update({
            data: {
                count: { increment: 1 },
            },
            where: {
                id: pv?.id,
            },
            include: { planet: true, user: true },
        })
    }

    return await prisma.planet_views.create({
        data: {
            ip,
            planetId: planet,
            userId: user,
        },
        include: { planet: true, user: true },
    })
}

export default {
    findByPlanetAndUserOrIp,
    upsert,
}
