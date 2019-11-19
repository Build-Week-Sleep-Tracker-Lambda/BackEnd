const db = require ('../data/dbConfig.js');

module.exports = {
    add, 
    find,
    findBy,
    findById,
    remove, 
    update
};

function find() {
    return db('users').select('id', 'username');
}

function findBy(filter) {
    return db('users').where(filter);
};
function add(user) {
    return db('users')
    .insert(user, 'id');
}
function findById(id) {
    return db('users')
    .where({id})
    .first();
};

function remove(id) {
    return db('users')
    .where({id})
    .first()
    .delete();
};

function update(user, id) {
    return db('users')
    .where({id})
    .update(user);
}

// const db = require('../data/dbConfig.js')

// module.exports = {
//     register,
//     findById,
//     find,
//     findBy
// }

// async function register(user) {
//     const [id] = await db('users').insert(user);

//     return findById(id);
// }

// function findById(id){
//     return db('users')
//     .where({ id })
//     .first();
// }

// function find(){
//     return db('users').select('id', 'username', 'password');
// }

// function findBy(filter) {
//     return db('users').where(filter);
// }

