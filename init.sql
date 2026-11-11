CREATE TABLE IF NOT EXISTS contacts(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    email VARCHAR(300),
    phone VARCHAR(20),
    date DATE,
    message TEXT
);