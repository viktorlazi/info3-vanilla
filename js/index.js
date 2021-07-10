class Slide{
  order;
  numberOfAnswers;
  userChoices = [];
  constructor(order){
    this.order = order;
    this.setNumberOfAnswersRnd();
  }
  setNumberOfAnswersRnd = () =>{
    this.numberOfAnswers = Math.floor(Math.random() * 6) + 2; // 2-8
  }
  getNumberOfAllowedChoices = () =>{
    return 2 + 1 + this.order;
  }
  toggleChoice = (x) =>{
    if(this.userChoices.includes(x)){
      this.userChoices = this.userChoices.filter(e=>e!==x);
      this.updateDOM();
      return true;
    }
    if(this.userChoices.length >= this.getNumberOfAllowedChoices()){
      return false;
    }
    this.userChoices.push(x);
    this.userChoices.sort();
    this.updateDOM();
    return true;
  }
  updateDOM = () =>{
    this.updateHead();
  }
  init = () =>{
    this.initButtons();
    this.initHead();
    this.initAnswers();
  }
  initButtons = () =>{
    const buttonsDiv = document.querySelector('.changeSlide');
    buttonsDiv.innerHTML = '';
    let previous, next;

    if(this.order === 0){
      previous = document.createElement('span');
      next = document.createElement('button');
      next.innerHTML = 'Next';
    }else if(this.order === 3){
      previous = document.createElement('button');
      previous.innerHTML = 'Previous';
      next = document.createElement('button');
      next.innerHTML = 'Results';
    }else{
      previous = document.createElement('button');
      previous.innerHTML = 'Previous';
      next = document.createElement('button');
      next.innerHTML = 'Next';
    }
    previous.addEventListener('click', ()=>changeSlide(-1))
    next.addEventListener('click', ()=>changeSlide(1))
    buttonsDiv.appendChild(previous);
    buttonsDiv.appendChild(next);
  }
  initHead = () =>{
    const headDiv = document.querySelector('.head');
    headDiv.innerHTML = '';

    const slideNumber = document.createElement('h1');    
    slideNumber.innerHTML = 'Pitanje ' + (this.order+1);
    headDiv.appendChild(slideNumber);

    const possibleAnswersNumber = document.createElement('h2');
    possibleAnswersNumber.innerHTML = 
    'Preostalo mogucih odgovora:' + 
    (this.getNumberOfAllowedChoices() - this.userChoices.length);
    headDiv.appendChild(possibleAnswersNumber);
  }
  updateHead = () =>{
    const possibleAnswersNumber = document.querySelector('.head h2');
    possibleAnswersNumber.innerHTML =
    'Preostalo mogucih odgovora:' + 
    (this.getNumberOfAllowedChoices() - this.userChoices.length);
  }
  initAnswers = () =>{
    const answersDiv = document.querySelector('.answers');
    answersDiv.innerHTML = '';
    [...Array(this.numberOfAnswers)]
    .map((x, i)=>{
      const answ = document.createElement('button');
      answ.innerHTML = i + 1;
      if(this.userChoices.includes(i)){
        answ.className='active';
      }
      answ.addEventListener('click', ()=>{
        if(answ.className==='active'){
          answ.className='';
          this.toggleChoice(i);
          return;
        }
        if(this.toggleChoice(i)){
          answ.className='active';
        }
      });
      answersDiv.appendChild(answ);
    }); 
  }
}

var slides = [];
for (let i = 0; i < 4; i++) {
  slides.push(new Slide(i));
}

var activeSlide = 0;
changeSlide = (x) =>{
  console.log(activeSlide);
  if(activeSlide + x === 3){
    alert();
    return;
  }
  activeSlide += x;
  renderSlide();
}
renderSlide = () =>{
  slides[activeSlide].init();
}

renderSlide();