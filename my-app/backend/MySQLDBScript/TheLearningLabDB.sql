-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 01, 2024 at 05:28 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Login`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_id` int(11) NOT NULL,
  `courseName` varchar(50) NOT NULL,
  `courseDescription` varchar(255) NOT NULL,
  `teacher_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_id`, `courseName`, `courseDescription`, `teacher_id`) VALUES
(3, 'World History', '9th grade world history 1600-1900', 65),
(4, 'Arithmetic', '2nd grade arithmetic class', 65),
(5, 'Computer Science 101', 'freshman level intro computer science class', 65),
(6, 'Algorithms', 'College sophomore level algorithms class', 69),
(7, 'Math', 'math', 65),
(8, 'Earth Science', '7th grade earth science class', 65),
(9, 'Math', 'math', 65),
(10, 'Computer Science 101', 'Introductory college CS class', 69),
(11, 'Spanish 1', 'Intro Spanish speaking class', 69),
(12, 'World History', 'World History class spanning years 1900-present', 69),
(13, 'Science', 'science', 65),
(15, 'math', 'math', 69),
(17, 'history', 'history', 65),
(18, 'geography', 'geography', 65),
(19, 'math', 'math', 65),
(20, 'data structures', 'data structures', 65),
(21, 'Algebra', 'algebra', 65),
(22, 'chemistry', 'chemistry', 65),
(23, 'artificial intelligence', 'AI', 65);

-- --------------------------------------------------------

--
-- Table structure for table `course_taken`
--

CREATE TABLE `course_taken` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_taken`
--

INSERT INTO `course_taken` (`id`, `course_id`, `teacher_id`, `student_id`) VALUES
(3, 3, 65, 66),
(1, 3, 65, 68),
(12, 3, 65, 70),
(13, 3, 65, 71),
(10, 4, 65, 66),
(11, 4, 65, 68),
(20, 4, 65, 70),
(21, 4, 65, 72),
(22, 4, 65, 73),
(23, 4, 65, 74),
(17, 10, 69, 66),
(18, 10, 69, 68),
(16, 15, 69, 66),
(15, 15, 69, 68),
(14, 20, 65, 66),
(19, 23, 65, 66);

-- --------------------------------------------------------

--
-- Table structure for table `game`
--

CREATE TABLE `game` (
  `game_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(250) NOT NULL,
  `gameType` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `game`
--

INSERT INTO `game` (`game_id`, `name`, `description`, `gameType`) VALUES
(1, 'ArithmeticPractice1', 'Introductory arithmetic practice part 1', 'trivia');

-- --------------------------------------------------------

--
-- Table structure for table `game_course`
--

