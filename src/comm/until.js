import CryptoJS from 'crypto-js'

function getAesString(data, key, iv) {
  let Aeskey = CryptoJS.enc.Utf8.parse(key);
  let Aesiv = CryptoJS.enc.Utf8.parse(iv);
  let encrypted = CryptoJS.AES.encrypt(data, Aeskey, {
    iv: Aesiv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString(); //返回的是base64格式的密文
}

function getDAesString(encrypted, key, iv) {
  let Aeskey = CryptoJS.enc.Utf8.parse(key);
  let Aesiv = CryptoJS.enc.Utf8.parse(iv);
  let decrypted = CryptoJS.AES.decrypt(encrypted, Aeskey, {
    iv: Aesiv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
/**
 * CryptoJS加密
 */
let getAES = function(data) { //加密
  let key = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; //密钥
  let iv = '1234567812345678';
  let encrypted = getAesString(data, key, iv); //密文
  let encrypted1 = CryptoJS.enc.Utf8.parse(encrypted);
  return encrypted;
}

/**
 * CryptoJS解密
 */
let getDAes = function(data) { //解密
  let key = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; //密钥
  let iv = '1234567812345678';
  let decryptedStr = getDAesString(data, key, iv);
  return decryptedStr;
}

/**
 * 存储localStorage
 */
let setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
let getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
let removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

/*
  获取url上参数
*/

let getUrlParams = function(name) {
  let reg = new RegExp(name + "=([^&]*)");
  let r = window.location.href.match(reg);
  if (r != null) return unescape(r[1]);
  return null;
}
import axios from "axios"
import { Message,Loading} from "element-ui";
/*
  参数为fromdata型的axios封装
*/
let axiosFromData = function (obj){
    return new Promise((resolve,reject)=>{ //promise重新封装一个fromData格式的请求
        axios({
            url:obj.url,
            method:obj.method || "get",
            data:obj.data,
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: {
                'Content-Type': 'application/json',//'application/x-www-form-urlencoded',
                // "token":window.sessionStorage.getItem("token")
            }
        }).then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        })
    })
}

/**
 * axios的post请求
 */
let loading

function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
      target:document.querySelector("#searchBar"),
      lock: true,
      text: '加载中……',
      background: 'rgba(255, 255, 255, 0.7)'
  })
}
function endLoading() {    //使用Element loading-close 方法
  loading.close()
}

let needLoadingRequestCount = 0
function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}

let sendRequest = function(url,payload,method){
  axios.interceptors.request.use((config)=>{
      // 在发送请求之前做些什么
      showFullScreenLoading();
      return config;
  }, function (err) {
      // 对请求错误做些什么
      console.log("错误!!!!")
      console.log(err)
      Message.error("请求错误");
      return
  });
  
  // console.log(JSON.parse(window.localStorage.getItem("userInfo")).token)
  return new Promise((res,rej)=>{
    axios({
      method: method,
      url: url,
      data:payload,
      
      // headers:{'Content-Type': 'application/json'}
      headers: {"token":window.localStorage.getItem("userInfo")?JSON.parse(window.localStorage.getItem("userInfo")).token:''},
    }).then(data=>{
      endLoading()
      if(data.data.status !=200){
        Message.error(data.data.message)
        if(data.data.status =='403'){
          window.location.href='/'
        }
        return;
      }
      res(data)
    }).catch(err=>{
      endLoading()
      rej(err)
    })
 })
};


//公共的弹层提示
let  myConfirm = function(_this,txt,fn) {
  _this.$confirm(txt, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
  })
  .then((val) => {
      fn(val)
  })
  .catch((err) => {
    console.log(err)
    _this.$message({
      type: "info",
      message: "已取消操作"
  });
  });
}

