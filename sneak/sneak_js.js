var stat = true;
var Map_X = 40;
var Map_Y = 20;
var Start_speed = 4;
var K_Raz = 20;
var K_Speed = 1;
var D_Speed = 0.05;



var Map = new Array(Map_X);
for(var i = 0; i < Map_X; i++)
  Map[i] = new Array(Map_Y);


var P_x;
var P_y;
var L_x = new Array(Map_X);
var L_y = new Array(Map_Y);
var L;
var Ap_x;
var Ap_y;
var dx;
var dy;
var DX;
var DY;
var MaxLevel = 1;
var speed = Start_speed;

setInterval(CHECK_SIZE,500);
function CHECK_SIZE()
{

                  var size_XY_table = (document.getElementById("tables_div").clientWidth / 2);
                  var s_size_XY_table = size_XY_table + "px";
                  var size_XY = 22.18;
                  if (size_XY_table / Map_Y < size_XY)
                    s_size_XY_table = size_XY + "em";
                  document.getElementById("tables_div").style.height = s_size_XY_table;
}

window.onload=Start();
Move();

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
        for(var i = 0; i < L; i++)
        {
          Map [L_x [i]][L_y [i]] = 2;
        }
        Map [Ap_x][Ap_y] = 3;
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
                td.style.backgroundColor = "#0040ff"; //Пусто
              else
              {
                td.style.backgroundColor = "#0040ff"; //Пусто
              }
            }
            if(Map [j][i] == 1)
            td.style.backgroundColor = "#00ff00"; //Голова
            if(Map [j][i] == 2)
            td.style.backgroundColor = "#00ffff"; //Хвост
            if(Map [j][i] == 3)
            td.style.backgroundColor = "#ff0000"; //Яблоко
            if(Map [j][i] == 4)
            td.style.backgroundColor = "#ff6600"; //голова усает хвост
            td.style.width = (99.8 / Map_X) + "%";
            tr.appendChild(td);
          }
          tr.style.width = (99.8 / Map_Y) + "%";
          table.appendChild(tr);
        }

        document.getElementById("number").innerHTML=("Уровень : " + (L - 4));

        table.id = "F_table";


        if(firstTable == null)
        {
          return document.querySelector("tables_div").appendChild(table);
        }
        else
        {
          return document.getElementById("tables_div").replaceChild(document.getElementById("tables_div").appendChild(table), firstTable);
        }
      }

      function check_position_ap()
      {
        var c_b = false;
        var q = true;
        while(q == true)
        {
          q = false;
          for(var i = 0; i < L; i++)
          {
            if(L_x [i] == Ap_x && L_y [i] == Ap_y)
            {
              c_b = true;
            }
          }
          if(P_x == Ap_x && P_y == Ap_y)
          {
            c_b = true;
          }
          if(P_x + dx == Ap_x && P_y + dy == Ap_y)
          {
            c_b = true;
          }
          if(DX == 0 && P_x == Ap_x)
          {
            Ap_x = Ap_x + rand(rand(Map_X));
            if(Ap_x < 0)
            Ap_x = Ap_x + Map_X;
            if(Ap_x > Map_X - 1)
            Ap_x = Ap_x - Map_X;
            q = true;
          }
          if(DY == 0 && P_y == Ap_y)
          {
            Ap_y = Ap_y + rand(rand(Map_Y));
            if(Ap_y < 0)
            Ap_y = Ap_y + Map_Y;
            if(Ap_y > Map_Y - 1)
            Ap_y = Ap_y - Map_Y;
            q = true;
          }
        }
        return c_b;
      }



      //Sneak function
      function Start()
      {
        document.getElementById("Status_K").style.color = "#000000";
        document.getElementById("Status_K").style.background = "#f1f1f1";
        document.getElementById("Status_K").innerHTML = "Статус : _______________________";

        speed = Start_speed;
        Z = false;
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

          do
          {
            Ap_x = rand(Map_X);
            Ap_y = rand(Map_Y);

          } while (check_position_ap() == true);

        document.getElementById("numberMax").innerHTML=("Максимальный возможный уровень : " + (Map_X * Map_Y - 5));

        print_K();
      }




      function Move()
      {
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

          if(w_dx == Ap_x && w_dy == Ap_y)
          {
            b = true;
            if(L + 3 == Map_X * Map_Y)
            {
              End_P = true;
            }
          }
          else
          {
            for(var i = 0; i < L - 1 && end == false; i++)
            {
              if(w_dx == L_x [i] && w_dy == L_y [i])
              {
                end = true;
              }
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

          }
          for(var i = 0; i < L - 1; i++)
          {
            L_x [L - 1 - i] = L_x [L - 2 - i];
            L_y [L - 1 - i] = L_y [L - 2 - i];
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

          if(b == true)
          {
            do
            {
              Ap_x = rand(Map_X);
              Ap_Y = rand(Map_Y);

            } while (check_position_ap() == true);

            if(MaxLevel < L - 4)
              MaxLevel = L - 4;
            speed = speed * K_Speed;
            speed = speed + D_Speed;
          }

          document.getElementById("numberS").innerHTML = ("Максимальный достигнутый уровень : " + (MaxLevel));

          print_K();
        }
        setTimeout(Move, 1000 / speed);
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
var Z = false;
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
