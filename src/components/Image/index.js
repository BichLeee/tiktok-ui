import { useState, forwardRef } from 'react';
import images from '~/assets/images';

function Image({ src, fallback = images.noImage, ...props }, ref) {
    return <img ref={ref} src={src || fallback} {...props} />;
}

export default forwardRef(Image);
