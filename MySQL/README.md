## MySQL关系型数据库
  首先安装MySQL数据库服务 https://www.cnblogs.com/gopark/p/12487439.html

  MySQL默认端口号：3306

  创建数据库表使用工具Navicat进行操作
  注意创建表时，必须指定数据类型和主键，并且主键不能为null
  主键属性值是不能重复的，可以选择自动增加的配置
  库mysql,information_schema,performance_schema,sys这几个库是系统自带的，不能动
  需要再建数据库，然后进行连接操作

  mysql -->结构化数据库中的一种
  mysql -->服务，提供数据存放的服务
    -->数据库：划分存储区域
      -->table:
        -->js对象数组
          [
            {
              id:0,
              name:'jack'
            },
            {
              id:1,
              name:'lily'
            }
          ]


ORM:对象管理模型，Object-Relational Mapping，把关系数据库的表结构映射到对象上
  我们选择Node的ORM框架Sequelize来操作数据库。这样，我们读写的都是JavaScript对象，Sequelize帮我们把对象变成数据库中的行。
  在ORM中，
  应用到数据库需要一个驱动，此时是node-mysql的驱动，就是mysql2，需要手动安装一下
  node-application -->ORM(sequlize)-->驱动(node-mysql) -->mysql db

Sequelize是ORM中的一种，安装使用
  一个js文件对应一个数据模型
  1、npm install sequelize sequelize-cli
  2、npx sequelize-cli init
    初始化之后会生成几个文件：
      config文件
      migrations数据库迁移文件
      models数据模型文件，跟数据库表关联
      seeders初始化脚本
    修改一下config文件里面的数据库名称
  3、创建模型
    命令行操作：npx sequelize-cli model:generate --name User --attributes name:string
    就会在models里面创建一个数据模型User
    并且在migrations里面创建一个数据迁移
  4、在数据库创建对应数据模型的表
    命令行：npx sequelize-cli db:migrate --env=development 
    参数会去读config.json里面的环境配置，去连接不同环境的数据库进行操作，默认是development,即去创建数据表
    此时提示错误mysql2，需要手动安装一下驱动mysql2
    ORM(sequlize)-->驱动(node-mysql),即ORM需要一个驱动来操作mysql
    npm i mysql2  然后再执行npx sequelize-cli db:migrate --env=development 
