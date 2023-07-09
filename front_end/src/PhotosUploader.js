import axios from 'axios';
import React, { useState } from 'react';
import { RiUploadCloud2Fill } from 'react-icons/ri';
import { TbTrashXFilled } from 'react-icons/tb';
import { MdFavorite } from 'react-icons/md';
import { MdFavoriteBorder } from 'react-icons/md';

function PhotosUploader({ addedPhotos, onChange }) {
    const [photoLink, setPhotoLink] = useState("");

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink })
        onChange(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }

    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();

        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }

        axios.post('/upload', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            const { data: filenames } = response;
            onChange(prev => {
                return [...prev, ...filenames];
            });
        })
    }

    function removePhoto(ev, filename) {
        ev.preventDefault();
        onChange([...addedPhotos.filter(photo => photo !== filename)]);
    }

    function selectAsMainPhoto(ev, filename) {
        ev.preventDefault();
        onChange([filename, ...addedPhotos.filter(photo => photo !== filename)]);
    }

    return (
        <>
            <div className='d-flex gap-2'>
                <input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} className='' placeholder={'Add using a link...jpg'} name="" id="" />
                <button onClick={addPhotoByLink} className='bg-secondary text-white py-2 px-4 rounded-2'>Add&nbsp;Photo</button>
            </div>
            <div className='mt-2 g-3 row'>
                {addedPhotos.length > 0 && addedPhotos.map(link => {
                    return (
                        <div className='position-relative col-6 col-md-4 col-lg-3' style={{ "max-height": "250px" }} key={link}>
                            <div className='rounded-2 h-100 w-100 m-0 p-0 overflow-hidden'  >
                                <img className='img-fluid' style={{ "min-width": "100%", "min-height": "100%" }} src={"http://localhost:8000/uploads/" + link} alt="" />
                                <button onClick={(ev) => { removePhoto(ev, link) }} className='position-absolute border-0 curser_pointer rounded-2 px-2 py-1 bg-dark text-white fs-6 bg-opacity-50 bottom-0 end-0' style={{ transform: 'translate(-10px,-10px)' }}>
                                    <TbTrashXFilled />
                                </button>
                                <button onClick={(ev) => { selectAsMainPhoto(ev, link) }} className='position-absolute border-0 curser_pointer rounded-2 px-2 py-1 bg-dark bottom-0 start-0 text-white fs-6 bg-opacity-50' style={{ transform: 'translate(10px,-10px)' }}>
                                    {link === addedPhotos[0] && (<MdFavorite />)}
                                    {link !== addedPhotos[0] && (<MdFavoriteBorder />)}
                                </button>
                            </div>
                        </div>
                    )
                })}
                <label className='curser_pointer bg-transparent col-6 col-md-4 col-lg-3'>
                    <div className='d-flex fs-4 text-secondary border rounded-2 h-100 w-100 justify-content-center align-items-center'>
                        <input type="file" multiple onChange={uploadPhoto} className='d-none' />
                        <RiUploadCloud2Fill />Upload
                    </div>
                </label>
            </div>
        </>
    )
}

export default PhotosUploader