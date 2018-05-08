<template>
    <div class="container">
        <div class="state">ID：5498858 （Official Game Streamer）</div>
        <div class="month">
            <div class="last">LAST</div>
            <div class="wrapper">
                <div class="before"></div>
                <div class="current" id="dateSelectorTrigger">2018-04</div>
                <div class="after"></div>
            </div>
            <div class="next">NEXT</div>
        </div>
        <div class="streamer-income">
            <div class="header radius">Official Streamer Income details</div>
            <div class="details">
                <div class="item" v-for="(item,index) in streamerIncome" :key="index">
                    <div class="left">
                        <div class="title">{{item.title}}</div>
                        <div class="note" v-if="item.reasons" @click="showFinesModal">{{item.reason_title}}</div>
                    </div>
                    <div class="right" :class="item.profit?'active':''">{{(item.profit?"+":"-")+item.currency+item.account}}</div>
                </div>
                <div class="remark">
                    <span>Deposited</span>
                </div>
                <div class="time">2018/05/15 AM 08:58</div>
            </div>
        </div>
        <div class="referral-income">
            <div class="header">Referral Income</div>
            <div class="details">
                <div class="item">
                    <div class="left">
                        <div class="title">Referral number</div>
                    </div>
                    <div class="right">{{referalIncome.referral_number}}</div>
                </div>
                <div class="item">
                    <div class="left">
                        <div class="title">Total</div>
                    </div>
                    <div class="right active">+${{referalIncome.total_income}}</div>
                </div>
                <div class="remark">
                    <span>Deposited</span>
                </div>
                <div class="time">2018/05/15 AM 08:58</div>
            </div>
        </div>
        <div class="live-details">
            <div class="header">Game LIVE Details</div>
            <div class="table">
                <div class="tr">
                    <div class="th">Date</div>
                    <div class="th">Game Live<br>(hour)</div>
                    <div class="th">Valid days</div>
                    <div class="th">Increased Followers</div>
                </div>
                <div class="tr" :class="item.invalid?'invalid':''" v-for="(item,index) in game_live_details" :key="index">
                    <div class="td">{{item.date}}{{item.invalid?'\n(invalid)':''}}</div>
                    <div class="td">{{item.hours}}</div>
                    <div class="td">{{item.valid_days}}</div>
                    <div class="td">{{item.increased_followers}}</div>
                </div>
            </div>
            <div class="more-btn">
                <span>Click More</span>
            </div>
        </div>
        <div class="declaration">
            * Nonolive Game Streamer Salary Policy is subjected to change. <br> Basic salary, incentive items, incentive amount can be modified each month. <br> Any such modification will be effective immediately upon public posting. <br> The interpretation of salary policy shall be the sole rights of Nonolive.<br><br> *all the datas are calculated as nonoday (4:00am~4:00am)
        </div>
        <div class="fines-modal" v-if="fines&&fines.length>0" v-show="isShowFinesModal" @click="hideFinesModal">
            <div class="box" @click="($event)=>{$event.stopPropagation();}">
                <div class="srcoll-wrapper">
                    <div class="item" v-for="(item,index) in fines" :key="index">
                        <img class="pic" :src="item.pic" alt="">
                        <div class="desc">{{item.desc}}</div>
                        <div class="time">{{item.date}}</div>
                    </div>
                </div>
                <div class="close" @click="hideFinesModal"></div>
            </div>
        </div>
        <div id="targetContainer"></div>
    </div>
