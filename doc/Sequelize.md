> Sequelize and mysql

1. ORM (Object Relationship Model)

        Sequelize uses promises to control async control-flow.

2. 建立数据库连接

        var sequelize = new Sequelize('database', 'username', 'password', {
          host: 'localhost',
          dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',
        
          pool: {
            max: 5,
            min: 0,
            idle: 10000
          },
        });
        
        // Or you can simply use a connection uri
        var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

3. 表定义

        var User = sequelize.define('user', {
          firstName: {
            type: Sequelize.STRING,
            field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
          },
          lastName: {
            type: Sequelize.STRING
          }
        }, {
          freezeTableName: true // Model tableName will be the same as the model name
        });
        
        User.sync({force: true}).then(function () {
          // Table created
          return User.create({
            firstName: 'John',
            lastName: 'Hancock'
          });
        });

4. 单表增删改查

>  demo1 find Search for one specific element in the database

        //  DON'T DO THIS
        user = User.findOne()
        console.log(user.get('firstName'));
        
        
        User.findOne().then(function (user) {
            console.log(user.get('firstName'));
        });
        
        // search for known ids
        Project.findById(123).then(function(project) {
          // project will be an instance of Project and stores the content of the table entry
          // with id 123. if such an entry is not defined you will get null
        })
        
        // search for attributes
        Project.findOne({ where: {title: 'aProject'} }).then(function(project) {
          // project will be the first entry of the Projects table with the title 'aProject' || null
        })
        
        Project.findOne({
          where: {title: 'aProject'},
          attributes: ['id', ['name', 'title']]
        }).then(function(project) {
          // project will be the first entry of the Projects table with the title 'aProject' || null
          // project.title will contain the name of the project
        })
      
> demo2  findOrCreate Search for a specific element or create it if not available

        User.create({ username: 'fnord', job: 'omnomnom' })
          .then(function() {
            User.findOrCreate({where: {username: 'fnord'}, defaults: {job: 'something else'}})
              .spread(function(user, created) {
                console.log(user.get({
                  plain: true
                }))
                console.log(created);
              })
          })

> demo3 findAndCountAll Search for multiple elements in the database, returns both data and total count

        Project.findAndCountAll({
             where: {
                title: {
                  $like: 'foo%'
                }
             },
             offset: 10,
             limit: 2
          }).then(function(result) {
            console.log(result.count);
            console.log(result.rows);
          });

> demo4 findAll Search for multiple elements in the database
        
        Project.findAll({
          where: {
            id: {
              $and: {a: 5}           // AND (a = 5)
              $or: [{a: 5}, {a: 6}]  // (a = 5 OR a = 6)
              $gt: 6,                // id > 6
              $gte: 6,               // id >= 6
              $lt: 10,               // id < 10
              $lte: 10,              // id <= 10
              $ne: 20,               // id != 20
              $between: [6, 10],     // BETWEEN 6 AND 10
              $notBetween: [11, 15], // NOT BETWEEN 11 AND 15
              $in: [1, 2],           // IN [1, 2]
              $notIn: [1, 2],        // NOT IN [1, 2]
              $like: '%hat',         // LIKE '%hat'
              $notLike: '%hat'       // NOT LIKE '%hat'
              $iLike: '%hat'         // ILIKE '%hat' (case insensitive)  (PG only)
              $notILike: '%hat'      // NOT ILIKE '%hat'  (PG only)
              $overlap: [1, 2]       // && [1, 2] (PG array overlap operator)
              $contains: [1, 2]      // @> [1, 2] (PG array contains operator)
              $contained: [1, 2]     // <@ [1, 2] (PG array contained by operator)
              $any: [2,3]            // ANY ARRAY[2, 3]::INTEGER (PG only)
            },
            status: {
              $not: false,           // status NOT FALSE
            }
          }
        })
        
> demo5 Updating / Saving / Persisting an instance

        // way 1
        task.title = 'a very different title now'
        task.save().then(function() {})
         
        // way 2
        task.update({
          title: 'a very different title now'
        }).then(function() {})
        
> demo6 Destroying / Deleting persistent instances

        Task.create({ title: 'a task' }).then(function(task) {
          // now you see me...
          return task.destroy({ force: true });
        }).then(function() {
         // now i'm gone :)
        })
        
> demo7 creating, updating and destroying multiple rows at once

        Model.bulkCreate([{},{}]).then(()=>{return Model.findAll()}).then();
        Model.update
        Model.destroy

5. 批量操作

6. 关系(Associations)

