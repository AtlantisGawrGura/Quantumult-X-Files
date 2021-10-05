/*

脚本按照参考项目的实现原理进行自制，部分项目按照个人对解锁过程规律的发现，如有失效，深感抱歉
测试项目：Netflix、YouTube会员、B站港澳台、动画疯、HuluJP、HBO Max、迪士尼+、niconico、KKTV、TVB Anywhere

参考链接
https://github.com/lmc999/RegionRestrictionCheck
https://github.com/KOP-XIAO/QuantumultX/tree/master/Scripts



                                                      噶呜古拉
                                                      英国海外领地 直布罗陀
                                                      2021-10

*/ 

const FILM_ID = 81215567
const link = { "media-url": "" }

const arrow = "➟"
var output = ""

var opts = {
  policy: $environment.params
};

var opts2 = {
  policy: $environment.params,
  redirection: false
};

function randomString(e)
{
   e = e || 32;
   var t = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890",
   a = t.length,
   n = "";
   for (i=0;i<e;i++) n+=t.charAt(Math.floor(Math.random()*a));
   return n;
}


const BASE_URL = 'https://www.netflix.com/title/';
const BASE_URL_YTB = "https://www.youtube.com/premium";
var BASE_URL_BLBL = "https://api.bilibili.com/pgc/player/web/playurl?avid=18281381&cid=29892777&qn=0&type=&otype=json&ep_id=183799&fourk=1&fnver=0&fnval=16&session=" + randomString(20) + "&module=bangumi";
const BASE_URL_BahamutAnime = 'https://ani.gamer.com.tw/ajax/token.php?adID=89422&sn=14667';
const BASE_URL_HULUJP = 'https://id.hulu.jp';
const BASE_URL_HBOMAX = 'https://www.hbomax.com';
const BASE_URL_DISNEY = 'https://www.disneyplus.com';
const BASE_URL_NICONICO = 'https://www.nicovideo.jp/watch/so23017073';
const BASE_URL_KKTV = "https://api.kktv.me/v3/ipcheck";
const BASE_URL_TVBANYWHERE = "https://uapisfm.tvbanywhere.com.sg/geoip/check/platform/android";
var D_region;

