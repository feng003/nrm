## nosql 之 redis 

1. 键值数据类型

        字符串
        列表
        有序集合
        散列
        集合

> string

        set key value
        get key
        append key value
        incr/decr key
        incrby/incrbyfloat key increment
        getrange key start end
        getset key value

> hash string类型的field 和 value的映射表，适用于存储对象

        HEXITS key field
        HSET key field value
        HSETNX key field value
        HMSET key field1 value1 field2 value2
        HGET key field 
        HGETALL key
        HVALS key

> list 字符串列表

        LPUSH/RPUSH key value1 value2
        LPUSHHX/RPUSHHX key value
        LRANGE key start stop
        LPOP/RPOP key

> set string类型的无序集合  sorted set

        SADD key member1 member2
        SMEMBERS key
        SCAED key
        SDIFF/SUNION key1 key2
        SDIFFSTORE/SUNIONSTORE destination key1 key2

2. 应用场景

        缓存
        聊天室
        任务队列
        网站访问统计
        数据过期处理

3. 命令行

        set name str
        get name
        keys *
        exists name
        del name


 4. publish/subscribe 发布/订阅

        PUBSUB subcommand [argument]
        SUBSCRIBE/UNSUBSCRIBE channel
        PUBLISH channel message
        PSUBSCRIBE/PUNSUBSCRIBE pattern

5. 事务 开始事务(MULTI) 命令入队 执行事务(EXEC)

        MULTI
        EXEC
        DISCARD
        WATCH/UNWATCH key

6. config 

        CONFIG GET dir 获取redis目录
        config get requirepass
        config set requirepass "redis" 设置密码
        config get maxclients 客户端最大连接数



[redis install](http://www.cnblogs.com/langtianya/p/5187681.html)
