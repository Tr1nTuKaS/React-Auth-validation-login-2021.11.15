-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Oct 14, 2021 at 06:24 AM
-- Server version: 5.7.32
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `usersDBPractice`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `postId` int(10) UNSIGNED NOT NULL,
  `title` varchar(50) NOT NULL,
  `body` text NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `timeStamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`postId`, `title`, `body`, `image`, `timeStamp`, `userId`) VALUES
(1, 'First posts', 'Some long text about sttuff', NULL, '2021-10-13 10:57:27', 1),
(2, 'Second posts', 'Some long text about sttuff', NULL, '2021-10-13 10:58:11', 1),
(3, 'First of all', 'Some long text about sttuff', NULL, '2021-10-13 10:58:25', 2),
(4, '2021 year', 'Some long text about sttuff', NULL, '2021-10-13 10:58:37', 2),
(5, 'Janes diary', 'Some long text about sttuff', NULL, '2021-10-13 10:58:50', 3),
(6, 'Be awesome', 'Some long text about sttuff', NULL, '2021-10-13 10:58:59', 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `timeStamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `email`, `password`, `timeStamp`) VALUES
(1, 'James@Bond.com', '$2a$10$7ccKhBUmdHxbx7k1CdL.s.eaQG5gcZe5mLpeiqL3rYJ7GMrqG3ite', '2021-10-13 09:57:19'),
(2, 'Mike@Tyson.com', '$2a$10$vXcZdJH4FKwA07c6y2VwHeYBy7SHLslyYccph3m5N0J0idBHvRTXm', '2021-10-13 09:58:33'),
(3, 'Jant@Doe.com', '$2a$10$R8p1Y9HI0r2Z1egUx3p1Xe8/yip1Qoaey8qsYW8qunUkH900XC5i2', '2021-10-13 10:01:04'),
(5, 'Mike@Bloom.com', '$2a$10$h4AELSQejPZtzgrA5By4QeOwkJjCky0tD/x7ZfIHO4wUDml/vUn3a', '2021-10-13 11:46:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`postId`),
  ADD KEY `postToUser` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `postId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `postToUser` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);
