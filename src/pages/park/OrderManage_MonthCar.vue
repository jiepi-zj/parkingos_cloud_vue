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
                :showRefillInfo="showRefillInfo"
                :hideTool="hideTool"
                :exportapi="exportapi"
                :hideSearch="hideSearch"
                :hideAdd="hideAdd"
                :showEdit="showEdit"
                :showdelete="showdelete"
                ref="bolinkuniontable"
        ></common-table>

    </section>
</template>

<script>

    import {path, checkURL, checkUpload, checkNumber,pay_type} from '../../api/api';
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
                hideExport: false,       //隐藏导出
                hideSearch: false,      //隐藏查询
                //显示日期查询
                hideAdd: true,         //隐藏添加
                tableheight: '',        //表格高度
                showdelete: true,       //显示删除
                hideOptions: true,      //隐藏多选框
                showRefillInfo:true,
                //显示停车信息
                hideTool: false,        //隐藏工具栏
                showEdit:true,
                currentIndex: 0,
                currentRow: '',
                queryapi: '/OrderManageMonthCar/query',    //数据请求路径
                addapi: '/OrderManageMonthCar/add',
                editapi: '/OrderManageMonthCar/edit',
                delapi: '/OrderManageMonthCar/remove',
                exportapi: '/OrderManageMonthCar/exportExcel',
                btswidth: '100',                 //按钮宽度
                fieldsstr: 'id__local_id__order_id__vehicle_no__card_no__cardtype__username__charge_time__begtime__' +
                            'endtime__operate__receivable_amount__total__reduce_amount__remark__pay_type__parkid__' +
                            'limit_time__resume',//请求数据的格式，在云平台的页面找接口和有关请求参数。
                tableitems: [                       //表格元素，表头
                    {
                        hasSubs: false,
                        subs: [{
                            label: '用户姓名',
                            prop: 'username',
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
                            label: '缴费订单号',          //页面表格显示
                            prop: 'order_id',             //对应表中字段
                            width: '160',           //列宽度
                            type: 'str',         //对应表中字段类型
                            editable: true,         //是否可编辑
                            searchable: true,       //是否可查询
                            addable: true,          //是否可添加
                            unsortable: true,       //是否可排序
                            align: 'center'         //页面表格内容显示位置
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
                            label: '车辆类型',
                            prop: 'cardtype',
                            width: '100',
                            type: 'str',
                            //selectlist:this.cardtype,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            /*format:function(row){
                                return common.nameformat(row,this.cardtype,'cardtype')
                            }*/
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
                            label: '延期时间',
                            prop: 'charge_time',
                            width: '160',
                            type: 'date',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.dateformat(row.charge_time);
                            }
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '有效起日',
                            prop: 'begtime',
                            width: '160',
                            type: 'date',
                            editable: true,
                            searchable: true,
                            addable: true,
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
                            editable: true,
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
                            label: '应收金额',
                            prop: 'receivable_amount',
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
                            label: '实收金额',
                            prop: 'total',
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
                            label: '减免金额',
                            prop: 'reduce_amount',
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
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '车场ID',
                            prop: 'parkid',
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
                            label: '操作员',
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
                            label: '支付类型',
                            prop: 'pay_type',
                            width: '100',
                            type: 'selection',
                            selectlist:pay_type,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                                return common.nameformat(row,pay_type,'pay_type')
                            }
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '备注',
                            prop: 'remark',
                            width: '100',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
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

                addtitle: '添加延期订单',
                com_operate:[],
            }
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
                    if (AUTH_ID.orderManage_MonthCar == item.auth_id) {
                        // console.log(item.sub_auth)
                        this.hideSearch= !common.showSubSearch(item.sub_auth)
                        this.hideAdd= !common.showSubAdd(item.sub_auth)
                        this.showEdit= common.showSubEdit(item.sub_auth)
                        this.showdelete= common.showSubDel(item.sub_auth)
                        if(this.showEdit==false&&this.showdelete==false){
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
            axios.all([common.getCollector()])
                .then(axios.spread(function (ret) {
                    if(ret.data.length>0){
                        _this.com_operate = ret.data
                    }
                    //console.log(JSON.stringify(ret.data))
                }))
        },
        /*watch: {
            card_Type: function (val) {
                this.tableitems[4].subs[0].selectlist = val
            },

        },*/
        methods: {}
    }
</script>

<style scoped>
    .gutter {
        display: none
    }
</style>