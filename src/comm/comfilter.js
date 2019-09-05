const myFilter={
    numFilter:function (value) {
        // 截取当前数据到小数点后两位
        let realVal = Number(value).toFixed(2)
        return realVal
    },
    fileType(val){
        switch(parseInt(val)){
          case 1:
            return "图文"
          case 2:
            return "视频"
        }
      },
      
    fileStatus(val){
        if(!val){
          return
        }
        switch(parseInt(val)){
          case 1:
            return "已审核通过"
          case 2:
            return "已审核拒绝"
          case 3:
            return "待审核"
        }
      },
    fileterIsRecommend(val){
      if(!val){
        return
      }
      switch(parseInt(val)){
        case 1:
          return "已推荐"
        case 2:
          return "不推荐"
      }
    },
    fileterYesOrNo(val){
      if(!val){
        return
      }
      switch(parseInt(val)){
        case 1:
          return "是"
        case 2:
          return "否"
      }
    }

}
   
export default myFilter  