</template>
<script>
import DateSelector from "mob-date-selector";
import { fixedBody, looseBody } from "../../utils/tools.js";
export default {
    data() {
        return {
            isShowFinesModal: false,
            fines: [
                {
                    pic:
                        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525687972947&di=91746f79b57716d3fd27a59080f23ef3&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fexp%2Fw%3D480%2Fsign%3D60e30eebd2c8a786be2a4b065708c9c7%2F962bd40735fae6cd3e7505700cb30f2443a70fd9.jpg",
                    desc: "罚款原因：妆太浓，我不喜欢，除非给哥跳个舞",
                    date: "2018/01/01"
                },
                {
                    pic:
                        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525687972947&di=91746f79b57716d3fd27a59080f23ef3&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fexp%2Fw%3D480%2Fsign%3D60e30eebd2c8a786be2a4b065708c9c7%2F962bd40735fae6cd3e7505700cb30f2443a70fd9.jpg",
                    desc: "罚款原因：妆太浓，我不喜欢，除非给哥跳个",
                    date: "2018/01/01"
                }
            ],
            streamerIncome: [
                {
                    title: "Basic Income",
                    account: 20,
                    currency: "$",
                    profit: 1,
                    reasons: null
                },
                {
                    title: "Standard incentive",
                    account: 0,
                    currency: "$",
                    profit: 1,
                    reasons: null
                },
                {
                    title: "Extra incentive",
                    account: 10,
                    currency: "$",
                    profit: 1,
                    reasons: null
                },
                {
                    title: "Fines",
                    account: 10,
                    currency: "$",
                    profit: 0,
                    reason_title: "Note",
                    reasons: [
                        {
                            pic:
                                "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3444263512,664505935&fm=200&gp=0.jpg",
                            desc:
                                "罚款原因：妆太浓，我不喜欢，除非给哥跳个舞",
                            date: "2018/01/01"
                        }
                    ]
                },
                {
                    title: "Total",
                    account: 20,
                    currency: "$",
                    profit: 1,
                    reasons: null
                }
            ],
            referalIncome: { referral_number: 4, total_income: 20 },
            game_live_details: [
                {
                    date: "2018/01/01",
                    hours: 4.14,
                    valid_days: 1,
                    increased_followers: 2313
                },
                {
                    date: "2018/01/01",
                    hours: 4.14,
                    valid_days: 1,
                    increased_followers: 2313
                },
                {
                    invalid: true,
                    date: "2018/01/01",
                    hours: 4.14,
                    valid_days: 1,
                    increased_followers: 2313
                },
                {
                    invalid: true,
                    date: "2018/01/01",
                    hours: 4.14,
                    valid_days: 1,
                    increased_followers: 2313
                },
                {
                    invalid: true,
                    date: "2018/01/01",
                    hours: 4.14,
                    valid_days: 1,
                    increased_followers: 2313
                }
            ]
        };
    },
    created() {
        document.title = "Salary Details";
    },
    mounted() {
        setTimeout(() => {
            let now = [new Date().getFullYear(), new Date().getMonth() + 1];
            new DateSelector({
                input: "dateSelectorTrigger",
                container: "targetContainer",
                type: 0,
                param: [1, 1, 0, 0, 0],
                beginTime: [2010, 1],
                endTime: now,
                recentTime: now,
                success: function(arr1, arr2) {
                    console.log(arr2);
                    arr2[1].length < 2 && (arr2[1] = "0" + arr2[1]);
                }
            });
        }, 1000);
    },
    methods: {
        showFinesModal() {
            this.isShowFinesModal = true;
            fixedBody();
        },
        hideFinesModal() {
            this.isShowFinesModal = false;
            looseBody();
        }
    }
};
</script>

