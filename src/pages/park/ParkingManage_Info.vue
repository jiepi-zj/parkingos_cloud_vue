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
                :hideSearch="hideSearch"
                :hideAdd="hideAdd"
                :showEdit="showEdit"
                :showdelete="showdelete"
                ref="bolinkuniontable"
        ></common-table>

    </section>
</template>

<script>
    import {path,showOnMap,isSupport,parkTypes,useTypes,orderState} from '../../api/api';
    import util from '../../common/js/util'
    import common from '../../common/js/common'
    import CommonTable from '../../components/CommonTable'
    import {AUTH_ID} from "../../common/js/const";

    export default {
        components: {
            CommonTable      //表格
        },
        data() {
            return {
                loading: false,         //loading页面是否显示
                hideExport: true,       //隐藏导出
                hideSearch: false,      //隐藏查询
                //显示日期查询
                hideAdd: false,         //隐藏添加
                tableheight: '',        //表格高度
                showdelete: true,       //显示删除
                hideOptions: false,      //隐藏多选框
                //显示停车信息
                hideTool: false,        //隐藏工具栏
                showEdit:true,
                queryapi: '/ParkingManageInfo/query',    //数据请求路径
                addapi: '/ParkingManageInfo/add',
                editapi: '/ParkingManageInfo/edit',
                delapi: '/ParkingManageInfo/remove',
                btswidth: '100',                 //按钮宽度
                fieldsstr: 'id__park_name__park_code__park_address__longitude__latitude__mobile__' +
                            'park_manager__phone__park_type__use_type__total_lots__empty_lots__book__guide__' +
                            'epay__city_merchants_id__channel_id__group_id__company_id__charge_berth__state__' +
                            'default_prov__ismapview__wx_pub_id__wx_app_id__alipay_id__ukey__limit_time__resume',//请求数据的格式，在云平台的页面找接口和有关请求参数。
                tableitems: [                       //表格元素，表头
                    {
                        hasSubs: false,
                        subs: [{
                            label: '车场名称',          //页面表格显示
                            prop: 'park_name',             //对应表中字段
                            width: '100',           //列宽度
                            type: 'str',         //对应表中字段类型
                            editable: true,         //是否可编辑
                            searchable: true,       //是否可查询
                            addable: true,          //是否可添加
                            unsortable: true,       //是否可排序
                            align: 'center'         //页面表格内容显示位置
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '车场编号',
                            prop: 'id',
                            width: '100',
                            type: 'str',
                            editable: false,
                            searchable: true,
                            addable: false,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '车场地址',
                            prop: 'park_address',
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
                            label: '经度',
                            prop: 'longitude',
                            width: '70',
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
                            label: '纬度',
                            prop: 'latitude',
                            width: '70',
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
                            label: '手机号码',
                            prop: 'mobile',
                            width: '130',
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
                            label: '停车场联系人',
                            prop: 'park_manager',
                            width: '130',
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
                            label: '车场电话',
                            prop: 'phone',
                            width: '130',
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
                            label: '车场类型',
                            prop: 'park_type',
                            width: '100',
                            type: 'selection',
                            selectlist:parkTypes,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                                return common.nameformat(row,parkTypes,'park_type')
                            }
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '使用类型',
                            prop: 'use_type',
                            width: '100',
                            type: 'selection',
                            selectlist:useTypes,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                                return common.nameformat(row,useTypes,'use_type')
                            }
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '总车位数',
                            prop: 'total_lots',
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
                            label: '剩余车位数',
                            prop: 'empty_lots',
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
                            label: '支持预定',
                            prop: 'book',
                            width: '100',
                            type: 'selection',
                            selectlist:isSupport,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                                return common.nameformat(row,isSupport,'book')
                            }
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '室内引导',
                            prop: 'guide',
                            width: '100',
                            type: 'selection',
                            selectlist:isSupport,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                                return common.nameformat(row,isSupport,'book')
                            }
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '电子支付',
                            prop: 'epay',
                            width: '100',
                            type: 'selection',
                            selectlist:isSupport,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                                return common.nameformat(row,isSupport,'epay')
                            }
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '充电车位',
                            prop: 'charge_berth',
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
                            label: '默认省份',
                            prop: 'default_prov',
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
                            label: '是否在地图显示',
                            prop: 'ismapview',
                            width: '100',
                            type: 'selection',
                            selectlist:showOnMap,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                                return common.nameformat(row,showOnMap,'ismapview')
                            }
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: '渠道ID',
                            prop: 'channel_id',
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
                            label: '城市运营商ID',
                            prop: 'city_merchants_id',
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
                            label: '厂商ID',
                            prop: 'company_id',
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
                            label: '集团ID',
                            prop: 'group_id',
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
                            label: '微信公众号收款账号ID',
                            prop: 'wx_pub_id',
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
                            label: '微信app收款账号ID',
                            prop: 'wx_app_id',
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
                            label: '支付宝收款账号ID',
                            prop: 'alipay_id',
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
                            label: '状态',
                            prop: 'state',
                            width: '100',
                            type: 'selection',
                            selectlist:orderState,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                                return common.nameformat(row,orderState,'state')
                            }
                        }]
                    },{
                        hasSubs: false,
                        subs: [{
                            label: 'ukeyID',
                            prop: 'ukey',
                            width: '100',
                            type: 'number',
                            editable: false,
                            searchable: true,
                            addable: false,
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

                addtitle: '添加停车场',
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
                    if (AUTH_ID.parkingManage_info == item.auth_id) {
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
        },
        methods: {}
    }
</script>

<style scoped>

</style>