var flags = new Map([
[ "AC" , "🇦🇨" ] , 
[ "AF" , "🇦🇫 阿富汗" ] , 
[ "AE" , "🇦🇪 阿联酋" ] , 
[ "AI" , "🇦🇮" ] , 
[ "AL" , "🇦🇱 阿尔巴尼亚" ] , 
[ "AM" , "🇦🇲 亚美尼亚" ] , 
[ "AQ" , "🇦🇶" ] , 
[ "AR" , "🇦🇷 阿根廷" ] , 
[ "AS" , "🇦🇸" ] , 
[ "AT" , "🇦🇹 奥地利" ] , 
[ "AU" , "🇦🇺 澳大利亚" ] , 
[ "AW" , "🇦🇼" ] , 
[ "AX" , "🇦🇽" ] , 
[ "AZ" , "🇦🇿 阿塞拜然" ] , 
[ "BB" , "🇧🇧" ] , 
[ "BD" , "🇧🇩 孟加拉国" ] , 
[ "BE" , "🇧🇪 比利时" ] , 
[ "BF" , "🇧🇫" ] , 
[ "BG" , "🇧🇬 保加利亚" ] , 
[ "BH" , "🇧🇭 巴林" ] , 
[ "BI" , "🇧🇮" ] , 
[ "BJ" , "🇧🇯" ] , 
[ "BM" , "🇧🇲" ] , 
[ "BN" , "🇧🇳 文莱" ] , 
[ "BO" , "🇧🇴 玻利维亚" ] , 
[ "BR" , "🇧🇷 巴西" ] , 
[ "BS" , "🇧🇸" ] , 
[ "BT" , "🇧🇹 不丹" ] , 
[ "BV" , "🇧🇻" ] , 
[ "BW" , "🇧🇼" ] , 
[ "BY" , "🇧🇾" ] , 
[ "BZ" , "🇧🇿" ] , 
[ "CA" , "🇨🇦 加拿大" ] , 
[ "CF" , "🇨🇫 中非" ] , 
[ "CH" , "🇨🇭 瑞士" ] , 
[ "CK" , "🇨🇰" ] , 
[ "CL" , "🇨🇱 智利" ] , 
[ "CM" , "🇨🇲 喀麦隆" ] , 
[ "CN" , "🇨🇳 中国" ] , 
[ "CO" , "🇨🇴 哥伦比亚" ] , 
[ "CP" , "🇨🇵" ] , 
[ "CR" , "🇨🇷 哥斯达黎加" ] , 
[ "CU" , "🇨🇺 古巴" ] , 
[ "CV" , "🇨🇻" ] , 
[ "CW" , "🇨🇼" ] , 
[ "CX" , "🇨🇽" ] , 
[ "CY" , "🇨🇾 塞浦路斯" ] , 
[ "CZ" , "🇨🇿 捷克" ] , 
[ "DE" , "🇩🇪 德国"] , 
[ "DG" , "🇩🇬" ] , 
[ "DJ" , "🇩🇯" ] , 
[ "DK" , "🇩🇰 丹麦" ] , 
[ "DM" , "🇩🇲" ] , 
[ "DO" , "🇩🇴" ] , 
[ "DZ" , "🇩🇿" ] , 
[ "EA" , "🇪🇦" ] , 
[ "EC" , "🇪🇨" ] , 
[ "EE" , "🇪🇪 爱沙尼亚" ] , 
[ "EG" , "🇪🇬 埃及" ] , 
[ "EH" , "🇪🇭" ] , 
[ "ER" , "🇪🇷" ] , 
[ "ES" , "🇪🇸 西班牙" ] , 
[ "ET" , "🇪🇹" ] , 
[ "EU" , "🇪🇺" ] , 
[ "FI" , "🇫🇮 芬兰" ] , 
[ "FJ" , "🇫🇯" ] , 
[ "FK" , "🇫🇰" ] , 
[ "FM" , "🇫🇲" ] , 
[ "FO" , "🇫🇴" ] , 
[ "FR" , "🇫🇷 法国" ] , 
[ "GA" , "🇬🇦" ] , 
[ "GB" , "🇬🇧 英国" ] , 
[ "HK" , "🇭🇰 香港" ] ,
[ "HU" , "🇭🇺 匈牙利" ], 
[ "HR" , "🇭🇷 克罗地亚" ], 
[ "ID" , "🇮🇩 印尼" ] , 
[ "IE" , "🇮🇪 爱尔兰" ] , 
[ "IL" , "🇮🇱 以色列" ] , 
[ "IM" , "🇮🇲" ] , 
[ "IN" , "🇮🇳 印度" ] , 
[ "IS" , "🇮🇸 冰岛" ] , 
[ "IT" , "🇮🇹 意大利" ] , 
[ "JP" , "🇯🇵 日本" ] , 
[ "KR" , "🇰🇷 南韩" ] , 
[ "LU" , "🇱🇺 卢森堡" ] , 
[ "LV" , "🇱🇻 拉脱维亚" ] , 
[ "LT" , "🇱🇹 立陶宛" ] , 
[ "MO" , "🇲🇴 澳门" ] , 
[ "MN" , "🇲🇳 蒙古" ] , 
[ "MX" , "🇲🇽 墨西哥" ] , 
[ "MY" , "🇲🇾 马来西亚" ] , 
[ "NL" , "🇳🇱 荷兰" ] , 
[ "PH" , "🇵🇭 菲律宾" ] , 
[ "RO" , "🇷🇴 罗马尼亚" ] , 
[ "RS" , "🇷🇸 塞尔维亚" ] , 
[ "RU" , "🇷🇺 俄罗斯" ] ,
[ "RW" , "🇷🇼" ] , 
[ "SA" , "🇸🇦 沙特阿拉伯" ] , 
[ "SB" , "🇸🇧" ] , 
[ "SC" , "🇸🇨" ] , 
[ "SD" , "🇸🇩" ] , 
[ "SE" , "🇸🇪 瑞典" ] , 
[ "SG" , "🇸🇬 新加坡" ] , 
[ "TH" , "🇹🇭 泰国" ] , 
[ "TN" , "🇹🇳" ] , 
[ "TO" , "🇹🇴" ] , 
[ "TR" , "🇹🇷 土耳其"] , 
[ "TV" , "🇹🇻" ] , 
[ "TW" , "🇹🇼 台湾" ] , 
[ "UK" , "🇬🇧 英国" ] , 
[ "UA" , "🇺🇦 乌克兰" ] , 
[ "UM" , "🇺🇲 美国" ] , 
[ "US" , "🇺🇸 美国" ] , 
[ "UY" , "🇺🇾 乌拉圭" ] , 
[ "UZ" , "🇺🇿" ] , 
[ "VA" , "🇻🇦" ] , 
[ "VE" , "🇻🇪" ] , 
[ "VG" , "🇻🇬" ] , 
[ "VI" , "🇻🇮" ] , 
[ "VN" , "🇻🇳 越南"] , 
[ "ZA" , "🇿🇦 南非"]])


