
create table students(
	student_id INT AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    gender enum("Male","Female", "Other"),
    address VARCHAR(255),
    phone_number VARCHAR(20),
    email VARCHAR(100),
    display_picture varchar(300),
    description varchar(300),
    last_login datetime default null,
    password varchar(40) not null,
    unique index `mq_mobile` (`phone_number` asc),
    unique index `mq_email` (`email` asc),
    PRIMARY KEY (student_id)

);


create table teachers(
teacher_id int not null primary key,
first_name varchar(50),
last_name varchar(50) default null,
dob DATE default null,
gender enum("Male","Female","Other") not null,
address varchar(255) default null,
password varchar(100),
display_picture varchar(100),
descriptions varchar(255),
email varchar(100) not null,
phone int not null,
unique index `mq_email` (`email` asc),
unique index `mq_phone` (`phone` asc)	
);



create table owners(
owner_id int not null auto_increment primary key,
first_name varchar(50) not null,
last_name varchar(50) default null,
dob date default null,
address varchar(255),
password varchar(100) not null,
profile_picture varchar(100),
description varchar(255),
email varchar(50) not null,
phone int not null,
unique index `mq_email` (`email` asc),
unique index `mq_phone` (`phone` asc) 
);


create table posts(
post_id int auto_increment primary key not null,
title varchar(100),
description varchar(255),
content text not null,
seo_title varchar(100) default null,
created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
seo_description varchar(255) default null,
featured_image varchar(100),
author_type enum("teacher","student","owner") not null,
foreign key (authorid) references teachers(teacher_id),
authorid int not null
);

alter table teachers modify phone varchar(20);
alter table owners modify phone varchar(20);


-- Sample data for the students table
INSERT INTO students (first_name, last_name, date_of_birth, gender, address, phone_number, email, display_picture, description, password) VALUES
('John', 'Doe', '2000-01-01', 'Male', '123 Street, City', '1234567890', 'john.doe@example.com', 'path_to_display_picture', 'Description for John Doe', 'password123'),
('Jane', 'Smith', '1999-05-05', 'Female', '456 Avenue, Town', '9876543210', 'jane.smith@example.com', 'path_to_display_picture', 'Description for Jane Smith', 'password456');

-- Sample data for the teachers table
INSERT INTO teachers (teacher_id, first_name, last_name, dob, gender, address, password, display_picture, descriptions, email, phone) VALUES
(1, 'Mike', 'Johnson', '1980-08-08', 'Male', '789 Boulevard, City', 'password789', 'path_to_display_picture', 'Description for Mike Johnson', 'mike.johnson@example.com', 1112223333),
(2, 'Emily', 'Williams', '1975-12-12', 'Female', '101 Main Street, Town', 'passwordabc', 'path_to_display_picture', 'Description for Emily Williams', 'emily.williams@example.com', 4445556666);

-- Sample data for the owners table
INSERT INTO owners (first_name, last_name, dob, address, password, profile_picture, description, email, phone) VALUES
('Robert', 'Brown', '1970-03-03', '888 Park Avenue, City', 'passwordxyz', 'path_to_profile_picture', 'Description for Robert Brown', 'robert.brown@example.com', 7778889999),
('Sarah', 'Davis', '1985-06-06', '555 Lake Road, Town', 'password123', 'path_to_profile_picture', 'Description for Sarah Davis', 'sarah.davis@example.com', 2223334444);

-- Sample data for the posts table
INSERT INTO posts (title, description, content, seo_title, seo_description, featured_image, author_type, authorid) VALUES
('Post Title 1', 'Description for Post 1', 'Content for Post 1', 'SEO Title for Post 1', 'SEO Description for Post 1', 'path_to_featured_image_1', 'teacher', 1),
('Post Title 2', 'Description for Post 2', 'Content for Post 2', 'SEO Title for Post 2', 'SEO Description for Post 2', 'path_to_featured_image_2', 'student', 1);






select * from owners;
select * from students;
select * from teachers;
select * from posts; 