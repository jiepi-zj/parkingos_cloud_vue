// export const path = "http://120.25.121.204:8080/cloud"

// export const path = "http://localhost:8086"
//export const path = "http://192.168.199.206:12305"
//export const path = "http://localhost:8085"
export const path = "http://localhost:8080/cloud"


export const phonewidth = '150'
//beta设置为5   s.bolink设置为2 
export const percision = 5


export const carState = [
    {'value_name': '正常','value_no': '0',},
    {'value_name': '已挂失','value_no': '1',},
    {'value_name': '已退租','value_no': '2'}
]

export const checkState = [
    {'value_name': '待审核','value_no': '0',},
    {'value_name': '已审核','value_no': '1',},
    {'value_name': '审核未通过','value_no': '2'}
]

export const accountStyle = [
    {'value_name': '微信公众号支付','value_no': '0',},
    {'value_name': '微信APP支付','value_no': '1',},
    {'value_name': '支付宝账号','value_no': '2'}
]

export const feeState = [
    {'value_name': '未启用', 'value_no': '0'},
    {'value_name': '启用', 'value_no': '1'}
]

export const orderStates = [
    {'value_name': '未支付', 'value_no': '0'},
    {'value_name': '已支付', 'value_no': '1'}
]

export const pay_type = [
    {'value_name': '现金支付','value_no': '0',},
    {'value_name': '微信支付','value_no': '1',},
    {'value_name': '支付宝支付','value_no': '2'},
    {'value_name': '银联支付','value_no': '3'},
    {'value_name': '其他支付','value_no': '4'}
]

export const orderState = [
    {'value_name': '正常', 'value_no': '0'},
    {'value_name': '已删除', 'value_no': '1'},
    {'value_name': '待审核', 'value_no': '2'}
]

export const useTypes = [
    {'value_name': '车牌识别','value_no': '0',},
    {'value_name': '刷卡','value_no': '1',},
    {'value_name': '手持POS机','value_no': '2'},
    {'value_name': '车牌识别+手持POS机','value_no': '20'}
]

export const parkTypes = [
    {'value_name': '地面', 'value_no': '0'},
    {'value_name': '地下', 'value_no': '1'},
    {'value_name': '地上/地下', 'value_no': '2'},
    {'value_name': '路边', 'value_no': '9'}
]

export const isSupport = [
    {'value_name': '不支持', 'value_no': '0'},
    {'value_name': '支持', 'value_no': '1'}
]

export const showOnMap = [
    {'value_name': '不显示', 'value_no': '0'},
    {'value_name': '显示', 'value_no': '1'}
]

export const operateType = [
    {'value_no': 0, 'value_name': '全部'},
    {'value_no': 1, 'value_name': '续费'},
    {'value_no': 2, 'value_name': '回收充值'}
]
export const ticketType = [
    {'value_name': '时长减免', 'value_no': '1'},
    {'value_name': '金额减免', 'value_no': '2'}
]
export const ticketQueryType = [
    {'value_no': 0, 'value_name': '全部'},
    {'value_no': 1, 'value_name': '时长减免'},
    {'value_no': 2, 'value_name': '金额减免'}
]

export const statType = [
    {'value_no': -1, 'value_name': '全部'},
    {'value_no': 0, 'value_name': '未使用'},
    {'value_no': 1, 'value_name': '已使用'},
    {'value_no': 2, 'value_name': '回收作废'}
]

export const channlManager = [
    {'value_name': '默认车场设置', 'value_no': '0'},
    {'value_name': '不限制', 'value_no': '1'},
    {'value_name': '禁止进入', 'value_no': '2'}
]

export const channlManagerType = [
    {'value_name': '出', 'value_no': '0'},
    {'value_name': '入', 'value_no': '1'},
    {'value_name': '出人', 'value_no': '2'}
]

export const net_status = [
    {'value_name': '异常', 'value_no': '0'},
    {'value_name': '正常', 'value_no': '1'}
]

export const monitorType = [
    {'value_name': '隐藏', 'value_no': '0'},
    {'value_name': '显示', 'value_no': '1'}
]

export const workStation = [
    {'value_no': 0, 'value_name': '流量'},
    {'value_no': 1, 'value_name': '宽带'}
]

