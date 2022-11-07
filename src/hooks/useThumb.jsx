
import {useState} from 'react';

const useThumb = () => {

    const [thumbImage, setThumbImage] = useState();

    const makeThumb = (file) => {

        if (file) {

            let reader = new FileReader();

            reader.onload = (r) => {

                setThumbImage(r.target.result);

            }

            reader.readAsDataURL(file);

        } else {
            // Tøm state med thumbimage
            setThumbImage();

        }

    }

  return [thumbImage, makeThumb];

};

export default useThumb;