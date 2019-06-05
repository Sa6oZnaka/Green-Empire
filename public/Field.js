export class Field {

	constructor(name, startTime, time, waterings){
		this.name = name;
		this.startTime = startTime;
		this.time = time;
		this.waterings = waterings;
		this.watered = 0;
	}

	calcalateTime(){
		return Date.now() - this.startTime + this.time;
	}

	ready(){
		return this.calcalateTime() <= 0;
	}

}
