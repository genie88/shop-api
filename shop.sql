-- MySQL dump 10.13  Distrib 5.6.25, for osx10.10 (x86_64)
--
-- Host: localhost    Database: shop
-- ------------------------------------------------------
-- Server version	5.6.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `address` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL DEFAULT '0',
  `primary` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `location` varchar(255) NOT NULL DEFAULT '',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL DEFAULT '0',
  `good_id` int(11) unsigned NOT NULL DEFAULT '0',
  `amount` int(11) unsigned NOT NULL DEFAULT '0',
  `invalid` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cats`
--

DROP TABLE IF EXISTS `cats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cats` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(30) NOT NULL DEFAULT '',
  `cat_pic` varchar(255) NOT NULL DEFAULT '',
  `parent_id` int(11) unsigned NOT NULL DEFAULT '0',
  `sort` int(11) unsigned NOT NULL DEFAULT '0',
  `is_show` tinyint(11) unsigned NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cats`
--

LOCK TABLES `cats` WRITE;
/*!40000 ALTER TABLE `cats` DISABLE KEYS */;
INSERT INTO `cats` VALUES (1,'代购香烟 烟标','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(2,'水/饮料','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(3,'乳制品','',2,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(4,'冲饮','',2,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(5,'休闲零食','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(6,'雪糕、冷饮','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(7,'饼干糕点','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(8,'方便速食','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(9,'酒水','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(10,'糖果/巧克力','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(11,'粮油副食','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(12,'调料、酱','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(13,'家居清洁','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(14,'美容洗护','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(15,'个人护理','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(17,'小百货','',0,0,0,'2015-12-08 07:36:05','2015-12-08 07:36:05'),(18,'进口食品','',0,0,0,'2015-12-08 07:36:05','2015-12-08 07:36:05'),(19,'婴幼儿童','',0,0,0,'2015-12-08 07:36:06','2015-12-08 07:36:06');
/*!40000 ALTER TABLE `cats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_fragments`
--

DROP TABLE IF EXISTS `cms_fragments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_fragments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cms_module_id` int(11) unsigned NOT NULL DEFAULT '0',
  `title` varchar(255) NOT NULL DEFAULT '',
  `subtitle` varchar(255) NOT NULL DEFAULT '',
  `abstract` mediumtext,
  `content` mediumtext,
  `sort` int(11) unsigned NOT NULL DEFAULT '0',
  `is_show` tinyint(11) unsigned NOT NULL DEFAULT '0',
  `ext1` varchar(255) NOT NULL DEFAULT '',
  `ext2` varchar(255) NOT NULL DEFAULT '',
  `ext3` varchar(255) NOT NULL DEFAULT '',
  `ext4` varchar(255) NOT NULL DEFAULT '',
  `ext5` varchar(255) NOT NULL DEFAULT '',
  `ext6` varchar(255) NOT NULL DEFAULT '',
  `ext7` varchar(255) NOT NULL DEFAULT '',
  `ext8` varchar(255) NOT NULL DEFAULT '',
  `ext9` varchar(255) NOT NULL DEFAULT '',
  `ext10` varchar(255) NOT NULL DEFAULT '',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_fragments`
--

LOCK TABLES `cms_fragments` WRITE;
/*!40000 ALTER TABLE `cms_fragments` DISABLE KEYS */;
INSERT INTO `cms_fragments` VALUES (1,1,'绿色出行从我做起','',NULL,NULL,0,0,'http://img.jindianhuo8.com/test.png','','','','','','','','','','2015-12-18 06:04:26','2015-12-18 06:04:26'),(2,1,'绿色出行从我做起','',NULL,NULL,0,0,'http://img.jindianhuo8.com/test.png','','','','','','','','','','2015-12-18 06:04:26','2015-12-18 06:04:26'),(3,1,'绿色出行从我做起','',NULL,NULL,0,0,'http://img.jindianhuo8.com/test.png','','','','','','','','','','2015-12-18 06:04:26','2015-12-18 06:04:26'),(4,2,'百度','',NULL,NULL,0,0,'http://www.baidu.com','','','','','','','','','','2015-12-18 06:04:26','2015-12-18 06:04:26'),(5,2,'腾讯','',NULL,NULL,0,0,'http://www.qq.com','','','','','','','','','','2015-12-18 06:04:27','2015-12-18 06:04:27');
/*!40000 ALTER TABLE `cms_fragments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_modules`
--

DROP TABLE IF EXISTS `cms_modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_modules` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(30) NOT NULL DEFAULT '',
  `name` varchar(30) NOT NULL DEFAULT '',
  `sort` int(11) unsigned NOT NULL DEFAULT '0',
  `is_show` tinyint(11) unsigned NOT NULL DEFAULT '0',
  `link` varchar(255) NOT NULL DEFAULT '',
  `ext1` varchar(255) NOT NULL DEFAULT '',
  `ext2` varchar(255) NOT NULL DEFAULT '',
  `ext3` varchar(255) NOT NULL DEFAULT '',
  `ext4` varchar(255) NOT NULL DEFAULT '',
  `ext5` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_modules`
--

LOCK TABLES `cms_modules` WRITE;
/*!40000 ALTER TABLE `cms_modules` DISABLE KEYS */;
INSERT INTO `cms_modules` VALUES (1,'banner','banner闪图模块',0,0,'','','','','',''),(2,'friend_links','友情链接',0,0,'','','','','',''),(3,'home_ads','首页广告',0,0,'','','','','',''),(4,'hr','招聘信息',0,0,'','','','','',''),(5,'kefu','在线客服',0,0,'','','','','',''),(6,'activity','活动信息',0,0,'','','','','',''),(7,'system_msg','公告消息',0,0,'','','','','',''),(8,'news','公司新闻',0,0,'','','','','',''),(9,'products','产品介绍',0,0,'','','','','',''),(10,'services','服务',0,0,'','','','','','');
/*!40000 ALTER TABLE `cms_modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coupons` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL DEFAULT '0',
  `type` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `amount` int(11) unsigned NOT NULL DEFAULT '0',
  `condition` varchar(255) NOT NULL DEFAULT '',
  `expires` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods`
--

DROP TABLE IF EXISTS `goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goods` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cat_id` int(11) unsigned NOT NULL DEFAULT '0',
  `spec_id` int(11) unsigned NOT NULL DEFAULT '0',
  `store_id` int(11) unsigned NOT NULL DEFAULT '0',
  `name` varchar(30) NOT NULL DEFAULT '',
  `brand_name` varchar(30) NOT NULL DEFAULT '',
  `tags` varchar(60) NOT NULL DEFAULT '',
  `default_image` varchar(255) NOT NULL DEFAULT '',
  `description` mediumtext,
  `price` float unsigned NOT NULL DEFAULT '0',
  `market_price` float unsigned NOT NULL DEFAULT '0',
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods`
--

LOCK TABLES `goods` WRITE;
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
INSERT INTO `goods` VALUES (1,1,0,1,'南京高级佳品香烟','南京','南京 香烟','http://img.bqmart.cn/data/files/store/355bfd662c3d156e4f7c490ef80a1415.jpg','南京高级佳品香烟',10,17,0,99999,'条','',0,0,0,1,'2015-12-07 23:44:17','2015-12-07 23:44:17'),(2,1,0,1,'七匹狼（蓝）','七匹狼','七匹狼 香烟','http://img.bqmart.cn/data/files/store/0d2537f5f86ff49cf90f2ed6344e1b0a.jpg','七匹狼高级佳香烟',10,17,0,99999,'条','',0,0,0,1,'2015-12-07 23:44:17','2015-12-07 23:44:17'),(3,1,0,1,'泰山（心悦）','泰山','泰山 香烟','http://img.bqmart.cn/data/files/store/09d81349144a84f6269024e34e9ff0b1.jpg','泰山（心悦）高级佳香烟',10,17,0,99999,'条','',0,0,0,1,'2015-12-07 23:44:17','2015-12-07 23:44:17'),(5,13,0,2,'立白新金桔洗洁精500g','立白','立白 新金桔 洗洁精','http://img.bqmart.cn/data/files/store/5281f9c2b9994927b9178425cb34585c.jpg','立白新金桔洗洁精500g',10,17,0,99999,'瓶','',0,0,0,1,'2015-12-07 23:44:44','2015-12-07 23:44:44');
/*!40000 ALTER TABLE `goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods_tags`
--

DROP TABLE IF EXISTS `goods_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goods_tags` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `good_id` int(11) unsigned NOT NULL DEFAULT '0',
  `tag_id` int(11) unsigned NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods_tags`
--

LOCK TABLES `goods_tags` WRITE;
/*!40000 ALTER TABLE `goods_tags` DISABLE KEYS */;
INSERT INTO `goods_tags` VALUES (1,1,1,'2015-12-16 01:13:11','2015-12-16 01:13:11'),(2,1,2,'2015-12-16 01:13:13','2015-12-16 01:13:13');
/*!40000 ALTER TABLE `goods_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_details` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(11) unsigned NOT NULL DEFAULT '0',
  `good_id` int(11) unsigned NOT NULL DEFAULT '0',
  `amount` int(11) unsigned NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (1,1,1,2,'2015-12-17 01:00:30','2015-12-17 01:00:30'),(2,1,2,1,'2015-12-17 01:00:30','2015-12-17 01:00:30'),(3,1,3,5,'2015-12-17 01:00:31','2015-12-17 01:00:31'),(4,2,1,2,'2015-12-17 02:56:33','2015-12-17 02:56:33'),(5,2,2,1,'2015-12-17 02:56:40','2015-12-17 02:56:40'),(6,5,2,2,'2015-12-17 04:26:52','2015-12-17 04:26:52'),(7,5,1,2,'2015-12-17 04:26:52','2015-12-17 04:26:52');
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL DEFAULT '0',
  `sn` varchar(30) NOT NULL DEFAULT '',
  `amount` double unsigned NOT NULL DEFAULT '0',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `from` varchar(30) NOT NULL DEFAULT '',
  `payment` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,'2015121708581115000',20000,1,'',1,'2015-12-17 01:00:36','2015-12-17 01:00:36'),(2,1,'2015121615301115000',15000,5,'',1,'2015-12-17 02:56:45','2015-12-17 02:56:45'),(5,1,'201512171226524323527',0,0,'unknown',0,'2015-12-17 04:26:52','2015-12-17 04:26:52');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(255) COLLATE utf8_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text COLLATE utf8_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('9DT3a2SflQ609vLKY2aIu2Mgi_lmogBf',1450409850,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{},\"flash\":{}}'),('pIClYwBi4d1U2ON3mkXQeL3VRhpv4oZD',1450414363,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{},\"flash\":{}}'),('wIDrkrB54fbqNK_u8Jze4DUvOa0WzxbP',1450513329,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{},\"flash\":{}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specs`
--

DROP TABLE IF EXISTS `specs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `specs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `spec_name` varchar(30) NOT NULL DEFAULT '',
  `cat_id` varchar(255) NOT NULL DEFAULT '',
  `parent_id` int(11) unsigned NOT NULL DEFAULT '0',
  `sort` int(11) unsigned NOT NULL DEFAULT '0',
  `is_show` tinyint(11) unsigned NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specs`
--

LOCK TABLES `specs` WRITE;
/*!40000 ALTER TABLE `specs` DISABLE KEYS */;
INSERT INTO `specs` VALUES (1,'衣物清洁类','13',0,0,0,'2015-12-08 07:38:35','2015-12-08 07:38:35'),(2,'厨房清洁类','13',0,0,0,'2015-12-08 07:38:35','2015-12-08 07:38:35'),(3,'纸类','13',0,0,0,'2015-12-08 07:38:35','2015-12-08 07:38:35'),(4,'奶粉类','19',0,0,0,'2015-12-08 07:38:35','2015-12-08 07:38:35'),(5,'服装类','19',0,0,0,'2015-12-08 07:38:35','2015-12-08 07:38:35'),(6,'玩具类','19',0,0,0,'2015-12-08 07:38:37','2015-12-08 07:38:37');
/*!40000 ALTER TABLE `specs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stores`
--

DROP TABLE IF EXISTS `stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stores` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL DEFAULT '0',
  `type` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `name` varchar(60) NOT NULL DEFAULT '',
  `phone` varchar(11) NOT NULL DEFAULT '0',
  `scale` varchar(255) NOT NULL DEFAULT '',
  `business_scope` varchar(255) NOT NULL DEFAULT '',
  `location` varchar(255) NOT NULL DEFAULT '',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` VALUES (1,2,2,'长沙市湘华香烟批发商行','15824121675','','','长沙市开福区高桥大市场','2015-12-16 02:23:53','2015-12-16 02:23:53'),(2,3,2,'长沙景和食品贸易有限公司','18974861169','','','湖南省长沙市雨花区韶山南路红星糖酒城10栋173号','2015-12-16 02:23:53','2015-12-16 02:23:53'),(3,3,2,'长沙翔盛商贸有限公司','13667329234','','','湖南省长沙市芙蓉区农科服装市场','2015-12-16 02:23:55','2015-12-16 02:23:55');
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'香烟','2015-12-16 01:49:07','2015-12-16 01:49:07'),(2,'烟标','2015-12-16 01:49:08','2015-12-16 01:49:08');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL DEFAULT '',
  `password` varchar(60) NOT NULL DEFAULT '',
  `nickname` varchar(30) NOT NULL DEFAULT '',
  `email` varchar(30) NOT NULL DEFAULT '',
  `phone` varchar(11) NOT NULL DEFAULT '',
  `avatar` varchar(255) NOT NULL DEFAULT '',
  `active` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `role` tinyint(1) unsigned NOT NULL DEFAULT '2',
  `last_login_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `salt` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'18073181682','65f1a8a409859720c666ab17e1ff3355ebed0df2','','genie88@163.com','18073181682','',1,2,'2015-12-08 07:34:04','2015-12-08 07:34:04','2015-12-08 07:34:04','635520681477'),(2,'15824121675','6e518c33699ee724e45a02456e1f3666bdceb5cd','','jackchoon@163.com','15824121675','',1,3,'2015-12-08 07:34:22','2015-12-08 07:34:22','2015-12-08 07:34:22','59605678287');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-12-18 17:15:43
