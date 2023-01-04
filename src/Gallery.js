import React from 'react'
import "./index.css"

const Gallery = ({data}) => {
  return (
    <div>
        <div className='row'>
            {data.map((image)=><div key={image.id}>
                <div className='col-md-4'>
                    
                <img src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_m.jpg`} height="400" width="650"/>
                </div>

            </div>)}

        </div>
      
    </div>
  )
}

export default Gallery
