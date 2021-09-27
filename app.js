function reverseStr(str){
    var listofstr = str.split('');
    var reverseListOfChar = listofstr.reverse();
    var reversedstr = reverseListOfChar.join('');   
    return reversedstr;
    // return str.split('').reverse().join('')
}

function isPalindrome(str){
    var reverseString = reverseStr(str);
    return str==reverseString
      
}

function convertDateToString(date){
    var dateStr = {day:'',month:'',year:''}
    if (date.day<10){
        dateStr.day = '0' + date.day;
    }else{
        dateStr.day = date.day.toString();
    }
    if (dateStr.month<10){
        dateStr.month = '0'+date.month;
    }else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

var date = {
    day:15,
    month : 9,
    year : 2020
}

function getAllDateFormat(date){
    var dateStr = convertDateToString(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

function checkPalindromeForAllTheFormat(date){
    var listOfPalindromes = getAllDateFormat(date);

    var flag = false;

    for(var i=0; i < listOfPalindromes.length; i++){
        if(isPalindrome(listOfPalindromes[i])){
            flag = true;
            break;
        }
    }
    return flag;

}

function isLeapYear(year){
    if(year%400==0){
        return  true
    }
    if(year%100==0){
        return false
    }
    if(year%4 == 0){
        return true;
    }
    return false

}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31]

    if (month==2){
        if(isLeapYear(year)){
            if(day>29){
                day = 1;
                month++;
            }
        }
        else{
            if(day>28){
                day = 1 ;
                month++
            }
        }
    }
    else{
        if(day > daysInMonth[month-1]){
            day = 1;
            month++;
        }
    }
    if(month>12){
        month = 1
        year++
    }
    return {
        day :day,
        month:month,
        year: year

    };
}
function getPreviousDate(date){
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31]

    if (month==3){
        if(isLeapYear(year)){ 
            if(day<1){
                day=29
                month--;
        }
    }
        else{
            if(day<1){
                day = 28 ;
                month--;
            }
        }
    }
    else{
        if(day<1){
        day = daysInMonth[month-1]-1;
        month--;
        }
        if(day > daysInMonth[month-1]){
            day--;
        }
        
    }
    if(month<1){
        day = 31
        month=12
        year--
        
    }
    return {
        day :day,
        month:month,
        year: year

    };
}

function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);
    while(1){
        ctr++;
        var itIsPalindrome = checkPalindromeForAllTheFormat(nextDate);
        if(itIsPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return[ctr,nextDate];
}
function getPreviousPalindromeDate(date){
    var ctr = 0;
    var previousDate = getPreviousDate(date);
    while(1){
        ctr++;
        var itIsPalindrome = checkPalindromeForAllTheFormat(previousDate);
        if(itIsPalindrome){
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }
    return[ctr,previousDate];
}


const dateInputs = document.querySelector("#bday-input");

const showBtn = document.querySelector("#show-btn");

const result = document.querySelector("#result");
const result2 = document.querySelector("#result2");

function clickHandler(e){
    var bdyStr = dateInputs.value;

    if(bdyStr !==''){
        var listofDate = bdyStr.split('-');
        var date = {
            day : Number(listofDate[2]),
            month : Number(listofDate[1]),
            year : Number(listofDate[0])
        };
        var isPalindrome = checkPalindromeForAllTheFormat(date); 
        if(isPalindrome){
            result.innerHTML= 'yay ! your birthday is a palindrome 🤓 😎'
        }
        else{
            var [ctr,nextDate]  = getNextPalindromeDate(date)
            result.innerHTML= `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed ${ctr} days!🥺 😢`
            
            var [ctr,PreviousDate]  = getPreviousPalindromeDate(date)
            result2.innerHTML= `The previous palindrome date was ${PreviousDate.day}-${PreviousDate.month}-${PreviousDate.year}, you missed ${ctr} days!🥺 😢`

            
        }
        
    }

}

showBtn.addEventListener("click",clickHandler)

