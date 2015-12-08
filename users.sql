CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL DEFAULT '',  #手机号注册，用户名为手机号
  `password` varchar(60) NOT NULL DEFAULT '',
  `nickname` varchar(30) NOT NULL DEFAULT '',
  `email` varchar(30) NOT NULL DEFAULT '',
  `phone` varchar(11) NOT NULL DEFAULT '',
  `avatar` varchar(255) NOT NULL DEFAULT '', #头像
  `active` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `role` tinyint(1) unsigned NOT NULL DEFAULT '2', # 0超级管理员, 1后台管理员 2商店主 3供应商
  `last_login_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, #上次登录时间
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `salt` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
INSERT INTO users(id, username, email, phone, password, active, role, salt) VALUES(1, "18073181682", "genie88@163.com", "18073181682", "65f1a8a409859720c666ab17e1ff3355ebed0df2", 1, 2, "635520681477");
INSERT INTO users(id, username, email, phone, password, active, role, salt) VALUES(2, "15824121675", "jackchoon@163.com", "15824121675", "6e518c33699ee724e45a02456e1f3666bdceb5cd", 1, 3, "59605678287");

#商品品类（大类）
CREATE TABLE `cats` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(30) NOT NULL DEFAULT '',
  `cat_pic` varchar(255) NOT NULL DEFAULT '',
  `parent_id` int(11) unsigned NOT NULL DEFAULT '0',
  `sort` int(11) unsigned NOT NULL DEFAULT '0', #排序
  `is_show` tinyint(11) unsigned NOT NULL DEFAULT '0', #是否显示
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
INSERT INTO cats(id, parent_id, cat_name) VALUES(1, 0, "代购香烟 烟标");
INSERT INTO cats(id, parent_id, cat_name) VALUES(2, 0, "水/饮料");
INSERT INTO cats(id, parent_id, cat_name) VALUES(3, 2, "乳制品");
INSERT INTO cats(id, parent_id, cat_name) VALUES(4, 2, "冲饮");
INSERT INTO cats(id, parent_id, cat_name) VALUES(5, 0, "休闲零食");
INSERT INTO cats(id, parent_id, cat_name) VALUES(6, 0, "雪糕、冷饮");
INSERT INTO cats(id, parent_id, cat_name) VALUES(7, 0, "饼干糕点");
INSERT INTO cats(id, parent_id, cat_name) VALUES(8, 0, "方便速食");
INSERT INTO cats(id, parent_id, cat_name) VALUES(9, 0, "酒水");
INSERT INTO cats(id, parent_id, cat_name) VALUES(10, 0, "糖果/巧克力");
INSERT INTO cats(id, parent_id, cat_name) VALUES(11, 0, "粮油副食");
INSERT INTO cats(id, parent_id, cat_name) VALUES(12, 0, "调料、酱");
INSERT INTO cats(id, parent_id, cat_name) VALUES(13, 0, "家居清洁");
INSERT INTO cats(id, parent_id, cat_name) VALUES(14, 0, "美容洗护");
INSERT INTO cats(id, parent_id, cat_name) VALUES(15, 0, "个人护理");
INSERT INTO cats(id, parent_id, cat_name) VALUES(16, 0, "生鲜");
INSERT INTO cats(id, parent_id, cat_name) VALUES(17, 0, "小百货");
INSERT INTO cats(id, parent_id, cat_name) VALUES(18, 0, "进口食品");
INSERT INTO cats(id, parent_id, cat_name) VALUES(19, 0, "婴幼儿童");

#商品种类
CREATE TABLE `specs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `spec_name` varchar(30) NOT NULL DEFAULT '',
  `cat_id` varchar(255) NOT NULL DEFAULT '',
  `parent_id` int(11) unsigned NOT NULL DEFAULT '0',
  `sort` int(11) unsigned NOT NULL DEFAULT '0', #排序
  `is_show` tinyint(11) unsigned NOT NULL DEFAULT '0', #是否显示
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
INSERT INTO specs(id, cat_id, spec_name) VALUES(1, 13, "衣物清洁类");
INSERT INTO specs(id, cat_id, spec_name) VALUES(2, 13, "厨房清洁类");
INSERT INTO specs(id, cat_id, spec_name) VALUES(3, 13, "纸类");
INSERT INTO specs(id, cat_id, spec_name) VALUES(4, 19, "奶粉类");
INSERT INTO specs(id, cat_id, spec_name) VALUES(5, 19, "服装类");
INSERT INTO specs(id, cat_id, spec_name) VALUES(6, 19, "玩具类");

