import { planet } from "@prisma/client"
import prisma from "../client"

/**
 * Fetch planets and returns data with their galaxy
 */
const findAll = async (): Promise<Array<planet>> => {
    return await prisma.planet.findMany({
        include: { galaxy: true }
    })
}

/**
 * Used to sort all planet by a column
 * 
 * @param column the table column used to sort
 * @returns all planets sorted by the column passed in parameter
 */
const sortedBy = async (column: string): Promise<Array<planet>> => {
    return await prisma.planet.findMany({
        orderBy: { [column]: 'DESC' }
    })
}

export default { 
    findAll,
    sortedBy
 }
