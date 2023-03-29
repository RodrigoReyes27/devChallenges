import React, { forwardRef, useState } from 'react'

const Input = (props, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <label htmlFor={props.name} className={`text-base font-semibold inline-block pt-2 md:pt-6 dark:text-white capitalize ${!props.label && "sr-only"}`}>{props.name}</label>
            <div className="relative py-3">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <i className={`${props.icon} text-gray-600 dark:text-gray-400`}></i>
                </div>
                <input
                    type={showPassword ? "text" : props.type}
                    id={props.name} 
                    placeholder={props.name}
                    ref={ref}
                    className="block w-full p-4 pl-10 text-sm text-gray-600 dark:text-gray-400 placeholder:text-gray-600 placeholder:dark:text-gray-400 rounded-xl bg-transparent border-solid border-1 dark:border-gray-400 focus:border-blue-500 focus:dark:border-blue-500 outline outline-transparent"
                    defaultValue={props.value}
                />
                {
                    props.type === "password" &&
                    <div 
                        className="absolute inset-y-0 right-2.5 flex items-center cursor-pointer px-4"
                        onClick={() => setShowPassword(prev => !prev)}
                    >
                        <i className={`fa-regular fa-eye${showPassword ? "-slash" : ""} text-gray-600 dark:text-gray-400`}></i>
                    </div>
                }
            </div>
        </>
    )
}

export default forwardRef(Input)