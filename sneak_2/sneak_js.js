//  Параматры :
      var IMPF_i = 10;       //количество картинок
      var Map_X = 32;       //размеры карты по оси X
      var Map_Y = 16;       //размеры карты по оси Y
      var speed = 5;        //скорость змейки
      var TIME_IMPF = 250;  //средний периуд показа картинки
      var AUDIO_W = 1;      //количество аудио
      var speed_L = 5;      //периуд увеличения хвоста



      var brows;
      var brows_b=false;
            function browser_audio()
            {
              if(brows_b==false)
              {
              	var ua = navigator.userAgent;
                  brows_b=true;

                  if (ua.search(/MSIE/) > 0) {brows = ".mp3";}
                  if (ua.search(/Firefox/) > 0) {brows = ".ogg";}
                  if (ua.search(/Opera/) > 0) {brows = ".ogg";}
                  if (ua.search(/Chrome/) > 0) {brows = ".mp3";}
                  if (ua.search(/Safari/) > 0) {brows = ".mp3";}
                  brows = ".mp3"
              }
              return brows;
            }





var AUDIO_b = false;
var AUDIO_SCHET = 0;
var tracks = Array(AUDIO_W);
for(var i = 0; i < AUDIO_W; i++)
{
  tracks[i]="audio/audio_" + i + browser_audio();
}
function soundClick_2() {
  if(AUDIO_b == false)
  {
    AUDIO_b = true;
      var audio_R = new Audio();
      audio_R.src = tracks[0];
      audio_R.autoplay = true;
      audio_R.loop = "loop";
      audio_R.id = "player";
      document.querySelector("body").appendChild(audio_R);
  }
}
function loadmusic()
{
  AUDIO_SCHET++;
  if(AUDIO_SCHET >= tracks.length)
    AUDIO_SCHET = 0;

  var audio_R = new Audio();
  audio_R.src = tracks[AUDIO_SCHET];
  audio_R.autoplay = true;
  audio_R.id = "player";
  document.body.replaceChild(document.querySelector("body").appendChild(audio_R), document.querySelector("audio"));

}


var stat = true;
var Map = new Array(Map_X);
for(var i = 0; i < Map_X; i++)
  Map[i] = new Array(Map_Y);





var Map_S = new Array(Map_X);
for(var i = 0; i < Map_X; i++)
  Map_S[i] = new Array(Map_Y);


var P_x;
var P_y;
var L_x = new Array(Map_X * Map_Y);
var L_y = new Array(Map_X * Map_Y);
var L_s = new Array(Map_X * Map_Y);
var L_i;
var L;
var dx;
var dy;
var DX;
var DY;
var MaxLevel = 1;
var Level2 = 1;
var max_slovo = 0;

var IMPF = Array(IMPF_i);
for(var i = 0; i < IMPF_i; i++)
{
  var IMPF_str = "JPG/JPG_" + (i) + ".jpg";
  IMPF[i] = IMPF_str;
}

var PODAROCK = ' "Россия - это страна, границы которой нигде не заканчиваются" (c) В.В.Путин      "Планируем расширять сотрудничество с Украиной, если она не будет тырить у нас газ." (c) В.В.Путин      "Над принятием законов думают сотни и сотни, а над тем, как обойти закон, думают миллионы." (c) В.В.Путин      "Мы спим по очереди. Все под контролем, не сомневайтесь." (в ответ на вопрос, кто управляет страной, когда он и Дмитрий Медведев спят) (c) В.В.Путин      "Настоящий мужчина всегда должен пытаться, а настоящая девушка — сопротивляться. Это значит — власть стремится снизить количество критики в свой адрес, а СМИ всегда привлекают внимание к ошибкам власти." (c) В.В.Путин      "Россия может подняться с колен и как следует огреть." (c) В.В.Путин      "Я читаю ваши мысли, и уже давно, и не только ваши." (c) В.В.Путин      "Когда камеры работают, хочется выглядеть хорошо, но голова отключается." (c) В.В.Путин      "К сожалению, Россия – это часть современного мира." (c) В.В.Путин      "Я самый богатый человек не только в Европе, но и мире. Я собираю эмоции." (c) В.В.Путин      "По политическим мотивам никто ничего не запрещает." (c) В.В.Путин      "Надо исполнять закон всегда, а не только тогда, когда схватили за одно место." (c) В.В.Путин      "Война войной, а обед должен быть по расписанию." (c) В.В.Путин      "Есть три пути воздействия на человека: шантаж, водка, угроза убийства." (c) В.В.Путин      "Хотите зарабатывать деньги, идите в бизнес, хотите посвятить себя государственной службе – живите на зарплату." (c) В.В.Путин      "Если мозги утекают, значит, они есть. Уже хорошо. Значит, они высокого качества, иначе они никому не были бы нужны и не утекали" (c) В.В.Путин      "Мы готовы протянуть руку всем своим партнерам. Но предупреждаем: у нас длинные руки" (c) В.В.Путин      "На нашем телевидении слишком много насилия и смерти, а вот фильмов про войну мало" (c) В.В.Путин      "Купил машину в Крыму в кредит. Осталось выплачивать два года. Банк ушел из Крыма. Что делать?" — жаловался президенту житель полуострова. И в ответ получил остроумный совет: "Катайтесь на здоровье" (c) В.В.Путин      ';
var PODAROCK_i = 0;

