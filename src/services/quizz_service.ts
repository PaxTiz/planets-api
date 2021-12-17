import { quizz, quizz_categories } from "@prisma/client"
import prisma from "../client"

/**
 * Fetch all quizz
 */
const findAll = async (): Promise<Array<quizz>> => {
    return await prisma.quizz.findMany({
        include: { category: true }
    })
}

/**
 * Fetch all quizz categories
 */
 const findAllCategories = async (): Promise<Array<quizz_categories>> => {
    return await prisma.quizz_categories.findMany()
}

/**
 * Used to sort all quizz by a column
 * 
 * @param column the table column used to sort
 * @returns all quizz sorted by the column passed in parameter
 */
const sortedBy = async (column: string): Promise<Array<quizz>> => {
    return await prisma.quizz.findMany({
        orderBy: { [column]: 'DESC' }
    })
}

export default { 
    findAll,
    findAllCategories,
    sortedBy
 }
