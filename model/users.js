const uuidv1 = require('uuid/v1')
const tcomb = require('tcomb')
const bcrypt = require('bcrypt')


const USER = tcomb.struct({
    id: tcomb.String,
    name: tcomb.String,
    login: tcomb.String,
    age: tcomb.Number,
    password: tcomb.String
}, {strict: true})

const users = [
    {
        id: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
        name: 'Pedro Ramirez',
        login: 'pedro',
        age: 44,
        password:bcrypt.hashSync('koukou',15)
    }, {
        id: '456897d-98a8-78d8-4565-2d42b21b1a3e',
        name: 'Jesse Jones',
        login: 'jesse',
        age: 48,
        
    }, {
        id: '987sd88a-45q6-78d8-4565-2d42b21b1a3e',
        name: 'Rose Doolan',
        login: 'rose',
        age: 36,
       
    }, {
        id: '654de540-877a-65e5-4565-2d42b21b1a3e',
        name: 'Sid Ketchum',
        login: 'sid',
        age: 56,
       
    }
]

const get = (id) => {
    const usersFound = users.filter((user) => user.id === id)
    return usersFound.length >= 1
        ? usersFound[0]
        : undefined
}

const getAll = () => {
    return users
}




const add = (user) => {
    return new Promise((resolve, reject) => {
        bcrypt
            .hash(user.password, 15)
            .then((hashed) => {
                const newUser = {
                    ...user,
                    id: uuidv1(),
                    password: hashed
                }
                if (validateUser(newUser)) {
                    users.push(newUser)
                } else {
                    throw new Error('user.not.valid')
                }
                resolve(newUser)
            })
            .catch((err) => {
                reject()
            })
    })
}

const update = (id, newUserProperties) => {
    return new Promise((resolve, reject) => {
        const usersFound = users.filter((user) => user.id === id)

        if (usersFound.length === 1) {
            const oldUser = usersFound[0]

            if (newUserProperties.password) {
                bcrypt
                    .hash(newUserProperties.password, 15)
                    .then((hash) => {
                        newUserProperties.password = hash
                        const newUser = {
                            ...oldUser,
                            ...newUserProperties
                        }
                        // Control data to patch
                        if (validateUser(newUser)) {
                            // Object.assign permet d'éviter la suppression de l'ancien élément puis l'ajout
                            // du nouveau Il assigne à l'ancien objet toutes les propriétés du nouveau
                            Object.assign(oldUser, newUser)
                            resolve(oldUser)
                        } else {
                            reject('user.not.valid')
                        }  
                    })
                    .catch((err) => {
                        console.log("Error during hashing" + err)
                    })
            } else {
                const newUser = {
                    ...oldUser,
                    ...newUserProperties
                }
                // Control data to patch
                if (validateUser(newUser)) {
                    // Object.assign permet d'éviter la suppression de l'ancien élément puis l'ajout
                    // du nouveau Il assigne à l'ancien objet toutes les propriétés du nouveau
                    Object.assign(oldUser, newUser);
                    resolve(oldUser);
                } else {
                    reject("user.not.valid");
                }
            }
        } else {
            reject('user.not.found')
        }
    })
}





const remove = (id) => {
    const indexFound = users.findIndex((user) => user.id === id)
    if (indexFound > -1) {
        users.splice(indexFound, 1)
    } else {
        throw new Error('user.not.found')
    }
}

function validateUser(user) {
    let result = false
    /* istanbul ignore else */
    if (user) {
        try {
            const tcombUser = USER(user)
            result = true
        } catch (exc) {
            result = false
        }
    }
    return result
}

exports.get = get
exports.getAll = getAll
exports.add = add
exports.update = update
exports.remove = remove