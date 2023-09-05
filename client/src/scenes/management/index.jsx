import { useSelector } from "react-redux"
import usePageChecker from '../../hooks/usePageChecker'
import useTitle from "../../hooks/useTitle"
import { statLinkBoxData } from '../../contents'
import StatLinkBox from '../../components/StatLinkBox'
import { getCustomersListLink } from '../../app/api/globalSlice'

import CustomersList from "./CustomersList"
import ActiveCustomersList from "./ActiveCustomersList"
import MemberCustomersList from "./MemberCustomersList"

const Management = () => {
  // *** Required-states && Setups ***
  useTitle('Management - ProDextra')
  usePageChecker('management')
  const customersListLink = useSelector(getCustomersListLink)
  
  return (
    <div className=" pb-20">
      {/* Stat Link Boxs */}
      <div className='mb-6 flex flex-wrap justify-between px-6 bpiiii:px-4 rounded-2xl bg-bgSecondary dark:bg-bgDarkSecondary shadow-card dark:shadow-cardDark'>
        {
          statLinkBoxData.map((stat,i)=>(
            i===0 ? <StatLinkBox key={stat.id} stat={stat} total={'100'} />
              : i===1 ? <StatLinkBox key={stat.id} stat={stat} total={'34'}/> 
                : i===2 ? <StatLinkBox key={stat.id} stat={stat} total={'85'} active={true}/>
                  : <StatLinkBox key={stat.id} stat={stat} total={'100'}/>
          ))
        }
      </div>

      {/* Customers Data Grid */}
      <div>
        {
          customersListLink==='customers'? <CustomersList/>
          : customersListLink==='members'? <MemberCustomersList/>
          : <ActiveCustomersList/>
        }
      </div>

    </div>
  )
}

export default Management