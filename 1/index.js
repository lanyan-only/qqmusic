document.addEventListener('readystatechange',function(){
  if(document.readyState==='complete'){
      	//audio对象的属性方法与事件
      	var audio=document.querySelector('audio');
        console.dir(audio)
      	/*var playbtn=document.querySelector('#play');
      	var pausebtn=document.querySelector('#pause');*/
      	var playpausebtn=document.querySelector('#btnplay');
      	var vol=document.querySelector('#spanvolume');
      	var volPosition=document.querySelector('#spanvolumeop');
      	var mute=document.querySelector('#spanmute');
      	var state=document.querySelector('#downloadbar');
      	var statePosition=document.querySelector('#spanprogress_op');
      	var tips=document.querySelector('.time_show');
      	var spanplayerbar=document.querySelector('#spanplaybar');
       //播放 暂停
       btnplay.onclick=function(){
         if(audio.paused){
          audio.play();
          
        }
        else{
         audio.pause();

       /*           }
        if(currentsongindex===undefined){
          divsonglist.firstElementChild.firstChild.classList.add("play_current");*/
        }           
      }

      audio.onplay=function(){
        btnplay.classList.add("pause_bt");
        btnplay.classList.remove("play_bt");         
      }
      audio.onpause=function(){
        btnplay.classList.remove("pause_bt");
        btnplay.classList.add("play_bt");
      }
        //音量
        spanvolume.onclick=function(ev){
         var v=ev.offsetX/spanvolume.offsetWidth;
         audio.volume=v;

       }
         //静音
         spanmute.onclick=function(){
           if(audio.volume!=0){
            oldVolume=audio.volume;
            audio.volume=0
          }
          else{
           audio.volume=oldVolume;
         }
       }

         //小圆点的js
         audio.onvolumechange=function(){
          if(audio.volume===0){
           spanmute.classList.add("volume_mute");
         }
         else{
           spanmute.classList.remove("volume_mute");
         }
         
         spanvolumeop.style.left=audio.volume*100+"%";
         spanvolumebar.style.width=audio.volume*100+"%";

       }	

       
  //音乐库
  var yinyueku=[
  {name:"不知该怎么称呼你",geshou:"李思宇",src:"李思宇、五十六朵花组合 - 不知该怎么称呼你(Live).mp3",duration:"03:27"},
  {name:"我好想你1",geshou:"徐佳莹",src:"徐佳莹 - 我好想你.mp3",duration:"04:55"}, {name:"我好想你2",geshou:"徐佳莹",src:"徐佳莹 - 我好想你.mp3",duration:"04:55"}, {name:"我好想你",geshou:"徐佳莹",src:"徐佳莹 - 我好想你.mp3",duration:"04:55"},
  {name:"我好想你3",geshou:"徐佳莹",src:"徐佳莹 - 我好想你.mp3",duration:"04:55"}, {name:"我好想你4",geshou:"徐佳莹",src:"徐佳莹 - 我好想你.mp3",duration:"04:55"}, {name:"我好想你",geshou:"徐佳莹",src:"徐佳莹 - 我好想你.mp3",duration:"04:55"},
  {name:"我好想你5",geshou:"徐佳莹",src:"徐佳莹 - 我好想你.mp3",duration:"04:55"}, {name:"我好想你6",geshou:"徐佳莹",src:"徐佳莹 - 我好想你.mp3",duration:"04:55"}, {name:"我好想你7",geshou:"徐佳莹",src:"徐佳莹 - 我好想你.mp3",duration:"04:55"},
  {name:"合家欢乐",geshou:"凤凰传奇",src:"凤凰传奇 - 合家欢.mp3",duration:"02:39"}
  ];
  var creatlist=function(){
   var el="";
   for(var i=0;i<yinyueku.length;i++){
    var ac=(i==currentsongindex)?'play_current':'';
    el+='<li mid="j0"class="'+ac+'" data-src="'+i+'"><strong class="music_name">'+yinyueku[i].name+'</strong><strong class="singer_name">'+yinyueku[i].geshou+'</strong><strong class="play_time">'+yinyueku[i].duration+'</strong><div class="list_cp"><strong class="btn_like" title="喜欢" name="myfav_0038RM350w8m1V" mid="0038RM350w8m1V"><span>我喜欢</span></strong><strong class="btn_share" title="分享"><span>分享</span></strong><strong class="btn_fav" title="收藏到歌单"><span>收藏</span></strong><strong class="btn_del" title="从列表中删除"><span>删除</span></strong></div></li>'
  }
             	divsonglist.firstElementChild.innerHTML=el;//ul
              spansongnum1.innerHTML='<span>'+yinyueku.length+'</span>'
              

        var lis=divsonglist.firstElementChild.children;//li

        for(var i=0;i<lis.length;i++){
          lis[i].index=i;
          lis[i].onclick=function(){
             		//audio.src=this.getAttribute("data-src");
             		audio.src=yinyueku[this.index].src;
             		currentsongindex=this.index;
             		audio.play();
             		onsongchange();
             	}
              lis[i].onmouseover=function(){
                this.classList.add("play_hover");

              }
              lis[i].onmouseout=function(){
                this.classList.remove("play_hover")
              }

            }



            var des=document.querySelectorAll('.btn_del');
            for(var i=0;i<des.length;i++){
              des[i].index=i;
              des[i].onclick=function(e){
               e.stopPropagation();
               var newarr=[];
               for(var i=0;i<yinyueku.length;i++){
                if(yinyueku[this.index] != yinyueku[i])
                {
                 newarr.push(yinyueku[i]);
               }
               
               
             };
             yinyueku=newarr;
             if(this.index<currentsongindex){
              currentsongindex-=1;
              
            }

            
            if(this.index==currentsongindex){
              if(currentsongindex==yinyueku.length){
                audio.src='';
                uireset();
              }
              else{
                audio.src=yinyueku[currentsongindex].src;
                audio.play();
                onsongchange();
              }
              
            }
            creatlist();
          }
        }

      }
      creatlist();

      var onsongchange=function(){
               var lis=divsonglist.firstElementChild.children;//li
               for(var i=0;i<lis.length;i++){
                lis[i].classList.remove("play_current");
              }
              lis[currentsongindex].classList.add("play_current");
              var cu=yinyueku[currentsongindex];
              document.querySelector(".music_name").innerHTML=cu.name;
              document.querySelector(".singer_name").innerHTML=cu.geshou;
              document.querySelector(".play_date").innerHTML=cu.duration;
            }


//
   //**************************************************************
   //进度条
   downloadbar.onclick=function(ev){
    audio.currentTime=ev.offsetX/downloadbar.offsetWidth*audio.duration;
    spanprogress_op.style.left=audio.currentTime/audio.duration*100+"%";
    spanplaybar.style.width=audio.currentTime/audio.duration*100+"%";
  }
  audio.ontimeupdate=function(){
    spanprogress_op.style.left=audio.currentTime/audio.duration*100+"%";
    spanplaybar.style.width=audio.currentTime/audio.duration*100+"%";
    if(audio.ended){
      
     if(currentbofangmoshi==DANQU){
       
      audio.play();
    }else if(currentbofangmoshi==LIEBIAO){
      nextsong();
    }
    else if(currentbofangmoshi==SUIJI){
     randomSong();
   }
   else if(currentbofangmoshi==SHUNXU){
    if(currentsongindex!=yinyueku.length-1){
      nextsong();
    }
  }
}
}

var randomSong=function(){
  
  currentsongindex=Math.floor(Math.random()*yinyueku.length);
  console.log(currentsongindex);
  audio.src=yinyueku[currentsongindex].src;
  audio.play();
  onsongchange();
}
spanplaybar.onclick=function(ev){
  audio.currentTime=ev.offsetX/downloadbar.offsetWidth*audio.duration;
  spanprogress_op.style.left=audio.currentTime/audio.duration*100+"%";
  spanplaybar.style.width=audio.currentTime/audio.duration*100+"%";
}
//清除列表
clear_list.onclick=function(){
  yinyueku=[];
  creatlist();
  uireset();  
}

var uireset=function(){
  document.querySelector(".music_name").innerHTML="<span>听我想听的歌</span>";
  document.querySelector('.singer_name').innerHTML='<span>QQ音乐</span>';
  ptime.innerHTML="";
  document.querySelector('.music_op').style.display="none";
  audio.src="";
  spanprogress_op.style.left='0%';
  spanplaybar.style.width='0%';
  btnplay.className="play_bt"
}
//删除的问题









  //处理播放模式
  var currentsongindex;
  var LIEBIAO=3;
  var SHUNXUN =2;
  var DANQU=1;
  var SUIJI=4;
  var currentbofangmoshi=LIEBIAO;  
  btnPlayway.onclick=function(){
    divselect.style.display="block";
    
  }

  setbofangmoshi=function(num){
    currentbofangmoshi=num;
    divselect.style.display="none";
    var data={
      1:'cycle_single_bt',
      2:'ordered_bt',
      3:'cycle_bt',
      4:'unordered_bt'
    }
    btnPlayway.className=data[num];
  }






  var nextsong=function(){
                 //下一首
                 
                 if(currentsongindex===undefined) return;
                 if(currentbofangmoshi==SUIJI){
                  randomSong();
                  console.log(1);
                  return
                }
                currentsongindex++;
                currentsongindex=(currentsongindex==yinyueku.length)?0:currentsongindex;
                audio.src=yinyueku[currentsongindex].src;
                audio.play();
                onsongchange();

              }
              document.querySelector(".next_bt").onclick=nextsong;
              
              
              var prevsong=function(){
          //上一首
          if(currentsongindex===undefined) return;
          if(currentbofangmoshi==SUIJI){
            randomSong();
            return
          }
          currentsongindex-=1;
          currentsongindex=(currentsongindex==-1)?yinyueku.length-1:currentsongindex;
          audio.src=yinyueku[currentsongindex].src;
          audio.play();
          onsongchange();
        }
        document.querySelector(".prev_bt").onclick=prevsong;
        
        
        
        
        
        
        



        
        
        
      }
    },false)











