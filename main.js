
var request = require("request");
var $ = require("jquery");


$("#timeButton").click(function(){
	//console.log("time")
	time()
})

$("#priceButton").click(function(){
	//console.log("price")
	ticket_price()
})

var ticket_price = function() {
	var e = document.getElementById("originStation");
	var OriginStationName = e.options[e.selectedIndex].text;
	var e = document.getElementById("destinationStation");
	var DestinationStationName = e.options[e.selectedIndex].text;
	console.log(OriginStationName)
	console.log(DestinationStationName)
	request({
	// 爬蟲要爬的網站
	url: "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/KRTC/?$format=JSON",
	method: "GET",
    headers : {
    	"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
    }

}, function(error, response, body) {
		if (error || !body) {
		// 如果沒爬到就不做事
		return;
		} else {
		// 寫你要做的事情
			var info = JSON.parse(body);
			info.forEach(element => {
				if(element.OriginStationName.Zh_tw === OriginStationName && element.DestinationStationName.Zh_tw == DestinationStationName){
					var i;
					for(i=0 ; i<3 ; i++){
						//console.log(element.Fares[i])
						if(element.Fares[i].FareClass === 1){
							//document.write("全票" + element.Fares[i].Price + "元")
							$("#price1").text("全票" + element.Fares[i].Price + "元")
							console.log("全票" + element.Fares[i].Price + "元")
							//console.log(element.Fares.FareClass)	
						}
						else if(element.Fares[i].FareClass === 2){
							//document.getElementById("price2").innerHTML("學生票" + element.Fares[i].Price + "元")
							$("#price2").text("學生票" + element.Fares[i].Price + "元")	
							$("#price3").text("普卡" + element.Fares[i].Price + "元")													
							console.log("學生票" + element.Fares[i].Price + "元")
							console.log("普卡" + element.Fares[i].Price + "元")
							//console.log(element.Fares.FareClass)	
						}
						else{
							$("#price4").text("優待票" + element.Fares[i].Price + "元")							
							console.log("優待票" + element.Fares[i].Price + "元")						
						}						
					}
					//break;
					//console.log(element.Fares)					
				}

			});			
			//console.log(info[0].OriginStationID)
		}
})
}



var time = function() {
	var e = document.getElementById("Station");
	var StationName = e.options[e.selectedIndex].text;
	console.log(StationName)
	request({
	// 爬蟲要爬的網站
	url: "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/LiveBoard/KRTC?$format=JSON",
	method: "GET",
    headers : {
    	"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
    }

}, function(error, response, body) {
		if (error || !body) {
		// 如果沒爬到就不做事
		return;
		} else {
		// 寫你要做的事情
			var i = 0
			var info = JSON.parse(body);
			info.forEach(element => {
				//$("#createProductCategory").append(`<option value="${element.StationName.Zh_tw}">"${element.StationName.Zh_tw}"</option>`) //第一個是收回來的值，第二個是別人看到的
				if(element.StationName.Zh_tw === StationName){
					if(i === 0){
						$("#time1").text(element.TripHeadSign)
						$("#time2").text(element.EstimateTime + "分鐘")												
						console.log(element.TripHeadSign)
						console.log(element.EstimateTime)						
					}
					if(i === 1){
						$("#time3").text(element.TripHeadSign)
						$("#time4").text(element.EstimateTime + "分鐘")							
						console.log(element.TripHeadSign)
						console.log(element.EstimateTime)						
					}
					i = i + 1									
				}
			});			
			//console.log(info[0].OriginStationID)
		}
})
}

var option = function() {
	request({
	// 爬蟲要爬的網站
	url: "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/LiveBoard/KRTC?$format=JSON",
	method: "GET",
    headers : {
    	"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
    }

}, function(error, response, body) {
		if (error || !body) {
		// 如果沒爬到就不做事
		return;
		} else {
		// 寫你要做的事情
			var info = JSON.parse(body);
			var i = 0;
			info.forEach(element => {
				if(i % 2 === 0){
					$("#Station").append(`<option value="${element.StationName.Zh_tw}">${element.StationName.Zh_tw}</option>`) //第一個是收回來的值，第二個是別人看到的
					$("#originStation").append(`<option value="${element.StationName.Zh_tw}">${element.StationName.Zh_tw}</option>`) //第一個是收回來的值，第二個是別人看到的
					$("#destinationStation").append(`<option value="${element.StationName.Zh_tw}">${element.StationName.Zh_tw}</option>`) //第一個是收回來的值，第二個是別人看到的	
					$("#test").append(`<option value="${element.StationName.Zh_tw}">${element.StationName.Zh_tw}</option>`) //第一個是收回來的值，第二個是別人看到的	

				}
				//${}是變數的意思
				i = i+1
			});			
			//console.log(info[0].OriginStationID)
		}
})
}
option()