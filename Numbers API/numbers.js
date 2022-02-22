	function querySelector() {
		var selectorIndex = document.getElementById("dataType").selectedIndex; 
		var sDiv = document.getElementById("follow_up");
		while (sDiv.children.length != 0){
				//var childNode = document.getElementById("follow-select");
				var childNode = sDiv.lastElementChild; 
				sDiv.removeChild(childNode);
				//sDiv.lastElementChild;
				document.getElementById("display").textContent = "";
		} 
		if(selectorIndex == 1 || selectorIndex == 2 || selectorIndex == 4) {
				var sel = document.createElement('select');
				sel.setAttribute("id", "follow-select");
				var opt0 = document.createElement('option');
				
				var opt1 = document.createElement('option');
				var opt2 = document.createElement('option');
				var opt3 = document.createElement('option');
				
				opt0.appendChild(document.createTextNode('Select . . .') );
				opt1.appendChild(document.createTextNode('Random') );
				opt1.value = 'random'; 
				opt2.appendChild(document.createTextNode('Number') );
				opt2.value = 'num'; 
				opt3.appendChild(document.createTextNode('Number Range') );
				opt3.value = 'numRange'; 
				
				opt0.setAttribute('disabled', 'true');
				opt0.setAttribute('selected', 'true');
				
				sel.appendChild(opt0);
				sel.appendChild(opt1);
				sel.appendChild(opt2); 
				sel.appendChild(opt3); 
				sDiv.appendChild(sel);
				
				
				sel.addEventListener("change", followSelector, false);
				
		} else{
				var frm = document.createElement('FORM');
				var txt1 = document.createElement('input');
				var txt2 = document.createElement('input');
				txt1.setAttribute("type", "text");
				txt1.setAttribute("id", "month");
				txt1.setAttribute('size', '5');
				txt1.setAttribute("pattern", "\\d{1,2}");
				txt1.setAttribute("class", "txt");

			
				txt2.setAttribute("type", "text");
				txt2.setAttribute("id", "day");
				txt2.setAttribute('size', '5');
				txt2.setAttribute("pattern", "\\d{1,2}");
				txt2.setAttribute("class", "txt");
			
				var button = document.createElement("button");
				button.innerHTML = "Click For Response";
				button.setAttribute('type', "submit");
			
				
				frm.appendChild(document.createTextNode("Enter the month: "));
				frm.appendChild(document.createElement("br"));
				frm.appendChild(txt1);
				frm.appendChild( document.createTextNode( '\u00A0\u00A0' ) );
				frm.appendChild(document.createElement("br"));
				frm.appendChild(document.createTextNode("Enter the day"));
				frm.appendChild(document.createElement("br"));
				frm.appendChild(txt2);
				frm.appendChild(document.createTextNode( '\u00A0\u00A0' ) );
				frm.appendChild(document.createElement("br"));
				frm.appendChild(document.createElement("br"));
				frm.appendChild(button);
				
				frm.addEventListener('submit', dateFun, false);

				sDiv.appendChild(frm);		
			}
	}
	
	function followSelector(){
		var selectorIndex = document.getElementById("follow-select").selectedIndex;
		var type = document.getElementById("dataType").value;
		document.getElementById("display").textContent = "";
		var sDiv = document.getElementById("follow_up");
		sel = ['trivia', 'math', 'data', 'year'];
		if (sDiv.children.length > 1){
				var last = sDiv.lastElementChild;
				sDiv.removeChild(last);
			}
		switch(selectorIndex){
			case 1:
			getData("http://numbersapi.com/random/" + type + "?json");
			break;
			
			case 2:
			var frm = document.createElement('FORM');
			frm.setAttribute('class', "submit");
			var p1 = document.createElement('p');
			p1.appendChild(document.createTextNode("Enter lower number of the range:"));
			var txt1 = document.createElement('input');
			
			txt1.setAttribute("type", "text");
			txt1.setAttribute("id", "num");
			txt1.setAttribute('size', '5');
			txt1.setAttribute("pattern", "[0-9]+");
			txt1.setAttribute("class", "txt");
			
			var button = document.createElement("button");
			button.innerHTML = "Click for Response";
			button.setAttribute('type', "submit");
			
			frm.appendChild(document.createElement("br"));
			frm.appendChild(document.createElement("br"));
			frm.appendChild(document.createTextNode("Enter the number:"));
			frm.appendChild(document.createElement("br"));
			frm.appendChild(txt1);

			frm.appendChild(document.createElement("br"));
			frm.appendChild(document.createElement("br"));
			frm.appendChild(button);
			frm.appendChild(document.createElement("br"));
			
			frm.addEventListener('submit', numFun, false);
			
			sDiv.appendChild(frm);	
			
			break;
			
			case 3:
			
			var frm = document.createElement('FORM');
			var txt1 = document.createElement('input');
			var txt2 = document.createElement('input');
			txt1.setAttribute("type", "text");
			txt1.setAttribute("id", "from");
			txt1.setAttribute('size', '5');
			txt1.setAttribute("pattern", "[0-9]+");
			txt1.setAttribute("class", "txt");
			
			txt2.setAttribute("type", "text");
			txt2.setAttribute("id", "to");
			txt2.setAttribute('size', '5');
			txt2.setAttribute("pattern", "[0-9]+");
			txt2.setAttribute("class", "txt");
			
			var button = document.createElement("button");
			button.innerHTML = "Click for Response";
			button.setAttribute('type', "submit");
			
			frm.appendChild(document.createElement("br"));
			frm.appendChild(document.createElement("br"));
			frm.appendChild(document.createTextNode("Enter lower number of the range:"));
			frm.appendChild(document.createElement("br"));
			frm.appendChild(txt1);
			frm.appendChild( document.createTextNode( '\u00A0\u00A0' ) );
			frm.appendChild(document.createElement("br"));
			frm.appendChild(document.createTextNode("Enter hiegher number of the range:"));
			frm.appendChild(document.createElement("br"));
			frm.appendChild(txt2);
			frm.appendChild(document.createElement("br"));
			frm.appendChild(document.createElement("br"));
			frm.appendChild(button);
			
			//frm.css('display', 'inline-block');
			//button.addEventListener ("click", function() {
			//alert("did something");
			//});
			frm.addEventListener('submit', rangeFun, false);
			
			sDiv.appendChild(frm);	
			
			break;
			
			default:
		}
	
	}
	var result = document.getElementById("display");
	
	
	
	function dateFun (){
		event.preventDefault();
		event.stopPropagation();
		var day = document.getElementById("day").value;
		var month = document.getElementById("month").value;
		if (day != "" && month != ""){
			getData("http://numbersapi.com/" +  month + "/"+ day +"/date?json");			
		} else {
			document.getElementById("display").textContent = "You did not enter the information of day or month";
		}
		
	}
	
	function numFun (){
		event.preventDefault();
		event.stopPropagation();
		var type = document.getElementById("dataType").value;
		var num = document.getElementById("num").value;
		if (num != ""){
			getData("http://numbersapi.com/" +  num + "/"+ type +"?json");			
		} else {
			document.getElementById("display").textContent = "You did not enter a number";
		}
		
	}
	
	function rangeFun (){
		event.preventDefault();
		event.stopPropagation();
		var type = document.getElementById("dataType").value;
		var num1 = document.getElementById("from").value;
		var num2 = document.getElementById("to").value;
		if (num1 != "" && num2 != ""){
			getDataRange("http://numbersapi.com/" +  num1 + ".."+ num2 +"/" + type +"?json");			
		} else {
			document.getElementById("display").textContent = "You did not enter the range number";
		}
		
	}
	
	function getData(url) {
		
		document.getElementById("display").textContent = "fact requested . . ."; 
		fetch(url)
		.then(response => response.json())
		.then(json => {
			
			document.getElementById("display").textContent = json.text;
     })
	 .catch(ex => {
		 console.log('failed: ', ex);
     });
		
	}		
	
	function getDataRange(url) {
		
		document.getElementById("display").textContent = "fact requested . . ."; 
		fetch(url)
		.then(response => response.json())
		.then(json => {
			var newDiv = document.createElement("div");
			for (let x in json) {			
			 var tag = document.createElement("p");
			 var brek= document.createElement("br");
			 tag.textContent = json[x];
			 newDiv.appendChild(tag);
			}
			document.getElementById("display").textContent = "";
			document.getElementById("display").appendChild(newDiv);
			})
	 .catch(ex => {
		 console.log('failed: ', ex);
     });
		
	}		
	
	
	function start(){
      document.getElementById("dataType").addEventListener("change", querySelector, false);
      }
	window.addEventListener("load", start, false);