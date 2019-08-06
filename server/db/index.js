module.exports = {
    addLocation : require('./addNewLocation').insert,
    getAllLocations: require('./getAllLocations').getAll,
    getReviews: require('./getReviews').get,
    addReview: require('./addReview').addReview,
    updateLocationWithRating: require('./updateLocationWithRating').update
}