export const payType = [
    {'value_no': 0, 'value_name': '现金'},
    {'value_no': 1, 'value_name': '电子支付'}
]
export const orderPayType = [
    //0:帐户支付,1:现金支付,2:手机支付 3:包月 4:现金预支付 5：银联卡(中央预支付，后面废弃) 6：商家卡(中央预支付，后面废弃) 8：免费放行 9：刷卡
    // {'value_name': '账户支付', 'value_no': 0},
    {'value_name': '无', 'value_no': -1},
    {'value_name': '现金支付', 'value_no': 1},
    {'value_name': '手机支付', 'value_no': 2},
    {'value_name': '包月', 'value_no': 3},
    // {'value_name': '现金预支付', 'value_no': 4,},
    // {'value_name': '银联卡支付', 'value_no': 5,},
    // {'value_name': '商家卡支付', 'value_no': 6,},
    {'value_name': '免费放行', 'value_no': 8,},
    // {'value_name': '刷卡', 'value_no': 9}
]
export const RoleFuncion = [
    {'value_no': 0, 'value_name': '无'},
    {'value_no': 1, 'value_name': '收费功能'},
    {'value_no': 2, 'value_name': '巡查功能'},
    {'value_no': 3, 'value_name': '开卡功能'}
    ,
]
//文字放前面，编辑的时候显示文字。否则显示编号
export const genderType = [
    {'value_name': '未设置', 'value_no': '-1',},
    {'value_name': '女', 'value_no': '0',},
    {'value_name': '男', 'value_no': '1',}
]
export const collectType = [
    {'value_name': '未设置', 'value_no': '-1'},
    {'value_name': '不可收费', 'value_no': '0'},
    {'value_name': '可收费', 'value_no': '1'}
]
export const blackStateType = [
    {'value_name': '正常', 'value_no': '0'},
    {'value_name': '漂白', 'value_no': '1'}
]
export const commuteStateType = [
    {'value_name': '已签到', 'value_no': '0'},
    {'value_name': '已签退', 'value_no': '1'}
]
export const singleDoubleType = [
    {'value_name': '不限制', 'value_no': '0'},
    {'value_name': '限制', 'value_no': '1'}
]
export const orderStateType = [
    {'value_name': '未结算', 'value_no': '0'},
    {'value_name': '已结算', 'value_no': '1'},
    // {'value_name': '逃单', 'value_no': '2'}
]
/**
 * 集团固定类型
 * @type {*[]}
 */
export const inparkType = [
    //进场方式
    {"value_name": "全部", "value_no": "-1"},
    {"value_name": "通道扫牌", "value_no": ""},
    {"value_name": "NFC刷卡", "value_no": "0"},
    {"value_name": "Ibeacon", "value_no": "1"},
    {"value_name": "手机扫牌", "value_no": "2"},
    {"value_name": "通道扫牌", "value_no": "3"},
    {"value_name": "直付", "value_no": "4"},
    {"value_name": "月卡", "value_no": "5"},
    {"value_name": "车位二维码", "value_no": "6"},
    {"value_name": "月卡第二辆车", "value_no": "7"}
]
export const parkType = [
    //车场类型
    {"value_name": "全部", "value_no": -1},
    {"value_name": "地面", "value_no": 0},
    {"value_name": "地下", "value_no": 1},
    {"value_name": "占道", "value_no": 2}
]

export var checkPhone = (rule, value, callback) => {
    if (typeof(value) == 'undefined' || value == '') {
        return callback(new Error('请输入正确的电话号码'))
    } else if (!((/^800[0-9]{7}$/.test(value)) || (/^400[0-9]{7}$/.test(value)) || (/^1[34578]\d{9}$/.test(value)) || (/^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})$/.test(value)))) {
        return callback(new Error('请输入手机,座机(区号后加-),或400,800开头号码'))
    } else {
        callback()
    }
}

export var checkMobile = (rule, value, callback) => {
    if (typeof(value) == 'undefined' || value == '') {
        return callback(new Error('请输入正确的手机号码'))
    } else if (!((/^1[34578]\d{9}$/.test(value)))) {
        return callback(new Error('请输入正确的手机号码'))
    } else {
        callback()
    }
}

export var checkURL = (rule, value, callback) => {
    if (typeof(value) == 'undefined' || value == '') {
        return callback(new Error('请输入地址'))
    } else if (!(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(value))) {
        return callback(new Error('请输入正确的地址'))
    } else {
        callback()
    }
}

export var checkUpload = (rule, value, callback) => {
    if (typeof(value) == 'undefined' || value == '') {
        return callback(new Error('请上传图片'))
    } else {
        return callback()
    }
}

export var checkNumber = (rule, value, callback) => {
    if (typeof(value) == 'undefined' || value == '') {
        return callback(new Error('请输入权重'))
    } else if (!(/^[0-9]{1,2}$/.test(value)) || value == 0) {
        return callback(new Error('权重值在1-99'))
    } else {
        callback()
    }
}

export var checkPass = (rule, value, callback) => {
    if (!(/^(\w){6,12}$/.test(value))) {
        return callback(new Error('密码为6-12位字母,数字或下划线'))
    } else {
        callback()
    }
}

export var checkCityInfo = (rule, value, callback) => {
    console.log("1111=>" + value)
    if (typeof(value) == 'undefined' || value == '') {
        return callback(new Error('请选择城市信息'))
    } else {
        callback()
    }
}

//export const distinctslist = () => { return axios.get('http://jarvisqh.vicp.io/cms-web/getdata/getdistinctlist') }
