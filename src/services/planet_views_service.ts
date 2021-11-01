// import { Equal, getRepository } from "typeorm";
// import Planet from "../entities/Planet";
// import PlanetViews from "../entities/PlanetViews";
// import User from "../entities/User";

// export default class PlanetViewsRepository {

//     static async findByPlanetAndUserOrIp(planet: Planet, user: User|null, ip: string|null): Promise<PlanetViews | undefined> {
//         return await getRepository(PlanetViews).findOne({
//             where: [
//                 { planet, user },
//                 { planet, ip },
//             ]
//         })
//     }

// }