CREATE TABLE `game_course` (
  `game_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `game_course`
--

INSERT INTO `game_course` (`game_id`, `course_id`) VALUES
(1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `game_student`
--

CREATE TABLE `game_student` (
  `game_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `game_student`
--

INSERT INTO `game_student` (`game_id`, `student_id`, `score`) VALUES
(1, 66, 130),
(1, 70, 90),
(1, 72, 120),
(1, 73, 40),
(1, 74, 130);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userType` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `name`, `email`, `password`, `userType`) VALUES
(65, 'Alyssa Brooke Ingerson', 'aing@yahoo.com', '$2a$10$sLsX0BW/JIAZdls0tTEx7eeZbCLAiwAw5EiII5hXUOYwn0NXTM4Z.', 'teacher'),
(66, 'John Doe', 'jdoe@hotmail.com', '$2a$10$GqR2vTEQyYCSNlCOo9mV8OoLIHImXE.AfEXLwrZDOltVJ4gAmUi6y', 'student'),
(67, 'Mark Ingerson', 'ming@gmail.com', '$2a$10$k0wTkGgqpd6vDLtkjF0UHe5UE.cObfl6lJVhYCZfbaD2vB9E3VI4e', 'teacher'),
(68, 'Levi Ingerson', 'lingerson@gmail.com', '$2a$10$5LtHY.3czn/E.tuXsbBxwuayw/tA4WgeDeSvLfG7X5BY/B00ItuGS', 'student'),
(69, 'George Smith', 'gsmith@gmail.com', '$2a$10$lBV2lzyyi64EPD59uAGIle5koVPzIuSIRE4vmRYe50PKGSxHZYeYq', 'teacher'),
(70, 'Sally Mae', 'smae@gmail.com', '$2a$10$L0I3rrLubhpmv.z6O0lM2eXkU3gFZcuKnJ7HMdeKGSVBA0SsAJUti', 'student'),
(71, 'Jane Doe', 'jadoe@gmail.com', '$2a$10$DW3SyzF5qZss62EjumZXeO1LX0/RTJCAieN6CkUyz67Fejy5jV/c6', 'student'),
(72, 'Sharon Ingerson', 'singerson@gmail.com', '$2a$10$lUtOM/kU3aYCFr0mKiXt8Oec7SwuPgzzISNXNakYNuGqL7ccxqqNq', 'student'),
(73, 'Jane Smith', 'jsmith@outlook.com', '$2a$10$LVoecV/mVKHb.nkWOpnYA.jUP8W/sGApJrnMMjZ4a5JFCW8gQI9wq', 'student'),
(74, 'Cutie Pie', 'robertsjr25@vmi.edu', '$2a$10$sIRRWqbOMt3Xh9P6i8BF7eEkdgaySiyInVx5YPm1Vt83hQ8Z3LnYO', 'student');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `email`) VALUES
(71, 'jadoe@gmail.com'),
(66, 'jdoe@hotmail.com'),
(73, 'jsmith@outlook.com'),
(68, 'lingerson@gmail.com'),
(74, 'robertsjr25@vmi.edu'),
(72, 'singerson@gmail.com'),
(70, 'smae@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `teacher_id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`teacher_id`, `email`) VALUES
(65, 'aing@yahoo.com'),
(69, 'gsmith@gmail.com'),
(67, 'ming@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `temp`
--

CREATE TABLE `temp` (
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `temp`
--

INSERT INTO `temp` (`score`) VALUES
(130);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`),
  ADD UNIQUE KEY `course_id` (`course_id`),
  ADD KEY `courseTeacherIDForeignKey` (`teacher_id`);

--
-- Indexes for table `course_taken`
--
ALTER TABLE `course_taken`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IdComboUniqueIndex` (`course_id`,`teacher_id`,`student_id`),
  ADD KEY `teacher_id` (`teacher_id`) USING BTREE,
  ADD KEY `student_id` (`student_id`) USING BTREE;

--
-- Indexes for table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`game_id`);

--
-- Indexes for table `game_course`
--
ALTER TABLE `game_course`
  ADD PRIMARY KEY (`game_id`,`course_id`),
  ADD KEY `game_courseCourseIDForeignKey` (`course_id`);

--
-- Indexes for table `game_student`
--
ALTER TABLE `game_student`
  ADD PRIMARY KEY (`game_id`,`student_id`),
  ADD KEY `game_id` (`game_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `student_id` (`student_id`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`teacher_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `teacher_id` (`teacher_id`);

--
-- Indexes for table `temp`
--
ALTER TABLE `temp`
  ADD PRIMARY KEY (`score`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `course_taken`
--
ALTER TABLE `course_taken`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `game`
--
ALTER TABLE `game`
  MODIFY `game_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `courseTeacherIDForeignKey` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`);

--
-- Constraints for table `course_taken`
--
ALTER TABLE `course_taken`
  ADD CONSTRAINT `courseIDForeignKey` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  ADD CONSTRAINT `course_takenStudentIDForeignKey` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  ADD CONSTRAINT `course_takenTeacherIDForeignKey` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`);

--
-- Constraints for table `game_course`
--
ALTER TABLE `game_course`
  ADD CONSTRAINT `game_courseCourseIDForeignKey` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  ADD CONSTRAINT `game_courseGameIDForeignKey` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`);

--
-- Constraints for table `game_student`
--
ALTER TABLE `game_student`
  ADD CONSTRAINT `game_studentGameIDForeignKey` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`),
  ADD CONSTRAINT `game_studentStudentIDForeignKey` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `studentIDForeignKey` FOREIGN KEY (`student_id`) REFERENCES `login` (`id`),
  ADD CONSTRAINT `studentNameForeignKey` FOREIGN KEY (`email`) REFERENCES `login` (`email`);

--
-- Constraints for table `teacher`
--
ALTER TABLE `teacher`
  ADD CONSTRAINT `teacherEmailForeignKey` FOREIGN KEY (`email`) REFERENCES `login` (`email`),
  ADD CONSTRAINT `teacherIDForeignKey` FOREIGN KEY (`teacher_id`) REFERENCES `login` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
