function generateUniqueId(name){
    const date = new Date(); 
    const timestamp = date.getTime(); 
    return name.replace(' ', '-') + '-' + timestamp;
}

module.exports.generateUniqueId = generateUniqueId;