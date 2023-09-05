import { Link } from "react-router-dom"
import {GiCrossedSabres} from 'react-icons/gi'

const AppFooter = () => {
    const thisYear = new Date().getFullYear().toString()

  return (
    <footer className="px-4 h-[70px] rounded-xl shadow-card dark:shadow-cardDark flex items-center bpiii:justify-end">
        <div className="flex items-center">
            {/* --- Logo --- */}
            <span className="h-[28px]">
                <Link
                    to='/dashboard'
                    className='flex items-center w-fit mb-5 px-3 text-xl font-semibold tracking-wide'
                    onClick={() => {
                        window.scrollTo(0, 0)
                    }}
                >
                    ProDe<GiCrossedSabres/>tra
                </Link>
            </span>
            <span className="h-[28px] py-[5px] font-semibold">
                &#169;
            </span>
            <span className="h-[28px] py-[6px] ml-1 font-semibold text-[13px]">
                {`${thisYear}, All Rights Reserved`}
            </span>
        </div>
    </footer>
  )
}

export default AppFooter