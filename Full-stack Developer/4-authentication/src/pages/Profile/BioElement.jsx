import React from 'react'

function BioElement(props) {
    return (
        <div className='grid grid-cols-[100px,1fr] md:grid-cols-[200px,1fr] border-t-1 py-3 md:px-12'>
            <h3 className='text-neutral-300 dark:text-gray-600 uppercase'>{props.category}</h3>
            {props.img && <img src={props.img} alt={props.information} className="h-20 rounded-xl"/>}
            {!props.img && <h3 className='text-black'>{props.information}</h3>}
        </div>
    )
}

export default BioElement