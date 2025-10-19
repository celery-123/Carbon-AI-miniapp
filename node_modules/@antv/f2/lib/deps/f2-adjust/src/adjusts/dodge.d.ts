import { Data, DodgeCfg } from '../interface';
import Adjust from './adjust';
export default class Dodge extends Adjust {
    private cacheMap;
    private adjustDataArray;
    private mergeData;
    private rangeMap;
    constructor(cfg: DodgeCfg);
    process(groupDataArray: Data[][]): Data[][];
    /**
     * 获取指定数据记录在指定字段上的位置信息
     * @param record 数据记录，例如 { city: 'Berlin', month: 1, rainfall: 23.2 }
     * @param field 字段名称，例如 'month'
     * @param value 字段值，例如 1
     * @returns 调整后的位置
     */
    getPositionInfo(record: Data, dim: string, frameIndexKey: number): Data;
    protected adjustDim(dim: string, values: number[], data: Data[], frameIndex: number): any[];
    private getDodgeOffset;
    private getIntervalOnlyOffset;
    private getDodgeOnlyOffset;
    private getIntervalAndDodgeOffset;
    private getDistribution;
}
