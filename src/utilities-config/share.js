export const shareContent = ({url, title, description}) => {
      // let linkTo = link;
      if (window.navigator.share) {
        navigator
          .share({
            url,
            title,
            text: description,
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