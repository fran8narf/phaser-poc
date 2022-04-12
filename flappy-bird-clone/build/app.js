!function(e){function t(t){for(var i,o,a=t[0],c=t[1],h=t[2],u=0,p=[];u<a.length;u++)o=a[u],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&p.push(n[o][0]),n[o]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);for(l&&l(t);p.length;)p.shift()();return r.push.apply(r,h||[]),s()}function s(){for(var e,t=0;t<r.length;t++){for(var s=r[t],i=!0,a=1;a<s.length;a++){var c=s[a];0!==n[c]&&(i=!1)}i&&(r.splice(t--,1),e=o(o.s=s[0]))}return e}var i={},n={0:0},r=[];function o(t){if(i[t])return i[t].exports;var s=i[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=e,o.c=i,o.d=function(e,t,s){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(s,i,function(t){return e[t]}.bind(null,i));return s},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var a=window.webpackJsonp=window.webpackJsonp||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var h=0;h<a.length;h++)t(a[h]);var l=c;r.push([1,1]),s()}([,function(e,t,s){"use strict";s.r(t);var i=s(0),n=s.n(i);class r extends n.a.Scene{constructor(e,t){super(e),this.config=t,this.screenCenter=[t.width/2,t.height/2],this.menuStyles={fontSize:"42px",fill:"#FFF",backgroundColor:"rgba(0, 0, 0, 0.7)"}}create(){this.add.image(0,0,"bg").setOrigin(0,0)}update(){}startGame(){this.scene.start("PlayScene")}menuRender(e,t){let s=0;e.forEach((e=>{const i=[this.screenCenter[0],this.screenCenter[1]+s];e.textGameObject=this.add.text(...i,e.text,this.menuStyles).setOrigin(.5,1),s+=50,t(e)}))}createBackBtn(){this.add.image(this.config.width-50,50,"back-btn").setOrigin(0,1).setScale(2).setInteractive().on("pointerup",(()=>{this.scene.start("MenuScene")}))}}var o=r;var a=class extends o{constructor(e){super("MenuScene",e),this.menu=[{scene:"PlayScene",text:"Play"},{scene:"ScoreScene",text:"Scoreboard"},{scene:null,text:"Exit "}]}create(){super.create(),this.cameras.main.fadeIn(2500,255,255,255),this.menuRender(this.menu,this.setupMenuEvents.bind(this))}update(){}setupMenuEvents(e){const t=e.textGameObject;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#FF0",cursor:"pointer"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#FFF"})})),t.on("pointerup",(()=>{console.log(e.scene),e.scene?this.scene.start(e.scene):this.scene.stop()}))}};var c=class extends o{constructor(e){super("PlayScene",e),this.luffy=null,this.pipes=null,this.VELOCITY=350,this.PIPES_TO_RENDER=5,this.score=0,this.scoreText="",this.bestScore=localStorage.getItem("bestScore")||0,this.bestScoreText="",this.jumpSound=null,this.countDownText="",this.initialTime=0,this.timeOutEvent=void 0,this.isPaused=!1,this.currentDifficulty="easy",this.difficulties={easy:{pipeVerticalDistanceRange:[320,370],pipeHorizontalDistanceRange:[430,470]},normal:{pipeVerticalDistanceRange:[220,270],pipeHorizontalDistanceRange:[390,430]},hard:{pipeVerticalDistanceRange:[170,220],pipeHorizontalDistanceRange:[350,390]}}}create(){this.initScene(),this.jumpSound=this.sound.add("jump",{volume:.3})}update(e,t){this.gameOver(),this.recyclePipes()}createPause(){this.add.image(this.config.width-10,this.config.height-10,"pause").setOrigin(1).setScale(3).setInteractive().on("pointerdown",(()=>{this.callPauseScene()})),this.input.keyboard.on("keydown_P",this.callPauseScene,this)}callPauseScene(){this.isPaused=!0,this.physics.pause(),this.scene.pause(),this.scene.launch("PauseScene")}renderPlayer(){this.luffy=this.physics.add.sprite(this.config.startPosition.x,this.config.startPosition.y,"luffy"),this.luffy.body.gravity.y=1100,this.luffy.scale=1.5,this.luffy.setCollideWorldBounds(!0)}renderPipes(){this.pipes=this.physics.add.group();for(let e=0;e<this.PIPES_TO_RENDER;e++){const e=this.pipes.create(0,0,"u-pipe").setImmovable(!0).setOrigin(0,1),t=this.pipes.create(0,0,"l-pipe").setImmovable(!0).setOrigin(0,0);this.placePipe(e,t)}this.pipes.setVelocityX(-300)}createColliders(){this.physics.add.collider(this.luffy,this.pipes,null,(()=>{this.gameOver(!0)}),this)}handleInputs(){this.input.on("pointerdown",this.flap,this),this.input.keyboard.on("keydown_SPACE",this.flap,this)}createScore(){this.score=0,this.scoreText=this.add.text(16,16,"Score : "+this.score,this.setTextScoreStyles()),this.bestScoreText=this.add.text(16,64,"Best : "+this.bestScore,this.setTextBestScoreStyles())}setTextScoreStyles(){return{fontSize:"32px",fill:"#000",fontWeight:"bolder",backgroundColor:"rgba(255, 232, 0, .7)"}}setTextBestScoreStyles(){return{fontSize:"20px",fill:"#000",fontWeight:"bolder",backgroundColor:"rgba(255, 232, 0, .7)"}}flap(){this.isPaused||(this.luffy.body.velocity.y=-this.VELOCITY,this.jumpSound.play())}increaseScore(){this.score+=1,this.scoreText.setText("Score: "+this.score)}setBestScore(){this.score>this.bestScore&&(this.bestScore=this.score,localStorage.setItem("bestScore",this.bestScore),this.bestScoreText.setText("Best: "+this.bestScore))}ListenToEvents(){this.pauseEvent||(this.pauseEvent=this.events.on("resume",(()=>{console.log("is this executing?"),this.initialTime=3,this.countDownText=this.add.text(...this.screenCenter,"Continue in "+this.initialTime,this.menuStyles).setOrigin(.5),this.timeOutEvent=this.time.addEvent({delay:1e3,callback:this.countDown,callbackScope:this,loop:!0})})))}countDown(){this.initialTime--,this.countDownText.setText("Continue in "+this.initialTime),this.initialTime<=0&&(this.countDownText.setText(""),this.timeOutEvent.remove(),this.physics.resume(),this.scene.resume(),this.isPaused=!1)}initScene(){super.create(),this.renderPlayer(),this.renderPipes(),this.createColliders(),this.handleInputs(),this.createScore(),this.createPause(),this.createBackBtn(),this.ListenToEvents(),this.startAnimation()}gameOver(e=!1){(this.luffy.getBounds().bottom>=this.config.height||this.luffy.getBounds().top<=0||e)&&(this.luffy.body.velocity.y=0,this.luffy.body.gravity.y=0,this.jumpSound=void 0,console.log("game over"),this.physics.pause(),this.luffy.anims.stop("fly"),this.luffy.setTint(16711680),this.time.addEvent({delay:1e3,callback:()=>{this.setBestScore(),this.scene.restart()},loop:!1}))}placePipe(e,t){const s=this.difficulties[this.currentDifficulty],i=this.getRightMostPipe(),n=Phaser.Math.Between(...s.pipeVerticalDistanceRange),r=Phaser.Math.Between(30,this.config.height-30-n),o=Phaser.Math.Between(...s.pipeHorizontalDistanceRange);e.x=i+o,e.y=r,t.x=e.x,t.y=e.y+n}getRightMostPipe(){let e=0;return this.pipes.getChildren().forEach((t=>{e=Math.max(t.x,e)})),e}recyclePipes(){let e=[];this.pipes.getChildren().forEach((t=>{t.getBounds().right<0&&(e.push(t),2===e.length&&(this.placePipe(...e),this.increaseScore(),this.increaseDifficulty()))}))}increaseDifficulty(){this.score>=1&&(this.currentDifficulty="normal"),this.score>=10&&(this.currentDifficulty="hard")}startAnimation(){this.anims.create({key:"fly",frames:this.anims.generateFrameNumbers("luffy",{start:0,end:5}),frameRate:12,repeat:-1}),this.luffy.play("fly")}};var h=class extends o{constructor(e){super("PreloadScene",e),this.bgSound=null,this.screenCenter=null}preload(){this.load.image("bg","assets/wano-bg.jpg"),this.load.spritesheet("luffy","assets/luffy-sprite.png",{frameWidth:75,frameHeight:95}),this.load.image("u-pipe","assets/upper-laser-pipe.png"),this.load.image("l-pipe","assets/lower-laser-pipe.png"),this.load.image("pause","assets/pause.png"),this.load.image("bg","assets/wano-bg.jpg"),this.load.image("sound-on","assets/sound-on.png"),this.load.image("sound-off","assets/sound-off.png"),this.load.image("back-btn","assets/back.png"),this.load.audio("jump","assets/jump-sound.wav"),this.load.audio("bg-sound","assets/bg-sound.wav")}create(){this.scene.start("MenuScene"),this.bgSound=this.sound.add("bg-sound",{volume:.3}),this.bgSound.loop=!0}update(){}};var l=class extends o{constructor(e){super("ScoreScene",e)}preload(){}create(){super.create(),this.setBestScore(),this.createBackBtn()}update(){}setBestScore(){const e=localStorage.getItem("bestScore")||0;console.log(this.config);this.add.text(...this.screenCenter,"Best Score: "+e,{fontSize:"62px",fill:"#FFF",backgroundColor:"rgba(0, 0, 0, 0.7)"}).setOrigin(.5,1)}};const u={width:800,height:600,startPosition:{x:80,y:300}},p=[h,a,l,c,class extends o{constructor(e){super("PauseScene",e),this.menu=[{scene:"PlayScene",text:"Continue"},{scene:"MenuScene",text:"Exit"}]}create(){super.create(),this.menuRender(this.menu,this.setupMenuEvents.bind(this))}update(){}setupMenuEvents(e){const t=e.textGameObject;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#FF0",cursor:"pointer"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#FFF"})})),t.on("pointerup",(()=>{console.log(e.scene),e.scene&&"Continue"===e.text?(this.scene.stop(),this.scene.resume(e.scene)):(this.scene.stop("PlayScene"),this.scene.start(e.scene))}))}}],d={type:n.a.AUTO,width:800,height:600,physics:{default:"arcade",arcade:{}},scene:p.map((e=>new e(u)))};new n.a.Game(d)}]);