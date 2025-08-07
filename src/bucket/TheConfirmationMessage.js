import { Link } from "react-router-dom/cjs/react-router-dom.min"

export const TheConfirmationMessage = ({open, policy, policyBtn, handleClose, link, click, message, title, linkText, readMore}) => {
  return (<>
    <div className={open ? "openMessageOverlay messageOverlay": ""} onClick={handleClose}></div>
    <div className={open ? "openInstructionSlide instructionSlide" : "closeInstructionSlide instructionSlide"}>
      <div className='instructionSlideContent'>
        <div className='instructionSlideContentTitle'>{title}</div>
        <div className='instructionSlideContentMessage'>{message} {readMore && <span><Link to={readMore}>Read More</Link></span>}</div>
        <div className='instructionSlideContentBtns'>
          <div className='instructionSlideContentBtnsClose' onClick={handleClose}>Close</div>
          {click ? <div className='instructionSlideContentBtnsContinue' onClick={click}>{linkText || 'Continue'}</div> : 
          <a href={link} target='_blank' rel='noreferrer' className='instructionSlideContentBtnsContinue' onClick={handleClose}>{linkText || 'Continue'}</a>}
          {policy && <div className='instructionSlideContentBtnsClose' onClick={policy}>{policyBtn}</div>}

        </div>
      </div>
    </div>
    </>
  )
}
