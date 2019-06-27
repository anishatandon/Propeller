import { withAuthorization } from '../Session';
import React from 'react';
import moment from 'moment';
import './index.css';

export class Calendar extends React.Component {
    state = {
        today: moment(),
        context: moment(),
        showMonthPopup: false,
        showYearPopup: false
    }
    constructor(props) {
        super(props);
        this.width = props.width || "";
        this.style = props.style || {};
        this.style.width = this.width
    }
    weekdays = moment.weekdays();
    months = moment.months();

    yearToday = () => {
        return this.state.context.format("YYYY");
    }
    monthToday = () => {
        return this.state.context.format("MMMM");
    }
    dateToday = () => {
        return this.state.context.format("DD");
    }
    daysInMonth = () => {
        return this.state.context.daysInMonth();
    }
    currentDate = () => {
        return this.state.context.get("date");
    }
    currentDay = () => {
        return this.state.context.format("dddd")
    }

    firstDayOfMonth = () => {
        let context = this.state.context;
        let firstDay = moment(context).startOf('month').format('d');
        return firstDay;
    }
    
    prevMonth = () => {
        let context = Object.assign({},this.state.context);
        context = moment(context).subtract(1,"month");
        this.setState({context:context});
        this.props.onPrevMonth && this.props.onPrevMonth();
    }
    nextMonth = () => {
        let context = Object.assign({},this.state.context);
        context = moment(context).add(1,"month");
        this.setState({context:context});
        this.props.onNextMonth && this.props.onNextMonth();
    }
    showMonthEditor = () => {
        this.setState({
            showMonthNav:true
        })
    }
    showYearEditor = () => {
        this.setState({
            showYearNav:true
        })
    }
    setMonth = (month) => {
        let context = Object.assign({},this.state.context);
        context = moment(context).set("month",month);
        this.setState({context: context})
    }
    setYear = (year) => {
        let context = Object.assign({},this.state.context);
        context = moment(context).set("year",year);
        this.setState({context: context})
    }
    onMonthChange = (e) => {
        this.setMonth(e.target.value);
        this.props.onMonthChange && this.props.onMonthChange(e,e.target.value);
    }
    onYearChange = (e) => {
        this.setYear(e.target.value);
        this.props.onYearChange && this.props.onYearChange(e,e.target.value);
    }
    onKeyUpMonth = (e) => {
        if (e.which === 13 || e.which === 27) {
            this.setMonth(e.target.value);
            this.setState({
                showMonthNav: false
            })
        }
    }
    onKeyUpYear = (e) => {
        if (e.which === 13 || e.which === 27) {
            this.setYear(e.target.value);
            this.setState({
                showYearNav: false
            })
        }
    }
    monthNav = () => {
        return (
            this.state.showMonthNav ? <input type="string" defaultValue = {this.monthToday()} className="month" ref={(monthInput)=> {this.monthInput = monthInput}}
            onKeyUp= {(e) => this.onKeyUpMonth(e)} onChange={(e)=>this.onMonthChange(e)} placeholder="Month"/> : 
            <span className="month"
                onDoubleClick={(e)=>{this.showMonthEditor()}}>
                {this.monthToday()}
            </span>
        )
    }
    yearNav = () => {
        return (
            this.state.showYearNav ? <input type="number" defaultValue = {this.yearToday()} className="year" ref={(yearInput)=> {this.yearInput = yearInput}}
            onKeyUp= {(e) => this.onKeyUpYear(e)} onChange={(e)=>this.onYearChange(e)} placeholder="Year"/> : 
            <span className="year"
                onDoubleClick={(e)=>{this.showYearEditor()}}>
                {this.yearToday()}
            </span>
        )
    }
    onDayClick = (e,day) => {
        this.props.onDayClick && this.props.onDayClick(e,day);
    }
    render() {
        let weekdays = this.weekdays.map((day) => {
            return (
                <div className="weekday">{day}</div>
            )
        })
        let monthBefore = moment(this.state.context).subtract(1,"month")
        let monthBeforeCount = Number(monthBefore.daysInMonth()) - (Number(this.firstDayOfMonth()) - 1)
        let monthBeforeDays = [];
        for (let i = 0; i < this.firstDayOfMonth();i++) {
            let d = i+monthBeforeCount
            monthBeforeDays.push(<span className="beforeafter" onClick={(e)=>{this.onDayClick(e,d)}}>{d}</span>);
        }
        
        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            if (d === this.currentDate() & this.state.today.format("MMMM") === this.state.context.format("MMMM") & this.state.today.format("YYYY") === this.state.context.format("YYYY")) {
                daysInMonth.push(<span className="today" onClick={(e)=>{this.onDayClick(e,d)}}>{d}</span>)
            } else {
                daysInMonth.push(<span className="myMonth" onClick={(e)=>{this.onDayClick(e,d)}}>{d}</span>)
            }
        }

        let monthAfter = moment(this.state.context).add(1,"month")
        let monthAfterCount = Number(monthAfter.startOf('month').format('d'))
        let monthAfterDays = [];
        for (let i = 1; i <= 7-monthAfterCount;i++) {
            let d=i
            monthAfterDays.push(<span className="beforeafter" onClick={(e)=>{this.onDayClick(e,d)}}>{d}</span>);
        }
        return (
            <div className="grid">
                <button className="arrowLeft" onClick={(e)=>{this.prevMonth()}}>{"<"}</button>
                <div className="month"><this.monthNav/></div>
                <div className="year"><this.yearNav/></div>
                <button className="arrowRight" onClick={(e)=>{this.nextMonth()}}>{">"}</button>
                <div className="weekday Sun">{weekdays[0]}</div>
                <div className="weekday Mon">{weekdays[1]}</div>
                <div className="weekday Tue">{weekdays[2]}</div>
                <div className="weekday Wed">{weekdays[3]}</div>
                <div className="weekday Thu">{weekdays[4]}</div>
                <div className="weekday Fri">{weekdays[5]}</div>
                <div className="weekday Sat">{weekdays[6]}</div>
                {monthBeforeDays}
                {daysInMonth}
                {monthAfterDays}
        </div>
        )
    }
}
const condition = authUser => !!authUser;

export default  withAuthorization(condition)(Calendar);
