
const db = require('../data/dbConfig.js');


module.exports = {
    add,
    find,
    findBy,
    findById,
    remove,
    update,
    findPropertiesByUserId,
    findSleep,
    addSleep,
    findId
};

function find() {
    return db('sleep').select('id', 'bedTime', 'wakeTime', 'mood');
}

function findBy(filter) {
    return db('sleep').where(filter);
};
function add(data, id) {
    return db('sleep')
        .insert({ ...data, user_id: id });
}
function findById(user_id) {
    return db('sleep')
        .where({ user_id })
        .first();
};

function findId(id) {
    return db('sleep')
        .where({ id })
        .first();
};

async function findPropertiesByUserId(id) {
    const properties = await db('sleep').where({ user_id: id });
    console.log(properties)
    return properties;
}
function remove(id) {
    return db('sleep')
        .where({ id })
        .first()
        .delete();
};

function update(id, sleep) {
    return db('sleep')
        .where({ id })
        .update(sleep);
}

function findSleep(id) {
    return db("sleep")
        .join("users", "sleep.user_id", "users.id")
        .select(
            "sleep.id",
            "sleep.mood",
            "sleep.wakeTime",
            "sleep.bedTime",
            "users.username"
        )
        .orderBy("sleep.user_id")
        .where({ "sleep.user_id": id });
}

function addSleep(sleep) {
    return db("users")
        .insert(sleep)
        .then(ids => {
            return { id: ids[0] };
        });
}