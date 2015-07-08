#!/bin/bash

# Install Conduit API
if [ ! -d ./lib/libphutil ]; then
	echo -n "Installing Conduit API..."
	git clone https://github.com/phacility/libphutil.git ./lib/libphutil &> /dev/null
	echo "done."
	echo ""
fi