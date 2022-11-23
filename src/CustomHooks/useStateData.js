import React from 'react'
import {useSelector} from 'react-redux'
import store from '../Store/store'
function useStateData() {
    let stateData = useSelector((state) => state.newCurrency)
    console.log('stateData: ', stateData)
    let storeData = store.getState()
    console.log('storeData: ', storeData)
  return (
    <div>useStateData</div>
  )
}

export default useStateData