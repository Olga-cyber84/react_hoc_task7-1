import React, {useState} from 'react';

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

function withPretty(DateTime) {
  function formatDate(days) {
    const  daysStr = days.toString();
    const  daysStrLen = daysStr.length - 1;
    if (daysStr[daysStrLen] === "1" && days !== 11) {
      return `${days} день назад`
    } else if (days > 10 && days < 14) {
      return `${days} дней назад`
    } else if (daysStr[daysStrLen] === "2" || daysStr[daysStrLen] === "3" || daysStr[daysStrLen] === "4") {
      return `${days} дня назад`
    } else {
      return `${days} дней назад`
    }
  }
  return class extends React.Component { 
    render() {
      const deltaInMsc = (new Date().getTime() - new Date(this.props.date).getTime()) / 1000
      const upgratedDate = (deltaInMsc < 3600 && "12 минут назад")
                      || (deltaInMsc > 3600 && deltaInMsc < 3600*24 && "5 часов назад")
                      || (deltaInMsc > 3600*24 && formatDate(Math.floor(deltaInMsc/ (3600*24)))) 
      
      return <DateTime {...this.props} date={upgratedDate}/>
    }
  }
}

const DateTimePretty = withPretty(DateTime)

function Video(props) {

    return (
        <div className="video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            {/* <DateTime date={props.date} /> */}
            <DateTimePretty date={props.date} />
        </div>
    )
}

function VideoList(props) {
    return props.list.map((item, index) => <Video url={item.url} date={item.date} key={index}/>);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2021-04-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2021-05-17 10:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2021-05-15 10:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2021-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2021-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2020-12-06 05:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}