<style lang="scss" scoped>
@import url("./DateSelector/style.css");
.container {
    width: 100%;
    padding-bottom: 36px;
    .fines-modal {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        .box {
            box-sizing: border-box;
            font-size: 24px;
            color: #4d4c4c;
            width: 610px;
            background: #fff;
            border-radius: 20px;
            position: relative;
            padding: 30px 50px;
            .srcoll-wrapper {
                max-height: 900px;
                overflow: scroll;
                .item {
                    text-align: center;
                    margin-bottom: 30px;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    .pic {
                        width: 425px;
                        height: auto;
                    }
                    .desc {
                        margin-top: 20px;
                        text-align: left;
                        line-height: 1.5;
                    }
                    .time {
                        text-align: left;
                        line-height: 1.5;
                    }
                }
            }
            .close {
                width: 25px;
                height: 26px;
                position: absolute;
                top: 20px;
                right: 20px;
                background: url("../../images/salary_details/close_btn.png") 0 0
                    no-repeat;
                background-size: 25px 26px;
            }
        }
    }
    .state {
        font-size: 24px;
        color: #9f9f9f;
        height: 65px;
        line-height: 66px;
        text-align: center;
    }
    .month {
        margin: 0 32px 20px 32px;
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .last {
            font-size: 26px;
            color: #4c4b4b;
            padding-left: 30px;
            background: url("../../images/salary_details/left_btn.png") left
                center no-repeat;
            background-size: 15px 24px;
        }
        .wrapper {
            display: flex;
            align-items: center;
            .before {
                margin-right: 10px;
                display: inline-block;
                width: 31px;
                height: 29px;
                background: url("../../images/salary_details/calendar.png") 0
                    center no-repeat;
                background-size: 31px 29px;
            }
            .after {
                margin-left: 10px;
                display: inline-block;
                width: 17px;
                height: 13px;
                background: url("../../images/salary_details/triangle_dowm.png")
                    0 center no-repeat;
                background-size: 17px 13px;
            }
            .current {
                font-size: 30px;
                color: #4c4b4b;
            }
        }
        .next {
            font-size: 26px;
            color: #4c4b4b;
            padding-right: 30px;
            background: url("../../images/salary_details/right_btn.png") right
                center no-repeat;
            background-size: 15px 24px;
        }
    }
    .streamer-income,
    .referral-income {
        margin: 0 26px;
        .header {
            font-size: 28px;
            color: #4d4c4c;
            height: 98px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #eee;
            &.radius {
                border-radius: 10px 10px 0 0;
            }
        }
        .details {
            font-size: 24px;
            color: #4c4b4b;
            background: #f7f7f7;
            padding: 10px 45px;
            .item {
                height: 60px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left {
                    display: flex;
                    .title {
                        margin-right: 20px;
                    }
                    .note {
                        color: #3c91f0;
                        text-decoration: underline;
                    }
                }
                .right {
                    &.active {
                        color: #f2a525;
                    }
                }
            }
            .remark {
                text-align: right;
                margin-top: 20px;
                text-align: right;
                span {
                    padding-left: 25px;
                    background: url("../../images/salary_details/tick.png") left
                        center no-repeat;
                    background-size: 18px 12px;
                }
            }
            .time {
                margin: 10px 0 18px 0;
                text-align: right;
                color: #9f9f9f;
            }
        }
    }
    .live-details {
        margin: 0 26px;
        padding-bottom: 24px;
        background: #f7f7f7;
        .header {
            font-size: 28px;
            color: #4d4c4c;
            height: 98px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #eee;
        }
        .table {
            text-align: center;
            .tr {
                font-size: 24px;
                color: #4d4c4c;
                height: 82px;
                display: flex;
                align-items: center;
                &.invalid {
                    color: #9f9f9f;
                }
                .th {
                    font-weight: bold;
                    width: 25%;
                }
                .td {
                    width: 25%;
                }
            }
        }
        .more-btn {
            margin: 24px auto 0 auto;
            font-size: 24px;
            color: #4d4c4c;
            width: 95%;
            height: 68px;
            text-align: center;
            line-height: 70px;
            border-radius: 10px;
            background: #dfdfdf;
            span {
                padding-right: 30px;
                background: url("../../images/salary_details/bottom_btn.png")
                    right center no-repeat;
                background-size: 19px 12px;
            }
        }
    }
    .declaration {
        border-radius: 10px;
        margin: 26px;
        font-size: 24px;
        color: #4c4b4b;
        line-height: 1.5;
        background: #f7f7f7;
        padding: 30px 34px;
    }
}
</style>
<style>
html{
    height: 100%;
}
body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>