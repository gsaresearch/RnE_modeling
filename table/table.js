let mode = 1;
let f, r;

function preload()
{
  table1 = loadTable('0828_pm2.5.csv');
  table2 = loadTable('0828_pm10.csv');
}

function setup() 
{
  createCanvas(700, 700);
  frameRate(10);
}

function draw() 
{
  background(0);
  noFill();
  stroke(255);
  textSize(12);
  
  for(f = 10; f <= 310; f = f+100)
  {
    rect(f, 10, 100, 20);
  }
  text('time', 15, 25);
  text('concentration', 115, 25);
  text('latitude', 215, 25);
  text('longitude', 315, 25);
  
  if(mode === 1)
  {
    for(f = 1; f < table1.getRowCount(); f++)
    {
      row = table1.getRow(f); 
      for(r = 10; r <= 310; r = r+100)
      {
        rect(r, 10+ 20*f, 100, 20);
      }
      text(row.getString(0), 15, 25+ 20*f);
      text(row.getString(1), 115, 25+ 20*f);
      text(row.getString(2), 215, 25+ 20*f);
      text(row.getString(3), 315, 25+ 20*f);
    }
  }
  else
  {
    for(f = 1; f < table2.getRowCount(); f++)
    {
      row = table2.getRow(f); 
      for(r = 10; r <= 310; r = r+100)
      {
        rect(r, 10+ 20*f, 100, 20);
      }
      text(row.getString(0), 15, 25+ 20*f);
      text(row.getString(1), 115, 25+ 20*f);
      text(row.getString(2), 215, 25+ 20*f);
      text(row.getString(3), 315, 25+ 20*f);
    }
  }
  
}

function mouseWheel()
{
  translate(0, 10);
}

function keyTyped()
{
  if(key === '1')
  {
    mode = 1;
  }
  if(key === '2')
  {
    mode = 2;
  }
}
