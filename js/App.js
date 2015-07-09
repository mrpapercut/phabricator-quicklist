'use strict';

import React from 'react';

import Container from './Container';

const container = React.createFactory(Container);

class App {
	constructor(ctx) {
		React.render(container({ctx}), document.getElementById('container'));
	}
}

export default App;