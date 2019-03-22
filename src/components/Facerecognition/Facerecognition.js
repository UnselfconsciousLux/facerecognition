import React from 'react';
import './Facerecognition.css'

const FaceRecognition = ({box, imageUrl}) => {
	console.log('box in Facerecognition', box);
	console.log('Length of array is: ', box.box_parameters)

	var leftCol = 0, rightCol = 0, topRow = 0, bottomRow = 0;
	for(var j = 0; j < box.box_parameters; j++) {
      console.log('Im inside looop: j = ', j)
      var inside_box = box.box_parameters[j];
      console.log('inside_box: ', inside_box)
      leftCol = inside_box.leftCol;
      topRow = inside_box.topRow;
      rightCol = inside_box.rightCol;
      bottomRow = inside_box.bottomRow;
      console.log(leftCol, topRow, rightCol, bottomRow);
    }

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