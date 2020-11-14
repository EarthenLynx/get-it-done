const host = process.env.HOST;
const port = process.env.PORT;

module.exports = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Express API Swagger boilerplate',
			version: '1.2.3',
			description:
				'This is a boilerplate to document openapi interfaces. Please refrain to the MD file in the root file for more info',
			license: {
				name: 'MIT',
				url: 'https://spdx.org/licenses/MIT.html',
			},
			termsOfService: `${host}/terms`,
			contact: {
				name: 'API Admin',
				url: `${host}`,
				email: 'info@openapi.com',
			},
		},
		host: `${host}`,
		servers: [
			{
				url: `${host}:${port}`,
			},
		],
	},
	tags: [
		{
			name: 'Users',
			description: 'API endpoint to handle user data',
		},
		{
			name: 'Todos',
			description: 'API endpoint to handle todo data',
		},
	],
	components: {
		schemas: {
			BadRequest: {
				type: 'object',
				properties: {
					status: {
						type: 'string',
						description:
							'Describes the type of error that occured during execution',
					},
					msg: {
						type: 'string',
						description:
							'Includes a message for the user to see what went wrong',
					},
				},
			},
		},
	},
	apis: ['./routes/todo.js', './routes/user.js'],
};
