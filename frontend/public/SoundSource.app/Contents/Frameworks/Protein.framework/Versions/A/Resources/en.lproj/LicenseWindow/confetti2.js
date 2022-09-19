var raCelebrate = new function() {

	var canvas;
	var context;
	var width;
	var height;
		
	var particles;
	var particleCount;
	var particleScaleMin;
	var particleScaleMax;
	var gravity;
	var colors;

	this.start = function() {
		setup();
		update();
	}
	
	setup = function() {
		canvas = document.getElementById("confetti");
		context = canvas.getContext("2d", { alpha: false });
		isRetina = (window.devicePixelRatio || 1) !== 1;

		if(isRetina) {
			canvas.width = window.innerWidth * 2;
			canvas.height = window.innerHeight * 2;
			canvas.style.width = "" + canvas.width / 2 + "px";
			canvas.style.height = "" + canvas.height / 2 + "px";
			context.scale(2, 2);
		}
		else {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}

		width = window.innerWidth;
		height = window.innerHeight;

		particles = [];
		particleCount = 300;
		gravity = 0.3;
		colors = [
			 '#2F72C0', '#4388D9', '#1962B8',
		];
				
		for( var i = 0; i < particleCount; i++){
				
			particles.push({
				x: width / 2,
				y: height / 2,

				boxW: randomRange(5, 20),
				boxH: randomRange(5, 20),
								
				velX: randomRange(-8, 8),
				velY: randomRange(-50, -10),
				
				angle: convertToRadians(randomRange(0, 360)),
				color: colors[Math.floor(Math.random() * colors.length)],
				rotationSpeed: randomRange(-0.2, 0.2),

				update: function() {
					this.angle += this.rotationSpeed;
					this.velY += gravity;

					this.x += this.velX;
					this.y += this.velY;
					
					if(this.y < 0){
						this.velY *= -0.2;
						this.velX *= 0.9;
					};
				
					if(this.y > height){
						this.rotationSpeed = 0;
						this.y = height;
						this.velY *= -0.2;
						this.velX *= 0.9;
					};
					
					if(this.x > width ||this.x< 0){
						this.velX *= -0.5;
					};
				},
				
				draw: function(){
					context.save();
					context.translate(this.x, this.y);
					context.rotate(this.angle);
					context.fillStyle = this.color;
					crispFill(context, this.boxW / -2, this.boxH / -2, this.boxW, this.boxH);
					context.restore();
				},		
			});
		}
	};

	crispFill = function(context, x, y, w, h){
		x = Math.floor(x);
		y = Math.floor(y);
		w = Math.floor(w);
		h = Math.floor(h);
		context.fillRect(x, y, w, h);
	};

	update = function(){
		// Clear canvas and redraw in new positions
		context.clearRect(0,0,width,height);	
		for( var i = 0; i < particles.length; i++){
			particles[i].update();
			particles[i].draw();
		}
		requestAnimationFrame(update);
	};

	randomRange = function(min, max){
		return min + Math.random() * (max - min);
	};

	convertToRadians = function(degree) {
		return degree * (Math.PI / 180);
	};	
};