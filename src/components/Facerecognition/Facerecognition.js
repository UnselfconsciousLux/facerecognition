import React from 'react';
import './Facerecognition.css'

var FaceRecognition = ({box, imageUrl}) => {
	var leftCol = 0, rightCol = 0, topRow = 0, bottomRow = 0;
	//console.log('box in Facerecognition', box);
	for(var i =0; i < box.length; i++) {
		console.log(box[i].right_Col)
		leftCol = box[i].left_Col;
		rightCol = box[i].right_Col;
		topRow = box[i].top_Row;
		bottomRow = box[i].bottom_Row;
		console.log(leftCol, rightCol, topRow, bottomRow);
	}


	return (
		<div className='center ma'>
			<div className='absolute mt3'>
				<img id = 'input_image' alt='' src={imageUrl} width = '500px' height = 'auto'/>
				<div className='bounding-box'>
					{box.map((index) => (
							<div key={index} style={{
								top:topRow,
								right:rightCol,
								bottom:bottomRow,
								left:leftCol}}>
							</div>
						)
					)}
				</div>
			</div>
		</div>
	);
}

export default FaceRecognition;




	// var leftCol = 0, rightCol = 0, topRow = 0, bottomRow = 0;
	// // for(var j = 3; j < box.length; j++) {
 //      //console.log('Im inside looop: j = ', j)
 //      var inside_box = box[0];
 //      //console.log('inside_box: ', inside_box)
 //      leftCol = inside_box.leftCol;
 //      topRow = inside_box.topRow;
 //      rightCol = inside_box.rightCol;
 //      bottomRow = inside_box.bottomRow;
 //      //console.log(leftCol, topRow, rightCol, bottomRow);
 //    // }
 				// <div className = 'bounding_box' style = {{top: topRow, right: rightCol, bottom: bottomRow, left: leftCol }}>
