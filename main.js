var datem= document.querySelector("#dating")
var write = document.querySelector("#output")
var check = document.querySelector("#buto")

function reversed(str) {
  var listofchars = str.split("");
  var reversedlistofchars = listofchars.reverse();
  var reversestr = reversedlistofchars.join("");
  return reversestr
}
function isPalindrome(str) {
  var reverse = reversed(str);
  return str === reverse
}

function convertdatetostr(date) {
  var datestr = { day: '', month: '', year: '' };
  if (date.day < 10) {
    datestr.day = '0' + date.day;
  }
  else {
    datestr.day = date.day.toString();
  }
  if (date.month < 10) {
    datestr.month = '0' + date.month;
  }
  else {
    datestr.month = date.month.toString();
  }
  datestr.year = date.year.toString();
  return datestr;
}
function getalldateformats(date) {
  var datestrm = convertdatetostr(date)
  var ddmmyyyy = datestrm.day + datestrm.month + datestrm.year;
  var mmddyyyy = datestrm.month + datestrm.day + datestrm.year;
  var yyyymmdd = datestrm.year + datestrm.month + datestrm.day;
  var ddmmyy = datestrm.day + datestrm.month + datestrm.year.slice(-2);
  var mmddyy = datestrm.month + datestrm.day + datestrm.year.slice(-2);
  var yymmdd = datestrm.year.slice(-2) + datestrm.month + datestrm.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}
function checkPalindromeForAllDateFormats(date) {
  var datestrm = getalldateformats(date)
  var flag = false;
  for (let i = 0; i < datestrm.length; i++) {
    if (isPalindrome(datestrm[i])) {
      flag = true;
      break;
    }
  }
  return flag
}
function isLeapYear(year) {
  if (year % 400 == 0 )  {
    return true
  }
  if (year % 100 == 0) {
    return false
  }
  if (year % 4 == 0){
    return true
  }
  return false
}
function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    }
    else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  }
  else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year
  };
}
function getNextPalindromeDate(date) {
  var m = 0;
  var nextdate = getNextDate(date);
  while (true) {
    m++;
    if (checkPalindromeForAllDateFormats(nextdate)) {
      break;
    }
    nextdate = getNextDate(nextdate);
  }
  return [m, nextdate];
}
function clickhandler()
{
  var inputdate=datem.value;
  if(inputdate!=='')
  {
    var listofdates=inputdate.split('-')
   var date ={day:Number(listofdates[2]),month:Number(listofdates[1]),year:Number(listofdates[0])}
  };
  if(checkPalindromeForAllDateFormats(date))
  {
    write.innerText="Yes! your birthday is palindrome🥳🥳"
  }
    else
    {
      var[m,nextdate]=getNextPalindromeDate(date);
      write.innerText="The next palindrome date is "+ nextdate.day+"-"+nextdate.month+"-"+ nextdate.year+" You missed by "+ m+"days😔😔"
    }


}
check.addEventListener("click",clickhandler)






