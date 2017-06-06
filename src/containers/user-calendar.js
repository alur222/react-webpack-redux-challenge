import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchWeekByWeekNumber, fetchWeeks } from '../actions/index';
import { bindActionCreators } from 'redux';

import $ from 'jquery';
import _ from 'lodash';

var clndrTemplate =
    "<div class='clndr-controls'>" +
        "<div class='clndr-control-button'>" +
            "<span class='clndr-previous-button'>previous</span>" +
        "</div>" +
        "<div class='month'><%= month %> <%= year %></div>" +
        "<div class='clndr-control-button rightalign'>" +
            "<span class='clndr-next-button'>next</span>" +
        "</div>" +
    "</div>" +
    "<table class='clndr-table' border='0' cellspacing='0' cellpadding='0'>" +
        "<thead>" +
            "<tr class='header-days'>" +
            "<% for(var i = 0; i < daysOfTheWeek.length; i++) { %>" +
                "<td class='header-day'><%= daysOfTheWeek[i] %></td>" +
            "<% } %>" +
            "</tr>" +
        "</thead>" +
        "<tbody>" +
        "<% for(var i = 0; i < numberOfRows; i++){ %>" +
            "<tr>" +
            "<% for(var j = 0; j < 7; j++){ %>" +
            "<% var d = j + i * 7; %>" +
              "<td class='<%= days[d].classes %>'>" +
                  "<div class='day-contents'>" +
                  "<%= days[d].day %>" +
                  "<% _.each(days[d].events, function(event) { %>" +
                    "<div class='event-item <%= event.date %>'>" +
                      "<div class='event-item-name'><%= event.title %></div>" +
                    "</div>" +
                  "<% }); %>" +
                  "</div>" +
              "</td>" +
            "<% } %>" +
            "</tr>" +
        "<% } %>" +
        "</tbody>" +
    "</table>";

class UserCalendar extends Component {
  render() {
    if(!this.props.user) {
      return (
        <div></div>
      );
    }

    return (
      <div className="row col-sm-12">
        <div className="cal1"></div>
      </div>
    );
  }

  componentDidUpdate(props) {
    if (this.props.user) {
      const component = this;
      const userId = component.props.user.id;
      const weeks = this.props.userWeeks.weeks;
      let dailies = [];
      if (weeks) {
        const month = this.props.userWeeks.month;
        const paddedMonth = month < 10 ? `0${month}` : month;
        dailies = weeks.reduce(function(current, item) {
          const days = item.days_in_week.map((day) => {
            const paddedDay = day.day_number < 10 ? `0${day.day_number}` : day.day_number;
            const paddedMinutes = day.minutes < 10 ? `0${day.minutes}` : day.minutes;
            return {
              title: `${day.hours}:${paddedMinutes} hrs`,
              date: `2017-${paddedMonth}-${paddedDay}`,
            };
          });
          return current.concat(days);
        }, []);
      }
      var calendarInstance = $(".cal1").clndr({
        constraints: {
          endDate: '2017-12-31',
          startDate: '2017-01-01'
        },
        template: clndrTemplate,
        clickEvents: {
          click: (target) => {
            if (!$(target.element).hasClass('inactive')) {
              const week = component.props.userWeeks.weeks.filter(x => x.week_number === target.date.week());
              component.props.fetchWeekByWeekNumber(week.length ? week[0] : {});
              const elem = $(target.element).parent('tr');
              if (!elem.hasClass('selected')) {
                elem.parents('tbody').find('tr.selected').removeClass('selected');
                elem.addClass('selected');
              }
            } else {
              console.log('That date is outside of the range.');
            }
          },
          onMonthChange: (month) => {
            const newMonth = month.month() + 1;
            component.props.fetchWeeks(newMonth, component.props.user.id);
          },
        }
      });
      calendarInstance.setEvents(dailies);
    }
  }

}

function mapStateToProps(state) {
  return {
    user: state.selectedUser,
    userWeeks: state.userWeeks,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchWeekByWeekNumber: fetchWeekByWeekNumber,
    fetchWeeks: fetchWeeks,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCalendar);
