-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2018 at 08:55 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop_it_happ`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` varchar(9) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`) VALUES
('200962439');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `user_id` varchar(9) COLLATE utf8_bin NOT NULL,
  `product_id` varchar(20) COLLATE utf8_bin NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `orderPriority` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `orderPriority`) VALUES
(1, 'מומלצים', 1),
(2, 'בלונים', 3),
(3, 'בובות פרווה', 6),
(4, 'כרטיסי ברכה', 9),
(5, 'בריכות ומתנפחים', 2),
(6, 'משחקי חשיבה', 8),
(7, 'ניקי', 5),
(8, 'פיות', 4),
(9, 'ספלים', 7),
(10, 'בובות Our Generation', 5);

-- --------------------------------------------------------

--
-- Table structure for table `categoriestoproducts`
--

CREATE TABLE `categoriestoproducts` (
  `product` varchar(20) COLLATE utf8_bin NOT NULL,
  `category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `categoriestoproducts`
--

INSERT INTO `categoriestoproducts` (`product`, `category`) VALUES
('11548885', 1),
('11548885', 3),
('2891480', 4),
('2891481', 4),
('2891493', 4),
('2891495', 4),
('2891502', 4),
('2891505', 4),
('2891507', 4),
('2891519', 4),
('55506', 1),
('55506', 5),
('55506', 6),
('56740', 5),
('57149', 1),
('57149', 5),
('57422', 1),
('57422', 5),
('59066', 5),
('7022339', 2),
('A55623', 6),
('BD31072Z', 10),
('F00001', 1),
('F00001', 8),
('F00003', 8),
('F00006', 3),
('F00006', 8),
('F0002', 8),
('N12365', 1),
('N12365', 7),
('N12365', 9),
('N2231215', 3),
('N2231215', 7),
('N456121', 7),
('N4565132', 7),
('N565002', 3),
('N565002', 7),
('S41210', 9),
('S551231', 1),
('S551231', 9),
('S552202', 9),
('T1513215', 1),
('T1513215', 6),
('T486541', 6),
('T4T55852', 6),
('T56123', 1),
('T56123', 6);

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `value` int(11) NOT NULL,
  `name` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`value`, `name`) VALUES
(70, 'אשדוד'),
(2200, 'דימונה'),
(3000, 'ירושלים'),
(4000, 'חיפה'),
(5000, 'תל אביב - יפו'),
(6300, 'גבעתיים'),
(6600, 'חולון'),
(6700, 'טבריה'),
(7000, 'לוד'),
(7900, 'פתח תקווה'),
(8300, 'ראשון לציון'),
(8400, 'רחובות'),
(8600, 'רמת גן'),
(9000, 'באר שבע');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` varchar(9) COLLATE utf8_bin NOT NULL,
  `city` int(11) NOT NULL,
  `street` varchar(30) COLLATE utf8_bin NOT NULL,
  `credit_card` varchar(4) COLLATE utf8_bin NOT NULL,
  `order_date` date NOT NULL,
  `delivery_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `city`, `street`, `credit_card`, `order_date`, `delivery_date`) VALUES
(1018, '521864256', 6700, 'הוליווד, 11', '2021', '2018-11-03', '2018-11-14');

-- --------------------------------------------------------

--
-- Table structure for table `orders_products`
--

