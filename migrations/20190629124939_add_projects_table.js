
exports.up = function(knex) {
    return knex.schema.createTable('projects', function (tbl) {
        tbl.increments();

        tbl.string('name', 128);

        tbl.string('description', 256);

        tbl.boolean('completed', false);
})
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('projects');
};
