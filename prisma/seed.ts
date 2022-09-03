import { PrismaClient } from '.prisma/client'
import Logger from '../src/utils/logger'

const client = new PrismaClient()

const truncate = async () => {
    Logger.info('Delete users')
    await client.user.deleteMany()

    Logger.info('Delete roles')
    await client.role.deleteMany()

    Logger.info('Delete planets')
    await client.planet.deleteMany()

    Logger.info('Delete galaxies')
    await client.galaxy.deleteMany()

    Logger.info('Delete quizz categories')
    await client.quizz_categories.deleteMany()
}

const seed = async () => {
    return truncate().then(async () => {
        Logger.info('Create galaxies')
        await client.galaxy.createMany({
            data: [
                { name: 'Voie lactée', description: '', image: '' },
                { name: 'Galaxy du tourbillon', description: '', image: '' },
                { name: 'Objet de Hoag', description: '', image: '' },
                { name: 'I Zwicky 18', description: '', image: '' },
            ],
        })
        const milkyWay = await client.galaxy.findFirstOrThrow({
            where: { name: 'Voie lactée' },
            select: { id: true },
        })

        Logger.info('Create planets')
        await client.planet.createMany({
            data: [
                {
                    name: 'Mercure',
                    description: 'Mercure',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Mercury_in_color_-_Prockter07_centered.jpg',
                    galaxyId: milkyWay.id,
                },
                {
                    name: 'Venus',
                    description: 'Venus',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg',
                    galaxyId: milkyWay.id,
                },
                {
                    name: 'Terre',
                    description: 'Terre',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg',
                    galaxyId: milkyWay.id,
                },
                {
                    name: 'Mars',
                    description: 'Mars',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg',
                    galaxyId: milkyWay.id,
                },
                {
                    name: 'Jupiter',
                    description: 'Jupiter',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg',
                    galaxyId: milkyWay.id,
                },
                {
                    name: 'Saturne',
                    description: 'Saturne',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg',
                    galaxyId: milkyWay.id,
                },
                {
                    name: 'Uranus',
                    description: 'Uranus',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Uranus_true_colour.jpg',
                    galaxyId: milkyWay.id,
                },
                {
                    name: 'Neptune',
                    description: 'Neptune',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg',
                    galaxyId: milkyWay.id,
                },
            ],
        })

        Logger.info('Create roles')
        await client.role.create({
            data: {
                name: 'default',
                displayName: 'Member',
            },
        })

        Logger.info('Create quizz categories')
        await client.quizz_categories.createMany({
            data: [
                { name: 'Planet' },
                { name: 'Galaxy' },
                { name: 'Constellation' },
                { name: 'Universe' },
                { name: 'Space Exploration' },
                { name: 'Important People' },
            ],
        })
    })
}

const main = async () => {
    Logger.info('Start seeding')
    return seed()
}

main()
    .then(() => {
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