!(async () => {
  let result = {
    title: '流媒体解锁情况',
    content: '检测失败，请重试',
    content1: '检测失败，请重试'
  }

  await Promise.race([test(FILM_ID),timeOut(20000)])
    .then((code) => { //netflix
    console.log("Netflix " + code);
    
    if (code === 'Not Available') {
      result['content'] = 'Netflix: 未解锁';
    } else if (code === 'Not Found') {
      result['content'] = 'Netflix: 仅自制剧';
    } else if (code === "timeout") {
      result['content'] = "Netflix: 测试超时";
    } else {
      result['content'] = 'Netflix: 已解锁 ' + flags.get(code);
    }

    return testYTB();

    })
    .then((code) => { //youtube
    
    console.log("Youtube " + code)
    if (code === 'Not Available') {
      result['content1'] = 'YouTube Premium: 不支持';
    } 
    else if (code === "timeout") {
      result['content1'] = "YouTube Premium: 测试超时";
    } 
    else {
      result['content1'] = "YouTube Premium: 可使用 " + flags.get(code);
    }
    return testDisney();
    })
    .then((code) => { //迪士尼
        console.log("Disney+ " + code);
    if (code === 'success'){
        result['content2'] = "Disney+: 已解锁 " + flags.get(D_region.toUpperCase());
    }
    else if (code === 'failed'){
        result['content2'] = "Disney+: 未解锁";
    }
    else if (code === 'coming'){
      result['content2'] = "Disney+: 即将登陆 " + flags.get(D_region.toUpperCase());
    }
    else if (code === 'hotstar'){
      result['content2'] = "Disney+: 已解锁 " + flags.get(D_region.toUpperCase()) + " (Hotstar)";
    }
    else if (code === 'timeout'){
        result['content2'] = "Disney+: 测试超时";
    }
    return testBLBL();
    })
    .then((code) => { //bilibili
     console.log("Bilibili " + code)
    if (code === 'success'){
        result['content3'] = "bilibili港澳台: 已解锁";
    }
    else if (code === 'failed'){
        result['content3'] = "bilibili港澳台: 未解锁";
    }
    else if (code === 'timeout'){
        result['content3'] = "bilibili港澳台: 测试超时";
    }
    return testGamertw();
    })
    .then((code) => { //动画疯
        console.log("动画疯 " + code);
    if (code === 'success'){
        result['content4'] = "动画疯: 已解锁";
    }
    else if (code === 'failed'){
        result['content4'] = "动画疯: 未解锁";
    }
    else if (code === 'timeout'){
        result['content4'] = "动画疯: 测试超时";
    }
    
    return testHuluJP();
    })
    .then((code) => { //hulu JP
        console.log("HuluJP " + code);
    if (code === 'success'){
        result['content5'] = "HuluJP: 已解锁";
    }
    else if (code === 'failed'){
        result['content5'] = "HuluJP: 未解锁";
    }
    else if (code === 'timeout'){
        result['content5'] = "HuluJP: 测试超时";
    }
    return testNiconico();
    })
    .then((code) => { //niconico
        console.log("Niconico " + code);
    if (code === 'success'){
        result['content6'] = "Niconico: 已解锁";
    }
    else if (code === 'failed'){
        result['content6'] = "Niconico: 未解锁";
    }
    else if (code === 'timeout'){
        result['content6'] = "Niconico: 测试超时";
    }
    return testHBOmax();
    })
     .then((code) => { //HBO
        console.log("HBO Max " + code);
    if (code === 'success'){
        result['content7'] = "HBO Max: 已解锁";
    }
    else if (code === 'failed'){
        result['content7'] = "HBO Max: 未解锁";
    }
    else if (code === 'timeout'){
        result['content7'] = "HBO Max: 测试超时";
    }
    return testKKTV();
    })
     .then((code) => { //KKTV
        console.log("KKTV " + code);
    if (code === 'success'){
        result['content8'] = "KKTV: 已解锁";
    }
    else if (code === 'failed'){
        result['content8'] = "KKTV: 未解锁";
    }
    else if (code === 'timeout'){
        result['content8'] = "KKTV: 测试超时";
    }
    return testTVBAnywhere();
    })
     .then((code) => { //TVB
        console.log("TVB Anywhere " + code);
    if (code === 'success'){
        result['content9'] = "TVB Anywhere: 已解锁";
    }
    else if (code === 'failed'){
        result['content9'] = "TVB Anywhere: 未解锁";
    }
    else if (code === 'timeout'){
        result['content9'] = "TVB Anywhere: 测试超时";
    }
    })
   
    var result_message = result["content"]+
    "\n"+result["content1"]+
    "\n"+result["content2"]+
    "\n"+result["content3"]+
    "\n"+result["content4"]+
    "\n"+result["content5"]+
    "\n"+result["content6"]+
    "\n"+result["content7"]+
    "\n"+result["content8"]+
    "\n"+result["content9"];
    console.log("\n按照当前策略网络，本机的流媒体解锁状况:\n" + result_message);
    $done(
        {
            "title":result["title"],
            "message":result_message
        })
})()
.finally(() => $done());

