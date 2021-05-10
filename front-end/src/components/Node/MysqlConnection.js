const mysqlx = require('@mysql/xdevapi');

const config = {
    password: '5489',
    user: 'root',
    host: 'localhost',
    port: 33060,
    schema: 'monitortest',
    table: 'crop'
};


exports.insertCrop = async (url, width, height, left, top, email) => {
    mysqlx.getSession(config)
        .then(session => {
            return session.sql(`create database if not exists ${config.schema}`)
                .execute()
                /*.then(() => {
                    return session.sql(`create table if not exists ${config.schema}.${config.table} (_id SERIAL, name VARCHAR(3), age TINYINT)`)
                        .execute()
                })*/
                .then(() => {
                    const table = session.getSchema(config.schema).getTable(config.table);

                    return table.insert('url', 'width', 'height', 'bottom', 'top', 'email')
                        .values(url, width, height, left, top, email)
                        .execute()
                        .then(() => {
                            return table.select('top', 'bottom', 'width', 'height', 'url', 'email')
                                .execute()
                        })
                        .then(res => {
                            console.log("insert succes", res.fetchAll()); // ['foo', 42]
                        })
                }).then(() => {
                    return session.close();
                });
        });
}

exports.getCropByEmail = async (_email) => {
    mysqlx.getSession(config)
        .then(session => {
            return session.sql(`create database if not exists ${config.schema}`)
                .execute()
                /*.then(() => {
                    return session.sql(`create table if not exists ${config.schema}.${config.table} (_id SERIAL, name VARCHAR(3), age TINYINT)`)
                        .execute()
                })*/
                .then(() => {
                    const table = session.getSchema(config.schema).getTable(config.table);


                    return table.select('email', 'url', 'width', 'height', 'bottom', 'top')
                        .where('email = :' + _email)
                        .execute()
                        .then(res => {
                            console.log("insert succes", res.fetchAll());
                        })
                }).then(() => {
                    return session.close();
                });
        });
}