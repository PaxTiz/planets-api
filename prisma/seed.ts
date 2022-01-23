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
    Logger.info('Delete constellations')
    await client.constellation.deleteMany()
    Logger.info('Delete quizz categories')
    await client.quizz_categories.deleteMany()
}

const seed = async () => {
    return await truncate().then(async () => {
        Logger.info('Create constellations')
        await client.constellation.create({
            data: {
                name: 'Human',
            },
        })

        Logger.info('Create galaxies')
        const galaxy = await client.galaxy.createMany({
            data: [
                { name: 'Voie lactée' },
                { name: 'Galaxy du tourbillon' },
                { name: 'Objet de Hoag' },
                { name: 'I Zwicky 18' },
            ],
        })
        const milkyWay = await client.galaxy.findFirst({
            where: { name: 'Voie lactée' },
            select: { id: true },
        })
        if (milkyWay) {
            Logger.info('Create planets')
            await client.planet.createMany({
                data: [
                    {
                        name: 'Mercure',
                        description:
                            "Mercure est l'une des quatre planètes telluriques du Système solaire, et possède un corps rocheux comme la Terre. C'est également la plus petite, avec un rayon équatorial de 2 439,7 km. Mercure est également plus petite — bien que plus massive — que deux satellites naturels du Système solaire, Ganymède et Titan.",
                        composition: null,
                        distance: 58000000,
                        distance_unit: 'km',
                        image: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Mercury_in_color_-_Prockter07_centered.jpg',
                        galaxyId: milkyWay.id,
                    },
                    {
                        name: 'Venus',
                        description:
                            "Vénus est la deuxième planète du Système solaire par ordre d'éloignement au Soleil, et la sixième plus grosse aussi bien par la masse que le diamètre. Elle doit son nom à la déesse romaine de l'amour. Vénus orbite autour du Soleil tous les 224,7 jours terrestres.",
                        composition: null,
                        distance: 108000000,
                        distance_unit: 'km',
                        image: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg',
                        galaxyId: milkyWay.id,
                    },
                    {
                        name: 'Terre',
                        description:
                            "La Terre est la troisième planète par ordre d'éloignement au Soleil et la cinquième plus grande du Système solaire aussi bien par la masse que le diamètre. Par ailleurs, elle est le seul objet céleste connu pour abriter la vie",
                        composition: null,
                        distance: 152000000,
                        distance_unit: 'km',
                        image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg',
                        galaxyId: milkyWay.id,
                    },
                    {
                        name: 'Mars',
                        description:
                            'Mars est la quatrième planète du Système solaire par ordre croissant de la distance au Soleil et la deuxième par ordre croissant de la taille et de la masse. Son éloignement au Soleil est compris entre 1,381 et 1,666 UA, avec une période orbitale de 669,58 jours martiens.',
                        composition: null,
                        distance: 227939200,
                        distance_unit: 'km',
                        image: 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg',
                        galaxyId: milkyWay.id,
                    },
                    {
                        name: 'Jupiter',
                        description:
                            "Jupiter est la cinquième planète du Système solaire par ordre d'éloignement au Soleil, et la plus grande par la taille et la masse devant Saturne, qui est comme elle une planète géante gazeuse.",
                        composition: null,
                        distance: 778600000,
                        distance_unit: 'km',
                        image: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg',
                        galaxyId: milkyWay.id,
                    },
                    {
                        name: 'Saturne',
                        description:
                            "Saturne est la sixième planète du Système solaire par ordre d'éloignement au Soleil, et la deuxième plus grande par la taille et la masse après Jupiter, qui est comme elle une planète géante gazeuse.",
                        composition: null,
                        distance: 1430000000,
                        distance_unit: 'km',
                        image: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg',
                        galaxyId: milkyWay.id,
                    },
                    {
                        name: 'Uranus',
                        description:
                            "Uranus est la septième planète du Système solaire par ordre d'éloignement au Soleil. Elle orbite autour de celui-ci à une distance d'environ 19,2 unités astronomiques, avec une période de révolution de 84,05 années terrestres.",
                        composition: null,
                        distance: 2800000000,
                        distance_unit: 'km',
                        image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Uranus_true_colour.jpg',
                        galaxyId: milkyWay.id,
                    },
                    {
                        name: 'Neptune',
                        description:
                            "Neptune est la huitième planète par ordre d'éloignement au Soleil et la plus éloignée connue du Système solaire. Elle orbite autour du Soleil à une distance d'environ 30,1 UA, avec une excentricité orbitale moitié moindre que celle de la Terre et une période de révolution de 164,79 ans.",
                        composition: null,
                        distance: 4500000000,
                        distance_unit: 'km',
                        image: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg',
                        galaxyId: milkyWay.id,
                    },
                ],
            })
        }

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
    return seed().catch((e: Error) => e)
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
