
import { useState } from "react";
import { HiLockClosed } from "react-icons/hi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'

const AnButton = ({ onSubmit, text, loading = true, disabled ,reg=true }) => {
    const [color, setColor] = useState("#000000")
  return (
    <button className=" group relative flex w-fit justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none disabled:bg-blue-400 focus:ring-2 focus:ring-blue-700 focus:ring-offset-2" onClick={onSubmit} disabled={disabled}>
        {!loading &&<span className="  flex items-center pr-2">
        <FontAwesomeIcon className='text-white ' icon={faArrowsRotate} flip="both" size="lg" />
            </span>}
      {!loading ? text : <div className="flex"> <div className="  "> <FontAwesomeIcon className='text-white px-7 loader' icon={faArrowsRotate} flip="both" size="lg" /></div><span>{}</span></div>}
    </button>
  )
}

export default AnButton