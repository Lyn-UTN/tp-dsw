-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: AIRBNG
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.24.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Cliente`
--

DROP TABLE IF EXISTS `Cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cliente` (
  `DNI` int unsigned NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `clave` varchar(100) NOT NULL,
  PRIMARY KEY (`DNI`),
  UNIQUE KEY `DNI_UNIQUE` (`DNI`),
  UNIQUE KEY `telefono` (`telefono`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cliente`
--

LOCK TABLES `Cliente` WRITE;
/*!40000 ALTER TABLE `Cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `Cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pago`
--

DROP TABLE IF EXISTS `Pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pago` (
  `idReserva` int NOT NULL,
  `idPago` int NOT NULL,
  `metodoPago` varchar(50) NOT NULL,
  `fechaPago` date NOT NULL,
  `estadoPago` varchar(20) NOT NULL,
  `montoPago` decimal(10,2) NOT NULL,
  PRIMARY KEY (`idReserva`,`idPago`),
  CONSTRAINT `Pago_ibfk_1` FOREIGN KEY (`idReserva`) REFERENCES `Reserva` (`idReserva`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pago`
--

LOCK TABLES `Pago` WRITE;
/*!40000 ALTER TABLE `Pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `Pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Provincia`
--

DROP TABLE IF EXISTS `Provincia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Provincia` (
  `nombreProv` varchar(100) NOT NULL,
  PRIMARY KEY (`nombreProv`),
  UNIQUE KEY `nombreProv` (`nombreProv`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Provincia`
--

LOCK TABLES `Provincia` WRITE;
/*!40000 ALTER TABLE `Provincia` DISABLE KEYS */;
/*!40000 ALTER TABLE `Provincia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reserva`
--

DROP TABLE IF EXISTS `Reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reserva` (
  `idReserva` int NOT NULL AUTO_INCREMENT,
  `fechaReserva` date NOT NULL,
  `fechaDesde` date NOT NULL,
  `fechaHasta` date NOT NULL,
  `horaDesde` time NOT NULL,
  `horaHasta` time NOT NULL,
  `estadoRes` varchar(20) NOT NULL,
  `DNI` int unsigned NOT NULL,
  `idGarage` int NOT NULL,
  `idTipoReserva` int unsigned NOT NULL,
  PRIMARY KEY (`idReserva`),
  KEY `DNI` (`DNI`),
  KEY `idGarage` (`idGarage`),
  KEY `idTipoReserva` (`idTipoReserva`),
  CONSTRAINT `Reserva_ibfk_1` FOREIGN KEY (`DNI`) REFERENCES `Cliente` (`DNI`),
  CONSTRAINT `Reserva_ibfk_2` FOREIGN KEY (`idGarage`) REFERENCES `garage` (`idGarage`),
  CONSTRAINT `Reserva_ibfk_3` FOREIGN KEY (`idTipoReserva`) REFERENCES `tipoReserva` (`idTipoReserva`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reserva`
--

LOCK TABLES `Reserva` WRITE;
/*!40000 ALTER TABLE `Reserva` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vehiculo`
--

DROP TABLE IF EXISTS `Vehiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Vehiculo` (
  `patente` varchar(50) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `idTipoVehiculo` int unsigned NOT NULL,
  `DNI` int unsigned NOT NULL,
  PRIMARY KEY (`patente`),
  UNIQUE KEY `patente` (`patente`),
  UNIQUE KEY `idTipoVehiculo_UNIQUE` (`idTipoVehiculo`),
  UNIQUE KEY `DNI_UNIQUE` (`DNI`),
  CONSTRAINT `fk_Vehiculo_cliente` FOREIGN KEY (`DNI`) REFERENCES `Cliente` (`DNI`),
  CONSTRAINT `fk_Vehiculo_tipoVehiculo` FOREIGN KEY (`idTipoVehiculo`) REFERENCES `tipoVehiculo` (`idTipoVehiculo`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vehiculo`
--

LOCK TABLES `Vehiculo` WRITE;
/*!40000 ALTER TABLE `Vehiculo` DISABLE KEYS */;
/*!40000 ALTER TABLE `Vehiculo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `DNI` int unsigned NOT NULL,
  `idGarage` int NOT NULL,
  `puntuacion` int NOT NULL,
  `comentario` varchar(150) DEFAULT NULL,
  KEY `DNI` (`DNI`),
  KEY `idGarage` (`idGarage`),
  CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`DNI`) REFERENCES `Cliente` (`DNI`),
  CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`idGarage`) REFERENCES `garage` (`idGarage`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `garage`
--

DROP TABLE IF EXISTS `garage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `garage` (
  `idGarage` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `tipoGarage` varchar(50) NOT NULL,
  `mailDueño` varchar(100) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `idZona` int NOT NULL,
  PRIMARY KEY (`idGarage`),
  UNIQUE KEY `titulo` (`titulo`),
  UNIQUE KEY `direccion` (`direccion`),
  UNIQUE KEY `mailDueño` (`mailDueño`),
  KEY `idZona` (`idZona`),
  CONSTRAINT `garage_ibfk_1` FOREIGN KEY (`idZona`) REFERENCES `zona` (`idZona`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `garage`
--

LOCK TABLES `garage` WRITE;
/*!40000 ALTER TABLE `garage` DISABLE KEYS */;
/*!40000 ALTER TABLE `garage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `localidad`
--

DROP TABLE IF EXISTS `localidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `localidad` (
  `codigoPostal` int NOT NULL,
  `nombreProv` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`codigoPostal`),
  UNIQUE KEY `codigoPostal` (`codigoPostal`),
  KEY `nombreProv` (`nombreProv`),
  CONSTRAINT `localidad_ibfk_1` FOREIGN KEY (`nombreProv`) REFERENCES `Provincia` (`nombreProv`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localidad`
--

LOCK TABLES `localidad` WRITE;
/*!40000 ALTER TABLE `localidad` DISABLE KEYS */;
/*!40000 ALTER TABLE `localidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva_tipoReserva`
--

DROP TABLE IF EXISTS `reserva_tipoReserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva_tipoReserva` (
  `idTipoReserva` int unsigned NOT NULL,
  `idReserva` int NOT NULL,
  PRIMARY KEY (`idTipoReserva`,`idReserva`),
  KEY `idReserva` (`idReserva`),
  CONSTRAINT `reserva_tipoReserva_ibfk_1` FOREIGN KEY (`idTipoReserva`) REFERENCES `tipoReserva` (`idTipoReserva`),
  CONSTRAINT `reserva_tipoReserva_ibfk_2` FOREIGN KEY (`idReserva`) REFERENCES `Reserva` (`idReserva`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva_tipoReserva`
--

LOCK TABLES `reserva_tipoReserva` WRITE;
/*!40000 ALTER TABLE `reserva_tipoReserva` DISABLE KEYS */;
/*!40000 ALTER TABLE `reserva_tipoReserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoReserva`
--

DROP TABLE IF EXISTS `tipoReserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoReserva` (
  `idTipoReserva` int unsigned NOT NULL AUTO_INCREMENT,
  `descTipoReserva` varchar(50) NOT NULL,
  PRIMARY KEY (`idTipoReserva`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoReserva`
--

LOCK TABLES `tipoReserva` WRITE;
/*!40000 ALTER TABLE `tipoReserva` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipoReserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoVehiculo`
--

DROP TABLE IF EXISTS `tipoVehiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoVehiculo` (
  `idTipoVehiculo` int unsigned NOT NULL AUTO_INCREMENT,
  `descTipoVehiculo` varchar(50) NOT NULL,
  PRIMARY KEY (`idTipoVehiculo`),
  UNIQUE KEY `descTipoVehiculo_UNIQUE` (`descTipoVehiculo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoVehiculo`
--

LOCK TABLES `tipoVehiculo` WRITE;
/*!40000 ALTER TABLE `tipoVehiculo` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipoVehiculo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zona`
--

DROP TABLE IF EXISTS `zona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zona` (
  `idZona` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `codigoPostal` int NOT NULL,
  PRIMARY KEY (`idZona`),
  UNIQUE KEY `nombre` (`nombre`),
  KEY `codigoPostal` (`codigoPostal`),
  CONSTRAINT `zona_ibfk_1` FOREIGN KEY (`codigoPostal`) REFERENCES `localidad` (`codigoPostal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zona`
--

LOCK TABLES `zona` WRITE;
/*!40000 ALTER TABLE `zona` DISABLE KEYS */;
/*!40000 ALTER TABLE `zona` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-19 18:10:27
