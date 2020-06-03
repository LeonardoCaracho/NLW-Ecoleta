import { Response, Request } from 'express';
import knex from '../database/connection'

class PointsController {
    async create(req: Request, res: Response) {
        const { 
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
         } = req.body
         //garante que se a segunda query não executar a primeira também não vai
         const trx = await knex.transaction() 

         const point = {
            name,
            email,
            image: 'https://images.unsplash.com/photo-1546209705-a7eba4e8da21?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            whatsapp,
            latitude,
            longitude,
            city,
            uf
         }
    
         const insertedIds = await trx('points').insert(point)
    
         const point_id = insertedIds[0]
    
         const pointItems = items.map((item_id: number) => ({
             item_id,
             point_id
         }))
    
         await trx('point_items').insert(pointItems)

         await trx.commit()
    
         return res.json({
            id: point_id,
            ...point
         })
    }

    async show(req: Request, res: Response){
        const { id } = req.params

        const point = await knex.table('points').where('id', id).first()

        if (!point){
            return res.status(400).json({ message: 'Point not found' })
        }

        /**
         * select * from items
         * join point_items on items_id = point_items.item_id
         * where point_items.point_id = id
         */

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title')

        return res.json({ point, items })
    }

    async index(req: Request, res: Response){
        const { city, uf, items } = req.query

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()))
        
        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*')
        
        return res.json(points)
    }

}

export default PointsController