/*
 * @Description:
 * @Author: liu yan
 * @Date: 2020-07-17 20:34:56
 * @LastEditTime: 2020-07-17 20:52:35
 */
import AdjoinMatrix from "./utils";
import { AdjoinType } from "./utils";


export default class SpecAdjoinMatrix extends AdjoinMatrix {
    specList: any
    specCombinationList: any

    constructor(specList: any, specCombinationList: any) {
        super(specList.reduce((total: AdjoinType, current: any) => [...total, ...current.list], []));
        this.specList = specList;
        this.specCombinationList = specCombinationList;
        // 根据可选规格列表矩阵创建
        this.initSpec();
        // 同级顶点创建
        this.initSameLevel();
    }

    /**
     * 根据可选规格组合填写邻接矩阵的值
     */
    initSpec() {
        this.specCombinationList.forEach((item: any) => {
            this.fillInSpec(item.specs);
        });
    }
    // 填写同级点
    initSameLevel() {
        // 获得初始所有可选项
        const specsOption = this.getCollection(this.vertex);
        this.specList.forEach((item: any) => {
            const params: AdjoinType = [];
            // 获取同级别顶点
            item.list.forEach((value: any) => {
                if (specsOption.includes(value)) params.push(value);
            });
            // 同级点位创建
            this.fillInSpec(params);
        });
    }
    /*
     * 传入顶点数组，查询出可选规格
     * @param params
     */
    getSpecscOptions(params: AdjoinType) {
        let specOptionCanchoose: AdjoinType = [];
        if (params.some(Boolean)) {
            // 过滤一下选项
            specOptionCanchoose = this.getUnions(params.filter(Boolean));
        } else {
            // 所有可选项
            specOptionCanchoose = this.getCollection(this.vertex);
        }
        return specOptionCanchoose;
    }

    /*
     * @params
     * 填写邻接矩阵的值
     */
    fillInSpec(params: AdjoinType) {
        params.forEach((param) => {
            this.setAdjoinVertexs(param, params);
        });
    }
}
