exports.up = function(knex, Promise) {
  return knex.schema.alterTable('milestones', function(t) {
    t.integer('famous_person_id').references('famous_people.id');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('milestones', function(t) {
    t.dropForeign('famous_person_id');
  });
};