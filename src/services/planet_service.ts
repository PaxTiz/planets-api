import repository from '../repositories/planet_repository'

export default {
    async findAll(includeGalaxy: boolean) {
        return repository.findAll(includeGalaxy)
    },
}
