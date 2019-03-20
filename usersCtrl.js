
let userData = require('./userData.json')
next = 101
module.exports = {
    getUsers: (req, res) => {
        let { age, email, favorites } = req.query
        if (age) {
            let ageData = userData.filter(user => user.age < age)
            res.status(200).send(ageData)

        } else if (email) {
            let emailData = userData.filter(user => user.email == email)
            res.status(200).send(emailData)

        } else if (favorites) {
            // includes returns a boolean, so it would be better to just use the implicit return using .includes
            let favoritesData = userData.filter(user => { if (user.favorites.includes(favorites)) { return user } })
            res.status(200).send(favoritesData)

        } else {
            res.status(200).send(userData)
        }
    },
    getUsersId: (req, res) => {
        let { id } = req.params
        data = userData.filter(user => user.id === +id);
        console.log(data)
        if (data.length > 0) {
            res.status(200).send(data[0])
        } else {
            res.sendStatus(404)
        }
    },
    getAdmin: (req, res) => {
        //                                  parenthesis here is not technically needed but does not cause an issue
        let data = userData.filter(user => (user.type === 'admin'))
        res.status(200).send(data)
    },

    nonAdmin: (req, res) => {
        let data = userData.filter(user => (user.type !== 'admin'))
        res.status(200).send(data)
    },

    type: (req, res) => {
        let { type } = req.params
        let data = userData.filter(user => (user.type == type))
        res.status(200).send(data)
    },

    updateUser: (req, res) => {
    
        const { userId } = req.params;

        for (let i = 0; i < userData.length; i++) {
            if (userData[i].id === +userId) {
                // using the spread operator can turn this into just one line
                userData[i].first_name = req.body.first_name
                userData[i].last_name = req.body.last_name
                userData[i].email = req.body.email
                userData[i].gender = req.body.gender
                userData[i].language = req.body.language
                userData[i].age = req.body.age
                userData[i].city = req.body.city
                userData[i].state = req.body.state
                userData[i].type = req.body.type
                userData[i].favorites = req.body.favorites
            }
        } res.status(200).send(userData)

    },

    newUser: (req, res) => {
        let newUser = req.body
        newUser.id = next;
        next++;
        userData.push(newUser)
        res.status(200).send(userData)
    },

    delete: (req, res) => {
        // this is not a good idea, as you will only remove the correct while the id's match the index by one. you should rewrite this to not rely on the index being 1 off from the id.
        let remove = userData.splice(req.params.id - 1, 1)
        res.status(200).send(userData)
    }
}
