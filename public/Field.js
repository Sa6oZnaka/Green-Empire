export class Field {

	constructor(name, startTime, time){
		this.name = name;
		this.startTime = startTime / 10000;
		this.time = time;

		console.log("Name:" + name);
		console.log("STT:" + this.startTime);
		console.log("NOW:" + new Date().getTime());
		console.log("CT:" + this.calcalateTime());

		console.log("TIME" + this.time);
	}

	calcalateTime(){
		return (this.startTime - new Date().getTime()) + this.time * 1;
	}

	ready(){
		return this.calcalateTime() <= 0;
	}

	getName(){
		return this.name;
	}

}
