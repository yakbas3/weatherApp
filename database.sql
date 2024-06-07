-- Drop the weatherDB database if it exists
DROP DATABASE IF EXISTS weatherDB;

-- Create the weatherDB database
CREATE DATABASE weatherDB;

-- Use the weatherDB database
USE weatherDB;

-- Drop the user_tab table if it exists
DROP TABLE IF EXISTS user_tab;

-- Create the user_tab table
CREATE TABLE user_tab (
    Username VARCHAR(50) PRIMARY KEY,
    Password VARCHAR(255) NOT NULL,
    Name VARCHAR(100),
    UserType ENUM('admin', 'end_user') NOT NULL,
    DefaultCityName VARCHAR(100),
    Status VARCHAR(50)
);

-- Drop the user_log_tab table if it exists
DROP TABLE IF EXISTS user_log_tab;

-- Create the user_log_tab table
CREATE TABLE user_log_tab (
    LogId INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50),
    LogTime DATETIME NOT NULL,
    IPAddress VARCHAR(45),
    Log TEXT,
    FOREIGN KEY (Username) REFERENCES user_tab(Username)
);

-- Drop the weather_info_tab table if it exists
DROP TABLE IF EXISTS weather_info_tab;

-- Create the weather_info_tab table
CREATE TABLE weather_info_tab (
    WeatherDate DATE NOT NULL,
    CityName VARCHAR(100) NOT NULL,
    Temperature DECIMAL(5, 2),
    MainStatus ENUM('sunny', 'cloudy', 'rainy', 'foggy', 'snowy'),
    PRIMARY KEY (WeatherDate, CityName)
);

-- Insert dummy data into user_tab
INSERT INTO user_tab (Username, Password, Name, UserType, DefaultCityName, Status) VALUES
('user1', 'password1', 'John Doe', 'admin', 'New York', 'active'),
('user2', 'password2', 'Jane Smith', 'end_user', 'Los Angeles', 'active'),
('user3', 'password3', 'Alice Johnson', 'end_user', 'Chicago', 'inactive');

-- Insert dummy data into user_log_tab
INSERT INTO user_log_tab (Username, LogTime, IPAddress, Log) VALUES
('user1', '2024-06-01 12:00:00', '192.168.1.1', 'Login successful'),
('user2', '2024-06-01 12:05:00', '192.168.1.2', 'Login failed'),
('user1', '2024-06-01 12:10:00', '192.168.1.1', 'Password changed');

-- Insert dummy data into weather_info_tab
INSERT INTO weather_info_tab (WeatherDate, CityName, Temperature, MainStatus) VALUES
('2024-06-01', 'New York', 25.3, 'sunny'),
('2024-06-01', 'Los Angeles', 22.1, 'cloudy'),
('2024-06-01', 'Chicago', 18.7, 'rainy');
