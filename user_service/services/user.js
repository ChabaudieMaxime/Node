'use strict';

const Schmervice = require('schmervice');

const internals = {
    removePassword : (user) => {

        delete user.password;

        return user;
    }
};

module.exports = class UserService extends Schmervice.Service {

    list(ctx = {}) {

        const { User } = this.server.models();

        return User.query(ctx.trx);
    }

    findById(id, ctx = {}) {

        const { User } = this.server.models();

        return User.query(ctx.trx).findById(id);
    }

    findByUsernameAndPassword(username, password, ctx={}) {

        const { User } = this.server.models();

        return User.query(ctx.trx).select()
            .where({username: username,
    password: password});
    }

    create(user, ctx = {}) {

        const { User } = this.server.models();

        return User.query(ctx.trx).insert(user).traverse(internals.removePassword);
    }

    async update(id, user, ctx = {}) {

        const { User } = this.server.models();

        await User.query(ctx.trx).where({id}).first().patch(user);

        return this.findById(id);
    }

    delete(id, ctx = {}) {

        const { User } = this.server.models();

        return User.query(ctx.trx).delete().where({ id });
    }
};
