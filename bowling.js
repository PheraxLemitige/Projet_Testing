export class Game {
  constructor(){
    this.frames=[]
    this.currentFrame = 0
  }

  // Roll a ball then take in params the number of pins thrown
  roll(pins){
    let isAdd = false;
    if (this.currentFrame != 0){
      if (!(this.frames[this.currentFrame - 1].isComplete())){
        this.frames[this.currentFrame - 1]
        this.frames[this.currentFrame - 1].rolls.push(pins);
        isAdd = true;
      }
      for (let i = 0; i < this.currentFrame; i++){
        if (!(this.frames[i].isScoreComplete()) && (i != this.currentFrame - 1 || !isAdd)){
          this.frames[i].rolls.push(pins);
        }
      }
    }
    if(!isAdd && this.currentFrame != 10){
      this.frames.push(new Frame(pins));
      this.currentFrame += 1;
    }
    console.log(this.currentFrame);
    console.log(this.frames);
  }

  // Give the total score of the game
  score(){
    let total = 0;
    this.frames.forEach(element => {
      total += element.score();
    });
    return total;
  }
}

export class Frame {
  constructor(...rolls){
    this.rolls=rolls
  }

  // get the score of the frame
  score(){
    return this.rolls.reduce ((total, roll, index) => {
      return index < 3 ? total + roll : total ;
    })
    }

  // To Know if the frame is finished to be played
  isComplete(){
    return this.isStrike() || (!(this.isStrike()) && this.rolls.length >= 2);
  }

  // To Know if the score of the frame have all his rolls and bonus rolls
  isScoreComplete(){
    return this.rolls.length >= 3 || (!(this.isStrike()) && (!(this.isSpare())) && this.rolls.length >= 2);
  }

  isStrike(){
    return this.rolls[0] === 10;
  }

  isSpare(){
    return this.rolls[0] + this.rolls[1] === 10;
  }
}