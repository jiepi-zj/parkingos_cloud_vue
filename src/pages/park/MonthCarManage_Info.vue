<template>
    <section>
        <common-table
                :queryapi="queryapi"
                :addapi="addapi"
                :editapi="editapi"
                :delapi="delapi"
                :tableheight="tableheight"
                :fieldsstr="fieldsstr"
                :tableitems="tableitems"
                :btswidth="btswidth"
                :hide-export="hideExport"
                :hide-options="hideOptions"
                :addtitle="addtitle"
                :hideTool="hideTool"
                :showmRefill="showmRefill"
                :hideSearch="hideSearch"
                :hideAdd="hideAdd"
                :showEdit="showEdit"
                :showdelete="showdelete"
                v-on:showreset="showreset"
                v-on:showrefill="showrefill"
                ref="bolinkuniontable"
        ></common-table>
        <el-dialog
                title="月卡延期"
                :visible.sync="showRefill"
                width="30%">
            <el-form ref="refillForm" label-width="120px" style="margin-bottom:-30px" :rules="refillFormRules"
                     :model="refillForm">
                <!--<el-form-item label="缴费订单号" :prop="order_id">
                    <el-input v-model="refillForm.order_id" style="width:90%" placeholder=""></el-input>
                </el-form-item>-->
                <!--<el-form-item label="延期时间" :prop="charge_time">
                    <el-date-picker v-model="refillForm.charge_time" type="date" placeholder="选择日期时间" style="width: 90%"></el-date-picker>
                </el-form-item>
                <el-form-item label="有效起日" :prop="begtime">
                    <el-date-picker v-model="refillForm.begtime" type="date" placeholder="选择日期时间" style="width: 90%"></el-date-picker>
                </el-form-item>-->
                <el-form-item label="延期月数" :prop="months">
                    <el-select v-model="refillForm.months" @change="getRefillTotal" style="width:90%">
                        <el-option
                                v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12]"
                                :label="item"
                                :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="车辆类型" :prop="cardtype">
                    <el-input v-model="refillForm.cardtype" style="width:90%" placeholder=""></el-input>
                    <el-select v-model="refillForm.card_Type" @change="getRefillTotal" filterable  style="width:90%">
                        <el-option
                                v-for="item in card_Type"
                                :label="item.value_name"
                                :value="item.value_no"
                        >
                        </el-option>
                    </el-select>
               </el-form-item>-->
                <el-form-item label="应收金额" :prop="receivable_amount">
                    <el-input v-model="refillForm.receivable_amount" style="width:90%" placeholder="" :readonly="datereadonly"></el-input>
                </el-form-item>
                <el-form-item label="实收金额" :prop="total">
                    <el-input v-model="refillForm.total" style="width:90%" placeholder="" ></el-input>
                </el-form-item>
                <!--<el-form-item label="减免金额" :prop="reduce_amount">
                    <el-input v-model="refillForm.userreduce_amountname" style="width:90%" placeholder=""></el-input>
                </el-form-item>-->
                <!--<el-form-item label="支付类型" :prop="pay_type">
                    <el-select v-model="refillForm.pay_type" filterable style="width:90%">
                        <el-option
                                v-for="item in payTypeChoose"
                                :label="item.value_name"
                                :value="item.value_no"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>-->
                <!--<el-form-item label="操作员" :prop="operate">
                    <el-input v-model="refillForm.operate" style="width:90%" placeholder=""></el-input>
                </el-form-item>-->
                <el-form-item label="备注" :prop="remark">
                    <el-input v-model="refillForm.remark" style="width:90%" placeholder=""></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
				<el-button @click="showRefill = false" size="small">取 消</el-button>
				<el-button type="primary" size="small" @click="handleRefill" :loading="resetloading">确 定</el-button>
			</span>
        </el-dialog>
    </section>
</template>

