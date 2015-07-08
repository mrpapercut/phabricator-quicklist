<?php

require_once '../lib/libphutil/src/__phutil_library_init__.php';

class PhabricatorApi {

	private $client;
	private $apitoken = '';
	private $host = '';

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

	public function getCreatedTasksByUser($data) {
		if (!isset($data['phid'])) return;

		$phid = $data['phid'];

		return $this->callMethod('maniphest.query', array(
			'authorPHIDs' => is_array($phid) ? $phid : array($phid),
			'projectPHIDs' => isset($data['project']) ? array($data['project']) : null,
			'status' => isset($data['status']) ? $data['status'] : 'status-open'
		), false);
	}

	public function getAssignedTasksByUser($data) {
		if (!isset($data['phid'])) return;

		$phid = $data['phid'];

		return $this->callMethod('maniphest.query', array(
			'ownerPHIDs' => is_array($phid) ? $phid : array($phid),
			'projectPHIDs' => isset($data['project']) ? array($data['project']) : null,
			'status' => isset($data['status']) ? $data['status'] : 'status-open'
		), false);
	}

	public function getTaskInfo($data) {
		if (!isset($data['id'])) return;

		$id = $data['id'];

		return $this->callMethod('maniphest.info', array(
			'task_id' => $id
		), false);
	}
}

if (is_array($_GET) && isset($_GET['query'])) {
	$api = new PhabricatorApi();

	echo $api->process($_GET['query'], $_GET);
}