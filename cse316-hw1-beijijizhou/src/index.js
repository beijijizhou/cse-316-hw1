import Model from './model.js';
var data=new Model().data


var lenOfQuestions=data.questions.length;
var lenOfTags=data.tags.length;
var taglist=new Map()
var tagmap=new  Map()
var questionlist=new Map()
for( let i of data.tags){
  taglist.set(i.tid,i.name);
  tagmap.set(i.name,i.tid);

}

for( let i =0;i< data.questions.length;i++){
  questionlist.set(data.questions[i].title,i)
}



window.onload = function() {
  

  document.getElementById("search").addEventListener("keyup", function () {
    var questionslist=new Set()
    if (event.key == "Enter") {
      var text=document.getElementById("search").value;
      text=text.split(" ");
      var index=-1;
        for (let m of data.questions){
          index++;
          var set=new Set()
          var questiontext=m.text.split(" ")
          var questiontitle=m.title.split(" ")
          // console.log(questiontext)
          // console.log(questiontitle)
          var header=document.createElement("div");
        header.id="header";
        header.className="header";
       
          for( let j of questiontext){
            var s=j.toLocaleLowerCase()
            set.add(s);
          }
         
          
          for( let k of text){
           
            if(set.has(k.toLocaleLowerCase())){
              questionslist.add(index);
             
            break;
            }
            else if (k.charAt(0)=="[" &&k.charAt(k.length-1)=="]"){
              var id=-1;
              k=k.substring(1,k.length-1);
              console.log(k)
              if(tagmap.has(k)){
                k=tagmap.get(k);
                console.log(k)
                for ( let q of data.questions){
                  id++;
                  for (let t of q.tagIds){
                    
                    if (t==k){
                      questionslist.add(id);
                      
                      break;
                    }
                  }
                }
              }
            }
        } 
        }
        document.getElementById("main").innerHTML="";
        var Questions=document.createElement("div");
        Questions.id="Questions";
        Questions.className="Questions";
        Questions.innerHTML=""+questionslist.size+" Questions";
        var AllQuestions=document.createElement("div");
        AllQuestions.id="AllQuestions"
        AllQuestions.className="AllQuestions";
        AllQuestions.innerHTML="Search Result";
        header.appendChild(Questions);
        header.appendChild(AllQuestions);
        header.appendChild(askAQuestion());
        document.getElementById("main").appendChild(header);
       displayaskAQuestion()
       console.log(questionslist)
        if( questionslist.size==0){
          var noq=document.createElement("h1")
          noq.innerHTML="No Questions Found"
          noq.style.color="red"
          noq.style.textAlign="center";
          document.getElementById("main").appendChild(noq)
        }
        else {
          for(let i of questionslist){
            clicktitle(data.questions[i])
          }
        }
    }
    
  })
  function header(){
    document.getElementById("main").innerHTML="";
    var header=document.createElement("div");
    header.id="header";
    header.className="header";
    var Questions=document.createElement("div");
    Questions.id="Questions";
    Questions.className="Questions";
    Questions.innerHTML=""+lenOfQuestions+" Questions";
    var AllQuestions=document.createElement("div");
    AllQuestions.id="AllQuestions"
    AllQuestions.className="AllQuestions";
    AllQuestions.innerHTML="All Questions";
    header.appendChild(Questions);
    header.appendChild(AllQuestions);
    header.appendChild(askAQuestion());
    document.getElementById("main").appendChild(header);
  }
  function askAQuestion(){
    var askAQuestion=document.createElement("div");
    askAQuestion.id="askAQuestion"
    askAQuestion.className="askAQuestion";
    askAQuestion.innerHTML="Ask A Question";
    return askAQuestion;
  }
  header()
  function displayaskAQuestion(){
      document.getElementById("askAQuestion").addEventListener("click",function(){
      document.getElementById("main").innerHTML="";
      document.getElementById("questionsDiv").style.backgroundColor="#d3d3d3";
      document.getElementById("Tags").style.backgroundColor="#d3d3d3";
      var alertbox=document.createElement("div");
      alertbox.id="alertbox";
      alertbox.setAttribute('style', 'white-space: pre;');
      document.getElementById("main").appendChild(alertbox);
      //question title
      var qtitle = document.createElement("h2");
      qtitle.innerHTML = "Question Title";
      var p1 = document.createElement("p");
      p1.innerHTML = "Title shoud not be more than 100 characters.";
      var titlebox = document.createElement("textarea");
      titlebox.placeholder="Come up with a good click bait";
      titlebox.id="titlebox";
      document.getElementById("main").appendChild(qtitle);
      document.getElementById("main").appendChild(p1);
      document.getElementById("main").appendChild(titlebox);
     //question text
      var qtext = document.createElement("h2");
      qtext.innerHTML = "Question Text";
      var p2 = document.createElement("p");
      p2.innerHTML = "Add details.";
      var textbox = document.createElement("textarea");
      textbox.placeholder="Text should be as detail as possible";
      textbox.id="textbox";
      textbox.style.marginLeft="2%"
      document.getElementById("main").appendChild(qtext);
      document.getElementById("main").appendChild(p2);
      document.getElementById("main").appendChild(textbox);
        //qtags 
        var qtags = document.createElement("h2");
        qtags.innerHTML = "Tags";
        var p3 = document.createElement("p");
        p3.innerHTML = "Add Keywords separated by whitespace.";
        var tagsbox= document.createElement("textarea");
        tagsbox.placeholder="Tags are also important";
        tagsbox.id="tagsbox";
        document.getElementById("main").appendChild(qtags);
        document.getElementById("main").appendChild(p3);
        document.getElementById("main").appendChild(tagsbox);
        //username
        var qusersname = document.createElement("h2");
        qusersname.innerHTML = "Username";
        var p4 = document.createElement("p");
        p4.innerHTML = "Should not be more than 15 characters.";
        var usernamebox= document.createElement("textarea");
        usernamebox.placeholder="Andy";
        usernamebox.id="usernamebox";
        document.getElementById("main").appendChild(qusersname);
        document.getElementById("main").appendChild(p4);
        document.getElementById("main").appendChild(usernamebox);
        var postQuestions= document.createElement("div");
        postQuestions.id="postQuestions"
        postQuestions.className="postQuestions"
        postQuestions.innerHTML="postQuestions"
        document.getElementById("main").appendChild(postQuestions);
        
        document.getElementById("postQuestions").addEventListener("click",function(){
         
          document.getElementById("questionsDiv").style.backgroundColor="#d3d3d3";
          document.getElementById("Tags").style.backgroundColor="#d3d3d3";
          var tags= document.getElementById("tagsbox").value;
          tags=tags.split(" ");
         
          var tagarray=new Set()
          for(let i of tags){
            if(!i==" "){
              tagarray.add(i);
            }
          }
  
          var f=false;
          var newtitle=document.getElementById("titlebox").value
          var newusername=document.getElementById("usernamebox").value;
          var newtext=document.getElementById("textbox").value;
          document.getElementById("alertbox").textContent="";
          document.getElementById("alertbox").style.color = "red";
          if(newtitle.length>100){
            document.getElementById("alertbox").textContent+="\r\nTitle shoud not be more than 100 characters";
            f=true;
          }
          else if(newtitle.length==0){
            document.getElementById("alertbox").textContent+="\r\nTitle shoud not be empty"
            f=true;
          }
          if(newtext.length==0){
            document.getElementById("alertbox").textContent+="\r\nText should not be empty"
            f=true;
          }
          if(tagarray.size==0){
            document.getElementById("alertbox").textContent+="\r\nTag should not be empty"
            f=true;
          }
          if(newusername.length>15){
            document.getElementById("alertbox").textContent+="\r\nShould not be more than 15 characters";
            f=true;
          }
          else if(newusername.length==0){
            document.getElementById("alertbox").textContent+="\r\nUsername should not be empty"
            f=true;
          }
          var tagidarray=[];
          if(!f){
            lenOfQuestions++;
            for( let i of tagarray){
              if(tagmap.has(i)){
                tagidarray.push(tagmap.get(i))
              }
              else{
                lenOfTags++
                var newtagid="t"+lenOfTags;
                taglist.set(newtagid,i);
                tagmap.set(i,newtagid);
                data.tags.push(newtagid,i);
                tagidarray.push(newtagid)
              }
            }
            var hr=""+new Date().getHours()+":"+new Date().getMinutes();
          var q = {
            qid: 'q'  + lenOfQuestions,
            title: document.getElementById("titlebox").value,
            text: document.getElementById("textbox").value,
            tagIds: tagidarray,
            askedBy: document.getElementById("usernamebox").value,
            askedOn: getDate(),
            askedAt: hr,
            answers: [],
            views: 0,
          };
          data.questions.unshift(q)
            document.getElementById("questionsDiv").click();
          }
          
          });
    })
  }
  displayaskAQuestion()
  displayQuestions(lenOfQuestions)
  // write relevant code.
  document.getElementById("Tags").addEventListener("click",function(){
    document.getElementById("main").innerHTML=""
    var header=document.createElement("div");
    header.id="header";
    header.className="header";
    document.getElementById("main").appendChild(header);
    var Questions=document.createElement("div");
    var AllQuestions=document.createElement("div");
    var askAQuestion=document.createElement("div");
    askAQuestion.id="askAQuestion"
    header.appendChild(Questions);
   header.appendChild(AllQuestions);
   header.appendChild(askAQuestion);
    var threetags=document.createElement("div");
    document.getElementById("main").appendChild(threetags); 
    threetags.id="threetags";
    for(let i of taglist){
      var onetagcount=0;
      var onetag=document.createElement("div");
      var three=0;
      for(let j of data.questions){
        for( let k of j.tagIds){
          if(i[0]==k){
            onetagcount++;
          }
        }      
      }
      var downtag=document.createElement("div")
      downtag.style.color="black"
      onetag.style.textDecoration="underline"
      onetag.innerHTML=i[1]
      if(onetagcount==1){
        downtag.innerHTML=" "+onetagcount+" question";
      }
      else
      downtag.innerHTML=" "+onetagcount+" questions";
      var bigtag=document.createElement("li")
      bigtag.id="bigtag"
      bigtag.appendChild(onetag);
      bigtag.appendChild(downtag);
      onetag.id="onetag";
      onetag.style.color="#0281E8"
      onetag.style.backgroundColor="white"
     
      threetags.appendChild(bigtag);
      three++;
      //event listener
      onetag.addEventListener("click",function(){
        var tagcount=0;
        document.getElementById("Questions").innerHTML=""
        document.getElementById("header").innerHTML=""
        document.getElementById("main").innerHTML=""
        
        document.getElementById("main").appendChild(header)
     document.getElementById("Tags").style.backgroundColor="#0281E8 ";
    document.getElementById("questionsDiv").style.backgroundColor="#d3d3d3";
    var Questions=document.createElement("div");
    Questions.id="Questions";
    Questions.className="Questions";
   
    var AllQuestions=document.createElement("div");
    AllQuestions.id="AllQuestions"
    AllQuestions.className="AllQuestions";
    AllQuestions.innerHTML="Question Tagged "+"["+i[1]+"]";
    var askAQuestion=document.createElement("div");
    askAQuestion.id="askAQuestion"
    askAQuestion.className="askAQuestion";
    askAQuestion.innerHTML="Ask A Question";
   header.appendChild(Questions);
   header.appendChild(AllQuestions);
   header.appendChild(askAQuestion);
   displayaskAQuestion()
   document.getElementById("main").appendChild(header);
           for( let k of data.questions){
               for( let m of k.tagIds){
                if(m==i[0]){
                  
                 clicktitle(k);
                 tagcount++;
                 break;
                }
               }
           }
           tagcount>1?   Questions.innerHTML=""+tagcount+" Tags":Questions.innerHTML=""+tagcount+" Tag";
         
           
       })
    }
    document.getElementById("Tags").style.backgroundColor="#0281E8 ";
    document.getElementById("questionsDiv").style.backgroundColor="#d3d3d3"; 
    //header
    Questions.id="Questions";
    Questions.className="Questions";
    Questions.innerHTML=""+tagmap.size+" Tags";
    AllQuestions.id="AllQuestions"
    AllQuestions.className="AllQuestions";
    AllQuestions.innerHTML="All tags";
    askAQuestion.id="askAQuestion"
    askAQuestion.className="askAQuestion";
    askAQuestion.innerHTML="Ask A Question";
   displayaskAQuestion()
   
  })
  
  
  document.getElementById("questionsDiv").addEventListener("click",function(){
    //question page
    //header
    header()
    displayaskAQuestion()
    //ask question
    
    document.getElementById("Tags").style.backgroundColor="#d3d3d3";
    document.getElementById("questionsDiv").style.backgroundColor="#0281E8 ";
    // display the main
    displayQuestions(lenOfQuestions)
  })
  function displayQuestions(count){
    for(let j=0;j<count;j++){
      clicktitle(data.questions[j])
    }
    
  }
  function clicktitle(item){
    
      var dataDiv=document.createElement("div");
      var leftDiv=document.createElement("div");
      var midDiv=document.createElement("div");
      var rightDiv=document.createElement("div");
      //left
      var viewDiv=document.createElement("div");
      leftDiv.setAttribute("id","leftDiv");
      leftDiv.setAttribute("class","leftDiv");
      var numOfanswersDiv=document.createElement("div");
      numOfanswersDiv.setAttribute("id","numOfanswersDiv");
      viewDiv.innerHTML=item.views+" Views";
      
      var numOfanswers=item.answers.length;
      numOfanswersDiv.innerHTML=numOfanswers+" Answers";
      leftDiv.appendChild(viewDiv);
      leftDiv.appendChild(numOfanswersDiv);
      
      //mid
      midDiv.setAttribute("id","midDiv");
      midDiv.setAttribute("class","midDiv");
      //title
      var titleDiv=document.createElement("div");
      titleDiv.setAttribute("id","titleDiv")
      titleDiv.setAttribute("class","titleDiv")
      titleDiv.innerHTML=item.title;
      
      //tag
      var tagDiv=document.createElement("div");
      tagDiv.setAttribute("id","tagDiv");
      tagDiv.setAttribute("class","tagDiv");
     
      //
      for (let i =0;i<lenOfTags;i++){
       
        if(taglist.has(item.tagIds[i])){
          var tag=document.createElement("li");
          tag.innerHTML=taglist.get(item.tagIds[i]);
          tagDiv.appendChild(tag);
        }
        
      }
      midDiv.appendChild(titleDiv);
      midDiv.appendChild(tagDiv);
      
      //right
      rightDiv.setAttribute("id","rightDiv");
      rightDiv.setAttribute("class","rightDiv");
      //username,
      var askedBy=document.createElement("li")
      askedBy.setAttribute("id","askedBy")
      askedBy.setAttribute("class","askedBy")
      askedBy.innerHTML="Asked by"
      var userName=document.createElement("span")
      userName.setAttribute("id","userName")
      userName.setAttribute("class","userName")
      userName.innerHTML=" "+item.askedBy
      askedBy.appendChild(userName)
      rightDiv.appendChild(askedBy)
      //askedon
      var On=document.createElement("div")
      On.setAttribute("id","On")
      On.setAttribute("class","On")
      On.innerHTML="On"
      var date=document.createElement("span")
      date.setAttribute("id","date")
      date.setAttribute("class","date")
      date.innerHTML=" "+item.askedOn
      On.appendChild(date)
      rightDiv.appendChild(On)
      //askedat
      var At=document.createElement("div")
      At.setAttribute("id","At")
      At.setAttribute("class","At")
      At.innerHTML="At"
      var askedAt=document.createElement("span")
      askedAt.setAttribute("id","askedAt")
      askedAt.setAttribute("class","askedAt")
      askedAt.innerHTML=" "+item.askedAt
      At.appendChild(askedAt)
      rightDiv.appendChild(At)
      //answer page
      titleDiv.addEventListener("click",function(){
        
        document.getElementById("questionsDiv").style.backgroundColor="#d3d3d3";
        document.getElementById("Tags").style.backgroundColor="#d3d3d3";
        document.getElementById("main").innerHTML="";
        var header=document.createElement("div");
        header.id="header"
        header.className="header"
        header.innerHTML=""
        var answers=document.createElement("div");
        answers.id="answers";
        answers.className="answers";
        item.answers.length==1?answers.innerHTML=""+ item.answers.length+ " Answer": answers.innerHTML=""+ item.answers.length+ " Answers";
        var questionTitle=document.createElement("div");
        questionTitle.id="questionTitle";
        questionTitle.className="questionTitle";
        questionTitle.innerHTML=""+item.title+ "";
        var  askAQuestion=document.createElement("div");
        askAQuestion.id="askAQuestion"
        askAQuestion.className="askAQuestion";
        askAQuestion.innerHTML="Ask A Question";
        header.appendChild(answers)
        header.appendChild(questionTitle)
        header.appendChild(askAQuestion)
        document.getElementById("main").appendChild(header)
        displayaskAQuestion()
        
        // questionInfoDiv
        var questionInfoDiv=document.createElement("div")
        questionInfoDiv.id="questionInfoDiv"
       
        //left
        item.views++;
        var view=document.createElement("h1");
        view.id="view"
        item.views==1?view.innerHTML=""+item.views+" View":view.innerHTML=""+item.views+" Views";
        view.style.fontWeight="bolder";
        view.style.textAlign="center";
        view.style.fontSize="xlarger";
        //middle
        var text=document.createElement("div");
        text.id="text"
        text.innerHTML=item.text
        rightDiv.setAttribute("id","rightDiv");
        rightDiv.setAttribute("class","rightDiv");
      //right
      var askright=document.createElement("li")
      askright.className="rightDiv"
      var askedBy=document.createElement("li")
      askedBy.setAttribute("id","askedBy")
      askedBy.setAttribute("class","askedBy")
      askedBy.innerHTML="Asked by"
      var userName=document.createElement("span")
      userName.setAttribute("id","userName")
      userName.setAttribute("class","userName")
      userName.innerHTML=" "+item.askedBy
      askedBy.appendChild(userName)
      askright.appendChild(askedBy)
      //askedon
      var On=document.createElement("div")
      On.setAttribute("id","On")
      On.setAttribute("class","On")
      On.innerHTML="On"
      var date=document.createElement("span")
      date.setAttribute("id","date")
      date.setAttribute("class","date")
      date.innerHTML=" "+item.askedOn
      On.appendChild(date)
      askright.appendChild(On)
      //askedat
      var At=document.createElement("div")
      At.setAttribute("id","At")
      At.setAttribute("class","At")
      At.innerHTML="At"
      var askedAt=document.createElement("span")
      askedAt.setAttribute("id","askedAt")
      askedAt.setAttribute("class","askedAt")
      askedAt.innerHTML=" "+item.askedAt
      At.appendChild(askedAt)
      askright.appendChild(At)
      questionInfoDiv.appendChild(view);
      questionInfoDiv.appendChild(text);
      questionInfoDiv.appendChild(askright);
      document.getElementById("main").appendChild(questionInfoDiv);
        //one answer
        
        
      for(let i of item.answers){
        var oneanswer=document.createElement("div")
        oneanswer.id="oneanswer"
        
        for( let k of data.answers){
          
          if(k.aid==i){
            var answerright=document.createElement("div")
            answerright.className="rightDiv"
            var answerContent=document.createElement("div")
            answerContent.id="answerContent"
            
            answerContent.innerHTML=k.text
            var askedBy=document.createElement("li")
            //  info, answerright
      askedBy.setAttribute("id","askedBy")
      askedBy.setAttribute("class","askedBy")
      askedBy.innerHTML="Answered by"
      var userName=document.createElement("span")
      userName.setAttribute("id","userName")
      userName.setAttribute("class","userName")
      userName.innerHTML+=" "+k.ansBy
   
      askedBy.appendChild(userName)
      answerright.appendChild(askedBy)
      //askedon
      var On=document.createElement("div")
      On.setAttribute("id","On")
      On.setAttribute("class","On")
      On.innerHTML="On"
      var date=document.createElement("span")
      date.setAttribute("id","date")
      date.setAttribute("class","date")
      date.innerHTML+=" "+k.ansOn;
      On.appendChild(date)
      answerright.appendChild(On)
      //askedat
      var At=document.createElement("div")
      At.setAttribute("id","At")
      At.setAttribute("class","At")
      At.innerHTML="At"
      var askedAt=document.createElement("span")
      askedAt.setAttribute("id","askedAt")
      askedAt.setAttribute("class","askedAt")
      askedAt.innerHTML+=" "+k.ansAt
      At.appendChild(askedAt)
      answerright.appendChild(At)
      oneanswer.appendChild(answerContent);
      oneanswer.appendChild(answerright);
      document.getElementById("main").appendChild(oneanswer);
          }

        }
      }
      var answerbutton=  document.createElement("div")
      answerbutton.className="answerbutton"
      answerbutton.id="answerbutton"
      answerbutton.innerHTML="Answer Question"
      document.getElementById("main").appendChild(answerbutton);
      document.getElementById("answerbutton").addEventListener("click",function(){
        document.getElementById("main").innerHTML="";
        var alertbox=document.createElement("div");
      alertbox.id="alertbox";
      alertbox.setAttribute('style', 'white-space: pre;');
      document.getElementById("main").appendChild(alertbox);
      document.getElementById("alertbox").style.color="red"
        var answertext = document.createElement("h2");
        answertext.innerHTML = "Answer Text";
      var answertextbox = document.createElement("textarea");
      answertextbox.placeholder="You can start to type";
      answertextbox.id="answertextbox";
      var answernametext = document.createElement("h2");
      answernametext .innerHTML = "Username ";
      var answernamebox = document.createElement("textarea");
      answernamebox.placeholder="jumanji";
      answernamebox.id="answernamebox";

      document.getElementById("main").appendChild(answertext);
      document.getElementById("main").appendChild(answertextbox);
      document.getElementById("main").appendChild(answernametext);
      document.getElementById("main").appendChild(answernamebox);
      var postanswerbutton= document.createElement("div");
      postanswerbutton.id="postanswerbutton"
      postanswerbutton.innerHTML="Post Answer"
      document.getElementById("main").appendChild(postanswerbutton);
      document.getElementById("postanswerbutton").addEventListener("click",function(){
        document.getElementById("alertbox").innerHTML=""
        var newanswer= document.getElementById("answertextbox").value;
        var newasnwername= document.getElementById("answernamebox").value;
       
        var f=false;
        if(newanswer.length==0){
          document.getElementById("alertbox").textContent+="\r\nAnswers should not be empty"
        f=true;
        }
        if (newasnwername.length==0){
          document.getElementById("alertbox").textContent+="\r\nUsername should not be empty"
          f=true;
        }
        
       if(!f){
        var numOfanswers=data.answers.length;
        numOfanswers++;
        var hr=""+new Date().getHours()+":"+new Date().getMinutes();
        item.answers.unshift['a'+numOfanswers];
          var a = {
            aid: 'a'+numOfanswers,
            text: newanswer,
            ansBy: newasnwername,
            ansOn: getDate(),
            ansAt: hr,
          };
        
          for( let c of data.questions){
            if(c.title==item.title){
              c.answers.unshift('a'+numOfanswers);
            }
          }
          item.views--;
          data.answers.unshift(a);
          titleDiv.click();
    
       }

      })
      });
      
      })
      //overall
      dataDiv.setAttribute("id","dataDiv")
      dataDiv.setAttribute("class","dataDiv")
      dataDiv.appendChild(leftDiv);
      dataDiv.appendChild(midDiv);
      dataDiv.appendChild(rightDiv);
      document.getElementById("main").appendChild(dataDiv);
     
  }
 // current date
   function getDate(){
    var today = new Date();
var dd = today.getDate();
var getMonth=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
var mm = getMonth[today.getMonth()]; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 

today = mm+' '+dd+','+yyyy;
return today;
  }

  
};




