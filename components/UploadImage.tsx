import { CldUploadWidget } from 'next-cloudinary';

const UploadImage = () => {
  return (
    <CldUploadWidget uploadPreset='doc_holder'>
        {()=>{
            return <button></button>
        }}
    </CldUploadWidget>
  )
}

export default UploadImage