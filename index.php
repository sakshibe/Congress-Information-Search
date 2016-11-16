<?php

header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true ");
    header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
    header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
    header('Content-type: application/json');



$json0=file_get_contents("http://104.198.0.197:8080/legislators?apikey=6a6f265b19cb46bdb4c2d463d1efb0f4&per_page=all");
			$data0 = json_decode($json0,true);
$json1=file_get_contents("http://104.198.0.197:8080/bills?last_version.urls.pdf__exists=true&history.active=true&apikey=6a6f265b19cb46bdb4c2d463d1efb0f4&per_page=50");
            $data1 = json_decode($json1,true);
$json2=file_get_contents("http://104.198.0.197:8080/bills?last_version.urls.pdf__exists=true&history.active=false&apikey=6a6f265b19cb46bdb4c2d463d1efb0f4&per_page=50");
			$data2 = json_decode($json2,true);
$json3=file_get_contents("http://104.198.0.197:8080/committees?apikey=6a6f265b19cb46bdb4c2d463d1efb0f4&per_page=all");
			$data3 = json_decode($json3,true);
			echo json_encode(array($data0,$data1,$data2,$data3));
			?>
			
			