//体力活动水平枚举
interface DAMNU_ENABLE {
    [key: string]: string, // 字段扩展声明
}; 
export const PhysicalLevelEnum: DAMNU_ENABLE = {
    '-2':'严重不足',
    '-1':'不足',
    '1' :'满足',
};
// 运动风险等级枚举
export const SportsRiskRatingEnum: DAMNU_ENABLE = {
    '-1':'低',
    '0' :'中',
    '1' :'高',
};
// 健康筛查结果枚举
export const HealthResultEnum: DAMNU_ENABLE = {
    '1' :'健康（无运动系统、神经系统相关疾病病史；精神状态正常、无心理精神疾患；近6个月内无受伤史）',
    '0' :'其他',
    '-2':'体质较弱（无心血管、代谢疾病及运动禁忌症等)',
    '-1':'健康（无心血管、代谢疾病及运动禁忌症等',
};
//体制检测结果    
export const PhysiqueTestResEnum: DAMNU_ENABLE = {
    '1':'正常',
    '2':'超重',
    '3':'肥胖',
};
//6-8岁
export const PromotionProjectv1 = ['体质水平','素质拓展','有氧操','精细动作能力'];
//9-12
export const PromotionProjectv2 = ['核心肌力','心肺机能','足球运动','定向运动','篮球运动技能和体质健康'];


export const AuthorityEnum: DAMNU_ENABLE = {
    "user":"用户管理",
    "template":"模板管理",
    "case":"处方管理"
};

    
    