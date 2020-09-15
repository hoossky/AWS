import React, {useEffect, useState} from "react";
import "../assets/css/calendar.css";
import DatePicker, {Calendar, utils} from "react-modern-calendar-datepicker";
import axios from "axios";
const MCalendar = () => {
    const [selectedDay, setSelectedDay] = useState("");
    const[pbRain, setPbRain] = useState([])
    const [data, setData] = useState([]);
    const goodDays = [
        {
            year: 2020,
            month: 8,
            day: 18,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 8,
            day: 27,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 8,
            day: 28,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 9,
            day: 6,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 9,
            day: 7,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 9,
            day: 16,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 9,
            day: 25,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 9,
            day: 26,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 9,
            day: 30,
            className: 'holiDay'
        },
        {
            year: 2020,
            month: 10,
            day: 1,
            className: 'holiDay'
        },
        {
            year: 2020,
            month: 10,
            day: 2,
            className: 'holiDay'
        },
        {
            year: 2020,
            month: 10,
            day: 3,
            className: 'holiDay'
        },
        {
            year: 2020,
            month: 10,
            day: 5,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 10,
            day: 6,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 10,
            day: 9,
            className: 'holiDay'
        },
        {
            year: 2020,
            month: 10,
            day: 15,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 10,
            day: 16,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 10,
            day: 25,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 10,
            day: 26,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 11,
            day: 4,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 11,
            day: 5,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 11,
            day: 9,
            className: 'saleDay'
        },
        {
            year: 2020,
            month: 11,
            day: 10,
            className: 'saleDay'
        },
        {
            year: 2020,
            month: 11,
            day: 11,
            className: 'saleDay'
        },
        {
            year: 2020,
            month: 11,
            day: 12,
            className: 'saleDay'
        },
        {
            year: 2020,
            month: 11,
            day: 13,
            className: 'saleDay'
        },
        {
            year: 2020,
            month: 11,
            day: 16,
            className: 'saleDay'
        },
        {
            year: 2020,
            month: 11,
            day: 17,
            className: 'saleDay'
        },
        {
            year: 2020,
            month: 11,
            day: 18,
            className: 'saleDay'
        },
        {
            year: 2020,
            month: 11,
            day: 19,
            className: 'saleDay'
        },
        {
            year: 2020,
            month: 11,
            day: 20,
            className: 'saleDay'
        },
        {
            year: 2020,
            month: 11,
            day: 14,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 11,
            day: 23,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 11,
            day: 24,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 12,
            day: 3,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 12,
            day: 4,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 12,
            day: 13,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 12,
            day: 14,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 12,
            day: 23,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 12,
            day: 24,
            className: 'handDay'
        },
        {
            year: 2020,
            month: 12,
            day: 25,
            className: 'holiDay'
        },
    ];
    const priceStyle = {
        color : 'red'
    }
    useEffect(() => {
            axios.get(`http://ip/statistics/pbRain`)
                .then((res) => {
                    const pBRainDate = [];
                    res.data.pbRain.forEach(one => {
                        let obj = {};
                        if (one.rainProb <= 30) {
                            obj.year = 2020;
                            obj.month = Number(one.precipitationDate.split('-')[0]);
                            obj.day = Number(one.precipitationDate.split('-')[1]);
                            obj.className = 'pbRain20';
                            pBRainDate.push(obj);
                        } else if (one.rainProb <= 50) {
                            obj.year = 2020;
                            obj.month = Number(one.precipitationDate.split('-')[0]);
                            obj.day = Number(one.precipitationDate.split('-')[1]);
                            obj.className = 'pbRain40';
                            pBRainDate.push(obj);
                        } else if (one.rainProb <= 70) {
                            obj.year = 2020;
                            obj.month = Number(one.precipitationDate.split('-')[0]);
                            obj.day = Number(one.precipitationDate.split('-')[1]);
                            obj.className = 'pbRain60';
                            pBRainDate.push(obj);
                        }
                    });
                    setData(pBRainDate);
                    setPbRain(res.data.pbRain)
                }).catch(
                error => {
                    throw(error)
                }
            )
            setData(goodDays)
        }
        , [])
    const renderCustomInput = ({ref}) => (
        <input
            readOnly='true'
            ref={ref}
            placeholder='Select a Day'
            value={`${selectedDay.year}/${selectedDay.month}/${selectedDay.day}`}
            style={{
                textAlign: 'center',
                padding: '0.3rem 0.5rem',
                fontSize: 'medium',
                border: '1px solid #184f90',
                borderRadius: '50px',
                boxShadow: '0 0.5rem 1rem rgba(156, 136, 255, 0.2)',
                color: '#184f90',
                outline: 'none',
                margin: '0.3rem',
            }}
            className='my-custom-input-class'
        />
    );
    return (
        <div id="wrapper">
            <div id="page-wrap">
                <div className="row">
                    <section className='select'>
                        <h4>(둘 중 어떠한 달력을 선택해도 똑같이 선택됩니다.)</h4>
                        <div>
                            <DatePicker value={selectedDay} renderInput={renderCustomInput}
                                        inputClassName='my-custom-input-class' shouldHighlightWeekends
                            />
                        </div>
                        <div className='row'>
                            <Calendar
                                value={selectedDay}
                                onChange={setSelectedDay}
                                minimumDate={utils().getToday()}
                                colorPrimary='#00365a'
                                calendarClassName='custom-calendar'
                                calendarClassName="responsive-calendar"
                                shouldHighlightWeekends
                                customDaysClassName={goodDays}

                            />
                            <section className='card-body'>
                                <br />
                                <br/>
                                <p className='color-a'>
                                    <h4>＊손 없는 날</h4>
                                    <h5 style={priceStyle}>35% 추가 금액 적용</h5>
                                </p>
                                <br />
                                <p className='color-b'>
                                    <h4>＊공휴일</h4>
                                    <h5 style={priceStyle}>15% 추가 금액 적용</h5>
                                </p>
                                <br />
                                <p className='color-c'>
                                    <h4>＊특가 기간</h4>
                                    <h5 style={priceStyle}>20% 할인 금액 적용</h5>
                                </p>

                            </section>
                            <Calendar
                                value={selectedDay}
                                onChange={setSelectedDay}
                                minimumDate={utils().getToday()}
                                colorPrimary='#00365a'
                                calendarClassName='custom-calendar'
                                calendarClassName="responsive-calendar"
                                shouldHighlightWeekends
                                customDaysClassName={data}
                            />
                            <section className='card-body'>

                                <p className='color-d'>
                                    <h4>＊강수 확률</h4>
                                    <h5 style={priceStyle}>30% 이하  &#128153;</h5>
                                    <h5 style={priceStyle}> 50% 이상 &#128155; </h5>
                                    <h5 style={priceStyle}>70% 이상 &#128163;</h5>
                                    <h5>*기상청(기상개방포털) </h5><br/>
                                    <h5 style={{color : 'red'}}>  2000년 1월 1일~ 2020년 8월 16일 </h5><br/>
                                    <h5>강수자료를 기준으로 했습니다.</h5>
                                </p>
                            </section>

                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
export default MCalendar;