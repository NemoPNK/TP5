CREATE TABLE tasks (
    id INTEGER UNIQUE,
    titre VARCHAR(255),
    complete BOOLEAN DEFAULT FALSE,
    assignee VARCHAR(50)
);

INSERT INTO tasks (id, titre, complete, assignee)
VALUES 
    (1, 'monter', TRUE, 'Paul de Montrouge'),
    (2, 'down', FALSE, NULL),
    (3, 'side', FALSE, NULL);