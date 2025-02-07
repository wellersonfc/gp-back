-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gerenciamento_de_tarefas
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB
CREATE DATABASE IF NOT EXISTS gerenciamento_de_tarefas;
USE gerenciamento_de_tarefas;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `projetos`
--

DROP TABLE IF EXISTS `projetos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projetos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `descricao` text DEFAULT NULL,
  `dateinicio` date NOT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projetos`
--

/*!40000 ALTER TABLE `projetos` DISABLE KEYS */;
INSERT INTO `projetos` VALUES (47,'Organização da Ceia de Natal em Família','Para garantir uma ceia harmoniosa e bem organizada, é importante dividir as tarefas entre os familiares. Cada um pode contribuir para que a celebração seja especial e sem imprevistos.','2025-12-24','2025-02-07 13:41:29');
/*!40000 ALTER TABLE `projetos` ENABLE KEYS */;

--
-- Table structure for table `tarefas`
--

DROP TABLE IF EXISTS `tarefas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarefas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `descricao` text DEFAULT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT current_timestamp(),
  `data_conclusao` date DEFAULT NULL,
  `status` varchar(50) NOT NULL,
  `id_projeto` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ed79e32fae1cb220c3149b94f49` (`id_projeto`),
  CONSTRAINT `FK_ed79e32fae1cb220c3149b94f49` FOREIGN KEY (`id_projeto`) REFERENCES `projetos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarefas`
--

/*!40000 ALTER TABLE `tarefas` DISABLE KEYS */;
INSERT INTO `tarefas` VALUES (30,'Decoração da mesa','Arrumar toalhas, velas, enfeites e organizar os lugares para todos os convidados','2025-02-07 13:41:49',NULL,'Não Iniciado',47),(31,'Preparo dos pratos',' Dividir entre os familiares os pratos principais, acompanhamentos e sobremesas.','2025-02-07 13:42:01',NULL,'Não Iniciado',47),(32,'Bebidas e brindes','Comprar e organizar sucos, refrigerantes e espumantes para o brinde da noite.','2025-02-07 13:42:15',NULL,'Não Iniciado',47),(33,'Troca de presentes','Separar um horário para a entrega dos presentes e organizar a ordem da distribuição.','2025-02-07 13:53:14',NULL,'Não Iniciado',47),(34,'Lembrete de fotos','Designar alguém para registrar os momentos especiais da ceia com fotos e vídeos.','2025-02-07 13:53:26','2025-07-02','concluída',47);
/*!40000 ALTER TABLE `tarefas` ENABLE KEYS */;

--
-- Dumping routines for database 'gerenciamento_de_tarefas'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-07 15:42:51
