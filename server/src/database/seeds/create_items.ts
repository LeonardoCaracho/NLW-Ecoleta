import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('items').insert([
        {   title: 'Lâmpadas', image: 'lampada.svg' },
        {   title: 'Pilhas e baterias', image: 'bateria.svg' },
        {   title: 'Papéis e papelão', image: 'papeis-papelao.svg' },
        {   title: 'Resíduos eletrônicos', image: 'eletronicos.svg' },
        {   title: 'Resíduos orgânicos', image: 'organicos.svg' },
        {   title: 'Óleo de cozinha', image: 'oleo.svg' },
    ])
}