CREATE TABLE `orders_products` (
  `order_id` int(11) NOT NULL,
  `product_id` varchar(20) COLLATE utf8_bin NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `orders_products`
--

INSERT INTO `orders_products` (`order_id`, `product_id`, `amount`) VALUES
(1018, '57149', 1),
(1018, 'F00001', 1),
(1018, 'T1513215', 1),
(1018, 'T56123', 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `code` varchar(20) COLLATE utf8_bin NOT NULL,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `details` varchar(1000) COLLATE utf8_bin NOT NULL,
  `price` float NOT NULL,
  `imageUrl` varchar(250) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`code`, `name`, `details`, `price`, `imageUrl`) VALUES
('11548885', 'חתול כמו אמיתי', 'החתול הכי חמוד בארץ!\n\nבובת חתול מפרווה מקסימה\nשנראית ומרגישה ממש כמו חתול אמיתי!!\n\nאין ספק שהחתול הזה יהפוך בקלות ובמהירות לחבר הכי טוב שלכם ', 99.9, 'https://i.ytimg.com/vi/J0EUxEkm4kc/maxresdefault.jpg'),
('2891480', 'כרטיס להולדת הבן', 'כרטיס ברכה להולדת הבן.', 15, 'images/1535273006700-2891480.jpg'),
('2891481', 'כרטיס להולדת הבת', 'כרטיס ברכה להולדת הבת', 15, 'images/1535273494182-2891481.jpg'),
('2891493', 'כרטיס ברכה לחתונה', 'כרטיס ברכה מוזהב לחתונה', 15, 'images/1535273525713-2891493.jpg'),
('2891495', 'כרטיס ברכה באהבה', 'כרטיס ברכה באהבה', 15, 'images/1535273581241-2891495.jpg'),
('2891502', 'כרטיס ברכה מזל טוב', 'כרטיס ברכה מזל טוב', 15, 'images/1535273605464-2891502.jpg'),
('2891505', 'כרטיס ברכה תודה', 'כרטיס ברכה מוזהב תודה', 15, 'images/1535273630887-2891505.jpg'),
('2891507', 'כרטיס ברכה בהצלחה', 'כרטיס ברכה בהצלחה', 15, 'images/1535273653182-2891507.jpg'),
('2891519', 'כרטיס ברכה יום הולדת', 'כרטיס ברכה יום הולדת שמח', 15, 'images/1535273682008-2891519.jpg'),
('55506', 'משחק צלילה דגים', 'תפסו את הדגים החמודים!\n\nמשחק זה מגיע עם 3 דגים אותם תוכלו לשחרר בבריכה,\nועכשיו - תנסו לדוג אותם.\n\nלא, זה לא כזה קל כמו שזה נראה..\n\nנראה מי הצוללן הטוב שביננו :)\n', 49, 'http://sahek-ota.co.il/media/catalog/product/cache/10/image/9df78eab33525d08d6e5fb8d27136e95/3/9/39.9.jpg'),
('56740', 'מצופים משולשים פרוזן', 'זוג מצופים איכותיים לילדים מבית INTEX,\nעם הדפס של נסיכות הקרח האהובות - אנה ואלזה.\n\nמצופים אטומים עשויים גומי קשיח, לשמירה מירבית על ילדיכם במים.\n\nמיועד לגילאי 3-6.\n\nאריזה מכילה זוג מצופי ידיים.', 15, 'https://www.shilav.co.il/media/catalog/product/cache/1/image/1170x1170/9df78eab33525d08d6e5fb8d27136e95/X/L/XL-7819034.jpg'),
('57149', 'בריכת סוכריות', 'בריכה לילדים ממותג האיכות INTEX.\n\nבבריכה מגלשת שוקולד מתוקה, סוכריות ה\"צומחות\" מן הגדרות, וקשת מעבר מקסימה.\n\nמחולקת לשני חלקים - האיזור הקטן ממנו ניתן לעלות למגלשה, והאיזור הגדול יותר - אליו יוכל הילד לגלוש בכיף.\n\nמידות הבריכה: \nשטח: 295X190 מטר \nגובה: 0.13 מטר\n\nמומלץ לנפח עם משאבה מבית INTEX', 349, 'http://www.xbay.co.il/images/itempics/57149_large.jpg'),
('57422', 'בריכה לילדים', 'בריכה עגולה לילדים מבית INTEX עם תחתית מתנפחת.\n\nקוטר: 1.47 מטר.\nגובה: 0.33 מטר.\n\nמומלץ לנפח עם משאבה מבית INTEX', 99, 'https://hfshop.pk/wp-content/uploads/2018/05/Intex-Pool-58-x-13-57422.jpg'),
('59066', 'כדור ים ענק', 'כדור ים צבעוני ענק המתאים לים ולבריכה,\n\nלמסיבות רווקים / רווקות, ימי הולדת, מסיבות ואירועים.\n\n107 ס\"מ.\nמיועד לגילאי 3+.\n', 59, 'http://www.intex.co.il/sysvault/docsgalleries2/cdp635999560429206091.jpg'),
('7022339', 'מיילר 26 עוגה יום הולדת', 'בלון מיילר עם הליום בגודל 26 אינץ\r\n\r\nהבלון בצורת עוגה 3 קומות\r\nועליו מודפס יום הולדת שמח באנגלית.\r\n\r\nמחזיק כשבועיים באוויר', 40, 'images/1535187197118-בלון מיילר 36.jpg'),
('A55623', 'אתגר בעץ', 'האם תצליחו לסדר את כל החלקים בתוך המסגרת?\n\nאתגר חשיבה מעניין לכל גיל', 59.9, 'https://market.marmelada.co.il/photos/1748040.jpg'),
('BD31072Z', 'פיבי עם שמלה פרחונית', 'פיבי היא בובה מסדרת Our Generation. \n\nהבובה הזאת יכולה להאריך את הצמות, ולהסתפר. \n\nמגיעה עם תוספות שיער צבעוניות, ואביזרים מתוקים לשיער. \n\nיש לה גם חוברת ובה דוגמאות יפהפיות לתספורות עבור פיבי. \n\nגובה הבובה : 46 ס\"מ', 399.9, 'https://images-na.ssl-images-amazon.com/images/I/61DxcmNFldL._SY587_.jpg'),
('F00001', 'מלאכית בשדה', 'בובת חרסינה מקסימה\nלבושה בשמלה לבנה\nקוטפת פרחים בשדה\n\nמידות : 10*10\n\n** הבובה שבירה ביותר', 25, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5PJceuYBjmIPQHSxQcOv0TenJe7Wflrp14qwJhC6RFQK9hjKM'),
('F00003', 'פיית היער', 'פייה מקסימה.\nהכנפיים ניתנות לעיצוב ולשינוי', 29.9, 'https://ae01.alicdn.com/kf/HTB112ZvLFXXXXbrXFXXq6xXFXXXx/-.jpg_640x640.jpg'),
('F00006', 'פיית השיניים', 'בובת פרווה של פיית השיניים\nמתנה מושלמת לילדים שמתחילים לאבד את שיניהם...', 35, 'https://cdn8.bigcommerce.com/s-n8fmp/images/stencil/original/products/4601/5072/983-26-Tooth-Fairy-Musical-Doll_95f06544-6d5f-4043-a40b-2018306e0fba__88493.1423800393.jpg?c=2&imbypass=on'),
('F0002', 'דג המזל', 'דג חרסינה,\nעליו ישובים שני חתולים.\n\nמתנה מקסימה לכל מטרה.', 55, 'https://ae01.alicdn.com/kf/HTB1zKbgPVXXXXbDXVXXq6xXFXXXM/Ceramika-g-upi-Kot-Kotek-Mi-o-nik-w-Miniaturowe-Handmade-Porcelany-i-Ryby-Figurka-Decor.jpg_640x640.jpg'),
('N12365', 'ספל סליפי', 'ספל כיפי לשתייה חמה\nמודפס בדמות האהובה של סליפי מסדרת הכבשים של ניקי', 29.9, 'http://www.art-center.info/wp-content/gallery/%25d7%259e%25d7%2590%25d7%2592%25d7%2599%25d7%259d-1/34337.jpg'),
('N2231215', 'מחזיק מפתחות סליפי', 'מחזיק מפתחות של הבובה סליפי האהובה\nמסדרת הכבשים של ניקי', 39.9, 'http://www.art-center.info/wp-content/gallery/%25d7%259e%25d7%2597%25d7%2596%25d7%2599%25d7%25a7%25d7%2599-%25d7%259e%25d7%25a4%25d7%25aa%25d7%2597%25d7%2595%25d7%25aa-1/34292.jpg'),
('N456121', 'תיק צד ניקי', 'תיק צד עם דמותה האהובה של ניקי הכבשה', 129.9, 'https://sfilev2.f-static.com/image/users/74996/ftp/my_files/35028.jpg?id=11724713'),
('N4565132', 'תיק גן סליפי', 'תיק גן עליו מודפסת הדמות האהובה של סליפי מסדרת הכבשים של ניקי', 119.9, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYzUfP0h5ioF0NFd0G8iRwLgWuwDX2woXyG0-YdBVl6jIjPMFj8A'),
('N565002', 'ניקי חומה', 'בובת ניקי 25\"', 99.9, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_VQuRqytSEl9o_1GRNB2ePqB7A9PgYdae2bNgdRA0ENZ9IGu6'),
('S41210', 'ספל לאבא', 'ספל ל\"אבא הכי בעולם\"\n\nהולך נפלא כתוספת למתנה - או כמתנה מקסימה בפני עצמה', 20, 'http://www.palphot.com/wp-content/uploads/2013/01/1269602-1024x904.jpg'),
('S551231', 'ספל באהבה', 'ספל באהבה מעוצב, ארוז בקופסת מתכת יפהפיה\nמתאים לכל מתנה', 49.9, 'http://hatsicossukar.co.il/wp-content/uploads/thumbs/love-335ca9hkz8fr800c42yubu.jpg'),
('S552202', 'ספל עם מכסה', 'סט של ספל עם מכסה וכפית.\n\nככה הכי חם לי עם הקפה שלי ;)', 39.9, 'https://sc01.alicdn.com/kf/HTB1Y3RJOFXXXXbjaXXXq6xXFXXXs/229108526/HTB1Y3RJOFXXXXbjaXXXq6xXFXXXs.jpg'),
('T1513215', 'מילים בעיגולים', 'משחק ארץ עיר בקלפים\nהמקורי של פוקס מיינד', 99.9, 'https://www.amigo.co.il/wp-content/uploads/2016/07/3854.jpg'),
('T486541', 'קנגרו', 'משחק קנגרו המקורי של חברת פוקסמיינד\nמיועד לגילאי 7 +', 59.9, 'http://www.booknet.co.il/imgs/site/prod/5025822497413b.jpg'),
('T4T55852', 'ארבע בשורה', 'ארבע בשורה האהוב - הפעם מעץ, ועם כדורים מיוחדים!\nכי אין כמו קצת נוסטלגיה..', 59.9, 'http://www.printop.co.il/files/prod/image341.jpg'),
('T56123', 'שחמט', 'משחק שחמט קלאסי', 99.9, 'https://img.zap.co.il/pics/6/1/0/9/47009016c.gif');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(9) COLLATE utf8_bin NOT NULL,
  `email` varchar(30) COLLATE utf8_bin NOT NULL,
  `phone` varchar(16) COLLATE utf8_bin NOT NULL,
  `password` varchar(250) COLLATE utf8_bin NOT NULL,
  `first_name` varchar(30) COLLATE utf8_bin NOT NULL,
  `last_name` varchar(30) COLLATE utf8_bin NOT NULL,
  `city_id` int(11) NOT NULL,
  `street_name` varchar(30) COLLATE utf8_bin NOT NULL,
  `house_number` varchar(10) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `phone`, `password`, `first_name`, `last_name`, `city_id`, `street_name`, `house_number`) VALUES
('111111118', 'zotus2@gmail.com', '052-443-3345', 'e19d5cd5af0378da05f63f891c7467af', 'רם', 'יששכר', 8300, 'חייל התותחנים', '24'),
('123456782', 'test@test.com', '000-000-0000', '05a671c66aefea124cc08b76ea6d30bb', 'ניסיון', 'נ-משפחה', 6600, 'הסיירת', '22/15'),
('200962439', 'rakkafa@gmail.com', '052-727-1196', '325a2cc052914ceeb8c19016c091d2ac', 'רקפת', 'יפרח', 3000, 'סן מרטין', '22/18'),
('521864256', 'test@test.com', '050-800-9393', '325a2cc052914ceeb8c19016c091d2ac', 'בדיקת', 'תקינות', 2200, 'הוליווד', '11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`user_id`,`product_id`),
  ADD KEY `cartProductPK` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categoriestoproducts`
--
ALTER TABLE `categoriestoproducts`
  ADD PRIMARY KEY (`product`,`category`),
  ADD KEY `categoryFK` (`category`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`value`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userOnOrderFK` (`user_id`),
  ADD KEY `cityOnOrderFK` (`city`);

--
-- Indexes for table `orders_products`
--
ALTER TABLE `orders_products`
  ADD KEY `ordersOrderIDFK` (`order_id`),
  ADD KEY `ordersProductIDFK` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`code`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `citiesFK` (`city_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1019;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admins`
--
ALTER TABLE `admins`
  ADD CONSTRAINT `userAdminFK` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `cartProductPK` FOREIGN KEY (`product_id`) REFERENCES `products` (`code`),
  ADD CONSTRAINT `cartUserPK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `categoriestoproducts`
--
ALTER TABLE `categoriestoproducts`
  ADD CONSTRAINT `categoryFK` FOREIGN KEY (`category`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `productFK` FOREIGN KEY (`product`) REFERENCES `products` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `cityOnOrderFK` FOREIGN KEY (`city`) REFERENCES `cities` (`value`),
  ADD CONSTRAINT `userOnOrderFK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `orders_products`
--
ALTER TABLE `orders_products`
  ADD CONSTRAINT `ordersOrderIDFK` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `ordersProductIDFK` FOREIGN KEY (`product_id`) REFERENCES `products` (`code`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `citiesFK` FOREIGN KEY (`city_id`) REFERENCES `cities` (`value`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
