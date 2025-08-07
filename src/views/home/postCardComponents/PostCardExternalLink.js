import React from 'react'

const PostCardExternalLink = ({item, cAccountAdminAccess}) => {
  return !cAccountAdminAccess && (item?.externalLinkForRegistration) ? (
    <a
      href={item?.externalLinkForRegistration}
      target="_blank"
      rel="noreferrer"
      className="cardLive"
    >
      Register
    </a>
  ): null
}
export default PostCardExternalLink