const locales = ['een-US', 'fr-FR', 'de-DE', 'es-ES', 'ja-JP'];
let     formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

locales.forEach(locale=>{
    formatter = new Intl.NumberFormat(locale);
})
const formattedAmount = ({amount, currencyValue})=>{
    if(currencyValue){

        return formatter.format(amount / currencyValue || 1)
    } else 
  return formatter.format(amount);
    
}

const formattedNumber = (num)=>{
    return formatter.format(num)
}



const convertNumbers = ({value}) => {
    if (value === 0) {
      return null;
    }
    
    if (value > 0 && value < 100) {
      return value;
    }
    if(value > 99){
    let valueToString = value.toString();
    if (valueToString.length === 3) {
      return value;
    }
    if (valueToString.length === 4) {
      return `+${valueToString.slice(0, 1)}K`;
    }
    if (valueToString.length === 5) {
      return `+${valueToString.slice(0, 2)}K`;
    }
    if (valueToString.length === 6) {
      return `+${valueToString.slice(0, 3)}K`;
    }
    if (valueToString.length === 7) {
      return `+${valueToString.slice(0, 1)}M`;
    }
    if (valueToString.length === 8) {
      return `+${valueToString.slice(0, 2)}M`;
    }
    if (valueToString.length === 9) {
      return `+${valueToString.slice(0, 3)}M`;
    }
    if (valueToString.length === 10) {
      return `+${valueToString.slice(0, 1)}B`;
    }
    if (valueToString.length === 11) {
      return `+${valueToString.slice(0, 1)}B`;
    }
    if (valueToString.length > 11) {
      return `+${valueToString.slice(0, 2)}B`;
    }
  }
  };


export {formattedAmount, convertNumbers, formattedNumber}