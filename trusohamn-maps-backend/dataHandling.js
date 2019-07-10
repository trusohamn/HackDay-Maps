function generateUniqueId(name) {
    const date = new Date();
    const timestamp = date.getTime();
    const randomMesh = Math.round(Math.random() * 1000);
    return name.replace(' ', '-') + '-' + timestamp + randomMesh;
}

function getAverageRating(data, newRating) {
    // console.log('calculating new rating from', data, newRating);
    const avSummary = data.reduce((accum, el) => {
        const numRating = parseInt(el.rating);
        if (numRating) {
            accum.sum += numRating;
            accum.count += 1;
        };
        return accum;
    }, { sum: parseInt(newRating), count: 1 });
    return (avSummary.sum / avSummary.count).toFixed(1) || null;
}


module.exports = {
    generateUniqueId,
    getAverageRating
};