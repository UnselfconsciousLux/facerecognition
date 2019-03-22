import React from 'react';
import './Facerecognition.css'

const FaceRecognition = ({box, imageUrl}) => {
	return (
		<div className='center ma'>
			<div className='absolute mt3'>
				<img id = 'input_image' alt='' src={imageUrl} width = '500px' height = 'auto'/>
				<div className = 'bounding_box' style = {{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
			</div>
		</div>
	);
}

export default FaceRecognition;