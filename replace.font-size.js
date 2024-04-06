var replace = require('replace-in-file');



const options = {
    files: [
        //'src/**/*.html',
        'src/theme/**/*.scss',
        //'src/app/components/printing/purchase-order-note/purchase-order-note.scss'
    ],
    from: /font-size: (\d+)px;/g, // /font-size: (\d+)px;/g
    to: (match) => {
        const g = [...match.matchAll(/(\d+)/g)];
        return `font-size: calc(10/16 * ${g.map(m => m[1]) / 10}rem);`
    },
    //dry: true,
};

try {
    const results = replace.sync(options);
    console.log('Replacement results:', results);
} catch (error) {
    console.error('Error occurred:', error);
}
