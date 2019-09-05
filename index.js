'use strict';

const sqlite = require('sqlite');

const logger = require('./helpers/logger');
const buildSchemas = require('./src/schemas');

const port = 8010;

async function main() {
    const db = await sqlite.open(':memory:');

    buildSchemas(db);

    const app = require('./src/app')(db);

    app.listen(port, () => {
        logger.log({
            level: 'info',
            message: `App started and listening on port ${port}`
        });
    });
}

main();