import { sidebarConfig} from '../config/objConfig.js';
let menuSetData=function(data){
    let fisteMenu=[],
    twoMenu=[],
    threeMenu=[],
    allMenu=[]
    if(data && data.length>0){
      data.map((val,index)=>{
        // val.menuUrl =val.menuId
        if(val.parentMenuId ==''){
          val.parentMenuId ='1'
        }
        if(!val.menuUrl){
          val.menuUrl = val.menuId
        }
        if(val.nodeLv == 1){
          allMenu.push(val);
        };
        if(val.nodeLv == 2){
            twoMenu.push(val)
        };
        if(val.nodeLv == 3){
          threeMenu.push(val)
        }
    })
      
    }else{
      alert("无权限！")
      return
      // this.$message.warning("该账号无权限")
    }
    allMenu.map((cv,inx)=>{
      allMenu[inx].children=[];
      twoMenu.map((nv,ix)=>{
        if(cv.menuId == nv.parentMenuId){
              nv.children=[];
            allMenu[inx].children.push(nv)
              threeMenu.map((ccv,ccinx)=>{
                if(ccv.parentMenuId == nv.menuId){
                    nv.children.push(ccv)
                }
              })
        }
      });
    })
    return allMenu
};
let gdsTreeData =function(data){
  let fisteMenu=[],
  twoMenu=[],
  threeMenu=[],
  treeData=[]
  if(data && data.length>0){
    data.map((val,index)=>{
      if(val.nodeLv == 1){
        treeData.push(val);
      };
      if(val.nodeLv == 2){
          twoMenu.push(val)
      };
      if(val.nodeLv == 3){
        threeMenu.push(val)
      }
  })
  }else{
    alert("无权限！")
    return
    // this.$message.warning("该账号无权限")
  }
  treeData.map((cv,inx)=>{
    treeData[inx].children=[];
    twoMenu.map((nv,ix)=>{
      if(cv.skuTypeNo == nv.parSkuTypeNo){
            nv.children=[];
            treeData[inx].children.push(nv)
            threeMenu.map((ccv,ccinx)=>{
              if(ccv.parSkuTypeNo == nv.skuTypeNo){
                  nv.children.push(ccv)
              }
            })
      }
    });
  })
  return treeData
}

// let translateDataToTree =function (data) {
//   let parents = data.filter(value => value.nodeLv == '1' || !value.parSkuTypeNo)
//   let children = data.filter(value => value.nodeLv !== '1' && value.parSkuTypeNo)
//   let mypars=[]
//   let oldCurrent={};
// //  data.filter(val=>{console.log(val)})
//   let translator = (parents, children) => {
//     parents.forEach((parent) => {
//       children.forEach((current, index) => {
//         if (current.parSkuTypeNo == parent.skuTypeNo) {
//           // console.log(children)
//           let temp = JSON.parse(JSON.stringify(children))
//            temp.splice(index, 1);
//            console.log(children)
//           // translator([current], temp)
//           // typeof parent.children !== 'undefined' ? parent.children.push(current) : parent.children = [current]
//           // parent.children = [current]
//           typeof parent.children !== 'undefined' && parent.children.nodeLv !== '4' ? parent.children.push(current) : parent.children = [current]
//           // return;
//         }
//       })
//     })
//   }
 
//   translator(parents, children)
//   // console.log(parents)
//   return parents
// }

let translateDataToTree = function (list,obj){
  let temp = {};
  let tree = [];
  if(Object.keys(obj).length<1){
    console.log("树状数据没有配置")
    return;
  }
  // console.log(list.length)
  if(!list || list.length<1){
    console.log("无树状数据")
    return;
  }
  let id= obj.id;
  let parId = obj.parId
  for(let i in list){
      temp[list[i][id]] = list[i];//skuTypeNo
  }
  for(let i in temp){
    
    // console.log(parId)
      if(temp[i][parId]) {//parSkuTypeNo
          if(!temp[temp[i][parId]].children) {
              temp[temp[i][parId]].children = [];
          }
          temp[temp[i][parId]].children.push(temp[i]);
      } else {
          tree.push(temp[i]);
      }
  }
  return tree;
}

let transAeaTree=function(data){
   data.forEach(function (item) {
        delete item.children;
    });

    // 将数据存储为以 id 为 KEY 的 map 索引数据列
    var map = {};
    data.forEach(function (item) {
      item.Children = []   // 看情况加这一步
      map[item.codeValueCpltId] = item;
    });
    //console.log(map);
    var DataInfo = [];
    data.forEach(function (item) {
        //如果需要对特定字段进行处理，那么这里做对应处理，会存在一定数据冗余
        //item.label = item.name;
        // 以当前遍历项，的pid,去map对象中找到索引的id
        var parent = map[item.parCodeValCpltId];
        // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
            (parent.children || ( parent.children = [] )).push(item);
              parent.Children.push(item)  //看情况要这一步，不要上一步
        } else {
            //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            
            DataInfo.push(item);
        }
    });
    return DataInfo;
}

import moment from 'moment'
let getNowDate =function(){
  return moment(new Date()).add('year',0).format("YYYY-MM-DD HH:mm:ss")
}
export{
  getAES,
  getDAes,
  setStore,
  getStore,
  removeStore,
  getUrlParams,
  axiosFromData,
  sendRequest,
  myConfirm,
  menuSetData,
  gdsTreeData,
  getNowDate,
  translateDataToTree,
  transAeaTree
}
