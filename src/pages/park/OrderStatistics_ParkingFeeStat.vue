<template>
    <section>
        <common-table
                :queryapi="queryapi"
                :tableheight="tableheight"
                :fieldsstr="fieldsstr"
                :tableitems="tableitems"
                :btswidth="btswidth"
                :hide-export="hideExport"
                :hide-options="hideOptions"
                :searchtitle="searchtitle"
                :showdateSelector="showdateSelector"
                :hideTool="hideTool"
                :hideSearch="hideSearch"
                :hideAdd="hideAdd"
                :hidePagination="hidePagination"
                ref="bolinkuniontable"
        ></common-table>

    </section>
</template>


<script>
    import {path} from '../../api/api';
    import common from '../../common/js/common'
    import CommonTable from '../../components/CommonTable'

    export default {
        components: {
            CommonTable
        },
        data() {
            return {
                loading: false,
                hideExport: true,
                hideSearch: true,
                showdateSelector: true,
                hideAdd: true,
                tableheight: '',
                hideOptions: true,
                hideTool: false,
                hidePagination:true,
                queryapi: '/ParkingFeeStatistics/query',
                workdetailapi: '',
                orderdetailapi: '',
                btswidth: '100',
                fieldsstr: 'id__operate__date__ordercount__receivable_amount__cash__wx_payment__alipay__' +
                            'union_pay__parkid__limit_time__resume',
                tableitems: [
                    {
                        hasSubs: false,
                        subs: [{
                            label: '操作员',
                            prop: 'operate',
                            width: '123',
                            type: 'str',
                            editable: false,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                        },]
                    }, {
                        hasSubs: false,
                        subs: [{
                                label: '日期',
                                prop: 'date',
                                width: '123',
                                type: 'date',
                                editable: false,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                hidden: true,
                                align: 'center',
                                format: function (row) {
                                    return common.dateformat(row.date);
                                }
                        },]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '订单数量',
                            prop: 'ordercount',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },{

                        hasSubs: false,
                        subs: [{
                            label: '应收金额',
                            prop: 'receivable_amount',
                            width: '123',
                            type: 'number',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {
                        label: '实收金额',
                        hasSubs: true,
                        subs: [
                            {
                                label: '现金支付',
                                prop: 'cash',
                                width: '123',
                                type: 'number',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'
                            }, {

                                hasSubs: false,

                                label: '微信支付',
                                prop: 'wx_payment',
                                width: '123',
                                type: 'number',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'

                            }, {

                                hasSubs: false,

                                label: '支付宝支付',
                                prop: 'alipay',
                                width: '123',
                                type: 'number',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'

                            }, {

                                hasSubs: false,

                                label: '银联支付',
                                prop: 'union_pay',
                                width: '123',
                                type: 'number',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'

                            }, {
                                hasSubs: false,
                                label: '合计',
                                prop: 'actTotal',
                                width: '123',
                                type: 'number',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center'
                            }]
                    }, /*{

                        hasSubs: false,
                        subs: [{
                            label: '车场ID',
                            prop: 'parkid',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }*/
                ],
                searchtitle: '高级查询',

                datesselector: '',

                /*currentPage: 1,
                pageSize: 20,
                total: 0,
                orderby: 'desc',
                orderfield: 'id',*/
                table: [],
                sform: {},
                showWorkDetail: false,
                showOrderDetail: false,
                currentRow: '',
            }
        },
        methods: {},
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            }
            this.tableheight = common.gwh() - 143;
            // var user = sessionStorage.getItem('user');
            // this.user = user
            // if (user) {
            //     user = JSON.parse(user);
            //     for (var item of user.authlist) {
            //         if (AUTH_ID.showOrderStatistics_DailyReport_auth_id == item.auth_id) {
            //             console.log(item.sub_auth)
            //             break;
            //         }
            //     }
            //
            // }
        },
        activated() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            }
            this.tableheight = common.gwh() - 143;
            this.$refs['bolinkuniontable'].$refs['search'].resetSearch()
            this.$refs['bolinkuniontable'].getTableData({date:'',out_uid:''})
            // this.getTableData(this.sform);
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>

