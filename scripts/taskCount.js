var count = 0;
const task = document.querySelector('.submit-btn');
task.addEventListener('click',function(){
  count += 1;
  // console.log(count);
  if(count == 10){
    window.alert('Suggestion: Please Finish these task first !!');
  }
})