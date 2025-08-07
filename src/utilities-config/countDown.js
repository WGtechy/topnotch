// const countDownDate = new Date('Oct 16, 2021 00:00:00:00').getTime()

const countDown = (eventDate) =>{
 let days, hours, minutes, secounds, action;

  const dayVal =  (1000 * 60 * 60 * 24)
  const hourVal =  (1000 * 60 * 60)
  const minVal =  (1000 * 60)
  
  const x = setInterval(()=>{
    const now = new Date().getTime()
    const distance = eventDate.getTime() - now;
  
    days = Math.floor(distance / dayVal);
    hours = Math.floor(distance % dayVal / hourVal);
    minutes = Math.floor(distance % hourVal / minVal);
    secounds = Math.floor(distance % minVal / 1000);
    action = true;

  if(distance < 0){
    clearInterval(x);
    days = '00';
    hours = '00';
    minutes = '00';
    secounds = '00';
    action = false
  }
  }, 1000)
   return { days, hours, minutes, secounds, action }
}
export default countDown