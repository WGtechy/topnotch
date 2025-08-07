let largeScreen;
let mobileScreen;
export function mediaQuery(){
    largeScreen = window.matchMedia('(min-width: 481px)')
    mobileScreen = window.matchMedia('(max-width: 480px)')
    if(largeScreen.matches){
        return 'desktop'
    } else if(mobileScreen.matches){
        return 'mobile'
    }
}
