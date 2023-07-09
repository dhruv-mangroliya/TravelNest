import React, { useState } from 'react';
import { AiFillPicture } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';

function PlaceGallery({ place }) {
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if (showAllPhotos) {
        return (
            <div className='position-absolute top-0 start-0 bg-black bg-opacity-75 text-white min-vw-100 min-vh-100'>
                <div className='p-5 mx-4 mt-5 position-relative'>
                    <div className=''>
                        <h3 className='position-absolute top-0 start-0 mt-2 ms-5 me-5 w-75'>Photos of {place.title}</h3>
                        <button onClick={() => setShowAllPhotos(false)} className='position-fixed top-0 end-0 mt-5 me-5 gap-1 fs-6 py-2 px-3 rounded-2 bg-light d-flex align-items-center shadow'>
                            <GrClose />
                            Close photos
                        </button>
                    </div>
                    <div className='gap-2 mt-4 d-flex flex-column'>
                        {place?.photos?.length > 0 && place.photos.map(photo => (
                            <div className='rounded-3 overflow-hidden'>
                                <img className='w-100 img-fluid' src={'http://localhost:8000/uploads/' + photo} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="position-relative">
            <div className='row my-4 d-flex g-3'>
                <div className='col-lg-8 col-md-8 col-12'>
                    <div className='rounded-2 object-fit-cover overflow-hidden h-100'>
                        {place.photos?.[0] && (
                            <img onClick={() => setShowAllPhotos(true)} className='curser_pointer object-fit-cover w-100 h-100 img-fluid' src={'http://localhost:8000/uploads/' + place.photos[0]} alt="" />
                        )}
                    </div>
                </div>
                <div className='col-lg-4 col-md-4 col-12 d-flex flex-column gap-3'>
                    <div className='rounded-2 overflow-hidden'>
                        {place.photos?.[1] && (
                            <img onClick={() => setShowAllPhotos(true)} className='curser_pointer object-fit-cover w-100 h-100 img-fluid' src={'http://localhost:8000/uploads/' + place.photos[1]} alt="" />
                        )}
                    </div>
                    <div className='rounded-2 overflow-hidden'>
                        {place.photos?.[2] && (
                            <img onClick={() => setShowAllPhotos(true)} className='curser_pointer object-fit-cover w-100 h-100 img-fluid' src={'http://localhost:8000/uploads/' + place.photos[2]} alt="" />
                        )}
                    </div>
                </div>
            </div>
            <button onClick={() => { setShowAllPhotos(true) }} className='position-absolute d-flex align-items-center gap-2 fs-6 bottom-0 bg-white rounded-2  py-2 px-3 end-0 me-2 mb-2 shadow'>
                <AiFillPicture />
                Show more photos
            </button>
        </div>
    )
}

export default PlaceGallery