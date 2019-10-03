let graph = function(p)
{
  let valueX = 0;
  let valueZ = 0;
  let mode = 1;
  let value1;
  let value2;
  let value3;
  let value4;
  
  p.preload = function()
  {
    table1 = p.loadTable('0828_pm2.5.csv');
    table2 = p.loadTable('0828_pm10.csv');
    map = p.loadImage('GSA.png');
  };
  
  p.setup = function()
  {
    p.createCanvas(700, 700, p.WEBGL);
    value1 = p.createGraphics(20, 20);
    value1.fill(255);
    value1.textAlign(p.CENTER);
    value1.textSize(10);
    value1.text('30', 10, 10);
    value2 = p.createGraphics(20, 20);
    value2.fill(255);
    value2.textAlign(p.CENTER);
    value2.textSize(10);
    value2.text('20', 10, 10);
    value3 = p.createGraphics(20, 20);
    value3.fill(255);
    value3.textAlign(p.CENTER);
    value3.textSize(10);
    value3.text('10', 10, 10);
    value4 = p.createGraphics(50, 50);
    value4.fill(255);
    value4.textAlign(p.CENTER);
    value4.textSize(10);
    value4.text('(㎍/㎥)', 15, 10);
    p.frameRate(30);
  };
  
  p.draw = function()
  {
    p.background(0);
    p.rotateX(valueX);
    p.rotateZ(valueZ);
    p.translate(0, 0, -150);
    
    p.push();  
      p.texture(map);
      p.plane(300);
      p.translate(0, 0, 150);
      p.stroke(255);
      p.noFill();
      p.box(300, 300, 300);
      p.box(300, 300, 100);
    p.pop();
    
    let row;
    if(mode === 1)
    {
      for(let l = 1; l < table1.getRowCount(); l++)
      {
        p.push();
          row = table1.getRow(l);
          concentration = row.getString(1);
          latitude = -(row.getString(2)-35.22697222)*145945.6304 +150;
          //hight = row.getString(3);
          longitude = (row.getString(3)-126.8471111)*118680.2753 -150;
          p.colorMode(p.RGB);
          if(concentration <= 15)
          {
            p.fill(0, 0, 255);
          }
          else if(concentration <= 35)
          {
            p.fill(0, 255, 0);
          }
          else if(concentration <= 75)
          {
            p.fill(255, 255, 0);
          }
          else
          {
            p.fill(255, 0, 0);
          }
          p.translate(longitude, latitude, concentration*5);
          p.box(10, 10, concentration*10);
        p.pop();
      }
    }
    if(mode === 2)
    {
      for(let l = 1; l < table2.getRowCount(); l++)
      {
        p.push();
          row = table2.getRow(l);
          concentration = row.getString(1);
          latitude = -(row.getString(2)-35.22697222)*145945.6304 +150;
          //hight = row.getString(3);
          longitude = (row.getString(3)-126.8471111)*118680.2753 -150;
          p.colorMode(p.RGB);
          if(concentration <= 30)
          {
            p.fill(0, 0, 255);
          }
          else if(concentration <= 80)
          {
            p.fill(0, 255, 0);
          }
          else if(concentration <= 150)
          {
            p.fill(255, 255, 0);
          }
          else
          {
            p.fill(255, 0, 0);
          }
          //fill(255-concentration, 255, 255);
          p.translate(longitude, latitude, concentration*5);
          p.box(10, 10, concentration*10);
        p.pop();
      }
    }
    
    p.push();
      p.translate(-142, 150, 302);
      p.rotateX(80);
      p.texture(value1);
      p.plane(20, 20);
    p.pop();
    
    p.push();
      p.translate(-142, 150, 202);
      p.rotateX(80);
      p.texture(value2);
      p.plane(20, 20);
    p.pop();
    
    p.push();
      p.translate(-142, 150, 102);
      p.rotateX(80);
      p.texture(value3);
      p.plane(20, 20);
    p.pop();
    
    p.push();
      p.translate(-142, 150, 320);
      p.rotateX(80);
      p.texture(value4);
      p.plane(50, 50);
    p.pop();
  };
  
  p.mouseDragged = function()
  {
    valueX = p.mouseY*0.01;
    valueZ = p.mouseX*0.01;
  };
  
  p.keyTyped = function()
  {
    if(p.key === '1')
    {
      mode = 1;
    }
    if(p.key === '2')
    {
      mode = 2;
    }
  };
};
let showgraph = new p5(graph);


let table = function(p)
{
  let mode = 1;
  let f, r;
  
  p.preload = function()
  {
    table1 = p.loadTable('0828_pm2.5.csv');
    table2 = p.loadTable('0828_pm10.csv');
  };
  
  p.setup = function() 
  {
    p.createCanvas(430, 700);
    p.frameRate(10);
  };
  
  p.draw = function() 
  {
    p.background(0);
    p.noFill();
    p.stroke(255);
    p.textSize(12);
    
    for(f = 10; f <= 310; f = f+100)
    {
      p.rect(f, 10, 100, 20);
    }
    p.text('time', 15, 25);
    p.text('concentration', 115, 25);
    p.text('latitude', 215, 25);
    p.text('longitude', 315, 25);
    
    if(mode === 1)
    {
      for(f = 1; f < table1.getRowCount(); f++)
      {
        row = table1.getRow(f); 
        for(r = 10; r <= 310; r = r+100)
        {
          p.rect(r, 10+ 20*f, 100, 20);
        }
        p.text(row.getString(0), 15, 25+ 20*f);
        p.text(row.getString(1), 115, 25+ 20*f);
        p.text(row.getString(2), 215, 25+ 20*f);
        p.text(row.getString(3), 315, 25+ 20*f);
      }
    }
    else
    {
      for(f = 1; f < table2.getRowCount(); f++)
      {
        row = table2.getRow(f); 
        for(r = 10; r <= 310; r = r+100)
        {
          p.rect(r, 10+ 20*f, 100, 20);
        }
        p.text(row.getString(0), 15, 25+ 20*f);
        p.text(row.getString(1), 115, 25+ 20*f);
        p.text(row.getString(2), 215, 25+ 20*f);
        p.text(row.getString(3), 315, 25+ 20*f);
      }
    }
  };
  
  p.mouseWheel = function()
  {
    p.translate(0, 10);
  };
  
  p.keyTyped = function()
  {
    if(p.key === '1')
    {
      mode = 1;
    }
    if(p.key === '2')
    {
      mode = 2;
    }
  };
};
let showtable = new p5(table);
