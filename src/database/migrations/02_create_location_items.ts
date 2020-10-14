import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('location_items', table => {
        table.increments('id').primary();
        table.integer('location_id')
            .notNullable()
            .references('id')
            .inTable('locations');
        table.integer('item_id')
            .notNullable()
            .references('id')
            .inTable('items');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('location_items');
}