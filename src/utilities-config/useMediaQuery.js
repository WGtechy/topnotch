
export default function useMediaQuery () {

    let isMobile
    let largeScreen = window.matchMedia('(min-width: 481px)')
    let mobileScreen = window.matchMedia('(max-width: 480px)')
    if(largeScreen.matches){
        isMobile = false
    } else if(mobileScreen.matches){
        isMobile = true
    }
   
return isMobile 

}