function timeOut(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("timeout");
    }, delay)
  })
}


function test(filmId) {
  return new Promise((resolve, reject) => {
    let option = {
      url: BASE_URL + filmId,
      opts: opts,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
      },
    }
    $task.fetch(option).then (response => {
      //console.log(response.statusCode);
      if (response.statusCode === 404) {
        resolve('Not Found');
        return;
      }

      if (response.statusCode === 403) {
        resolve('Not Available');
        return;
      }

      if (response.statusCode === 200) {
        let url = response.headers['X-Originating-URL'];
        //console.log(url);
        let region = url.split('/')[3];
        region = region.split('-')[0];
        if (region == 'title') {
          region = 'us';
        }
        region=region.toUpperCase()
        resolve(region);
        return;
      }
      reject('Error');
    })
  })
}

function testBLBL() {
return new Promise((resolve, reject) => {
    let option = {
      url: BASE_URL_BLBL,
      opts: opts,
      headers: {
        'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36'
      },
    }
    $task.fetch(option).then(response => {
    var data = JSON.parse(response.body);
    if (response.statusCode !== 200) {
        reject('Error')
        return
      }
    message = data.message
    //console.log(message)
    if (message != "success")
       {
          resolve("failed");
          return;
       }
    resolve("success");
    return;
  }, reason => {
    message = "查询超时";
    console.log(message);
    resolve("timeout");
    return;
  }) })

}

function testGamertw(){
    return new Promise((resolve, reject) => {
        let option = {
            url: BASE_URL_BahamutAnime,
            opts: opts,
            headers: {
              'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36'
            },
        }
        $task.fetch(option).then(response => {
            var data = response.body;
            if (response.statusCode !== 200) {
                reject('Error');
                return;
              }
            if (data.indexOf("animeSn") == -1)
            {
                resolve("failed");
                return;
            }
            resolve("success");
          }, reason => {
            message = "查询超时";
            console.log(message);
            resolve("timeout");
            return;
          })
    })
}

function testHuluJP() {
    return new Promise((resolve, reject) => {
        let option = {
            url: BASE_URL_HULUJP,
            opts: opts2,
            headers: {
              'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'
            },
          }
            $task.fetch(option).then(response => {
            var HULU_url = response.headers['Location'];
            console.log("HuluJP " + response.statusCode);
            if (response.statusCode !== 302) {
                reject('Error');
                return;
            }
            //console.log("Hulu location " + HULU_url);
            if(HULU_url == "https://id.hulu.jp/_error/restrict.html")
            {
                resolve("failed");
                return
            }
            resolve("success");
            return;
        }, reason => {
            message = "查询超时";
            console.log(message);
            resolve("timeout");
            return;
          })
    })
}

function testHBOmax() {
  return new Promise((resolve, reject) => {
      let option = {
          url: BASE_URL_HBOMAX,
          opts: opts2,
          headers: {
            'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'
          },
        }
          $task.fetch(option).then(response => {
          console.log("HBO Max " + JSON.stringify(response.statusCode));
          if(response.statusCode === 302 && response.headers['Location'] == 'https://www.hbomax.com/geo-availability')
          {
            resolve("failed");
            return;
          }
          if(response.statusCode === 200)
          {
            resolve("success");
            return;
          }
          reject("Error");
      }, reason => {
          message = "查询超时";
          console.log(message);
          resolve("timeout");
          return;
        })
  })
}

