<?php
return array(
	"siteUrl"=>"http://srv2-vm-2102.sts-sio-caen.info/",
	"database"=>[
			"type"=>"mysql",
			"wrapper"=>"Ubiquity\\db\\providers\\pdo\\PDOWrapper",
			"dbName"=>getenv('DB_NAME'),
			"serverName"=>"127.0.0.1",
			"port"=>"3306",
			"user"=>getenv('DB_USER'),
			"password"=>getenv('DB_PASS'),
			"options"=>array(),
			"cache"=>false
			],
	"sessionName"=>"planitpoker",
	"namespaces"=>array(),
	"templateEngine"=>"\\Ubiquity\\views\\engine\\twig\\Twig",
	"templateEngineOptions"=>[
			"cache"=>false
			],
	"test"=>false,
	"debug"=>false,
	"logger"=>function (){return new \Ubiquity\log\libraries\UMonolog("planitpoker",\Monolog\Logger::INFO);},
	"di"=>[
			"@exec"=>array("jquery"=>function ($controller){
                    return \Ajax\php\ubiquity\JsUtils::diSemantic($controller);
                })
			],
	"cache"=>[
			"directory"=>"cache/",
			"system"=>"Ubiquity\\cache\\system\\ArrayCache",
			"params"=>array()
			],
	"mvcNS"=>[
			"models"=>"models",
			"controllers"=>"controllers",
			"rest"=>"",
			"domains"=>"domains"
			],
	"encryption_key"=>getenv('encryption_key')
	);