> demo1 1对1  


        const Player = this.sequelize.define('player', {/* attributes */});
        const Team  = this.sequelize.define('team', {/* attributes */});
      BelongsTo
        Player.belongsTo(Team)

        const User = sequelize.define('user', {/* ... */})
        const Project = sequelize.define('project', {/* ... */})
      HasOne
        Project.hasOne(User)

> demo2 1对多


      hasMany
        Project.hasMany(User,{as,'Workers'})

      belongsToMany
        Project.belongsToMany(User,{through:'UserProject'})


[Associations](http://docs.sequelizejs.com/manual/tutorial/associations.html)


7. 事务(Transactions)

> Managed transaction(auto-callback)

      return sequelize.transaction(function(t){
        return User.create({

        },{transaction:t}).then(function(user){
          return user.setShooter({},{transaction:t});
        });
      }).then(function(result){

      }).catch(function(err){

      })

> Concurrent/Partial transactions

    

8. 其他

> Data Type

        Sequelize.STRING                      // VARCHAR(255)
        Sequelize.STRING(1234)                // VARCHAR(1234)
        Sequelize.STRING.BINARY               // VARCHAR BINARY
        Sequelize.TEXT                        // TEXT
        Sequelize.TEXT('tiny')                // TINYTEXT
        
        Sequelize.INTEGER                     // INTEGER
        Sequelize.BIGINT                      // BIGINT
        Sequelize.BIGINT(11)                  // BIGINT(11)
        
        Sequelize.FLOAT                       // FLOAT
        Sequelize.FLOAT(11)                   // FLOAT(11)
        Sequelize.FLOAT(11, 12)               // FLOAT(11,12)
        
        Sequelize.DOUBLE                      // DOUBLE
        Sequelize.DOUBLE(11)                  // DOUBLE(11)
        Sequelize.DOUBLE(11, 12)              // DOUBLE(11,12)
        
        Sequelize.DECIMAL                     // DECIMAL
        Sequelize.DECIMAL(10, 2)              // DECIMAL(10,2)
        
        Sequelize.DATE                        // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
        Sequelize.DATE(6)                     // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision 
        Sequelize.DATEONLY                    // DATE without time.
        Sequelize.BOOLEAN                     // TINYINT(1)
        
        Sequelize.ENUM('value 1', 'value 2')  // An ENUM with allowed values 'value 1' and 'value 2'
        Sequelize.ARRAY(Sequelize.TEXT)       // Defines an array. PostgreSQL only.
        
        Sequelize.BLOB                        // BLOB (bytea for PostgreSQL)
        Sequelize.BLOB('tiny')                // TINYBLOB (bytea for PostgreSQL. Other options are medium and long)
        
        Sequelize.UUID                        // UUID datatype for PostgreSQL and SQLite, CHAR(36) BINARY for MySQL (use defaultValue: Sequelize.UUIDV1 or Sequelize.UUIDV4 to make sequelize generate the ids automatically)
        
        Sequelize.ARRAY(Sequelize.RANGE(Sequelize.DATE)) // Defines array of tstzrange ranges. PostgreSQL only.
        
        Sequelize.GEOMETRY                    // Spatial column.  PostgreSQL (with PostGIS) or MySQL only.
        Sequelize.GEOMETRY('POINT')           // Spatial column with geometry type.  PostgreSQL (with PostGIS) or MySQL only.
        Sequelize.GEOMETRY('POINT', 4326)     // Spatial column with geometry type and SRID.  PostgreSQL (with PostGIS) or MySQL only.
        
> Indexs

        sequelize.define('user', {}, {
          indexes: [
            // Create a unique index on email
            {
              unique: true,
              fields: ['email']
            },
        
            // Creates a gin index on data with the jsonb_path_ops operator
            {
              fields: ['data'],
              using: 'gin',
              operator: 'jsonb_path_ops'
            },
        
            // By default index name will be [table]_[fields]
            // Creates a multi column partial index
            {
              name: 'public_by_author',
              fields: ['author', 'status'],
              where: {
                status: 'public'
              }
            },
        
            // A BTREE index with a ordered field
            {
              name: 'title_index',
              method: 'BTREE',
              fields: ['author', {attribute: 'title', collate: 'en_US', order: 'DESC', length: 5}]
            }
          ]
        })

[官方文档](http://docs.sequelizejs.com/)

[参考资料](https://segmentfault.com/a/1190000003987871#articleHeader2)

[中文文档](https://itbilu.com/nodejs/npm/VkYIaRPz-.html)