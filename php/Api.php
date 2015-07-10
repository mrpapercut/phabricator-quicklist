<?php

try {
	if (!file_exists('../lib/libphutil/src/__phutil_library_init__.php')) {
		throw new Exception('Conduit API not found. Please run `npm install` or install it manually to /lib/libphutil');
	} else if (!file_exists('../inc/definitions.inc.php')) {
		throw new Exception('inc/definitions.inc.php not found. Please run `npm install`');
	} else {
		require_once '../lib/libphutil/src/__phutil_library_init__.php';
		require_once '../inc/definitions.inc.php';
	}
} catch (Exception $e) {
	echo json_encode(array(
		'error' => array(
			'Message' => $e->getMessage(),
			'Code' => $e->getCode()
		)
	));
}

class PhabricatorApi {

	private $client;
	private $apitoken = API_TOKEN;
	private $host = CONDUIT_HOST;

	public function __construct() {
		$this->connect();
	}

	private function connect() {
		$this->client = new ConduitClient($this->host);
		$this->client->setConduitToken($this->apitoken);
	}

	private function callMethod($method, $params, $translate = true) {
		$result = $this->client->callMethodSynchronous($method, $params);
		return $translate ? $this->translatePHIDs($result) : $result;
	}

	private function translatePHIDs($array) {
		foreach ($array as $key => $value) {
			if (preg_match('/(.*)PHID/', $key, $matches)) {
				$array[$matches[1]] = $this->phidLookup($value);
			}
		}

		return $array;
	}

	private function phidLookup($phid) {
		return $this->callMethod('phid.lookup', array(
			'names' => is_array($phid) ? $phid : array($phid)
		));
	}

	public function process($query, $params) {
		if (method_exists($this, $query) && is_callable(array($this, $query))) {
			return json_encode(call_user_func(array($this, $query), $params));
		}
	}

	/* Available calls */
	public function listProjects() {
		return $this->callMethod('project.query', array());
	}

	public function listUsers() {
		return $this->callMethod('user.query', array());
	}

	public function getUserByName($data) {
		if (!isset($data['name'])) return;

		$name = $data['name'];

		return $this->callMethod('user.query', array(
			'usernames' => is_array($name) ? $name : array($name)
		));
	}

	public function getTasks($data) {
		$params = array();

		$params['status'] = isset($data['status']) ? $data['status'] : 'status-open';

		foreach(['author', 'project', 'owner'] as $type) {
			if (isset($data[$type])) {
				$params[$type.'PHIDs'] = is_array($data[$type]) ? $data[$type] : array($data[$type]);
			}
		}

		return $this->callMethod('maniphest.query', $params, false);
	}

	public function getTaskInfo($data) {
		if (!isset($data['id'])) return;

		return $this->callMethod('maniphest.info', array(
			'task_id' => $data['id']
		), false);
	}
}

try {
	if (!defined('API_TOKEN')) {
		throw new Exception('API_TOKEN not defined in inc/definitions.inc.php');
	} else if (!defined('CONDUIT_HOST')) {
		throw new Exception('CONDUIT_HOST not defined in inc/definitions.inc.php');
	} else {
		header("Access-Control-Allow-Origin: *");

		if (is_array($_GET) && isset($_GET['query'])) {
			$api = new PhabricatorApi();

			echo $api->process($_GET['query'], $_GET);
		}
	}
} catch (Exception $e) {
	echo json_encode(array(
		'error' => array(
			'Message' => $e->getMessage(),
			'Code' => $e->getCode()
		)
	));
}