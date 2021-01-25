function convertDateFromString(dateString) { 
    if (dateString) { 
        var arr1 = dateString.split(" "); 
        var sdate = arr1[0].split('-'); 
        var date = new Date(sdate[0], sdate[1]-1, sdate[2]); 
        return date;
    } 
}


export function formatDate(date, format) {   
    if (!date) return;   
    if (!format) format = "yyyy-MM-dd";   
    switch(typeof date) {   
        case "string":   
            date = new Date(date.replace(/-/, "/"));   
            break;   
        case "number":   
            date = new Date(date);   
            break;   
    }    
    if (!date instanceof Date) return;   
    var dict = {   
        "yyyy": date.getFullYear(),   
        "M": date.getMonth() + 1,   
        "d": date.getDate(),   
        "H": date.getHours(),   
        "m": date.getMinutes(),   
        "s": date.getSeconds(),   
        "MM": ("" + (date.getMonth() + 101)).substr(1),   
        "dd": ("" + (date.getDate() + 100)).substr(1),   
        "HH": ("" + (date.getHours() + 100)).substr(1),   
        "mm": ("" + (date.getMinutes() + 100)).substr(1),   
        "ss": ("" + (date.getSeconds() + 100)).substr(1)   
    };       
    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {   
        return dict[arguments[0]];   
    });                   
} 

export function compareDate(date1, date2) {
    var date1 = convertDateFromString(date1);
    var date2 = new Date(date2);
    if (date1.getTime() > date2.getTime()) {
        return true;
    } else {
        return false;
    }
}

export function  getStorage(key){
    return new Promise((resolve, rej) => {
        dd.getStorage({
        key: key,
        success(res) {
          resolve(res.data)
        },
      });
    })
}