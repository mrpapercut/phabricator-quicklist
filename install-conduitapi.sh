#!/bin/bash

# Install Conduit API
if [ ! -d ./lib/libphutil ]; then
	echo -n "Installing Conduit API..."
	git clone https://github.com/phacility/libphutil.git ./lib/libphutil &> /dev/null
	echo "done."
	echo ""

	# Setting definitions file
	if [ ! -d ./inc ]; then
		mkdir inc
		echo -e "<?php\n\ndefine('API_TOKEN', '');\ndefine('CONDUIT_HOST', '');\n" > inc/definitions.inc.php
	fi
fi