var app = angular.module('myApp', ['angularUtils.directives.dirPagination','ngStorage']);
app.controller('myCtrl', function($scope,$sessionStorage, $http, $filter, $sce) {
var res0,res1,res2;
var arrL = new Array();
var arrB = [];
var arrC = [];
$http({
           method: 'GET',
           url: 'http://webappenv-env.us-west-2.elasticbeanstalk.com/'
		   
     }).then(function successCallback(response){
             
            res0 = response.data[0];
					$scope.namesL = res0.results; 
		
			res1 = response.data[1];
					$scope.namesBActive = res1.results;
					
			res2 = response.data[2];
					$scope.namesBNew = res2.results;
					
			res3 = response.data[3];
					$scope.namesC = res3.results;				
			},
            function errorCallback(response){
            });
            
$scope.state = {
	"legislator": true, "bills" : false, "committee": false , "favoritesL" : false
};
$scope.state.contactId = true;
$scope.state.officeId = true;
$scope.state.ParComId = true;
$scope.panels = [
		{"Ptxt" : "By State", "filTxt":"", "curr":"active"},
		{"Ptxt" : "House", "filTxt":"house", "curr":""},
		{"Ptxt" : "Senate","filTxt":"senate","curr":""}
	];
$scope.heading = 'Legislators';
$scope.headingBy = 'Legislators By State';
$scope.state.searchTabId = false;
$scope.state.dropdown_select = true;
$scope.orderByS = 'state';
$scope.orderByL =  'last_name';
$scope.states = ['All States','Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
$scope.searchModel = $scope.states[0];
$scope.searchDropDown = function(searchModel)
{
 if(searchModel == 'All States')
	$scope.searchDrop = '';
 else
	$scope.searchDrop = searchModel;
}
	$scope.selected = true;
$scope.btnPanel = function(p){
$scope.headingBy = p.Ptxt;

if(p.Ptxt == 'Active Bills')
{
$scope.namesB = $scope.namesBActive;
}
if(p.Ptxt == 'New Bills')
{
$scope.namesB = $scope.namesBNew;
}
	if(p.Ptxt == 'Legislators')
	{
		$scope.headingBy = 'Favorite Legislators';
		$scope.state.favoritesL = true;
		$scope.state.favoritesB = false;
		$scope.state.favoritesC = false;
	}
	else if(p.Ptxt == 'Bills')
	{
		$scope.headingBy = 'Favorite Bills';
		$scope.state.favoritesL = false;
		$scope.state.favoritesB = true;
		$scope.state.favoritesC = false;
	}
	else if(p.Ptxt == 'Committees')
	{
		$scope.headingBy = 'Favorite Committees';
		$scope.state.favoritesL = false;
		$scope.state.favoritesB = false;
		$scope.state.favoritesC = true;
	}
	else
	{
		$scope.srch1 = p.filTxt;
		if(p.Ptxt == 'By State')
		{
			$scope.headingBy = 'Legislators By State';
			$scope.state.searchTabId = false;
			$scope.state.dropdown_select = true;
			$scope.orderByS = 'state';
			$scope.orderByL =  'last_name';
		}
		else if(p.Ptxt == 'House' && $scope.heading == 'Legislators')
		{
			$scope.orderByS = 'last_name';
			
			$scope.state.dropdown_select = false;
			$scope.state.searchTabId = true;
			$scope.headingBy = 'Legislators By House';
		}
		else if(p.Ptxt == 'Senate'&& $scope.heading == 'Legislators')
		{
			
			$scope.orderByS =  'last_name';
			$scope.headingBy = 'Legislators By Senate';
			$scope.state.searchTabId = true;
			$scope.state.dropdown_select = false;
		}
		else
			$scope.headingBy = p.Ptxt;	
	}
if($scope.heading == 'Committees')
{
	if(p.Ptxt == 'Senate')
	{
		$scope.state.contactId = false;
		$scope.state.officeId = false;
		$scope.state.ParComId = true;
	}
	else if(p.Ptxt == 'House')
	{
		$scope.state.contactId = true;
		$scope.state.officeId = true;
		$scope.state.ParComId = true;
	}
	else
	{
		$scope.state.contactId = false;
		$scope.state.officeId = false;
		$scope.state.ParComId = false;
	}
}
};
$scope.btnlegislator = function () {
	$scope.state.dropdown_select = true;
	$scope.headingBy = 'Legislators By State';
	$scope.state.legislator = true; 
	$scope.state.bills = false;
	$scope.state.committee = false;
	$scope.state.favoritesL = false;
	$scope.state.favoritesB = false;
	$scope.state.favoritesC = false;
	$scope.state.LegDetails = false;
	$scope.state.BillDetails = false;
	$scope.heading = 'Legislators';
	$scope.states = ['All States','Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
	$scope.panels = [
		{"Ptxt" : "By State", "filTxt":"", "curr":"active"},
		{"Ptxt" : "House", "filTxt":"house", "curr":""},
		{"Ptxt" : "Senate","filTxt":"senate","curr":""}
	];
	
	$scope.searchModel = $scope.states[0];
};


$scope.btnBill = function () {
$scope.namesB = $scope.namesBActive;
	$scope.orderByDate = 'introduced_on';
	$scope.state.dropdown_select = false;
	$scope.state.searchTabId = true;
	$scope.headingBy = 'Active Bills';
	$scope.state.legislator = false; 
	$scope.state.bills = true;
	$scope.state.committee = false; 
	$scope.state.favoritesL = false;
	$scope.state.favoritesB = false;
	$scope.state.favoritesC = false;
	$scope.state.LegDetails = false;
	$scope.state.BillDetails = false;
	$scope.heading = 'Bills';
	$scope.panels = [
		{"Ptxt" : "Active Bills","curr":"active"},
		{"Ptxt" : "New Bills","curr":""}
	];
	$scope.srch1 = "true";
};
$scope.btnCommittee = function () {
	$scope.state.contactId = true;
	$scope.state.officeId = true;
	$scope.state.ParComId = true;
	$scope.orderCom = 'committee_id';
	$scope.state.dropdown_select = false;
	$scope.state.searchTabId = true;
	$scope.headingBy = 'House';
	$scope.state.legislator = false; 
	$scope.state.bills = false;
	$scope.state.committee = true; 
	$scope.state.favoritesL = false;
	$scope.state.favoritesB = false;
	$scope.state.favoritesC = false;
	$scope.state.LegDetails = false;
	$scope.state.BillDetails = false;
	$scope.heading = 'Committees';
	$scope.panels = [
		{"Ptxt" : "House","filTxt" : "house","curr":"active"},
		{"Ptxt" : "Senate","filTxt":"senate","":""},
		{"Ptxt":"Joint","filTxt" :"joint","":""}
	];
	$scope.srch1 = "house";	
};		
$scope.btnFavorites = function(){
$scope.state.dropdown_select = false;
$scope.headingBy = 'Favorite Legislators';
	$scope.state.legislator = false; 
	$scope.state.bills = false;
	$scope.state.committee = false; 
	$scope.state.favoritesL = true;	
	$scope.heading = 'Favorites';
	$scope.panels = [
		{"Ptxt" : "Legislators","curr":"active"},
		{"Ptxt" : "Bills","":""},
		{"Ptxt":"Committees","":""}
	];
	$scope.namesFL = $sessionStorage.messageL;
	$scope.namesFB = $sessionStorage.messageB;
	$scope.namesFC = $sessionStorage.messageC;
};
	 
$scope.btnSaveL = function(){
	$scope.selected = !$scope.selected;
   
arrL = $sessionStorage.messageL;
if(arrL!=undefined){
	arrL.push($scope.namesDet);
	$sessionStorage.messageL = arrL;
	}
else{
var newArr=[];
newArr.push($scope.namesDet);
$sessionStorage.messageL = newArr;
}
	
	
};
$scope.btnSaveB = function(){
	$scope.selected = !$scope.selected;
	
arrB = $sessionStorage.messageB;
if(arrB!=undefined){	
	arrB.push($scope.namesBillDet);
	$sessionStorage.messageB = arrB;	
	}
else{
var newArrB=[];
newArrB.push($scope.namesBillDet);
$sessionStorage.messageB = newArrB;
}
};
$scope.btnSaveC = function(x){
arrC = $sessionStorage.messageC;
if(arrC!=undefined){
	arrC.push(x);
	$sessionStorage.messageC = arrC;
	}
	else{
	var newArrC = [];
	newArrC.push(x);
	$sessionStorage.messageC = newArrC;
	}
	 x.editSave = true;
};
$scope.btnRemoveL = function(x){
	for(var i = 0 ; i< $sessionStorage.messageL.length;i++)
	{
		if($sessionStorage.messageL[i]['bioguide_id'] == x.bioguide_id)
		{
			break;
		}
	}
	$sessionStorage.messageL.splice(i,1);		
};
$scope.btnRemoveToggleL = function(){
	$scope.selected = !$scope.selected;
	for(var i = 0 ; i< $sessionStorage.messageL.length;i++)
	{
		if($sessionStorage.messageL[i]['bioguide_id'] == $scope.namesDet.bioguide_id)
		{
			break;
		}
	}
	$sessionStorage.messageL.splice(i,1);		
};	
$scope.btnRemoveB = function(x){
	for(var i = 0 ; i< $sessionStorage.messageB.length;i++)
	{
		if($sessionStorage.messageB[i]['bill_id'] == x.bill_id)
		{
			break;
		}
	}
	$sessionStorage.messageB.splice(i,1);		
};
$scope.btnRemoveToggleB = function(){
	$scope.selected = !$scope.selected;
	for(var i = 0 ; i< $sessionStorage.messageB.length;i++)
	{
		if($sessionStorage.messageB[i]['bill_id'] == $scope.namesBillDet.bill_id)
		{
			break;
		}
	}
	$sessionStorage.messageB.splice(i,1);		
};	
$scope.btnRemoveC = function(x){
	for(var i = 0 ; i< $sessionStorage.messageC.length;i++)
	{
		if($sessionStorage.messageC[i]['committee_id'] == x.committee_id)
		{
			break;
		}
	}
	$sessionStorage.messageC.splice(i,1);		
};
$scope.btnRemoveToggleC = function(x){
x.editSave = false;
	for(var i = 0 ; i< $sessionStorage.messageC.length;i++)
	{
		if($sessionStorage.messageC[i]['committee_id'] == x.committee_id)
		{
			break;
		}
	}
	$sessionStorage.messageC.splice(i,1);		
};	
$scope.btnDetLegislator = function(obj) {
	$scope.flag = true;
	if($sessionStorage.messageL == undefined)
	 $scope.selected = true;
	else{
	for(var i = 0 ; i< $sessionStorage.messageL.length;i++)
	{
		if($sessionStorage.messageL[i]['bioguide_id'] == obj.bioguide_id)
		{
			$scope.flag = false;
		}
	}
	if($scope.flag == true)
	{
		$scope.selected = true;
	}
	else
	{
		$scope.selected = false;
	}
		}
	$scope.namesDet = obj;
	$scope.srcImgDetLeg = "https://theunitedstates.io/images/congress/original/"+obj.bioguide_id+".jpg";		
	$scope.fb = "http://www.facebook.com/"+obj.facebook_id;
	$scope.twt = "http://www.twitter.com/"+obj.twitter_id;
	//progress bar calculation
	$scope.date = $filter('date')(new Date(),'dd/MM/yyyy');
	$scope.date1 = $filter('date')(obj.term_start,'dd/MM/yyyy');
	$scope.date2 = $filter('date')(obj.term_end,'dd/MM/yyyy');
	var start = $scope.date1;
	var now = $scope.date;
	var end = $scope.date2;		
	$http({
		method : "GET",
		url : "http://104.198.0.197:8080/bills?sponsor_id="+obj.bioguide_id+"&apikey=6a6f265b19cb46bdb4c2d463d1efb0f4&per_page=50"
	}).then(function successCallback(response){
        $scope.bil = response.data.results;
	},
        function errorCallback(response){
    });			
	$http({
		method : "GET",
		url : "http://104.198.0.197:8080/committees?member_ids="+obj.bioguide_id+"&apikey=6a6f265b19cb46bdb4c2d463d1efb0f4&per_page=all"
	}).then(function successCallback(response){
        $scope.comm = response.data.results;
	},
        function errorCallback(response){
    });
    var date2 = new Date(formatString(now));
    var date1 = new Date(formatString(start));
	var date3 = new Date(formatString(end));
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());   
	var timeDiff1 = Math.abs(date3.getTime() - date1.getTime());
    $scope.dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
	$scope.dayDifference1 = Math.ceil(timeDiff1 / (1000 * 3600 * 24));
	$scope.term = Math.ceil(($scope.dayDifference/$scope.dayDifference1)*100); 
    function formatString(format) {
		var day   = parseInt(format.substring(0,2));
		var month  = parseInt(format.substring(3,5));
		var year   = parseInt(format.substring(6,10));
		var date = new Date(year, month-1, day);
		return date;
	}	
	//progress bar calculation ends		
	$scope.state.LegDetails = true;
	$scope.state.BillDetails = false;			
	};
$scope.btnDetBills = function(obj) {

	$scope.flag = true;
	if($sessionStorage.messageB == undefined){
	$scope.selected = true;
	}
	else{
	for(var i = 0 ; i< $sessionStorage.messageB.length;i++)
	{
		if($sessionStorage.messageB[i]['bill_id'] == obj.bill_id)
		{
			$scope.flag = false;
		}
	}
	if($scope.flag == true)
	{
		$scope.selected = true;
	}
	else
	{
		$scope.selected = false;
	}}	
$scope.namesBillDet = obj;
	$scope.state.legislator = false; 
	$scope.state.bills = false;
	$scope.state.committee = false; 
	$scope.state.favoritesL = false;
	$scope.state.favoritesB = false;
	$scope.state.favoritesC = false;
	$scope.state.LegDetails = false;
	$scope.state.BillDetails = true;
	$scope.linkPDF = $sce.trustAsResourceUrl(obj.last_version.urls.pdf);	
	
	
};		
});//End Controller
