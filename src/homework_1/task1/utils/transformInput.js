const transformInput = () => {
    process.stdin.setEncoding('utf8');
    
    process.stdin.on('readable', () => {
        let chunk;
        while ((chunk = process.stdin.read()) !== null) {
            process.stdout.write(chunk.toString().trim().split('').reverse().join(''));
        }
    });
    
    process.stdin.on('end', () => {
        process.stdout.write('end');
    });
};

export default transformInput;