var SLOVO_R = [
              [ "Россия","Священная","Наша","Держава",
                "Россия","Любимая","Наша","Страна",
                "Могучая","Воля","Великая","Слава",
                "Твое","Достояние","На","Все","Времена"],

              [ "Славься","Отечество","Наше","Свободное",
                "Братских","Народов","Союз","Вековой",
                "Предками","Данная","Мудрость","Народная",
                "Славься","Страна","Мы","Гордимся","Тобой"],

              [ "От","Южных","Морей","До","Полярного","Края",
                "Раскинулись","Наши","Леса","И","Поля",
                "Одна","Ты","На","Свете","Одна", "Ты",
                "Такая", "Хранимая","Богом","Родная","Земля"],

              [ "Славься","Отечество","Наше","Свободное",
                "Братских","Народов","Союз","Вековой",
                "Предками","Данная","Мудрость","Народная",
                "Славься","Страна","Мы","Гордимся","Тобой"],

              [ "Широкий","Простор","Для","Мечты","И","Жизни",
                "Грядущие","Нам","Открывают","Года",
                "Нам","Силу","Даёт","Наша","Верность","Отчизме",
                "Так","Было","Так","Есть","И","Так","Будет","Всегда"]

              [ "Славься","Отечество","Наше","Свободное",
                "Братских","Народов","Союз","Вековой",
                "Предками","Данная","Мудрость","Народная",
                "Славься","Страна","Мы","Гордимся","Тобой"],
              ];
var SLOVO_ARRAY;
var T_R;

var SLOVO_i;
var SLOVO_X;
var SLOVO_Y;
var SLOVO_X_I;
var SLOVO_Y_I;
var SLOVO;

var REST = [false, false, false, false, false, false];

var GIM;
var WWS;

window.onload = Start();
setInterval( Move, 1000 / speed);
setInterval( PUTIN_F, 1000 / speed);
setInterval( PODRTY, 100);

function PODRTY()
{
        var PODRT = " ";
        var PODAROCK_width = document.getElementById("PODAR").offsetWidth / 7.22 / 0.75;
        for(var l = 0; l < PODAROCK_width; l++)
        {
          var ll = l + PODAROCK_i;
          if(ll > PODAROCK.length)
            ll = ll - PODAROCK.length;
          PODRT = PODRT + PODAROCK.charAt(ll);
        }
        PODAROCK_i++;
        if(PODAROCK_i >= PODAROCK.length)
          PODAROCK_i = PODAROCK_i - PODAROCK.length;

        document.getElementById("PODAR").innerHTML = PODRT;

}

var TIME_PUTIN2 = false;

function PUTIN_F()
{
        if(TIME_PUTIN2 == true)
        {
          TIME_PUTIN2 = false;
          document.getElementById("PUTIN_id").remove();
        }
        if(TIME_PUTIN == true)
        {
          TIME_PUTIN = false;
          TIME_PUTIN2 = true;
        }
        if(rand(TIME_IMPF) == 0)
        {
          var INTR = document.createElement("IMG");

          INTR.src = IMPF[rand(IMPF_i)];
          INTR.id = "PUTIN_id"
          document.getElementById("tables_div").appendChild(INTR);
          TIME_PUTIN = true;
        }
}


