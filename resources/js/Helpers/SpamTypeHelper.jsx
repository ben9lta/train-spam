/**
 * @type {{OTHER: number, AD: number, getValues: (function(): [number,number,number,number,number]), HAM: number, getList: (function(): {OTHER: SpamTypeHelper.OTHER|number, AD: SpamTypeHelper.AD|number, HAM: SpamTypeHelper.HAM|number, COMMON: SpamTypeHelper.COMMON|number, SPAM: SpamTypeHelper.SPAM|number}), COMMON: number, translate: ((function(*): (string))|*), SPAM: number}}
 */
export const SpamTypeHelper = {
    COMMON: -1,
    HAM: 0,
    SPAM: 1,
    AD: 2,
    OTHER: 3,

    translate: function(type) {
        switch (type) {
            case this.COMMON: return 'Общий';
            case this.HAM: return 'Не спам';
            case this.SPAM: return 'Спам';
            case this.AD: return 'Рекламный';
            case this.OTHER: return 'Другой';
            default: return 'Не определено';
        }
    },
    getList: function() {
        return {
            COMMON: this.COMMON,
            HAM: this.HAM,
            SPAM: this.SPAM,
            AD: this.AD,
            OTHER: this.OTHER,
        }
    },
    getValues: function () {return (Object.values(this.getList()))},
    getKeys: function() {return (Object.keys(this.getList()))},
}
