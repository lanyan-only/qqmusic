document.addEventListener("readystatechange",function(){
	if(document.readyState==="complete"){
		  //audio对象的属性方法和事件



      var audio=document.querySelector("audio");
      var playpausebtn=document.querySelector("#play");

      //这是一个虚假的例子
		/*var obj={a:1;b:2}
       el.onclick=function(){
       	obj.a=4;
       }
       var oldA=obj.a;
       setInterval(function(){
	      if(oldA !==obj.a){
	       obj.onAchange();
	     }
       },100);
       obj.onAchange=function(){
       	div.style.height=16*this.a+"px";
       	
       }*/
       var vol=document.querySelector("#vol");
       var volposition=document.querySelector("#vol-position");
       var state=document.querySelector("#state");
       var stateposition=document.querySelector("#state-position");
       var mute=document.querySelector("#mute");
       var tips=document.querySelector("#tips");

        // 处理播放暂停
        btnplay.onclick=function(){
          if(audio.paused){
           audio.play();
         }else{
           audio.pause();
         }
       }
       audio.onplay=function(){
         btnplay.className="pause_bt";
       }
       audio.onpause=function(){
         btnplay.className="play_bt";
       }
      // 音量部分
      spanvolume.onclick=function(ev){
        var v=ev.offsetX/this.offsetWidth;
        audio.volume=v;
      }
      spanvolumeop.onclick=function(ev){
       ev.stopPropagation();
     }
     audio.onvolumechange=function(){
      if(audio.volume===0){
       spanmute.className="volume_mute";
     }else{
       spanmute.className="volume_icon";
     }
         /*var r=vol.offsetWidth*audio.volume-volposition.offsetWidth/2;
         volposition.style.left=r+"px";*/
         spanvolumeop.style.left=audio.volume*100+"%";
         spanvolumebar.style.width=audio.volume*100+"%";
       }
     
     //简单设静音
     var oldvolume;
     spanmute.onclick=function()
     {
      
      if(audio.volume!=0){
        oldvolume=audio.volume;
        audio.volume=0;

      }else{
        audio.volume=oldvolume;
      }

     }
     //数据存放
       var yinyueku=[
       {name:'不要以为',src:'02.mp3',geshou:'庄心妍',duration:'4:12'},
       {name:'my22',src:'03.mp3',geshou:'secon',duration:'3:18'},
       {name:'如果时光倒流',src:'04.mp3',geshou:'汪苏泷',duration:'4:03'},
       {name:'无言守候',src:'05.mp3',geshou:'陈伟霆',duration:'4:26'},
       {name:'my55',src:'06.mp3',geshou:'san shou',duration:'2:52'}
       ]
       var currentsongindex;
       var  LIEBIAO=3,SHUNXU=2,DANQU=1,SUIJI=4;
       var currentbofangmoshi=LIEBIAO;
       var createList=function(){
        var el='';
        for (var i = 0; i < yinyueku.length; i++) {
          var ac=(i==currentsongindex)?'play_current':'';
          el+='<li mid="j0"class="'+ac+'"data-index="'+i+'"><strong class="music_name"title="'+yinyueku[i].name+'">'+yinyueku[i].name+'</strong><strong class="singer_name"title="'+yinyueku[i].geshou+'">'+yinyueku[i].geshou+'</strong><strong class="play_time">'+yinyueku[i].duration+'</strong><div class="list_cp"><strong class="btn_like" title="喜欢" name="myfav_003xv4w313tZHV" mid="003xv4w313tZHV"><span>我喜欢</span></strong><strong class="btn_share" title="分享"><span>分享</span></strong><strong class="btn_fav" title="收藏到歌单"><span>收藏</span></strong><strong class="btn_del" title="从列表中删除"><span>删除</span></strong></div></li>';
        };

        divsonglist.firstElementChild.innerHTML=el;
        spansongnum1.innerHTML='<span>'+yinyueku.length+'</span>'

        var lis=divsonglist.firstElementChild.children;
        for (var i = 0; i < lis.length; i++) {
          lis[i].index=i;
          lis[i].onclick=function(){
            audio.src=yinyueku[this.index].src ;
            currentsongindex=this.index;
            audio.play();
            onsongchange();
          }

          lis[i].onmouseover=function(){
            this.classList.add('play_hover');
          }
          lis[i].onmouseout=function(){
            this.classList.remove('play_hover');
          }
        };

        var des=document.querySelectorAll(".btn_del");
        for (var i = 0; i < des.length; i++) {
          des[i].index=i;
          des[i].onclick=function(e){
            e.stopPropagation();
            var newarr=[];
            for (var i = 0; i < yinyueku.length; i++) {
             if( yinyueku[this.index]!=yinyueku[i]){
              newarr.push(yinyueku[i]);
            }
          };
          yinyueku=newarr;
          if(this.index<currentsongindex){
            currentsongindex-=1;
          }

       /* var that=this;
        yinyueku=yinyueku.filter(function(){
          return yinyueku[that.index]!=value;
        })*/
        createList();
        if(this.index==currentsongindex){
          if(currentsongindex==yinyueku.length){
            audio.src='';
            uireset();
          }else if(this.index!=currentsongindex){
            audio.src=yinyueku[currentsongindex].src;
            audio.play();
            onsongchange();
          }

        }
     }
    };

  }
    createList();
        // 清空列表
        clear_list.onclick=function(){
          yinyueku=[];
          createList();
          uireset();
        }
        var uireset=function(){
          document.querySelector(".music_name").innerHTML="<span>听我想听的歌</span>";
          document.querySelector('.singer_name').innerHTML='<span>QQ音乐</span>';

          ptime.innerHTML="";
          document.querySelector(".music_op").style.display="none";
          audio.src="";
          spanprogress_op.style.left="0%";
          spanplaybar.style.width="0%"
          btnplay.className="play_bt";
        }


        var onsongchange=function(ev){
          var lis=divsonglist.firstElementChild.children;
          for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove('play_current');
          };
          lis[currentsongindex].classList.add("play_current");
          var cu=yinyueku[currentsongindex];
          document.querySelector('.music_name').innerHTML=cu.name;
          document.querySelector('.singer_name').innerHTML=cu.geshou;
          document.querySelector('.music_op').style.display="block";
          document.querySelector('#ptime').innerHTML=cu.duration;

        }
     
       
       

    



      var randomSong=function(){
        var currentsongindex=Math.floor(Math.random()*yinyueku.length);
      
        // 解决如果是本歌曲，切换
        audio.src=yinyueku[currentsongindex].src;

        audio.play();
        onsongchange();
      }
      spanplaybar.onclick=function(ev){
        audio.currentTime=ev.offsetX/downloadbar.offsetWidth*audio.duration;
        spanprogress_op.style.left=audio.currentTime/audio.duration*100+"%";
        spanplaybar.style.width=audio.currentTime/audio.duration*100+"%";
      }

      // 处理播放模式

      btnPlayway.onclick=function(){
        divselect.style.display="block";
      }
      setbofangmoshi=function(num){
        currentbofangmoshi=num;
        divselect.style.display="none";
        var data={
          1:'cycle_single_bt',//单曲
          2:'ordered_bt',//顺序播放
          3:'cycle_bt',//列表播放
          4:'unordered_bt'  //随机播放
        }
        btnPlayway.className=data[num];
      }
       /*var zhuanhuan=function(time){
       	var m=parseInt(time/60);
        var s=parseInt(time%60);
        m=(m<10)?('0'+m):m;
        s=(s<10)?('0'+s):s;
         return m+':'+s;

       }
       
       state.onmouseover=function(ev){
           tips.style.display="block";
           tips.style.left=ev.offsetX-tips.offsetWidth/2+"px";
            var time=ev.offsetX/this.offsetWidth*audio.duration;
            tips.innerHTML=zhuanhuan(time);
       }
       state.onmousemove=function(ev){
           tips.style.left=ev.offsetX-tips.offsetWidth/2+"px";
            var time=ev.offsetX/this.offsetWidth*audio.duration;
            tips.innerHTML=zhuanhuan(time);
       }
       state.onmouseout=function(){
           tips.style.display="none";
       }
       state.onclick=function(ev){
        var sc=ev.offsetX/this.offsetWidth*audio.duration;
        audio.currentTime=sc;
       }
       stateposition.onclick=function(ev){
          ev.stopPropagation();
       }
       stateposition.onmouseover=function(ev){
          ev.stopPropagation();
        }*/
          //利用开关设静音



    //上，下一首

    var nextSong=function(){
        if(currentsongindex===undefined){
          return;
        } 
        if(currentbofangmoshi==SUIJI){
         randomSong();
         return;
       }
       currentsongindex+=1;
       currentsongindex=(currentsongindex==yinyueku.length)?0:currentsongindex;
       audio.src=yinyueku[currentsongindex].src ;
       audio.play();
       onsongchange();
   }
   var prevSong=function(){
        if(currentsongindex===undefined){
          return;
        } 
        if(currentbofangmoshi==SUIJI){
         randomSong();
         return;
       }
       currentsongindex-=1;
       currentsongindex=(currentsongindex==-1)?yinyueku.length-1:currentsongindex;
       audio.src=yinyueku[currentsongindex].src ;
       audio.play();
       onsongchange();
   }

 document.querySelector('.next_bt').onclick=nextSong;
 document.querySelector('.prev_bt').onclick=prevSong;

 /*   play_current_bar.*/

// 切换歌曲
/*qiege.onclick=function(){
  audio.src="03.mp3";
}*/

// 播放进度

 document.querySelector('.player_bar').onclick=function(ev){
      audio.currentTime=ev.offsetX/this.offsetWidth*audio.duration;
    }



audio.ontimeupdate=function(){
  spanprogress_op.style.left=this.currentTime/this.duration*100+"%";
  spanplaybar.style.width=this.currentTime/this.duration*100+"%";

 if(audio.ended){
    if(currentbofangmoshi==DANQU){
       
      audio.play();
      }else if(currentbofangmoshi==LIEBIAO){
        nextSong();
      }
      else if(currentbofangmoshi==SUIJI){
       randomSong();
     }
     else if(currentbofangmoshi==SHUNXU){
      if(currentsongindex!=yinyueku.length-1){
        nextSong();
      }
     }
  }
}

 //隐藏渐渐消失
 var flag=true;;
 var flagtwo=true;;
 spansongnum1.onclick=function(){ 
    if(divplayframe.style.display=="none"){
     divplayframe.style.display="block";
     } else if(divplayframe.style.display=="block"){
            if(flag) {
              divplayframe.style.opacity=0;
              flag=false;

            } else {
               divplayframe.style.opacity=1;
               flag=true;
             }
        }
  
  
 } 
// 点击右上角 隐藏
btnclose.onclick=function(){
  btnclose.onmousedown=function(){
    divplayframe.style.display="none";
  }   
}

 
 // 往左移除
 var flagone=true;
 btnfold.onclick=function(){
    if(flagone){
      divplayer.style.left=-540+"px";
      divplayframe.style.left=-540+"px";
      divplayer.classList.add("m_player_folded");
      flagone=false;
    }else{
       divplayer.style.left=0+"px";
       divplayframe.style.left=0+"px";
       divplayer.classList.remove("m_player_folded");
       flagone=true;
    }
  
 }









}
},false)