const shareContent = ({ url, text, title }) => {
    // let linkTo = link;
    if (window.navigator.share) {

        navigator
          .share({
            url,
            title,
            text,
          })
          .then(() => {
            return;
          })
          .catch((error) => null);
      } else {
        // alert("Please don't forget to share");
        return null;
      }
    };


    export {shareContent}