const userSchema = `
    CREATE TABLE IF NOT EXISTS user (
      id int(11) NOT NULL,
      username varchar(255) NOT NULL,
      password varchar(255) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

module.exports = userSchema;