-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 30 mars 2024 à 16:52
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `rihla`
--

-- --------------------------------------------------------

--
-- Structure de la table `booking`
--

CREATE TABLE `booking` (
  `id` bigint(20) NOT NULL,
  `city_booked` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `places` int(11) NOT NULL,
  `start_location` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `city`
--

CREATE TABLE `city` (
  `id` bigint(20) NOT NULL,
  `description` longtext DEFAULT NULL,
  `image_file` varchar(255) DEFAULT NULL,
  `map` varchar(1024) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `city`
--

INSERT INTO `city` (`id`, `description`, `image_file`, `map`, `title`) VALUES
(18, 'Fès, une ville fascinante du Maroc, est un trésor caché d\'histoire, de culture et d\'architecture. Voici une description touristique qui pourrait vous donner un aperçu de cette ville envoûtante :\r\n\r\nPlongez dans le passé en explorant la médina de Fès, l\'une des plus grandes zones urbaines sans voiture au monde et classée au patrimoine mondial de l\'UNESCO. Perdez-vous dans son labyrinthe de ruelles étroites, où chaque coin révèle des trésors architecturaux, des souks animés et des artisans talentueux.\r\n\r\nAdmirez l\'architecture exquise des anciennes madrasas (écoles coraniques) telles que Bou Inania et Al-Attarine, qui sont des exemples magnifiques de l\'artisanat marocain traditionnel. Visitez la célèbre Université Al Quaraouiyine, l\'une des plus anciennes universités du monde encore en activité, fondée au 9ème siècle.\r\n\r\nNe manquez pas la splendide porte Bab Boujloud, qui marque l\'entrée principale de la médina, et explorez les jardins paisibles du Jardin Jnan Sbil, un havre de fraîcheur au cœur de la ville.\r\n\r\nPour une expérience sensorielle inoubliable, plongez-vous dans les souks de Fès, où vous pourrez vous perdre dans un dédale de stands colorés proposant des tapis, des tissus, des poteries, des épices et bien plus encore. Laissez-vous tenter par les délices culinaires de la ville, des plats succulents tels que le tajine, le couscous et les pâtisseries marocaines.\r\n\r\nFès est également réputée pour son artisanat, notamment la maroquinerie, le travail du cuir et la poterie. Assistez à des démonstrations fascinantes de savoir-faire traditionnel dans les souks et les ateliers locaux, et rapportez chez vous des souvenirs uniques et authentiques.\r\n\r\nPour une vue imprenable sur la ville, montez jusqu\'à la colline de Borj Nord et admirez le panorama spectaculaire sur la médina et les montagnes environnantes.\r\n\r\nEn explorant Fès, vous plongerez dans un monde où le passé et le présent se mêlent harmonieusement, offrant une expérience culturelle riche et inoubliable.', 'image_2024-03-30_152551644.png', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52908.41441241698!2d-5.0017404!3d34.02396285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9f8b484d445777%3A0x10e6aaaeedd802ef!2zRsOocw!5e0!3m2!1sfr!2sma!4v1711810331004!5m2!1sfr!2sma\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade', 'Fès'),
(19, 'Marrakech, surnommée la \"Ville rouge\" pour la couleur de ses murailles et de ses bâtiments, est une oasis en plein désert qui captive les voyageurs avec son charme exotique et son ambiance vibrante.\r\n\r\nCommencez votre exploration par la célèbre place Jemaa el-Fna, un carrefour animé où les conteurs, les musiciens, les danseurs et les charmeurs de serpents créent un spectacle envoûtant dès le coucher du soleil. Perdez-vous dans les souks labyrinthiques adjacents, où vous pourrez découvrir une myriade de trésors, des épices parfumées aux tapis colorés en passant par l\'artisanat local.\r\n\r\nDécouvrez l\'histoire fascinante de Marrakech en visitant des sites emblématiques tels que la mosquée de Koutoubia, un chef-d\'œuvre de l\'architecture mauresque, et le palais de la Bahia, un palais magnifique orné de jardins luxuriants et de décorations élaborées.\r\n\r\nExplorez les jardins majestueux de la palmeraie de Marrakech, où des milliers de palmiers offrent un refuge paisible loin de l\'agitation de la ville. Admirez les fontaines envoûtantes et les allées ombragées du jardin de Majorelle, un havre de paix créé par le peintre français Jacques Majorelle.\r\n\r\nPour une expérience sensorielle inoubliable, rendez-vous dans un hammam traditionnel pour vous détendre et vous ressourcer dans un cadre luxueux inspiré des bains maures. Laissez-vous séduire par les délices de la cuisine marocaine dans les restaurants traditionnels de la ville, où vous pourrez déguster des plats succulents tels que le couscous, le tajine et les pâtisseries sucrées.\r\n\r\nEnfin, ne manquez pas l\'occasion de faire une excursion dans les montagnes de l\'Atlas, où vous pourrez découvrir des villages berbères pittoresques, des cascades spectaculaires et des paysages à couper le souffle.\r\n\r\nMarrakech est une ville enchanteresse qui séduit les voyageurs avec son mélange envoûtant de tradition et de modernité, d\'exotisme et de sophistication. Une fois que vous aurez découvert son charme captivant, vous comprendrez pourquoi elle est l\'une des destinations les plus prisées du Maroc.', 'image_2024-03-30_153937468.png', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108702.9590386311!2d-8.090427123547602!3d31.63474104103781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d96179e51%3A0x5950b6534f87adb8!2sMarrakech!5e0!3m2!1sfr!2sma!4v1711812536019!5m2!1sfr!2sma\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade', 'Marrakech'),
(20, 'Ifrane, surnommée la \"Suisse marocaine\", est une charmante ville nichée dans les montagnes du Moyen Atlas, à environ 1 665 mètres d\'altitude. Contrairement à de nombreuses autres villes du Maroc, Ifrane se distingue par son architecture unique, qui évoque davantage les chalets alpins que les bâtiments traditionnels marocains.\r\n\r\nLorsque vous explorez Ifrane, vous serez immédiatement frappé par ses rues propres et bien entretenues, ses jardins fleuris et son atmosphère paisible. La ville est entourée de forêts de cèdres, de chênes et de pins, offrant un cadre naturel spectaculaire pour la randonnée, l\'observation des oiseaux et d\'autres activités de plein air.\r\n\r\nLa ville est également célèbre pour son université Al Akhawayn, une institution d\'enseignement supérieur prestigieuse où des étudiants du monde entier viennent étudier dans un cadre pittoresque et paisible.\r\n\r\nEn hiver, Ifrane se transforme en une station de sports d\'hiver animée, attirant les amateurs de ski, de snowboard et de sports de neige. Les pistes de ski d\'Oukaïmeden, les plus hautes d\'Afrique, ne sont qu\'à une heure de route d\'Ifrane.\r\n\r\nPour les amoureux de la nature, la région environnante abrite également le parc national d\'Ifrane, où vous pourrez découvrir une faune et une flore riches, notamment des singes magots, des cerfs de l\'Atlas et une variété d\'oiseaux migrateurs.\r\n\r\nIfrane offre une escapade paisible et rafraîchissante loin de l\'agitation des villes marocaines plus animées, avec son air pur, son cadre naturel spectaculaire et son ambiance décontractée. Que vous soyez intéressé par les sports d\'hiver, la randonnée en montagne ou simplement la détente au cœur de la nature, Ifrane a quelque chose à offrir à tous les visiteurs.', 'image_2024-03-30_153859645.png', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53221.91741507665!2d-5.168982712397979!3d33.51776876247281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda1d772f32d140b%3A0x7253cf1d404c7ca3!2sIfrane!5e0!3m2!1sfr!2sma!4v1711812600334!5m2!1sfr!2sma\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade', 'Ifrane'),
(21, 'Agadir, une destination balnéaire prisée au Maroc, séduit les visiteurs avec ses plages dorées, son climat ensoleillé et son ambiance décontractée. Voici ce que vous pouvez découvrir à Agadir :\r\n\r\nCommencez votre visite par la célèbre promenade en front de mer d\'Agadir, où vous pourrez vous promener le long de la plage, vous détendre dans l\'un des nombreux cafés et restaurants en plein air, ou simplement vous imprégner du soleil méditerranéen.\r\n\r\nNe manquez pas de visiter la Kasbah d\'Agadir, une ancienne forteresse perchée sur une colline qui offre une vue panoramique sur la ville et l\'océan. Bien que la kasbah ait été en grande partie détruite lors d\'un tremblement de terre en 1960, elle reste un site historique important et un endroit idéal pour admirer le coucher du soleil.\r\n\r\nPour une expérience culturelle, visitez le souk El Had, l\'un des plus grands marchés d\'Afrique du Nord, où vous pourrez découvrir une multitude de produits locaux, des épices exotiques aux tapis colorés en passant par l\'artisanat traditionnel.\r\n\r\nAgadir est également réputée pour ses activités de plein air, notamment le surf, la planche à voile et la plongée sous-marine. Avec ses vagues parfaites et ses eaux cristallines, la plage d\'Agadir est un paradis pour les amateurs de sports nautiques.\r\n\r\nPour une escapade naturelle, explorez la réserve naturelle de Souss-Massa, où vous pourrez observer une variété d\'oiseaux migrateurs, y compris les flamants roses, ainsi que d\'autres espèces de faune et de flore locales.\r\n\r\nEnfin, ne manquez pas de déguster la délicieuse cuisine marocaine à Agadir, des fruits de mer frais aux tajines épicés en passant par les délicieuses pâtisseries sucrées. Les restaurants de la ville offrent une variété de plats pour satisfaire tous les goûts et tous les budgets.\r\n\r\nAgadir est une destination idéale pour les voyageurs en quête de soleil, de détente et d\'aventure, avec ses plages magnifiques, ses attractions culturelles et son atmosphère accueillante. Que vous soyez intéressé par la plage, la culture ou les sports nautiques, Agadir a quelque chose à offrir à tous les visiteurs.', 'image_2024-03-30_153306413.png', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110098.31962257897!2d-9.660318681850274!3d30.419869058527226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3b6e9daad1cc9%3A0xbcf8d0b78bf48474!2sAgadir%2080000!5e0!3m2!1sfr!2sma!4v1711812708096!5m2!1sfr!2sma\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade', 'Agadir'),
(22, 'Essaouira, souvent surnommée la \"Perle de l\'Atlantique\", est une ville côtière envoûtante située sur la côte atlantique du Maroc. Voici ce que vous pouvez découvrir à Essaouira :\r\n\r\nCommencez par vous promener dans la médina d\'Essaouira, classée au patrimoine mondial de l\'UNESCO, où les ruelles étroites et sinueuses vous mènent à travers des siècles d\'histoire. Admirez l\'architecture distinctive des maisons blanches aux volets bleus, qui contrastent magnifiquement avec le bleu profond de l\'océan.\r\n\r\nExplorez les remparts imposants d\'Essaouira, qui offrent une vue panoramique imprenable sur la ville, le port et l\'océan. Ne manquez pas la célèbre Scala, une forteresse du 18ème siècle qui a été utilisée comme décor pour de nombreux films et séries télévisées.\r\n\r\nEssaouira est également réputée pour son artisanat, en particulier la marqueterie de bois et la fabrication d\'instruments de musique traditionnels. Promenez-vous dans les souks animés de la médina, où vous pourrez acheter des souvenirs uniques tels que des bijoux berbères, des tapis tissés à la main et des poteries colorées.\r\n\r\nPour une expérience culinaire inoubliable, dégustez les fruits de mer frais d\'Essaouira dans l\'un des nombreux restaurants de la ville. Les poissons et les fruits de mer sont pêchés quotidiennement dans le port, ce qui garantit une fraîcheur incomparable.\r\n\r\nEssaouira est également un paradis pour les amateurs de sports nautiques, avec ses vents forts et constants qui en font un lieu de prédilection pour le kitesurf, la planche à voile et le surf. Si vous préférez une expérience plus détendue, vous pouvez vous détendre sur la plage de sable fin et profiter du soleil marocain.\r\n\r\nEnfin, ne manquez pas d\'explorer les environs d\'Essaouira, notamment les dunes de sable de l\'arrière-pays et les villages de pêcheurs pittoresques le long de la côte.\r\n\r\nEssaouira est une destination envoûtante qui séduit les visiteurs avec son charme historique, son ambiance décontractée et ses paysages côtiers spectaculaires. Que vous soyez intéressé par la culture, la cuisine ou les sports nautiques, Essaouira offre une expérience authentique du Maroc que vous n\'oublierez pas de sitôt.', 'image_2024-03-30_153502027.png', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27211.83872144321!2d-9.783184737014553!3d31.51097848063586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdad9a4e9f588ccf%3A0x57421a176d5d7d30!2sEssaouira!5e0!3m2!1sfr!2sma!4v1711812876575!5m2!1sfr!2sma\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade', 'Essaouira'),
(23, 'Tanger, située à l\'extrême nord du Maroc, est une ville fascinante qui allie l\'influence européenne à l\'essence traditionnelle marocaine. Voici ce que vous pouvez découvrir à Tanger :\r\n\r\nCommencez votre visite par la médina de Tanger, où vous pourrez vous perdre dans un dédale de ruelles étroites bordées de maisons blanchies à la chaux et de boutiques colorées. Admirez l\'architecture unique des maisons traditionnelles, avec leurs portes en bois sculpté et leurs balcons ornés de fer forgé.\r\n\r\nNe manquez pas la Kasbah de Tanger, une ancienne citadelle perchée sur une colline qui offre une vue panoramique sur le détroit de Gibraltar et la côte espagnole. Promenez-vous dans les jardins paisibles de la kasbah et découvrez l\'histoire fascinante de la ville.\r\n\r\nTanger est également réputée pour ses plages spectaculaires, notamment la plage de sable doré de Malabata et la baie de Tanger, où vous pourrez vous détendre au soleil, nager dans les eaux cristallines ou pratiquer des sports nautiques comme le jet-ski et le surf.\r\n\r\nPour une expérience culturelle, visitez le musée de la Kasbah, qui abrite une collection impressionnante d\'artefacts historiques et d\'œuvres d\'art marocaines. Vous pouvez également explorer le musée d\'art contemporain de Tanger, qui présente des expositions d\'artistes locaux et internationaux.\r\n\r\nTanger est également connue pour être un carrefour culturel, attirant des écrivains, des artistes et des intellectuels du monde entier. Promenez-vous le long de la corniche de Tanger, où vous pourrez admirer des sculptures modernes et des installations artistiques, ainsi que des vues spectaculaires sur l\'océan.\r\n\r\nEnfin, ne manquez pas de déguster la délicieuse cuisine de Tanger dans l\'un des nombreux restaurants de la ville. Des plats traditionnels marocains aux influences méditerranéennes et internationales, vous trouverez une variété de saveurs à savourer.\r\n\r\nTanger est une ville dynamique et multiculturelle qui offre une expérience unique du Maroc, avec son mélange envoûtant d\'histoire, de culture et de paysages spectaculaires. Que vous soyez intéressé par l\'histoire, la plage ou la cuisine, Tanger a quelque chose à offrir à tous les visiteurs.', 'image_2024-03-30_153709347.png', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103599.61848555492!2d-5.917043608877545!3d35.763385332398315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b875cf04c132d%3A0x76bfc571bfb4e17a!2sTanger!5e0!3m2!1sfr!2sma!4v1711812972016!5m2!1sfr!2sma\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade', 'Tanger');

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

CREATE TABLE `contact` (
  `id` bigint(20) NOT NULL,
  `message` mediumtext DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` int(11) NOT NULL,
  `role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `full_name`, `password`, `phone_number`, `role`) VALUES
(2, 'admin@gmail.com', 'administrateur', '$2a$10$v5zai/p7aqwgqE8qPIk5LeqWn1Kozb5OPZoGs/fnJQJ5QQTe9GE6m', 658850573, 'admin');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKkgseyy7t56x7lkjgu3wah5s3t` (`user_id`);

--
-- Index pour la table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKe07k4jcfdophemi6j1lt84b61` (`user_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `city`
--
ALTER TABLE `city`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `FKkgseyy7t56x7lkjgu3wah5s3t` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `FKe07k4jcfdophemi6j1lt84b61` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
