function getObjectSize(obj) {
    var count = 0;
    for(key in obj) {
        if(obj.hasOwnProperty(key)) {
            count++;
        }
    }
    return count;
}
