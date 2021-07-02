import { sha256 } from 'js-sha256';

export function clear() {
    localStorage.clear();
}
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}   

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate).format('yyyy-MM-dd'));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

export function mockKDates() {
    //模拟最近100天的日期
    let startDate = new Date().addDays(-99)
    let endDate = new Date()
    return getDates(startDate, endDate)
}

export function mockKData() {
    //模拟一百条
    //数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
    // data: [
    //     [20, 34, 10, 38],
    //     [40, 35, 30, 50],
    //     [31, 38, 33, 44],
    //     [38, 15, 5, 42]
    // ]
    //价格在10到100变动
    let kdata = []
    let base = Math.round(Math.random()*50) + 10
    for(let i = 0; i < 100; i++) {
        let data = []
        for(let j = 0; j < 4; j++) {
            let vol = Math.round(Math.random()*10)
            if((Math.round(Math.random()*10) %2 == 1 || base <= 10) && base < 100) {
                base += vol
            } else {
                base -= vol
            }
            data.push(base)
        }
        kdata.push(data)
    }
    return kdata
}

export function mockContracts() {
    //mock十条合约
    let sts = ['进行中','已完成','异常']
    let txs = []
    let accounts = getAccounts()
    for(let i = 0; i < 10; i ++) {
        let tx = {}
        tx.key = i
        tx.address = sha256(Math.random() + "").substr(0, 40);
        tx.name = accounts[i].name
        tx.amount = Math.round(accounts[i].amount * Math.random()) + 100
        tx.price = Math.round(Math.random()*95) + 5
        tx.tag = sts[tx.price % 3]
        txs.push(tx)
    }
    return txs
}

export function initAccount() {

    let accounts = []
    for (let i = 0; i < 10; i++) {
        let account = {}
        account.address = sha256(Math.random() + "").substr(0, 40);
        account.name = "Company " + String.fromCharCode(65 + i);
        account.amount = 10000;  //分配碳排放份额
        account.balance = 1000000; // 剩余资金
        account.transactionId = [];
        accounts.push(account)
    }
    localStorage.setItem("accounts", JSON.stringify(accounts));
}

export function setAmount(address, amount) {
    let accounts = getAccounts();
    for (let i = 0; i < accounts.length; i++) {
        if (address === accounts[i].address) {
            accounts[i].amount = amount
        }
    }
    localStorage.setItem("accounts", JSON.stringify(accounts));
}
export function getAccounts() {
    return JSON.parse(localStorage.getItem("accounts"))
}
export function getAccountByAddress(address) {
    let accounts = getAccounts();
    for (let i = 0; i < accounts.length; i++) {
        if (address === accounts[i].address)
            return accounts[i];
    }
    return "not found"
}