function rand(max)
{
  return Math.floor(Math.random() * max);
}
function END_M()
{
  stat = false;

  document.getElementById("Status_K").style.color = "#000000";
  document.getElementById("Status_K").style.background = "#ff0000";
  document.getElementById("Status_K").innerHTML = "Статус : _______Поражение_______";
}
function END_P()
{
  stat = false;


    document.getElementById("Status_K").style.color = "#000000";
    document.getElementById("Status_K").style.background = "#00ff00";
    document.getElementById("Status_K").innerHTML = "Статус : ________Победа_________";
}


      function print_K()
      {
        for(var i = 0; i < Map_X; i++)
        {
          for(var j = 0; j < Map_Y; j++)
          {
            Map [i][j] = 0;
          }
        }

        for(var h = 0; h < SLOVO_i; h++)
        {
          if(h == WWS)
            Map[SLOVO_X[h]][SLOVO_Y[h]] = 5;
          else
            Map[SLOVO_X[h]][SLOVO_Y[h]] = 3;
        }
        for(var i = 0; i < L; i++)
        {
          Map [L_x [i]][L_y [i]] = 2;
        }
        if(Map [P_x][P_y] == 2)
        {
          Map [P_x][P_y] = 4;
        }
        else
        {
          Map [P_x][P_y] = 1;
        }

        var firstTable = document.getElementById("F_table");
        table = document.createElement("table");
        for(var i = 0; i < Map_Y; i++)
        {
          tr = document.createElement("tr");
          for(var j = 0; j < Map_X; j++)
          {
            td = document.createElement("td");
            if(Map [j][i] == 0)
            {
              if((i + j) % 2 == 1)
                td.style.backgroundColor = "#0040ff"; //Пусто - 1
              else
              {
                td.style.backgroundColor = "#0040ff"; //Пусто - 0
              }
            }
            td.innerText = Map_S[j][i];
            td.style.color = "#ffffff";
            if(Map [j][i] == 1)
            {
              td.style.backgroundColor = "#00ff00"; //Голова
              td.style.color = "#00ff00";
            }
            if(Map [j][i] == 2)
            {
              td.style.backgroundColor = "#00ffff"; //Хвост
              td.style.color = "#00ffff";
            }
            if(Map [j][i] == 3)
            {
              td.style.backgroundColor = "#dddddd"; //слово
              td.style.color = "#ff0000";
            }
            if(Map [j][i] == 4)
            {
              td.style.backgroundColor = "#ff6600"; //голова усает хвост
              td.style.color = "#ff6600";
            }
            if(Map [j][i] == 5)
            {
              td.style.backgroundColor = "#ffaaaa"; //слово*
              td.style.color = "#aa0000";
            }
            td.style.width = (99.8 / Map_X) + "%";
            tr.appendChild(td);
          }
          tr.style.width = (99.8 / Map_Y) + "%";
          table.appendChild(tr);
        }

        document.getElementById("number").innerHTML = ("Уровень : " + (Level2));

        document.getElementById("TEXT_GIM1").innerHTML = ((GIM + 1) + " четверостишье из гимна России");


        table.id = "F_table";


        if(firstTable == null)
        {
          document.getElementById("tables_div").appendChild(table);
        }
        else
        {
          document.getElementById("tables_div").replaceChild(document.getElementById("tables_div").appendChild(table), firstTable);
        }



      }



      function Generat_Slov()
      {
        var t = 0;
        SLOVO_i = 5;

        for(var i = 0; i < SLOVO_i; i++)
        {
          t = t + SLOVO[i].length;
        }
        t = t - SLOVO_i;
        var T = Array(t);
        var tt = 0;
        for(var i = 0; i < SLOVO_i; i++)
        {
          for(var j = 1; j < SLOVO[i].length; j++)
          {
            T[tt] = SLOVO[i].charAt(j);
            tt++;
          }
        }
        for(var i = 0; i < Map_X; i++)
        {
          for(var j = 0; j < Map_Y; j++)
          {
            Map_S[i][j] = T[rand(tt)];
          }
        }



        for(var i = 0; i < SLOVO_i; i++)
        {
          var BB = false;
          var ASDF = 0;
          do
          {
            var s_x = rand(Map_X);
            var s_y = rand(Map_Y);
            for(var l = 0; (l < L) && (BB == false); l++)
            {
              if(L_x[l] == s_x && L_y[l] == s_y)
                BB = true;
            }
            ASDF++;
          } while (BB == true && ASDF < 100);
          var Ddx;
          var Ddy;
          var t = rand(4);
          if(t == 0)
          {
            Ddx = 0;
            Ddy = 1;
          }
          if(t == 1)
          {
            Ddx = 0;
            Ddy = -1;
          }
          if(t == 2)
          {
            Ddx = 1;
            Ddy = 0;
          }
          if(t == 3)
          {
            Ddx = -1;
            Ddy = 0;
          }

          for(var j = 0; j < SLOVO[SLOVO_i - 1 - i].length; j++)
          {
            var E_X = s_x + Ddx * j;
            var E_Y = s_y + Ddy * j;

            if(E_X >= Map_X)
            {
              E_X = E_X - Map_X;
            }
            if(E_Y >= Map_Y)
            {
              E_Y = E_Y - Map_Y;
            }
            if(E_X < 0)
            {
              E_X = E_X + Map_X;
            }
            if(E_Y < 0)
            {
              E_Y = E_Y + Map_Y;
            }

            Map_S[E_X][E_Y] = SLOVO[SLOVO_i - 1 - i].charAt(j)

          }
          SLOVO_X[SLOVO_i - 1 - i] = s_x;
          SLOVO_Y[SLOVO_i - 1 - i] = s_y;
        }
      }


      //Sneak function
      function Start()
      {
        document.getElementById("Status_K").style.color = "#000000";
        document.getElementById("Status_K").style.background = "#f1f1f1";
        document.getElementById("Status_K").innerHTML = "Статус : _______________________";

        WWS = 0;
        T_R = 0;
        L_i = 0;
        Z = false;
        ZZ = false;
        stat = true;
        P_x = Map_X / 2;  P_y = Map_Y / 2;
        L = 5;

        for(var i = 0; i < L; i++)
        {
          L_x[i] = P_x + 1 + i;
          L_y[i] = P_y;
        }

        dx = -1;
        dy = 0;

        Level2 = 1;


          do {
                    GIM = rand(SLOVO_R.length);
          } while (GIM + 1 == NaN);
          var j;

          GIM++;
          for(var i = 0; i < GIM; i++)
          {
            if(REST[i] == true)
              i++;
            j = i;
          }

          GIM = j;


          SLOVO_i = 5;
          if(T_R + 4 < SLOVO_R[GIM].length)
            SLOVO = [SLOVO_R[GIM][T_R], SLOVO_R[GIM][T_R + 1], SLOVO_R[GIM][T_R + 2], SLOVO_R[GIM][T_R + 3], SLOVO_R[GIM][T_R + 4]];
          else
          {
            WWS++;
          }
          SLOVO_X = Array(SLOVO_i);
          SLOVO_Y = Array(SLOVO_i);


        Generat_Slov();


        print_K();
      }

