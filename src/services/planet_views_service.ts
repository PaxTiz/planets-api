import planetRepository from '../repositories/planet_repository'
import repository from '../repositories/planet_views_repository'

export default {
    async upsert(planetId: number, userId: number, ip: string) {
        const planet = await planetRepository.findById(planetId)
        if (!planet) {
            return null
        }
        return repository.upsert(planetId, userId, ip)
    },
}
