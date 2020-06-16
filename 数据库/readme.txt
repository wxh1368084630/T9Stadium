在mongodb数据库中新建数据库名为stadium在其目录下面新建3个集合：stadiums，booking，users。
users包括账号和密码，users集合不需要手动插入新数据，通过注册功能实现，passWord字段会在注册页面实现加密操作。
stadiums是场馆信息，硬件设施（1/0）表示有和没有。具体数据操作查看stadiums集合.txt文件，在数据库中插入。
booking是场馆预订信息，（1/0）表示预订和未被预订。具体数据操作查看booking集合.txt文件，在数据库中插入