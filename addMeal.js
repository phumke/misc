/* Bookmarklet for adding meals to my calendar
 *
 * https://developers.google.com/google-apps/calendar/concepts/events-calendars
 * https://stackoverflow.com/questions/22757908/google-calendar-render-action-template-parameter-documentation
 * http://pastetool.com/generators/bookmarklet/
 * https://gist.github.com/deenseth/1514633
 */
javascript: 

function getName() {
  var s;

  /*Figure out the selected text*/
  if ( window.getSelection ) {
      s = window.getSelection();
  } else if ( document.getSelection ) {
      s = document.getSelection();
  } else {
      s = document.selection.createRange().text;
  }

  /*If there isn't any text selected, get user input*/
  if ( s == '' ) {
      s = prompt('Meal name');
  }

  return s;
}

function getDate(dayOffset = 0) {
  var d = new Date();
  d.setDate(d.getDate() + dayOffset);
  const year_s = d.getFullYear() + '';
  const month = d.getMonth() + 1;
  const month_s = month >= 10 ? month + '' : '0' + month;
  const day = d.getDate();
  const day_s = day >= 10 ? day + '' : '0' + day;
  
  return year_s + month_s + '' + day_s;
}

const title = getName();
const dates = getDate() + '/' + getDate(1);
const mealUrl = window.location.href;
const calId = ''; /* Add your calendar ID here */

if (title) {
  console.log(title);
  const url = 'http://www.google.com/calendar/event?ctext=' + title + '&action=TEMPLATE&pprop=HowCreated:QUICKADD&src=' 
          + calId + '&details=' + mealUrl + '&dates=' + dates;
  console.log(url);
  void(
    /*open a new window with this information in the Google Calendar event creation page.*/
    window.open(
        encodeURI(url),
        'addwindow',
        'status=no,toolbar=no,width=1000,height=470,resizable=yes'
    )
  );
}
