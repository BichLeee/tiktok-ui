import { forwardRef } from 'react';
import images from '~/assets/images';

function Image({ src, fallback = images.noImage, ...props }, ref) {
    return <img ref={ref} src={src || fallback} {...props} alt="" />;
}

export default forwardRef(Image);