function testDisney(){
  return new Promise((resolve, reject) => {
    let option = {
        url: BASE_URL_DISNEY,
        opts: opts,
        headers: {
          'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'
        },
      }
        $task.fetch(option).then(response => {
        console.log("Disney+ " + JSON.stringify(response.statusCode));
        //console.log(response.body)
        let DisneyURL = response.headers['Location'];
        if(response.statusCode === 200)
        {
          if(response.body.indexOf("Sorry, Star+ is not available in your region") !== -1) //无服务
          {
            resolve("failed");
            return;
          }
          if(response.body.indexOf("【公式】Disney+ (ディズニープラス)") !== -1) //日本版
          {
            D_region = "JP"
            resolve("success");
            return;
          }
          if(response.body.indexOf('<link rel="canonical" href="https://www.hotstar.com/') !== -1) //印度东南亚Hotstar版
          {
            let D_string2 = '<link rel="canonical" href="https://www.hotstar.com/';
            D_region = response.body.substring(response.body.indexOf(D_string2) + 52, response.body.indexOf(D_string2) + 54).toUpperCase();
            resolve("hotstar");
            return;
          }
          if(response.body.indexOf("CNBL: 1") !== -1) //国际版
          {
            D_region = response.body.substring(response.body.indexOf("Region: ") + 8, response.body.indexOf("Region: ") + 10);
            resolve("success");
            return;
          }
          if(response.body.indexOf("CNBL: 2") !== -1) //国际版 即将上线
          {
            D_region = response.body.substring(response.body.indexOf("Region: ") + 8, response.body.indexOf("Region: ") + 10);
            resolve("coming");
            return;
          }
          console.log(D_region);
          return;
        }
        reject("Error");
        return;
    }, reason => {
        message = "查询超时";
        console.log(message);
        resolve("timeout");
        return;
      })
})
}

function testYTB() {
  return new Promise((resolve, reject) => {
    let option = {
      url: BASE_URL_YTB,
      opts: opts,
      headers: {
        'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36'
      },
    }
    $task.fetch(option).then(response => {
      let data = response.body
      //console.log(response.statusCode)
      if (response.statusCode !== 200) {
        reject('Error')
        return
      }
      
      if (data.indexOf('Premium is not available in your country') !== -1) {
        resolve('Not Available')
        return
      }
      let region = ''
      let re = new RegExp('"countryCode":"(.*?)"', 'gm')
      let result = re.exec(data)
      if (result != null && result.length === 2) {
        region = result[1]
      } else if (data.indexOf('www.google.cn') !== -1) {
        region = 'CN'
      } else {
        region = 'US'
      }
      region=region.toUpperCase();
      resolve(region)
      return
    })
  }, reason => {
    message = "查询超时";
    console.log(message);
    resolve("timeout");
    return;
  })
}

function testNiconico(){
  return new Promise((resolve, reject) => {
    let option = {
        url: BASE_URL_NICONICO,
        opts: opts2,
        headers: {
          'User-Agent':
          'Mozilla/5.0 (Windows; U; Windows NT 6.1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/10.0 Safari/602.1'
        },
      }
        $task.fetch(option).then(response => {
        if(response.statusCode == 200)
        {
        if(response.body.indexOf("Sorry, this video can only be viewed in the same region where it was uploaded") !== -1)
        {
          resolve("failed");
          return;
        }
        else{
          resolve("success");
          return
        }
      }
        reject("Error");
    }, reason => {
        message = "查询超时";
        console.log(message);
        resolve("timeout");
        return;
      })
})
}

function testKKTV(){
  return new Promise((resolve, reject) => {
    let option = {
        url: BASE_URL_KKTV,
        opts: opts,
        headers: {
          'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'
        },
      }
        $task.fetch(option).then(response => {
        console.log("KKTV " + JSON.stringify(response.statusCode));
        if(response.statusCode == 200)
        {
          var data = response.body;
         if(data.indexOf('"is_allowed":false') !== -1)
          {
            resolve("failed");
            return;
          }
          if(data.indexOf('"is_allowed":true') !== -1)
          {
            resolve("success");
            return;
          }
        }
        reject("Error");
        return
    }, reason => {
        message = "查询超时";
        console.log(message);
        resolve("timeout");
        return;
      })
})
}



function testTVBAnywhere(){
  return new Promise((resolve, reject) => {
    let option = {
        url: BASE_URL_TVBANYWHERE,
        opts: opts,
        headers: {
          'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'
        },
      }
        $task.fetch(option).then(response => {
        console.log("TVB Anywhere " + JSON.stringify(response.statusCode));
        if(response.statusCode == 200)
        {
          var data = JSON.parse(response.body);
          if(data.allow_in_this_country == false)
          {
            resolve("failed");
            return;
          }
          if(data.allow_in_this_country == true)
          {
            resolve("success");
            return;
          }
        }
        reject("Error");
        return;
    }, reason => {
        message = "查询超时";
        console.log(message);
        resolve("timeout");
        return;
      })
})
}
