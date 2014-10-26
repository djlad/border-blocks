
	canvas = document.getElementById("myCanvas")
	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
	c = canvas.getContext("2d")
	c.font=(style="54px Impact")
	c.fillStyle = "black"
	c.fillText("Simplicity",50,52);
	c.fillStyle = "Gold"
	c.fillText("Simplicity",52,50);
	c.fillStyle = "black"
	c.font=(style="30px Impact")
	c.fillText("Click To Start",55,90);
	c.fillStyle = "Red"
	c.fillText("Click To Start",57,88);
	c.font=(style="30px Impact")
	c.fillStyle="blue"
	c.fillText("HighScore: "+getHighscore()[0],57,123)
	c.font=(style="15px Arial Black")
	c.fillStyle="black"
	c.fillText("How to play:",55,150)
	c.fillStyle="green"
	c.fillText("How to play:",56,149)
	c.fillStyle="black"
	c.fillText("Use mouse to click to toggle up and down",55,170)
	c.fillStyle="green"
	c.fillText("Use mouse to click to toggle up and down",56,169)
	c.fillStyle="black"
	c.fillText("Swiping uses boost ability, use WISELY!",55,190)
	c.fillStyle="green"
	c.fillText("Swiping uses boost ability, use WISELY!",56,189)
	c.fillStyle="black"
	c.fillText("DON'T fall behind and DON'T touch the top or bottom!",55,210)
	c.fillStyle="green"
	c.fillText("DON'T fall behind and DON'T touch the top or bottom!",56,209)
	c.fillStyle="black"
	c.fillText("Spacebar pauses",55,230)
	c.fillStyle="green"
	c.fillText("Spacebar pauses",56,229)
	c.fillStyle="black"
	c.font=(style="14px Arial Black")
	c.fillText("Simplicity Alpha 1.2",340,240)

	
	


	      var grd = c.createLinearGradient(0, 0, canvas.width, canvas.height);
		  grd.addColorStop(.3,"red"); 
		  grd.addColorStop(.6,"blue");
		  grd.addColorStop(.9, "green"); 
	




