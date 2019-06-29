
exports.up = function(knex) {
    return knex.schema.createTable('actions', function (tbl) {
        tbl.increments();

        tbl.string('description', 256);

        tbl.string('notes', 512);

        tbl.boolean('completed', false);

        tbl
            .integer('project_id')
            .notNullable()
            .references('id')
            .inTable('projects');
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('actions');
};
