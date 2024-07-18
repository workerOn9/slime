import localFont from 'next/font/local';

export const airal = localFont({
    src: [
        {
            path: './font/Arial.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './font/Arial Italic.ttf',
            weight: '400',
            style: 'italic',
        },
        {
            path: './font/Arial Bold.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path: './font/Arial Bold Italic.ttf',
            weight: '700',
            style: 'italic',
        },
    ]
})