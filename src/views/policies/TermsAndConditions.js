import React from 'react'
import { useSelector } from 'react-redux';
import { componentLoader } from '../../bucket/loading-components/componentLoader';
import TheFooter from '../../bucket/TheFooter';

const TermsAndConditions = ({token}) => {
    const { data, loading } = useSelector((state) => state.app);
  return loading ? componentLoader : (
    <><div className="termsAndConditions">{data?.settings?.termsAndConditions}</div>
    <TheFooter token={token} /></>
  )
}

export default TermsAndConditions