#商品详情(1对多)
CREATE TABLE `goods` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cat_id` int(11) unsigned NOT NULL DEFAULT '0',
  `spec_id` int(11) unsigned NOT NULL DEFAULT '0',
  `supplier_id` int(11) unsigned NOT NULL DEFAULT '0',
  `name` varchar(30) NOT NULL DEFAULT '',
  `brand_name` varchar(30) NOT NULL DEFAULT '',
  `tags` varchar(60) NOT NULL DEFAULT '',
  `default_image` varchar(255) NOT NULL DEFAULT '',
  `description` text(65535),
  `price` float(11) unsigned  NOT NULL DEFAULT '0.00',
  `market_price` float(11) unsigned NOT NULL DEFAULT '0.00',
  `sales` int(11) unsigned NOT NULL DEFAULT '0',
  `stock` int(11) unsigned NOT NULL DEFAULT '0',
  `unit` varchar(30) NOT NULL DEFAULT '',
  `sku` varchar(30) NOT NULL DEFAULT '',
  `type` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `recommended` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `hot` int(11) unsigned NOT NULL DEFAULT '0',
  `is_show` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
INSERT INTO goods(id, cat_id, supplier_id, name, brand_name, tags, default_image, description, price, market_price, stock, unit) VALUES(1, 1, 5, "南京高级佳品香烟", "南京", "南京 香烟", "http://img.bqmart.cn/data/files/store/355bfd662c3d156e4f7c490ef80a1415.jpg", "南京高级佳品香烟", 10.00, 17.00, 99999, "条");
INSERT INTO goods(id, cat_id, supplier_id, name, brand_name, tags, default_image, description, price, market_price, stock, unit) VALUES(2, 1, 5, "七匹狼（蓝）", "七匹狼", "七匹狼 香烟", "http://img.bqmart.cn/data/files/store/0d2537f5f86ff49cf90f2ed6344e1b0a.jpg", "七匹狼高级佳香烟", 10.00, 17.00, 99999, "条");
INSERT INTO goods(id, cat_id, supplier_id, name, brand_name, tags, default_image, description, price, market_price, stock, unit) VALUES(3, 1, 5, "泰山（心悦）", "泰山", "泰山 香烟", "http://img.bqmart.cn/data/files/store/09d81349144a84f6269024e34e9ff0b1.jpg", "泰山（心悦）高级佳香烟", 10.00, 17.00, 99999, "条");
INSERT INTO goods(id, cat_id, supplier_id, name, brand_name, tags, default_image, description, price, market_price, stock, unit) VALUES(4, 13, 6, "1.5kg超能植翠洗衣液(柔顺舒适)N1+1.5kg超柔顺液(拉绳)", "超能", "超能 洗衣液", "http://img.bqmart.cn/data/files/store/9c668ad84706d8a311cc166ec60ea84d.jpg", "1.5kg超能植翠洗衣液(柔顺舒适)N1+1.5kg超柔顺液(拉绳)", 10.00, 17.00, 99999, "袋");
INSERT INTO goods(id, cat_id, supplier_id, name, brand_name, tags, default_image, description, price, market_price, stock, unit) VALUES(5, 13, 6, "立白新金桔洗洁精500g", "立白", "立白 新金桔 洗洁精", "http://img.bqmart.cn/data/files/store/5281f9c2b9994927b9178425cb34585c.jpg", "立白新金桔洗洁精500g", 10.00, 17.00, 99999, "瓶");

#成交纪录　
CREATE TABLE `orders` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL DEFAULT '0', 
  `sn` varchar(30) NOT NULL DEFAULT '', #订单流水号201512121030000001
  `amount` float(30) unsigned NOT NULL DEFAULT '0', #订单总金额
  `status` tinyint(3) unsigned NOT NULL DEFAULT '0', #状态: 1已下单－2已付款－3已发货－4已收货-5申请退货-6退货中－7退货成功－8退货款
  `from` varchar(30) NOT NULL DEFAULT '', #下单方式 'Android/IOS/WEB'
  `payment` tinyint(3) unsigned NOT NULL DEFAULT '0', #支付方式 0支付宝 2微信支付
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

#订单－产品详情
CREATE TABLE `order_details` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(11) unsigned NOT NULL DEFAULT '0', 
  `good_id` int(11) unsigned NOT NULL DEFAULT '0', 
  `amount` int(11) unsigned NOT NULL DEFAULT '0', #订单数量
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

#我的购物车(1对多)
CREATE TABLE `carts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL DEFAULT '0', 
  `good_id` int(11) unsigned NOT NULL DEFAULT '0', 
  `amount` int(11) unsigned NOT NULL DEFAULT '0', #订单数量
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;


#我的卡券／红包(1对多)
CREATE TABLE `coupons` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL DEFAULT '0',
  `type` tinyint(3) unsigned NOT NULL DEFAULT '0', #类型 1卡券 2红包
  `amount` int(11) unsigned NOT NULL DEFAULT '0', #面值
  `condition` varchar(255) NOT NULL DEFAULT '', #使用条件 订单总金额大于500
  `expires` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, #有效期
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

#我的商店(1对多)
CREATE TABLE `stores` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL DEFAULT '0',
  `type` tinyint(3) unsigned NOT NULL DEFAULT '0', #店铺类型 1终端商店 2二级经销商 3一级经销商  4厂家
  `name` varchar(60) NOT NULL DEFAULT '', #公司／商店名称
  `phone` int(11) unsigned NOT NULL DEFAULT '0',#联系电话
  `scale` varchar(255) NOT NULL DEFAULT '', #公司/商店规模
  `business_scope` varchar(255) NOT NULL DEFAULT '', #经营范围
  `location` varchar(255) NOT NULL DEFAULT '', #店铺地址
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

#我的收货地址(1对多)
CREATE TABLE `address` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL DEFAULT '0',
  `primary` tinyint(1) unsigned NOT NULL DEFAULT '1', #默认
  `location` varchar(255) NOT NULL DEFAULT '', #收货地址
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;