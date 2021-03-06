const host = process.env.HOST;
const port = process.env.PORT;
const hostRoot = () => {
	if (process.env.NODE_ENV === 'development') {
		return `${host}:${port}`;
	} else {
		return host;
	}
};

const swaggerSpecs = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Get it done REST API service',
			version: '1.0.0',
			description:
				'Get it done API provides an interface to connect' +
				' to your workspace from other frontends. The application' +
				' follows a workflow that embraces the paradigm from' +
				' David Allen\'s book \'Gettings things done\'.' +
				' The idea is that you will always start with a single' +
				' `intray item`, which includes nothing but a title and a' +
				' description. Depending on how you categorize it, more' +
				' properties become available as other resources are' +
				' created. Each of these has a dedicated endpoint to' +
				' allow a maximum of flexibility. Also, all models are' +
				' built in a way that makes them easy to convert from' +
				' one to the other, while keeping the core information' +
				', such as `title`, `description` and `next action date`,' +
				' intact. There is a distinction between primary and' +
				' secondary resources, where the first are the items' +
				' described in the book and the secondaries are' +
				' helpers, which are valid on a global scale. That,' +
				' however, means, that if this application is used for' +
				' collaborative purposes, each team should maintain their' +
				' dedicated version of it, as **\'Get it done\' is not meant' +
				' for whole departments, but at its maximum for small,' +
				' fast pacing teams.**',

			license: {
				name: 'MIT',
				url: 'https://spdx.org/licenses/MIT.html',
			},
			termsOfService: `${host}/terms`,
			contact: {
				name: 'Tobias Quante',
				url: `${host}`,
				email: 'tobi@q-bit.me',
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
			name: 'Auth',
			description:
				'Secondary resource: The auth resource is used to authenticate users against a single endpoint. The primary keys to access these have to be the same as for the user resource',
		},
		{
			name: 'Next action',
			description: 'Primary resource: Tasks or actions that should be done next.',
		},
		{
			name: 'Project',
			description:
				'Primary resource: Projects are a collection of next action - items. Project can keep a backlog of the other items.',
		},
		{
			name: 'Action lists',
			description:
				'Secondary resource: Instead of putting them into a single todo - list, action items can be placed into a single list. These can be customized by a user.',
		},
		{
			name: 'Operators',
			description: 'People to which actions or tasks can be delegated',
		},
		{
			name: 'Users',
			description:
				'Secondary resource: Users can perform operations on the API. Also, this resource is used to customize the UI or user settings',
		},
		{
			name: 'Logs',
			description:
				'Secondary resource: Each task can include several logs. These might be single subtasks that have been done, communication that happened, etc.',
		},
		{
			name: 'Clients',
			description:
				'Secondary resource: A client is somebody to do work for. This resource includes their contact- and payment information.',
		},
		{
			name: 'Efforts',
			description:
				'Secondary resource: Efforts log the time being spent on a single task. They also link the action to a client.',
		},
	],
	apis: [
		/* Authenticaiton resource */
		'./api/v1/specs/auth.yaml',

		/* Primary resources */
		// './api/v1/specs/intray.yaml',
		// './api/v1/specs/information.yaml',
		// './api/v1/specs/waiting.yaml',
		// './api/v1/specs/calender.yaml',
		// './api/v1/specs/action.yaml',
		// './api/v1/specs/project.yaml',

		/* Secondary resources */
		'./api/v1/specs/lists.yaml',
		'./api/v1/specs/operators.yaml',
		'./api/v1/specs/users.yaml',
		// './api/v1/specs/logs.yaml',
		// './api/v1/specs/efforts.yaml',
		'./api/v1/specs/clients.yaml',

		/* Exception resources */
		'./api/v1/specs/messages.yaml',
	],
};

const swaggerOptions = {
	customJs: `${hostRoot()}/js/swagger.js`,
	customCssUrl: `${hostRoot()}/css/main.css`,
};

module.exports = { swaggerSpecs, swaggerOptions };