function drawEnergy(){
	c.fillStyle = "black"
	c.font=(style="22px Impact")
	c.fillText("Energy:",canvas.width-150,30)
	c.fillStyle="red"
	c.fillText("Energy:",canvas.width-149,29)
	c.fillStyle="black"
	//c.rect(349,39,102,12)
	//c.stroke()
	c.fillStyle="yellow"
	c.fillRect(canvas.width-150,40,energyBar.width,energyBar.height)
	
}
function sendHs(score,name){
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("POST","http://gwcsitech.azurewebsites.net/simple.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("name="+name+"&score="+score);




	xmlhttp.onreadystatechange=function()
  	{
  		if (xmlhttp.readyState==4 && xmlhttp.status==200)
    	{
    		alert(xmlhttp.responseText);
    	}
  	}
}

function hsVerified(){
	//alert(data)
}

	
	function start(){
		pause=true
	}
	//setTimeout(function(){start()},10);


	
	window.addEventListener("mousedown",function(e){
		//mouse.x = event.targetTouches[0].pageX; 
    	//mouse.y = event.targetTouches[0].pageY;
    	
		startMouse.x=mouse.x
		startMouse.y=mouse.y
		click = true;
		//if (pause)pause = false
		if (player.vy==0)
		
		{ 
			if(Math.random()>=.5)
			{
				player.vy=2
			}
			else {
				player.vy=-2
			}
			
		}
		
	},false);

	window.addEventListener("mouseup",function(e){
		
		endMouse.x=mouse.x
		endMouse.y=mouse.y
		if(click){
		
		swipe = checkSwipe()
		if(swipe =="no swipe" || energy <= 0)player.vy*=-1
		if (energy > 0)
		{
			if(swipe == "down"){
			boost(false)
			energy-=20
			energyBar.width= energy
		}
		if(swipe=="up"){
			boost(checkSwipe(true))
			energy-=20
			energyBar.width = energy
		}

	}
}
		click = false;
	},false);
	
	function energyRegain()
		{
			if (energy < 100) energy += 20
			energyBar.width= energy
				setTimeout(function(){energyRegain()},10000)
			
		}

	document.addEventListener('mousemove', function(e){ 
   	 	//mouse.x = event.targetTouches[0].pageX; 
    	//mouse.y = event.targetTouches[0].pageY;
    	
    	mouse.x = /*e.clientX ||*/ e.pageX;  
    	mouse.y = /*e.clientX ||*/ e.pageY;  
	}, false);



	window.addEventListener("keydown",function(e)
	{

	keys[e.keyCode] = true;
	walking = true 
	},false);

	window.addEventListener("keyup",function(e)
	{
	if(keys[32])pause=true
	delete keys[e.keyCode];
	walking = false
	},false);
	
	

	function checkSwipe(){
		difference= startMouse.y-endMouse.y
		if(difference > 20)return "down"
		if(difference < -20)return "up"
		
		return "no swipe"
	}
	function boost(down){
		if(down)player.vy=5
		if(!down)player.vy=-5
		setTimeout(function(){unboost(down)},500)
	}
	function unboost(down){
		if(down)player.vy =2
		if(!down)player.vy = -2
		
	}
	

	function block(x,y,width,height){

		this.x=x
		this.y=y
		this.width=width
		this.height=height
		this.vx=blockspeed

	}

	function addBlock(y,height){
		
		blocks.push(new block(canvas.width,y,20,height))

	}
	function updateBlocks(){
		if(blocks[0].x<0){
			delete blocks[0]
			blocks.splice(0,1)
		}
		for(i=0;i<blocks.length;i++){
		blocks[i].x+=blocks[i].vx
	}
	if (blockspeed > -3.5){
		
	 blockspeed -= 1/1000
}
for(i=0;i<blocks.length;i++)
{
	blocks[i].vx=blockspeed
}


}

function getHighscore(){
	if(typeof(localStorage.getItem("hs"))=="string"){
		return JSON.parse(localStorage.getItem("hs"))
	}else{
		localStorage.setItem("hs",JSON.stringify([0,0,0,0,0]))
		return JSON.parse(localStorage.getItem("hs"))
	}
}

function addHighscore(score){
	hs = localStorage.getItem("hs")
	hs = JSON.parse(hs)
	//hs = JSON.parse(hs)
	notFound = true
	i = 0
	for(i=0;i<hs.length;i++){
		if(hs[i]<score){
		
			hs=hs.slice(0,i).concat(score).concat(hs.slice(i,hs.length-1))
			console.log(hs)
			localStorage.setItem("hs",JSON.stringify(hs))
			notFound = false
			break
		}
		//console.log(hs)
		if(i>hs.length)break
	}
}
	

	function drawBlocks(){
		for(i=0;i<blocks.length;i++){
			c.fillRect(blocks[i].x,blocks[i].y,blocks[i].width,blocks[i].height)}
	}
	function generateBlocks(){
		if(blocks[blocks.length-1].x < canvas.width - distance)
		{
			var gap = Math.random()*(canvas.height)
			if (gap - holesize <= 0)gap+=50
			if (gap + holesize >= canvas.height)gap-=50
			addBlock(0,gap-holesize)
			addBlock(gap+holesize,canvas.height)
			
	}
		if (Math.floor(score) ==100){
			holesize=45
		}
		if (Math.floor(score)==200){
			holesize=40

		}
		if (Math.floor(score)==300){
			holesize=35

		}
		if (Math.floor(score)==400){
			holesize=30

		}
		
	}
	
	
	function updateScore()
	{
		if (player.vx >= 0 ){
			score= (score)+.05
			
		}
	}
	
	function renderScore(){
		c.fillStyle="black"
		if (score>=0){
			c.fillText("Score: "+Math.round(score),9.5,30.5)
			c.fillStyle="blue"
			c.fillText("Score: "+Math.round(score),10,30)

		}
		else {
			c.fillText("Score: "+0,9.5,30.5)
			c.fillStyle="blue"
			c.fillText("Score: "+0,10,30)
		}
		c.fillStyle="black"
	}
	
	function move(){
			c.fillStyle=grd
		for(i=0;i<blocks.length;i++)
		{
			var blockbottom= (blocks[i].y+blocks[i].height)
			var blocktop= blocks[i].y-player.height
			col = player.checkCol(blocks[i])
			if(col == "right"){

				player.x = blocks[i].x-player.width
				player.vx=0}
			
			else if(col == "top"){
				player.y = blocktop
			}
			else if (col =="bottom"){
				player.y = blockbottom

			}
			else
			{
				player.vx = 1.3
			}
		}
	
		if (player.x >= canvas.width/2){
			player.x=canvas.width/2
			player.vx=0
		}
		
		
		
		player.x+=player.vx;
		player.y+=player.vy;
		

		/* debugging=false
		if(debugging){
		if(keys[38]) player.y-=speed;
		if(keys[40]) player.y+=speed;
		if(keys[37]) player.x-=speed;
		if(keys[39]) player.x+=speed;
		} */
		//need to fix debugging on this********
	}
	
	function gameUpdate()
	{
		move()
		if(on)generateBlocks()
		updateBlocks()
	}

	function gameRender()
	{

		c.clearRect(0,0,canvas.width,canvas.height)
		c.fillRect(player.x,player.y,player.width,player.height);
		

		drawBlocks()
		drawEnergy()
		renderScore()
		//early template
		/* 
		c.fillRect(450,0,20,250);
		c.fillRect(350,50,20,250);
		c.fillRect(250,0,20,200);
		c.fillRect(250,250,20,50);
		c.fillRect(150,100,20,200);
		c.fillRect(150,0,20,50);
		
		c.fillRect(850,0,20,250);
		c.fillRect(750,50,20,250);
		c.fillRect(650,0,20,200);
		c.fillRect(650,250,20,50);<a href="gamesimulation.html" id="" title="gamesimulation">gamesimulation</a>
		c.fillRect(550,100,20,200);
		c.fillRect(550,0,20,50);
		
	*/
	
	}

	
	function scoreBox(){
		box = document.getElementById("scoreBox")
		box.innerHTML = "Your Score: "+Math.floor(score)+"<br>"+"Top Score: " + Math.floor(getHighscore()[0])
	}

	function restart(){
		addHighscore(score)
		scoreBox()
		$( "#popupBasic" ).popup({ dismissible: false })
		$( "#popupBasic" ).popup("open")
		//location.reload();
		pause = true
	}
	function refresh(){
		location.reload()
	}
	function game()
	{
		if(!pause){
		gameUpdate()
		gameRender()
		updateScore()
		checkSwipe()
		if (player.x < 0){
			restart()

		}
		if (player.y < 0){
			restart()
		}
		if (player.y+player.height > canvas.height){
			restart()
		}
	
	}
	}
	function BlockMove(event){
		//Tell Safari not to move the window.
		event.preventDefault();
	}

	//function setup(){
		var blocks = [], speed = 4, pause = true, score= -10, holesize = 50, distance = 100, energy = 100

		var player = {
			x:50,
			y:150,
			vx:1.3,
			vy:0,
			width:20,
			height:20,
			checkCol:function(obj){
				
				y = this.y
				rx = this.x+this.width
				if(rx > obj.x && rx<obj.x+obj.width/4 && this.y+this.height>obj.y && y<obj.y+obj.height){
					return "right"
				}
				if(rx > obj.x && this.x < obj.x+obj.width && this.y+this.height > obj.y && this.y<obj.y+obj.height/4 ){
					return "top"
				}
				if(rx > obj.x && this.x < obj.x+obj.width && this.y < obj.y+obj.height && this.y>obj.y+obj.height/4){
					return "bottom"
				}
				return "no hit"
			}
		} 
	
		energyBar ={
			width:100,
			height:10,
		}
		var keys = []
		var click




		energyRegain()
		//checks mouse co-ods
		var mouse = {x: 0, y: 0};
		//check swipe mouse coords
		var startMouse={x:0,y:0}
		var endMouse={x:0,y:0}
		c.font="20px Arial Black";
		var difference
		blockspeed=-1
		on = true
		addBlock(0,100)
		addBlock(200,100)
		if(window.location.hash == "#game")pause = false//dont pause if page is on game
	//}	
	function setup(){
		blocks = [], speed = 4, pause = true, score= -10, holesize = 50, distance = 100, energy = 100

		player = {
			x:50,
			y:150,
			vx:1.3,
			vy:0,
			width:20,
			height:20,
			checkCol:function(obj){
				
				y = this.y
				rx = this.x+this.width
				if(rx > obj.x && rx<obj.x+obj.width/4 && this.y+this.height>obj.y && y<obj.y+obj.height){
					return "right"
				}
				if(rx > obj.x && this.x < obj.x+obj.width && this.y+this.height > obj.y && this.y<obj.y+obj.height/4 ){
					return "top"
				}
				if(rx > obj.x && this.x < obj.x+obj.width && this.y < obj.y+obj.height && this.y>obj.y+obj.height/4){
					return "bottom"
				}
				return "no hit"
			}
		} 
	
		energyBar ={
			width:100,
			height:10,
		}
		keys = []
		click




		energyRegain()
		//checks mouse co-ods
		mouse = {x: 0, y: 0};
		//check swipe mouse coords
		startMouse={x:0,y:0}
		endMouse={x:0,y:0}
		c.font="20px Arial Black";
		difference
		blockspeed=-1
		on = true
		addBlock(0,100)
		addBlock(200,100)
		if(window.location.hash == "#game")pause = false//dont pause if page is on game
		return 1
	}


	//setup()

	setInterval(game,1000/50)