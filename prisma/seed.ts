import { PrismaClient } from ".prisma/client"
import Logger from "../src/utils/logger"

const client = new PrismaClient()

const truncate = async () => {
    await client.user.deleteMany()
    await client.role.deleteMany()
    await client.planet.deleteMany()
    await client.galaxy.deleteMany()
    await client.constellation.deleteMany()
}

const seed = () => {
    truncate().then(async () => {
        const constellation = await client.constellation.create({
            data: {
                name: 'Human'
            }
        })
        const galaxy = await client.galaxy.create({
            data: {
                name: 'Milky Way',
                constellationId: constellation.id,
            }
        })
        const planet = await client.planet.create({
            data: {
                name: 'Earth',
                description: 'Where human lives',
                composition: null,
                distance: 0,
                distance_unit: 'km',
                image: 'earth.png',
                galaxyId: galaxy.id,
            }
        })
    
        await client.role.create({
            data: {
                name: 'default',
                displayName: 'Member'
            }
        })
    })
}

const main = async () => {
    Logger.info('Start seeding')
    try {
        seed()
    } catch (e) {
        return Promise.reject(e)
    }
}

main().then(() => {
    Logger.info('Database seeded successfully')
})
.catch((e) => {
    Logger.error('Failed to seed database because :')
    Logger.error(e)
})
.finally(() => {
    Logger.info('End seeding')
    client.$disconnect()
})