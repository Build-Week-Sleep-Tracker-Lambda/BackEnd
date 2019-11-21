
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sleep').del().truncate()
    .then(function () {
      // Inserts seed entries
      return knex('sleep').insert([
        {bedTime: '7:00', wakeTime: '10:00', mood: 1, user_id: 1},
        {bedTime: '8:00', wakeTime: '11:00', mood: 2, user_id: 2},
        {bedTime: '9:00', wakeTime: '12:00', mood: 4, user_id: 3}

        // {bedTime: '7:00', wakeTime: '10:00', mood: 1} ,
        // {bedTime: '8:00', wakeTime: '11:00', mood: 2},
        // {bedTime: '9:00', wakeTime: '12:00', mood: 4}
      ]);
    });
};