<script>

    import {path,carState} from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import CommonTable from '../../components/CommonTable'
    import {AUTH_ID} from "../../common/js/const"
    import axios from 'axios'

    export default {
        components: {       //组件加载
            CommonTable      //表格
        },
        data() {
            return {
                loading: false,         //loading页面是否显示
                resetloading: false,
                hideExport: true,       //隐藏导出
                hideSearch: false,      //隐藏查询
                //显示日期查询
                hideAdd: false,         //隐藏添加
                tableheight: '',        //表格高度
                showdelete: true,       //显示删除
                hideOptions: false,      //隐藏多选框
                showmRefill: true,
                hideTool: false,        //隐藏工具栏
                showEdit:true,
                currentIndex: 0,
                currentRow: '',
                queryapi: '/MonthCarManageInfo/query',    //数据请求路径
                addapi: '/MonthCarManageInfo/add',
                editapi: '/MonthCarManageInfo/edit',
                delapi: '/MonthCarManageInfo/remove',
                showRefill: false,
                btswidth: '150',
                fieldsstr: 'id__local_id__uid__user_no__user_name__vehicle_no__card_no__telephone__cartype__cartypename__' +
                           'begtime__endtime__deposit__account_money__operate__createtime__state__parkid__limit_time__resume',//请求数据的格式，在云平台的页面找接口和有关请求参数。
                tableitems: [                       //表格元素，表头
                    {
                        hasSubs: false,
                        subs: [{
                            label: '人员姓名',
                            prop: 'user_name',
                            width: '100',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '车牌号码',
                            prop: 'vehicle_no',
                            width: '100',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '卡片号码',
                            prop: 'card_no',
                            width: '100',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '手机号码',
                            prop: 'telephone',
                            width: '110',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '车辆类型（代码）',
                            prop: 'cartype',
                            width: '100',
                            type: 'selection',
                            selectlist:this.card_Type,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: (row) => {
                                return common.nameformat(row, this.card_Type, 'cartype')
                            }
                        }]
                    }, {
                        hasSubs: false,
                        subs: [{
                            label: '车辆类型名称',
                            prop: 'cartypename',
                            width: '110',
                            type: 'selection',
                            selectlist:this.card_Name,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: (row) => {
                                return common.nameformat(row, this.card_Name, 'cartypename')
                            }
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '发行时间',
                            prop: 'createtime',
                            width: '160',
                            type: 'date',
                            editable: false,
                            searchable: true,
                            addable: false,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.dateformat(row.createtime);
                            }
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '有效起日',
                            prop: 'begtime',
                            width: '160',
                            type: 'date',
                            editable: false,
                            searchable: true,
                            addable: false,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.dateformat(row.begtime);
                            }
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '有效止日',
                            prop: 'endtime',
                            width: '160',
                            type: 'date',
                            editable: false,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.dateformat(row.endtime);
                            }
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '押金',
                            prop: 'deposit',
                            width: '100',
                            type: 'number',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '余额',
                            prop: 'account_money',
                            width: '100',
                            type: 'number',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {
                        hasSubs: false,
                        subs: [{
                            label: '本地车场ID',
                            prop: 'local_id',
                            width: '100',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '人事信息ID',
                            prop: 'uid',
                            width: '100',
                            type: 'number',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {
                        hasSubs: false,
                        subs: [{
                            label: '支付订单号',
                            prop: 'user_no',
                            width: '150',
                            type: 'str',
                            editable: false,
                            searchable: true,
                            addable: false,
                            unsortable: true,
                            align: 'center'
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '发行操作员',
                            prop: 'operate',
                            width: '100',
                            type: 'selection',
                            selectlist:this.com_operate,
                            editable: false,
                            searchable: true,
                            addable: false,
                            unsortable: true,
                            align: 'center',
                            format:(row) => {
                                return common.nameformat(row,this.com_operate,'operate')
                            }
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '车辆状态',
                            prop: 'state',
                            width: '100',
                            type: 'selection',
                            selectlist:carState,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                                return common.nameformat(row,carState,'state')
                            }
                        }]
                    },/*{

                        hasSubs: false,
                        subs: [{
                            label: '网络类型',
                            prop: 'net_type',
                            width: '150',
                            type: 'selection',
                            selectlist:workStation,//流量、宽带
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                                return common.nameformat(row,workStation,'net_type')
                            }
                        }]
                    },*/
                ],

                addtitle: '注册会员',
                card_Type:[],
                card_Name:[],
                com_operate:[],
                readonly: true,
                datereadonly:true,
                refillForm: {
                    newEndTime:'',
                    ptmonthcarID:'',
                    months:'',
                    local_id:'',
                    order_id:'',
                    vehicle_no:'',
                    card_no:'',
                    cardtype:'',
                    userreduce_amountname:'',
                    username:'',
                    charge_time:'',
                    begtime:'',
                    endtime:'',
                    operate:'',
                    receivable_amount:'',
                    total:'',
                    reduce_amount:'',
                    remark:'',
                    pay_type:'',
                    parkid:'',
                },
                newEndTime:'newEndTime',
                ptmonthcarID:'ptmonthcarID',
                months:'month',
                local_id:'local_id',
                order_id:'order_id',
                vehicle_no:'vehicle_no',
                card_no:'card_no',
                cardtype:'cardtype',
                user_name:'user_name',
                charge_time:'charge_time',
                userreduce_amountname:'userreduce_amountname',
                begtime:'begtime',
                endtime:'endtime',
                receivable_amount:'receivable_amount',
                total:'total',
                reduce_amount:'reduce_amount',
                remark:'remark',
                pay_type:'pay_type',
                parkid:'parkid',
                operate:'operate',
                payTypeChoose:[
                    {'value_name': '现金', 'value_no': 0},
                    {'value_name': '微信', 'value_no': 1},
                    {'value_name': '支付宝', 'value_no': 2},
                    {'value_name': '银联', 'value_no': 3}
                ],
                refillFormRules: {
                    months: [
                        {required: true, message: '延期月数不能为空', trigger: 'blur'}
                    ],
                    receivable_amount: [
                        {required: true, message: '应收金额不能为空', trigger: 'blur'}
                    ],
                    total: [
                        {required: true, message: '实收金额不能为空', trigger: 'blur'}
                    ],
                    /*charge_time: [
                        {required: true, message: '请选择延期日期', trigger: 'change', type: 'date'}
                    ],
                    begtime: [
                        {required: true, message: '请选择开始日期', trigger: 'change', type: 'date'}
                    ],
                    endtime: [
                        {required: true, message: '请选择结束日期', trigger: 'change', type: 'date'}
                    ],*/
                },

            }
        },
        methods: {
            showreset: function (index, row) {
                this.currentIndex = index;
                this.currentRow = row;
                this.showResetCarnumber = true;
            },
            getRefillTotal: function () {
                this.readonly = false;
                /*for (let item of this.card_Type) {
                    // console.log(this.refillForm.p_name+'  '+item.value_name)
                    if (this.refillForm.cardtype == item.value_name || this.refillForm.cardtype == item.value_no) {
                        this.refillForm.cardtype = item.value_no;
                        this.readonly = true;
                        break;
                    }
                }*/
                if (this.refillForm.months == '')
                    return;
                let _this = this;
                axios.all([common.getRenewFeeSum(this.refillForm.cardtype, this.refillForm.months,this.refillForm.endtime)])
                    .then(axios.spread(function (ret) {
                        _this.refillForm.newEndTime = ret.data[0].renewOverTime + '';
                        _this.refillForm.receivable_amount = ret.data[0].total + '';
                        _this.refillForm.total = ret.data[0].total + '';
                    }))
            },
            showrefill: function (index, row) {
                this.currentIndex = index;
                this.currentRow = row;
                this.showRefill = true;
                let now = new Date().getTime();
                let ptmonthcar_id = row.id;
                let card_type = row.cartype;
                let end_time = row.endtime;
                let card_no = row.card_no;
                let vehicle_no = row.vehicle_no;
                let user_name = row.user_name;
//                let _operate = row.operate;
//                this.refillForm.operate = _operate;
                this.refillForm.ptmonthcarID = ptmonthcar_id;
                this.refillForm.endtime = end_time;
                this.refillForm.cardtype = card_type;
                this.refillForm.card_no = card_no;
                this.refillForm.vehicle_no = vehicle_no;
                this.refillForm.username = user_name;
                this.refillForm.remark = '云平台续费';
                if (now / 1000 > end_time) {
                    this.refillstartDate = (now / 1000)
                } else {
                    this.refillstartDate = common.dateformat(end_time)
                }
                /*for (let item of this.pname) {
                    if (row.pid == item.value_no) {
                        this.refillForm.p_name = item.value_name;
                        this.readonly = true;
                        return;
                    }
                }*/
                //如果当前套餐在套餐列表中，则应收是readonly
                //当前套餐不存在，则应收可以自由填写
                this.readonly = false;

            },
            handleRefill: function () {

                let _this = this
                this.$refs.refillForm.validate((valid) => {
                    if (valid) {
                        _this.resetloading = true;
                        axios.all([common.reNewDeny( encodeURI(encodeURI(_this.refillForm.vehicle_no)),
                                                    _this.refillForm.card_no,
                                                    _this.refillForm.cardtype,
                                                    encodeURI(encodeURI(_this.refillForm.username)),
                                                    new Date(_this.refillForm.newEndTime).getTime()/1000,
                                                    encodeURI(encodeURI(sessionStorage.getItem('loginuin'))),
                                                    _this.refillForm.receivable_amount,
                                                    _this.refillForm.total,
                                                    _this.refillForm.reduce_amount,
                                                    encodeURI(encodeURI(_this.refillForm.remark)),
                                                    _this.refillForm.pay_type,)],
                            [common.insertEndTime(new Date(_this.refillForm.newEndTime).getTime()/1000,this.refillForm.ptmonthcarID)])
                            .then(axios.spread(function (response) {
                                let ret = response.data;

                                if (ret > 0 || ret === "1") {
                                    _this.$refs['bolinkuniontable'].getTableData({})
                                    _this.$message({
                                        message: '续费成功!',
                                        type: 'success',
                                        duration: 600
                                    });
                                    _this.showRefill = false;
                                    _this.$refs['refillForm'].resetFields()
                                    _this.refillForm.months = ''
                                } else {
                                    //更新失败
                                    _this.$message({
                                        message: data.msg + '!',
                                        type: 'error',
                                        duration: 600
                                    });
                                }
                                _this.resetloading = false
                            })).catch(function (error) {
                            _this.resetloading = false;
                        })
                    }
                })
            },
        },
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            };
            this.tableheight = common.gwh() - 143;
            var user = sessionStorage.getItem('user');
            this.user = user
            if (user) {
                user = JSON.parse(user);
                console.log(user.authlist.length)
                for (var item of user.authlist) {
                    if (AUTH_ID.monthCarManage_Info == item.auth_id) {
                        // console.log(item.sub_auth)
                        this.hideSearch= !common.showSubSearch(item.sub_auth)
                        this.hideAdd= !common.showSubAdd(item.sub_auth)
                        this.showmRefill = common.showSubReFill(item.sub_auth)
                        this.showEdit= common.showSubEdit(item.sub_auth)
                        this.showdelete= common.showSubDel(item.sub_auth)
                        if(this.showEdit==false&&this.showdelete==false&&this.showmRefill==false){
                            this.hideOptions= true
                        }
                        break;
                    }
                }

            }
        },
        activated() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            };
            this.tableheight = common.gwh() - 143;
            this.$refs['bolinkuniontable'].$refs['search'].resetSearch();
            this.$refs['bolinkuniontable'].getTableData({})
            let _this = this
            let carType = []
            let carName = []
            axios.all([common.getCardType(),common.getCollector()])
                .then(axios.spread(function (ret,operate) {
                    if(ret.data.length>0){
                        for(var c = 0;c <= ((ret.data.length/2)-1);c++){
                            carType[c] = ret.data[2*c]
                            carName[c] = ret.data[1+2*c]
                        }
                        _this.card_Type = carType
                        _this.card_Name = carName
                    }
                    if(operate.data.length>0){
                        _this.com_operate = operate.data
                    }
                }))
        },
        watch: {
            card_Type: function (val) {
                this.tableitems[4].subs[0].selectlist = val
            },
            card_Name: function (val) {
                this.tableitems[5].subs[0].selectlist = val
            },
        },
    }
</script>

<style scoped>
    .gutter {
        display: none
    }
</style>