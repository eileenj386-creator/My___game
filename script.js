const app=document.getElementById("app");
let current=0;
let answers=[];

const questions=[
  {q:"حين يسود الصمت… ماذا تفعل؟",o:["أستمع لما خلفه","أرتاح فيه","أراقب من حولي"]},
  {q:"أكثر ما يلفت انتباهك في الناس:",o:["ما لا يقولونه","طريقة تفكيرهم","تصرفاتهم الصغيرة"]},
  {q:"حين تنظر في مرآة… ماذا ترى؟",o:["نسخة أعرفها جيدًا","شيئًا يتغير","شيئًا لا أفهمه"]},
  {q:"أين تشعر أنك أقرب لنفسك؟",o:["في الصمت","في التفكير","في المراقبة"]},
  {q:"عندما تُؤذى… أنت:",o:["تنسحب بهدوء","تحلل السبب","تراقب بصمت"]},
  {q:"أنت تثق أكثر بـ:",o:["إحساسك","عقلك","حدسك تجاه الآخرين"]},
  {q:"ما الذي تخفيه غالبًا؟",o:["ضعفك","أفكارك","حقيقتك"]},
  {q:"حين تفكر في نفسك بصدق… ترى:",o:["هدوءًا عميقًا","عقلًا لا يتوقف","شيئًا معقدًا"]}
];

function startGame(){
  current=0;
  answers=[];
  showQuestion();
}

function showQuestion(){
  let q=questions[current];
  let progress=(current/questions.length)*100;
  app.innerHTML=`
    <div class="box" id="questionBox">
      <div class="progress">
        <div class="progress-bar" style="width:${progress}%"></div>
      </div>
      <h1>${q.q}</h1>
      ${q.o.map((opt,i)=>`<button onclick="select(${i})">${opt}</button>`).join("")}
    </div>
  `;
  const box=document.getElementById("questionBox");
  setTimeout(()=>{box.classList.add("show");},50);
}

function select(i){
  answers.push(i);
  current++;
  if(current<questions.length){showQuestion();}
  else{showResult();}
}

function showResult(){
  let count=[0,0,0];
  answers.forEach(a=>count[a]++);
  let max=Math.max(...count);
  let index=count.indexOf(max);
  let result="";
  if(count.filter(c=>c===max).length>1){
    result=`<h1>المرآة العميقة</h1><p>أنت لا تُقرأ بسهولة… بل تتغيّر دون أن تضيع.<br>فيك شيء لا يمكن تفسيره… وهذا ما يجعلك مختلفًا.</p>`;
  }else if(index===0){
    result=`<h1>الظل الصامت</h1><p>هدوؤك ليس ضعفًا… بل عمق.<br>ترى ما لا يُقال، وتفهم أكثر مما يظهر.</p>`;
  }else if(index===1){
    result=`<h1>العقل البارد</h1><p>تفكر قبل أن تشعر.<br>الحقيقة عندك أهم من الراحة.</p>`;
  }else{
    result=`<h1>الروح المراقبة</h1><p>تراقب العالم بهدوء… وتفهمه دون أن تنغمس فيه.</p>`;
  }
  app.innerHTML=`
    <div class="box show">
      ${result}
      <div class="credit">صُنعت من طرف إيلين 🖤</div>
      <button onclick="startGame()">إعادة الاختبار</button>
    </div>
  `;
}

document.getElementById("startBtn").onclick=startGame;
