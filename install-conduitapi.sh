#!/bin/bash

# Install Conduit API
if [ ! -d ./lib/libphutil ]; then
	echo -n "Installing Conduit API..."
	git clone https://github.com/phacility/libphutil.git ./lib/libphutil &> /dev/null
	echo "done."
	echo ""
fi

# Setting definitions file
if [ ! -d ./inc ]; then
	mkdir inc
fi
echo -e "<?php\n\ndefine('API_TOKEN', '');\ndefine('CONDUIT_HOST', '');\n" > inc/definitions.inc.php