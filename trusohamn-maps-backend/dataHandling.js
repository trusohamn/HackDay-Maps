function generateUniqueId(name){
    const date = new Date(); 
    const timestamp = date.getTime(); 
    const randomMesh = Math.round(Math.random()*1000);
    return name.replace(' ', '-') + '-' + timestamp + randomMesh;
}

module.exports.generateUniqueId = generateUniqueId;