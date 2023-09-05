// *** Icons ***
import {TbLayoutDashboard,TbMoneybag,TbTrendingUp,TbTrendingDown,TbBox} from 'react-icons/tb'
import {PiBagSimpleBold,PiUserSquare} from 'react-icons/pi'
import {IoIosStats,IoIosArrowRoundUp,IoIosArrowRoundDown} from 'react-icons/io'
import {AiOutlineQuestionCircle,AiOutlineDollar} from 'react-icons/ai'
import {RiListSettingsFill} from 'react-icons/ri'
import {GiTakeMyMoney,GiReceiveMoney} from 'react-icons/gi'
import {FiPhone,FiUsers,FiUserCheck} from 'react-icons/fi'
import {BiStats} from 'react-icons/bi'
import {GoEye} from 'react-icons/go'
import {CgScreen} from 'react-icons/cg'


const monthNames = ['May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']

const navLinks = [
  {
    id: "dashboard",
    icon: TbLayoutDashboard,
    title: "Dashboard",
  },
  {
    id: "management",
    icon: PiUserSquare,
    title: "Management",
  },
  {
    id: "transactions",
    icon: PiBagSimpleBold,
    title: "Transactions",
  },
  {
    id: "analytics",
    icon: IoIosStats,
    title: "Analytics",
  }
]

const navBottomLinks = [
  {
    id: "support",
    icon: AiOutlineQuestionCircle,
    title: "Support",
  },
  {
    id: "settings",
    icon: RiListSettingsFill,
    title: "Settings",
  }
]

const darkLightLinks = [
  {
    id: "light",
    title: "Light"
  },
  {
    id: "dark",
    title: "Dark"
  }
]

const memberThumbs = [
  "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/725.jpg",
  "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/726.jpg",
  "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/894.jpg",
  "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/774.jpg",
  "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/394.jpg"
]

const statBoxData = [
  {
    id: "monthly-revenue",
    icon: TbMoneybag,
    title: "Monthly Revenue",
    monthTotal: 2500,
    currentIncrement: "+1.2%",
    subTitle: "Previous month",
    previousIncrement: "$1.5k"
  },
  {
    id: "monthly-sales",
    icon: GiTakeMyMoney,
    title: "Monthly Sales",
    monthTotal: 7150,
    currentIncrement: "+1.8%",
    subTitle: "Previous month",
    previousIncrement: "$4.1k"  
  },
  {
    id: "monthly-units",
    icon: GiReceiveMoney,
    title: "Monthly Units",
    monthTotal: 150,
    currentIncrement: "+4.5%",
    subTitle: "Previous month",
    previousIncrement: "+1.1%" 
  }
]
const statLinkBoxData = [
  {
    id: "total-customers",
    icon: FiUsers,
    title: "Total Customers",
    link:'customers',
    increment: "14%",
    subTitle: "this month",
    subSymbol: 	IoIosArrowRoundUp,
    subIconColor:'green'
  },
  {
    id: "members",
    icon: FiUserCheck,
    title: "Members",
    link:'members',
    increment: "1%",
    subTitle: "this month",
    subSymbol: IoIosArrowRoundDown, 
    subIconColor:'red'
  },
  {
    id: "active-now",
    icon: CgScreen,
    title: "Active Now",
    link:'active'
  },
  {
    id: "inbound-calls",
    icon: FiPhone,
    title: "Inbound Calls",
    link:'customers',
    increment: "8%",
    subTitle: "this month",
    subSymbol: 	IoIosArrowRoundUp,
    subIconColor:'green'
  }
]

const statAnalyticsBoxData = [
  {
    id: "net-income",
    icon: AiOutlineDollar,
    title: "Net Income",
    increment: "4.25%",
    subTitle: "from last week",
    subSymbol: 	TbTrendingUp,
    subIconColor:'green'
  },
  {
    id: "product-viewed",
    icon: GoEye,
    title: "Product Viewed",
    increment: "1.24%",
    subTitle: "from last week",
    subSymbol: 	TbTrendingDown,
    subIconColor:'red'
  },
  {
    id: "sold-products",
    icon: BiStats,
    title: "Sold Products",
    increment: "25.66%",
    subTitle: "from last week",
    subSymbol: 	TbTrendingUp,
    subIconColor:'green'
  },
  {
    id: "new-order",
    icon: TbBox,
    title: "New Order",
    increment: "35.47%",
    subTitle: "from last week",
    subSymbol: 	TbTrendingUp,
    subIconColor:'green'
  },
]


export { monthNames,navLinks,navBottomLinks,darkLightLinks,statBoxData,statLinkBoxData,memberThumbs,statAnalyticsBoxData }