var TIME_PUTIN = false;
      function Move()
      {
        var AUD_Mo = document.getElementById("player")

        if(stat == true && Z == false)
        {
          var b = false;  //Увеличить хвост?
          var end = false;  //Проиграл?
          var End_P = false;  //Выиграл?

          var w_dx = P_x + dx;
          var w_dy = P_y + dy;

          if(w_dx > Map_X - 1)
            w_dx = w_dx - Map_X;
          if(w_dx < 0)
            w_dx = w_dx + Map_X;
          if(w_dy > Map_Y - 1)
            w_dy = w_dy - Map_Y;
          if(w_dy < 0)
            w_dy = w_dy + Map_Y;

          L_i++;
          if(L_i == speed_L)
          {
            b = true;
            L_i = 0;
          }


          for(var i = 0; i < L - 1 && end == false; i++)
          {
            if(w_dx == L_x [i] && w_dy == L_y [i])
            {
              end = true;
            }
          }

          if(End_P == true)
          {
            END_P();
          }
          if(end == true)
          {
            END_M();
          }

          if(b == true)
          {
            L_x [L] = L_x [L - 1];
            L_y [L] = L_y [L - 1];
            L_s [L] = L_s [L - 1];
          }
          for(var i = 0; i < L - 1; i++)
          {
            L_x [L - 1 - i] = L_x [L - 2 - i];
            L_y [L - 1 - i] = L_y [L - 2 - i];
            L_s [L - 1 - i] = L_s [L - 2 - i];
          }
          L_x [0] = P_x;
          L_y [0] = P_y;
          if(b == true)
          {
            L++;
          }
          P_x = P_x + dx;
          P_y = P_y + dy;

          if(P_x == -1)
          {
            P_x = Map_X - 1;
          }
          if(P_x == Map_X)
          {
            P_x = 0;
          }
          if(P_y == -1)
          {
            P_y = Map_Y - 1;
          }
          if(P_y == Map_Y)
          {
            P_y = 0;
          }
          DX = dx;
          DY = dy;

          L_s [0] = Map_S[P_x][P_y];

          var c = true;
          for(var i = 0; (i < SLOVO_i) && c == true; i++)
          {
            var t = true;
            for(var j = 0; (j < SLOVO[i].length) && t == true; j++)
            {
              if(L_s[SLOVO[i].length - 1 - j] != SLOVO[i].charAt(j))
                t = false;
            }
            if(t == true)
            {
              c = false;
              Level2++;
              L = L - SLOVO[i].length;
              if(L < 5)
                L = 5;
              if(i == WWS)
              {
                T_R++;
                if(T_R == SLOVO_R[GIM].length)
                {
                  END_P();
                }
                if(T_R + 4 < SLOVO_R[GIM].length)
                  SLOVO = [SLOVO_R[GIM][T_R], SLOVO_R[GIM][T_R + 1], SLOVO_R[GIM][T_R + 2], SLOVO_R[GIM][T_R + 3], SLOVO_R[GIM][T_R + 4]];
                else
                {
                  WWS++;
                }
              }
              Generat_Slov();
            }
          }
          if(MaxLevel < Level2)
            MaxLevel = Level2;



          document.getElementById("numberS").innerHTML = ("Максимальный достигнутый уровень : " + (MaxLevel));

          print_K();
        }


      }


