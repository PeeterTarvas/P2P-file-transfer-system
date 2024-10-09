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
