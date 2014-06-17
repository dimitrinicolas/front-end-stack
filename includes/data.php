<?php 

$data = array();

$data["name"] = "MARMWORK";

$data["base_url"] = "http://127.0.0.1:1337/MARMWORK/";

$data["meta"] = array();

$data["meta"]["title"] = "Marmot Ipsum dolor sit amet";
$data["meta"]["author"] = "John Smith";
$data["meta"]["description"] = "A quiet Marmot Ipsum elit ullamco esse eiusmod irure quis incididunt labore.";
$data["meta"]["keywords"] = "marmot,alpes";
$data["meta"]["canonical"] = "http://127.0.0.1:1337";
$data["meta"]["type"] = "website";
$data["meta"]["image"] = $data["base_url"] . "assets/images/website.png";
$data["meta"]["favicon"] = $data["base_url"] . "assets/icons/favicon.ico";

if ($data["meta"]["title"] === "") {

	$data["title"] = $data["name"];

}

else {

	$data["title"] = $data["name"] . " - " . $data["meta"]["title"];

}