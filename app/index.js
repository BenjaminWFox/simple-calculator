/**
 * Application entry point
 */

// Load application styles
import 'styles/index.scss';

// ================================
// START YOUR APP HERE
// ================================

console.log('App is running...')

function Calculator(pElement) {
  const self = this;
  let buildingNumber = false;
  let addingOperator = false;

  this.equation = [];
  this.currentTask = '';

  this.building = function() {
    return buildingNumber;
  }
  
  this.operating = function() {
    return addingOperator;
  }

  this.setStatus = {
    building: ()=>{buildingNumber = true;addingOperator=false},
    operating: ()=>{addingOperator = true;buildingNumber=false;}
  }

  this.resetCurrentTask = function() {
    this.currentTask = '';
  }

  this.element = document.getElementById(pElement);

  this.screen = document.getElementById('screen');
  
  this.element.addEventListener('click', function(e){
    let task;
    if(!e.target.id) {
      task = e.target.parentNode.id;
    } else {
      task = e.target.id;
    }
    self.processTask(task);
  })
}

Calculator.prototype.processTask = function(pTask) {
  if(isNaN(pTask)) {
    // console.log('operation', pTask);
    switch(pTask) {
      case 'add':
        this.addOperation('+');
        break;
      case 'subtract':
        this.addOperation('-');
        break;
      case 'multiply':
        this.addOperation('*');
        break;
      case 'divide':
        this.addOperation('/');
        break;
      case 'equals':
        this.calculateResult();
        break;
      case 'point':
        this.buildNumber('.');
        break;
    }
  } else {
    // console.log('number', pTask);
    this.buildNumber(pTask);
  }
  // this.updateEquation(pTask);
}

Calculator.prototype.buildNumber = function(pNum) {
  this.finishOperating();
  this.setStatus.building();
  this.currentTask += pNum;
  this.updateScreen(this.currentTask);
}

Calculator.prototype.addOperation = function(pOperation) {
  this.finishBuilding();
  this.setStatus.operating();
  this.currentTask = pOperation;
  this.updateScreen(this.currentTask);
} 

Calculator.prototype.updateScreen = function(pDisplay) {
  console.log(this.building(), this.operating());
  this.screen.innerHTML = pDisplay;
}

Calculator.prototype.updateEquation = function(pTask) {
  this.equation.push(pTask);
  this.screen.innerHTML = this.equation;
}

Calculator.prototype.finishBuilding = function() {
  if(this.building()){
    this.equation.push(this.currentTask);
    this.resetCurrentTask();
  }
}

Calculator.prototype.finishOperating = function() {
  if(this.operating()){
    this.equation.push(this.currentTask);
    this.resetCurrentTask();
  }
}

Calculator.prototype.calculateResult = function() {
  this.finishBuilding();
  const result = eval(this.equation.join(''));
  this.updateScreen(result);
  console.log(this.equation.join(''), ':', eval(this.equation.join('')));
  this.equation = [result];

}

var calc = new Calculator('calculator');