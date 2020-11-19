/**
 * This file is used to execute functions once the repos is initialized.
 * It can be deleted once the workspace is set up.
 */

// Import necessary modules
const { writeFileSync, existsSync } = require('fs');
const path = require('path');
const chalk = require('chalk');

const envPath = path.join(__dirname, '../.env');

// Function definitions
const createDotEnvFile = () => {
	const envText = `PORT=3000
HOST=http://localhost
ENVIRONMENT=development
API_VERSION=/v1
PATH_DOCS=/api-docs
SECRET=SUPER_SECRET_123`;
	writeFileSync(envPath, envText);
};

// Check if .env file exists. If it doesn't create and populate it
console.log(chalk.green(`Checking if there is a .env file at ${envPath}`));
const envExists = existsSync(envPath);
if (!envExists) {
	console.log(chalk.green('Created env file.'));
	createDotEnvFile();
} else {
	console.log(chalk.green('Env file detected, skipping.'));
}
