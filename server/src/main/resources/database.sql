CREATE SCHEMA IF NOT EXISTS iot;

CREATE TABLE iot.user (
         user_id BIGSERIAL PRIMARY KEY,
         username VARCHAR(255) NOT NULL,
         password VARCHAR(255) NOT NULL,
         CONSTRAINT user_name_must_be_unique UNIQUE (username)
);

CREATE TABLE iot.address (
      address_id BIGSERIAL PRIMARY KEY,
      user_id BIGINT NOT NULL,
      ip VARCHAR(255) NOT NULL,
      port VARCHAR(4) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES iot.user(user_id)  ON UPDATE CASCADE ON DELETE CASCADE,
      CONSTRAINT user_id_and_ip_must_be_unique UNIQUE (user_id, ip)
);

CREATE TABLE iot.group (
      group_id BIGSERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      owner VARCHAR(255) NOT NULL
);

CREATE TABLE iot.group_members (
     group_id INTEGER REFERENCES iot.group(group_id) ON DELETE CASCADE,
     member_id INTEGER REFERENCES iot.user(user_id) ON DELETE CASCADE,
     PRIMARY KEY (group_id, member_id)
);
CREATE TABLE iot.files
(
    file_id         BIGSERIAL PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    size            BIGINT,
    checksum        VARCHAR(64),
    added_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE iot.file_availability
(
    file_id   BIGINT REFERENCES iot.files (file_id),
    user_id   BIGINT REFERENCES iot.user (user_id),
    available BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (file_id, user_id)
);