//Ходы
function Move_X()   //dx+
{
  if(!(DX == -1 && DY == 0))
  {
    dx = 1;
    dy = 0;
  }
}
function Move_X_()  //dx-
{
  if(!(DX == 1 && DY == 0))
  {
    dx = -1;
    dy = 0;
  }
}
function Move_Y()   //dy+
{
  if(!(DX == 0 && DY == -1))
  {
    dy = 1;
    dx = 0;
  }
}
function Move_Y_()  //dy-
{
  if(!(DX == 0 && DY == 1))
  {
    dy = -1;
    dx = 0;
  }
}



function moveRect(e){
  Start_Audio();
  soundClick_2();
    switch(e.keyCode){

        case 65:  // если нажата клавиша влево
            Move_X_();
            break;
        case 87:   // если нажата клавиша вверх
            Move_Y_();
            break;
        case 68:   // если нажата клавиша вправо
            Move_X();
            break;
        case 83:   // если нажата клавиша вниз
            Move_Y();
            break;
        case 13:   // если нажата клавиша вниз
            Start();
            break;
        case 27:
            Pause();
            break;
    }
}

addEventListener("keydown", moveRect);
var ZZZZ = true;

function Start_Audio()
{
  if(ZZZZ == true)
  {
    ZZZZ= false;
    soundClick_2();
    Pause();
  }
}

function L_B()
{
  Move_X_();
}
function R_B()
{
  Move_X();
}
function T_B()
{
  Move_Y_();
}
function B_B()
{
  Move_Y();
}
function RES()
{
  Start();
}
function PAUS()
{
  Pause();
}
var Z = true;
var ZZ = true;
function Pause()
{
  if(Z == false)
  {
    Z = true;
  }
  else
  {
    Z = false;
  }
}

document.getElementById("l_but").addEventListener("click",function(){L_B();});
document.getElementById("r_but").addEventListener("click",function(){R_B();});
document.getElementById("t_but").addEventListener("click",function(){T_B();});
document.getElementById("b_but").addEventListener("click",function(){B_B();});
document.getElementById("res").addEventListener("click",function(){RES();});
document.getElementById("esc").addEventListener("click",function(){Pause();});
