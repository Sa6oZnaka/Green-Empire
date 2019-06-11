export class Field {

	constructor(name, startTime, time){
		this.name = name;
		this.startTime = startTime;
		this.time = time;
	}

	calcalateTime(){
		return this.startTime + this.time - Date.now();
	}

	ready(){
		return this.calcalateTime() <= 0;
	}

	getName(){
		return this.name;
	}

}
