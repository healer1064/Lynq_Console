// libraries
import React from 'react';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
import Select from 'react-select'
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

// styles
import styles from './styles.module.scss';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import "react-datepicker/dist/react-datepicker.css";

// icons
import { CaretDownOutlined } from '@ant-design/icons';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FaBook } from 'react-icons/fa';

// components
import { Dropdown, Button } from 'antd';
import DropdownMenu from './DropdownMenu';
import Item from './Item';
import Card from './Card';
import Progress from './Progress';
const index = ({ data, period, setPeriod }) => {
  const series = [{
    name: 'Visits',
    data: [40, 36, 170, 79, 129, 139, 122, 99, 120, 72, 191, 57, 113, 99, 107, 92, 117, 195]
  }];

  const apexoptions = {
      chart: {
        height: 400,
        type: 'line',
      },
      stroke: {
        width: 5,
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: ['02/01', '02/02', '02/03', '02/04', '02/05', '02/06', '02/07', '02/08', '02/09',
                     '02/10', '02/11', '02/12', '02/13', '02/14', '02/15','02/16' ,'02/17' ,'02/18'],
        tickAmount: 6,
        labels: {
          formatter: function(value, timestamp, opts) {
            return opts.dateFormatter(new Date(timestamp), 'dd MMM')
          }
        }
      },
      title: {
        text: 'Visits',
        align: 'left',
        style: {
          fontSize: "16px",
          color: '#666'
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark', //dark light
          colorStops: [
            {
              offset: 0,
              color: "#5dc1ff",
              opacity: 1
            },
            {
              offset: 100,
              color: "#fe5cef",
              opacity: 1
            },
          ],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        },
      },
      yaxis: {
        min: -10,
        max: 200
      }
    };

  const donut_options = {
    series: [44, 55, 41, 17, 5, 10],
      chart: {
      type: 'donut',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        },
      }
    }],
    labels: ["Instagram", "TikTok", "Youtube", "Facebook", "Twitter", "Other"],
    title: {
      text: 'Origins',
      align: 'left',
      style: {
        fontSize: "16px",
        color: '#666'
      }
    },
    legend: {
      position: 'bottom'
    },
  };

  const select_options = [
    { value: 'BD', label: 'Block details' },
    { value: 'EC', label: 'Exclusive content' },
    { value: 'VQ', label: 'Video Q&A' },
    { value: 'PA', label: 'Project A' },
    { value: '11', label: '1-on-1' },
    { value: 'PR', label: 'Product reco' },
  ];

  const [block, setBlock] = useState("BD");
  const [pickerDay, setPicker] = useState();
  const [date, setDate] = useState(null);
  const [pickerEndDay, setEndPicker] = useState();
  const [endDate, setEndDate] = useState(null);

  return (
    <div className={styles.stats}>
      <div className={styles.head}>
        <label className={styles.date_input}>
          <DatePicker
            minDate={moment().toDate()}
            selected={pickerDay}
            dateFormat='MM/dd/yyyy'
            onChange={(date) => {
              setPicker(date);
              setDate(moment(date).toISOString());
            }}
          />
        </label>
        <label className={styles.date_input}>
          <DatePicker
            minDate={moment().toDate()}
            selected={pickerEndDay}
            dateFormat='MM/dd/yyyy'
            onChange={(endDate) => {
              setEndPicker(endDate);
              setEndDate(moment(endDate).toISOString());
            }}
          />
      </label>
      </div>
      <div className={styles.chart_div}>
        <div className={styles.line_chart}>
          <ApexCharts options={apexoptions} series={series} type="line" height={400} />
        </div>
        <div className={styles.donut_chart}>
          <ApexCharts options={donut_options} series={donut_options.series} type="donut" height={400} />
        </div>
      </div>
      <div className={styles.total_info}>
        <Card
          name='Total clicks'
          number={`178+`}
          image='/img/icon_click_count.jpg'
        />
        <Card
          name='Total revenue'
          number={"$2389"}
          image='/img/icon_revenue.jpg'
        />
        <Card
          name='Conversion rate'
          number={"3.89%"}
          image='/img/icon_coversation_rate.jpg'
        />
      </div>
      <div className={styles.partial_info}>
        <div className={styles.block_select}>
          <Select options={select_options} onChange={(values) => setBlock(values.value)}/>
        </div>
        { block === "BD" && 
          <div className={styles.block_details}></div>
        }
        { block === "EC" &&
          <>
            <div className={styles.exclusive}>
              <Card
                name='Total clicks'
                number={`178+`}
                image='/img/icon_click_count.jpg'
              />
              <Card
                name='Total revenue'
                number={"$2389"}
                image='/img/icon_revenue.jpg'
              />
            </div>
            <>
              <Progress percentage={52} label={"1 month subscribers"}/>
              <Progress percentage={33} label={"3 month subscribers"}/>
              <Progress percentage={15} label={"6 month subscribers"}/>
            </>
          </>
        }
        { block === "VQ" && 
          <div className={styles.video_qa}>
            <div>
              <Card
                name='Total clicks'
                number={`178+`}
                image='/img/icon_click_count.jpg'
              />
              <Card
                name='Total time spent in the module'
                number={"2.3min"}
                image='/img/icon_time.jpg'
              />
            </div>
            <div>
              <Card
                name='Total purchase'
                number={`71`}
                image='/img/icon_purchase.jpg'
              />
              <Card
                name='Total revenue'
                number={"$2,389"}
                image='/img/icon_revenue.jpg'
              />
            </div>
          </div>
        }
        { block === "PA" && 
          <div className={styles.project_a}>
            <div>
              <Card
                name='Total clicks'
                number={`178+`}
                image='/img/icon_click_count.jpg'
              />
              <Card
                name='Total time spent in the module'
                number={"2.3min"}
                image='/img/icon_time.jpg'
              />
            </div>
            <div>
              <Card
                name='Total purchase'
                number={`71`}
                image='/img/icon_purchase.jpg'
              />
              <Card
                name='Total revenue'
                number={"$2,389"}
                image='/img/icon_revenue.jpg'
              />
            </div>
          </div>
        }
        { block === "11" && 
          <div className={styles.one_to_one}>
            <div>
              <Card
                name='Total clicks'
                number={`178+`}
                image='/img/icon_click_count.jpg'
              />
              <Card
                name='Total time spent in the module'
                number={"2.3min"}
                image='/img/icon_time.jpg'
              />
            </div>
            <div>
              <Card
                name='Total purchase'
                number={`71`}
                image='/img/icon_purchase.jpg'
              />
              <Card
                name='Total revenue'
                number={"$2,389"}
                image='/img/icon_revenue.jpg'
              />
            </div>
          </div>
        }
        { block === "PR" && 
          <div className={styles.product_reco}>
            <div>
              <Card
                name='Total clicks'
                number={`178+`}
                image='/img/icon_click_count.jpg'
              />
              <Card
                name='Total time spent in the module'
                number={"2.3min"}
                image='/img/icon_time.jpg'
              />
            </div>
            <div>
              <Card
                name='Total purchase'
                number={`71`}
                image='/img/icon_purchase.jpg'
              />
              <Card
                name='Total revenue'
                number={"$2,389"}
                image='/img/icon_revenue.jpg'
              />
            </div>
            <>
              <Progress percentage={89} label={"name of the product 1"}/>
              <Progress percentage={51} label={"name of the product 2"}/>
              <Progress percentage={33} label={"name of the product 3"}/>
            </>
          </div>
        }
      </div>
      {/* <div>
        <h5 className={styles.box}>Revenue</h5>
        <div className={styles.list}>
          {data.finance.map((item, index) => (
            <Item
              name={item.name}
              number={`$${item?.revenue}`}
              key={index}
            />
          ))}
        </div>
      </div> */}
      {/* <div>
        <h5 className={styles.box}>Clicks</h5>
        <div className={styles.list}>
          {data.performance.map((item, index) => (
            <Item
              name={item.name}
              number={item.clicks}
              key={index}
            />
          ))}
        </div>
      </div> */}
      {/* <div className={styles.list}>
        <Item
          name='Clicks on 1:1 video calls'
          number={data.private_session.clicks}
          type='1-1'
          order={1}
          row='upper'
        />
        <Item
          name='Clicks on masterclasses'
          number={data.masterclass.clicks}
          type='masterclass'
          order={2}
          row='upper'
        />
        <Item
          name='Clicks on video messages'
          number={data.message.clicks}
          type='message'
          order={3}
          row='upper'
        />
        <Item
          name='Total 1:1 video calls purchased'
          number={data.private_session.revenue}
          type='1-1'
          order={11}
          row='lower'
        />
        <Item
          name='Total masterclasses purchased'
          number={data.masterclass.revenue}
          type='masterclass'
          order={12}
          row='lower'
        />
        <Item
          name='Total video messages purchased'
          number={data.message.revenue}
          type='message'
          order={13}
          row='lower'
        />
      </div> */}
      {/* <div className={styles.list}>
        <Item
          name='Clicks on On-demand content'
          number='-'
          image='/img/dashboard-click.svg'
        />
        <Item
          name='Total eBooks sold'
          number='-'
          image='/img/dashboard-ebook.svg'
        />
        <Item
          name='Revenue from eBools'
          number='$ -'
          image='/img/dashboard-ebook.svg'
        />
      </div> */}
     
    </div>
  );
};

export default index;
