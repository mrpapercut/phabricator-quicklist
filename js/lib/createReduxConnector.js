'use strict';

import React from 'react';
import assign from 'object-assign';
import {bindActionCreators} from 'redux';
import {Provider, Connector} from 'redux/react';

const [provider, connector] = [Provider, Connector].map(React.createFactory);

export function createReduxConnector({actions, component, select}) {
	return class App extends React.Component {
		render() {
			return provider({redux: this.props.ctx.getRedux()}, () => connector(
				{select},
				props => component(assign(
					{ctx: this.props.ctx},
					props,
					bindActionCreators(actions, props.dispatch)
				))
			));
		}
	};
}
