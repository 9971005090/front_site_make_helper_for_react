// src/components/utils/custom-select-box.js

import React from "react";
import ReactDOM from "react-dom/client";
import $ from "cash-dom";
import { Chart } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);
const CustomLineBarChartAsync = function() {
    let container = null;
    let root = null;
    const CustomLineBarChartComponent = function({ options, now }) {
        const info = {
            'data': {
                labels: options.labels,
                datasets: [
                    {
                        type: `line`,
                        label: options.label,
                        data: options.data,
                        fill: false,
                        borderColor: 'rgb(0, 123, 255)',
                        tension: 0.1
                    },
                    {
                        type: `bar`,
                        label: options.label,
                        data: options.data,
                        fill: true,
                        backgroundColor: "rgb(255, 105, 180)", // 분홍색 배경 (연한 핑크)
                        borderColor: "rgb(255, 105, 180)", // 테두리 색상 (진한 핑크)
                        borderWidth: 2,
                    }
                ]
            },
            'options': {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false  // 범례 숨기기
                    }
                },
                maintainAspectRatio: false, // 비율 유지 해제
            }
        };

        const setAddEvent = async function() {
            ////////////////////////////////////////////////////////////////////

            ////////////////////////////////////////////////////////////////////
        };
        React.useEffect(function() {
            Array.routeChangeCallback(handleRouteChange);
        }, [now]);

        return (
            <Chart type="bar" data={info.data} options={info.options} />
        );
    };
    const run = async function(selector, options, ret = null) {
        if (ret === null) {
            container = $(selector)[0];
            root = ReactDOM.createRoot(container);
            root.render(
                <CustomLineBarChartComponent options={options} now={Date.getNow()} />
            );
        }
        else {
            root = ret.root;
            container = ret.container;
            root.render(
                <CustomLineBarChartComponent options={options} now={Date.getNow()} key={Date.getNow()}/>
            );
        }
        return {root, container, close};
    };

    const handleRouteChange = function() {
        // 빠르게 처리가 되다보니, main 콤포넌트의 랜더링과 겹쳐 실행이 될 수 있다.
        // 그래서 최대한 늦춰서 실행되게. 결국 main 콤포넌트의 랜더링이 끝나고 실행될 수 있게
        setTimeout(function() {
            close();
        }, 100);
    };

    function close() {
        if (root !== null) {
            root.unmount();
            root = null;
        }
        if (container !== null) {
            container.remove();
            container = null;
        }
    }

    return {
        run: run,
    };
};

export { CustomLineBarChartAsync };