import React from 'react'

function SocialMediaIcon(props) {
	return (
		<button onClick={props.handleClick}>
			<img src={props.src} alt={props.socialMedia} />
		</button>
	)
}

export default SocialMediaIcon