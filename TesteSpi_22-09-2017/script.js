function allowDrop(ev) {
    ev.preventDefault();
}
var cont = 0;
function drag(ev) {
	console.log(ev.target.class);
    ev.dataTransfer.setData("text", ev.target.id);
}

var configs = [];
var conf = function (width,height,corCx,fontSize,corTxt,txt) {
	this.width = width;
	this.height = height;
	this.corCx = corCx;
	this.fontSize = fontSize;
	this.corTxt = corTxt;
	this.txt = txt;
}


function drop(ev) {
	if(cont>=10){
		alert("Máximo excedido");
		return;
	}
    ev.preventDefault();
    var data = document.getElementById(ev.dataTransfer.getData("text")).cloneNode();        
    data.className = 'texts';
    data.id = cont;    
    ev.target.appendChild(data);    
    configs.push(new conf());    
    cont++;
}

function salvar(){	
	var data = document.getElementsByClassName('texts');
	for(var i=0; i<data.length; i++){		
		configs[i].width = data[i].style.width;		
		configs[i].height = data[i].style.height;
		configs[i].txt = data[i].value;		
	}	
    localStorage.setItem('teste', JSON.stringify(configs));
    var objSalvo = localStorage.getItem('teste');
	console.log(JSON.parse(objSalvo));	
}

function alterar(){
	var data = document.getElementsByClassName('texts');
	var option;
	for(var i=0; i<document.getElementById('caixaNumber').length; i++){
		if(document.getElementById('caixaNumber')[i].selected === true){
			option = document.getElementById('caixaNumber')[i].value;	
			break;	
		}
	}	
	configs[option-1] = new conf(null,null, 
		document.getElementById('corCx').value,
		document.getElementById('sizeFont').value,
		document.getElementById('corFont').value,
		null
	);
	console.log(configs);
	data[option-1].style.backgroundColor = document.getElementById('corCx').value;
	data[option-1].style.color = document.getElementById('corFont').value;	
	if(document.getElementById('sizeFont').value>0)
		data[option-1].style.fontSize = document.getElementById('sizeFont').value+"pt";
}